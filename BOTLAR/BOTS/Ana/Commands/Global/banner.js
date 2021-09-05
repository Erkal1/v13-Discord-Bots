const { getBanner } = require('../../../../Helpers/function');
class Banner extends Command {
    constructor(client) {
        super(client, {
            name: "banner",
            aliases: ["banner"],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
            channel: kanallar.komutKanal,
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.users.first() || await client.fetchUser(args[0]) || message.author;
        const banner = await getBanner(member.id, { size: 2048, format: "png", dynamic: true })
        const avatar = member.avatarURL({ dynamic: true, size: 2048 })
        const KullaniciAvatar = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Kullanıcı Banneri")
            .setDescription(`[Resim Adresi için TIKLA](${banner})`)
            .setTimestamp()
            .setAuthor(member.tag, avatar)
            .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
            .setImage(banner)
        await message.channel.send({ embeds: [KullaniciAvatar] });
    }
}

module.exports = Banner