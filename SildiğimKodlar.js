const guild = client.guilds.cache.get(ayarlar.guildID);
const members = guild.members.cache.array()
for (let index = 0; index < members.length; index++) {
  const member = members[index];
  let veri = await Members.findOne({ userID: member.user.id });
  if (veri) {
    await veri.roles.forEach(async rolid => {
      if (rolid === role.id) {
        await veri.roles.remove(rolid)
        await veri.roles.push(yeniRol.id);
        await veri.save();
      }
    });
  }
}

const members = guild.members.cache.array()
for (let index = 0; index < members.length; index++) {
  const member = members[index];
  await messageUser.findOneAndUpdate({ userID: member.id }, { $set: { dailyStat: 0 } })
  await voiceUser.findOneAndUpdate({ userID: member.id }, { $set: { dailyStat: 0 } })
}

function Process(i) {
  const ls = children.exec(`pm2 start /Users/Erkal/Desktop/Erkal/BOTLAR/BOTS/Users/user${i}.js`);
  ls.stdout.on('data', function (data) { console.log(data); });
  ls.stderr.on('data', function (data) { console.log(data); });
  ls.on('close', function (code) { if (code == 0) { console.log('Stop'); } else { console.log('Start'); } });
}
for (let index = 1; index < ayarlar.userSize + 1; index++) {
  Process(index);
}

const splitDescription = splitMessage(embed.setDescription, {
  maxLength: 2048,
  char: "\n",
  prepend: "",
  append: ""
});

splitDescription.forEach(async (m) => {
  embed.setDescription(m);
  message.channel.send(embed);
});

client.ws.on('INTERACTION_CREATE', async interaction => {
  let menu = interaction.data.custom_id
  const member = await client.guilds.cache.get(ayarlar.guildID).members.fetch(interaction.member.user.id)
  if (!member) return;
  if (menu === "renks") {
    let name = interaction.data.values
    let Renk;
    if (name == "pembe") { Renk = roller.pembe }
    else if (name == "mavi") { Renk = roller.mavi }
    else if (name == "turuncu") { Renk = roller.turuncu }
    else if (name == "lila") { Renk = roller.lila }
    else if (name == "kirmizi") { Renk = roller.kirmizi }
    else if (name == "sari") { Renk = roller.sari }
    else if (name == "mor") { Renk = roller.mor }
    else if (name == "siyah") { Renk = roller.siyah }
    let rol = await client.guilds.cache.get(ayarlar.guildID).roles.cache.get(Renk)
    let returnText;
    if (!member.roles.cache.has(roller.tagRol) && !member.roles.cache.has(roller.boosterRol) && !member.permissions.has("ADMINISTRATOR")) {
      returnText = `Sadece tagımızı almış ya da sunucumuza boost basmış üyeler renk rolü seçebilir.`
    } else if (name == "rolsil") {
      await member.roles.remove(roller.renkroller)
      returnText = `Rol üzerinizden alındı.`
    } else if (rol) {
      if (!member.roles.cache.has(rol)) {
        if (roller.renkroller.some(m => member.roles.cache.has(m))) {
          await member.roles.remove(roller.renkroller)
        }
        await member.roles.add(rol)
        returnText = `Rol üzerinize verildi.`
      }
    } else return;
    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 4, data: { content: returnText, flags: "64" } } })
  } else if (menu === "valantines") {
    let name = interaction.data.values
    let iliski;
    if (name == "couple") { iliski = roller.couple }
    if (name == "single") { iliski = roller.single }
    let rol = await client.guilds.cache.get(ayarlar.guildID).roles.cache.get(iliski)
    let returnText;
    if (name == "rolsil") {
      await member.roles.remove(roller.single)
      await member.roles.remove(roller.couple)
      returnText = `Rol üzerinizden alındı.`
    } else if (rol) {
      if (!member.roles.cache.has(rol)) {
        if (member.roles.cache.has(roller.single) || member.roles.cache.has(roller.couple)) {
          await member.roles.remove(roller.single)
          await member.roles.remove(roller.couple)
        }
        await member.roles.add(rol)
        returnText = `Rol üzerinize verildi.`
      }
    } else return;
    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 4, data: { content: returnText, flags: "64" } } })
  } else if (menu === "valantines") {
    let name = interaction.data.values
    let iliski;
    if (name == "couple") { iliski = roller.couple }
    if (name == "single") { iliski = roller.single }
    let rol = await client.guilds.cache.get(ayarlar.guildID).roles.cache.get(iliski)
    let returnText;
    if (name == "rolsil") {
      await member.roles.remove(roller.single)
      await member.roles.remove(roller.couple)
      returnText = `Rol üzerinizden alındı.`
    } else if (rol) {
      if (!member.roles.cache.has(rol)) {
        if (member.roles.cache.has(roller.single) || member.roles.cache.has(roller.couple)) {
          await member.roles.remove(roller.single)
          await member.roles.remove(roller.couple)
        }
        await member.roles.add(rol)
        returnText = `Rol üzerinize verildi.`
      }
    } else return;
    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 4, data: { content: returnText, flags: "64" } } })
  } else if (menu === "etkinlik") {
    let returnText;
    if (member.roles.cache.has(roller.etkinlik)) {
      await member.roles.remove(roller.etkinlik)
      returnText = `Rol üzerinizden alındı.`
    } else if (!member.roles.cache.has(roller.etkinlik)) {
      await member.roles.add(roller.etkinlik)
      returnText = `Rol üzerinize verildi.`
    } else return;
    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 4, data: { content: returnText, flags: "64" } } })
  } else if (menu === "cekilis") {
    let returnText;
    if (member.roles.cache.has(roller.çekiliş)) {
      await member.roles.remove(roller.çekiliş)
      returnText = `Rol üzerinizden alındı.`
    } else if (!member.roles.cache.has(roller.çekiliş)) {
      await member.roles.add(roller.çekiliş)
      returnText = `Rol üzerinize verildi.`
    } else return
    client.api.interactions(interaction.id, interaction.token).callback.post({ data: { type: 4, data: { content: returnText, flags: "64" } } })
  }
});

async function RolKontrol() {
  const guild = client.guilds.cache.get(ayarlar.guildID);
  const members = guild.members.cache.array()
  for (let index = 0; index < members.length; index++) {
    const member = members[index];
    let uyeRoller = [];
    await member.roles.cache.filter(r => r.name !== "@everyone" && !r.managed).forEach(async (rol) => {
      await uyeRoller.push(rol.id);
    });
    await Members.findOne({ userID: member.id }, async (err, savedRole) => {
      if (!savedRole) {
        let Roles = new Members({ userID: member.id, roles: uyeRoller });
        Roles.save()
      } else {
        savedRole.roles = uyeRoller;
        savedRole.save();
      };
    });
  }
  await client.logger.log(`[KAYITLAR YENİLENDİ]`, "log")

}

client.api.channels("862835926228271114").messages.post({
  data: {
      "content": "Aşağıdaki Menüden Rollerinizi Seçebilirsiniz.",
      "components": [{ "type": 1, "components": [{ "type": 3, "custom_id": "renks", "options": [{ "label": "Kırmızı", "value": "kirmizi", "emoji": { "id": "863825121301889025", "name": "hmdkirmizi" }, }, { "label": "Yeşil", "value": "yesil", "emoji": { "id": "863825380774248478", "name": "hmdyesil" }, }, { "label": "Lila", "value": "lila", "emoji": { "id": "863825046463315978", "name": "hmdlila" }, }, { "label": "Pembe", "value": "pembe", "emoji": { "id": "863825629799251998", "name": "hmdpembe" }, }, { "label": "Mavi", "value": "mavi", "emoji": { "id": "863825264236429312", "name": "hmdmavi" }, }, { "label": "Mor", "value": "mor", "emoji": { "id": "863825478321569802", "name": "hmdmor" }, }, { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "880700395335352360", "name": "trash" }, }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1 }], },
      {
          "type": 1, "components": [{
              "type": 3, "custom_id": "valantines", "options": [{ "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "858012582094045225", "name": "ict_kucak" }, }, { "label": "Sevgilim Yok", "value": "single", "emoji": { "id": "876053794176237589", "name": "ict_alone" }, }, { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "880700395335352360", "name": "trash" }, }], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
          }],
      }
  ]
  }
})