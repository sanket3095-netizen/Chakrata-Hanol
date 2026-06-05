import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBalances, simplifyDebt, splitExpense } from '../src/lib/expenseEngine.js';

test('equal split divides across all 8 members', () => {
  const split = splitExpense({ id: 'e', title: 'Dinner', amount: 800, paidBy: [{ memberId: 'sanket', amount: 800 }], participants: [], splitType: 'equal' });
  assert.equal(split.sanket, 100);
  assert.equal(split.sharayu, 100);
});

test('transfers adjust final net balances correctly', () => {
  const expenses = [{ id: 'e', title: 'Stay', amount: 1000, paidBy: [{ memberId: 'milind', amount: 1000 }], participants: [{ memberId: 'sanket', amount: 600 }, { memberId: 'milind', amount: 400 }], splitType: 'exact' }];
  const transfers = [{ id: 't', from: 'sanket', to: 'milind', amount: 200 }];
  const balances = calculateBalances(expenses, transfers);
  assert.equal(balances.find((b) => b.memberId === 'sanket').net, -400);
  assert.equal(balances.find((b) => b.memberId === 'milind').net, 400);
});

test('simplify debt emits minimum practical settlement rows', () => {
  const balances = calculateBalances([{ id: 'e', title: 'Food', amount: 800, paidBy: [{ memberId: 'sanket', amount: 800 }], participants: [], splitType: 'equal' }]);
  const settlements = simplifyDebt(balances);
  assert.equal(settlements.length, 7);
  assert.equal(settlements.reduce((s, x) => s + x.amount, 0), 700);
});
