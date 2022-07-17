const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, User, Guild } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help command"),
            
    async execute (interaction) {
        const HelpEmbed = new MessageEmbed()
            .setColor('DARK_AQUA')
            .setTitle("List of all Commands.")
            .setDescription("")
            .addField("/help", "Gives you all possible commands.")
            .addField("/decide [input]", "Give you an awnser to you hardest question.")
            .addField("/ping", "replies with pong.")
            .addField("/meme", "Gets a meme from /r/memes on reddit.")
            .addfield("/info", "Gives you information about the bot.")
            .addfield("QOTD", "Gives you a quote of the day.")
            .setTimestamp()
            .setFooter("Help command.")
        
        
        await interaction.reply({ embeds: [HelpEmbed] });
    }
}