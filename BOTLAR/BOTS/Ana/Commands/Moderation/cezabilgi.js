class CezaBilgi extends Command {
      constructor(client) {
            super(client, {
                  name: "cezabilgi",
                  aliases: ["cezabilgi"],
                  cooldown: 15,
                  description: ["<cezano>"],
                  category: "Moderation",
                  perm: [roller.clownHammer],
            });
      }
      async run(client, message, args, embed) {
            if (!args[0]) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir ceza numarası belirtin ${emojiler.dikkat}`)] });
            if (isNaN(args[0])) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir ceza numarası belirtin ${emojiler.dikkat}`)] });
            const ceza = await Penalties.findOne({ guildID: message.guild.id, id: args[0] });
            if (!ceza) return message.channel.send({ embeds: [embed.addField("\`Uyarı:\`", ` (\`#${args[0]}\`) numaralı ceza bulunamadı ${emojiler.dikkat}`)] });
            const cSure = ceza.Sure || `-`;
            const yetkili = await client.fetchUser(ceza.Yetkili);
            const uye = await client.fetchUser(ceza.userID);
            message.channel.send({
                  embeds: [new Discord.MessageEmbed()
                        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setDescription(`
      **#${ceza.id}** ID'li kasa numarasının ceza bilgileri;

      **» Ceza Numarası:** \`#${ceza.id}\`
      **» Ceza Tipi:** \`${ceza.Ceza}\`
      **» Ceza Zamanı:** \`${new Date(ceza.Zaman).toTurkishFormatDate()}\`
      **» Ceza Uygulayan:** ${yetkili.tag} (\`${yetkili.id}\`)
      **» Ceza Alan:** ${uye.tag} (\`${uye.id}\`)
      **» Ceza Sebebi:** \`${ceza.Sebep}\`
      **» Ceza Süresi:** \`${cSure}\`

`).setTimestamp().setColor("RANDOM").setFooter(`${ayarlar.altbaslik}`, client.user.avatarURL())]
            })
      }
}

module.exports = CezaBilgi