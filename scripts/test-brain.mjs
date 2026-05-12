import { processMessage, handleSmartQuery } from '../src/lib/brain.js';

async function run() {
  const tests = [
    'Hi',
    'How are you?',
    'What is Entraiot?',
    'Tell me about your services',
    'What is AI?',
    'I want a demo',
    'pricing',
    'contact',
    'test.user@example.com',
    'Can you explain predictive maintenance?'
  ];

  for (const t of tests) {
    try {
      const reply = await processMessage(t, { sessionId: 'test_session' });
      console.log('INPUT:', t);
      console.log('REPLY:', reply);
      console.log('---');
    } catch (err) {
      console.error('Error for', t, err);
    }
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
