const Inviter = require("../../../Database/Inviter");
const Users = require("../../../Database/Users");
class GuildMemberRemove {
  Event = "guildMemberRemove"
  async run(member) {
    const channel = client.channels.cache.get(kanallar.davetKanalı);
    if (!channel) return;
    if (member.user.bot) return channel.send({ content: `📤 **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **Davetçi bulunamadı**` })
    const inviteMemberData = await Users.findOne({ userID: member.user.id }) || [];
    if (!inviteMemberData.Inviter) {
      return channel.send({ content: `📤 **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **Davetçi bulunamadı**` });
    } else if (inviteMemberData.Inviter.inviter === member.guild.id) {
      await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: member.guild.id }, { $inc: { total: -1 } }, { upsert: true });
      const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: member.guild.id });
      const total = inviterData ? inviterData.total : 0;
      return channel.send({ content: `📤 **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: \`Sunucu Özel URL\` (**${total}** davet)` });
    } else {
      if (Date.now() - member.user.createdTimestamp <= ayarlar.userTime) {
        const inviter = await client.users.fetch(inviteMemberData.Inviter.inviter);
        const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: inviter.id, });
        const total = inviterData ? inviterData.total : 0;  
        return channel.send({ content: `📤 **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **${inviter.tag}** (**${total}** davet)` })
      } else {
        const inviter = await client.users.fetch(inviteMemberData.Inviter.inviter);
        await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
        const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: inviter.id, });
        const total = inviterData ? inviterData.total : 0;  
        return channel.send({ content: `📤 **${member.user.tag}** sunucumuzdan ayrıldı! Davet eden: **${inviter.tag}** (**${total}** davet)` });
      }
    }
  }
}

module.exports = GuildMemberRemove