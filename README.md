# nebia

Nebia is a lightweight logger for Node.js.

## Installation

```shell
npm install nebia
```

## Usage

```javascript
const logger = require('nebia')();

logger.info('hello world');
```

```shell
[1970-01-01T00:00:00.000Z] [INFO] - hello world
```

You can also use `Logger` to generate new instance:

```javascript
const { Logger } = require('nebia');

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

interface LogConfig {
  // default 'info'
  level: keyof typeof LogLevel;
  name: string;
}
```
