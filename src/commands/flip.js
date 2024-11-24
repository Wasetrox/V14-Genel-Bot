// src/commands/flip.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'flip',
  description: 'Para atma oyunu oynar. Kazanırsan para kazanırsın, kaybedersen para kaybedersin.',
  category: 'economy',
  async execute(message, args) {
    const userId = message.author.id;
    const dataPath = path.join(__dirname, '../db/economydb.json');
    const levelPath = path.join(__dirname, '../db/level.json');

    // Veritabanı dosyasını kontrol et
    const economyData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const levelData = JSON.parse(fs.readFileSync(levelPath, 'utf8'));

    // Kullanıcı bakiyesi yoksa oluştur
    if (!economyData[userId]) {
      economyData[userId] = { balance: 0 };
    }

    if (!levelData[userId]) {
      levelData[userId] = { xp: 0, level: 1 };
    }

    // Yatırılacak miktarı al
    const betAmount = parseInt(args[0]);

    if (isNaN(betAmount) || betAmount <= 0) {
      return message.reply('Geçerli bir para miktarı girin.');
    }

    if (economyData[userId].balance < betAmount) {
      return message.reply('Cüzdanınızda yeterli para yok.');
    }

    // Para atma sonucu (Yazı veya Tura)
    const result = Math.random() < 0.5 ? 'Tura' : 'Yazı';
    const userChoice = args[1] ? args[1].toLowerCase() : null;

    if (userChoice && userChoice !== 'yazı' && userChoice !== 'tura') {
      return message.reply('Geçerli bir seçim yapın: Yazı veya Tura.');
    }

    // Sonuç kazanma veya kaybetme
    let messageText = '';
    if (userChoice && userChoice === result.toLowerCase()) {
      economyData[userId].balance += betAmount;
      levelData[userId].xp += 10; // XP kazancı
      messageText = `Kazandınız! Sonuç: ${result}. Yeni bakiyeniz: ${economyData[userId].balance}. XP: ${levelData[userId].xp}`;
    } else if (userChoice) {
      economyData[userId].balance -= betAmount;
      levelData[userId].xp += 5; // XP kazancı
      messageText = `Kaybettiniz! Sonuç: ${result}. Yeni bakiyeniz: ${economyData[userId].balance}. XP: ${levelData[userId].xp}`;
    } else {
      messageText = `Sonuç: ${result}.`;
    }

    // Veritabanını güncelle
    fs.writeFileSync(dataPath, JSON.stringify(economyData, null, 2));
    fs.writeFileSync(levelPath, JSON.stringify(levelData, null, 2));

    message.reply(messageText);
  },
};
