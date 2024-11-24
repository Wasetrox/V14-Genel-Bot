// src/commands/ban.js
module.exports = {
    name: 'ban',
    description: 'Bir kullanıcıyı sunucudan yasaklar.',
    category: 'moderation', // Kategori belirtildi
    execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const member = message.mentions.members.first();
      if (member) {
        member.ban();
        message.reply(`${member.user.tag} sunucudan yasaklandı!`);
      } else {
        message.reply('Lütfen bir kullanıcı etiketleyin!');
      }
    },
};