export const families = [
  { id: 'family-1', name: 'Family 1', color: '#f7c76b', members: ['sanket', 'sneha', 'shripad', 'shruti'] },
  { id: 'family-2', name: 'Family 2', color: '#67e8f9', members: ['milind', 'vaishali'] },
  { id: 'family-3', name: 'Family 3', color: '#c084fc', members: ['sharad', 'sharayu'] }
];
export const members = [
  { id: 'sanket', name: 'Sanket', familyId: 'family-1' }, { id: 'sneha', name: 'Sneha', familyId: 'family-1' }, { id: 'shripad', name: 'Shripad', familyId: 'family-1' }, { id: 'shruti', name: 'Shruti', familyId: 'family-1' },
  { id: 'milind', name: 'Milind', familyId: 'family-2' }, { id: 'vaishali', name: 'Vaishali', familyId: 'family-2' }, { id: 'sharad', name: 'Sharad', familyId: 'family-3' }, { id: 'sharayu', name: 'Sharayu', familyId: 'family-3' }
];
export const locations = ['Mumbai','Delhi / Anand Vihar','Dehradun','Chakrata','Kalsi / Ashoka Rock Edict','Tiger Falls','Chilmiri Neck','Moila Top','Devban Valley','Hanol','Mahasu Devta Temple','Lakha Mandal Shiv Temple','Mussoorie','Haridwar','Har Ki Pauri'].map((name, index) => ({ id: name.toLowerCase().replaceAll(' ', '-').replaceAll('/', ''), name, index, coordinates: null }));
export const itinerary = [
  ['day-1','2026-06-19','19 Jun','Mumbai → Delhi','Overnight train',['Train name to be confirmed.'],'Train','Plan boarding early; keep medicines and IDs handy.'],
  ['day-2','2026-06-20','20 Jun','Delhi → Dehradun','Train',['Vande Bharat 22457 from Anand Vihar to Dehradun.'],'Kamini Homestay','Shorter travel day; good for rest and acclimatisation.'],
  ['day-3','2026-06-21','21 Jun','Dehradun → Chakrata','Self-drive cars',['Gocars self-drive: Tata Altroz + Hyundai i20; contact 9358214531.','Visit Ashoka Rock Edict, Tiger Falls, Chakrata View Point, Chilmiri Neck, Ramtal Garden.'],'The Hosteller Chakrata','Moderate day; avoid steep walks if tired.'],
  ['day-4','2026-06-22','22 Jun','Chakrata local','Local sightseeing',['Moila Top, Lokhandi, Devban Valley, photography.'],'The Hosteller Chakrata','Keep flexible; let seniors enjoy viewpoints from accessible spots.'],
  ['day-5','2026-06-23','23 Jun','Chakrata → Hanol','Self-drive cars',['Mahasu Devta Temple, Pawasi Maharaj Temple, Bheem ke Kanche, riverside.','Mahaprasad 8:15–8:30 PM.'],'Nautiyal Homestay; 9411171523','Spiritual day; keep footwear, shawls and seating breaks planned.'],
  ['day-6','2026-06-24','24 Jun','Hanol → Mussoorie','Self-drive cars',['Longest drive.','Lakha Mandal Shiv Temple stop.','Mussoorie sightseeing.'],'Zostel Mussoorie','Longest drive; schedule comfort breaks and avoid rushing.'],
  ['day-7','2026-06-25','25 Jun','Mussoorie → Dehradun → Haridwar','Cars + onward travel',['Return cars at Dehradun.','Travel to Haridwar.','Ganga Aarti at Har Ki Pauri.'],'Haridwar hotel to be confirmed','Crowded evening; choose a safe viewing spot and keep group together.'],
  ['day-8','2026-06-26','26 Jun','Haridwar → Delhi → Mumbai','Return train',['Train names to be confirmed.'],'Train','Keep tickets and luggage labels accessible.'],
  ['day-9','2026-06-27','27 Jun','Mumbai','Home',['Trip ends, memories and final settlement.'],'Home','Close expenses and rest.']
].map(([id,date,label,route,mode,keyDetails,stay,seniorSuitability]) => ({ id,date,label,route,mode,keyDetails,stay,seniorSuitability, food: ['Food suggestions to be confirmed.'], photoSpots: ['Photography spots listed in day details.'], status: 'planned' }));
export const hotels = ['Kamini Homestay','The Hosteller Chakrata','Nautiyal Homestay Hanol – 9411171523','Zostel Mussoorie','Haridwar hotel to be confirmed'].map((name) => ({ name, bookingAmount: 'To be confirmed.', advancePaid: 'To be confirmed.', pendingAmount: 'To be confirmed.' }));
