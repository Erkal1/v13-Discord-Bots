const { chatGuvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class MessageUpdate {
  Event = "messageUpdate"
  async run(oldMessage, newMessage) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || await chatGuvenli(message.author.id) || message.channel.type == "dm") return;
    const content = newMessage.content.toLocaleLowerCase().trim();
    const utils = await low(client.adapters('guard'));
    if (utils.get("urlGuard").value() === true && newMessage.content.match(urlEngel)) {
      if (newMessage.deletable) newMessage.delete();
    } else if (utils.get("swearGuard").value() === true && content.match(kufurEngel)) {
      if (newMessage.deletable) newMessage.delete();
    } else if (utils.get("capsGuard").value() === true && newMessage.content.replace(capsEngel, "").length >= newMessage.content.length / 2) {
      if (newMessage.content.length <= 15) return;
      if (newMessage.deletable) newMessage.delete();
    } else if (emojiEngel.test(newMessage.content) && newMessage.content.match(emojiEngel).length > 6) {
      if (newMessage.deletable) newMessage.delete();
    } else if (newMessage.content.match(inviteEngel)) {
      const invites = await newMessage.guild.invites.fetch();
      if ((newMessage.guild.vanityURLCode && newMessage.content.match(inviteEngel).some((i) => i === newMessage.guild.vanityURLCode)) || invites.some((x) => newMessage.content.match(inviteEngel).some((i) => i === x))) return;
      if (newMessage.deletable) newMessage.delete();
    } else if (message.content.match(etiketEngel) && newMessage.content.match(etiketEngel).length >= 6) {
      if (newMessage.deletable) newMessage.delete();
    } else if (newMessage.activity && newMessage.channel.id !== kanallar.activity && newMessage.activity.partyId.startsWith("spotify:")) {
      if (newMessage.deletable) newMessage.delete();
    }
  };
}
module.exports = MessageUpdate