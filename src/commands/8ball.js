// src/commands/8ball.js
const responses = [
    'Evet.',
    'Hayır.',
    'Belki.',
    'Kesinlikle.',
    'Kesinlikle hayır.',
    'Bunu asla bilemezsin.',
    'İhtimal dahilinde.',
  ];
  
  module.exports = {
    name: '8ball',
    description: 'Sorulara evet, hayır veya belki gibi rastgele cevaplar verir.',
    category: 'fun',
    execute(message, args) {
      if (!args.length) {
        return message.reply('Lütfen bir soru sorun!');
      }
  
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      message.reply(randomResponse);
    },
  };
  