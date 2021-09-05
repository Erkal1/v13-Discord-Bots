class Kilit extends Command {
  constructor(client) {
    super(client, {
      name: "kilit",
      aliases: ['kilit'],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
      await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: false });
      await message.channel.send({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalı, ${message.author} tarafından kilitlendi!`)] })
    } else {
      await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: null });
      await message.channel.send({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalının kilidi, ${message.author} tarafından açıldı!`)] });
    };
  }
}

module.exports = Kilit