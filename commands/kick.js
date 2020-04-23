const Discord = require("discord.js");
const config = require("../config.json");
var chalk = require("chalk");

exports.run = async (bot, message, args) => {

    const tickets = message.guild.roles.cache.find(r => r.name === "Tickets");
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
    .setDescription("You must provide a reason for kicking a user")
    .setFooter(config.embF);

    const k = message.mentions.users.first();
    if(!k) return message.channel.send(noU);
    let kR = args.join(" ").slice(22);
    if(!kR) return message.channel.send(noR);
    
    if(member.roles.cache.some(role => role.name === `Tickets`)) {
        message.delete().catch(O_o=>{});
        message.guild.member(k).kick(kR);
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(config.embT)
        .setColor(config.embC)
        .setDescription(`${k} has been kicked\n\nReason:\n${kR}`)
        .setFooter(config.embF));
        
    } else {
        message.channel.send(noP);
    }

}

exports.help = {
    name: "kick"
}