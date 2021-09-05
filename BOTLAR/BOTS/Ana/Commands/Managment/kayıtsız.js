const Users = require("../../../../Database/Users")
class Kayitsiz extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtsız",
            aliases: ['kayıtsız'],
            cooldown: 15,
            description: ["<@üye/ID>"],
            category: "Managment",
            perm: [...roller.yönetimRolleri],
        });
    }
    async run(client, message, args, embed) {
        if (!client.beklemeSure.has(module.exports.name)) { client.beklemeSure.set(module.exports.name, new Discord.Collection()); }
        const zamanDamga = client.beklemeSure.get(module.exports.name);
        const beklemeSuresi = 1000 * 60 * ayarlar.Sure;
        if (ayarlar.kayitsizLimit > 0 && client.kayitsizLimit.has(message.author.id) && client.kayitsizLimit.get(message.author.id) == ayarlar.kayitsizLimit && zamanDamga.has(message.author.id)) {
            const sonaErme = zamanDamga.get(message.author.id) + beklemeSuresi; if (Date.now() < sonaErme) { const timeLeft = (sonaErme - Date.now()) / 1000; return message.channel.send(`${emojiler.hata} **UYARI:** \`${module.exports.name}\` komutunu tekrardan kullanabilmek için \`${timeLeft.toFixed(1)}\` saniye beklemelisin.`); }
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(cevaplar.üyeBelirt);
        if (member.roles.cache.has(roller.kayıtsızRol)) return message.channel.send(cevaplar.üyeKayıtsız)
        if (member.id === message.guild.ownerId) return message.channel.send(cevaplar.sunucuSahibi)
        if (ayarlar.Owners.includes(member.id)) return message.channel.send(cevaplar.botSahibi)
        if (member === message.member) return message.channel.send(cevaplar.kendisi)
        if (member.user.bot) return message.channel.send(cevaplar.üyeBot)
        if (!member.manageable) return message.channel.send(cevaplar.yetersizYetkim)
        if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return message.channel.send(cevaplar.üstAynıYetki)
        await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
        await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `İsim | Yaş`, islem: "Kayıtsıza Atma", rol: roller.kayıtsızRol } } }, { upsert: true });
        await member.setRoles(roller.kayıtsızRol)
        await member.setNickname(`${ayarlar.tag} İsim | Yaş`, `Kayıtsıza atma, Yetkili: ${message.author.id}`);
        zamanDamga.set(message.author.id, Date.now());
        if (ayarlar.kayitsizLimit > 0 && !ayarlar.Owners.includes(message.author.id)) { if (!client.kayitsizLimit.has(message.author.id)) client.kayitsizLimit.set(message.author.id, 1); else { client.kayitsizLimit.set(message.author.id, client.kayitsizLimit.get(message.author.id) + 1); }; setTimeout(() => { if (client.kayitsizLimit.has(message.author.id)) client.kayitsizLimit.delete(message.author.id); zamanDamga.delete(message.author.id); }, beklemeSuresi); }
        await message.channel.send({ embeds: [embed.setDescription(`<@!${member.id}> isimli kullanıcı başarıyla kayıtsıza atıldı ${emojiler.mavionay}`)] });
        await client.channels.cache.get(kanallar.denetimBilgi).send({ embeds: [new Discord.MessageEmbed().setColor("RANDOM").setTitle("Kayıtsız").setDescription(`<@!${member.id}> isimli kullanıcı, <@!${message.author.id}> tarafından **${new Date(message.createdAt).toTurkishFormatDate()}** tarihinde, kayıtsıza atıldı ${emojiler.mavionay}`).setTimestamp().setFooter(message.member.displayName, message.author.avatarURL())] });
    }
}

module.exports = Kayitsiz