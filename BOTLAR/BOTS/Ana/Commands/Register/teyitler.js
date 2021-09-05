const Users = require("../../../../Database/Users")
class Teyitler extends Command {
    constructor(client) {
        super(client, {
            name: "teyitler",
            aliases: ['teyitler', 'teyitlerim'],
            cooldown: 5,
            description: ["<@üye/ID>"],
            category: "Register",
            perm: [roller.registrar],
        });
    }
    async run(client, message, args, embed) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        var sayi = 1
        var currentPage = 1
        const data = await Users.findOne({ userID: member.id }) || []
        if (!data) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] });
        if (!data.Teyitler) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] });
        let teyits = data.Teyitler.filter(e => message.guild.members.cache.get(e.userID))
        teyits.map(e => e ? `${sayi++}-` : "")
        let pages = teyits.chunk(15);
        if (!pages.length || !pages[currentPage - 1].length) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] })
        let msg = await message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcının toplam **${sayi - 1}** teyidi bulundu! \n\n${pages[currentPage - 1].map(e => e ? ` <@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] })
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === message.author.id }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "▶") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == pages.length) return;
                currentPage++;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => e ? `<@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] });

            } else if (reaction.emoji.name === "❌") {

                if (msg) msg.delete().catch(err => { });
                if (message) return message.delete().catch(err => { });

            } else if (reaction.emoji.name === "◀") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == 1) return;
                currentPage--;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => e ? `<@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter(`Sayfa: ${currentPage}`)] });

            }
        });
    }
}

module.exports = Teyitler