const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('members')
		.setDescription('get member count'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        const membed = new EmbedBuilder()
        .setTitle(`${interaction.guild.name} hat ${interaction.guild.memberCount} Member`)


		await interaction.reply({
            embeds: [membed]
        });

	},
};