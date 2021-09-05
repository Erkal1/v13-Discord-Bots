class UnJail extends Command {
    constructor(client) {
        super(client, {
            name: "unjail",
            aliases: ['unjail', 'cezalıçıkar'],
            perm: [roller.jailHammer],
            description: ["<@üye/ID>"],
            category: "Moderation",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = "-";
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
        if (!member.roles.cache.has(roller.cezalıRol)) return message.channel.send(cevaplar.cezalıDeğil)
        await member.setRoles(roller.kayıtsızRol, `Cezalı Kaldırma, Yetkili: ${message.author.id}`)
        if (member.voice.channel) member.voice.kick()
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: member.id, Ceza: "JAIL", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, member.id, "UNJAIL", true, message.author.id, reason, Date.now());
        message.channel.send(`${emojiler.unjail} ${member} isimli kullanıcı cezalıdan çıkarıldı. (\`#${ceza.id}\`)`)
        message.guild.unlog("Cezalı Çıkarma", member.id, message.author.id, channels.get('jailLog').value(), ceza.id)
    }
}

module.exports = UnJail