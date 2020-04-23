const Discord = require("discord.js");
var chalk = require("chalk");
const config = require("../config.json");

exports.run = async (bot, message, args) => {

    const remove = message.mentions.users.first();
    if (!message.channel.name.startsWith('ticket-')) {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.errC)
            .setDescription(`This is not a ticket. This command may only be used in a ticket.`)
            .setFooter(config.embF));

        return;
    }

    if (!remove) return message.channel.send(new Discord.MessageEmbed()
        .setColor(config.errC)
        .setDescription("You must mention a user.")
        .setFooter(config.embF));

    if (remove) {
        message.channel.updateOverwrite(remove, {
            VIEW_CHANNEL: false
        }, 'Needed to change permissions')

        message.channel.send(new Discord.MessageEmbed()
                .setColor(config.embC)
                .setDescription(`Successfully removed ${remove}`)
                .setFooter(config.embF))

    }

    return;

}

exports.help = {
    name: "remove"
}