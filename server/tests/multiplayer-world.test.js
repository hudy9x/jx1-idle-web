const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3010;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simple native WS client for test
function connectWs(port, name) {
  return new Promise((resolve, reject) => {
    const key = crypto.randomBytes(16).toString('base64');
    const req = http.request({
      port,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
        'Sec-WebSocket-Key': key,
        'Sec-WebSocket-Version': '13',
      },
    });

    req.on('upgrade', (res, socket) => {
      const messages = [];
      let buffer = Buffer.alloc(0);

      socket.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
        while (buffer.length >= 2) {
          const b0 = buffer[0];
          const b1 = buffer[1];
          let len = b1 & 0x7f;
          let offset = 2;
          if (len === 126) {
            if (buffer.length < 4) break;
            len = buffer.readUInt16BE(2);
            offset = 4;
          }
          if (buffer.length < offset + len) break;
          const payload = buffer.slice(offset, offset + len);
          buffer = buffer.slice(offset + len);
          try {
            const data = JSON.parse(payload.toString('utf8'));
            messages.push(data);
          } catch (e) {}
        }
      });

      function send(obj) {
        const payload = Buffer.from(JSON.stringify(obj), 'utf8');
        const len = payload.length;
        const mask = crypto.randomBytes(4);
        const masked = Buffer.alloc(len);
        for (let i = 0; i < len; i++) masked[i] = payload[i] ^ mask[i % 4];

        let header;
        if (len < 126) {
          header = Buffer.from([0x81, 0x80 | len]);
        } else {
          header = Buffer.alloc(4);
          header[0] = 0x81;
          header[1] = 0x80 | 126;
          header.writeUInt16BE(len, 2);
        }
        socket.write(Buffer.concat([header, mask, masked]));
      }

      resolve({ socket, messages, send });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testSingleWorld() {
  console.log('Testing Single-World Server on port', PORT);

  const clientA = await connectWs(PORT, 'PlayerA');
  clientA.send({ type: 'auth', userId: 'user_A', name: 'HiệpKháchA', hp: 100, level: 10, x: 120, y: 150 });
  await wait(300);

  const clientB = await connectWs(PORT, 'PlayerB');
  clientB.send({ type: 'auth', userId: 'user_B', name: 'HiệpKháchB', hp: 90, level: 8, x: 200, y: 180 });
  await wait(300);

  // Client A chats
  clientA.send({ type: 'chat', text: 'Chào toàn thể server!' });
  await wait(300);

  // Client B attacks boss
  clientB.send({ type: 'attack_boss' });
  await wait(300);

  // Check if Client B received Client A's chat
  const chatReceived = clientB.messages.find((m) => m.type === 'chat' && m.message && m.message.text.includes('Chào toàn thể server'));
  if (!chatReceived) {
    throw new Error('Client B did not receive Client A broadcast chat');
  }

  // Check if Client A received Boss damage update from Client B
  const bossUpdated = clientA.messages.find((m) => m.type === 'boss_update' && m.boss);
  if (!bossUpdated) {
    throw new Error('Client A did not receive boss damage broadcast from Client B');
  }

  console.log('SINGLE_WORLD_WS_TEST_SUCCESS:', {
    chatBroadcastVerified: true,
    bossBroadcastVerified: true,
    receivedBossHp: bossUpdated.boss.hp,
  });

  clientA.socket.destroy();
  clientB.socket.destroy();
}

(async () => {
  try {
    await testSingleWorld();
    process.exit(0);
  } catch (err) {
    console.error('TEST_FAIL:', err.message);
    process.exit(1);
  }
})();
