const { checkDays, rakam } = require("../../../Helpers/function")
const low = require("lowdb")
class GuildMemberAdd {
  Event = "guildMemberAdd"
  async run(member) {
    if (member.user.bot) return;
    if (member.guild.id === ayarlar.guildID) try {
      const utils = await low(client.adapters('guard'));
      const setNickname = `${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag)} İsim | Yaş`;
      const wellcomeChannel = client.channels.cache.get(kanallar.girisKanal)
      const kontrol = new Date().getTime() - member.user.createdAt.getTime() < ayarlar.userTime ? `**Hesap Durumu:** Şüpheli ${emojiler.basarisiz}` : `**Hesap Durumu:** Güvenli ${emojiler.mavionay}`
      const tag = utils.get("TagliAlim").value() ? `Tagımızı \`${ayarlar.tag}\` alarak kayıt olabilirsin!` : `Tagımızı \`${ayarlar.tag}\` alarak bizlere destek olabilirsin!`
      await member.setNickname(`${setNickname}`)
      if (wellcomeChannel) {
        await wellcomeChannel.send(`
    **${ayarlar.sunucuisim} Sunucusuna Hoş Geldin**
    ${member} (\`${member.id}\`), Seninle birlikte ${rakam(member.guild.members.cache.size)} kişi olduk!
    Kaydının yapılması için ses kanalına bağlanıp teyit vermen gerekli.
    ${tag}
    
    ${kontrol}
    **Hesabın oluşturulma tarihi:** \`${new Date(member.user.createdTimestamp).toTurkishFormatDate()}\` **(**${checkDays(member.user.createdAt)}**)**
  `)
      }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}
module.exports = GuildMemberAdd
