const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const auth = require('./assets/auth.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (msg.content === '!3dg-submit') {
        const tournaments = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('tournaments')
                .setPlaceholder('Interesse an öffentlichen Turniere/Ligen?')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Nitro League')
                    .setValue('Nitro League'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('DeSBL')
                    .setValue('DeSBL'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Alles')
                    .setValue('Alles')
                )
            );
        const mates = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('mates')
                .setPlaceholder('Alter der Teammates')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('16+')
                    .setValue('16+'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('18+')
                    .setValue('18+'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('egal')
                    .setValue('egal')
                )
            );

        const availability = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('availability')
                .setPlaceholder('Verfügbarkeit')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Frühschicht')
                    .setValue('Frühschicht'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Spätschicht')
                    .setValue('Spätschicht'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('morgens')
                    .setValue('morgens'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('abends')
                    .setValue('abends'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('Wochenende')
                    .setValue('Wochenende')
                )
            );

        const activity = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('activity')
                .setPlaceholder('Wöchentliche Aktivität')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('2+ Tage')
                    .setValue('2+ Tage'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('3+ Tage')
                    .setValue('3+ Tage'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('5+ Tage')
                    .setValue('5+ Tage')
                )
            );

        const gamemode = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('gamemode')
                .setPlaceholder('Spielmodus')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel('1s')
                    .setValue('1s'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('2s')
                    .setValue('2s'),
                    new StringSelectMenuOptionBuilder()
                    .setLabel('3s')
                    .setValue('3s')
                )
            );

        const submit = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('submit')
                .setLabel('Abschicken')
                .setStyle('Secondary')
            );

        msg.channel.send({ components: [tournaments, mates, availability, activity, gamemode] });
        msg.channel.send({ components: [submit] });
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isButton()) {
        return true;
    } else {
        interaction.reply('Auswahl gespeichert!');
    }
});

client.login(auth.token);