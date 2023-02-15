const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("user balance")
    .addUserOption((option) =>
      option.setName("target").setDescription("users balance")
    ),
  async execute(interaction, client) {
    const selectedUser =
      interaction.options.getUser("target") || interaction.user;
    const storedBalance = await client.getBalance(
      selectedUser.id,
      interaction.guild.id
    );

    if (!storedBalance)
      interaction.reply({
        content: `${selectedUser.tag} doesnt have a balance.`,
        ephemeral: false,
      });
    else {
      const embed = new EmbedBuilder()
        .setTitle(`${selectedUser.username}'s Balance`)
        .setTimestamp()
        .addFields([
          {
            name: `${storedBalance.balance}`,
            value: `\u200b`,
          },
        ])
        .setFooter({
          text: client.user.tag,
        });
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
