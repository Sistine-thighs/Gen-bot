// packages
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'help', // command name at execute (may be different from the file name)
	description: 'Display the command list.', // description in help command

    // the command
	execute(message) {
        // get the commands
		const { commands } = message.client;
        
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor(config.color.default)
            .setTitle('Lista de comandos!')
.setDescription("`gen` Genera una cuenta!\n `stock` muestra el stock de los servicios! ")
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
            .setTimestamp()
        );
	}
};