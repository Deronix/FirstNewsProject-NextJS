"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './hakkimda.module.css';
import { SmoothScroll } from "../scroolsmooth";


export default function About() {
  const heroRef = useRef(null);
  const gridItemRefs = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'auto' });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hero section animation
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Grid items staggered animation
    tl.fromTo(gridItemRefs.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // CTA section animation
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.2"
    );

    return () => tl.kill(); // Cleanup
  }, []);

  return (
    <main className={styles.container}>
      <SmoothScroll />
      <div className={styles.space}></div>

      <section className={styles.hero} ref={heroRef}>
        <h1 className={styles.heroTitle}>İnovasyonun 6 Harikasını Neden Sergiliyoruz?</h1>
        <div className={styles.gradientBar}></div>
      </section>

      <section className={styles.story}>
        <div className={styles.card}>
          <h2 className={styles.cardHeading}>İnovasyon Yolculuğumuz</h2>
          <p className={styles.cardText}>
            Işık hızında gelişen bir dünyada, geleceğimizi şekillendiren çığır açan 
            gelişmeleri vurgulama ihtiyacını fark ettik. 6 Harika, bugünün zorluklarıyla 
            yarının olasılıklarını birleştiren dönüştürücü teknolojileri ortaya çıkarma 
            taahhüdümüzü temsil ediyor.
          </p>
        </div>

        <div className={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={styles.gridItem}
              ref={el => gridItemRefs.current[i] = el}
            >
              <h3 className={styles.gridHeading}>
                {['🌍 Küresel Etki', '🚀 Gelecek Odaklı', '🤝 İnsan Merkezli', '🔍 Kritik Analiz'][i]}
              </h3>
              <p className={styles.cardText}>
                {[
                  'Dünya çapında öneme sahip çözümleri öne çıkarıyoruz',
                  'Yarının teknolojilerini bugünden belirliyoruz',
                  'İnsanlığa hizmet eden yeniliklere öncelik veriyoruz',
                  'Abartıları gerçek ilerlemelerden ayırıyoruz'
                ][i]}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.cta} ref={ctaRef}>
          <h2 className={styles.cardHeading}>Keşifimize Katılın</h2>
          <p className={styles.cardText}>
            Bu yeniliklerin endüstrileri ve günlük yaşamı nasıl şekillendirdiğini keşfedin.
            <a href="../" className={styles.link}>Harikaları Keşfet →</a>
          </p>
        </div>
      </section>
    </main>
  );
}