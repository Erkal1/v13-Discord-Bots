const Users = require("../../../../Database/Users");
class Taglı extends Command {
    constructor(client) {
        super(client, {
            name: "taglı",
            aliases: ['taglı'],
            perm: [roller.registrar],
            description: ["<@üye/ID>"],
            category: "Stat",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (member.id === message.author.id) return message.channel.send(cevaplar.kendisi)
        if (!member.user.username.includes(ayarlar.tag)) return message.channel.send(cevaplar.tagsızÜye)
        let veri = await Users.findOne({ Taggeds: { $elemMatch: { userID: member.id } } });
        if (veri && veri.Taggeds.filter(e => e.userID === member.id)) {
            return message.channel.send({ embeds: [embed.setDescription(`Kullanıcı başka bir yetkili tarafından \`${(veri.Taggeds.filter(e => e.userID === member.id).map(e => new Date(e.date).toTurkishFormatDate()))}\` tarihinde taglı olarak belirtilmiş ${emojiler.dikkat}`)] });
        } else {
            let msg = await message.channel.send({ content: `${member}`, embeds: [new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.username, message.author.avatarURL({ dynamic: true })).setTimestamp().setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL({ dynamic: true })).setDescription(`Hey! ${member}, ${message.author} adlı kullanıcı seni taglı olarak belirtmek istiyor. Kabul ediyor musun?`).setFooter("İstek 30 saniye içinde onaylanmazsa otomatik olarak iptal edilecektir.")] })
            let reactions = ["✅", "❌"];
            for (const reaction of reactions) await msg.react(reaction);
            const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === member.id }
            const collector = msg.createReactionCollector({ filter, time: 30000 })
            collector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === "✅") {
                    if (msg) msg.delete().catch(err => { });
                    await message.channel.send({ embeds: [embed.setDescription(`${message.author}, ${member} Adlı kullanıcı senin isteğini onayladı. ${emojiler.mavionay}.`)] })
                    await Users.findOneAndUpdate({ userID: message.author.id }, { $push: { Taggeds: { userID: member.id, date: Date.now() } } }, { upsert: true });
                    client.channels.cache.get(kanallar.taglıLog).send({ embeds: [new Discord.MessageEmbed().setDescription(`**${member.user.tag}** (\`${member.id}\`) isimli kullanıcı, **${message.author.tag}** (\`${message.author.id}\`) tarafından **${new Date(message.createdAt).toTurkishFormatDate()}** tarihinde taglı olarak belirtildi.`).setTimestamp().setFooter(message.member.displayName, message.author.avatarURL()).setColor("RANDOM").setTitle("Taglı")] });

                } else if (reaction.emoji.name === "❌") {
                    if (msg) msg.delete().catch(err => { });
                    message.channel.send({ embeds: [embed.setDescription(`${message.author}, ${member} Adlı kullanıcı senin isteğini onaylamadı.`)] })
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
}

module.exports = Taglı