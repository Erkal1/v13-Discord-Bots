const low = require("lowdb")
class TagliAlim extends Command {
  constructor(client) {
    super(client, {
      name: "taglıalım",
      aliases: ["taglıalım"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const yazı = ` - Taglı Alım`
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat") {
      message.channel.send({
        embeds: [embed.setDescription(`
  Lütfen aç/kapat olmak üzere geçerli bir eylem belirtin ${emojiler.dikkat}

  Taglı alım şuanda; ${utils.get("TagliAlim").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`}
  `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("TagliAlim").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Taglı alım sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('TagliAlim', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Taglı alım sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("TagliAlim").value() === false) return message.channel.send({ embeds: [embed.setDescription(`Taglı alım sistemi zaten kapalı ${emojiler.dikkat}`)] })
      else {
        await utils.set('TagliAlim', false).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Taglı alım sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    }
  }
}

module.exports = TagliAlim