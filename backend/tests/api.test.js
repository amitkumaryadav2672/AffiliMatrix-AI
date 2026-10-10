/**
 * Automated smoke tests for backend API
 */
import assert from 'assert';

console.log('🧪 Running backend smoke tests...');

async function testHealth() {
  const res = await fetch('http://localhost:5000/health').catch(() => null);
  if (res) {
    const data = await res.json();
    assert.strictEqual(data.status, 'ok', 'Health status should be ok');
    console.log('✅ Health check passed');
  } else {
    console.log('ℹ️ Server offline (run npm run dev:backend to test live)');
  }
}

testHealth();
