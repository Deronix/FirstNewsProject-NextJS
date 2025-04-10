"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./iletisim.module.css";
import { SmoothScroll } from "../scroolsmooth";

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');
  const spanRef = useRef(null);
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'auto' });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      spanRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1 }
    )
      .fromTo(
        formRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        [
          nameRef.current,
          emailRef.current,
          messageRef.current,
          submitRef.current,
        ],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=0.3"
      );
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { scale: 1.02, duration: 0.3 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.3 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails('');
  
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value
        }),
      });
  
      // Handle HTML responses
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
      }
  
      if (!response.ok) {
        throw new Error(data.error || 'Sunucu hatası');
      }
  
      setSubmitStatus('success');
      e.target.reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorDetails(
        error.message.includes('Unexpected response') 
          ? 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.'
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    
    <div className={styles.container}>
            <SmoothScroll />

      <div className={styles.space}></div>

      <div className={styles.info}>
        <span ref={spanRef}>
          Bizimle iletişime geçin. <br /> Fikirlerini iletin.
        </span>
      </div>
      <div className={styles.space}></div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.contactForm}
      >
        <div className={styles.formGroup}>
          <label htmlFor="name">İsim:</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            required
            className={styles.inputField}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            required
            className={styles.inputField}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Mesaj:</label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            required
            className={styles.textareaField}
            rows="5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <button
          ref={submitRef}
          type="submit"
          className={styles.submitButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
        </button>

        {submitStatus === 'success' && (
          <p className={styles.successMessage}>Mesaj başarıyla gönderildi!</p>
        )}
        
        {submitStatus === 'error' && (
          <p className={styles.errorMessage}>
            Gönderim hatası: {errorDetails || 'Lütfen tekrar deneyin.'}
          </p>
        )}
      </form>
    </div>
  );
};

export default Home;