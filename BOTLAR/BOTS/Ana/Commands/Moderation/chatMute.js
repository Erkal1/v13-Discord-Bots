const ms = require('ms');
class Mute extends Command {
    constructor(client) {
        super(client, {
            name: "chatmute",
            aliases: ["chatmute", "mute"],
            description: ["<@üye/ID> <süre> <sebep>"],
            category: "Moderation",
            perm: [roller.muteHammer],
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        if (!client.beklemeSure.has(module.exports.name)) { client.beklemeSure.set(module.exports.name, new Discord.Collection()); }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const sure = args[1] ? ms(args[1]) : undefined;
        const reason = args.splice(2).join(" ");
        const zamanDamga = client.beklemeSure.get(module.exports.name);
        const beklemeSuresi = 1000 * 60 * ayarlar.Sure;
        if (ayarlar.muteLimit > 0 && client.muteLimit.has(message.author.id) && client.muteLimit.get(message.author.id) == ayarlar.muteLimit && zamanDamga.has(message.author.id)) { const sonaErme = zamanDamga.get(message.author.id) + beklemeSuresi; if (Date.now() < sonaErme) { const timeLeft = (sonaErme - Date.now()) / 1000; return message.channel.send(`${emojiler.hata} **UYARI:** \`${module.exports.name}\` komutunu tekrardan kullanabilmek için \`${timeLeft.toFixed(1)}\` saniye beklemelisin.`); } }
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (member.roles.cache.has(roller.mutedRol)) return message.channel.send(cevaplar.muteli)
        if (ayarlar.Owners.includes(member.id)) return message.channel.send(cevaplar.botSahibi)
        if (member === message.member) return message.channel.send(cevaplar.kendisi)
        if (member.user.bot) return message.channel.send(cevaplar.üyeBot)
        if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
        if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(cevaplar.üstAynıYetki)
        if (!sure) return message.channel.send(cevaplar.süreBelirt)
        if (!reason) return message.channel.send(cevaplar.sebepBelirt)
        await member.roles.add(roller.mutedRol, `Chat Mute, Yetkili: ${message.author.id}`)
        const muteSure = args[1].replace(`s`, " Saniye").replace(`m`, " Dakika").replace(`h`, " Saat").replace(`d`, " Gün").replace(`w`, " Hafta")
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: member.id, Ceza: "CHATUNMUTE", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, member.id, "CHATMUTE", true, message.author.id, reason, Date.now(), muteSure, Date.now() + sure);
        message.channel.send(`${emojiler.cmute} ${member} isimli kullanıcı, **${reason}** sebebiyle **${muteSure}** boyunca metin kanallarında susturuldu. (\`#${ceza.id}\`)`)
        zamanDamga.set(message.author.id, Date.now());
        if (ayarlar.muteLimit > 0 && !ayarlar.Owners.includes(message.author.id)) { if (!client.muteLimit.has(message.author.id)) client.muteLimit.set(message.author.id, 1); else { client.muteLimit.set(message.author.id, client.muteLimit.get(message.author.id) + 1); }; setTimeout(() => { if (client.muteLimit.has(message.author.id)) client.muteLimit.delete(message.author.id); zamanDamga.delete(message.author.id); }, beklemeSuresi); }
        message.guild.log("Chat Mute", member.id, message.author.id, channels.get('muteLog').value(), ceza.id, reason, muteSure)
        await member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **${reason}** sebebiyle **${muteSure}** boyunca metin kanallarında susturuldun.` }).catch(err => message.channel.send({ content: `<@!${member.id}> adlı kullanıcının özel mesajları kapalı olduğu için bilgilendirme mesajı gönderilmedi` }))

    }
}
module.exports = Mute