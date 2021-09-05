class RolSay extends Command {
    constructor(client) {
        super(client, {
            name: "rolsay",
            aliases: ["rolsay"],
            description: ["<@rol/ID>"],
            category: "Managment",
            perm: [...roller.yönetimRolleri],
        });
    }
    async run(client, message, args, embed) {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.channel.send(cevaplar.rolBelirt)
        //
        const member = role.members.array().map(e => `<@!${e.id}>`).join(",")
        await message.channel.send(Discord.Formatters.codeBlock("js", `Sunucumuzda ${role.name} | ${role.id} rolünde ${role.members.size < 1 ? "kimse bulunmuyor" : role.members.size + " kişi bulunuyor"}`))
        if (role.members.size >= 1) {
            const arr = Discord.Util.splitMessage(member, { maxLength: 1950, char: "," });
            arr.forEach(element => {
                message.channel.send(Discord.Formatters.codeBlock("js", element));
            });
        }
    }
}

module.exports = RolSay