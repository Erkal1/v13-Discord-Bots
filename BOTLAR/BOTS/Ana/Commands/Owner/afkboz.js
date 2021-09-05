const Users = require("../../../../Database/Users");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
class AfkBoz extends Command {
    constructor(client) {
        super(client, {
            name: "afkboz",
            aliases: ["afkboz"],
            ownerOnly: true,
        });
    }
    async run(client, message, args, embed) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(cevaplar.üyeBelirt)
        const data = await Users.findOne({ userID: member.id }) || [];
        if (data.AfkStatus) {
            await Users.updateOne({ userID: message.author.id }, { $unset: { AfkStatus: {} } });
            if (member.displayName.includes("[AFK]") && member.manageable) await member.setNickname(member.displayName.replace("[AFK]", ""));
            await message.channel.send({ embeds: [new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member} adlı kullanıcı **AFK** modundan çıkarıldı!\nKullanıcı **${moment.duration(Date.now() - data.AfkStatus.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** den beri **${data.AfkStatus.reason}** sebebiyle **AFK** modundaydı!`)] })
        } else {
            message.channel.send(`Etiketlediğiniz kullanıcı klavyeden uzakta modunda değil ${emojiler.dikkat}`)
        }
    }
};

module.exports = AfkBoz