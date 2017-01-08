/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  info: (...args) => {
    console.info(...args.map(x => chalk.blue(x)));
  },
  log: (...args) => {
    console.log(...args.map(x => chalk.gray(x)));
  },
  error: (...args) => {
    console.error(...args.map(x => chalk.red(x)));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, tunnelStarted) => {
    console.log(`start! ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
    (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}
    `);
  },
};

module.exports = logger;
