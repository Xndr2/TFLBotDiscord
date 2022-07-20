const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')

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
    }
}