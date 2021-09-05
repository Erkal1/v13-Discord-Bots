const Users = require("../../../../Database/Users");
const moment = require("moment");
moment.locale("tr");
class InviteMember extends Command {
  constructor(client) {
    super(client, {
      name: "invitemember",
      aliases: ['invitemember'],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    const data = await Users.find({});
    const filtered = data.filter(x => message.guild.members.cache.get(x.userID) && x?.Inviter.inviter === message.author.id);
    await message.channel.send({ embeds: [embed.setDescription(filtered.length > 0 ? filtered.map(usr => `<@${usr.userID}> - **${moment(usr.Inviter.date).format("LLL")}** tarihinde.`).join("\n") : "Kimseyi davet etmemiş!")] })
  }
}

module.exports = InviteMember