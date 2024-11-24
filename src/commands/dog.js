module.exports = {
    name: 'dog',
    description: 'Rastgele bir köpek resmi gönderir.',
    category: 'fun',
    async execute(message, args) {
        try {
            // node-fetch modülünü dinamik olarak içe aktar
            const fetch = (await import('node-fetch')).default;

            // Random Dog API'den resim almak için fetch kullanılıyor
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            // Köpek resmini mesaj olarak gönder
            message.channel.send(data.message);
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            message.reply('Köpek resmi alırken bir sorun oluştu.');
        }
    }
};
