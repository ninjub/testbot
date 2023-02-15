const {REST} = require('@discordjs/rest');
const { Routes} = require('discord-api-types/v9');
const fs = require("fs");
require("dotenv").config();
const { token } = process.env;
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        console.log(command.data.name)
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`the command ${command.data.name} is online`)
      }
    }

    const clientId = '1073633173264670841';
    const rest = new REST ({ version: '9'}).setToken(token);
    try {
		console.log(`Started refreshing application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: client.commandArray },
		);

		console.log(`Successfully reloaded application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}

    
  };
};
