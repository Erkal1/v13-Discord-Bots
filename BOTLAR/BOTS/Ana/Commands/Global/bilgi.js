const Users = require("../../../../Database/Users")
const { checkDays } = require("../../../../Helpers/function")
class Bilgi extends Command {
  constructor(client) {
    super(client, {
      name: "bilgi",
      aliases: ['bilgi', 'kullanıcıbilgi', "profil"],
      description: ["<@üye/ID>"],
      category: "Global",
      cooldown: 15,
    });
  }
  async run(client, message, args) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await Users.findOne({ userID: member.id }) || [];
    const Yetkili = data.Teyitci ? `<@!${data.Teyitci.Yetkili}>` : "Kayıt Bulunamadı!"
    const Cinsiyet = data.Teyitci ? `<@&${data.Teyitci.Cinsiyet}>` : "Kayıt Bulunamadı!"
    const Zaman = data.Teyitci ? `${new Date(data.Teyitci.date).toTurkishFormatDate()}` : "Kayıt Bulunamadı!"
    let status = member?.presence?.status ? member?.presence?.status?.toString().replace("dnd", `Rahatsız Etmeyin ${emojiler.dnd}`).replace("online", `Çevrimiçi ${emojiler.online}`).replace("idle", `Boşta ${emojiler.idle}`).replace("offline", `Çevrimdışı/Görünmez ${emojiler.offline}`) : `Çevrimdışı/Görünmez ${emojiler.offline}`
    let Cihaz = {
      web: 'İnternet Tarayıcısı',
      desktop: 'Bilgisayar (App)',
      mobile: 'Mobil'
    }
    let clientStatus;
    if (member.presence && member.presence.status !== 'offline') { clientStatus = `${Cihaz[Object.keys(member.presence.clientStatus)[0]]}` } else { clientStatus = 'Çevrimdışı/Görünmez' }
    let kb = `
    \`ID:\` ${member.user.id} 
    \`Profil:\` <@!${member.user.id}>
    \`Durum:\` ${status}
    \`Bağlandığı Cihaz:\` ${clientStatus}
    \`Oluşturma Tarihi:\` ${new Date(member.user.createdTimestamp).toTurkishFormatDate()} **(**${checkDays(member.user.createdAt)}**)**
    `
    let ub = `
    \`Sunucudaki Adı:\` ${member.displayName}
    \`Katılım Tarihi:\` ${new Date(member.joinedTimestamp).toTurkishFormatDate()}
    \`Katılım Sırası:\` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
    \`Kayıt Tarihi:\` ${Zaman} 
    \`Kayıt Eden Yetkili:\` ${Yetkili} 
    \`Cinsiyet:\` ${Cinsiyet}
    `
    const bilgi = new Discord.MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true })).setThumbnail(member.user.avatarURL()).setColor("RANDOM")
      .setDescription(`${member} (${member.roles.highest}) isimli kullanıcının üyelik ve kullanıcı bilgileri`)
      .addFields(
        { name: '❯ Kullanıcı Bilgisi', value: `${kb}`, inline: true },
        { name: '❯ Üyelik Bilgisi', value: `${ub}`, inline: false }
      )
      .setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL());
    message.channel.send({ embeds: [bilgi] });

  }
}

module.exports = Bilgi