import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 AI Affiliate Marketing SaaS Backend active on http://localhost:${PORT}`);
    console.log(`🛡️ FTC Compliance Guardian & Multi-Platform Publishing System Ready`);
  });
}

bootstrap();
