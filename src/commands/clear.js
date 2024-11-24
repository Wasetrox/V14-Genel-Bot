// src/commands/clear.js
module.exports = {
    name: 'clear',
    description: 'Belirtilen sayıda mesajı siler.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        return message.reply('1 ile 100 arasında geçerli bir sayı girin!');
      }
  
      await message.channel.bulkDelete(amount, true);
      message.reply(`${amount} mesaj silindi!`);
    },
  };  