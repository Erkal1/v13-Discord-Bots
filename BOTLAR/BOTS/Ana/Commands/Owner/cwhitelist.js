const low = require("lowdb")
class WhiteList extends Command {
  constructor(client) {
    super(client, {
      name: "cwhitelist",
      aliases: ["cwhitelist", "cgüvenli"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.users.first() || await client.fetchUser(args[1]);
    const utils = await low(client.adapters('guard'));
    const whiteList = utils.get("cwhiteList").value()
    if (!args[0] || args[0].toLowerCase() !== "ekle" && args[0].toLowerCase() !== "çıkar") {
      var sayi = 1
      if (!whiteList) return message.channel.send({ embeds: [embed.setDescription(`Güvenli listede herhangi bir üye bulunamadı ${emojiler.dikkat}\nEklemek için: ${ayarlar.prefix}güvenli ekle @üye/üyeid`)] })
      let güvenli = whiteList.map(e => `<@!${e}>`).join("\n")
      whiteList.map(e => `\`${sayi++}-\``).join("\n")
      await message.channel.send({ embeds: [embed.setDescription(`**${message.guild.name}** Sunucusunda Toplam **${sayi - 1}** Kişi Güvenli Listede Bulunuyor!\n(Bu Liste Yalnızca Chat Guard Botu için Geçerlidir)\nGüvenli listeye eklemek/çıkarmak için \`${ayarlar.prefix}güvenli ekle/çıkar @üye/üyeid\`\n\n${güvenli}`)] })
    } else if (args[0].toLowerCase() === "ekle") {
      if (!args[1]) return message.channel.send(cevaplar.üyeBelirt)
      if (!member) return message.channel.send(cevaplar.üyeBelirt)
      else if (whiteList.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede ${emojiler.dikkat}`)] })
      else {
        utils.get("cwhiteList").push(member.id).write()
        await message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile güvenli listeye eklendi ${emojiler.mavionay}`)] })
      }
    } else if (args[0].toLowerCase() === "çıkar") {
      if (!args[1]) return message.channel.send(cevaplar.üyeBelirt)
      if (!member) return message.channel.send(cevaplar.üyeBelirt)
      else if (!whiteList.some(x => x.includes(member.id))) return message.channel.send({ embeds: [embed.setDescription(`Bu üye zaten güvenli listede değil ${emojiler.dikkat}`)] })
      else {
        utils.get("cwhiteList").pull(member.id).write()
        await message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı başarı ile güvenli listeden çıkarıldı ${emojiler.kirmizionay}`)] })
      }
    }

  }
}

module.exports = WhiteList