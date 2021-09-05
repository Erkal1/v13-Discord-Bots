const Discord = require("discord.js");
const { guvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class ChannelOverwriteUpdate {
  Event = "channelUpdate"
  async run(oldChannel, newChannel) {
    const utils = await low(client.adapters('guard'));
    if (utils.get("channelGuard").value()) try {
      let entry = await newChannel.guild.fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_UPDATE' }).then(audit => audit.entries.first());
      if (!entry || entry.createdTimestamp <= Date.now() - 3000 || await guvenli(entry.executor.id) || entry.target.id !== newChannel.id) return;
      newChannel.guild.members.ban(entry.executor.id, { reason: "Kanal İzinlerini Güncellediği İçin Uzaklaştırıldı" }).catch(error => client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``));
      let logs = client.channels.cache.get(utils.get("channelLog").value());
      const log = new Discord.MessageEmbed().setColor("RANDOM").setTitle(client.user.username + ' - Kanal İzin Güncelleme Koruması').setDescription(`**${entry.executor.tag}** \`(${entry.executor.id})\` tarafından kanal güncellendi! Kanalı güncelleyen kişiyi sunucudan attım ve kanalı eski haline getirdim.\nGüncellenen Kanal: \`${oldChannel.name}\``).setTimestamp()
      if (logs) { logs.send({ embeds: [log] }).catch(err => newChannel.guild.owner.send({ embeds: [log] })); } else { newChannel.guild.owner.send({ embeds: [log] }) }
      await newChannel.permissionOverwrites.set(oldChannel.permissionOverwrites.cache.array());
    } catch (error) {
      client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
    }
  }
}

module.exports = ChannelOverwriteUpdate