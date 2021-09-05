const { guvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class IntegrationsDelete {
  Event = "guildIntegrationsUpdate"
  async run(guild) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("serverGuard").value()) try {
      let entry = await guild.fetchAuditLogs({ type: 'INTEGRATION_DELETE' }).then(audit => audit.entries.first())
      if (!entry || entry.createdTimestamp <= Date.now() - 5000 || await guvenli(entry.executor.id)) return;
      guild.members.ban(entry.executor.id, { reason: "Entegrasyon Sildiği İçin" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``))
      const logs = client.channels.cache.get(utils.get("serverLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Entegrasyon Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından bir entegrasyon silindi! Entegrasyonu silen kişiyi sunucudan yasakladım!`).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => guild.owner.send({ embeds: [log] })); } else { guild.owner.send({ embeds: [log] }) }
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = IntegrationsDelete