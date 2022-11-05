// https://github.com/mui/material-ui/blob/master/examples/nextjs/src/createEmotionCache.js
import createCache from '@emotion/cache';

const isClient = typeof window !== 'undefined';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  let insertionPoint;

  if (isClient) {
    const emotionInsertionPoint = document.querySelector(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({key: 'bebop-style', insertionPoint});
}
