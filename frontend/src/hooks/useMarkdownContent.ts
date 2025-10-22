import { useState, useEffect } from 'react';

/**
 * Custom hook for loading markdown content from a URL.
 *
 * This hook handles asynchronous markdown loading without exposing
 * intermediate loading states, providing a seamless user experience.
 * Content starts as empty and populates when loaded.
 *
 * @param url - The URL to fetch markdown content from
 * @param fallbackMessage - Optional message to display on error (default: 'Content not available.')
 * @returns The markdown content as a string (empty initially, populated when ready)
 */
export const useMarkdownContent = (
  url: string,
  fallbackMessage: string = 'Content not available.'
): string => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setContent(fallbackMessage);
        }
      } catch (error) {
        console.error(`Error loading markdown from ${url}:`, error);
        setContent(fallbackMessage);
      }
    };

    loadContent();
  }, [url, fallbackMessage]);

  return content;
};
