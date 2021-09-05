const Users = require('../../../Database/Users')
class GuildMemberRemove {
    Event = "guildMemberRemove"
    async run(member) {
        if (member.user.bot) return;
        await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
        await Users.findOneAndUpdate({ $pull: { Taggeds: { userID: member.id } } });
    }
}
module.exports = GuildMemberRemove