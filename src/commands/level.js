// src/commands/level.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'level',
  description: 'Kendi seviyenizi ve XP\'nizi gösterir.',
  category: 'fun',
  async execute(message, args) {
    const userId = message.author.id;
    const dataPath = path.join(__dirname, '../db/level.json');

    // Veritabanı dosyasını kontrol et
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Kullanıcı verisi yoksa oluştur
    if (!data[userId]) {
      data[userId] = { xp: 0, level: 1 };
    }

    // Kullanıcının seviyesini ve XP'sini al
    const xp = data[userId].xp;
    const level = data[userId].level;

    // Mesajı gönder
    message.reply(`Seviyeniz: ${level}\nXP: ${xp}`);
  },
};