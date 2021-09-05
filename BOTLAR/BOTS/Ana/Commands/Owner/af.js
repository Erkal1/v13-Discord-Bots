class UnbanAll extends Command {
  constructor(client) {
    super(client, {
      name: "af",
      aliases: ['af'],
      ownerOnly: true,
    });
  }
  async run(client, message, args, embed) {
    const banneds = await message.guild.bans.fetch()
    await banneds.forEach(async member => {
      await message.guild.members.unban(member.user.id, `Yetkili: ${message.author.id}`)
    });
    if (message) await message.react(emojiler.mavionay)
  }
}

module.exports = UnbanAll