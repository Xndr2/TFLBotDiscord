const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("decide")
        .setDescription("Decide command")
        .addStringOption(option =>(
            option.setName('input')
                .setDescription('Give an argument')
                .setRequired(true))
        ),
            
    async execute (interaction) {
        const string = interaction.options.getString('input');
        const messages = ["For sure", "No", "No question, Yes", "No one knows", "Maybe", "No question, No"]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        //await interaction.reply(randomMessage);

        const DecideEmbed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle(":eyes: "+string)
            .setDescription(randomMessage)
            .setTimestamp()
            .setFooter({text: "Decide command."})
        
        
        await interaction.reply({ embeds: [DecideEmbed] });

        //log into file
        const content = '\ndecide command executed by '+ interaction.member.user.username + ' at ' + new Date().toLocaleString();
        const path = 'Logs.txt';
        fs.writeFile(path, content, { flag: 'a' }, err => { //append to file write at end of file
            if (err) {
              console.error(err);
            }
        });
    }
}