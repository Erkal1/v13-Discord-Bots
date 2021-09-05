const Users = require("../../../Database/Users")
class GuildMemberUpdate {
  Event = "guildMemberUpdate"
  async run(oldMember, newMember) {
    if (oldMember.roles.cache.has(roller.boosterRol) && !newMember.roles.cache.has(roller.boosterRol)) try {
      Users.findOne({ userID: newMember.id }, async (err, res) => {
        if (!res) return;
        if (!res.Names) return;
        res = res.Names.reverse()
        var History = res.splice(0, 1).map(e => e.Name)
        if (oldMember.roles.cache.has(roller.boosterRol) && !newMember.roles.cache.has(roller.boosterRol)) {
          let setName = `${newMember.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag)} ${History}`;
          if (member.manageable) { await newMember.setNickname(`${setName}`, "Boostu çektiği/bittiği için") }
        };
      })
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = GuildMemberUpdate