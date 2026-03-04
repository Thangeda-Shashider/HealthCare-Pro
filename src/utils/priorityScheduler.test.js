import { sortByPriorityAndTime, PRIORITY_RANK } from './priorityScheduler';

describe('priorityScheduler utility', () => {
  it('sorts appointments by urgencyLevel with emergency first', () => {
    const list = [
      { id: 1, time: '10:00 AM', urgencyLevel: 'moderate' },
      { id: 2, time: '09:00 AM', urgencyLevel: 'emergency' },
      { id: 3, time: '11:00 AM', urgencyLevel: 'routine' },
      { id: 4, time: '09:30 AM', urgencyLevel: 'urgent' }
    ];
    const sorted = sortByPriorityAndTime(list);
    expect(sorted.map((a) => a.id)).toEqual([2, 4, 1, 3]);
  });

  it('maintains time order when urgency levels are equal', () => {
    const list = [
      { id: 'a', time: '10:00 AM', urgencyLevel: 'routine' },
      { id: 'b', time: '09:00 AM', urgencyLevel: 'routine' }
    ];
    const sorted = sortByPriorityAndTime(list);
    expect(sorted.map((a) => a.id)).toEqual(['b', 'a']);
  });
});
