const { Client, Collection, Intents } = require('discord.js');
const ayarlar = require("../../Settings/ayarlar.json")
const client = global.client = new Client({
  fetchAllMembers: true,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    activities: [ayarlar.durum],
    status: ayarlar.status
  },
});

const config = require("../../Settings/config.json");

require("../../Helpers/Utils")(client)
require("../../Helpers/Mongo").Mongoose.Connect()
client.handler.events(client, '/Events', __dirname);

client.login(config.stats).then(() =>
  client.logger.log(`${client.user.tag} olarak giriş yapıldı!`)).catch((error) =>
    client.logger.error("Discord API Botun tokenini doğrulayamadı." + error));
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