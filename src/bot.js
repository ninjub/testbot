require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect, set } = require("mongoose");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 3276799 });
client.commands = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  console.log(folder);
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`);
  for (const file of functionFiles) {
    console.log(file);
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => {
  set("strictQuery", true);
  await connect(databaseToken).catch(console.error);
})();
