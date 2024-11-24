// src/commands/addmoney.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'addmoney',
  description: 'Kullanıcının cüzdanına para ekler.',
  category: 'economy',
  async execute(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Bu komutu kullanmak için yönetici olmanız gerekir.');
    }

    const userId = args[0].replace(/[<@!>]/g, ''); // Kullanıcı ID'sini al
    const amount = parseInt(args[1]);
    const dataPath = path.join(__dirname, '../db/economydb.json');
    
    // Geçerli bir miktar girilip girilmediğini kontrol et
    if (isNaN(amount) || amount <= 0) {
      return message.reply('Geçerli bir para miktarı girin.');
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Kullanıcı verisini kontrol et
    if (!data[userId]) {
      data[userId] = { balance: 0 };
    }

    data[userId].balance += amount;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    message.reply(`${userId} kullanıcısına ${amount} para eklendi. Yeni bakiye: ${data[userId].balance}`);
  },
};