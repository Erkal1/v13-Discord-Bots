const { checkDays } = require("../../../../Helpers/function")
class UserInfo extends Command {
  constructor(client) {
    super(client, {
      name: "userinfo",
      aliases: ["uinfo", "userinfo"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    if (!args[0]) return message.channel.send({ embeds: [embed.setDescription(`Lütfen bir kullanıcı ID'si belirtiniz ${emojiler.dikkat}`)] });
    const member = await client.fetchUser(args[0]);
    if (!member) return message.channel.send({ embeds: [embed.setDescription(`Böyle bir kullanıcı bulunamadı ${emojiler.dikkat}`)] });
    let kb = `
    ID: ${member.id} 
    Profil: ${member.tag}
    Oluşturma Tarihi: ${new Date(member.createdTimestamp).toTurkishFormatDate()} **(**${checkDays(member.createdAt)}**)**
    `
    const Bilgi = new Discord.MessageEmbed().setAuthor(member.tag, member.avatarURL({ dynamic: true })).setThumbnail(member.avatarURL()).setColor("RANDOM")
      .setDescription(`${member.tag} İsimli kullanıcının bilgileri`)
      .addFields(
        { name: '❯ Kullanıcı Bilgisi', value: `${kb}`, inline: true },
      )
      .setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL());
    message.channel.send({ embeds: [Bilgi] });
  }
}

module.exports = UserInfo