const { Intents } = require("discord.js")
const { Erkal } = require("./Erkal")
const ayarlar = require("../../Settings/ayarlar.json")
const client = global.client = new Erkal({
  fetchAllMembers: true,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  presence: {
    activities: [ayarlar.durum],
    status: ayarlar.status
  },
});
require("../../Helpers/Utils")(client)
require("../../Helpers/Mongo").Mongoose.Connect()
client.handler.events(client, '/Events/', __dirname);
Erkal.init();
client
  .on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
  .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
  .on("error", e => client.logger.error(e))
  .on("warn", info => client.logger.warn(info));
process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
});
process.on("unhandledRejection", err => {
  console.error("Promise Hatası: ", err);
});