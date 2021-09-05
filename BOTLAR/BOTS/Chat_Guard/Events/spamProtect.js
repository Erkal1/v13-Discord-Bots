const { chatGuvenli } = require("../../../Helpers/function")
class Spam {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot || message.member.permissions.has("ADMINISTRATOR") || await chatGuvenli(message.author.id) || message.channel.type == "dm") return;
    if (client.spam.has(message.author.id)) {
      const data = client.spam.get(message.author.id);
      const { lastMessage, timer } = data;
      const diff = message.createdTimestamp - lastMessage.createdTimestamp;
      let count = data.count;
      if (diff > 5000) {
        clearTimeout(timer);
        data.count = 1;
        data.lastMessage = message;
        data.timer = setTimeout(() => {
          client.spam.delete(message.author.id);
        }, 10000);
        client.spam.set(message.author.id, data);
      } else {
        count++;
        if (parseInt(count) === 7) {
          let messages = await message.channel.messages.fetch({ limit: 100 });
          let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 7);
          message.channel.bulkDelete(filtered);
        } else {
          data.count = count;
          client.spam.set(message.author.id, data);
        }
      }
    } else {
      let fn = setTimeout(() => {
        client.spam.delete(message.author.id);
      }, 10000);
      client.spam.set(message.author.id, {
        count: 1,
        lastMessage: message,
        timer: fn,
      });
    }
  };
}
module.exports = Spam