class Sil extends Command {
  constructor(client) {
    super(client, {
      name: "temizle",
      aliases: ['sil', 'temizle'],
      ownerOnly: true,
    });
  }
  async run(client, message, args) {
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) {
      return message.channel.send(`${emojiler.hata} **UYARI:** En az \`1 - 100\` arasında bir sayı değeri girmelisiniz.`)
    }
    else {
      message.channel.bulkDelete(Number(args[0]), true).then(msg => message.channel.send(`<#${message.channel.id}> kanalında **${msg.size}** adet mesaj başarı ile temizlendi.`))
    }
  }
}

module.exports = Sil