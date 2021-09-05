const Inviter = require("../../../../Database/Inviter");
const Users = require("../../../../Database/Users");
class Inviters extends Command {
  constructor(client) {
    super(client, {
      name: "inviters",
      aliases: ['inviters'],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    var amount = args[2]
    if (!args[0] || args[0].toLowerCase() !== "ekle" && args[0].toLowerCase() !== "sil" && args[0].toLowerCase() !== "sorgu") return message.channel.send({ embeds: [embed.setDescription(`Lütfen \`ekle/sil/sorgu\` olmak üzere geçerli bir eylem belirtin ${emojiler.dikkat}`)] })
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    if (!args[0] || args[0].toLowerCase() === "ekle") {
      if (!args[2] || isNaN(amount)) return message.channel.send({ embeds: [embed.setDescription(`Lütfen bonus davet sayısına eklemek için geçerli bir miktar belirtin ${emojiler.dikkat}`)] })
      await Inviter.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { bonus: parseInt(amount) } }, { upsert: true });
      message.channel.send({ embeds: [embed.setDescription(`${member.toString()} üyesine **${amount}** adet bonus davet eklendi ${emojiler.mavionay}`)] });
    } else if (!args[0] || args[0].toLowerCase() === "sil") {
      const data = await Inviter.findOne({ guildID: message.guild.id, userID: member.user.id });
      if (!data) return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcının herhangi bir davet verisi bulunmuyor ${emojiler.dikkat}`)] })
      if (!data.bonus) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıda bonus davet bulunmuyor ${emojiler.dikkat}`)] })
      if (!args[2] || isNaN(amount)) return message.channel.send({ embeds: [embed.setDescription(`Lütfen bonus davet sayısından çıkarmak için geçerli bir miktar belirtin ${emojiler.dikkat}`)] })
      if (data.bonus < args[2]) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcı girilen sayı miktarı kadar bonusa sahip değil ${emojiler.dikkat}`)] })
      else {
        data.bonus -= parseInt(amount);
        data.save();
        message.channel.send({ embeds: [embed.setDescription(`${member.toString()} üyesinden **${amount}** adet bonus davet çıkarıldı ${emojiler.kirmizionay}`)] });
      }
    } else if (!args[0] || args[0].toLowerCase() === "sorgu") {
      const data = await Users.findOne({ userID: member.user.id });
      if (!data?.Inviter) return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcıyı kimin davet ettiğini bulamadım ${emojiler.dikkat}`)] })
      else {
        if (data.Inviter.inviter === message.guild.id) {
          return message.channel.send({ embeds: [embed.setDescription(`${member.toString()} üyesi, ${new Date(member.joinedAt).toTurkishFormatDate()} tarihinde **${message.guild.name}** tarafından davet edilmiş.`)] });
        } else {
          const inviter = await client.users.fetch(data.Inviter.inviter);
          return message.channel.send({ embeds: [embed.setDescription(`${member.toString()} üyesi, ${new Date(member.joinedAt).toTurkishFormatDate()} tarihinde **${inviter.tag}** \`(${inviter.id})\` tarafından davet edilmiş.`)] });
        }
      }
    }
  }
}

module.exports = Inviters