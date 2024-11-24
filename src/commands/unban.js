// src/commands/unban.js
module.exports = {
    name: 'unban',
    description: 'Yasaklanan bir kullanıcıyı tekrar sunucuya davet eder.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const userId = args[0];
      if (!userId) {
        return message.reply('Lütfen yasaklı kullanıcı ID\'sini belirtin!');
      }
  
      try {
        await message.guild.bans.remove(userId);
        message.reply(`ID: ${userId} olan kullanıcı yasaklamadan çıkarıldı!`);
      } catch (error) {
        message.reply('Yasaklı kullanıcı bulunamadı.');
      }
    },
  };  