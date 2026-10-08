import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  VerificationCodeScreen,
  ResetPasswordScreen,
  HomeScreen,
  NotificationsScreen,
  SearchScreen,
  SavedItemsScreen,
  ProductDetailsScreen,
  ReviewsScreen,
  CartScreen,
  AccountScreen,
  MyOrdersScreen,
  TrackOrderScreen,
  MyDetailsScreen,
  NotificationSettingsScreen,
  FAQScreen,
  HelpCenterScreen,
  CustomerServiceChatScreen,
  CheckoutScreen,
  AddressListScreen,
  AddAddressScreen,
  PaymentMethodScreen,
  AddCardScreen,
} from './src/screens';
import { BottomTabBar } from './src/components';
import {
  Product,
  TabType,
  AddressItem,
  PaymentCard,
  CartItem,
  OrderItem,
} from './src/types';
import {
  MOCK_PRODUCTS,
  MOCK_NOTIFICATIONS,
  MOCK_ADDRESSES,
  MOCK_PAYMENT_CARDS,
  MOCK_ORDERS,
} from './src/constants/mockData';

type AuthScreenType =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'forgotPassword'
  | 'verification'
  | 'resetPassword';

type OverlayScreenType =
  | 'notifications'
  | 'productDetails'
  | 'reviews'
  | 'checkout'
  | 'addressList'
  | 'addAddress'
  | 'paymentMethod'
  | 'addCard'
  | 'myOrders'
  | 'trackOrder'
  | 'myDetails'
  | 'notificationSettings'
  | 'faqs'
  | 'helpCenter'
  | 'customerChat'
  | null;

export default function App() {
  // Navigation state
  const [authScreen, setAuthScreen] = useState<AuthScreenType | null>('splash');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [overlayScreen, setOverlayScreen] = useState<OverlayScreenType>(null);
  const [previousScreen, setPreviousScreen] = useState<OverlayScreenType>(null);

  // App domain state
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([
    'prod-1',
    'prod-3',
    'prod-6',
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0],
      size: 'L',
      quantity: 2,
    },
    {
      product: MOCK_PRODUCTS[1] || MOCK_PRODUCTS[0],
      size: 'M',
      quantity: 1,
    },
    {
      product: MOCK_PRODUCTS[2] || MOCK_PRODUCTS[0],
      size: 'M',
      quantity: 1,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    MOCK_PRODUCTS[0]
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(
    MOCK_ORDERS[0]
  );
  const [resetEmail, setResetEmail] = useState('cody.fisher45@example.com');

  // Checkout address & card states
  const [addresses, setAddresses] = useState<AddressItem[]>(MOCK_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<AddressItem>(
    MOCK_ADDRESSES.find((a) => a.isDefault) || MOCK_ADDRESSES[0]
  );

  const [cards, setCards] = useState<PaymentCard[]>(MOCK_PAYMENT_CARDS);
  const [selectedCard, setSelectedCard] = useState<PaymentCard>(
    MOCK_PAYMENT_CARDS.find((c) => c.isDefault) || MOCK_PAYMENT_CARDS[0]
  );

  // Toggle saved / wishlist item
  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add to cart
  const handleAddToCart = (
    product: Product,
    size: string,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
  };

  // Update cart item quantity
  const handleUpdateCartQty = (
    productId: string,
    size: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  // View product details
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setOverlayScreen('productDetails');
  };

  // View reviews
  const handleViewReviews = (product: Product) => {
    setSelectedProduct(product);
    setPreviousScreen('productDetails');
    setOverlayScreen('reviews');
  };

  // Address saving handler
  const handleSaveNewAddress = (newAddress: AddressItem) => {
    setAddresses((prev) => {
      if (newAddress.isDefault) {
        return [newAddress, ...prev.map((a) => ({ ...a, isDefault: false }))];
      }
      return [...prev, newAddress];
    });
    setSelectedAddress(newAddress);
    setOverlayScreen('addressList');
  };

  // Card saving handler
  const handleSaveNewCard = (newCard: PaymentCard) => {
    setCards((prev) => {
      if (newCard.isDefault) {
        return [newCard, ...prev.map((c) => ({ ...c, isDefault: false }))];
      }
      return [...prev, newCard];
    });
    setSelectedCard(newCard);
    setOverlayScreen('paymentMethod');
  };

  // Order placed handler
  const handleOrderPlaced = () => {
    setCartItems([]);
    setOverlayScreen(null);
    setActiveTab('home');
  };

  // Auth flow screens
  if (authScreen) {
    return (
      <SafeAreaProvider>
        <StatusBar style={authScreen === 'splash' ? 'light' : 'dark'} />

        {authScreen === 'splash' && (
          <SplashScreen onFinish={() => setAuthScreen('onboarding')} />
        )}

        {authScreen === 'onboarding' && (
          <OnboardingScreen onGetStarted={() => setAuthScreen('login')} />
        )}

        {authScreen === 'login' && (
          <LoginScreen
            onNavigateToSignUp={() => setAuthScreen('signup')}
            onNavigateToForgotPassword={() => setAuthScreen('forgotPassword')}
            onLoginSuccess={() => setAuthScreen(null)} // transitions to main app
          />
        )}

        {authScreen === 'signup' && (
          <SignUpScreen
            onNavigateToLogin={() => setAuthScreen('login')}
            onSignUpSuccess={() => setAuthScreen(null)} // transitions to main app
          />
        )}

        {authScreen === 'forgotPassword' && (
          <ForgotPasswordScreen
            onBack={() => setAuthScreen('login')}
            onSendCode={(email) => {
              setResetEmail(email);
              setAuthScreen('verification');
            }}
          />
        )}

        {authScreen === 'verification' && (
          <VerificationCodeScreen
            email={resetEmail}
            onBack={() => setAuthScreen('forgotPassword')}
            onVerifySuccess={() => setAuthScreen('resetPassword')}
          />
        )}

        {authScreen === 'resetPassword' && (
          <ResetPasswordScreen
            onBack={() => setAuthScreen('verification')}
            onNavigateToLogin={() => setAuthScreen('login')}
          />
        )}
      </SafeAreaProvider>
    );
  }

  // Overlay Screens (Product Details, Reviews, Notifications, Checkout Flow)
  if (overlayScreen === 'productDetails' && selectedProduct) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <ProductDetailsScreen
          product={selectedProduct}
          isSaved={savedProductIds.includes(selectedProduct.id)}
          onBack={() => setOverlayScreen(null)}
          onToggleSave={handleToggleSave}
          onViewReviews={handleViewReviews}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'reviews' && selectedProduct) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <ReviewsScreen
          product={selectedProduct}
          onBack={() => setOverlayScreen(previousScreen || 'productDetails')}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'notifications') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NotificationsScreen
          notifications={MOCK_NOTIFICATIONS}
          onBack={() => setOverlayScreen(null)}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'checkout') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <CheckoutScreen
          cartItems={cartItems}
          selectedAddress={selectedAddress}
          selectedCard={selectedCard}
          onBack={() => setOverlayScreen(null)}
          onChangeAddress={() => setOverlayScreen('addressList')}
          onChangePaymentMethod={() => setOverlayScreen('paymentMethod')}
          onOrderPlaced={handleOrderPlaced}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'addressList') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AddressListScreen
          addresses={addresses}
          selectedAddressId={selectedAddress.id}
          onSelectAddress={(addr) => setSelectedAddress(addr)}
          onAddNewAddress={() => setOverlayScreen('addAddress')}
          onBack={() => setOverlayScreen('checkout')}
          onApply={(addr) => {
            setSelectedAddress(addr);
            setOverlayScreen('checkout');
          }}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'addAddress') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AddAddressScreen
          onBack={() => setOverlayScreen('addressList')}
          onSaveAddress={handleSaveNewAddress}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'paymentMethod') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <PaymentMethodScreen
          cards={cards}
          selectedCardId={selectedCard.id}
          onSelectCard={(c) => setSelectedCard(c)}
          onAddNewCard={() => setOverlayScreen('addCard')}
          onBack={() => setOverlayScreen('checkout')}
          onApply={(c) => {
            setSelectedCard(c);
            setOverlayScreen('checkout');
          }}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'addCard') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AddCardScreen
          onBack={() => setOverlayScreen('paymentMethod')}
          onSaveCard={handleSaveNewCard}
        />
      </SafeAreaProvider>
    );
  }

  // Profile Flow Overlay Screens
  if (overlayScreen === 'myOrders') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <MyOrdersScreen
          onBack={() => setOverlayScreen(null)}
          onTrackOrder={(order) => {
            setSelectedOrder(order);
            setOverlayScreen('trackOrder');
          }}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'trackOrder' && selectedOrder) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <TrackOrderScreen
          order={selectedOrder}
          onBack={() => setOverlayScreen('myOrders')}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'myDetails') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <MyDetailsScreen onBack={() => setOverlayScreen(null)} />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'notificationSettings') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NotificationSettingsScreen onBack={() => setOverlayScreen(null)} />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'faqs') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <FAQScreen onBack={() => setOverlayScreen(null)} />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'helpCenter') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <HelpCenterScreen
          onBack={() => setOverlayScreen(null)}
          onNavigateToChat={() => setOverlayScreen('customerChat')}
        />
      </SafeAreaProvider>
    );
  }

  if (overlayScreen === 'customerChat') {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <CustomerServiceChatScreen
          onBack={() => setOverlayScreen('helpCenter')}
        />
      </SafeAreaProvider>
    );
  }

  // Main Browsing & Tab Screens
  const totalCartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Active Tab Screen */}
        <View style={styles.screenContainer}>
          {activeTab === 'home' && (
            <HomeScreen
              products={products}
              savedProductIds={savedProductIds}
              unreadNotificationCount={2}
              onSelectProduct={handleSelectProduct}
              onToggleSave={handleToggleSave}
              onOpenNotifications={() => setOverlayScreen('notifications')}
              onOpenSearch={() => setActiveTab('search')}
            />
          )}

          {activeTab === 'search' && (
            <SearchScreen
              products={products}
              savedProductIds={savedProductIds}
              onSelectProduct={handleSelectProduct}
              onToggleSave={handleToggleSave}
            />
          )}

          {activeTab === 'saved' && (
            <SavedItemsScreen
              products={products}
              savedProductIds={savedProductIds}
              onSelectProduct={handleSelectProduct}
              onToggleSave={handleToggleSave}
              onExploreProducts={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'cart' && (
            <CartScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateCartQty}
              onRemoveItem={handleRemoveCartItem}
              onExploreProducts={() => setActiveTab('home')}
              onCheckout={() => setOverlayScreen('checkout')}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activeTab === 'account' && (
            <AccountScreen
              onLogout={() => setAuthScreen('login')}
              onNavigateToOrders={() => setOverlayScreen('myOrders')}
              onNavigateToDetails={() => setOverlayScreen('myDetails')}
              onNavigateToAddresses={() => {
                setPreviousScreen(null);
                setOverlayScreen('addressList');
              }}
              onNavigateToPayments={() => {
                setPreviousScreen(null);
                setOverlayScreen('paymentMethod');
              }}
              onNavigateToNotifications={() =>
                setOverlayScreen('notificationSettings')
              }
              onNavigateToFAQs={() => setOverlayScreen('faqs')}
              onNavigateToHelpCenter={() => setOverlayScreen('helpCenter')}
              onNavigateToSaved={() => setActiveTab('saved')}
            />
          )}
        </View>

        {/* Persistent Bottom Tab Bar */}
        <BottomTabBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          cartCount={totalCartCount}
          savedCount={savedProductIds.length}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
});
