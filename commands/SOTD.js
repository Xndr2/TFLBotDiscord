const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageEmbed, Collection, Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const search = require("youtube-search");
const opts = {   //options for youtube search
    maxResults: 1,
    key: process.env.YOUTUBE_API,
    type: "video"
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sotd")
        .setDescription("Makes the SOTD announcement.")
        .addStringOption(option =>( 
            option.setName('song')
                .setDescription('Give the song name.')
                .setRequired(true))
        ),

    async execute(interaction, client) {
        if(interaction.member.roles.cache.has('880832571255181322')) //check if user has the management role
        {
            if(interaction.channel.id === '981262669212422194') //check channel
            {
                const query = interaction.options.getString('song'); //get song name
                let results = await search(query, opts); //search youtube for song
                if(results){
                    let resultsArray = results.results; //get results array
        
                    const SOTDEmbed = new MessageEmbed()
                        .setColor('GOLD')
                        .setTitle(":notes: SOTD")
                        .setURL(resultsArray[0].link) //set url to youtube video
                        .setDescription("Awnser in the thread.")
                        .setTimestamp()
                        .setFooter({text: "SOTD command."})
                        .addField("Song", resultsArray[0].title) //add songs to embed

                    await interaction.channel.send("<@&981482072428404736>") //ping SOTD
                    await interaction.reply({ embeds: [SOTDEmbed], fetchReply: true }).then(async (message) => {
                        const thread = await message.startThread({ //make thread
                            name: resultsArray[0].title,
                            autoArchiveDuration: 60,
                            reason: 'Thread to answer in.',
                        })
                        if (thread.joinable) await thread.join(); //join thread
                        await thread.members.add(interaction.member.user.id); //add user to thread
                    });
                }
            } else await interaction.reply({ content: "You can not activate the command in this channel.", ephemeral: true})
        } else //if user does not have role
            await interaction.reply({ content: "You can not activate this command. Your actions are logged.", ephemeral: true})
    }
}