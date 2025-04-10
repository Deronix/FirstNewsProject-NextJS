"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import newsData from "../Data/NewsData"; // Assuming you have a JSON file with your data

// Temporary in-memory storage until you add backend
let persistentNewsData = [
  // Paste your full newsData array here

  {
    id: "haber1",
    ana_baslik: "Yeni Nesil Katı Hal Bataryalı Elektrikli Araba Motoru",
    kisa_tanitim:
      "800km menzil ve 10 dakikada %80 şarj kapasitesi ile devrim yaratıyor.",
    resim1: "/img/elektrikli-motor1.jpg",
    resim2: "/img/elektrikli-motor2.jpg",
    resim3: "/img/elektrikli-motor3.jpg",
    baslik1: "Teknik Özellikler",
    baslik2: "Çevresel Etki",
    baslik3: "Şarj Altyapısı",
    paragraf1: [
      "Silikon anotlu katı hal batarya teknolojisi (150 kWh enerji kapasitesi).",
      "Dual motor konfigürasyonu ile 612 bg güç ve 940 Nm tork.",
      "Termal yönetim sistemi ile -30°C ile +60°C arası performans stabilitesi.",
    ],
    paragraf2: [
      "Well-to-Wheel analizine göre %100 karbonsuz operasyon.",
      "Geri dönüştürülebilir batarya hücreleri ile sıfır atık hedefi.",
      "Güneş enerjili üretim tesislerinde %100 yenilenebilir enerji ile üretim.",
    ],
    paragraf3: [
      "350 kW ultra hızlı şarj desteği ile 10 dakikada 650km menzil.",
      "Avrupa Birliği CCS2 ve Tesla NACS şarj standartları uyumluluğu.",
      "Akıllı şebeke entegrasyonu ile V2G (Vehicle-to-Grid) teknolojisi.",
    ],
    not1: ["2024 Q3: UN ECE R136 elektrikli araç sertifikasyonu alındı."],
    not2: ["2025 Q1: Avrupa ve Asya pazarına simultane lansman planı."],
    link: "https://www.donanimhaber.com/1000-km-menzil-sunan-kati-hal-bataryali-otomobil-geliyor--175687",
    sponsor_baslik: "Teknoloji Partneri",
    sponsor_icerik: "/img/elektrik-sponsor.jpg",
    sponsor_link: "https://tezcanelektrik.com.tr/",
  },
  {
    id: "haber2",
    ana_baslik: "Yeni Nesil Nöromorfik İşlemcili AI Modeli",
    kisa_tanitim:
      "1 exaFLOP işlem gücü ve insan beyni benzeri enerji verimliliği ile yapay zekada yeni bir çağ.",
    resim1: "/img/ai-model1.jpg",
    resim2: "/img/ai-model2.jpg",
    resim3: "/img/ai-model3.jpg",
    baslik1: "Teknik Özellikler",
    baslik2: "Performans Benchmarkları",
    baslik3: "Endüstriyel Uygulamalar",
    paragraf1: [
      "3D çiplet tasarımı ile 5nm neuromorphic processing unit (1.2 milyon nöron eşdeğeri)",
      "48 TB/s bellek bant genişliği ve fotoniğe dayalı veri iletişim kanalları",
      "Sıvı soğutmalı sistemle 8W/teraFLOP enerji verimliliği",
    ],
    paragraf2: [
      "MLPerf v3.1 testlerinde %98.7 doğrulukla rekor kırılış",
      "Gerçek zamanlı çoklu-modal veri işlemede 23x hız artışı",
      "32-bit floating point precision ile bilimsel simülasyon uyumluluğu",
    ],
    paragraf3: [
      "Otonom araçlarda 360° çevre algılama için sensör füzyon optimizasyonu",
      "Tıbbi tanı sistemlerinde radyoloji veri analizi için FDA onaylı API",
      "Akıllı şehirlerde trafik optimizasyonu için gerçek zamanlı şehir simülasyonu",
    ],
    not1: ["2024 Q3: ISO 26262 fonksiyonel güvenlik sertifikası alındı"],
    not2: ["2025 Q1: Global bulut entegrasyonu ile lansman planı"],
    link: "https://thinktech.stm.com.tr/uploads/docs/1608992642_stm-noromorfik-islem-teknolojisi-son.pdf",
    sponsor_baslik: "Altyapı Partneri",
    sponsor_icerik: "/img/ai-sponsor.jpg",
    sponsor_link: "https://neurotechai.eu/",
  },
  {
    id: "haber3",
    ana_baslik: "Kuantum Şifreleme Destekli Global İletişim Ağı",
    kisa_tanitim:
      "Saniyede 1 milyon kuantum anahtar değişimi ile kırılamaz güvenlik standardı.",
    resim1: "/img/kuantum-ag1.jpg",
    resim2: "/img/kuantum-ag2.jpg",
    resim3: "/img/kuantum-ag3.jpg",
    baslik1: "Teknolojik Altyapı",
    baslik2: "Güvenlik Performansı",
    baslik3: "Endüstriyel Entegrasyon",
    paragraf1: [
      "Uydu-tabanlı kuantum anahtar dağıtımı (QKD) ile 128-bit AES şifreleme",
      "Fotonik kuantum rastgele sayı üreteci (QRNG) entegrasyonlu çipleri",
      "-273°C'de stabil çalışan süper iletken kuantum transceiver modülleri",
    ],
    paragraf2: [
      "NSA Tier 5 kripto analiz testlerinde %100 direnç gösterdi",
      "1 nanosaniyede kuantum dolanıklık tabanlı kimlik doğrulama",
      "Kuantum sonrası algoritmalara karşı NIST Tier-4 uyumluluk",
    ],
    paragraf3: [
      "Merkez bankaları için kuantum para transfer protokolü geliştirme",
      "5G/6G şebekelerinde gerçek zamanlı veri sızıntısı önleme",
      "IoT cihazları için mikro kuantum şifreleme modülleri (5x5mm)",
    ],
    not1: ["2024 Q4: ITU-T X.1905 kuantum iletişim standardı onayı alındı"],
    not2: ["2025 Q2: 56 ülkede paralel altyapı kurulumu başlıyor"],
    link: "https://www.editverse.com/tr/s%C3%BCrd%C3%BCr%C3%BClebilir-tar%C4%B1m-dikey-tar%C4%B1m/",
    sponsor_baslik: "Araştırma Partneri",
    sponsor_icerik: "/img/kuantum-sponsor.jpg",
    sponsor_link: "https://www.quantum-intl.com/",
  },
  {
    id: "haber4",
    ana_baslik: "Yapay Zeka Destekli Biyonik Organ Üretim Sistemi",
    kisa_tanitim:
      "Hastaya özel 3D biyobaskı ile %97 doku uyumluluğu sağlayan canlı organ replikasyonu.",
    resim1: "/img/biyonik-organ1.jpg",
    resim2: "/img/biyonik-organ2.jpg",
    resim3: "/img/biyonik-organ3.jpg",
    baslik1: "Biyoteknolojik Yenilikler",
    baslik2: "Klinik Başarılar",
    baslik3: "Global Dağıtım Ağı",
    paragraf1: [
      "Hücresel seviyede kişiselleştirilmiş organ tasarımı için nöral ağ tabanlı biyosimülatör.",
      "Çok-nozullu 3D biyoyazıcı ile 200μm çözünürlükte damar ağı baskı kapasitesi.",
      "Kendi kendini organize eden hücre iskelesi teknolojisi ile 21 günde fonksiyonel organ olgunlaştırma.",
    ],
    paragraf2: [
      "FDA onaylı klinik denemelerde böbrek replasmanında %99.3 başarı oranı.",
      "Kronik reddetme vakalarını %0.4'e düşüren antijen filtreleme membranı.",
      "Hayvan testlerinde tam fonksiyonel karaciğer replikasyonu başarısı.",
    ],
    paragraf3: [
      "Kriyojenik taşıma sistemleri ile -150°C'de 6 aya kadar organ saklama.",
      "WHO standartlarında 56 ülkede acil organ erişim ağı kurulumu.",
      "Yapay organ bankaları için blockchain tabanlı tedarik zinciri yönetimi.",
    ],
    not1: [
      "2024 Q4: Avrupa Medikal Cihaz Regülasyonu (MDR) sertifikasyonu alındı.",
    ],
    not2: ["2025 Q3: ABD ve Asya'da 25 biyobaskı merkezi açılış planı."],
    link: "https://thinktech.stm.com.tr/tr/suni-uzuvlarin-gelecegi",
    sponsor_baslik: "Bilimsel İş Birliği",
    sponsor_icerik: "/img/medikal-sponsor.jpg",
    sponsor_link: "https://shop.nanografi.com.tr/",
  },
  {
    id: "haber5",
    ana_baslik:
      "https://e-dergi.tubitak.gov.tr/edergi/yazi.pdf?dergiKodu=4&cilt=34&sayi=399&sayfa=76&yaziid=12704",
    kisa_tanitim:
      "10 MW net enerji üretimi ve 150 milyon °C plazma sıcaklığı ile temiz enerji devrimi.",
    resim1: "/img/fusion-reaktor1.jpg",
    resim2: "/img/fusion-reaktor2.jpg",
    resim3: "/img/fusion-reaktor3.jpg",
    baslik1: "Teknik Özellikler",
    baslik2: "Enerji Verimliliği",
    baslik3: "Küresel Yayılım",
    paragraf1: [
      "Yüksek sıcaklık süperiletken mıknatıslarla 5 Tesla manyetik alan yoğunluğu",
      "Lityum titanyat trityum üretim katmanı ile kendi kendine yeten yakıt döngüsü",
      "Grafen kaplama plazma odası ile 20 yıl kesintisiz operasyon ömrü",
    ],
    paragraf2: [
      "Input/Output oranı 1:15 ile tarihte ilk pozitif enerji dengesi",
      "Karbon ayak izi fosil yakıtlara göre 1/10.000 seviyesinde",
      "Atık olarak sadece helyum ve düşük radyoaktiviteli çelik üretimi",
    ],
    paragraf3: [
      "20 metrekare modüler tasarım ile kentsel alanlara entegrasyon",
      "2027'ye kadar 40 ülkede 500 reaktör kurulum hedefi",
      "Gelişmekte olan ülkelere mikro şebeke entegrasyon desteği",
    ],
    not1: [
      "2025 Q1: IAEA Füzyon Güvenlik Protokolü Tier-4 sertifikasyonu alındı",
    ],
    not2: ["2026 Q2: İlk ticari füzyon enerjisi şebeke bağlantısı planı"],
    link: "https://e-dergi.tubitak.gov.tr/edergi/yazi.pdf?dergiKodu=4&cilt=34&sayi=399&sayfa=76&yaziid=12704",
    sponsor_baslik: "Enerji Partneri",
    sponsor_icerik: "/img/fusion-sponsor.jpg",
    sponsor_link: "https://www.birbucukderece.com/",
  },
  {
    id: "haber6",
    ana_baslik: "Karbon Nanotüp Tabanlı Uzay Asansörü Prototipi",
    kisa_tanitim:
      "Dünya yörüngesine 36.000 km'de %99.999 saflıkta grafen kablolarla maliyeti 200 kat düşüren uzay erişimi.",
    resim1: "/img/uzay-asansor1.jpg",
    resim2: "/img/uzay-asansor2.jpg",
    resim3: "/img/uzay-asansor3.jpg",
    baslik1: "Mühendislik Devrimi",
    baslik2: "Ekonomik ve Ekolojik Etki",
    baslik3: "Küresel Uzay Projeleri",
    paragraf1: [
      "Mikro meteorit dirençli karbon allotrop kompozit kablolar (1 cm²'de 63 GPa çekme dayanımı)",
      "Jeostatik yörüngeye manyetik hızlandırıcılı kendi kendini inşa eden platform",
      "Güneş enerjili robotik tırmanıcılar ile 7 günde tam yüksekliğe ulaşım",
    ],
    paragraf2: [
      "Kilo başına uzay taşıma maliyetini $500'dan $2.5'a düşürme",
      "Roket fırlatmalarının neden olduğu stratosferik kirliliği %89 azaltma",
      "Geri dönüştürülebilir malzemelerle sıfır atık üretim protokolü",
    ],
    paragraf3: [
      "Uluslararası Uzay İstasyonu'na direkt kargo hattı kurulumu",
      "Ay madenciliği için lunar varyant tasarım çalışmaları",
      "Gelişmekte olan 12 ülkeye düşük maliyetli nano uydu fırlatma hizmeti",
    ],
    not1: [
      "2025 Q2: ICAO Annex 17 Uzay Güvenlik Standardı sertifikasyonu tamamlandı",
    ],
    not2: [
      "2027 Q4: Ekvator hattında ilk operasyonel tesisin inşasına başlanacak",
    ],
    link: "https://shop.nanografi.com.tr/blografi/uzaya-acilan-kapi-uzay-asansoru/",
    sponsor_baslik: "Uzay Araştırmaları Partneri",
    sponsor_icerik: "/img/uzay-sponsor.jpg",
    sponsor_link: "https://nanoteknoloji.org/",
  },

  // Add other 5 news items here
];

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localNewsData, setLocalNewsData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("newsData");
      return savedData ? JSON.parse(savedData) : persistentNewsData;
    }
    return persistentNewsData;
  });
  // Add handleLogin function here
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Xero" && password === "X2048Z") {
      setAuthenticated(true);
    }
  };
  useEffect(() => {
    // Load from localStorage on initial mount
    if (typeof window !== "undefined" && localNewsData.length === 0) {
      const savedData = localStorage.getItem("newsData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setLocalNewsData(parsedData);

        // If we're editing an item, update the editedData with fresh data
        if (selectedNews) {
          const foundItem = parsedData.find((item) => item.id === selectedNews);
          setEditedData(foundItem || null);
        }
      }
    }

    // Existing logic for updating editedData
    if (selectedNews) {
      const foundItem = localNewsData.find((item) => item.id === selectedNews);
      setEditedData(foundItem || null);
    }
  }, [selectedNews, localNewsData]);

  // Rest of your functions (handleArrayChange, addArrayItem, etc.)
  const handleArrayChange = (section, index, value) => {
    if (!editedData || !editedData[section]) return;
    const updatedArray = [...editedData[section]];
    updatedArray[index] = value;
    setEditedData({ ...editedData, [section]: updatedArray });
  };

  const addArrayItem = (section) => {
    if (!editedData || !editedData[section]) return;
    setEditedData({
      ...editedData,
      [section]: [...editedData[section], ""],
    });
  };
  const handleImageUpload = async (field) => {
    if (!imageFile) return;

    // In a real app, upload to cloud storage and get URL
    const fakeUrl = URL.createObjectURL(imageFile);

    setEditedData((prev) => ({
      ...prev,
      [field]: fakeUrl,
    }));
    setImageFile(null);
  };

  const handleSave = () => {
    const updatedData = localNewsData.map((item) =>
      item.id === editedData.id ? editedData : item
    );
    // Update both state and storage
    setLocalNewsData(updatedData);

    if (typeof window !== "undefined") {
      localStorage.setItem("newsData", JSON.stringify(updatedData));
    }

    alert("Değişiklikler kalıcı olarak kaydedildi!");
  };

  // Add these enhancements
  const renderEditableList = (section) => (
    <div className={styles.formSection}>
      <label className={styles.sectionLabel}>{section}:</label>
      {editedData[section]?.map((item, index) => (
        <div key={index} className={styles.arrayItem}>
          <textarea
            value={item}
            onChange={(e) => handleArrayChange(section, index, e.target.value)}
          />
          <button
            className={styles.removeButton}
            onClick={() => removeArrayItem(section, index)}
          >
            X
          </button>
        </div>
      ))}
      <button
        className={styles.addButton}
        onClick={() => addArrayItem(section)}
      >
        Madde Ekle
      </button>
    </div>
  );

  if (!authenticated) {
    return (
      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h2 className={styles.loginHeading}>Admin Girişi</h2>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Kullanıcı Adı:</label>
            <input
              type="text"
              className={styles.formInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Şifre:</label>
            <input
              type="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {!selectedNews ? (
        <div className={styles.newsList}>
          <h2 className={styles.adminTitle}>
            Haberleri Yönet ({localNewsData.length} Makale)
          </h2>
          <div className={styles.newsGrid}>
            {localNewsData.map((news) => (
              <div
                key={news.id}
                className={styles.newsCard}
                onClick={() => setSelectedNews(news.id)}
              >
                <div className={styles.newsThumbnail}>
                  <img src={news.resim1} alt="Thumbnail" />
                </div>
                <h3>{news.ana_baslik}</h3>
                <p>{news.kisa_tanitim}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.editContainer}>
          <div className={styles.editHeader}>
            <div className={styles.space}></div>

            <button
              className={styles.backButton}
              onClick={() => setSelectedNews(null)}
            >
              &larr; Listeye Dön
            </button>
            <h2>Haber Düzenle: {editedData?.ana_baslik}</h2>
            <div className={styles.spacesmall}></div>
          </div>

          {editedData && (
            <div className={styles.editContent}>
              {/* Basic Info Section */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>Temel Bilgiler</label>
                <input
                  type="text"
                  className={styles.sectionInput}
                  value={editedData.ana_baslik}
                  onChange={(e) =>
                    setEditedData({ ...editedData, ana_baslik: e.target.value })
                  }
                  placeholder="Ana Başlık"
                />
                <textarea
                  className={styles.sectionTextarea}
                  value={editedData.kisa_tanitim}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      kisa_tanitim: e.target.value,
                    })
                  }
                  placeholder="Kısa Tanıtım"
                  rows="3"
                />
              </div>

              {/* Image Management Section */}
              {["resim1", "resim2", "resim3"].map((imgField) => (
                <div key={imgField} className={styles.formSection}>
                  <label className={styles.sectionLabel}>
                    {imgField.toUpperCase()}
                  </label>
                  <div className={styles.imageUpload}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <button
                      className={styles.uploadButton}
                      onClick={() => handleImageUpload(imgField)}
                    >
                      Yükle
                    </button>
                  </div>
                  <input
                    type="text"
                    className={styles.sectionInput}
                    value={editedData[imgField]}
                    onChange={(e) =>
                      handleImageChange(imgField, e.target.value)
                    }
                    placeholder="Resim URL'si"
                  />
                  <div className={styles.imagePreview}>
                    {editedData[imgField] && (
                      <img src={editedData[imgField]} alt="Preview" />
                    )}
                  </div>
                </div>
              ))}

              {/* Content Sections */}
              {[1, 2, 3].map((sectionNum) => (
                <div key={sectionNum} className={styles.formSection}>
                  <label className={styles.sectionLabel}>
                    Bölüm {sectionNum}
                  </label>
                  <input
                    type="text"
                    className={styles.sectionInput}
                    value={editedData[`baslik${sectionNum}`]}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        [`baslik${sectionNum}`]: e.target.value,
                      })
                    }
                    placeholder={`Başlık ${sectionNum}`}
                  />
                  {renderEditableList(`paragraf${sectionNum}`)}
                </div>
              ))}

              {/* Additional Fields */}
              <div className={styles.formSection}>
                <label className={styles.sectionLabel}>Ek Bilgiler</label>
                {renderEditableList("not1")}
                {renderEditableList("not2")}
                <input
                  type="text"
                  className={styles.sectionInput}
                  value={editedData.link}
                  onChange={(e) =>
                    setEditedData({ ...editedData, link: e.target.value })
                  }
                  placeholder="Haber Linki"
                />
              </div>

              <button className={styles.saveButton} onClick={handleSave}>
                Değişiklikleri Kaydet
              </button>
              <div className={styles.spacesmall}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
