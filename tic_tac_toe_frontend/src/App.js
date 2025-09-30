import React, { useEffect } from 'react';

// PUBLIC_INTERFACE
function App() {
  useEffect(() => {
    // Load external CSS files
    const styleLinks = [
      '/assets/styles.css',
      '/assets/home-1-49.css'
    ];
    
    styleLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    // Load external JS
    const script = document.createElement('script');
    script.src = '/assets/app.js';
    script.defer = true;
    document.body.appendChild(script);

    // Load content from HTML file
    fetch('/assets/home-1-49.html')
      .then(response => response.text())
      .then(html => {
        // Extract body content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const bodyContent = tempDiv.querySelector('.container');
        if (bodyContent) {
          document.querySelector('#root').appendChild(bodyContent);
        }
      });

    // Cleanup function
    return () => {
      styleLinks.forEach(href => {
        const link = document.querySelector(`link[href="${href}"]`);
        if (link) link.remove();
      });
      const script = document.querySelector('script[src="/assets/app.js"]');
      if (script) script.remove();
    };
  }, []);

  return null;
}

export default App;
