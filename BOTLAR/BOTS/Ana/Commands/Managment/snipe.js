const snipe = require("../../../../Database/Snipe");
const moment = require("moment");
require("moment-duration-format");
class Snipe extends Command {
  constructor(client) {
    super(client, {
      name: "snipe",
      aliases: ['snipe'],
      cooldown: 15,
      category: "Managment",
      perm: [...roller.yönetimRolleri],
    });
  }
  async run(client, message, args) {
    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) return message.channel.send(`${emojiler.hata} **UYARI:** Bu kanalda silinmiş bir mesaj bulunmuyor!`);
    const author = await client.fetchUser(data.userID);
    const embed = new Discord.MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true }))
    embed.setDescription(`${data.messageContent ? `\n\`Mesaj içeriği:\` ${data.messageContent}` : ""}
\`Mesajın yazılma tarihi:\` ${moment.duration(Date.now() - data.createdDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
\`Mesajın silinme tarihi:\` ${moment.duration(Date.now() - data.deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
    `);
    if (author) embed.setAuthor(author.tag, author.avatarURL({ dynamic: true, size: 2048 }));
    if (data.image) embed.setImage(data.image);
    message.channel.send({ embeds: [embed] });
  }
};

module.exports = Snipe
