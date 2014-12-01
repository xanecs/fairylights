module.exports = {
  notify: [
  {
    type: "email",
    name: "Email (leon@leonadi.de)",
    config: {
      interval: 60,
      email: {
        user: "leon@leonadi.de",
        password: "85j75p1x45q4",
        host: "imap.zoho.com",
        port: 993,
        tls: true
      }
    }
  },
  {
    type: "telegram",
    name: "Telegram",
    config: {
      bin: "/Volumes/vault/leon/git/tg/bin/telegram-cli",
      key: "/etc/telegram/server.pub",
      name: "Leon Bentrup"
    }
  }
  ],
  server: {
    port: 1338,
    host: null
  },
  lights: {
    serial: "/dev/tty.serial1"
  }
}
