module.exports = {
    name: 'cat',
    description: 'Rastgele bir kedi resmi gönderir.',
    category: 'fun',
    async execute(message, args) {
        try {
            // node-fetch modülünü dinamik olarak içe aktar
            const fetch = (await import('node-fetch')).default;

            // Random cat API'den resim almak için fetch kullanılıyor
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();

            // Cat resmini mesaj olarak gönder
            message.channel.send(data[0].url);
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            message.reply('Kedi resmi alırken bir sorun oluştu.');
        }
    }
};
