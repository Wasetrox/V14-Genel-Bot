const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const config = require("./config.json")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Eventleri yükle
const eventsPath = path.join(__dirname, 'src', 'events');
fs.readdirSync(eventsPath).forEach(file => {
  const event = require(path.join(eventsPath, file));
  const eventName = file.split('.')[0];
  client.on(eventName, event.bind(null, client));
});

// Komutları yükle
client.commands = new Map();
client.categories = new Map(); // Kategoriler için yeni bir Map

const commandsPath = path.join(__dirname, 'src', 'commands');
fs.readdirSync(commandsPath).forEach(file => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);

  // Kategoriyi kontrol et ve kategorilere göre grupla
  if (!client.categories.has(command.category)) {
    client.categories.set(command.category, []);
  }
  client.categories.get(command.category).push(command);
});

client.once('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
});

client.login(config.token);
