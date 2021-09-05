const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const messageUserChannel = require("../../../../Database/Stats/messageUserChannel");
const voiceUserChannel = require("../../../../Database/Stats/voiceUserChannel");
const messageUser = require("../../../../Database/Stats/messageUser");
const voiceUser = require("../../../../Database/Stats/voiceUser");
const { category } = require("../../../../Helpers/function")

class Stat extends Command {
  constructor(client) {
    super(client, {
      name: "stat",
      aliases: ["stat"],
      description: ["<@üye/ID>"],
      cooldown: 15,
      category: "Stat",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });

    let messageTop = Active1.length > 0 ? Active1.splice(0, 1).filter(x => message.guild.channels.cache.has(x.channelID)).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."
    let voiceTop = Active2.length > 0 ? Active2.splice(0, 1).filter(x => message.guild.channels.cache.has(x.channelID)).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join("\n") : "Veri bulunmuyor."
    let mesajVeri = Active1.length > 0 ? Active1.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map(x => `• <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
    let kb = `
    • Toplam: \`${moment.duration(voiceData ? voiceData.twoWeeklyStat : 0).format("H [saat], m [dakika] s [saniye]")}\`
    • Public Odaları: \`${await category(kanallar.publicParents, message.guild, message.author)}\`
    • Kayıt Odaları: \`${await category(kanallar.regParents, message.guild, message.author)}\`
    • Özel Odalar: \`${await category(kanallar.privateParents, message.guild, message.author)}\`
    • Oyun Odaları: \`${await category(kanallar.gameParents, message.guild, message.author)}\`
    `
    const stats = new Discord.MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
      .addFields(
        { name: 'Genel Sesli Bilgisi', value: `${kb}`, inline: true },
        { name: 'Genel Sohbet Bilgisi', value: `${mesajVeri}`, inline: false },
      ).setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
    ${member} (${member.roles.highest}) Adlı kişinin sunucu verileri
    `)
      .addField("En Aktif Kanalları", `
    • Mesaj: ${messageTop}
    • Ses: ${voiceTop}
    `)
      .addField("Ses Verileri:", `
     • 14 Gün: \`${moment.duration(voiceData ? voiceData.twoWeeklyStat : 0).format("H [saat], m [dakika] s [saniye]")}\`
     • 7 Gün: \`${moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika] s [saniye]")}\`  
     • 24 Saat: \`${moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika] s [saniye]")}\`
    `, true)
      .addField("Mesaj Verileri:", `
    • 14 Gün: \`${Number(messageData ? messageData.twoWeeklyStat : 0).toLocaleString()} mesaj\`
    • 7 Gün: \`${Number(messageData ? messageData.weeklyStat : 0).toLocaleString()} mesaj\`
    • 24 Saat: \`${Number(messageData ? messageData.dailyStat : 0).toLocaleString()} mesaj\`
    `, true).setColor("RANDOM").setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())
    await message.channel.send({ embeds: [stats] });
  }
};

module.exports = Stat