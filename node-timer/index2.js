/**
 * @description Accepts user input in the command line (or sets a default of 15) for the
 *  number of minutes the timer will countdown
 * instructions = in terminal type "node index2.js <time> <seconds> <interval>" or it will default to 15 minutes
 * @example node index2.js 12 0 10
 * to stop timer press control + c
 * ^^^ above example will run 100 times faster than real time since 10 was entered as the inverval
 *  default is 1000 which equates to real time
 * "npm install sound-player" (https://www.npmjs.com/package/sound-player)
 * Also "brew install mpg321" for the sound to work
 * Running: "node index2.js" with no args will default to 15 minutes, 
 * Running: "node index2.js 0 30" will do 30 seconds, 
 * Running: "node index2.js 5 0 1000" will do 5 minutes with 1 second interval
 */
 const soundplayer = require("sound-player");
 const minutes = parseInt(process.argv[2]);
 const seconds = parseInt(process.argv[3]);
 const interval = parseInt(process.argv[4]) || 1000;

 console.log(minutes, interval);
 
 const options = {
   filename: "times-up.mp3",
   gain: 100,
   debug: true,
   player: "mpg321", // other supported players are 'aplay', 'mpg123', 'mpg321'. install "brew install mpg321" on mac
   device: "plughw0:0",
 };
 const player = new soundplayer(options);
 
 const totalSeconds = !minutes && !seconds ? 15 * 60 : minutes ? minutes * 60 : seconds; // 120
 let secondsElapsed = 0;
 
 
 /**
  *
  * @param {number} timeToFormat Number of seconds left on the timer
  * @returns  3660 in
  */
 const formatOutput = (timeToFormat) => {
   const hours = Math.floor(timeToFormat / 3600);
   const minutes = Math.floor((timeToFormat - hours * 3600) / 60);
   const seconds = timeToFormat % 60;
 
 
   return `${
     hours ? `${hours} hour(s)` : ""
   } ${minutes} minute(s) ${seconds} second(s)`;
 };
 
 let oneSecondInterval = setInterval(() => {
   const secondsLeft = totalSeconds - secondsElapsed;
   console.log(`Time remaining: ${formatOutput(secondsLeft)}`);
   secondsElapsed++;
   // STOP THE TIMER!!!
   if (secondsLeft < 1) {
     player.play();
     clearInterval(oneSecondInterval);
   }
 }, interval);