module.exports = {
  name: 'meme',
  description: 'Rastgele bir meme gönderir.',
  category: 'fun',
  async execute(message, args) {
      try {
          // node-fetch modülünü dinamik olarak içe aktar
          const fetch = (await import('node-fetch')).default;

          // Meme API'den rastgele bir meme almak için fetch kullanılıyor
          const response = await fetch('https://meme-api.com/gimme');
          const data = await response.json();

          // Meme URL'sini mesaj olarak gönder
          message.channel.send(data.url);
      } catch (error) {
          console.error('Bir hata oluştu:', error);
          message.reply('Meme yüklenirken bir hata oluştu.');
      }
  }
};
