const joinedAt = require("../../../Database/Stats/voiceJoinedAt");
const { saveStats } = require("../../../Helpers/function")
class VoiceStateUpdate {
  Event = "voiceStateUpdate"
  async run(oldState, newState) {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

    if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });

    let joinedAtData = await joinedAt.findOne({ userID: oldState.id });

    if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
    joinedAtData = await joinedAt.findOne({ userID: oldState.id });
    const data = Date.now() - joinedAtData.date;

    if (oldState.channelId && !newState.channelId) {
      await saveStats(oldState, oldState.channel, data);
      await joinedAt.deleteOne({ userID: oldState.id });
    } else if (oldState.channelId && newState.channelId) {
      await saveStats(oldState, oldState.channel, data);
      await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
    }
  }
}

module.exports = VoiceStateUpdate