const Discord = require("discord.js");
var chalk = require("chalk");
const config = require("../config.json");

exports.run = async (bot, message, args) => {

    if (!message.channel.name.startsWith('ticket-')) {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.errC)
            .setDescription(`This is not a ticket. This command may only be used in a ticket.`)
            .setFooter(config.embF));

        return;
    }


    message.channel.send(new Discord.MessageEmbed()
        .setDescription("This ticket will close in 15 seconds.")
        .setColor(config.embC)
        .setFooter(config.embF)).then(setTimeout(() => message.channel.delete(), 15000));

}

exports.help = {
    name: "close"
}