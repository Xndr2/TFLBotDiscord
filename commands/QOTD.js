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
        if(interaction.member.roles.cache.has('880832571255181322')) //check if user has the management role
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
                await interaction.reply({ embeds: [QOTDEmbed] }) //send embed
                
                const Thread = await interaction.channel.threads.create({ //make thread
                    name: textString,
                    autoArchiveDuration: 60,
                    reason: 'Thread to answer in.',
                })
                if (Thread.joinable) await thread.join(); //join thread
                //await thread.members.add('434760513377927188');
                await Thread.members.add(interaction.member.user.id);


            } else await interaction.reply({ content: "You can not activate the command in this channel.", ephemeral: true})
        }else //if user does not have role
            await interaction.reply({ content: "You can not activate this command. Your actions are logged.", ephemeral: true})
    }
}

