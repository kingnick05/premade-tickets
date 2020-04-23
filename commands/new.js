const Discord = require("discord.js");
const config = require("../config.json");
const chalk = require("chalk");

exports.run = async (bot, message, args) => {

    const tC = message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === "category");
    const tickets = message.guild.roles.cache.find(r => r.name === "Tickets");
    let noC = new Discord.MessageEmbed()
        .setTitle(config.errT)
        .setColor(config.errC)
        .setDescription("The `Tickets` category does not exist. Please run the -setup command.")
        .setFooter(config.embF)
        .setTimestamp();

    if (!tC) return message.channel.send(noC);

    message.delete().catch(O_o => {});

    message.guild.channels.create(`ticket-${message.author.username}`, {
        type: 'text',
        permissionOverwrites: [{
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL'],
            },
            {
                id:  tickets.id,
                allow: ['VIEW_CHANNEL']
            }
        ]
    }).then(channel => {

        let newEmb = new Discord.MessageEmbed()
            .setTitle(config.embT)
            .setColor(config.embC)
            .setDescription(config.embDesc)
            .setFooter(config.embF);

        let complete = new Discord.MessageEmbed()
            .setColor(config.embC)
            .setDescription(`Successfully created ${channel.toString()}`)
            .setFooter(config.embF);

        channel.setParent(tC);
        message.channel.send(complete);
        channel.send(newEmb);
    })



}

exports.help = {
    name: "new"
}