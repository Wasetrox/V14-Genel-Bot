// src/commands/kick.js
module.exports = {
    name: 'kick',
    description: 'Bir kullanıcıyı sunucudan atar.',
    category: 'moderation', // Kategori belirtildi
    execute(message, args) {
      if (!message.member.permissions.has('KICK_MEMBERS')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const member = message.mentions.members.first();
      if (member) {
        member.kick();
        message.reply(`${member.user.tag} sunucudan atıldı!`);
      } else {
        message.reply('Lütfen bir kullanıcı etiketleyin!');
      }
    },
  };
  