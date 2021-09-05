class Text extends Command {
  constructor(client) {
    super(client, {
      name: "text",
      aliases: ['text'],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    let mesaj = args.slice(0).join(' ')
    if (mesaj.length < 1) return message.channel.send(`${emojiler.hata} **UYARI:** Herhangi bir şey yazmalısın.`);
    await message.delete().then(x => message.channel.send({ content: mesaj }));
  }
}

module.exports = Text