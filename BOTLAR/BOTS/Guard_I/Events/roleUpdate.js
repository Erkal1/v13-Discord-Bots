const { guvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class RoleUpdate {
  Event = "roleUpdate"
  async run(oldRole, newRole) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("roleGuard").value() === true) try {
      let entry = await newRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(audit => audit.entries.first());
      if (!entry || Date.now() - entry.createdTimestamp > 5000 || !newRole.guild.roles.cache.has(newRole.id) || await guvenli(entry.executor.id)) return;
      await newRole.guild.members.ban(entry.executor.id, { reason: "Rol Güncellediği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      await newRole.edit({
        name: oldRole.name,
        color: oldRole.hexColor,
        hoist: oldRole.hoist,
        permissions: oldRole.permissions,
        mentionable: oldRole.mentionable
      });
      const logs = client.channels.cache.get(utils.get("roleLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Rol Güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından rol güncellendi! Güncelleyen kişiyi sunucudan yasakladım ve rolü eski haline getirdim.\nGüncellenen Rol: **${oldRole.name}**`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => newRole.guild.owner.send({ embeds: [log] })); } else { newRole.guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = RoleUpdate