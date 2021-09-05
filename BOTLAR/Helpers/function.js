const Users = require("../Database/Users");
const fetch = require("node-fetch");
const roleBackup = require("../Database/Role")
const allowedFormats = ["webp", "png", "jpg", "jpeg", "gif"];
const allowedSizes = Array.from({ length: 9 }, (e, i) => 2 ** (i + 4));
const voiceUser = require("../Database/Stats/voiceUser");
const voiceGuild = require("../Database/Stats/voiceGuild");
const guildChannel = require("../Database/Stats/voiceGuildChannel");
const userChannel = require("../Database/Stats/voiceUserChannel");
const userParent = require("../Database/Stats/voiceUserParent");
const low = require("lowdb")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  async chatGuvenli(kisiID) {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    const utils = await low(client.adapters('guard'));
    const whiteList = utils.get("cwhiteList").value()
    const Botlar = utils.get("Bots").value()
    let uye = client.users.cache.get(kisiID);
    let guvenliler = whiteList || [];
    let guvenliBotlar = Botlar || [];
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || guvenliler.some(g => g.includes(uye.id)) || guvenliBotlar.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async guvenli(kisiID) {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    const utils = await low(client.adapters('guard'));
    const whiteList = utils.get("whiteList").value()
    const Botlar = utils.get("Bots").value()
    let uye = client.users.cache.get(kisiID);
    let guvenliler = whiteList || [];
    let guvenliBotlar = Botlar || [];
    if (uye.id === client.user.id || uye.id === ayarlar.root || uye.id === guild.ownerId || guvenliler.some(g => g.includes(uye.id)) || guvenliBotlar.some(g => g.includes(uye.id))) return true
    else return false;
  },
  async ytKapat(guildID) {
    const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"]
    const guild = client.guilds.cache.get(guildID)
    guild.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
  },
  async kayıt(member, author, isim, yaş, cinsiyet, Rol) {
    cins = cinsiyet === "Erkek" ? roller.erkek : roller.kadın
    await member.kayıtRol(cins)
    await Users.findOneAndUpdate({ userID: author.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
    await Users.findOneAndUpdate({ userID: author.id }, { $push: { Teyitler: { userID: member.id, rol: Rol, date: Date.now(), Gender: cinsiyet } } }, { upsert: true });
    await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: author.id, Name: `${isim} | ${yaş}`, rol: Rol, islem: "Kayıt" } } }, { upsert: true });
    await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: author.id, Cinsiyet: Rol, date: Date.now() } } }, { upsert: true });
  },
  async saveStats(user, channel, data) {
    await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
    await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
    await guildChannel.findOneAndUpdate({ guildID: user.guild.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    await userChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    if (channel.parent) await userParent.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentId }, { $inc: { parentData: data } }, { upsert: true });
  },
  async category(parentsArray, guild, author) {
    const data = await userParent.find({ guildID: guild.id, userID: author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
  },
  checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " gün" : " gün") + " önce";
  },
  rakam(sayi) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
    if (basamakiki) {
      basamakbir = basamakbir.replace(/([0-9])/g, d => {
        return {
          '0': `${emojiler.sifir}`,
          '1': `${emojiler.bir}`,
          '2': `${emojiler.iki}`,
          '3': `${emojiler.uc}`,
          '4': `${emojiler.dort}`,
          '5': `${emojiler.bes}`,
          '6': `${emojiler.alti}`,
          '7': `${emojiler.yedi}`,
          '8': `${emojiler.sekiz}`,
          '9': `${emojiler.dokuz}`
        }
        [d];
      })
    }
    return basamakbir;
  },
  sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  },
  async getBanner(userId, {
    format,
    size,
    dynamic
  } = {}) {
    async function createBannerURL(userId, banner, format, size, dynamic) {
      if (dynamic) format = banner.startsWith("a_") ? "gif" : format;
      return `https://cdn.discordapp.com/banners/${userId}/${banner}.${format}${parseInt(size) ? `?size=${parseInt(size)}` : ''}`
    }
    if (format && !allowedFormats.includes(format)) throw new SyntaxError("Please specify an available format.");
    if (size && (!allowedSizes.includes(parseInt(size)) || isNaN(parseInt(size)))) throw new SyntaxError("Please specify an avaible size.");
    if (dynamic && typeof dynamic !== "boolean") throw new SyntaxError("Dynamic option must be Boolean.")
    let Data = ""
    try {
      await fetch(`https://discord.com/api/v9/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bot ${this.client.token}`
        }
      }).then(res => res.json())
        .then(user => {
          if (user.code == 50035) throw new SyntaxError("User not found.")
          if (user.banner !== null) Data = createBannerURL(user.id, user.banner, format, size, dynamic)
          if (user.banner === null && user.banner_color !== null) Data = `https://cdn.discordapp.com/attachments/858763802166558720/880093285710962698/nobanner.png`;
          if (user.banner === null && user.banner_color === null) Data = `https://cdn.discordapp.com/attachments/858763802166558720/880093285710962698/nobanner.png`;
        })
    } catch (err) {
      throw new Error("An unexpected error occurred.");
    }
    return Data
  },
}