class Ready {
  Event = "ready"
  async run() {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Discord.Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      client.invites.set(guild.id, cacheInvites);
    });
    const channel = client.channels.cache.get(kanallar.botSesKanal);
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }
}
module.exports = Ready;
