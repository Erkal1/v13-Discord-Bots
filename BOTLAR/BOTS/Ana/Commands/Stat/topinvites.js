const Inviter = require("../../../../Database/Inviter");
class TopInvites extends Command {
  constructor(client) {
    super(client, {
      name: "topinvites",
      aliases: ['topinvites'],
      cooldown: 10,
      perm: [roller.registrar],
      category: "Stat",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args, embed) {
    let data = await Inviter.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length) return message.channel.send({ embeds: [embed.setDescription(`Herhangi bir davet verisi bulunamadı ${emojiler.dikkat}`)] })
    let list = data.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 15).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${x.total + x.bonus} Davet\``).join("\n");
    await message.channel.send({ embeds: [new Discord.MessageEmbed().addField("Davetler", `${list}`, true).setAuthor(message.guild.name + " Davet Sıralaması", message.guild.iconURL({ dynamic: true })).setThumbnail(message.guild.iconURL({ dynamic: true })).setColor("RANDOM").setTimestamp().setFooter(message.member.displayName + " tarafından istendi!", message.author.avatarURL({ dynamic: true }))] })
  }
}

module.exports = TopInvites
