const Backup = require("../../../Helpers/Backup")
class Ready {
  Event = "ready"
  async run() {
    const channel = client.channels.cache.get(kanallar.botSesKanal);
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    Backup.RoleBackup();
    setInterval(() => {
      Backup.RoleBackup();
    }, 1000 * 60 * 60 * 1);
  }
}

module.exports = Ready