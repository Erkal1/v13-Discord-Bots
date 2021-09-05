const Inviter = require("../../../Database/Inviter");
const Users = require("../../../Database/Users");
class GuildMemberAdd {
  Event = "guildMemberAdd"
  async run(member) {
    const channel = client.channels.cache.get(kanallar.davetKanalı);
    if (!channel) return;
    let entry = await member.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
    if (member.user.bot && entry) return channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **${entry.executor.tag}**` })
    const guildInvites = client.invites.get(member.guild.id) || new Discord.Collection()
    const invites = await member.guild.invites.fetch();
    const invite = invites.find((inv) => guildInvites.has(inv.code) && inv.uses > guildInvites.get(inv.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
    const cacheInvites = new Discord.Collection();
    invites.map((inv) => { cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter }); });
    client.invites.set(member.guild.id, cacheInvites);
    if (invite === null) {
      channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **Davetçi bulunamadı**` })
    } else if (invite === undefined) {
      channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **Davetçi bulunamadı**` })
    } else if (!invite) {
      channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **Davetçi bulunamadı**` })
    } else if (invite === member.guild.vanityURLCode) {
      await Users.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: { inviter: member.guild.id, date: Date.now() } } }, { upsert: true });
      await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: member.guild.id }, { $inc: { total: 1 } }, { upsert: true });
      const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: member.guild.id });
      const total = inviterData ? inviterData.total : 0;
      return channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: \`Sunucu Özel URL\` (**${total}** davet)` });
    } else {
      await Users.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: { inviter: invite.inviter.id, date: Date.now() } } }, { upsert: true });
      if (Date.now() - member.user.createdTimestamp <= ayarlar.userTime) {
        await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { fake: 1, regular: 1 } }, { upsert: true });
        const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
        const total = inviterData ? inviterData.total : 0;
        channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **${invite.inviter.tag}** (**${total}** davet)` });
      } else {
        await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
        const inviterData = await Inviter.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
        const total = inviterData ? inviterData.total : 0;
        channel.send({ content: `📥 ${member} sunucumuza katıldı! Davet eden: **${invite.inviter.tag}** (**${total}** davet)` });
      }
    }
  }
}

module.exports = GuildMemberAdd
