// src/commands/tempban.js
module.exports = {
    name: 'tempban',
    description: 'Bir kullanıcıyı geçici olarak yasaklar.',
    category: 'moderation',
    async execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('Bunu yapma izniniz yok!');
      }
  
      const member = message.mentions.members.first();
      const time = parseInt(args[1]);
      if (!member || !time) {
        return message.reply('Lütfen geçici yasaklama için bir kullanıcı ve süre belirtin!');
      }
  
      await member.ban();
      message.reply(`${member.user.tag} kullanıcısı ${time} dakika boyunca yasaklandı!`);
  
      // Geçici yasaklama için bir zamanlayıcı başlatıyoruz
      setTimeout(() => {
        message.guild.members.unban(member.id);
        message.channel.send(`${member.user.tag} yasaklaması kaldırıldı!`);
      }, time * 60000); // Süreyi dakika cinsinden bekler
    },
  };  