class Sicil extends Command {
    constructor(client) {
        super(client, {
            name: "sicil",
            aliases: ['sicil'],
            cooldown: 15,
            description: ["<@üye/ID>"],
            category: "Moderation",
            perm: [roller.clownHammer],
        });
    }
    async run(client, message, args, embed) {
        if (!args[0]) return message.channel.send(cevaplar.üyeBelirt)
        const user = message.mentions.users.first() || await client.fetchUser(args[0]);
        if (!user) return message.channel.send(cevaplar.üyeBelirt)
        const member = message.guild.members.cache.get(user.id)
        const sicil = await Penalties.find({ guildID: message.guild.id, userID: user.id, }).sort({ date: -1 })
        const sicilPanel = sicil.length > 0 ? sicil.slice(0, 10).map((value, index) => `\`#${value.id}\` **[${value.Ceza}]** ${new Date(value.Zaman).toTurkishFormatDate()} Tarihinde **${value.Sebep}** nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından sicile işlendi`).join("\n") : "Bu Kullanıcının Sicili Temiz!";
        await message.channel.send({ embeds: [embed.setThumbnail(user.avatarURL({ dynamic: true })).setDescription(`${member ? member.toString() : `**${user.username}**`} **İsimli Üyenin Geçmiş Sicil Bilgileri**\n\n ${sicilPanel}`)] })
    }
}

module.exports = Sicil