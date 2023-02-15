const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user to kick")
        .setRequired(true)
    )
    .addStringOption(option => option.setName('reason').setDescription('reason for kick')),
  async execute(interaction, client) {
    const user = interaction.option.getUser("user");
    let reason = interaction.option.getString("reason")
    const member = interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

      if(!reason) reason = "no reason provided";

      user.send({
        content: `you have been kicked from ${interaction.guild.name}\n Reason: ${reason}`
      }).catch(console.log(`user ${user} DM\'s are off`));

      await member.kick(reason).catch(console.log(`${user} couldn\'t be kicked`))
  },
};
