// src/events/interactionCreate.js
module.exports = async (client, interaction) => {
    // Select menu etkileşimi işlemi
    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'help_menu') {
            const category = interaction.values[0];

            let commandsList = '';
            const commands = client.categories.get(category);

            // Kategoriye ait komutları sıralıyoruz
            commands.forEach(command => {
                commandsList += `\`${command.name}\` - ${command.description}\n`;
            });

            // Seçilen kategoriye göre komutları göster
            await interaction.reply({
                content: `**${category.charAt(0).toUpperCase() + category.slice(1)} Komutları**:\n${commandsList}`,
                ephemeral: true, // Yalnızca etkileşimi yapan kullanıcıya gösterir
            });
        }
    }

    // Buton etkileşimi işlemi
    if (interaction.isButton()) {
        if (interaction.customId === 'giveRoleButton') {
            // Mesajdaki rol bilgilerini footer'dan alıyoruz
            const roleId = interaction.message.embeds[0]?.footer?.text; // Rol ID'si footer'dan alındı
            if (!roleId) {
                return interaction.reply({
                    content: 'Rol bilgisi bulunamadı!',
                    ephemeral: true
                });
            }

            const role = interaction.guild.roles.cache.get(roleId); // Rolü ID ile alıyoruz
            const member = interaction.member;

            if (!role) {
                return interaction.reply({
                    content: 'Bu rol bulunamadı!',
                    ephemeral: true
                });
            }

            // Kullanıcıda rol olup olmadığını kontrol et
            if (member.roles.cache.has(role.id)) {
                // Rolü geri al
                try {
                    await member.roles.remove(role);
                    await interaction.reply({
                        content: `Rolünüz başarıyla geri alındı, ${member.user.tag}!`,
                        ephemeral: true // Yalnızca tıklayan kişiye yanıt gönder
                    });
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        content: 'Rol geri alınırken bir hata oluştu!',
                        ephemeral: true
                    });
                }
            } else {
                // Kullanıcıda rol yoksa, rolü ver
                try {
                    await member.roles.add(role);
                    await interaction.reply({
                        content: `Rolünüz başarıyla verildi, ${member.user.tag}!`,
                        ephemeral: true // Yalnızca tıklayan kişiye yanıt gönder
                    });
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        content: 'Rol eklenirken bir hata oluştu!',
                        ephemeral: true
                    });
                }
            }
        }
    }
};
