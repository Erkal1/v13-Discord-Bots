const Discord = require("discord.js");
const permConf = require("../../../Settings/perms")
class MessageCreate {
  Event = "messageCreate"
  async run(message) {
    if (message.author.bot) return
    const content = message.content.toLocaleLowerCase()
    if (content === "tag" || content === ".tag" || content === "!tag") {
      message.channel.send(`${ayarlar.tag}`)
    }
    if (!message.content.toLocaleLowerCase().startsWith(ayarlar.prefix) || !message.guild || message.channel.type == "dm") return;
    let args = message.content.toLocaleLowerCase().substring(ayarlar.prefix.length).split(" ");
    let komutAd = args[0]
    let talentPerm = permConf.Perms.find((e) => e.commands === args[0]);
    args = message.content.split(' ').slice(1);
    let cmd;
    if (client.commands.has(komutAd)) {
      cmd = client.commands.get(komutAd);
    } else if (client.aliases.has(komutAd)) {
      cmd = client.commands.get(client.aliases.get(komutAd));
    }
    if (talentPerm) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!talentPerm.permissions.some(m => message.member.roles.cache.has(m)) && message.author.id !== ayarlar.root && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(`${emojiler.hata} **UYARI:** **${talentPerm.commands.charAt(0).replace('i', "İ").toUpperCase() + talentPerm.commands.slice(1)}** komutunu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(e => setTimeout(() => e.delete(), 7000))
      if (!member) return message.channel.send(cevaplar.üyeBelirt)
      if (member.roles.cache.has(talentPerm.roles)) {
        member.roles.remove(talentPerm.roles)
      } else {
        member.roles.add(talentPerm.roles)
      }
      await message.react(emojiler.mavionay)
    }
    if (!cmd) return;
    const embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.username, message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true }))
    const uyarı = `${emojiler.hata} **UYARI:** **${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}** komutunu kullanabilmek için yeterli yetkiye sahip değilsin!`
    if (message.author.id === ayarlar.root) try {
      cmd.run(client, message, args, embed).catch(error => { if (message) message.react(emojiler.basarisiz); message.channel.send({ content: `Komut çalıştırılırken bir hata ile karşılaşıldı!\nHata: \`` + error + `\`` }); })
    } catch (error) {
      if (message) message.react(emojiler.basarisiz)
      message.channel.send({ content: `Komut çalıştırılırken bir hata ile karşılaşıldı!\nHata: \`` + e + `\`` });
    } else if (!cmd.config.enabled) {
      return message.channel.send(`\`${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}\` isimli komut şuanda devre dışı!`).then(e => setTimeout(() => e.delete(), 7000))
    } else if (cmd.config.devOnly) {
      return message.channel.send(uyarı).then(e => setTimeout(() => e.delete(), 7000))
    } else if (cmd.config.ownerOnly && !ayarlar.Owners.includes(message.author.id)) {
      return message.channel.send(uyarı).then(e => setTimeout(() => e.delete(), 7000))
    } else if (ayarlar.Owners.includes(message.author.id)) {
      client.logger.log(`[${message.author.id}] ${message.author.username}, [${cmd.info.name}] isimli komudu çalıştırdı`, "cmd");
      cmd.run(client, message, args, embed).catch(error => { client.logger.error(`Komut: ${cmd.info.name}` + error) })
    } else if (cmd.info.perm && !cmd.info.perm.some(rol => message.member.roles.cache.has(rol))) {
      return message.channel.send(uyarı).then(e => setTimeout(() => e.delete(), 7000))
    } else if (cmd.info.channel && !cmd.info.channel.includes(message.channel.id)) {
      return message.channel.send(`\`${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}\` isimli komut yalnızca <#${cmd.info.channel[0]}> kanalında kullanılabilir.`).then(e => setTimeout(() => e.delete(), 7000))
    } else {
      if (!client.cooldowns.has(cmd.info.name)) {
        client.cooldowns.set(cmd.info.name, new Discord.Collection());
      }
      const timestamp = client.cooldowns.get(cmd.info.name);
      const timeOut = (cmd.info.cooldown || 1) * 1000;
      if (ayarlar.cmdLimit > 0 && client.cmdLimit.has(message.author.id) && client.cmdLimit.get(message.author.id) === ayarlar.cmdLimit && timestamp.has(message.author.id)) {
        const sonaErme = timestamp.get(message.author.id) + timeOut;
        if (Date.now() < sonaErme) { const timeLeft = (sonaErme - Date.now()) / 1000; return message.channel.send(`${emojiler.hata} **UYARI:** \`${cmd.info.name.charAt(0).replace('i', "İ").toUpperCase() + cmd.info.name.slice(1)}\` komutunu tekrardan kullanabilmek için \`${timeLeft.toFixed(1)}\` saniye beklemelisin.`).then(e => setTimeout(() => e.delete(), 7000)); }
      }
      timestamp.set(message.author.id, Date.now());
      if (ayarlar.cmdLimit > 0) { if (!client.cmdLimit.has(message.author.id)) client.cmdLimit.set(message.author.id, 1); else { client.cmdLimit.set(message.author.id, client.cmdLimit.get(message.author.id) + 1); }; }
      setTimeout(() => {
        if (client.cmdLimit.has(message.author.id)) client.cmdLimit.delete(message.author.id); timestamp.delete(message.author.id)
      }, timeOut)
      try {
        client.logger.log(`[${message.author.id}] ${message.author.username}, [${cmd.info.name}] isimli komudu çalıştırdı`, "cmd");
        cmd.run(client, message, args, embed).catch(error => { client.logger.error(`Komut: ${cmd.info.name}` + error) })
      } catch (error) {
        client.logger.error(`Komut: ${cmd.info.name}` + error)
      }
    }
  }
}

module.exports = MessageCreate