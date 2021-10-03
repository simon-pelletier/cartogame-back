const log = require("log-beautify");

// logger.trace('Trace');//change the level to use trace
// logger.success('Success');
// logger.ok('Ok');//success alias
// logger.debug('Debug');
// logger.info('Info');
// logger.warning('Warning');
// logger.warn('Warn');//warning alias
// logger.error('Error');

// ⭐❤️❌✈️⚽ ⛏️⚠️✉️⚔️☘️⏳⏭️⏮️✨❓❔➖➕☕

log.setColors({
  success: "#fff",
  listen_: "green",
});
log.setSymbols({
  success: "✈️",
  danger: "⛔ ",
  ok: "✅ ",
  saved: "✅ ",
  listen_: "✨ ",
  error: "⚠️ "
});
log.setLabels({
  warning: "WARNING!!!",
});
log.setTextColors({
  listen_: "white",
});

const logger = {
  emit: (msg) => {
    log.success(` ${msg.toUpperCase()} `);
  },
  listen: (port) => {
    log.listen_(`SERVER LISTENING ON PORT ${port} `);
  },
  success: (msg) => {
    log.ok(` ${msg} `);
  },
  error: (msg) => {
    log.error(` ${msg} `);
  },
  show: (msg, data) => {
    log.show(` ${msg} -> `, data);
  },
};

module.exports = logger;
