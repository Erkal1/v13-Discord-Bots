class RolDenetim extends Command {
   constructor(client) {
      super(client, {
         name: "roldenetim",
         aliases: ["roldenetim"],
         description: ["<@rol/ID>"],
         category: "Managment",
         perm: [...roller.yönetimRolleri],
      });
   }
   async run(client, message, args, embed) {
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
      if (!role) return message.channel.send({ embeds: [embed.setDescription(`Lütfen geçerli bir rol etiketleyiniz ${emojiler.dikkat}`)] })
      let unVoice = role.members.array().filter(member => !member.voice.channel);
      let veri = role.members.map(e => e ? `ID: ${e.id} - İsim: ${e.displayName} - ${e.voice.channel ? "Seste" : "Seste Değil"}` : "sa").join("\n")
      await message.channel.send(Discord.Formatters.codeBlock("diff", "Rol " + role.name + " | " + role.id + " | " + role.members.size + " Toplam Üye | " + unVoice.length + " Seste Olmayan Üye"));
      const arr = Discord.Util.splitMessage(veri, { maxLength: 1950, char: "\n" });
      arr.forEach(element => {
         message.channel.send(Discord.Formatters.codeBlock("diff", element));
      });
   }
};

module.exports = RolDenetim