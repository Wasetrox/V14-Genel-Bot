// src/commands/ping.js
module.exports = {
    name: 'ping',
    description: 'Botun ping değerini gösterir.',
    category: 'fun',
    execute(message, args) {
      const ping = message.client.ws.ping;
      message.reply(`Pong! Botun ping değeri: ${ping}ms`);
    },
  };  