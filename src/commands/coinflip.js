// src/commands/coinflip.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'coinflip',
  description: 'Yazı veya Tura atma komutu. Kazanırsan para kazanırsın, kaybedersen para kaybedersin.',
  category: 'economy',
  async execute(message, args) {
    const userId = message.author.id;
    const dataPath = path.join(__dirname, '../db/economydb.json');
    
    // Veritabanı dosyasını kontrol et
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Kullanıcı bakiyesi yoksa oluştur
    if (!data[userId]) {
      data[userId] = { balance: 0 };
    }

    // Yatırılacak miktarı al
    const betAmount = parseInt(args[0]);

    // Geçerli bir miktar girilip girilmediğini kontrol et
    if (isNaN(betAmount) || betAmount <= 0) {
      return message.reply('Geçerli bir para miktarı girin.');
    }

    // Kullanıcının bakiyesini kontrol et
    if (data[userId].balance < betAmount) {
      return message.reply('Cüzdanınızda yeterli para yok.');
    }

    // Coinflip sonucu (Yazı veya Tura)
    const result = Math.random() < 0.5 ? 'Yazı' : 'Tura';
    const userChoice = args[1] ? args[1].toLowerCase() : null; // Kullanıcının seçim yapıp yapmadığını kontrol et

    if (userChoice && userChoice !== 'yazı' && userChoice !== 'tura') {
      return message.reply('Geçerli bir seçim yapın: Yazı veya Tura.');
    }

    // Sonuç kazanma veya kaybetme
    let messageText = '';
    if (userChoice && userChoice === result.toLowerCase()) {
      // Kazanma durumu
      data[userId].balance += betAmount;
      messageText = `Kazandınız! Sonuç: ${result}. Yeni bakiyeniz: ${data[userId].balance}`;
    } else if (userChoice) {
      // Kaybetme durumu
      data[userId].balance -= betAmount;
      messageText = `Kaybettiniz! Sonuç: ${result}. Yeni bakiyeniz: ${data[userId].balance}`;
    } else {
      // Seçim yapılmamışsa
      messageText = `Sonuç: ${result}.`;
    }

    // Veritabanını güncelle
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    message.reply(messageText);
  },
};
