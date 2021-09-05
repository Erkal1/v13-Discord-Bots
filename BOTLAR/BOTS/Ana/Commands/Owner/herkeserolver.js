const { rolVer } = require("../../../../Helpers/BackupFunction")
class RolVer extends Command {
  constructor(client) {
    super(client, {
      name: "herkeserolver",
      aliases: ["herkeserolver", "herkeserolver"],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!role) return message.channel.send(cevaplar.rolBelirt)
    else if (role) {
      await message.channel.send({ embeds: [embed.setDescription(`${role} isimli rol sunucuda bulunan toplam ${message.guild.members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).size} kişiye dağıtılıyor.`)] })
      rolVer(message.guild, role)
    }
  }
}

module.exports = RolVer