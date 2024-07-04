'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

const PyScriptContext = createContext();

export const PyScriptProvider = ({ children }) => {
  const [isPyScriptReady, setIsPyScriptReady] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    if (!isPyScriptReady && !loadingError) {
      const loadPyScript = () => {
        const script = document.createElement('script');
        script.src = 'https://pyscript.net/latest/pyscript.js';
        script.async = true;
        script.onload = () => {
          const checkPyScriptReady = () => {
            if (window.pyscript && window.pyscript.interpreter) {
              setIsPyScriptReady(true);
            } else {
              setTimeout(checkPyScriptReady, 100);
            }
          };
          checkPyScriptReady();
        };
        script.onerror = () => {
          setLoadingError('Failed to load PyScript');
        };
        document.body.appendChild(script);

        // PyScript 스타일 제어
        const style = document.createElement('style');
        style.textContent = `
          #output-container { display: none !important; }
          py-terminal { display: none !important; }
        `;
        document.head.appendChild(style);
      };

      loadPyScript();
    }
  }, [isPyScriptReady, loadingError]);

  return (
    <PyScriptContext.Provider value={{ isPyScriptReady, loadingError }}>
      {children}
    </PyScriptContext.Provider>
  );
};

export const usePyScript = () => {
  const context = useContext(PyScriptContext);
  if (context === undefined) {
    throw new Error('usePyScript must be used within a PyScriptProvider');
  }
  return context;
};
