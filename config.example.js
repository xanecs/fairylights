module.exports = {
  notify: [
    {
      type: "email",
      name: "Email (leon@leonadi.de)",
      config: {
        interval: 60,
        email: {
          user: "leon@leonadi.de",
          password: "***",
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
        bin: "/home/pi/tg/bin/telegram-cli",
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
    serial: "/dev/ttyACM0"
  }
}
