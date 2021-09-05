class BoosterIsim extends Command {
    constructor(client) {
        super(client, {
            name: "boosterisim",
            aliases: ["bn", 'boostername', 'boosterisim', 'zengin'],
            cooldown: 15,
            description: ["<isim>"],
            category: "Global",
            perm: [roller.boosterRol],
            channel: kanallar.komutKanal,
        });
    }
    async run(client, message, args, embed) {
        const member = message.member;
        let isim = args.join(' ');
        const content = isim.toLocaleLowerCase().trim();
        if (!isim) return message.channel.send(cevaplar.isimBelirt)
        if (isim.length > 30) return message.channel.send(cevaplar.isimApiSınır)
        if (!member.manageable) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`\`Hata:\` Kullanıcı adını değiştirmek için yeterli yetkim yok ${emojiler.dikkat}`).setColor("RANDOM")] });
        if (member.manageable) {
            if (content.match(kufurEngel) || urlEngel.test(isim) || inviteEngel.test(isim)) {
                if (message) message.delete()
                return message.channel.send({ embeds: [embed.setDescription(`İsminiz küfür, link veya discord linki içeremez ${emojiler.dikkat}`)] })
            } else {
                let setName = `${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : ayarlar.tag)} ${isim}`;
                await member.setNickname(`${setName}`)
                message.channel.send({ embeds: [embed.setDescription(`İsminiz başarıyla \`${setName}\` olarak değiştirildi ${emojiler.mavionay}`)] })
            }
        }
    }
}

module.exports = BoosterIsim