const Users = require("../../../../Database/Users")
class Taglılar extends Command {
    constructor(client) {
        super(client, {
            name: "taglılar",
            aliases: ['taglılar', 'taglılarım'],
            perm: [roller.registrar],
            description: ["<@üye/ID>"],
            category: "Stat",
            cooldown: 15,
        });
    }
    async run(client, message, args, embed) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        var sayi = 1
        var currentPage = 1
        let data = Users.findOne({ userID: member.id }) || []
        if (!data) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir taglı verisi bulunamadı!`)] });
        if (!data.Taggeds) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir taglı verisi bulunamadı!`)] });
        let taggeds = data.Taggeds
        taggeds.map(e => e ? `${sayi++}-` : "")
        let pages = taggeds.chunk(15);
        if (!pages.length || !pages[currentPage - 1].length) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir taglı verisi bulunamadı!`)] })
        let msg = await message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcının toplam **${sayi - 1}** taglısı bulundu! \n\n${pages[currentPage - 1].map(e => e ? ` <@!${e.userID}> - ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] })
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === message.author.id }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "▶") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == pages.length) return;
                currentPage++;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => e ? `<@!${e.userID}> - ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] });

            } else if (reaction.emoji.name === "❌") {

                if (msg) msg.delete().catch(err => { });
                if (message) return message.delete().catch(err => { });

            } else if (reaction.emoji.name === "◀") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == 1) return;
                currentPage--;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => e ? `<@!${e.userID}> - ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] });

            }
        });
    }
}

module.exports = Taglılar