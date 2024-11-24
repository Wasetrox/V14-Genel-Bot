const fs = require('fs');
const path = require('path');

module.exports = async (client, message) => {
  if (message.author.bot) return; // Botların mesajlarını yoksay

  const prefix = '!'; // Komut prefix'ini buraya ekleyin
  const levelPath = path.join(__dirname, '../db/level.json'); // Seviye sistemi için JSON dosyasının yolu

  // **Komut İşleme**
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Komutun var olup olmadığını kontrol et
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args); // Komutu çalıştır
    } catch (error) {
      console.error(error);
      return message.reply('Bir hata oluştu!');
    }
  }

  // **Kullanıcı XP Kazanma ve Seviye Sistemi**
  try {
    // Level veritabanını kontrol et ve oku
    let levelData;
    try {
      const rawData = fs.readFileSync(levelPath, 'utf8');
      levelData = JSON.parse(rawData);
    } catch (error) {
      // Eğer dosya mevcut değilse veya bozuksa, yeni bir nesne başlat
      console.error('Level JSON okunamadı, yeni bir dosya oluşturulacak:', error);
      levelData = {};
    }

    const userId = message.author.id;

    // Kullanıcı verisi yoksa oluştur
    if (!levelData[userId]) {
      levelData[userId] = { xp: 0, level: 1 };
    }

    // Kullanıcının XP'sini artır
    levelData[userId].xp += Math.floor(Math.random() * 10) + 5; // 5-15 arası XP kazanacak

    // Seviye atlama kontrolü
    const xp = levelData[userId].xp;
    const level = levelData[userId].level;

    // Seviye atlama: 100 XP'de bir seviye atlıyor
    if (xp >= level * 100) {
      levelData[userId].level = level + 1;
      levelData[userId].xp = 0; // Seviye atladığında XP sıfırlanabilir veya biriktirilebilir
      message.reply(`Tebrikler! Yeni seviyeye ulaştınız: ${levelData[userId].level}`);
    }

    // Güncellenen veriyi JSON dosyasına yaz
    fs.writeFileSync(levelPath, JSON.stringify(levelData, null, 2));
  } catch (error) {
    console.error('Level sistemi hatası:', error);
    message.reply('Seviye sistemi çalıştırılırken bir hata oluştu!');
  }
};
