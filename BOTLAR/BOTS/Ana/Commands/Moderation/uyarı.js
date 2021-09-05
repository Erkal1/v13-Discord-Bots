class Uyari extends Command {
    constructor(client) {
        super(client, {
            name: "uyarı",
            aliases: ['uyarı'],
            perm: [roller.clownHammer],
            description: ["<@üye/ID> <sebep>"],
            category: "Moderation",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {        
        const channels = await low(client.adapters('kanallar'));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.splice(1).join(" ");
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (member.id === message.guild.ownerId) return message.channel.send(cevaplar.yetersizYetkim)
        if (ayarlar.Owners.includes(member.id)) return message.channel.send(cevaplar.botSahibi)
        if (member === message.member) return message.channel.send(cevaplar.kendisi)
        if (member.user.bot) return message.channel.send(cevaplar.üyeBot)
        if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(cevaplar.üstAynıYetki)
        if (!reason) return message.channel.send(cevaplar.sebepBelirt)
        const cezalar = await client.Penalties(message.guild.id, member.id, "UYARI", true, message.author.id, reason, Date.now());
        message.channel.send(`${emojiler.warn} ${member} isimli kullanıcı **${reason}** sebebiyle uyarıldı (\`#${cezalar.id}\`)`)
        message.guild.log("Uyarı", member.id, message.author.id, channels.get('warnLog').value(), cezalar.id, reason)
        await member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **${reason}** sebebiyle uyarıldın.` }).catch(err => message.channel.send({ content: `<@!${member.id}> adlı kullanıcının özel mesajları kapalı olduğu için bilgilendirme mesajı gönderilmedi` }));
    }
}

module.exports = Uyari