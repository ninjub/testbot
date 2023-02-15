const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data : new SlashCommandBuilder()
        .setName('ping')
        .setDescription('get bot ping'),
    async execute (interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Ping: ${client.ws.ping}`;
        await interaction.editReply({
            content: newMessage
        });
    }
}