const low = require("lowdb")
class KanalKur extends Command {
  constructor(client) {
    super(client, {
      name: "kanalkur",
      aliases: ["kanalkur"],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const utils = await low(client.adapters('guard'));
    const channels = await low(client.adapters('kanallar'));
    const everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    ////////////////////////
    const logCategory = await message.guild.channels.create(`${ayarlar.sunucuisim} LOGS`, {
      type: 'GUILD_CATEGORY',
    });
    await logCategory.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
    const tagLog = await message.guild.channels.create(`・tag・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
    const yasakTagLog = await message.guild.channels.create(`・yasak・tag・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
    const denetimLog = await message.guild.channels.create(`・denetim・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
    const taglıLog = await message.guild.channels.create(`・taglı・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(logCategory, { lockPermissions: true }));
    await channels.set('tagLog', tagLog.id).write();
    await channels.set('yasakTagLog', yasakTagLog.id).write();
    await channels.set('denetimBilgi', denetimLog.id).write();
    await channels.set('taglıLog', taglıLog.id).write();
    ////////////////////////
    const penalCategory = await message.guild.channels.create(`${ayarlar.sunucuisim} PENALTIES LOGS`, {
      type: 'GUILD_CATEGORY',
    });
    await penalCategory.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
    const banLog = await message.guild.channels.create(`・ban・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(penalCategory, { lockPermissions: true }));
    const muteLog = await message.guild.channels.create(`・jail・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(penalCategory, { lockPermissions: true }));
    const jailLog = await message.guild.channels.create(`・mute・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(penalCategory, { lockPermissions: true }));
    const warnLog = await message.guild.channels.create(`・warn・log`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(penalCategory, { lockPermissions: true }));
    await channels.set('banLog', banLog.id).write();
    await channels.set('muteLog', muteLog.id).write();
    await channels.set('jailLog', jailLog.id).write();
    await channels.set('warnLog', warnLog.id).write();
    ////////////////////////
    const guardCategory = await message.guild.channels.create(`${ayarlar.sunucuisim} GUARD LOGS`, {
      type: 'GUILD_CATEGORY',
    });
    await guardCategory.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
    const serverLog = await message.guild.channels.create(`・sunucu・koruma`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const roleLog = await message.guild.channels.create(`・rol・koruma`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    const channelLog = await message.guild.channels.create(`・kanal・koruma`, {
      type: 'GUILD_TEXT',
    }).then(async channel => await channel.setParent(guardCategory, { lockPermissions: true }));
    await utils.set('serverLog', serverLog.id).write();
    await utils.set('roleLog', roleLog.id).write();
    await utils.set('channelLog', channelLog.id).write();
  }
}

module.exports = KanalKur