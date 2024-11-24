// src/commands/sendmoney.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'sendmoney',
  description: 'Bir kullanıcıya para gönderir.',
  category: 'economy',
  async execute(message, args) {
    const userId = message.author.id;
    const recipientId = args[0].replace(/[<@!>]/g, ''); // Alıcı ID'si
    const amount = parseInt(args[1]);
    const dataPath = path.join(__dirname, '../db/economydb.json');
    
    // Geçerli bir miktar girilip girilmediğini kontrol et
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Geçerli bir para miktarı girin.');
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Gönderen kullanıcının bakiyesini kontrol et
    if (!data[userId]) {
      return message.reply('Cüzdanınızda yeterli para yok.');
    }

    if (data[userId].balance < amount) {
      return message.reply('Cüzdanınızda yeterli bakiye bulunmuyor.');
    }

    // Alıcıyı kontrol et
    if (!data[recipientId]) {
      data[recipientId] = { balance: 0 };
    }

    // Parayı transfer et
    data[userId].balance -= amount;
    data[recipientId].balance += amount;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    message.reply(`${amount} para başarıyla ${recipientId} kullanıcısına gönderildi. Yeni bakiyeniz: ${data[userId].balance}`);
  },
};