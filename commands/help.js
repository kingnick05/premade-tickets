const Discord = require("discord.js");
const config = require("../config.json")

exports.run = async (bot, message, args) => {

    let prefix = config.prefix;
    let embed = new Discord.MessageEmbed()
    .setTitle("Help Menu")
    .setColor(config.embC)
    .setDescription(`Your prefix is currently: **${prefix}** \n\n**${prefix}add** Adds a mentioned user to a ticket \n**${prefix}ban** Bans a mentioned user \n**${prefix}close** Closes a ticket \n**${prefix}help** Shows this menu \n**${prefix}kick** Kicks a mentioned user \n**${prefix}new** Creates a new ticket \n**${prefix}remove** Removes a mentioned user from a ticket`)
    .setFooter(config.embF);

    message.channel.send(embed);

}

exports.help = {
    name: "help"
}