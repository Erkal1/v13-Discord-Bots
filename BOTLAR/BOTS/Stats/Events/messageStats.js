const messageUser = require("../../../Database/Stats/messageUser");
const messageGuild = require("../../../Database/Stats/messageGuild");
const guildChannel = require("../../../Database/Stats/messageGuildChannel");
const userChannel = require("../../../Database/Stats/messageUserChannel");
class Message {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.channel.type == "dm" || message.content.startsWith(ayarlar.prefix)) return;
    await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
    await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
    await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
    await userChannel.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  }
}

module.exports = Message