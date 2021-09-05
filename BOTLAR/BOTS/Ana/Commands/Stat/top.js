const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../../../../Database/Stats/messageGuild");
const messageGuildChannel = require("../../../../Database/Stats/messageGuildChannel");
const voiceGuild = require("../../../../Database/Stats/voiceGuild");
const voiceGuildChannel = require("../../../../Database/Stats/voiceGuildChannel");
const messageUser = require("../../../../Database/Stats/messageUser");
const voiceUser = require("../../../../Database/Stats/voiceUser");

class Top extends Command {
  constructor(client) {
    super(client, {
      name: "top",
      aliases: ["top"],
      category: "Stat",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args) {
    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ twoWeeklyStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ twoWeeklyStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });

    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index + 1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join(`\n`);
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index + 1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``).join(`\n`);
    const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika] s [saniye]")}\``).join(`\n`);
    const mesaj = `
    Toplam üye mesajları: \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} mesaj\`

    ${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}
    `
    const mesaj2 = `
    Toplam kanal mesajları: \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} mesaj\`

    ${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}
    `
    const ses = `
    Toplam ses verileri: \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : "Veri Bulunmuyor.").format("H [saat], m [dakika] s [saniye]")}\`

    ${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}
    `

    const ses2 = `
    Toplam ses verileri: \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : "Veri Bulunmuyor.").format("H [saat], m [dakika] s [saniye]")}\`

    ${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}
    `
    const embed = new Discord.MessageEmbed().setDescription(`${message.guild.name} sunucusunun toplam ses ve mesaj verileri`)
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .addFields(
        { name: 'Mesaj | Top 5 - Üyeler', value: `${mesaj}`, inline: true },
        { name: 'Mesaj | Top 5 - Kanallar', value: `${mesaj2}`, inline: false },
        { name: 'Ses | Top 5 - Üyeler', value: `${ses}`, inline: false },
        { name: 'Ses | Top 5 - Kanallar', value: `${ses2}`, inline: false })
      .setColor("RANDOM").setTimestamp().setFooter(message.member.displayName + " tarafından istendi!", message.author.avatarURL({ dynamic: true }))
    await message.channel.send({ embeds: [embed] })
  }
};

module.exports = Top