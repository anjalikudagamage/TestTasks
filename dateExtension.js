Date.prototype.daysTo = function (otherDate) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const diffInTime = otherDate.getTime() - this.getTime();
  return Math.floor(diffInTime / MS_PER_DAY);
};

// Example usage
const d1 = new Date("2024-01-01");
const d2 = new Date("2024-01-10");

console.log(
  `Number of days from ${d1.toDateString()} to ${d2.toDateString()}: ${d1.daysTo(
    d2
  )}`
);
