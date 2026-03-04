// simple priority scheduler utility
// appointments are expected to have an "urgencyLevel" value that matches one of the
// keys in PRIORITY_RANK. higher numbers indicate higher priority.

export const PRIORITY_RANK = {
  emergency: 4,
  urgent: 3,
  moderate: 2,
  routine: 1
};

// sort a list of appointment-like objects first by priority (descending), then by time string
export function sortByPriorityAndTime(appointments = []) {
  return [...appointments].sort((a, b) => {
    const pa = PRIORITY_RANK[a.urgencyLevel] || 0;
    const pb = PRIORITY_RANK[b.urgencyLevel] || 0;
    if (pb !== pa) {
      return pb - pa;
    }
    // if same priority, sort by appointment time (string compare should work for AM/PM)
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    return 0;
  });
}
