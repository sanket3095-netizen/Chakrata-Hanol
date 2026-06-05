import { families, members } from '../data/trip.js';
const r = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
export function splitExpense(expense) {
  if (!Number.isFinite(expense.amount) || expense.amount < 0) throw new Error('Amount must be positive.');
  const selected = expense.participants?.length ? expense.participants : members.map((m) => ({ memberId: m.id }));
  const owed = {}; const add = (id, amount) => owed[id] = r((owed[id] || 0) + amount);
  if (['equal','selected','couple','room','bed','vehicle'].includes(expense.splitType)) selected.forEach((p) => add(p.memberId, expense.amount / selected.length));
  if (expense.splitType === 'family') {
    const fams = [...new Set(selected.map((p) => p.familyId || members.find((m) => m.id === p.memberId)?.familyId))];
    fams.forEach((fid) => { const fms = families.find((f) => f.id === fid).members.filter((id) => selected.some((p) => p.memberId === id)); fms.forEach((id) => add(id, expense.amount / fams.length / fms.length)); });
  }
  if (expense.splitType === 'weighted') { const total = selected.reduce((s, p) => s + (p.weight || 1), 0); selected.forEach((p) => add(p.memberId, expense.amount * ((p.weight || 1) / total))); }
  if (expense.splitType === 'exact') { const total = selected.reduce((s, p) => s + (p.amount || 0), 0); if (Math.abs(total - expense.amount) > .02) throw new Error('Exact split must add up.'); selected.forEach((p) => add(p.memberId, p.amount || 0)); }
  if (expense.splitType === 'percentage') { const total = selected.reduce((s, p) => s + (p.percentage || 0), 0); if (Math.abs(total - 100) > .02) throw new Error('Percentages must add to 100.'); selected.forEach((p) => add(p.memberId, expense.amount * ((p.percentage || 0) / 100))); }
  const entries = Object.entries(owed); const drift = r(expense.amount - entries.reduce((s, [, v]) => s + v, 0)); if (entries[0] && drift) owed[entries[0][0]] = r(entries[0][1] + drift);
  return owed;
}
export function calculateBalances(expenses, transfers = []) {
  const rows = Object.fromEntries(members.map((m) => [m.id, { memberId: m.id, paid: 0, owed: 0, transfersIn: 0, transfersOut: 0, net: 0 }]));
  expenses.forEach((e) => { const sign = e.isRefund ? -1 : 1; e.paidBy.forEach((p) => rows[p.memberId].paid = r(rows[p.memberId].paid + sign * p.amount)); Object.entries(splitExpense(e)).forEach(([id, amount]) => rows[id].owed = r(rows[id].owed + sign * amount)); });
  transfers.forEach((t) => { rows[t.from].transfersOut = r(rows[t.from].transfersOut + t.amount); rows[t.to].transfersIn = r(rows[t.to].transfersIn + t.amount); });
  Object.values(rows).forEach((row) => row.net = r(row.paid + row.transfersOut - row.owed - row.transfersIn));
  return Object.values(rows);
}
export function simplifyDebt(balances) {
  const debtors = balances.filter((b) => b.net < -0.01).map((b) => ({ id: b.memberId, amount: r(-b.net) })).sort((a,b)=>b.amount-a.amount);
  const creditors = balances.filter((b) => b.net > 0.01).map((b) => ({ id: b.memberId, amount: r(b.net) })).sort((a,b)=>b.amount-a.amount);
  const out = []; let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) { const amount = r(Math.min(debtors[i].amount, creditors[j].amount)); out.push({ from: debtors[i].id, to: creditors[j].id, amount, reason: 'Simplified final trip settlement', status: 'pending' }); debtors[i].amount = r(debtors[i].amount - amount); creditors[j].amount = r(creditors[j].amount - amount); if (debtors[i].amount <= .01) i++; if (creditors[j].amount <= .01) j++; }
  return out;
}
export function familyTotals(balances) { return families.map((f) => ({ name: f.name, paid: r(balances.filter((b) => f.members.includes(b.memberId)).reduce((s,b)=>s+b.paid,0)), owed: r(balances.filter((b) => f.members.includes(b.memberId)).reduce((s,b)=>s+b.owed,0)), net: r(balances.filter((b) => f.members.includes(b.memberId)).reduce((s,b)=>s+b.net,0)) })); }
export function whatsappSettlementSummary(settlements) { return settlements.length ? ['BharatBhraman final settlement:', ...settlements.map((s) => `${s.from} → ${s.to}: ₹${s.amount.toLocaleString('en-IN')}`)].join('\n') : 'BharatBhraman settlement: everyone is balanced. ✅'; }
