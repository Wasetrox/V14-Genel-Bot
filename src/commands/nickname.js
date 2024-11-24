// src/commands/nickname.js
module.exports = {
    name: 'nickname',
    description: 'Bir kullanıcının takma adını değiştirir.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_NICKNAMES')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Lütfen takma adı değiştirilecek kullanıcıyı etiketleyin!');
      }
  
      const nickname = args.slice(1).join(' ');
      if (!nickname) {
        return message.reply('Lütfen yeni takma adı belirtin!');
      }
  
      await member.setNickname(nickname);
      message.reply(`${member.user.tag} kullanıcısının takma adı başarıyla değiştirildi!`);
    },
  };  