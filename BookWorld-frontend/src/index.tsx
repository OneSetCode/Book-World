import ReactDOM from 'react-dom/client';
import './index.css'; 
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Stripe publishable key 
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}> 
    <App />
  </Elements>
  </BrowserRouter>
);
