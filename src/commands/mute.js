// src/commands/mute.js
module.exports = {
    name: 'mute',
    description: 'Bir kullanıcıyı susturur.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Lütfen susturulacak kullanıcıyı etiketleyin!');
      }
  
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (!muteRole) {
        return message.reply('Sunucuda "Muted" rolü bulunamadı!');
      }
  
      await member.roles.add(muteRole);
      message.reply(`${member.user.tag} artık susturuldu!`);
    },
  };  