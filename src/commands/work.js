// src/commands/work.js
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'work',
  description: 'Çalışarak para kazanırsınız.',
  category: 'economy',
  async execute(message, args) {
    const userId = message.author.id;
    const dataPath = path.join(__dirname, '../db/economydb.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    if (!data[userId]) {
      data[userId] = { balance: 0 };
    }

    const earnedAmount = Math.floor(Math.random() * 100) + 1; // 1 ile 100 arası rastgele miktar
    data[userId].balance += earnedAmount;
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    message.reply(`Başarıyla çalıştınız ve ${earnedAmount} para kazandınız! Yeni bakiyeniz: ${data[userId].balance}`);
  },
};