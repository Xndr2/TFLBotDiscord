const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow, User, Guild } = require('discord.js')
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Gives you information about the bot."),

    async execute(interaction, client) {

        const InfoEmbed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle("Information about the bot.")
            .setThumbnail("https://cdn.discordapp.com/attachments/881195253992947773/989895227831627776/TFL_logo_Standard.png")
            .setDescription("This bot is made by Xndr for [TFL](https://discord.gg/E6Wv4jpHHj) and is used for entertainment purposes only.")
            .addField("Version", "1.1.3")
            .addField("Author", "Xndr")
            .addField("Guilds", `${client.guilds.cache.size}`)
            .addField("Users", `${client.users.cache.size}`)
            .addField("Channels", `${client.channels.cache.size}`)
            .addField("Commands", `${client.commands.size}`)
            .setTimestamp()
            .setFooter({text: "info command."});
        
        await interaction.reply({ embeds: [InfoEmbed]});
    }
}