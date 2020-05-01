const fileName = './config.json';
const config = require(fileName);
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var chalk = require("chalk");

fs.readdir("./commands/", (err, files) => {

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(chalk.blue(`-----{ ${f} is running }-----`));
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {
    console.log(chalk.green(`${bot.user.username} is live. Please check console for bugs \n 2020 © King Development`));
    bot.user.setActivity("kingdevelopment.xyz", {
        url: "https://kingdevelopment.xyz/",
        type: "PLAYING"
    });
    require('events').EventEmitter.defaultMaxListeners = 15;
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

    process.on('unhandledRejection', console.error);
});

bot.login(config.token);
