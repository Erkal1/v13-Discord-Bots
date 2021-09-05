const low = require("lowdb")
const { checkDays } = require("../../../Helpers/function")
class GuildMemberAdds {
  Event = "guildMemberAdd"
  async run(member) {
    if (member.user.bot) return;
    const aktifCezalar = await Penalties.find({ guildID: member.guild.id, Ceza: "JAIL", Aktif: true });
    const kurulus = new Date().getTime() - member.user.createdAt.getTime();
    const utils = await low(client.adapters('guard'));
    const settings = await low(client.adapters('ayarlar'));
    const channels = await low(client.adapters('kanallar'));
    if (member.guild.id === ayarlar.guildID) try {
      if (utils.get("yasakTag").value() === true && settings.get("yasakTaglar").value().some(tag => member.user.username.includes(tag))) {
        await member.setRoles(roller.yasakTagRol)
        await member.send(`**${member.guild.name}** sunucusuna isminde yasaklı tag ile giriş yaptığın için yasaklı taga atıldın! Tagı bıraktığında tekrardan aramıza katılabilirsin`).catch(err => logs.send(`${member} isimli kullanıcı sunucuya yasaklı tag ile girdi fakat direkt mesajları kapalı olduğundan bilgilendirme mesajı gönderilemedi!`))
        await client.channels.cache.get(channels.get('yasakTagLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`<@!${member.id}> isimli kullanıcıya, sunucumuza yasaklı bir tag ile girdiği için <@&${roller.yasakTagRol}> rolünü verdim ${emojiler.kirmizionay}`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
      } else if (utils.get("yeniHesap").value() === true && kurulus < ayarlar.userTime) {
        await member.setRoles(roller.yeniHesapRol)
        await client.channels.cache.get(channels.get('denetimBilgi').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yeni Hesap').setColor("RANDOM").setTimestamp().setDescription(`<@${member.id}> İsimli kullanıcıya discorda yeni kayıt olduğu için <@&${roller.yeniHesapRol}> rolünü verdim.\n\`Hesabın Açılış Süresi:\` **${new Date(member.user.createdTimestamp).toTurkishFormatDate()}** **(**${checkDays(member.user.createdAt)}**)**`).setFooter(`${ayarlar.altbaslik}`)] })
      } else if (aktifCezalar.some(data => data.userID.includes(member.id))) {
        await member.setRoles(roller.cezalıRol)
        await client.channels.cache.get(channels.get('jailLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Cezalı').setColor("RANDOM").setDescription(`<@!${member.id}> isimli kullanıcıya, sunucudan cezalı iken çıktığı için <@&${roller.cezalıRol}> rolünü verdim ${emojiler.kirmizionay}`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
      } else {
        let roles = [
          roller.kayıtsızRol,
          roller.etkinlik,
          roller.çekiliş,
        ]
        await member.roles.add(roles)
        if (member.user.username.includes(ayarlar.tag) && !member.roles.cache.has(roller.tagRol)) {
          await member.roles.add(roller.tagRol)
          await client.channels.cache.get(kanallar.tagLog).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${member} adlı kullanıcıya adında tagımızı bulundurduğu için <@&${roller.tagRol}> rolü verildi`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
        }
      }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = GuildMemberAdds
