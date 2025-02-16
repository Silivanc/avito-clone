const { exec } = require("child_process");

const server = exec("node app.js", (error, stdout, stderr) => {
  if (error) console.error(`Server error: ${error.message}`);
  if (stderr) console.error(`Server stderr: ${stderr}`);
  console.log(stdout);
});

// Ждём 2 секунды, чтобы сервер поднялся, затем запускаем сиды
setTimeout(() => {
  console.log("Seeding database...");
  exec("node seed.js", (error, stdout, stderr) => {
    if (error) console.error(`Seed error: ${error.message}`);
    if (stderr) console.error(`Seed stderr: ${stderr}`);
    console.log(stdout);
  });
}, 2000);
