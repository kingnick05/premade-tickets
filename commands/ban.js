const Discord = require("discord.js");
const config = require("../config.json");
var chalk = require("chalk");

exports.run = async (bot, message, args) => {

    const modeRole = message.guild.roles.cache.find(r => r.name === config.ticketRole);
    let user = message.author;
    let member = message.guild.member(user);

    let noU = new Discord.MessageEmbed()
    .setTitle(config.errT)
    .setColor(config.errC)
    .setDescription("You must mention a user to ban")
    .setFooter(config.embF);

    let noP = new Discord.MessageEmbed()
    .setTitle(config.errT)
    .setColor(config.errC)
    .setDescription(`You must be a Moderator to use this command`)
    .setFooter(config.embF);

    let noR = new Discord.MessageEmbed()
    .setTitle(config.errT)
    .setColor(config.errC)
    .setDescription("You must provide a reason for banning a user")
    .setFooter(config.embF);

    const b = message.mentions.users.first();
    if(!b) return message.channel.send(noU);
    let bR = args.join(" ").slice(22);
    if(!bR) return message.channel.send(noR);
    
    if(member.roles.cache.some(role => role.name === `${modeRole}`)) {
        message.delete().catch(O_o=>{});
        message.guild.member(b).ban(bR);
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(config.embT)
        .setColor(config.embC)
        .setDescription(`${b} has been banned\n\nReason:\n${bR}`)
        .setFooter(config.embF));
        
    } else {
        message.channel.send(noP);
    }

}

exports.help = {
    name: "ban"
}