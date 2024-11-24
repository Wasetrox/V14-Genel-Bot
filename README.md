```markdown
## Özellikler

- **Moderasyon Komutları**: Sunucu yönetimi için komutlar (ban, kick, mute, rol yönetimi vb.)
- **Eğlence Komutları**: Kullanıcılar için eğlenceli komutlar (rastgele kedi ve köpek resimleri, yazı-tura oyunu vb.)
- **Ekonomi Sistemi**: Kullanıcıların sanal para kazandığı ve harcadığı ekonomi sistemi (cüzdan komutu, para transferi vb.)
- **Level Sistemi**: Kullanıcılar sohbet ederek seviyelerini yükseltebilir, deneyim puanı kazanabilirler.
- **Otomasyon Sistemi**: Otomatik mesajlar, rol yönetimi, özel komutlar ve daha fazlası.

## Başlangıç

Bu botu kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler

- [Node.js](https://nodejs.org/) (v16.x veya daha yüksek)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- Bir Discord bot token'ı (Discord Developer Portal'dan alabilirsiniz)

### Kurulum

1. **Proje Dizinine Git**:
   ```bash
   cd discord-bot
   ```

2. **Gerekli Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **`config.json` Dsyasını Düzenleyin**:
   - Bot token'ınızı **`DISCORD_TOKEN`** olarak `.env` dosyasına ekleyin.
   ```text
      {
        "token": "BOT_TOKEN",
        "sesId": "BOTUN_GIRECEGI_SES",
        "sunucuId": "SUNUCUNUZUN_IDSI"
      }
   ```

4. **Botu Başlatın**:
   ```bash
   npm start
   ```

### Botu Çalıştırma

Botu başlattığınızda, bot Discord sunucunuzda aktif olacak ve komutlara yanıt verecektir.

## Komutlar

Bot, aşağıdaki komutları sunmaktadır:

### Moderasyon Komutları

- **!kick @kullanıcı**: Belirtilen kullanıcıyı sunucudan atar.
- **!ban @kullanıcı**: Belirtilen kullanıcıyı sunucudan yasaklar.
- **!mute @kullanıcı**: Belirtilen kullanıcıyı susturur.
- **!unmute @kullanıcı**: Susturulmuş bir kullanıcıyı tekrar konuşmaya açar.
- **!clear <miktar>**: Belirtilen miktarda mesajı siler.

### Eğlence Komutları

- **!cat**: Rastgele bir kedi resmi gönderir.
- **!dog**: Rastgele bir köpek resmi gönderir.
- **!flip**: Yazı-tura atma oyunu oynar.
- **!coinflip**: Yazı veya tura atma komutu.

### Ekonomi Komutları

- **!cüzdan**: Kullanıcının mevcut bakiyesini gösterir.
- **!transfer <kullanıcı> <miktar>**: Belirtilen kullanıcıya para gönderir.
- **!work**: Günlük iş komutu ile para kazanmanızı sağlar.
- **!balance**: Kullanıcının mevcut ekonomik durumunu gösterir.

### Level Sistemi

- **!level**: Kullanıcının mevcut seviyesini ve deneyim puanını gösterir.

## Katkı

Bu projeye katkıda bulunmak isterseniz aşağıdaki adımları takip edebilirsiniz:

1. Bu repo'yu **fork**'layın.
2. Yeni bir **feature branch** oluşturun (`git checkout -b feature-branch`).
3. Yaptığınız değişiklikleri **commit**'leyin (`git commit -am 'Yeni özellik ekledim'`).
4. Değişikliklerinizi **push**'layın (`git push origin feature-branch`).
5. **Pull Request** gönderin.

## Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır.

# Contact & Support
[![Discord Banner](https://api.weblutions.com/discord/invite/novadev/)](https://discord.gg/novadev)

## Yapımcı

**Discord Bot** - Geliştirici: [Wasetrox](https://github.com/Wasetrox)
```
