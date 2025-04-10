"use client";
import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import styles from "./page.module.css";
import { SmoothScroll } from "./scroolsmooth";
import { LoadingWrapper } from "./loadingwrapper";
import { Animation } from "./animation/page.js";
import NewsPage from "./NewsPage";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const containerRef = useRef();
  const [isScrollingNews, setIsScrollingNews] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrollingNews) {
        e.preventDefault();
      }
    };

    // Add passive: false to make preventDefault work
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isScrollingNews]);

  useEffect(() => {
    // Disable vertical scroll initially if needed
    document.documentElement.style.overflowY = isScrollingNews
      ? "hidden"
      : "auto";
    document.body.style.overflowY = isScrollingNews ? "hidden" : "auto";

    const disableButtonFocus = (e) => {
      if (e.key === "Tab") {
        const buttons = document.querySelectorAll("button");
        if (buttons.length > 0) {
          e.preventDefault();
        }
      }
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", disableButtonFocus);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Reset scroll position when component mounts
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      document.removeEventListener("keydown", disableButtonFocus);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isScrollingNews]);

  return (
    <>
      <LoadingWrapper />
      <Animation />

      <Navbar />
      <SmoothScroll />

      <div className={styles.container} style={{ overflowY: "hidden" }}>
        {/* Breaking News Banner */}
        <div className={styles.breakingNews}>
          <span className={styles.breakingLabel}>SON DAKİKA:</span>
          <span className={styles.breakingText}>
            Küresel teknoloji zirvesi devrim niteliğinde AI gelişmelerini
            duyurdu
          </span>
        </div>

        <div className={styles.space}></div>
        <div className={styles.contain}>
          <div className={styles.box} ref={containerRef} tabIndex={-1}>
            <NewsPage
              onScrollStart={() => setIsScrollingNews(true)}
              onScrollEnd={() => setIsScrollingNews(false)}
            />
          </div>
        </div>

        {/* Trending Section */}
        <div className={styles.trendingSection}>
          <h2 className={styles.sectionTitle}>Gündemdekiler</h2>
          <div className={styles.trendingGrid}>
            <div className={styles.trendingCard}>
              <div
                className={styles.trendingImage}
                style={{
                  backgroundImage: "url('/img/fusion-reaktor1.jpg')",
                }}
              ></div>
              <h3>Yenilenebilir Enerji Devrimi</h3>
              <p>
                Bilim insanları güneş paneli teknolojisinde rekor verimliliğe
                ulaştı
              </p>
            </div>
            <div className={styles.trendingCard}>
              <div
                className={styles.trendingImage}
                style={{
                  backgroundImage: "url('/img/uzay-asansor1.jpg')",
                }}
              ></div>
              <h3>Uzay Keşiflerinde Dönüm Noktası</h3>
              <p>
                Yeni teleskop uzak galaksinin benzeri görülmemiş görüntülerini
                yakaladı
              </p>
            </div>
            <div className={styles.trendingCard}>
              <div
                className={styles.trendingImage}
                style={{ backgroundImage: "url('/img/biyonik-organ1.jpg')" }}
              ></div>
              <h3>Tıbbi Yenilik</h3>
              <p>Yapay zeka destekli cerrahi iyileşme süresini %40 azalttı</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletter}>
          <h2>Güncel Kalın</h2>
          <p>Yeni inovasyonlardan haberdan olmak için emailinizi giriniz.</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="E-posta adresiniz" required />
            <button type="submit" className={styles.subscribeBtn}>
              Gönder
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>TEKHABER</div>
            <div className={styles.footerLinks}>
  <Link 
    href="./hakkimda" 
    onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
  >
    Hakkımızda
  </Link>
  <Link 
    href="./iletisim" 
    onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
  >
    Bize Ulaş
  </Link>
</div>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Instagram">
                <span className={styles.socialIcon}>📷</span>
              </a>
            </div>
            <div className={styles.copyright}>
              © {new Date().getFullYear()} TekHaber. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
