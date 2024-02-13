import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontWeight: "bold",
          },
          success: {
            style: {
              color: "green",
            },
          },
          error: {
            style: {
              color: "red",
            },
          },
        }}
      />
    </NextUIProvider>
  </React.StrictMode>,
)
