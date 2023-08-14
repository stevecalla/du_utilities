//instructions = in terminal type "node index.js <time>" or it will default to 15 minutes
//to stop timer press control + c
const minutes = parseInt(process.argv[2]) || 15;

const totalSeconds = minutes * 60;
let secondsElapsed = 0;

// time to format is in seconds
const formatOutput = (timeToFormat) => {
  const minutes = Math.floor(timeToFormat / 60);
  const seconds = timeToFormat % 60;
  const hours =
    Math.floor(timeToFormat / 3600) > 0
      ? `${Math.floor(timeToFormat / 3600)} hour(s)`
      : "";
  return `${hours} ${minutes} minute(s) ${seconds} second(s)`;
};

setInterval(() => {
  console.log(`Time remaining: ${formatOutput(totalSeconds - secondsElapsed)}`);
  secondsElapsed++;
}, 1000);