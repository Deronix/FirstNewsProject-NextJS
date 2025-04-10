import { useState } from "react";
import styles from "./Haber.module.css";

export function Haber({ haberData, isExpanded, onClose, onClick }) {
  return (
    <div
      className={`${styles.haberContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
      onClick={!isExpanded ? onClick : undefined}
    >
      <h1 className={styles.mainTitle}>{haberData.ana_baslik}</h1>
      <img src={haberData.resim1} className={styles.mainImage} alt="Main" />

      <div className={styles.content}>
        <p className={styles.summary}>{haberData.kisa_tanitim}</p>

        <div className={styles.imageRow}>
          <img
            src={haberData.resim2}
            className={styles.subImage}
            alt="Detail 1"
          />
          <img
            src={haberData.resim3}
            className={styles.subImage}
            alt="Detail 2"
          />
        </div>

        <div className={styles.sections}>
          <div className={styles.section}>
            <h2>{haberData.baslik1}</h2>
            <p>
              {haberData.paragraf1.map((sentence, index) => (
                <span key={index}>
                  {sentence}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={styles.section}>
            <h2>{haberData.baslik2}</h2>
            <p>
              {haberData.paragraf2.map((sentence, index) => (
                <span key={index}>
                  {sentence}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className={styles.section}>
            <h2>{haberData.baslik3}</h2>
            <p>
              {haberData.paragraf3.map((sentence, index) => (
                <span key={index}>
                  {sentence}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className={styles.notes}>
          <p>
            {haberData.not1.map((note, index) => (
              <span key={index}>
                {note}
                <br />
              </span>
            ))}
            {haberData.not2.map((note, index) => (
              <span key={index}>
                {note}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className={styles.sponsorBox}>
          <h3>{haberData.sponsor_baslik}</h3>
          <img
            src={haberData.sponsor_icerik}
            className={styles.sponsorImage}
            alt="Sponsor Logo"
          />
          <br /> <br />
          <a
            href={haberData.sponsor_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sponsor Websitesi
          </a>
        </div>

 
        <a
          href={haberData.link}
          className={styles.readMore}
          target="_blank"
          rel="noopener noreferrer"
        >
          Devamını Oku
        </a>

        {isExpanded && (
          <button
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
