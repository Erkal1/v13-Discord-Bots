class Git extends Command {
    constructor(client) {
        super(client, {
            name: "git",
            aliases: ['git'],
            description: ["<@üye/ID>"],
            category: "Global",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Bir ses kanalında olman lazım ${emojiler.dikkat}`)] });
        }
        if (!member) {
            return message.channel.send({ embeds: [embed.setDescription(`Bir kullanıcı belirt ${emojiler.dikkat}`)] });
        }
        if (message.member.id === member.id) {
            return message.channel.send({ embeds: [embed.setDescription(`Kendinle aynı kanaldasın zaten ${emojiler.dikkat}`)] });
        }
        if (message.member.voice.channel === member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcı ile aynı kanaldasın zaten ${emojiler.dikkat}`)] });
        }
        if (!member.voice.channel) {
            return message.channel.send({ embeds: [embed.setDescription(`Etiketlenen kullanıcı herhangi bir ses kanalında değil ${emojiler.dikkat}`)] })
        }
        let msg = await message.channel.send({ content: `${member}`, embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.username, message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setDescription(`Hey! ${member}, ${message.author} adlı kullanıcı \`${member.voice.channel.name}\` odasına gelmek istiyor.\nKabul ediyor musun?`).setFooter("İstek 30 saniye içinde onaylanmazsa otomatik olarak iptal edilecektir.")] })
        let reactions = ["✅", "❌"];
        for (const reaction of reactions) await msg.react(reaction);
        const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === member.id }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "✅") {
                if (msg) msg.delete().catch(err => { });
                await message.member.voice.setChannel(member.voice.channel.id)
                await message.channel.send({ embeds: [embed.setDescription(`${message.author}, ${member} Adlı kullanıcı senin odaya gelme isteğini onayladı. ${emojiler.mavionay}\nBulunduğu kanal <#${member.voice.channel.id}>.`)] })
            } else if (reaction.emoji.name === "❌") {
                if (msg) msg.delete().catch(err => { });
                message.channel.send({ embeds: [embed.setDescription(`${message.author}, ${member} Adlı kullanıcı senin odaya gelme isteğini onaylamadı.`)] })
            }
        });
        collector.on("end", async (collected, reason) => {
            if (reason === "time") {
                if (msg) msg.delete().catch(err => { });
                message.channel.send({ embeds: [embed.setDescription(`${member}, 30 saniye boyunca cevap vermediği için işlem iptal edildi.`)] });
            }
        });
    }
}

module.exports = Git