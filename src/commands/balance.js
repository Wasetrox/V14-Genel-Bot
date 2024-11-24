// src/commands/balance.js
module.exports = {
    name: 'balance',
    description: 'Kullanıcının bakiyesini gösterir.',
    execute(message, args) {
      const userBalance = 1000; // Burada kullanıcı bakiyesini bir veritabanı ya da map ile yönetin
      message.reply(`Bakiye: ${userBalance} TL`);
    },
  };  