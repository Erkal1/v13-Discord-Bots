const Discord = require("discord.js")
const Inviter = require("../../../../Database/Inviter");
class Invites extends Command {
  constructor(client) {
    super(client, {
      name: "invites",
      aliases: ['invites', 'davet', 'invite'],
      cooldown: 10,
      perm: [roller.registrar],
      description: ["<@üye/ID>"],
      category: "Stat",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await Inviter.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = data ? data.total : 0;
    const regular = data ? data.regular : 0;
    const bonus = data ? data.bonus : 0;
    const leave = data ? data.leave : 0;
    const fake = data ? data.fake : 0;
    const invMember = await inviteMember.find({ guildID: message.guild.id, inviter: member.user.id });
    const daily = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    message.channel.send({
      embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(member.user.username, member.user.avatarURL({ dynamic: true })).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setDescription(`
    Toplam **${total + bonus}** davete sahip. (**${regular}** giren, **${leave}** ayrılmış, **${fake}** sahte, **${bonus}** bonus)
    Günlük: **${daily}**, Haftalık: **${weekly}**
    `)]
    });
  }
}

module.exports = Invites