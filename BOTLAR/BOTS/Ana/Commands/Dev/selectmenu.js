class SelectMenu extends Command {
    constructor(client) {
        super(client, {
            name: "selectmenu",
            aliases: ["selectmenu", 'menu'],
            devOnly: true,
        });
    }
    async run(client, message, args) {
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": "Aşağıdaki Menüden Rollerinizi Seçebilirsiniz.",
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renks", "options": [
                            { "label": "Kırmızı", "value": "kirmizi", "emoji": { "id": "881838925172342804", "name": "ict_kirmizi" }, },
                            { "label": "Turuncu", "value": "turuncu", "emoji": { "id": "881838928162873344", "name": "ict_turuncu" }, },
                            { "label": "Mavi", "value": "mavi", "emoji": { "id": "881838927474987028", "name": "ict_mavi" }, },
                            { "label": "Lila", "value": "lila", "emoji": { "id": "881838927013634048", "name": "ict_lila" }, },
                            { "label": "Mor", "value": "mor", "emoji": { "id": "881838927466594334", "name": "ict_mor" }, },
                            { "label": "Pembe", "value": "pembe", "emoji": { "id": "881838927516930079", "name": "ict_pembe" }, },
                            { "label": "Yeşil", "value": "yesil", "emoji": { "id": "881838930931089428", "name": "ict_yesil" }, },
                            {
                                "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "880700395335352360", "name": "trash" },
                            }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                    }],
                },
                {
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "valantines", "options": [
                            { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "881122626788028446", "name": "couple" }, },
                            { "label": "Sevgilim Yok", "value": "single", "emoji": { "id": "881122509397827586", "name": "single" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "880700395335352360", "name": "trash" }, }
                        ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                    }],
                }, {
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "881122620911788032", "name": "etkinlik" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "881122510454812682", "name": "cekilis" }, }
                        ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                    }],
                }, {
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "games", "options": [
                            { "label": "League of Legends", "value": "lol", "emoji": { "id": "881852149385011241", "name": "ict_lol" }, },
                            { "label": "CS:GO", "value": "csgo", "emoji": { "id": "881852140216254474", "name": "ict_csgo" }, },
                            { "label": "Minecraft", "value": "minecraft", "emoji": { "id": "881852153495441418", "name": "ict_minecraft" }, },
                            { "label": "Valorant", "value": "valorant", "emoji": { "id": "881852148051238983", "name": "ict_valorant" }, },
                            { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "881852141495545856", "name": "ict_fortnite" }, },
                            { "label": "Gta V", "value": "gta5", "emoji": { "id": "881852149456326697", "name": "ict_gta5" }, },
                            { "label": "PUBG", "value": "pubg", "emoji": { "id": "881852156301422614", "name": "ict_pubg" }, },
                            { "label": "Wild Rift", "value": "wildrift", "emoji": { "id": "881852157131911228", "name": "ict_wildrift" }, },
                            { "label": "PUBG: MOBILE", "value": "pubgmobile", "emoji": { "id": "881852152115523674", "name": "ict_pubgmobile" }, },
                            { "label": "Rust", "value": "rust", "emoji": { "id": "881852152711086140", "name": "ict_rust" }, },
                            { "label": "Brawlhalla", "value": "brawlhalla", "emoji": { "id": "881852137989103727", "name": "ict_brawlhalla" }, },
                            { "label": "FiveM", "value": "fivem", "emoji": { "id": "881852141059342387", "name": "ict_fivem" }, },
                            { "label": "Mobile Legends", "value": "mlbb", "emoji": { "id": "881852158218240050", "name": "ict_mobilelegends" }, }

                        ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 13
                    }],
                }, {
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "horoscope", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "id": "882194766006194186", "name": "ict_koc" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "id": "882194765188313099", "name": "ict_boga" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "id": "882194761153388564", "name": "ict_ikizler" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "882194766698270750", "name": "ict_yengec" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "id": "882194735530377286", "name": "ict_aslan" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "id": "882194762889830400", "name": "ict_basak" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "id": "882194762915000352", "name": "ict_terazi" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "id": "882194732971872256", "name": "ict_akrep" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "id": "882194760599760906", "name": "ict_yay" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "882194765192495124", "name": "ict_oglak" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "id": "882194765859409950", "name": "ict_kova" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "id": "882194750541795328", "name": "ict_balik" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "880700395335352360", "name": "trash" }, }

                        ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        await message.react(emojiler.mavionay)

    }
}

module.exports = SelectMenu