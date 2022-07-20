const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("qotd")
        .setDescription("Makes the QOTD announcement.")
        .addStringOption(option =>(
            option.setName('question')
                .setDescription('Give the Question')
                .setRequired(true))
        ),

    async execute(interaction) {
        if(interaction.member.roles.cache.has('880832571255181322') || interaction.member.roles.cache.has('936990096295591978')) //check if user has the management or comdir role
        {
            if(interaction.channel.id === '970587669199486986') //check channel
            {
                const textString = interaction.options.getString('question')
                const QOTDEmbed = new MessageEmbed()
                .setColor("GOLD")
                .setTitle(textString)
                .setDescription("")
                .setTimestamp()
                .setFooter({text: "QOTD command."})

                await interaction.channel.send("<@&981481997228720178>") //ping QOTD

                await interaction.reply({ embeds: [QOTDEmbed], fetchReply: true }).then(async (message) => {
                    const thread = await message.startThread({ //make thread
                        name: textString,
                        autoArchiveDuration: 60,
                        reason: 'Thread to answer in.',
                    })
                    if (thread.joinable) await thread.join(); //join thread
                    await thread.members.add(interaction.member.user.id); //add user to thread
                });
    
            } else await interaction.reply({ content: "You can not activate the command in this channel.", ephemeral: true})
        }else //if user does not have role
            await interaction.reply({ content: "You can not activate this command. Your actions are logged.", ephemeral: true})
    }
}

