const joinedAt = require("../../../../Database/Stats/voiceJoinedAt");
const moment = require("moment");
require("moment-duration-format");
class SesKontrol extends Command {
    constructor(client) {
        super(client, {
            name: "seskontrol",
            aliases: ['seskontrol', 'n'],
            description: ["<@üye/ID>"],
            category: "Managment",
            perm: [...roller.yönetimRolleri],
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        if (!member.voice.channel) return message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında değil.`)] });
        else {
            let joinedAtData = await joinedAt.findOne({ userID: member.id });
            let limit = member.voice.channel.userLimit || "Limit Yok";
            let mic = member.voice.selfMute ? `${emojiler.turnoff}` : `${emojiler.turnon}`
            let kulak = member.voice.selfDeaf ? `${emojiler.turnoff}` : `${emojiler.turnon}`
            let video = member.voice.selfVideo ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let stream = member.voice.streaming ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            message.channel.send({ embeds: [embed.setDescription(`${member}, adlı kullanıcı <#${member.voice.channel.id}> adlı ses kanalında bulunuyor.\nMikrafonu; ${mic}\nKulaklığı; ${kulak}\nKamerası; ${video}\nYayın; ${stream}\nKanaldaki kişi sayısı; \`${member.voice.channel.members.size}/${limit}\`\nKanalda Bulunma Süresi: ${joinedAtData ? moment.duration(joinedAtData ? Date.now() - joinedAtData.date : 0).format("H [saat], m [dakika] s [saniye]") : "Süre bulunamadı"}`)] })
        }
    }
}

module.exports = SesKontrol