// npmjs packages
const Discord = require('discord.js');
const fs = require('fs');

// configuration
const config = require('../config.json');

// export command
module.exports = {
    
    // command name
	name: 'stock',

    // command description
	description: '',

    // command
	execute(message) {


        // split message content
        const messageArray = message.content.split(' ');

        // args
        const args = messageArray.slice(1);

       

        // stock files path
        const filePath = `${__dirname}/../stock/minecraftnfa.txt`;
        const filePath2 = `${__dirname}/../stock/crunchyroll.txt`;
        const filePath4 = `${__dirname}/../stock/hbomax.txt`;
        const filePath3 = `${__dirname}/../stock/disneyplus.txt`;
        const filePath5 = `${__dirname}/../stock/ipvanish.txt`;
        const filePath6 = `${__dirname}/../stock/robuxsuerte.txt`;
        const filePath7  = `${__dirname}/../stock/steam.txt`;
     
        
       
        // lines
        let lines = [];
        let lines2 = [];
        let lines3 = [];
        let lines4 = [];
        let lines5 = [];
        let lines6 = [];
        let lines7 = [];

        // file to read
        var fileContents;
        var fileContents2;
        var fileContents3;
        var fileContents4;
        var fileContents5;
        var fileContents6;
        var fileContents6;
        // try to read file
        try {

            // read file
            fileContents = fs.readFileSync(filePath, 'utf-8')
            fileContents2 = fs.readFileSync(filePath2, 'utf-8')
            fileContents3 = fs.readFileSync(filePath3, 'utf-8')
            fileContents4 = fs.readFileSync(filePath4, 'utf-8')
            fileContents5 = fs.readFileSync(filePath5, 'utf-8')
            fileContents6 = fs.readFileSync(filePath6, 'utf-8')
            fileContents7 = fs.readFileSync(filePath7, 'utf-8')
        // if error
        } catch (error) {

            // if error
            if (error) {
                
                // send message to channel
                message.channel.send(

                    // embed
                    new Discord.MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('Error!')
                    .setDescription(`No hay stock! o ocurrio un error desconocido...`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setTimestamp()
                );

                // cancel
                return;
            };
        };

        // get lines
        fileContents.split(/\r?\n/).forEach(function (line) {

            // push lines
            lines.push(line);
        });

        fileContents2.split(/\r?\n/).forEach(function (a) {

           
            lines2.push(a);
        });

        fileContents3.split(/\r?\n/).forEach(function (b) {

           
            lines3.push(b);
        });

                fileContents4.split(/\r?\n/).forEach(function (c) {

           
            lines4.push(c);
        });

                fileContents5.split(/\r?\n/).forEach(function (d) {

           
            lines5.push(d);
        });

        fileContents6.split(/\r?\n/).forEach(function (e) {

           
            lines6.push(e);
        });

                fileContents7.split(/\r?\n/).forEach(function (e) {

           
            lines7.push(e);
        });

let stockr = lines.length
let linea = stockr--

let stockr2 =  lines2.length
let linea2 = stockr2--

let stockr3 =  lines3.length
let linea3 = stockr3--

let stockr4 =  lines4.length
let linea4 = stockr4--

let stockr5 =  lines5.length
let linea5 = stockr5--

let stockr6 =  lines6.length
let linea6 = stockr6--

let stockr7 =  lines7.length
let linea7 = stockr7--

        // üzenet küldése csatornába
        message.channel.send(




            // embed
            new Discord.MessageEmbed()
            .setColor(config.color.green)
            .setTitle(`Stock de CrazyGen`)
            .setDescription(`**minecraftnfa** **\`${linea}\`** \n **crunchyroll** **\`${linea2}\`**\n **disneyplus** **\`${linea3}\`** \n **hbomax** **\`${linea4}\`** \n **ipvanish** **\`${linea5}\`** \n **robuxsuerte** **\`${linea6}\`**\n **steam** **\`${linea7}\`** \n **canvapro** **\`∞\`** \n **nitrounchecked** **\`∞\`**`)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        );
    }
    
};