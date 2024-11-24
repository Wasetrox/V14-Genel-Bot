module.exports = {
  name: 'joke',
  description: 'Rastgele bir şaka gönderir.',
  category: 'fun',
  async execute(message, args) {
      try {
          // node-fetch modülünü dinamik olarak içe aktar
          const fetch = (await import('node-fetch')).default;

          // Random Joke API'den şaka almak için fetch kullanılıyor
          const response = await fetch('https://official-joke-api.appspot.com/random_joke');
          const data = await response.json();

          // Şaka mesajını gönder
          message.channel.send(`${data.setup}\n${data.punchline}`);
      } catch (error) {
          console.error('Bir hata oluştu:', error);
          message.reply('Şaka alırken bir sorun oluştu.');
      }
  }
};