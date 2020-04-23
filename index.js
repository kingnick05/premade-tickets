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

    if (message.content === `-setup`) {

        let channel = message.channel

        let begin = new Discord.MessageEmbed()
            .setTitle("Setup Wizard")
            .setDescription("Welcome to the setup wizard. This wizard will take you through the steps to setup and operate your ticket bot. To begin the process, type `yes`\n\n*NOTE: ALL RESPONSES ARE CASE SENSITIVE AND WILL NOT OPERATE IF NOT TYPED ACCURATELY*\n\nThe wizard will time out after 5 minutes of no response.")
            .setFooter("Made by KingNick#0001 | https://kingdevelopment.xyz/")

        channel.send(begin).then(async =>{
            channel.awaitMessages(response => message.content, {
                max: 1,
                time: 300000,
            }).then((yes) => {
                if (yes.first().content === "yes") {

                    let q1 = new Discord.MessageEmbed()
                        .setDescription("Identify a prefix you'd like the bot to use")

                    channel.send(q1).then(async function (pref) {
                        channel.awaitMessages(response => message.content, {
                            max: 1,
                            time: 300000,
                        }).then((prefi) => {
                            let prefiix = prefi.first().content;
                            if (prefiix) {

                                let q2 = new Discord.MessageEmbed()
                                    .setDescription("Identify the default color of embeds from this bot (In hex form. Ex: #332499")

                                channel.send(q2).then(async function (eC) {
                                    channel.awaitMessages(response => message.content, {
                                        max: 1,
                                        time: 300000,
                                    }).then((emC) => {
                                        let embC = emC.first().content;
                                        if (embC) {


                                            let q3 = new Discord.MessageEmbed()
                                                .setDescription("Identify the default title of embeds from this bot")

                                            channel.send(q3).then(async function (eT) {
                                                channel.awaitMessages(response => message.content, {
                                                    max: 1,
                                                    time: 300000,
                                                }).then((emT) => {
                                                    let embT = emT.first().content;
                                                    if (embT) {


                                                        let q4 = new Discord.MessageEmbed()
                                                            .setDescription("Identify the description you'd like to have in the embed when a ticket is opened")

                                                        channel.send(q4).then(async function (eD) {
                                                            channel.awaitMessages(response => message.content, {
                                                                max: 1,
                                                                time: 300000,
                                                            }).then((emD) => {
                                                                let embDesc = emD.first().content;
                                                                if (embDesc) {

                                                                    let q5 = new Discord.MessageEmbed()
                                                                        .setDescription("Identify the footer of the embeds you'd like the bot to have")

                                                                    channel.send(q5).then(async function (eF) {
                                                                        channel.awaitMessages(response => message.content, {
                                                                            max: 1,
                                                                            time: 300000,
                                                                        }).then((emF) => {
                                                                            let embF = emF.first().content;
                                                                            if (embF) {

                                                                                let q6 = new Discord.MessageEmbed()
                                                                                    .setDescription("Identify the error color of embeds from this bot (In hex form. Ex: #332499")

                                                                                channel.send(q6).then(async function (erC) {
                                                                                    channel.awaitMessages(response => message.content, {
                                                                                        max: 1,
                                                                                        time: 300000,
                                                                                    }).then((erCC) => {
                                                                                        let errC = erCC.first().content;
                                                                                        if (errC) {

                                                                                            let q7 = new Discord.MessageEmbed()
                                                                                                .setDescription("Identify the error title of embeds from this bot")

                                                                                            channel.send(q7).then(async function (eT) {
                                                                                                channel.awaitMessages(response => message.content, {
                                                                                                    max: 1,
                                                                                                    time: 300000,
                                                                                                }).then((erT) => {
                                                                                                    let errT = erT.first().content;
                                                                                                    if (errT) {

                                                                                                        const preFix = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        preFix.prefix = prefiix;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(preFix));

                                                                                                        const embedColor = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        embedColor.embC = embC;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(embedColor));

                                                                                                        const embedTitle = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        embedTitle.embT = embT;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(embedTitle));

                                                                                                        const embedDescription = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        embedDescription.embDesc = embDesc;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(embedDescription));

                                                                                                        const embedFooter = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        embedFooter.embF = embF;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(embedFooter));

                                                                                                        const errorColor = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        errorColor.errC = errC;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(errorColor));

                                                                                                        const errorTitle = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                                                                                                        errorTitle.errT = errT;
                                                                                                        fs.writeFileSync(fileName, JSON.stringify(errorTitle));

                                                                                                        const categoryT = message.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === "category");
                                                                                                        const tickets = message.guild.roles.cache.find(r => r.name === "Tickets");

                                                                                                        if (!categoryT) {
                                                                                                            message.guild.channels.create("Tickets", {
                                                                                                                type: 'category',
                                                                                                                permissionOverwrites: [{
                                                                                                                    id: message.guild.id,
                                                                                                                    deny: ['VIEW_CHANNEL'],
                                                                                                                }]
                                                                                                            }).then(c => c.setPosition(1))
                                                                                                        }

                                                                                                        message.channel.bulkDelete(16)
                                                                                                        message.channel.send("The setup wizard is complete.").then(msg => {
                                                                                                            msg.delete(5000)
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                })
                                                                            }
                                                                        })
                                                                    })
                                                                }
                                                            })
                                                        })
                                                    }
                                                })
                                            })

                                        }
                                    })
                                })

                            }
                        })
                    })





                }
            })
        })
    }

    process.on('unhandledRejection', console.error);
});

bot.login(config.token);