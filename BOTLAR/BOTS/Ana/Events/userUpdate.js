const Users = require("../../../Database/Users")
const low = require("lowdb")
class UserUpdate {
  Event = "userUpdate"
  async run(oldUser, newUser) {
    const utils = await low(client.adapters('guard'));
    const settings = await low(client.adapters('ayarlar'));
    const channels = await low(client.adapters('kanallar'));
    if (oldUser.username == newUser.username || oldUser.bot || newUser.bot) {
      return;
    } else try {
      let guild = client.guilds.cache.get(ayarlar.guildID);
      if (!guild) return;
      const user = guild.members.cache.get(oldUser.id);
      if (utils.get("yasakTag").value() === true) {
        if (settings.get("yasakTaglar").value().some(tag => newUser.username.includes(tag)) && !user.roles.cache.has(roller.yasakTagRol) && !user.permissions.has("ADMINISTRATOR") && !user.user.bot) {
          await user.setRoles(roller.yasakTagRol)
          await user.send({ content: `**${user.guild.name}** sunucusunda ismine yasaklı tag aldığın için yasaklı taga atıldın! Tagı bıraktığında tekrardan aramıza katılabilirsin` }).catch(err => logs.send({ content: `${user} isimli kullanıcı sunucuya yasaklı tag ile girdi fakat direkt mesajları kapalı olduğundan bilgilendirme mesajı gönderilemedi!` }))
          await client.channels.cache.get(channels.get('yasakTagLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`<@!${user.id}> isimli kullanıcıya, yasaklı tag aldığı için <@&${roller.yasakTagRol}> rolünü verdim.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`)] });
        } else if (!settings.get("yasakTaglar").value().some(tag => newUser.username.includes(tag)) && user.roles.cache.has(roller.yasakTagRol) && !user.permissions.has("ADMINISTRATOR")) {
          await user.setRoles(roller.kayıtsızRol)
          await user.setNickname(`${ayarlar.tag} İsim | Yaş`)
          await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: user.id } } });
          await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
          await client.channels.cache.get(channels.get('yasakTagLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`<@!${user.id}> isimli kullanıcı, ismindeki yasaklı tagı kaldırdığı için <@&${roller.yasakTagRol}> rolünü aldım.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`)] });
        }
      } else if (newUser.username.includes(ayarlar.tag) && !settings.get("yasakTaglar").value().some(tag => newUser.username.includes(tag)) && !user.roles.cache.has(roller.cezalıRol) && !user.roles.cache.has(roller.yasakTagRol) && !user.roles.cache.has(roller.yeniHesapRol) && !user.roles.cache.has(roller.tagRol)) {
        await user.roles.add(roller.tagRol)
        if (user.manageable) await user.setNickname(user.displayName.replace(ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag, ayarlar.tag))
        await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${user} adlı kullanıcıya adına tagımızı aldığı için <@&${roller.tagRol}> rolü verildi.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
      } else if (utils.get("TagliAlim").value() === true) {
        if (!newUser.username.includes(ayarlar.tag) && !user.permissions.has("ADMINISTRATOR") && !user.user.bot && !user.roles.cache.has(roller.vipRol) && !user.roles.cache.has(roller.boosterRol) && !user.roles.cache.has(roller.kayıtsızRol) && !user.roles.cache.has(roller.cezalıRol) && !user.roles.cache.has(roller.yasakTagRol) && !user.roles.cache.has(roller.yeniHesapRol)) {
          await user.setRoles(roller.kayıtsızRol)
          await user.setNickname(`${ayarlar.tag} İsim | Yaş`)
          await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: user.id } } });
          await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
          await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username + ' - Oto Tag', client.user.avatarURL({ dynamic: true })).setDescription(`${user} adlı kullanıcı adında tagımızı bulundurmadığı için kayıtsıza atıldı.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
        }
      } else if (!newUser.username.includes(ayarlar.tag) && user.roles.cache.has(roller.tagRol)) {
        await user.roles.remove(roller.tagRol)
        await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: user.id } } });
        let renkroller = [roller.Renkler.kirmizi, roller.Renkler.turuncu, roller.Renkler.mavi, roller.Renkler.lila, roller.Renkler.mor, roller.Renkler.pembe, roller.Renkler.yesil]
        if (renkroller.some(rol => user.roles.cache.has(rol))) { await user.roles.remove(renkroller) };
        if (user.manageable) await user.setNickname(user.displayName.replace(ayarlar.tag, ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag))
        await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${user} adlı kullanıcı tagımızı bıraktığı için <@&${roller.tagRol}> rolü alındı.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
      }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = UserUpdate