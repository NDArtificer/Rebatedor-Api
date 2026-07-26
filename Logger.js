import fs from 'fs';
import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Logger {

  constructor(a, b) {
    if (typeof a === 'boolean') {
      this.mode = 'console';
      this.verbose = a;
    } else {
      this.mode = 'pino';
      const cliente = a;
      const ambiente = b;
      const logDir = path.join(__dirname, 'logs', ambiente);
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
  }

  // Common logging methods
  info(msg) {
    if (this.mode === 'console') {
      if (!this.verbose) return;
      if (typeof msg === 'object') console.log(msg);
      else console.log('ℹ', msg);
    } else {
      this.logger.info(msg);
    }
  }

  error(msg) {
    if (this.mode === 'console') console.log('✖', msg);
    else this.logger.error(msg);
  }

  warn(msg) {
    if (this.mode === 'console') console.log('⚠', msg);
    else this.logger.warn(msg);
  }

  debug(msg) {
    if (this.mode === 'console') {
      if (this.verbose) console.log('DEBUG', msg);
    } else {
      this.logger.debug(msg);
    }
  }

  // CLI helper methods
  line() {
    const line = '────────────────────────────────────────────────────────────────────────────────────────────────────────';
    if (this.mode === 'console') console.log(line);
    else this.logger.info(line);
  }

  blank() {
    if (this.mode === 'console') console.log();
    else this.logger.info('');
  }

  title(text) {
    this.blank();
    this.line();
    if (this.mode === 'console') console.log(text);
    else this.logger.info(text);
    this.line();
  }

  success(text) {
    if (this.mode === 'console') console.log('✔', text);
    else this.logger.info(text);
  }

  warning(text) {
    this.warn(text);
  }

  action(icon, text) {
    if (this.mode === 'console') console.log(icon, text);
    else this.logger.info(`${icon} ${text}`);
  }

  table(data) {
    if (this.mode === 'console') console.table(data);
    else this.logger.info({ table: data });
  }

}

