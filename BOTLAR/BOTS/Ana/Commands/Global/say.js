const { rakam } = require("../../../../Helpers/function")
class Say extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: ['say'],
            category: "Global",
            cooldown: 30,
        });
    }
    async run(client, message, args, embed) {
        var takviye = rakam(message.guild.premiumSubscriptionCount)
        var üyesayısı = rakam(message.guild.members.cache.size)
        var sesdekiler = rakam(message.guild.members.cache.filter((x) => x.voice.channel).size)
        var atkifler = rakam(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
        let tag = `${rakam(message.guild.members.cache.filter(u => u.user.username.includes(ayarlar.tag)).size)} (${ayarlar.tag})`

        const sunucusay = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`${ayarlar.altbaslik}`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
            .setDescription(`
${emojiler.hype} Toplam üye sayısı: ${üyesayısı}
${emojiler.hype} Çevrim içi üye sayısı: ${atkifler}
${emojiler.hype} Sesdeki toplam üye sayısı: ${sesdekiler}
${emojiler.hype} Toplam taglı üye sayısı: ${tag}
${emojiler.hype} Toplam takviye sayısı: ${takviye}
`)
        message.channel.send({ embeds: [sunucusay] })
    }
}

module.exports = Say