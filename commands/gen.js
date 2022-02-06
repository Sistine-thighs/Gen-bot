// packages
const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();
const Duration = require ("humanize-duration");
const used = new Map();
const ms = require("ms")
// constants
const generated = new Set();

module.exports = {
	name: 'gen', // command name at execute (may be different from the file name)
	description: 'Generate a specified service, if stocked.', // description in help command

    // the command :D
	execute(message, args) {
        // if the gen channel is not specified in config or bad id specified
        try {
            message.client.channels.cache.get(config.genChannel).id; // get the gen channel id (for testing the config)
        } catch (error) {
            if (error) log.error(error);
            if (config.command.error_message === true) {
                return message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('Error occured!')
                    .setDescription('Not a valid gen channel specified!')
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setTimestamp()
                );
            };
        };

        // if command executed in the gen channel
        if (message.channel.id === config.genChannel) {
            // if the command used before the cooldown ends

             cooldown = used.get(message.author.id)

            if (generated.has(message.author.id)) {
             
            

           const remaining = Duration(cooldown - Date.now(), { units: ["m", "s"], round: true});

                return message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('Cooldown')
                    .setDescription(`Porfavor ejecuta este comando en 2 minutos! ${remaining} `)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                    .setTimestamp()
                );
            } else {
                const service = args[0];

                // if no service specified
                if (!service) {
                    return message.channel.send(
                        new Discord.MessageEmbed()
                        .setColor(config.color.red)
                        .setTitle('Missing parameters!')
                        .setDescription('You need to specify a service!')
                        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                        .setTimestamp()
                    );
                };
                
                const filePath = `${__dirname}/../stock/${args[0]}.txt`; // path for the specified service

                // read file
                fs.readFile(filePath, function (error, data) {
                    // if everything is okay c:
                    if (!error) {
                        data = data.toString(); // convert content to strings

                        const position = data.toString().indexOf('\n'); // get position
                        const firstLine = data.split('\n')[0]; // get the first line

                        // if nothing in the specified service file
                        if (position === -1) {
                            return message.channel.send(
                                new Discord.MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('Out Of Stock!')
                                .setDescription(`No hay stock de \`${args[0]}\` !`)
                                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                .setTimestamp()
                            );
                        };

                        // send the embed and the copy+pasta message to user
                        message.author.send(
                            new Discord.MessageEmbed()
                            .setColor(config.color.green)
                            .setTitle('Cuenta Generada!')
                            .addField('Servicio', `\`\`\`${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()}\`\`\``, true)
                            .addField('Cuenta', `\`\`\`${firstLine}\`\`\``, true)
                            .setTimestamp()
                        )

                        // if the DM message sent successfully
                        if (position !== -1) {
                            data = data.substr(position + 1); // remove line
                            
                            // write the changes to service file
                            fs.writeFile(filePath, data, function (error) {
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                    .setColor(config.color.green)
                                    .setTitle('Cuenta generada corretamente!')
                                    .setDescription(`Checkea tu DM! ${message.author}! \n*Si no recibiste la cuenta por favor desbloquea tu DM!*`)
                                    .setThumbnail("https://digital.ricoh.es/wp-content/uploads/2020/04/c6842479-e0ee-49a2-9053-d00639074f7a_tick.gif")
                                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                    .setTimestamp()
                                );

                                generated.add(message.author.id); // create cooldown for the author

                                // set cooldown
                                setTimeout(() => {
                                    generated.delete(message.author.id); // remove the author after the cooldown expires
                                }, config.genCooldown); // get cooldown from config

                                // if an error occured
                                if (error) log.error(error); // say to console
                            });
                        } else {
                            return message.channel.send(
                                new Discord.MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('Generator error!')
                                .setDescription(`The \`${args[0]}\` service is empty!`)
                                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                                .setTimestamp()
                            );
                        };
                    } else {
                        return message.channel.send(
                            new Discord.MessageEmbed()
                            .setColor(config.color.red)
                            .setTitle('Generator error!')
                            .setDescription(`Service \`${args[0]}\` does not exist!`)
                            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                            .setTimestamp()
                        );
                    };
                });
            };
        } else {
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Mal uso!')
                .setDescription(`No puedes usar el comando \`gen\` en este canal! Solo en <#${config.genChannel}>`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );
        };
	}
}
