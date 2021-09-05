const Users = require("../../../../Database/Users")
class KullaniciIsim extends Command {
  constructor(client) {
    super(client, {
      name: "isim",
      aliases: ['isim', 'kullanıcıisim'],
      description: ["<@üye/ID> <isim> <yaş>"],
      cooldown: 15,
      category: "Register",
      perm: [roller.registrar],
    });
  }
  async run(client, message, args, embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined
    if (!member) return message.channel.send(cevaplar.üyeBelirt);
    if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
    if (!isim) return message.channel.send(cevaplar.isimBelirt)
    if (!yaş) return message.channel.send(cevaplar.yaşBelirt)
    if (yaş > 80 || yaş < 10) return message.channel.send(cevaplar.yaşBelirt)
    let setName = `${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag)} ${isim} | ${yaş}`;
    if (setName.length > 32) return message.channel.send(cevaplar.isimApiSınır)
    if (member.manageable) await member.setNickname(`${setName}`, `İsim Değiştirme, Yetkili: ${message.author.id}`)
    await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `${isim} | ${yaş}`, islem: "İsim Değiştirme" } } }, { upsert: true });
    await message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcının ismi  \`${setName}\` olarak ayarlandı. ${emojiler.mavionay}`)] });
    client.channels.cache.get(kanallar.denetimBilgi).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle("Kullanıcı İsim").setDescription(`${member} Adlı kullanıcının ismi, ${new Date(message.createdAt).toTurkishFormatDate()} tarihinde, ${message.author} tarafından **${setName}** olarak ayarlandı ${emojiler.mavionay}`).setTimestamp().setFooter(message.member.displayName, message.author.avatarURL({ dynamic: true }))] });
  }
}

module.exports = KullaniciIsim