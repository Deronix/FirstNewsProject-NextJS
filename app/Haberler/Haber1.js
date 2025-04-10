import { useState } from 'react';
import styles from './Haber.module.css';

export function Haber1() {
  const [isExpanded, setIsExpanded] = useState(false);

  const haberData = {
    ana_baslik: 'Hava ile Çalışan Araba Motoru',
    kisa_tanitim: 'Yeni nesil temiz enerji teknolojisi devrim yaratıyor',
    resim1: './img/hava-motoru1.jpg',
    resim2: './img/hava-motoru2.jpg',
    resim3: './img/hava-motoru3.jpg',
    baslik1: 'Nasıl Çalışıyor?',
    baslik2: 'Çevresel Etkiler',
    baslik3: '2025 Hedefleri',
    paragraf1: 'Motor teknolojisi...',
    paragraf2: 'Karbon salınımını...',
    paragraf3: 'Şirket 2025 yılına kadar...',
    not1: 'Test sürüşleri başladı',
    not2: 'Pilotsuz sürüm planlanıyor',
    link: 'https://ornekmotor.com',
    sponsor_baslik: 'Teknoloji Partneri',
    sponsor_icerik: 'Yeşil Enerji Derneği',
    sponsor_link: 'https://yesilenerji.org',
  };

  return (
    <div 
      className={`${styles.haberContainer} ${isExpanded ? styles.expanded : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <img src={haberData.resim1} className={styles.mainImage} />
      <h1 className={styles.mainTitle}>{haberData.ana_baslik}</h1>
      
      <div className={styles.content}>
        <p className={styles.summary}>{haberData.kisa_tanitim}</p>
        
        <div className={styles.imageRow}>
          <img src={haberData.resim2} className={styles.subImage} />
          <img src={haberData.resim3} className={styles.subImage} />
        </div>

        <div className={styles.sections}>
          <div className={styles.section}>
            <h2>{haberData.baslik1}</h2>
            <p>{haberData.paragraf1}</p>
          </div>
          <div className={styles.section}>
            <h2>{haberData.baslik2}</h2>
            <p>{haberData.paragraf2}</p>
          </div>
          <div className={styles.section}>
            <h2>{haberData.baslik3}</h2>
            <p>{haberData.paragraf3}</p>
          </div>
        </div>

        <div className={styles.notes}>
          <p>{haberData.not1}</p>
          <p>{haberData.not2}</p>
        </div>

        <div className={styles.sponsorBox}>
          <h3>{haberData.sponsor_baslik}</h3>
          <p>{haberData.sponsor_icerik}</p>
          <a href={haberData.sponsor_link} target="_blank" rel="noopener noreferrer">
            Sponsor Websitesi
          </a>
        </div>

        <a href={haberData.link} className={styles.readMore} target="_blank" rel="noopener noreferrer">
          Devamını Oku
        </a>
      </div>
    </div>
  );
}