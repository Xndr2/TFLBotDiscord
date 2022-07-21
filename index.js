//setup
require("dotenv").config();
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const {Client, Intents, Collection, Interaction} = require("discord.js");
const { Search } = require("youtube-search");
const { Console } = require("console");
const internal = require("stream");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

fs.writeFile('Logs.txt', '\n\nBot started at '+ new Date().toLocaleString(), { flag: 'a' }, err => {console.log(err)}); //logs the start of the bot

//get commands from folder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); //get all files that end with .js
const commands = []; //make an array for the commands
client.commands = new Collection(); //new collection
for(const file of commandFiles){
    const command = require(`./commands/${file}`); //run command file
    commands.push(command.data.toJSON()); //add command to array and to collection
    client.commands.set(command.data.name, command);
}

// when ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("the server activity", {
        type: "WATCHING",
      });
      fs.writeFile('Logs.txt', '\nset status to watching', { flag: 'a' }, err => {console.log(err)}); //logs status

      //register commands
      const CLIENT_ID = client.user.id;
      const rest = new REST({ //make new rest (enable commands)
        version: "10"
      }).setToken(process.env.TOKEN);

      (async () =>{
        try{
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Succesfully registered commands globally.");
                //logs commands globally
                fs.writeFile('Logs.txt', '\nSuccesfully registered commands globally. '+ new Date().toLocaleString(), { flag: 'a' }, err => {console.log(err)});

            }else{
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Succesfully registered commands locally.");
                 //logs commands locally
                fs.writeFile('Logs.txt', '\nSuccesfully registered commands locally. '+ new Date().toLocaleString(), { flag: 'a' }, err => {console.log(err)});
            }
        } catch(err){
            if(err) console.error(err); //if valid error
        }
      })();
});

//call commands
client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()){ //make sure interaction is valis command
        const command = client.commands.get(interaction.commandName);
        
        if(!command) return;
        try {
            await command.execute(interaction, client);
        } catch (err) {
            if(err) console.error(err); //if valid error
            await interaction.reply({ content: "an error has accured while executing commands. Please contact <@434760513377927188> with a screenshot.", ephemeral: true });
        }
    }
    
    if(interaction.isButton()){ //make sure interaction is valid button
        if(interaction.customId === 'memebutton') //make sure button is meme button
        {
            const command = client.commands.get("meme");
            if(!command) return;
            try {
                await command.execute(interaction, client); //execute meme command
            }
            catch (err) {
                if(err) console.error(err); //if valid error
                await interaction.reply({ content: "an error has accured while executing commands. Please contact <@434760513377927188> with a screenshot.", ephemeral: true });
            }
        }
    }
});

client.login(process.env.TOKEN);