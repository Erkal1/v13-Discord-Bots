const permConf = require("../../../../Settings/perms")
class Help extends Command {
    constructor(client) {
        super(client, {
            name: "yardım",
            aliases: ['yardım', "help"],
            cooldown: 30,
            channel: kanallar.komutKanal,
        });
    }
    async run(client, message, args, embed) {
        let komutlar = [
            `**> Genel Komutlar**\n${client.commands.filter(cmd => cmd.info.description && cmd.info.category && cmd.info.category === "Global").map(cmd => `\`${ayarlar.prefix}${cmd.info.name} ${cmd.info.description}\``).join("\n")}`,
            `**> Moderasyon Komutları**\n${client.commands.filter(cmd => cmd.info.description && cmd.info.category && cmd.info.category === "Moderation").map(cmd => `\`${ayarlar.prefix}${cmd.info.name} ${cmd.info.description}\``).join("\n")}`,
            `**> Kayıt Komutları**\n${client.commands.filter(cmd => cmd.info.description && cmd.info.category && cmd.info.category === "Register").map(cmd => `\`${ayarlar.prefix}${cmd.info.name} ${cmd.info.description}\``).join("\n")}`,
            `**> İstatistik Komutları**\n${client.commands.filter(cmd => cmd.info.description && cmd.info.category && cmd.info.category === "Stat").map(cmd => `\`${ayarlar.prefix}${cmd.info.name} ${cmd.info.description}\``).join("\n")}`,
            `**> Yönetim Komutları**\n${client.commands.filter(cmd => cmd.info.description && cmd.info.category && cmd.info.category === "Managment").map(cmd => `\`${ayarlar.prefix}${cmd.info.name} ${cmd.info.description}\``).join("\n")}`,
            `**> Diğer Komutlar**\n${permConf.Perms.map(cmd => `\`${ayarlar.prefix}${cmd.commands} <@üye/ID>\``).join("\n")}`,
        ]
        var currentPage = 1
        let msg = await message.channel.send({ embeds: [embed.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true })).setDescription(`${komutlar[currentPage - 1]}`).setFooter(`Sayfa: ${currentPage}`)] });
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        const filter = (reaction, user) => { return reactions.some(emoji => emoji == reaction.emoji.name) && user.id === message.author.id }
        const collector = msg.createReactionCollector({ filter, time: 30000 })
        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "▶") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == komutlar.length) return;
                currentPage++;
                if (msg) msg.edit({ embeds: [embed.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true })).setDescription(`${komutlar[currentPage - 1]}`).setFooter(`Sayfa: ${currentPage}`)] });

            } else if (reaction.emoji.name === "❌") {

                if (msg) msg.delete().catch(err => { });
                if (message) return message.delete().catch(err => { });

            } else if (reaction.emoji.name === "◀") {

                await reaction.users.remove(message.author.id).catch(err => { });
                if (currentPage == 1) return;
                currentPage--;
                if (msg) msg.edit({ embeds: [embed.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true })).setDescription(`${komutlar[currentPage - 1]}`).setFooter(`Sayfa: ${currentPage}`)] });

            }
        });
    }
}

module.exports = Help