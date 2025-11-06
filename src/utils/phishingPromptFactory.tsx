import React, { useState } from 'react';

/**
 * Generates a phishing prompt with a popup tooltip on link hover.
 *
 * @param leakedInfo - The personalized text (e.g., "I already know your Name...")
 * @param basePrompt - The phishing message excluding the link
 * @param displayUrl - The "safe looking" URL to show initially
 * @param hoverUrl - The actual phishing link shown on hover
 * @returns JSX element to render directly in your prompt bubble
 */
export function PhishingPromptWithHover({
  leakedInfo,
  basePrompt,
  displayUrl,
  hoverUrl,
}: {
  leakedInfo: string;
  basePrompt: string;
  displayUrl: string;
  hoverUrl: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <span style={{ position: 'relative' }}>
      {leakedInfo} {basePrompt}{' '}
      <span
        className="text-blue-600 underline cursor-pointer hover:text-red-600"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: 'relative' }}
      >
        {displayUrl}
        {hover && (
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '120%',
              background: '#fff',
              color: '#b91c1c',
              border: '1px solid #b91c1c',
              borderRadius: '6px',
              padding: '6px 12px',
              whiteSpace: 'nowrap',
              zIndex: 100,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {hoverUrl}
          </span>
        )}
      </span>.
    </span>
  );
}

// Example usage:
// const leakedInfo = "I already know your Name...";
// const basePrompt = "Click here to claim your reward:";
// const displayUrl = "https://example.com/claim";
// const hoverUrl = "https://malicious-site.com/steal";
