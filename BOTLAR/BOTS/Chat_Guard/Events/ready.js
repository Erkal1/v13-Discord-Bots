class Ready {
  Event = "ready"
  async run() {
    client.user.setPresence({ activities: [ayarlar.durum], status: ayarlar.status });
    const channel = client.channels.cache.get(kanallar.botSesKanal);
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }
}


module.exports = Ready