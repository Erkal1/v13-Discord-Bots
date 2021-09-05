const Users = require('../../../../Database/Users')
class KayitBilgi extends Command {
  constructor(client) {
    super(client, {
      name: "kayıtbilgi",
      aliases: ['kbilgi', 'kayıtbilgi'],
      cooldown: 15,
      description: ["<@üye/ID>"],
      perm: [roller.registrar],
      category: "Register",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await Users.findOne({ userID: member.id }) || [];
    const kayıtlar = new Discord.MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL()).setDescription(`${member} toplam **${data.TeyitNo ? data.TeyitNo : 0}** kayıt yapmış! (**${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Erkek").length : 0}** erkek, **${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Kadın").length : 0}** kadın)`).setColor('RANDOM').setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL());
    return message.channel.send({ embeds: [kayıtlar] })
  }
}

module.exports = KayitBilgi