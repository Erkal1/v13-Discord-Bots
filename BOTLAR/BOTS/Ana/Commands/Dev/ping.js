class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["ping"],
      devOnly: true,
    });
  }
  async run(client, message) {
    message.channel.send(`**${client.ws.ping}** ms Olarak Hesapland─▒.`)
  }
}

module.exports = Ping