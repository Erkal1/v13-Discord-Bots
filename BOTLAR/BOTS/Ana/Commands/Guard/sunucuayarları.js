class Ayarlar extends Command {
      constructor(client) {
            super(client, {
                  name: "sunucuayarları",
                  aliases: ['ayarlar', 'sunucuayarları'],
                  ownerOnly: true,
            });
      }
      async run(client, message, args, embed) {
            const utils = await low(client.adapters('guard'));
            if (utils.get("guildID").value() !== message.guild.id) return message.channel.send(embed.setDescription(`Bu sunucuya ait veri bulunamadı ${emojiler.dikkat}`))
            let serverGuard = utils.get("serverGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let channelGuard = utils.get("channelGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let roleGuard = utils.get("roleGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let yeniHesap = utils.get("yeniHesap").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let yasakliTag = utils.get("yasakliTag").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let taglıAlım = utils.get("TagliAlim").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let swearGuard = utils.get("swearGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let capsGuard = utils.get("capsGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`
            let urlGuard = utils.get("urlGuard").value() ? `${emojiler.turnon}` : `${emojiler.turnoff}`

            //
            let serverLog = utils.get("serverLog").value() ? `<#${utils.get("serverLog").value()}>` : `${emojiler.turnoff}`
            let channelLog = utils.get("channelLog").value() ? `<#${utils.get("channelLog").value()}>` : `${emojiler.turnoff}`
            let roleLog = utils.get("roleLog").value() ? `<#${utils.get("roleLog").value()}>` : `${emojiler.turnoff}`
            let banLog = kanallar.banLog ? `<#${kanallar.banLog}>` : `${emojiler.turnoff}`
            let muteLog = kanallar.muteLog ? `<#${kanallar.muteLog}>` : `${emojiler.turnoff}`
            let jailLog = kanallar.jailLog ? `<#${kanallar.jailLog}>` : `${emojiler.turnoff}`


            let yazı = `${message.guild.name} - Sunucu Ayarları`
            const sunucuAyarlar = new Discord.MessageEmbed()
                  .setAuthor(yazı, message.guild.iconURL({ dynamic: true }))
                  .setThumbnail(message.guild.iconURL({ dynamic: true }))
                  .setDescription(`Koruma botlarının bu sunucu için geçerli olan ayarları aşağıda belirtilmiştir.`)
                  .addFields(
                        { name: '❯ Sunucu Koruma ', value: `${serverGuard}`, inline: true },
                        { name: '❯ Kanal Koruma ', value: `${channelGuard}`, inline: true },
                        { name: '❯ Rol Koruma ', value: `${roleGuard}`, inline: true },
                        { name: '❯ Yeni Hesap', value: `${yeniHesap}`, inline: true },
                        { name: '❯ Yasaklı Tag', value: `${yasakliTag}`, inline: true },
                        { name: '❯ Taglı Alım', value: `${taglıAlım}`, inline: true },
                        { name: '❯ Küfür Engel', value: `${swearGuard}`, inline: true },
                        { name: '❯ Caps Engel', value: `${capsGuard}`, inline: true },
                        { name: '❯ Url Engel', value: `${urlGuard}`, inline: true },
                        { name: '❯ Sunucu Koruma Log', value: `${serverLog}`, inline: true },
                        { name: '❯ Kanal Koruma Log', value: `${channelLog}`, inline: true },
                        { name: '❯ Rol Koruma Log', value: `${roleLog}`, inline: true },
                        { name: '❯ Ban Log', value: `${banLog}`, inline: true },
                        { name: '❯ Jail Log', value: `${jailLog}`, inline: true },
                        { name: '❯ Chat Mute Log', value: `${muteLog}`, inline: true },
                  ).setFooter(`${ayarlar.altbaslik}`, message.guild.iconURL({ dynamic: true })).setTimestamp().setColor("RANDOM")
            message.channel.send({ embeds: [sunucuAyarlar] })
      }

}

module.exports = Ayarlar