// src/commands/roll.js
module.exports = {
    name: 'roll',
    description: 'Bir zar atar.',
    category: 'fun',
    execute(message, args) {
      const result = Math.floor(Math.random() * 6) + 1;
      message.reply(`Zar sonucu: ${result}`);
    },
  };  