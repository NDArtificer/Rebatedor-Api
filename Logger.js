import fs from 'fs';
import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  constructor(cliente, ambiente) {
    const logDir = path.join(__dirname, 'logs', ambiente);
    // cria diretório recursivamente
    fs.mkdirSync(logDir, { recursive: true });

    const level = process.env.LOG_LEVEL || 'info';
    const fileName = `${cliente}.log`;

    this.logger = pino({
      level,
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            options: { colorize: true },
            level
          },
          {
            target: 'pino/file',
            options: { destination: path.join(logDir, fileName) },
            level
          }
        ]
      }
    });
  }

  info(msg) { this.logger.info(msg); }
  error(msg) { this.logger.error(msg); }
  warn(msg) { this.logger.warn(msg); }
  debug(msg) { this.logger.debug(msg); }

}

export default Logger;
