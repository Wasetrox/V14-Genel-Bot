module.exports = (client) => {
    console.log(`${client.user.tag} botu giriş yaptı!`);

    // Botun durumunu "idle" olarak ayarla
    client.user.setPresence({
        status: 'idle', // "idle", "dnd", "online" veya "invisible"
        activities: [{
            name: 'Discord.js ile yapıldı!',
            type: 'PLAYING',
        }],
    });

    // Oynuyor durumunu 5 saniyede bir değiştirecek mesajlar dizisi
    const activities = [
        "Discord.js ile yapıldı!",
        "Oynamayı seviyorum!",
        "Sizinle sohbet ediyorum!",
        "Botu yönetiyorum!",
        "Yardım edebilirim!",
    ];

    let i = 0;
    setInterval(() => {
        client.user.setPresence({
            status: 'idle', // Burada 'idle' durumu kullanılacak
            activities: [{
                name: activities[i % activities.length],
                type: 'PLAYING',
            }],
        });
        i++;
    }, 5000); // 5 saniye
};
