
// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// const outputPath = path.join(__dirname, "outputs");

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = (filepath, inputPath) => {
//   const jobId = path.basename(filepath).split(".")[0];
//   const outPath = path.join(outputPath, `${jobId}.out`);

//   return new Promise((resolve, reject) => {
//     exec(
//       `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`,
//       (error, stdout, stderr) => {
//         if (error) {
//           reject({ error, stderr });
//         }
//         if (stderr) {
//           reject(stderr);
//         }
//         resolve(stdout);
//       }
//     );
//   });
// };

// module.exports = {
//   executeCpp,
// };

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`); // .exe is for Windows

  const isWindows = process.platform === "win32";
  const execCommand = isWindows
    ? `g++ "${filepath}" -o "${outPath}" && "${outPath}" < "${inputPath}"`
    : `g++ "${filepath}" -o "${outPath}" && cd ${outputPath} && ./${jobId}.exe < ${inputPath}`;

  return new Promise((resolve, reject) => {
    exec(execCommand, (error, stdout, stderr) => {
      if (error) return reject(new Error(stderr || error.message));
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
