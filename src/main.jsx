import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from 'firebase/app';
import App from './App.jsx'
import './style/styles.css'


const firebaseConfig = {
  apiKey: "AIzaSyBj1L79VQBTZHo-OcEKS8GYjmjyFG7y5yw",
  authDomain: "lexuswatch-2f0f3.firebaseapp.com",
  projectId: "lexuswatch-2f0f3",
  storageBucket: "lexuswatch-2f0f3.appspot.com",
  messagingSenderId: "65414976270",
  appId: "1:65414976270:web:1555a5be0d299dedd53d5f"
};

initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
