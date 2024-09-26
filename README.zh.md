# nebia

Nebia 是一个轻量级的 Node.js 日志库。

使用其他语言阅读：[English](./README.md) | 简体中文

## 安装

> [!IMPORTANT]
> Nebia 是一个纯 ESM 包，如果你在自己的项目中使用它遇到了困难，可以 [查看这里](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)。

```shell
npm install nebia
```

## 使用

```javascript
import logger from 'nebia';

logger.info('hello world');
```

```shell
[1970-01-01T00:00:00.000Z] [INFO] - hello world
```

你还可以使用 `Logger` 类或者 `createLogger` 来构建新的实例：

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

## 配置项

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
  // 默认 'info'
  level: keyof typeof LogLevel;
  name: string;
}
```
