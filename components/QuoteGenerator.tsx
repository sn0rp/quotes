"use client";

import { useState } from 'react';
import styles from '../styles/QuoteGenerator.module.css';
import { Quote } from '../types';
import { generateQuote } from '../utils/quoteGenerator';
import AdBanner from './AdBanner';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await generateQuote();
      setQuote(newQuote);
    } catch (err: unknown) {
      setError('Failed to generate quote. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook') => {
    if (!quote) return;

    const text = `"${quote.text}" - ${quote.author}`;
    const encodedText = encodeURIComponent(text);

    let url;
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    } else {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`;
    }

    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inspirational Quotes</h1>
      {isLoading && <p className={styles.loading}>Generating profound wisdom...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {quote && (
        <div className={styles.quoteContainer}>
          <p className={styles.quote}>&ldquo;{quote.text}&rdquo;</p>
          <p className={styles.author}>- {quote.author}</p>
        </div>
      )}
      <button className={styles.button} onClick={handleGenerateQuote} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Quote'}
      </button>
      {quote && (
        <div className={styles.shareButtons}>
          <button className={styles.shareButton} onClick={() => handleShare('twitter')}>
            Share on 𝕏
          </button>
          <button className={styles.shareButton} onClick={() => handleShare('facebook')}>
            Share on Facebook
          </button>
        </div>
      )}
      <AdBanner />
    </div>
  );
}