const low = require("lowdb")
class YasakTag extends Command {
  constructor(client) {
    super(client, {
      name: "yasaktag",
      aliases: ["yasaktag"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const yazı = ` - Yasak Tag`
    if (!args[0] || args[0].toLowerCase() !== "aç" && args[0].toLowerCase() !== "kapat" && args[0].toLowerCase() !== "ekle" && args[0].toLowerCase() !== "çıkar" && args[0].toLowerCase() !== "liste") {
      message.channel.send({
        embeds: [embed.setDescription(`
  Lütfen aç/kapat/ekle/çıkar/liste olmak üzere geçerli bir eylem belirtin ${emojiler.dikkat}

  Yasak tag koruma şuanda; ${utils.get("yasakTag").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`}
  `)]
      })
    } else if (args[0].toLowerCase() === "aç") {
      if (utils.get("yasakTag").value() === true) return message.channel.send({ embeds: [embed.setDescription(`Yasak tag koruma sistemi zaten açık ${emojiler.dikkat}`)] })
      else {
        await utils.set('yasakTag', true).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Yasak tag koruma sistemi başarı ile açıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }

    } else if (args[0].toLowerCase() === "kapat") {
      if (utils.get("yasakTag").value() === false) return message.channel.send({ embeds: [embed.setDescription(`Yasak tag koruma sistemi zaten kapalı ${emojiler.dikkat}`)] })
      else {
        await utils.set('yasakTag', false).write();
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.username + yazı, client.user.avatarURL({ dynamic: true }))
            .setDescription(`Yasak tag koruma sistemi başarı ile kapatıldı ${emojiler.mavionay}`)
            .setTimestamp()]
        })
      }
    } else if (args[0].toLowerCase() === "ekle") {
      const tag = args.splice(1).join(" ");
      if (!tag) return message.channel.send({ embeds: [embed.setDescription(`Lütfen yasaklı taga eklemek için geçerli bir tag belirtin ${emojiler.dikkat}`)] });
      else if (yasakTag.some(x => x.includes(tag))) return message.channel.send({ embeds: [embed.setDescription(`Bu tag zaten yasaklı ${emojiler.dikkat}`)] })
      else {
        utils.get("yasakTaglar").push(tag).write()
        message.channel.send({ embeds: [embed.setDescription(`**${tag}** başarı ile yasaklı taga eklendi ${emojiler.mavionay}`)] })
      }
    } else if (args[0].toLowerCase() === "çıkar") {
      const tag = args.splice(1).join(" ");
      if (!tag) return message.channel.send({ embeds: [embed.setDescription(`Lütfen yasaklı taga eklemek için geçerli bir tag belirtin ${emojiler.dikkat}`)] });
      else if (!yasakTag.some(x => x.includes(tag))) return message.channel.send({ embeds: [embed.setDescription(`Bu tag zaten yasaklı değil ${emojiler.dikkat}`)] })
      else {
        utils.get("yasakTaglar").pull(tag).write()
        message.channel.send({ embeds: [embed.setDescription(`**${tag}** başarı ile yasaklı tagdan çıkarıldı ${emojiler.kirmizionay}`)] })
      }
    } else if (args[0].toLowerCase() === "liste") {
      var sayi = 1
      if (!yasakTag) return message.channel.send({ embeds: [embed.setDescription(`Herhangi bir yasaklı tag bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}yasaktag ekle \`Tag\``)] })
      let yasakliTag = yasakTag.map(e => `**${e}**`).join("\n")
      yasakTag.map(e => `\`${sayi++}-\``).join("\n")
      message.channel.send({
        embeds: [embed
          .setDescription(`
    **${message.guild.name}** Sunucusunda Toplam **${sayi - 1}** Yasaklı Tag Bulunuyor!
    Yasaklı taga eklemek/çıkarmak için \`${ayarlar.prefix}yasaktag ekle/çıkar tag\`

    ${yasakliTag}
    `)]
      })
    }
  }
}

module.exports = YasakTag