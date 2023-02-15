const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../schemas/balance");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("pay a user")
    .addUserOption((option) =>
      option.setName("target").setDescription("users balance").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("amount you want to pay")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const userStoredBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    let amount = interaction.options.getNumber("amount");
    const selectedUser = interaction.options.getUser("target");

    if (selectedUser.bot || selectedUser.id == interaction.user.id)
      return await interaction.reply({
        content: `you cant send money to yourself or a bot`,
        ephermeral: true,
      });
    else if (amount < 1.0)
      return await interaction.reply({
        content: `the amount must be over 1`,
        ephermeral: true,
      });
    else if (amount > userStoredBalance.amount)
      return await interaction.reply({
        content: `you dont have enough money`,
        ephermeral: true,
      });

    const selectedUserBalance = await client.fetchBalance(
      selectedUser.id,
      interaction.guild.id
    );

    amount = await client.toFixedNumbers(amount);

    await Balance.findOneAndUpdate(
      { _id: userStoredBalance._id },
      {
        balance: await client.toFixedNumbers(
          userStoredBalance.balance - amount
        ),
      }
    );
    await Balance.findOneAndUpdate(
      { _id: selectedUserBalance._id },
      {
        balance: await client.toFixedNumbers(
          selectedUserBalance.balance + amount
        ),
      }
    );
    const embed = new EmbedBuilder()
    .setTitle(`you sent ${amount} coins to ${selectedUser.tag}`)
    .setTimestamp()
    .setFooter({
      text: client.user.tag,
    });
  await interaction.reply({
    embeds: [embed],
  });
  },
};
