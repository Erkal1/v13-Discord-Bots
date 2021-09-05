const { rakam } = require("../../../../Helpers/function")
class YetkiliSay extends Command {
    constructor(client) {
        super(client, {
            name: "yetkilisay",
            aliases: ["ysay", "yetkilisay"],
            category: "Managment",
            perm: [...roller.yönetimRolleri],
        });
    }
    async run(client, message) {
        var yetkilisayısı = rakam(message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(roller.registrar)).size)
        var sesdekiler = rakam(message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(roller.registrar)).filter(yetkilises => yetkilises.voice.channel).size)
        var atkifler = rakam(message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(roller.registrar) && yetkili.presence && yetkili.presence.status !== "offline").size)
        let sesdeolmayanlar = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(roller.registrar)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline")
        const yetkilisay = new Discord.MessageEmbed()
            .setAuthor(message.guild.name + " - Yetkili Bilgileri", message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`${ayarlar.altbaslik}`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
            .setDescription(`
 Sunucumuzdaki toplam yetkili sayısı: **${yetkilisayısı}**
 Sunucumuzdaki toplam aktif yetkili sayısı: **${atkifler}**
 Sesdeki toplam yetkili sayısı: **${sesdekiler}**

Aktif olupta seste olmayan yetkililer;
${sesdeolmayanlar.map(yetkili => `${yetkili}`).join(', ')}
`)
        message.channel.send({ embeds: [yetkilisay] })
    }
}

module.exports = YetkiliSay