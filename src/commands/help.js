const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Yardım menüsünü gösterir.',
  async execute(message) {
    // Kategoriler mevcut mu kontrol et
    const categories = message.client.categories;
    if (!categories || categories.size === 0) {
      return message.reply('Kategoriler şu an mevcut değil.');
    }

    // Yardım menüsünün seçeneklerini oluştur
    const menu = new StringSelectMenuBuilder()
      .setCustomId('help_menu')
      .setPlaceholder('Bir kategori seçin!');

    // Kategorileri dinamik olarak ekle
    categories.forEach((commands, category) => {
      if (category && typeof category === 'string') {
        menu.addOptions({
          label: category.charAt(0).toUpperCase() + category.slice(1), // Kategoriyi büyük harfle başlatıyoruz
          description: `${commands.length} komut içeriyor`,
          value: category,
        });
      }
    });

    // Menüyü mesaj olarak gönder
    const row = new ActionRowBuilder().addComponents(menu);

    await message.reply({
      content: 'Lütfen bir kategori seçin:',
      components: [row],
    });
  },
};
