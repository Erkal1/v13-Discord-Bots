const Users = require("../../../../Database/Users")
class Isimler extends Command {
    constructor(client) {
        super(client, {
            name: "isimler",
            aliases: ['isimler'],
            description: ["<@üye/ID>"],
            cooldown: 15,
            category: "Register",
            perm: [roller.registrar],
        });
    }
    async run(client, message, args, embed) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        var sayi = 1
        var currentPage = 1
        if (!member) return message.channel.send(cevaplar.üyeBelirt);
        const data = await Users.findOne({ userID: member.id }) || []
        if (!data) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
        if (!data.Names) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
        let isimler = data.Names
        isimler.map(e => e ? `${sayi++}-` : "")
        let pages = isimler.chunk(25);
        if (!pages.length || !pages[currentPage - 1].length) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] })
        let msg = await message.channel.send({ embeds: [embed.setDescription(`${member} adlı üyenin toplam **${sayi - 1}** isim verisi bulundu!\n\n${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter(`Sayfa: ${currentPage}`).setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))] })
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === message.author.id }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "▶") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == pages.length) return;
                currentPage++;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter(`Sayfa: ${currentPage}`).setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))] });

            } else if (reaction.emoji.name === "❌") {

                if (msg) msg.delete().catch(err => { });
                if (message) return message.delete().catch(err => { });

            } else if (reaction.emoji.name === "◀") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == 1) return;
                currentPage--;
                if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter(`Sayfa: ${currentPage}`).setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))] });
            }
        });

    }
}

module.exports = Isimler