const { spawn } = require('child_process');
const path = require('path');

const PORT = 3055;
process.env.PORT = PORT;

const serverProcess = spawn('node', [path.join(__dirname, '..', 'server.js')], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: 'inherit',
});

function cleanup() {
  try {
    serverProcess.kill('SIGINT');
  } catch (e) {}
}

process.on('exit', cleanup);
process.on('SIGINT', cleanup);

setTimeout(() => {
  const smoke = spawn('node', [path.join(__dirname, 'smoke.test.js')], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'inherit',
  });

  smoke.on('exit', (code) => {
    if (code !== 0) {
      cleanup();
      process.exit(code || 1);
    }

    const wsTest = spawn('node', [path.join(__dirname, 'multiplayer-world.test.js')], {
      env: { ...process.env, PORT: String(PORT) },
      stdio: 'inherit',
    });

    wsTest.on('exit', (wsCode) => {
      cleanup();
      process.exit(wsCode || 0);
    });
  });
}, 1000);
