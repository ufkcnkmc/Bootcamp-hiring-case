# Product Carousel Case

Bu proje, e-bebek.com ana sayfasında bulunan ürün carousel'inin pixel perfect bir kopyasını oluşturmak için hazırlanmıştır. Proje, tüm işlevselliği tek bir JavaScript dosyası içerisinde barındırır; HTML ve CSS yapıları JavaScript aracılığıyla dinamik olarak oluşturulur.

## Özellikler

- **Sayfa Kontrolü:**  
  Kod yalnızca e-bebek.com ana sayfasında (`/` veya `/index.html`) çalışır. Farklı sayfalarda çalıştırıldığında, konsola "wrong page - Bu script sadece e-bebek.com ana sayfasında çalışır" mesajı yazılır.

- **Ürün Verilerinin Çekilmesi ve Depolanması:**  
  - Ürün listesi, verilen API URL'sinden GET isteği ile çekilir:  
    `https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json`
  - İlk çalıştırmada veriler çekildikten sonra, tekrar fetch yapılmaması için ürünler localStorage'a kaydedilir.
  

- **Fiyat ve İndirim Hesaplama:**  
  Eğer bir ürünün `price` ve `original_price` değerleri farklıysa, her iki fiyat da gösterilir ve indirim oranı hesaplanarak ekranda sunulur.

- **Responsive Tasarım:**  
  Medya sorguları kullanılarak farklı ekran boyutlarına uygun container ve ürün (carousel item) genişlikleri dinamik olarak ayarlanır.

- **Kullanıcı Etkileşimleri:**  
  - Ürünlere tıklandığında, ilgili ürün sayfası yeni sekmede açılır.
  - Carousel, sol ve sağ ok butonlarıyla gezinilebilir.

## Kurulum ve Kullanım

1. **Repository'yi Klonlayın:**

   ```bash
   git clone https://github.com/ufkcnkmc/Bootcamp-hiring-case.git
   cd Bootcamp-hiring-case
2. **e-bebek.com Ana Sayfasını Açın:**
    ```bash
    Google Chrome gibi modern bir tarayıcıda https://www.ebebek.com adresine gidin.

3. **Chrome Developer Tools'u Açın:**
    ```bash
    Tarayıcıda sağ tıklayıp "Inspect" (İncele) seçeneğini veya F12 tuşunu kullanarak geliştirici araçlarını açın.
    Console (Konsol) sekmesine geçin.

4. **Script'i Çalıştırın:**
    ```bash
    script.js dosyasının içeriğini kopyalayın ve konsola yapıştırın.
    Enter tuşuna basarak çalıştırın.    
    Carousel, "stories" bölümünden sonraki alanda otomatik olarak eklenecektir.

## Proje Yapısı ve Teknik Detaylar

- **Tek Dosya Proje:**  
  Tüm HTML, CSS ve JavaScript kodları `script.js` içerisinde yer almaktadır. Böylece proje, tek bir dosya üzerinden Chrome Developer Tools konsolunda çalıştırılabilir.

- **Dinamik Yapı Oluşturma:**  
  - JavaScript ile DOM üzerinde gerekli HTML elementleri oluşturulur ve istenilen konuma (Section1 ve Section2A arasına) eklenir.
  - CSS, dinamik olarak oluşturulan `<style>` etiketi aracılığıyla eklenir ve responsive tasarım için medya sorguları kullanılır.

- **Veri İşleme:**  
  API'den gelen JSON verisi, ürün bilgileri (id, name, brand, price, original_price, imageUrl, url vb.) olarak işlenir. Ek olarak, rastgele oluşturulan rating ve reviewCount değerleri kullanılarak örnek ürün bilgileri görüntülenir.

- **LocalStorage Kullanımı:**  
  Hem ürün verilerinin hem de favori ürünlerin durumu localStorage üzerinden yönetilir. Böylece sayfa yeniden yüklendiğinde daha önce çekilen veriler ve kullanıcı tercihleri korunur.

## Test ve Doğrulama

- Carousel'in doğru yerde (stories bölümünün sonrasında) göründüğünden emin olun.
- Ürünlere tıklayarak yeni sekmede ilgili ürün sayfalarının açıldığını test edin.
- Farklı ekran boyutlarında (mobil, tablet, masaüstü) responsive tasarımın beklendiği gibi çalıştığını doğrulayın.
- Favori (kalp) ikonuna tıkladığınızda e-bebek login sayfasına yönlendirildiğniizi test edin.

## Notlar

- Proje, yalnızca JavaScript kullanılarak geliştirilmiştir.
- Kod, sadece e-bebek.com ana sayfasında çalışacak şekilde tasarlanmıştır. Farklı sayfalarda çalıştırılırsa hiçbir işlem yapılmaz.


