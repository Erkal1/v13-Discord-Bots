class TEST extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      aliases: ['test'],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {

    // const array = ["Sara", "Bob"]

    // const scores = new Map([
    //   ['Sara', 12],
    //   ['Bob', 11],
    //   ['Jill', 15],
    //   ['Bruce', 14]]);

    // for (let e = 0; e < array.length; e++){
    //   let role = array[e]
    //   console.log(scores.get(role))
    // }
    // const veri = await overwrites.findOne({ channelID: message.channel.id })
    // const newOverwrite = [];
    // for (let index = 0; index < veri.overwrites.length; index++) {
    //   const data = veri.overwrites[index];
    //   newOverwrite.push({
    //     id: data.id,
    //     allow: new Discord.Permissions(data.allow).toArray(),
    //     deny: new Discord.Permissions(data.deny).toArray()
    //   });
    // }
    // await message.channel.permissionOverwrites.set(newOverwrite);

    // let Permissions = [];
    // message.channel.permissionOverwrites.cache.forEach(perm => {
    //   Permissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
    // });
    // console.log(Permissions)
    // const newData = new overwrites({
    //   channelID: message.channel.id,
    //   overwrites: Permissions
    // });
    // await newData.save();
    //const guildInvites = client.invites.get(member.guild.id) || new Discord.Collection()
    // const invites = await message.guild.invites.fetch();
    // const invite = invites.find((x) => guildInvites.has(x.code) && guildInvites.get(x.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
    // console.log(invites.find((x) => (x.code == "ZsUuJssn")).uses)
    // const entry = await message.guild.fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_DELETE' }).then(audit => audit.entries.first());
    // console.log(entry)
    // console.log(message.channel.permissionOverwrites.cache.array())
    // let channelPerm = message.channel.permissionOverwrites.cache.has("856792307932200960")
    // let channelPerm = message.channel.permissionOverwrites.cache.get("856792307932200960");
    // let perms = { id: message.channel.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
    // const veri = await dataBase.findOne({ roleID: "872013550472802375"})
    // const role = message.guild.roles.cache.get("856792307932200960")
    // await role.setPermissions(veri.permissions)
    // console.log(role.permissions.bitfield)
    // console.log(veri.permissions)
    // let msg = await message.channel.send({ content: "test başladı" });
    // let reactions = ["◀", "❌", "▶"];
    // for (let reaction of reactions) await msg.react(reaction);
    // const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === message.author.id }
    // const collector = msg.createReactionCollector({ filter, time: 10000 })
    // collector.on('collect', async (reaction, user) => {
    //   if (reaction.emoji.name === "▶") {
    //     if (msg) msg.edit({ content: "ileri git basıldı " });
    //     await reaction.users.remove(message.author.id).catch(err => { });

    //   } else if (reaction.emoji.name === "❌") {
    //     if (msg) msg.edit({ content: "iptal basıldı " });
    //     await reaction.users.remove(message.author.id).catch(err => { });

    //   } else if (reaction.emoji.name === "◀") {
    //     if (msg) msg.edit({ content: "geri git basıldı " });
    //     await reaction.users.remove(message.author.id).catch(err => { });

    //   }
    // });
    // message.channel.send(!message.member.permissions.has("ADMINISTRATOR") ? "evet" : "hayır")
    //   const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.match(new RegExp(args.join(' '), 'gi')));
    //   if (!args[0] || !role || role.id === message.guild.id) return message.channel.send('Hata: Belirtilen rol bulunamadı yada rol numarası geçersiz!');
    //   message.channel.send(`Rol: ${role.name} | ${role.id} (${role.members.size < 1 ? 'Bu rolde hiç üye yok!' : role.members.size})`, { code: 'xl' });
    //   message.channel.send(role.members.array().map((x) => x.toString()).join(', '), { code: 'xl', split: { char: ', ' } });

    //   var üyesayısı = rakam(message.guild.members.cache.size)
    //   const kurulus = new Date().getTime() - message.member.user.createdAt.getTime();

    //   var kontrol;
    //   if (kurulus < ayarlar.userTime) kontrol = `**Hesap Durumu:** Şüpheli ${emojiler.basarisiz}`
    //   if (kurulus > ayarlar.userTime) kontrol = `**Hesap Durumu:** Güvenli ${emojiler.mavionay}`
    //   message.channel.send(`
    //   **${ayarlar.sunucuisim} Sunucusuna Hoş Geldin**
    //   ${emojiler.power} ${message.member} (\`${message.member.id}\`), Seninle birlikte ${üyesayısı} kişi olduk!
    //   ${emojiler.hastag}  Kaydının yapılması için ses kanalına bağlanıp teyit vermen gerekli.
    //   ${emojiler.waiting} <@&${roller.registrar}> rolünde sahip yetkililer seninle ilgilenecektir.
    //   ${emojiler.hype} Tagımızı \`${ayarlar.tag}\` alarak bizlere destek olabilirsin!

    //   ${emojiler.hype2} ${kontrol}
    //   ${emojiler.discord} **Hesabın oluşturulma tarihi:** \`${new Date(message.member.user.createdTimestamp).toTurkishFormatDate()}\` **(**${checkDays(message.member.user.createdAt)}**)**
    // `)

    //   messageUserChannel.find({ guildID: message.guild.id }, (err, data) => {
    //     data.forEach((veri) => {
    //       veri.channelData = 0
    //       veri.save()
    //     });
    //   });
    //   messageUser.find({ guildID: message.guild.id }, (err, data) => {
    //     data.forEach((veri) => {
    //       veri.dailyStat = 0
    //       veri.save()
    //     });
    // });
    // const entry = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(audit => audit.entries.first());
    // console.log(entry)
    //   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    //   if (!member) {
    //     uyeBelirt()
    //     function uyeBelirt() {
    //       const filter = response => {
    //         return response.author.id === message.author.id;
    //       }
    //       message.channel.send("Uye Belirtiniz")
    //       message.channel.awaitMessages(filter, {
    //         max: 1,
    //         time: 30000,
    //         errors: ['time'],
    //       }).catch(err => {
    //         message.reply("Komut iptal edildi.")
    //         return;
    //       }).then(collected => {
    //         if (!collected) return;
    //         const response = collected.first();
    //         let member = response.mentions.members.first() || message.guild.members.cache.get(response.content)
    //         if (response.content.toLowerCase() === 'iptal') return message.reply("Komut iptal edildi.")
    //         if (member) { 
    //           message.channel.send(`Uye Belirildi ${member}`)
    //          }
    //         else { 
    //           uyeBelirt() 
    //         }
    //       })
    //     }
    //   }
  }
}

module.exports = TEST