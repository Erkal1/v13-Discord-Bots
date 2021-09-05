class Move extends Command {
    constructor(client) {
        super(client, {
            name: "çek",
            aliases: ["çek"],
            cooldown: 15,
            description: ["<@üye/ID>"],
            category: "Global",
            perm: [roller.move],
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Bir ses kanalında olman lazım ${emojiler.dikkat}`)] });
        }
        if (!member) {
            return message.channel.send({ embeds: [embed.setDescription(`Lütfen yanınıza çekmek için geçerli bir kullanıcı belirt ${emojiler.dikkat}`)] });
        }
        if (member.user.bot) {
            return message.channel.send({ embeds: [embed.setDescription(`Bir botu yanına çekemezsin ${emojiler.dikkat}`)] });
        }
        if (message.member.id === member.id) {
            return message.channel.send({ embeds: [embed.setDescription(`Kendinle aynı kanaldasın zaten ${emojiler.dikkat}`)] })
        }
        if (message.member.voice.channel === member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcı ile aynı kanaldasın zaten ${emojiler.dikkat}`)] });
        }
        if (!member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Etiketlenen kullanıcı herhangi bir ses kanalında değil ${emojiler.dikkat}`)] });
        } else {
            member.voice.setChannel(message.member.voice.channel.id)
            message.channel.send({ embeds: [embed.setDescription(`${member}, adlı kullanıcı <#${member.voice.channel.id}> kanalından <#${message.member.voice.channel.id}> kanalına ${message.author} adlı yetkili tarafından çekildi ${emojiler.mavionay}`)] })
        }
    }
}

module.exports = Move