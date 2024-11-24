// src/commands/slowmode.js
module.exports = {
    name: 'slowmode',
    description: 'Bir kanalda yavaş mod etkinleştirir.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const time = parseInt(args[0]);
      if (isNaN(time) || time < 0 || time > 120) {
        return message.reply('Lütfen geçerli bir süre girin (0-120 saniye).');
      }
  
      await message.channel.setRateLimitPerUser(time);
      message.reply(`Bu kanalda yavaş mod ${time} saniye olarak ayarlandı.`);
    },
  };  