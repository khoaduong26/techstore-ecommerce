import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CompareFloatingBar from './components/layout/CompareFloatingBar';
import ToastContainer from './components/layout/ToastContainer';
import AuthModal from './components/layout/AuthModal';

import HomeView from './components/views/HomeView';
import CatalogView from './components/views/CatalogView';
import ProductDetailView from './components/views/ProductDetailView';
import CompareView from './components/views/CompareView';
import CartView from './components/views/CartView';
import CheckoutView from './components/views/CheckoutView';
import OrderSuccessView from './components/views/OrderSuccessView';
import OrdersView from './components/views/OrdersView';
import ProfileView from './components/views/ProfileView';

function MainContent() {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalog':
        return <CatalogView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'compare':
        return <CompareView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-success':
        return <OrderSuccessView />;
      case 'my-orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] w-full">
      <Navbar />
      <main className="flex-1 max-w-[1650px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6">
        {renderCurrentView()}
      </main>
      <Footer />
      <CompareFloatingBar />
      <ToastContainer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
