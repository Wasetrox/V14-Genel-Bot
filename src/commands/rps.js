// src/commands/rps.js
module.exports = {
    name: 'rps',
    description: 'Taş, Kağıt, Makas oyunu oynar.',
    category: 'fun',
    execute(message, args) {
      const choices = ['Taş', 'Kağıt', 'Makas'];
      const userChoice = args[0];
      if (!choices.includes(userChoice)) {
        return message.reply('Geçerli bir seçenek girin: Taş, Kağıt veya Makas.');
      }
  
      const botChoice = choices[Math.floor(Math.random() * choices.length)];
      let result = '';
      
      if (userChoice === botChoice) {
        result = 'Beraberlik!';
      } else if (
        (userChoice === 'Taş' && botChoice === 'Makas') ||
        (userChoice === 'Kağıt' && botChoice === 'Taş') ||
        (userChoice === 'Makas' && botChoice === 'Kağıt')
      ) {
        result = 'Kazandın!';
      } else {
        result = 'Kaybettin!';
      }
  
      message.reply(`Bot: ${botChoice}\nSonuç: ${result}`);
    },
  };
  