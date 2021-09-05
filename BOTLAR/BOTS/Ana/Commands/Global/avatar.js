class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["av", 'avatar', 'pp'],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: kanallar.komutKanal,
        });
    }
    async run(client, message, args, embed) {
        const victim = message.mentions.users.first() || await client.fetchUser(args[0]) || message.author;
        const avatar = victim.avatarURL({ dynamic: true, size: 2048 })
        const KullaniciAvatar = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Kullanıcı Avatarı")
            .setDescription(`[Resim Adresi için TIKLA](${avatar})`)
            .setTimestamp()
            .setAuthor(victim.tag, avatar)
            .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
            .setImage(avatar)
        await message.channel.send({ embeds: [KullaniciAvatar] });
    }
}

module.exports = Avatar