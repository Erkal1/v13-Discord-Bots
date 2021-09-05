const Users = require('../../../Database/Users')
class Ready {
  Event = "ready"
  async run() {
    const channel = client.channels.cache.get(kanallar.botSesKanal);
    voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    setInterval(() => { TagKontrol(); }, 600 * 1000);
    setInterval(() => { TagKontrol1(); }, 600 * 1000);
    setInterval(() => { TagKontrol2(); }, 60 * 1000);
    setInterval(() => { TagKontrol3(); }, 60 * 1000);
    setInterval(() => { TagKontrol4(); }, 120 * 1000);
    setInterval(() => { cezaKontrol(); }, 15 * 1000);
  }
};
async function TagKontrol() {
  const utils = await low(client.adapters('guard'));
  const settings = await low(client.adapters('ayarlar'));
  const channels = await low(client.adapters('kanallar'));
  if (utils.get("yasakTag").value() === true) try {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    const members = guild.members.cache.filter(member => settings.get("yasakTaglar").value().some(tag => member.user.username.includes(tag)) && !member.roles.cache.has(roller.yasakTagRol) && !member.user.bot).array().splice(0, 10)
    for await (const member of members) {
      await member.setRoles(roller.yasakTagRol)
      await member.send(`**${member.guild.name}** sunucusunda ismine yasaklı tag aldığın için yasaklı taga atıldın! Tagı bıraktığında tekrardan aramıza katılabilirsin`).catch(error => client.logger.error(error))
      await client.channels.cache.get(channels.get('yasakTagLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`**${member.user.tag}** (\`${member.id}\`) isimli kullanıcıya, sunucumuza yasaklı bir tag ile girdiği için <@&${roller.yasakTagRol}> rolünü verdim.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`)] });
    }
  } catch (error) {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
  }
};

async function TagKontrol1() {
  const utils = await low(client.adapters('guard'));
  const settings = await low(client.adapters('ayarlar'));
  const channels = await low(client.adapters('kanallar'));
  if (utils.get("yasakTag").value() === true) try {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    const members = guild.members.cache.filter(member => !settings.get("yasakTaglar").value().some(tag => member.user.username.includes(tag)) && member.roles.cache.has(roller.yasakTagRol) && !member.user.bot).array().splice(0, 10)
    for await (const member of members) {
      await user.setRoles(roller.kayıtsızRol)
      await user.setNickname(`${ayarlar.tag} İsim | Yaş`)
      await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: user.id } } });
      await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
      await client.channels.cache.get(channels.get('yasakTagLog').value()).send({ embeds: [new Discord.MessageEmbed().setTitle('Yasak Tag').setColor("RANDOM").setDescription(`**${member.user.tag}** (\`${member.id}\`) isimli kullanıcı, ismindeki yasaklı tagı kaldırdığı için <@&${roller.yasakTagRol}> rolünü aldım.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`)] });
    }
  } catch (error) {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)
  }
};

async function TagKontrol2() { // TAG ALANA ROL
  const channels = await low(client.adapters('kanallar'));
  const settings = await low(client.adapters('ayarlar'));
  const guild = client.guilds.cache.get(ayarlar.guildID)
  const members = guild.members.cache.filter(member => member.user.username.includes(ayarlar.tag) && !settings.get("yasakTaglar").value().some(tag => member.user.username.includes(tag)) && !member.roles.cache.has(roller.cezalıRol) && !member.roles.cache.has(roller.yasakTagRol) && !member.roles.cache.has(roller.yeniHesapRol) && !member.roles.cache.has(roller.tagRol)).array().splice(0, 10)
  for await (const member of members) {
    await member.roles.add(roller.tagRol);
    if (member.manageable) await member.setNickname(member.displayName.replace(ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag, ayarlar.tag))
    await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${member} adlı kullanıcıya adında tagımızı bulundurduğu için <@&${roller.tagRol}> rolü verildi`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
  }
};

async function TagKontrol3() { // TAGI OLMAYANIN ROLÜNÜ ALMA
  const channels = await low(client.adapters('kanallar'));
  const guild = client.guilds.cache.get(ayarlar.guildID)
  const members = guild.members.cache.filter(member => !member.user.username.includes(ayarlar.tag) && !member.user.bot && member.roles.cache.has(roller.tagRol)).array().splice(0, 10)
  for await (const member of members) {
    await member.roles.remove(roller.tagRol)
    await Users.findOneAndUpdate({ $pull: { Taglilar: { Member: member.id } } });
    let renkroller = [roller.Renkler.kirmizi, roller.Renkler.turuncu, roller.Renkler.mavi, roller.Renkler.lila, roller.Renkler.mor, roller.Renkler.pembe, roller.Renkler.yesil]
    if (renkroller.some(rol => member.roles.cache.has(rol))) { await member.roles.remove(renkroller) };
    if (member.manageable) await member.setNickname(member.displayName.replace(ayarlar.tag, ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag))
    await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle('Oto Tag').setDescription(`${member} adlı kullanıcı adında tagımızı bulundurmadığı için <@&${roller.tagRol}> rolü alındı.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
  }
};

async function TagKontrol4() { // TAGI OLMAYANI KAYITSIZA ATMA
  const utils = await low(client.adapters('guard'));
  const channels = await low(client.adapters('kanallar'));
  if (utils.get("TagliAlim").value() === true) {
    const guild = client.guilds.cache.get(ayarlar.guildID)
    const members = guild.members.cache.filter(member => !member.user.username.includes(ayarlar.tag) && !member.permissions.has("ADMINISTRATOR") && !member.user.bot && !member.roles.cache.has(roller.vipRol) && !member.roles.cache.has(roller.boosterRol) && !member.roles.cache.has(roller.kayıtsızRol) && !member.roles.cache.has(roller.cezalıRol) && !member.roles.cache.has(roller.yasakTagRol) && !member.roles.cache.has(roller.yeniHesapRol)).array().splice(0, 10)
    for await (const member of members) {
      await member.setRoles(roller.kayıtsızRol)
      await member.setNickname(`${ayarlar.tag} İsim | Yaş`)
      await Users.findOneAndUpdate({ $pull: { Taglilar: { Member: member.id } } });
      await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: new String } }, { upsert: true }).exec();
      await client.channels.cache.get(channels.get('tagLog').value()).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username + ' - Oto Tag', client.user.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcı adında tagımızı bulundurmadığı için kayıtsıza atıldı.`).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())] });
    }
  }
};

async function cezaKontrol() {
  const guild = client.guilds.cache.get(ayarlar.guildID)
  if (!guild) return;
  try {
    const bitmisCezalar = await Penalties.find({ guildID: guild.id, Aktif: true, kalkmazamani: { $lte: Date.now() } });
    await bitmisCezalar.forEach(async (data) => {
      const member = guild.members.cache.get(data.userID);
      if (!member) return;
      if (data.Ceza === "CHATMUTE") {
        data.Aktif = false;
        await data.save();
        await member.roles.remove(roller.mutedRol);
      }
    });
    const aktifCezalar = await Penalties.find({ guildID: guild.id, Aktif: true });
    await aktifCezalar.forEach(async (data) => {
      const member = guild.members.cache.get(data.userID);
      if (!member) return;
      if (data.Ceza === "CHATMUTE" && !member.roles.cache.has(roller.mutedRol)) { member.roles.add(roller.mutedRol) }
      if (data.Ceza === "JAIL" && !member.roles.cache.has(roller.cezalıRol)) { member.setRoles(roller.cezalıRol) }
    })
  } catch {
    client.logger.error(`Etkinlik: ${module.exports.name} \nHata: ` + error + ``)

  }
}

module.exports = Ready