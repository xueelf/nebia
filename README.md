# nebia

Nebia is a lightweight logger for Node.js, with no dependencies and size of only 3kb.

Read this in other languages: English | [简体中文](./README.zh.md)

## Installation

> [!IMPORTANT]
> Nebia is a pure ESM package, if you encounter difficulties using it in your project, can [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

```shell
npm install nebia
```

## Usage

```javascript
import logger from 'nebia';

logger.info('hello world');
```

```shell
[1970-01-01T00:00:00.000Z] [INFO] - hello world
```

You can also use `Logger` or `createLogger` to generate new instance:

```javascript
import { createLogger } from 'nebia';

const logger = createLogger();

logger.setName('name');
logger.setLevel('info');
logger.info('hello world');
logger.debug('goodbye universe');
```

```javascript
import { Logger } from 'nebia';

const logger = new Logger({
  name: 'app',
  level: 'debug',
});
logger.info('hello world');
logger.debug('goodbye universe');
```

```shell
[1970-01-01T00:00:00.000Z] [INFO] app - hello world
[9999-12-31T23:59:59.999Z] [INFO] app - goodbye universe
```

## Config

```typescript
enum LogLevel {
  fatal,
  error,
  warn,
  info,
  debug,
  trace,
}

type Level = keyof typeof LogLevel;

interface LogConfig {
  // default 'info'
  level: Level;
  name: string;
}
```
