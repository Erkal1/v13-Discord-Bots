class Jail extends Command {
    constructor(client) {
        super(client, {
            name: "jail",
            aliases: ['cezalı', 'jail'],
            description: ["<@üye/ID> <sebep>"],
            category: "Moderation",
            perm: [roller.jailHammer],
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.splice(1).join(" ");
        if (!client.beklemeSure.has(module.exports.name)) { client.beklemeSure.set(module.exports.name, new Discord.Collection()); }
        const zamanDamga = client.beklemeSure.get(module.exports.name);
        const beklemeSuresi = 1000 * 60 * ayarlar.Sure;
        if (ayarlar.jailLimit > 0 && client.jailLimit.has(message.author.id) && client.jailLimit.get(message.author.id) == ayarlar.jailLimit && zamanDamga.has(message.author.id)) { const sonaErme = zamanDamga.get(message.author.id) + beklemeSuresi; if (Date.now() < sonaErme) { const timeLeft = (sonaErme - Date.now()) / 1000; return message.channel.send(`${emojiler.hata} **UYARI:** \`${module.exports.name}\` komutunu tekrardan kullanabilmek için \`${timeLeft.toFixed(1)}\` saniye beklemelisin.`); } }
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (member.roles.cache.has(roller.cezalıRol)) return message.channel.send(cevaplar.cezalı)
        if (member.id === message.guild.ownerId) return message.channel.send(cevaplar.yetersizYetkim)
        if (ayarlar.Owners.includes(member.id)) return message.channel.send(cevaplar.botSahibi)
        if (member === message.member) return message.channel.send(cevaplar.kendisi)
        if (member.user.bot) return message.channel.send(cevaplar.üyeBot)
        if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
        if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(cevaplar.üstAynıYetki)
        if (!reason) return message.channel.send(cevaplar.sebepBelirt)
        await member.setRoles(roller.cezalıRol, `Cezalı, Yetkili: ${message.author.id}`)
        if (member.voice.channel) member.voice.kick()
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: member.id, Ceza: "UNJAIL", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, member.id, "JAIL", true, message.author.id, reason, Date.now());
        message.channel.send(`${emojiler.jail} ${member} isimli kullanıcı, **${reason}** sebebiyle sunucuda cezalıya atıldı. (\`#${ceza.id}\`)`)
        zamanDamga.set(message.author.id, Date.now());
        if (ayarlar.jailLimit > 0 && !ayarlar.Owners.includes(message.author.id)) { if (!client.jailLimit.has(message.author.id)) client.jailLimit.set(message.author.id, 1); else { client.jailLimit.set(message.author.id, client.jailLimit.get(message.author.id) + 1); }; setTimeout(() => { if (client.jailLimit.has(message.author.id)) client.jailLimit.delete(message.author.id); zamanDamga.delete(message.author.id); }, beklemeSuresi); }
        message.guild.log("Cezalı", member.id, message.author.id, channels.get('jailLog').value(), ceza.id, reason)
        await member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **${reason}** sebebiyle cezalıya atıldın.` }).catch(err => message.channel.send({ content: `<@!${member.id}> adlı kullanıcının özel mesajları kapalı olduğu için bilgilendirme mesajı gönderilmedi` }))
    }
}
module.exports = Jail