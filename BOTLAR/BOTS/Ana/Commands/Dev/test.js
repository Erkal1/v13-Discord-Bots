class TEST extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      aliases: ['test'],
      devOnly: true,
    });
  }
  async run(client, message, args, embed) {
    // ESMER BOM
    //   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    //   if (!member) {
    //     uyeBelirt()
    //     function uyeBelirt() {
    //       const filter = response => {
    //         return response.author.id === message.author.id;
    //       }
    //       message.channel.send("Uye Belirtiniz")
    //       message.channel.awaitMessages(filter, {
    //         max: 1,
    //         time: 30000,
    //         errors: ['time'],
    //       }).catch(err => {
    //         message.reply("Komut iptal edildi.")
    //         return;
    //       }).then(collected => {
    //         if (!collected) return;
    //         const response = collected.first();
    //         let member = response.mentions.members.first() || message.guild.members.cache.get(response.content)
    //         if (response.content.toLowerCase() === 'iptal') return message.reply("Komut iptal edildi.")
    //         if (member) { 
    //           message.channel.send(`Uye Belirildi ${member}`)
    //          }
    //         else { 
    //           uyeBelirt() 
    //         }
    //       })
    //     }
    //   }
  }
}

module.exports = TEST
