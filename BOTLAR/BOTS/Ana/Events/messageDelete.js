const Snipe = require("../../../Database/Snipe");
class Message {
  Event = "messageDelete"
  async run(message) {
    if(message.author.bot) return;
    await Snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: message.content, userID: message.author.id, image: message.attachments.first() ? message.attachments.first().proxyURL : null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
  }
}

module.exports = Message