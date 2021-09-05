const low = require("lowdb")
class YeniHesap extends Command {
  constructor(client) {
    super(client, {
      name: "yenihesap",
      aliases: ["yenihesap"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const yazı = ` - Yeni Hesap`
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat") {
      message.channel.send({
        embeds: [embed.setDescription(`
 Lütfen aç/kapat olmak üzere geçerli bir eylem belirtin ${emojiler.dikkat}

 Yeni hesap koruma şuanda; ${utils.get("yeniHesap").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`}
 `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("yeniHesap").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Yeni hesap koruma sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('yeniHesap', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Yeni hesap koruma sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("yeniHesap").value() === false) return message.channel.send({ embeds: [embed.setDescription(`Yeni hesap koruma sistemi zaten kapalı ${emojiler.dikkat}`)] })
      else {
        await utils.set('yeniHesap', false).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Yeni hesap koruma sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    }
  }
}

module.exports = YeniHesap