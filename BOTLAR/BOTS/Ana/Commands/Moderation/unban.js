class UnBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            aliases: ['unban'],
            perm: [roller.banHammer],
            description: ["<ID>"],
            category: "Moderation",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        const channels = await low(client.adapters('kanallar'));
        const reason = "-"
        if (!args[0] || isNaN(args[0])) return message.channel.send(cevaplar.üyeYok)
        const user = await client.fetchUser(args[0]);
        if (!user) return message.channel.send(cevaplar.üyeYok)
        const banlı = await client.fetchBan(message.guild, args[0]);
        if (!banlı) return message.channel.send(cevaplar.banlıDeğil)
        await message.guild.members.unban(user, `Yetkili: ${message.author.id}`)
        const cezaVeri = await Penalties.findOne({ guildID: message.guild.id, userID: user.id, Ceza: "BAN", Aktif: true });
        if (cezaVeri) { cezaVeri.Aktif = false; await cezaVeri.save(); }
        const ceza = await client.Penalties(message.guild.id, user.id, "UNBAN", true, message.author.id, reason, Date.now());
        await message.channel.send(`${emojiler.unban} **${user.tag}** İsimli kullanıcının banı kaldırıldı. (\`#${ceza.id}\`)`)
        message.guild.unlog("Yasak Kaldırma", user.id, message.author.id, channels.get('banLog').value(), ceza.id)
    }
}

module.exports = UnBan