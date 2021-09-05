const low = require("lowdb")
const Users = require("../../../../Database/Users");
const { kayıt } = require("../../../../Helpers/function")
const Discord = require("discord.js")
class Kayit extends Command {
  constructor(clients) {
    super(clients, {
      name: "kayıt",
      aliases: ['kayıt', 'k'],
      cooldown: 5,
      description: ["<@üye/ID> <isim> <yaş>"],
      category: "Register",
      perm: [roller.registrar],
      channel: kanallar.girisKanal,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined
    let kayıtRolleri = [
      ...roller.erkek,
      ...roller.kadın
    ]
    if (!member) return message.channel.send(cevaplar.üyeBelirt);
    if (utils.get("TagliAlim").value() === true && !member.user.username.includes(ayarlar.tag) && !member.roles.cache.has(roller.vipRol) && !member.roles.cache.has(roller.boosterRol)) return message.channel.send(cevaplar.tagsızÜye)
    if (member.roles.cache.has(roller.cezalıRol)) return message.channel.send(cevaplar.cezalı)
    if (member.roles.cache.has(roller.yeniHesapRol)) return message.channel.send(cevaplar.yeniHesap)
    if (member.roles.cache.has(roller.yasakTagRol)) return message.channel.send(cevaplar.yasaklıTag)
    if (kayıtRolleri.some(role => member.roles.cache.has(role))) return message.channel.send(cevaplar.üyeKayıtlı)
    if (member.user.bot) return message.channel.send(cevaplar.üyeBot)
    if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
    if (!isim) return message.channel.send(cevaplar.isimBelirt)
    if (!yaş) return message.channel.send(cevaplar.yaşBelirt)
    if (yaş > 80 || yaş < 10) return message.channel.send(cevaplar.yaşBelirt)
    let setName = `${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag)} ${isim} | ${yaş}`;
    if (setName.length > 32) return message.channel.send(cevaplar.isimApiSınır)
    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId('Erkek')
          .setEmoji(`${emojiler.male}`)
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('Kadın')
          .setEmoji(`${emojiler.female}`)
          .setStyle('PRIMARY'),
        new Discord.MessageButton()
          .setCustomId('CANCEL')
          .setEmoji(`${emojiler.basarisiz}`)
          .setStyle('PRIMARY'),
      );
    let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${member} adlı kullanıcının cinsiyetini buttonlara tıklayarak belirtiniz lütfen.`)] })
    var filter = (button) => button.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    let kadınRol = message.guild.roles.cache.get(roller.kadın[0])
    let erkekRol = message.guild.roles.cache.get(roller.erkek[0])
    collector.on('collect', async (button, user) => {
      try {
        if (button.customId === "Erkek") {
          if (msg) await msg.delete()
          await member.setNickname(`${setName}`, `Erkek Kayıt, Yetkili: ${message.author.id}`);
          await kayıt(member, message.author, isim, yaş, "Erkek", roller.erkek[0])
          const data = await Users.find({ userID: message.author.id })
          const ytistatistik = data.map(value => `• Toplam kayıtı: \`${value ? value.TeyitNo : 0}\`\n • Erkek kayıtı: \`${value.Teyitler.filter(v => v.Gender === "Erkek").length}\`\n • Kadın kayıtı: \`${value.Teyitler.filter(v => v.Gender === "Kadın").length}\``)
          const kayıtonay = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`Kullanıcı sunucumuza başarıyla kayıt oldu ${emojiler.mavionay}
                    
        • Kayıt Edilen Kullanıcı: • ${member}
        • Kullanıcının İsmi: • ${isim} | ${yaş}
        • Kullanıcının Cinsiyeti: • <@&${roller.erkek[0]}>
        • Kayıt Eden Yetkili: • ${message.author}
        `)
            .addField("Yetkilinin İstatistikleri", `${ytistatistik}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true }))
            .setColor(erkekRol.hexColor)
          if (message) await message.react(emojiler.mavionay)
          button.reply({ embeds: [kayıtonay], ephemeral: true })
          client.channels.cache.get(kanallar.genelSohbet).send({ content: `${member} adlı üye aramıza katıldı, ${ayarlar.sunucuisim} Krallığı büyümeye devam ederek **${member.guild.memberCount}** kişiye sahip oldu!` }).then(e => setTimeout(() => e.delete(), 7000))
        } else if (button.customId === "CANCEL") {

          if (msg) msg.delete().catch(err => { });
          await message.channel.send({ embeds: [embed.setDescription(`${message.author}, Kayıt işlemi iptal edildi.`)] })

        } else if (button.customId === "Kadın") {
          if (msg) await msg.delete()
          await member.setNickname(`${setName}`, `Kadın Kayıt, Yetkili: ${message.author.id}`);
          await kayıt(member, message.author, isim, yaş, "Kadın", roller.kadın[0])
          const data = await Users.find({ userID: message.author.id })
          const ytistatistik = data.map(value => `• Toplam kayıtı: \`${value ? value.TeyitNo : 0}\`\n • Erkek kayıtı: \`${value.Teyitler.filter(v => v.Gender === "Erkek").length}\`\n • Kadın kayıtı: \`${value.Teyitler.filter(v => v.Gender === "Kadın").length}\``)
          const kayıtonay2 = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`Kullanıcı sunucumuza başarıyla kayıt oldu ${emojiler.mavionay}
              
        • Kayıt Edilen Kullanıcı: • ${member}
        • Kullanıcının İsmi: • ${isim} | ${yaş}
        • Kullanıcının Cinsiyeti: • <@&${roller.kadın[0]}>
        • Kayıt Eden Yetkili: • ${message.author}
        `)
            .addField("Yetkilinin İstatistikleri", `${ytistatistik}`)
            .setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true }))
            .setColor(kadınRol.hexColor)
          if (message) await message.react(emojiler.mavionay)
          button.reply({ embeds: [kayıtonay2], ephemeral: true })
          client.channels.cache.get(kanallar.genelSohbet).send({ content: `${member} adlı üye aramıza katıldı, ${ayarlar.sunucuisim} Krallığı büyümeye devam ederek **${member.guild.memberCount}** kişiye sahip oldu!` }).then(e => setTimeout(() => e.delete(), 7000))
        }
      } catch (e) {
        if (message) await message.react(emojiler.basarisiz)
        await message.channel.send({ content: `Komut çalıştırılırken bir hata ile karşılaşıldı!\nHata: \`` + e + `\`` });
      }
    });
    collector.on("end", async (collected, reason) => {
      if (reason === "time") {
        if (msg) await msg.delete()
        message.channel.send({ embeds: [embed.setDescription(`${message.author}, 30 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi ${emojiler.basarisiz}`)] })
      }
    });

  }
}

module.exports = Kayit
