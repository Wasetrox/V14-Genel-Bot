const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'butonrol',
    description: 'Belirtilen rolü bir butonla kullanıcılara verir.',
    category: 'moderation',
    async execute(message, args) {
        // Kullanıcının rolü yönetme izni olup olmadığını kontrol et
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanma izniniz yok!');
        }

        // Rol etiketinin kontrolü
        const role = message.mentions.roles.first(); // İlk etiketlenen rol
        if (!role) {
            return message.reply('Lütfen bir rol etiketleyin!');
        }

        // Buton oluşturma
        const button = new ButtonBuilder()
            .setCustomId('giveRoleButton') // Butonun özel ID'si
            .setLabel(`Rolü Al`) // Buton üzerindeki yazı
            .setStyle(ButtonStyle.Primary); // Buton rengi (Primary: mavi)

        // Butonun yerleştirileceği satır
        const row = new ActionRowBuilder().addComponents(button);

        // Kullanıcıya mesaj gönderme
        await message.reply({
            content: `Aşağıdaki butona tıklayarak \`${role.name}\` rolünü alabilirsiniz!`,
            components: [row],
            // Rol bilgisini meta veri olarak ekleyelim
            embeds: [{
                description: `Rol: ${role.name}`,
                footer: {
                    text: role.id // Rol ID'sini footer'a ekliyoruz
                }
            }]
        });
    },
};
