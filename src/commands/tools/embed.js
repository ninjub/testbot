const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("create embed")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the Embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("content of the embed")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    let desc = interaction.options.getString("title");
    let content = interaction.options.getString("content");
    console.log(`${desc}`)
    const embed = new EmbedBuilder()
      .setTitle(`${desc}`)
      .setColor(0xfff)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setDescription(`${content}`)
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        text: client.user.tag,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
