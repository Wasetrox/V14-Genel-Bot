// src/commands/wallet.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'wallet',
  description: 'Kullanıcının cüzdan bakiyesini gösterir.',
  category: 'economy',
  async execute(message, args) {
    const userId = message.author.id;
    const dataPath = path.join(__dirname, '../db/economydb.json');
    
    // Veritabanı dosyasını kontrol et
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Kullanıcı verisi yoksa oluştur
    if (!data[userId]) {
      data[userId] = { balance: 0 };
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      return message.reply('Cüzdanınız oluşturulmadı. Başlangıç bakiyesi: 0');
    }

    // Kullanıcının bakiyesini göster
    const balance = data[userId].balance;
    message.reply(`Cüzdanınızda ${balance} para bulunuyor.`);
  },
};