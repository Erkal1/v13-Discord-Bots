const { chatGuvenli } = require("../../../Helpers/function")
const low = require("lowdb")
class Message {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || await chatGuvenli(message.author.id) || message.channel.type == "dm") return;
    const content = message.content.toLocaleLowerCase().trim();
    const utils = await low(client.adapters('guard'));
    if (utils.get("urlGuard").value() === true && message.content.match(urlEngel)) {
      if (message.deletable) message.delete();
    } else if (utils.get("swearGuard").value() === true && content.match(kufurEngel)) {
      if (message.deletable) message.delete();
    } else if (utils.get("capsGuard").value() === true && message.content.replace(capsEngel, "").length >= message.content.length / 2) {
      if (message.content.length <= 15) return;
      if (message.deletable) message.delete().catch(err => err);
    } else if (emojiEngel.test(message.content) && message.content.match(emojiEngel).length > 6) {
      if (message.deletable) message.delete();
    } else if (message.content.match(inviteEngel)) {
      const invites = await message.guild.invites.fetch();
      if ((message.guild.vanityURLCode && message.content.match(inviteEngel).some((i) => i === message.guild.vanityURLCode)) || invites.some((x) => message.content.match(inviteEngel).some((i) => i === x))) return;
      if (message.deletable) message.delete();
    } else if (message.content.match(etiketEngel) && message.content.match(etiketEngel).length >= 6) {
      if (message.deletable) message.delete();
    } else if (message.activity && message.channel.id !== kanallar.activity && message.activity.partyId.startsWith("spotify:")) {
      if (message.deletable) message.delete();
    }
  };
}
module.exports = Message