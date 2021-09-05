class ChatUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "chatunmute",
            aliases: ["chatunmute", "cunmute", 'unmute'],
            description: ["<@üye/ID>"],
            cooldown: 15,
            category: "Moderation",
            perm: [roller.muteHammer],
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = "-";
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (!member.roles.cache.has(roller.mutedRol)) return message.channel.send(cevaplar.muteliDeğil)
        if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
        await member.roles.remove(roller.mutedRol, `Chat Unmute, Yetkili: ${message.author.id}`)
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: member.id, Ceza: "CHATMUTE", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, member.id, "CHATUNMUTE", true, message.author.id, reason, Date.now());
        await message.channel.send(`${emojiler.uncmute} ${member} isimli kullanıcının metin kanallarındaki susturulması kaldırıldı (\`#${ceza.id}\`)`)
        message.guild.unlog("Chat Mute Kaldırma", member.id, message.author.id, channels.get('muteLog').value(), ceza.id)
    }
}

module.exports = ChatUnMute