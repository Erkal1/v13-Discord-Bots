class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ['ban', 'yasakla', 'yargı', 'sg'],
            description: ["<@üye/ID> <sebep>"],
            category: "Moderation",
            perm: [roller.banHammer],
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        if (!client.beklemeSure.has(module.exports.name)) { client.beklemeSure.set(module.exports.name, new Discord.Collection()); }
        const zamanDamga = client.beklemeSure.get(module.exports.name);
        const beklemeSuresi = 1000 * 60 * ayarlar.Sure;
        if (ayarlar.banLimit > 0 && client.banLimit.has(message.author.id) && client.banLimit.get(message.author.id) == ayarlar.banLimit && zamanDamga.has(message.author.id)) {
            const sonaErme = zamanDamga.get(message.author.id) + beklemeSuresi; if (Date.now() < sonaErme) { const timeLeft = (sonaErme - Date.now()) / 1000; return message.channel.send(`${emojiler.hata} **UYARI:** \`${module.exports.name}\` komutunu tekrardan kullanabilmek için \`${timeLeft.toFixed(1)}\` saniye beklemelisin.`); }
        }
        if (!args[0]) return message.channel.send(cevaplar.üyeBelirt);
        const user = message.mentions.users.first() || await client.fetchUser(args[0]);
        if (!user) return message.channel.send(cevaplar.üyeBelirt);
        const banlı = await client.fetchBan(message.guild, args[0]);
        if (banlı) return message.channel.send(cevaplar.banlı);
        const uye = message.guild.members.cache.get(user.id)
        const reason = args.splice(1).join(" ");
        if (ayarlar.Owners.includes(user.id)) return message.channel.send(cevaplar.botSahibi)
        if (uye === message.member) return message.channel.send(cevaplar.kendisi)
        if (uye && uye.user.bot) return message.channel.send(cevaplar.üyeBot)
        if (uye && !uye.bannable) return message.channel.send(cevaplar.yetersizYetkim)
        if (uye && uye.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(cevaplar.üstAynıYetki)
        if (!reason) return message.channel.send(cevaplar.sebepBelirt)
        if (uye) { uye.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **${reason}** sebebiyle yasaklandın.` }).catch(err => message.channel.send({ content: `<@!${uye.id}> adlı kullanıcının özel mesajları kapalı olduğu için bilgilendirme mesajı gönderilmedi` })) }
        await message.guild.members.ban(user.id, { reason: reason + ` Yetkili: ${message.author.id}` })
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: user.id, Ceza: "UNBAN", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, user.id, "BAN", true, message.author.id, reason, Date.now());
        message.channel.send(`${emojiler.ban} ${uye ? uye.toString() : `**${user.username}**`} isimli kullanıcı **${reason}** sebebiyle sunucudan yasaklandı. (\`#${ceza.id}\`)`)
        zamanDamga.set(message.author.id, Date.now());
        if (ayarlar.banLimit > 0 && !ayarlar.Owners.includes(message.author.id)) { if (!client.banLimit.has(message.author.id)) client.banLimit.set(message.author.id, 1); else { client.banLimit.set(message.author.id, client.banLimit.get(message.author.id) + 1); }; setTimeout(() => { if (client.banLimit.has(message.author.id)) client.banLimit.delete(message.author.id); zamanDamga.delete(message.author.id); }, beklemeSuresi); }
        message.guild.log("Yasaklanma", user.id, message.author.id, channels.get('banLog').value(), ceza.id, reason)
    }
}

module.exports = Ban
