"use client"
import React from 'react';
import { ThemeProvider } from 'next-themes';

function ThemeProvid({ children }) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <div className="theme-wrapper">
        {children}
        <style jsx global>{`
          .theme-light .theme-wrapper {
            background-color: #ffffff; 
            
          }
          .theme-dark .theme-wrapper {
            background-color: #333333; 
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}

export default ThemeProvid;
