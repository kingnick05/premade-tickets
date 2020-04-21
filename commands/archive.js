const Discord = require("discord.js");
var chalk = require("chalk");
const config = require("../config.json");

exports.run = async (bot, message, args) => {

    const modeRole = message.guild.roles.cache.find(r => r.name === config.ticketRole);
    let noP = new Discord.MessageEmbed()
    .setTitle(config.errT)
    .setColor(config.errC)
    .setDescription(`You must be a Moderator to use this command`)
    .setFooter(config.embF);

    let user = message.author;
    let member = message.guild.member(user);
    let archived = message.guild.channels.cache.find(c => c.name === 'Archived Tickets' && c.type === "category");

    if (!message.channel.name.startsWith('ticket-')) {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(config.errC)
            .setDescription(`This is not a ticket. This command may only be used in a ticket.`)
            .setFooter(config.embF));

        return;
    }

    if(member.roles.cache.some(role => role.name === `${modeRole}`)) {
        message.channel.setParent(archived);
        message.channel.updateOverwrite(message.guild.id, { VIEW_CHANNEL: false }, 'Needed to change permissions')
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("This ticket has been archived. It will automatically delete after 10 days.")
        .setColor(config.embC)
        .setFooter(config.embF)).then(setTimeout(() => message.channel.delete(), 8.64e+8));
       
        
    } else {
        message.channel.send(noP);
    }

}

exports.help = {
    name: "archive"
}