import { stderr } from 'node:process';
import { format } from 'node:util';

enum LogColor {
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
  BlackBg = 40,
  RedBg = 41,
  GreenBg = 42,
  YellowBg = 43,
  BlueBg = 44,
  MagentaBg = 45,
  CyanBg = 46,
  WhiteBg = 47,
}
type Color = keyof typeof LogColor;

function colorful(text: string, ...colors: Color[]): string {
  const style: string = colors.map(color => LogColor[color]).join(';');
  return `\u001b[${style}m${text}\u001b[0m`;
}

export enum LogLevel {
  fatal,
  error,
  warn,
  info,
  debug,
  trace,
}
export type Level = keyof typeof LogLevel;

export interface LogConfig {
  level?: Level;
  name?: string;
}

export interface Logger {
  config: Required<LogConfig>;
  fatal(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  trace(...args: any[]): void;
  setLevel(level: Level): void;
  setName(name: string): void;
}
export class Logger {
  public config: Required<LogConfig>;

  constructor(init: LogConfig | Level = 'info') {
    switch (typeof init) {
      case 'string':
        this.config = {
          level: init,
          name: '',
        };
        break;
      case 'object':
        this.config = Object.assign(
          {
            level: 'info',
            name: '',
          },
          init,
        );
        break;
      default:
        throw new Error('Invalid log init');
    }
    const methods: Level[] = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

    methods.forEach(level => {
      Reflect.set(this, level, this.log.bind(this, level));
    });
  }

  private get order(): number {
    return LogLevel[this.config.level];
  }

  private getDate(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const utc = new Date(date.getTime() - offset);

    return utc.toISOString();
  }

  private setColor(text: string, level: Level) {
    switch (level) {
      case 'fatal':
        return colorful(text, 'Magenta');
      case 'error':
        return colorful(text, 'Red');
      case 'warn':
        return colorful(text, 'Yellow');
      case 'info':
        return colorful(text, 'Green');
      case 'debug':
        return colorful(text, 'Cyan');
      case 'trace':
        return colorful(text, 'Blue');
    }
  }

  private log(level: Level, ...args: any[]): boolean {
    if (LogLevel[level] > this.order) {
      return false;
    }
    const date: string = this.getDate();
    const tag: string = level.toUpperCase();
    const name: string = this.config.name ? `${this.config.name} ` : '';
    const message: string = format(...args);
    const prefix: string = this.setColor(`[${date}] [${tag}] ${name}- `, level);

    return stderr.write(`${prefix}${message}\n`);
  }

  public setLevel(level: Level): void {
    this.config.level = level;
  }

  public setName(name: string): void {
    this.config.name = name;
  }
}

/**
 * Create a new logger instance.
 *
 * @param init - The initial configuration or log level.
 * @returns A new logger instance.
 */
function createLogger(init: LogConfig | Level = 'info'): Logger {
  return new Logger(init);
}

module.exports = createLogger;
