const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help command"),
            
    async execute (interaction) {
        const HelpEmbed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle("List of all Commands.")
            .setDescription("")
            .addField("/help", "Gives you all possible commands.")
            .addField("/decide [input]", "Give you an awnser to you hardest question.")
            .addField("/ping", "replies with pong.")
            .addField("/meme", "Gets a meme from /r/memes on reddit.")
            .addField("/info", "Gives you information about the bot.")
            .addField("QOTD", "Gives you a question of the day.")
            .addField("SOTD", "Gives you a song of the day.")
            .addField("/serverinfo", "Gives you information about the server.")
            .setTimestamp()
            .setFooter({text: "Help command."})
        
        
        await interaction.reply({ embeds: [HelpEmbed] });

        //log into file
        const content = '\nhelp command executed by '+ interaction.member.user.username + ' at ' + new Date().toLocaleString();
        const path = 'Logs.txt';
        fs.writeFile(path, content, { flag: 'a' }, err => { //append to file write at end of file
            if (err) {
              console.error(err);
            }
        });
    }
}