class interactionCreate {
  Event = "interactionCreate"
  async run(interaction) {
    let menu = interaction.customId
    const member = await client.guilds.cache.get(ayarlar.guildID).members.fetch(interaction.member.user.id)
    if (!member) return;
    if (menu === "renks") {
      let color = new Map([
        ["kirmizi", roller.Renkler.kirmizi],
        ["turuncu", roller.Renkler.turuncu],
        ["mavi", roller.Renkler.mavi],
        ["lila", roller.Renkler.lila],
        ["mor", roller.Renkler.mor],
        ["pembe", roller.Renkler.pembe],
        ["yesil", roller.Renkler.yesil],

      ])
      let role = color.get(interaction.values[0])
      let renkroller = [roller.Renkler.kirmizi, roller.Renkler.turuncu, roller.Renkler.mavi, roller.Renkler.lila, roller.Renkler.mor, roller.Renkler.pembe, roller.Renkler.yesil]
      if (!member.roles.cache.has(roller.tagRol) && !member.roles.cache.has(roller.boosterRol) && !member.permissions.has("ADMINISTRATOR")) {
        interaction.reply({ content: "Sadece tagımızı almış ya da sunucumuza boost basmış üyeler renk rolü seçebilir.", ephemeral: true })
      } else {
        if (interaction.values[0] === "rolsil") {
          await member.roles.remove(renkroller)
        } else if (role) {
          if (renkroller.some(m => member.roles.cache.has(m))) {
            await member.roles.remove(renkroller)
          }
          await member.roles.add(role)
        }
        interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
      }
    } else if (menu === "valantines") {
      let relationship = new Map([
        ["couple", roller.couple],
        ["single", roller.single]

      ])
      let role = relationship.get(interaction.values[0])
      let roles = [roller.couple, roller.single]
      if (interaction.values[0] === "rolsil") {
        await member.roles.remove(roles)
      } else if (role) {
        if (roles.some(m => member.roles.cache.has(m))) {
          await member.roles.remove(roles)
        }
        await member.roles.add(role)
      }
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    } else if (menu === "valantines") {
      let name = interaction.values
      let iliski;
      if (name == "couple") { iliski = roller.couple }
      if (name == "single") { iliski = roller.single }
      let rol = await client.guilds.cache.get(ayarlar.guildID).roles.cache.get(iliski)
      if (name == "rolsil") {
        await member.roles.remove(roller.single)
        await member.roles.remove(roller.couple)
      } else if (rol) {
        if (!member.roles.cache.has(rol)) {
          if (member.roles.cache.has(roller.single) || member.roles.cache.has(roller.couple)) {
            await member.roles.remove(roller.single)
            await member.roles.remove(roller.couple)
          }
          await member.roles.add(rol)
        }
      } else return;
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    } else if (menu === "etkinliks") {
      let eventsMap = new Map([
        ["etkinlik", roller.etkinlik],
        ["cekilis", roller.çekiliş],
      ])
      let roles = [roller.etkinlik, roller.çekiliş]
      var role = []
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = eventsMap.get(ids)
        role.push(den)
      }
      if (!interaction.values.length) {
        await member.roles.remove(roles)
      } else {
        await member.roles.remove(roles)
        await member.roles.add(role)
      }
      role.clear()
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    } else if (menu === "games") {
      let GameMap = new Map([
        ["lol", roller.Oyunlar.lol],
        ["csgo", roller.Oyunlar.csgo],
        ["minecraft", roller.Oyunlar.minecraft],
        ["valorant", roller.Oyunlar.valorant],
        ["fortnite", roller.Oyunlar.fortnite],
        ["gta5", roller.Oyunlar.gta5],
        ["pubg", roller.Oyunlar.pubg],
        ["wildrift", roller.Oyunlar.wildrift],
        ["pubgmobile", roller.Oyunlar.pubgmobile],
        ["rust", roller.Oyunlar.rust],
        ["brawlhalla", roller.Oyunlar.brawlhalla],
        ["fivem", roller.Oyunlar.fivem],
        ["mlbb", roller.Oyunlar.mlbb],
      ])
      let roles = [roller.Oyunlar.lol, roller.Oyunlar.csgo, roller.Oyunlar.minecraft, roller.Oyunlar.valorant, roller.Oyunlar.fortnite, roller.Oyunlar.gta5, roller.Oyunlar.pubg, roller.Oyunlar.wildrift, roller.Oyunlar.pubgmobile, roller.Oyunlar.rust, roller.Oyunlar.brawlhalla, roller.Oyunlar.fivem, roller.Oyunlar.mlbb,]
      var role = []
      for (let index = 0; index < interaction.values.length; index++) {
        let ids = interaction.values[index]
        let den = GameMap.get(ids)
        role.push(den)
      }
      if (!interaction.values.length) {
        await member.roles.remove(roles)
      } else {
        await member.roles.remove(roles)
        await member.roles.add(role)
      }
      role.clear()
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    } else if (menu === "horoscope") {
      let HorosCope = new Map([
        ["koç", roller.Burçlar.koç],
        ["boğa", roller.Burçlar.boğa],
        ["ikizler", roller.Burçlar.ikizler],
        ["yengeç", roller.Burçlar.yengeç],
        ["aslan", roller.Burçlar.aslan],
        ["başak", roller.Burçlar.başak],
        ["terazi", roller.Burçlar.terazi],
        ["akrep", roller.Burçlar.akrep],
        ["yay", roller.Burçlar.yay],
        ["oğlak", roller.Burçlar.oğlak],
        ["kova", roller.Burçlar.kova],
        ["balık", roller.Burçlar.balık],
      ])
      let roles = [roller.Burçlar.koç, roller.Burçlar.boğa, roller.Burçlar.ikizler, roller.Burçlar.yengeç, roller.Burçlar.aslan, roller.Burçlar.başak, roller.Burçlar.terazi, roller.Burçlar.akrep, roller.Burçlar.yay, roller.Burçlar.oğlak, roller.Burçlar.kova, roller.Burçlar.balık,
      ]
      let role = HorosCope.get(interaction.values[0])
      if (interaction.values[0] === "rolsil") {
        await member.roles.remove(roles)
      } else if (role) {
        if (roles.some(m => member.roles.cache.has(m))) {
          await member.roles.remove(roles)
        }
        await member.roles.add(role)
      }
      interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })

    }
  }
}

module.exports = interactionCreate