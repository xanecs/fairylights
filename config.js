module.exports = {
  telegram: {
    bin: "/home/pi/tg/bin/telegram-cli",
    key: "/etc/telegram/server.pub",
    name: "Leon Bentrup"
  },
  email: {
    user: "leon@leonadi.de",
    password: "***",
    host: "imap.zoho.com",
    port: 993,
    tls: true
  },
  server: {
    port: 1338,
    host: null
  }
}
