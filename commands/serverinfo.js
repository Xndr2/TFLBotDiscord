const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow, User, Guild } = require('discord.js')
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Gives you information about the server."),

    async execute(interaction, client) {
        const guild = interaction.guild;
        const memberCount = guild.members.cache.size;

        const ServerInfoEmbed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle("Information about the bot.")
            .setThumbnail("https://cdn.discordapp.com/attachments/881195253992947773/989895227831627776/TFL_logo_Standard.png")
            .setDescription("This bot is made by Xndr for [TFL](https://discord.gg/E6Wv4jpHHj) and is used for entertainment purposes only.")
            .addField("Server ID", `${guild.id}`)
            .addField("Server Name", `${guild.name}`)
            .addField("Server Owner", "<@685906051656057007>")
            .addField("Server Created", `${guild.createdAt}`)
            .addField("Server Icon", `${guild.iconURL()}`)
            .addField("Users in this server", `${memberCount}`)
            .addField("Channels in this server", `${guild.channels.cache.size}`)
            .addField("Roles in this server", `${guild.roles.cache.size}`)
            .setTimestamp()
            .setFooter({text: "Server info command."});
        
        await interaction.reply({ embeds: [ServerInfoEmbed]});

        //log into file
        const content = '\nserverinfo command executed by '+ interaction.member.user.username + ' at ' + new Date().toLocaleString();
        const path = 'Logs.txt';
        fs.writeFile(path, content, { flag: 'a' }, err => { //append to file write at end of file
            if (err) {
              console.error(err);
            }
        });
    }
}