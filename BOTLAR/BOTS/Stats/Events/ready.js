const { CronJob } = require("cron");
const messageGuild = require("../../../Database/Stats/messageGuild");
const voiceGuild = require("../../../Database/Stats/voiceGuild");
const messageUser = require("../../../Database/Stats/messageUser");
const voiceUser = require("../../../Database/Stats/voiceUser");
const messageUserChannel = require("../../../Database/Stats/messageUserChannel");
const messageGuildChannel = require("../../../Database/Stats/messageGuildChannel");
const voiceGuildChannel = require("../../../Database/Stats/voiceGuildChannel");
const userParent = require("../../../Database/Stats/voiceUserParent");

class Ready {
  Event = "ready"
  async run() {
    const channel = client.channels.cache.get(kanallar.botSesKanal);
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const guild = client.guilds.cache.get(ayarlar.guildID)
    new CronJob("00 00 * * *", async () => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { dailyStat: 0 } });
      await messageUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.dailyStat = 0
          veri.save()
        });
      });
      await voiceUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.dailyStat = 0
          veri.save()
        });
      });
    }, null, true, "Europe/Istanbul").start();

    new CronJob("00 00 * * 00", async () => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { weeklyStat: 0 } });
      await messageUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.weeklyStat = 0
          veri.save()
        });
      });
      await voiceUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.weeklyStat = 0
          veri.save()
        });
      });
    }, null, true, "Europe/Istanbul").start();

    new CronJob("00 01 1,15 * *", async () => {
      await messageGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: guild.id }, { $set: { twoWeeklyStat: 0 } });
      await messageUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.twoWeeklyStat = 0
          veri.save()
        });
      });
      await voiceUser.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.twoWeeklyStat = 0
          veri.save()
        });
      });
      await messageUserChannel.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.channelData = 0
          veri.save()
        });
      });
      await messageGuildChannel.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.channelData = 0
          veri.save()
        });
      });
      await voiceGuildChannel.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.channelData = 0
          veri.save()
        });
      });
      await userParent.find({ guildID: guild.id }, (err, data) => {
        data.forEach((veri) => {
          veri.parentData = 0
          veri.save()
        });
      });
    }, null, true, "Europe/Istanbul").start();
  }
}

module.exports = Ready