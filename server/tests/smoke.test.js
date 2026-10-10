const port = process.env.PORT || 3000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkServer() {
  const health = await fetch(`http://localhost:${port}/api/health`);
  const healthJson = await health.json();

  if (!health.ok || !healthJson.ok) {
    throw new Error('Health check failed');
  }

  const username = `tester_${Date.now()}`;
  const registerRes = await fetch(`http://localhost:${port}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'demo123' }),
  });

  const registerJson = await registerRes.json();
  if (!registerRes.ok || !registerJson.ok) {
    throw new Error(`Register failed: ${registerJson.error || 'unknown'}`);
  }

  const profileRes = await fetch(`http://localhost:${port}/api/profile/${registerJson.userId}`, {
    headers: {
      Authorization: `Bearer ${registerJson.token}`,
    },
  });

  const profileJson = await profileRes.json();
  if (!profileRes.ok || !profileJson.ok) {
    throw new Error(`Profile fetch failed: ${profileJson.error || 'unknown'}`);
  }

  const saveStateRes = await fetch(`http://localhost:${port}/api/character/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${registerJson.token}` },
    body: JSON.stringify({
      character: {
        name: registerJson.username,
        level: 12,
        hp: 220,
        gold: 999,
      },
      equipment: [
        { slot: 'weapon', name: 'Kiếm', level: 5 },
        { slot: 'armor', name: 'Giáp', level: 4 },
      ],
    }),
  });

  const saveStateJson = await saveStateRes.json();
  if (!saveStateRes.ok || !saveStateJson.ok) {
    throw new Error(`Character save failed: ${saveStateJson.error || 'unknown'}`);
  }

  const loadStateRes = await fetch(`http://localhost:${port}/api/character/load`, {
    headers: { Authorization: `Bearer ${registerJson.token}` },
  });
  const loadStateJson = await loadStateRes.json();
  if (!loadStateRes.ok || !loadStateJson.ok) {
    throw new Error(`Character load failed: ${loadStateJson.error || 'unknown'}`);
  }

  const rootPage = await fetch(`http://localhost:${port}/`);
  const rootHtml = await rootPage.text();
  if (!rootPage.ok || !rootHtml.includes('<!doctype html>') && !rootHtml.includes('<html')) {
    throw new Error('Root page not served');
  }

  const roomId = `room_${Date.now()}`;
  const p2 = await fetch(`http://localhost:${port}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: `tester2_${Date.now()}`, password: 'demo123' }),
  });
  const p2Json = await p2.json();
  if (!p2.ok || !p2Json.ok) {
    throw new Error('Second user registration failed');
  }

  const chatRes = await fetch(`http://localhost:${port}/api/player-sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: registerJson.token,
      roomId,
      status: 'online',
      chat: 'hello room',
    }),
  });

  const chatJson = await chatRes.json();
  if (!chatRes.ok || !chatJson.ok || !Array.isArray(chatJson.room.messages) || chatJson.room.messages.length === 0) {
    throw new Error('Room chat not stored');
  }

  const attackRes = await fetch(`http://localhost:${port}/api/player-sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: registerJson.token,
      roomId,
      action: 'attack-monster',
      hp: 90,
      level: 6,
    }),
  });

  const attackJson = await attackRes.json();
  if (!attackRes.ok || !attackJson.ok || !attackJson.room.monster || attackJson.room.monster.hp >= attackJson.room.monster.maxHp) {
    throw new Error('Monster combat not applied');
  }

  console.log('SMOKE_TEST_OK', {
    health: healthJson.app,
    user: registerJson.username,
    profile: profileJson.user.profile.level,
    room: roomId,
    chat: chatJson.room.messages.length,
    monsterHp: attackJson.room.monster.hp,
  });
}

(async () => {
  for (let i = 0; i < 30; i++) {
    try {
      await checkServer();
      process.exit(0);
    } catch (error) {
      if (i === 29) {
        console.error('SMOKE_TEST_FAIL', error.message);
        process.exit(1);
      }
      await wait(250);
    }
  }
})();
