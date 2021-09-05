const Users = require('../../../../Database/Users')
class KayitSira extends Command {
  constructor(client) {
    super(client, {
      name: "kayıtsıralama",
      aliases: ['ksıra', 'kayıtsıralama'],
      cooldown: 60,
      perm: [roller.registrar],
      category: "Register",
      channel: kanallar.komutKanal,
    });
  }
  async run(client, message, args, embed) {
    let data = await Users.find().sort({ TeyitNo: "descending" })
    let teyitList = data.filter((x) => message.guild.members.cache.has(x.userID) && x.TeyitNo >= 1).map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value.userID)} \`${value.Teyitler.filter(v => v.Gender === "Erkek").length + value.Teyitler.filter(v => v.Gender === "Kadın").length} Kayıt\``).slice(0, 20)
    await message.channel.send({ embeds: [new Discord.MessageEmbed().addField("Kayıtlar", `${teyitList.join("\n") || "Kayıt verisi bulunamadı!"}`, true).setAuthor(message.guild.name + " Kayıt Sıralaması", message.guild.iconURL({ dynamic: true })).setThumbnail(message.guild.iconURL({ dynamic: true })).setColor("RANDOM").setTimestamp().setFooter(message.member.displayName + " tarafından istendi!", message.author.avatarURL({ dynamic: true }))] });
  }
}

module.exports = KayitSira