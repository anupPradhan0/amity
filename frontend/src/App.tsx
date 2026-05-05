import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BrandSplash from "./components/BrandSplash.tsx";
import StorefrontLayout from "./components/StorefrontLayout.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import StorePage from "./pages/StorePage.tsx";
import LookbookPage from "./pages/LookbookPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import TrackOrderPage from "./pages/TrackOrderPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ShippingReturnsPage from "./pages/ShippingReturnsPage.tsx";
import SizeGuidePage from "./pages/SizeGuidePage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProductsPage from "./pages/admin/AdminProductsPage.tsx";
import { CartProvider } from "./store/cart.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BrandSplash />
        <CartProvider>
          <Routes>
            <Route path="/auth/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductsPage />} />
            </Route>
            <Route element={<StorefrontLayout />}>
              <Route index element={<Index />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="store" element={<StorePage />} />
              <Route path="lookbook" element={<LookbookPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="track-order" element={<TrackOrderPage />} />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="shipping-returns" element={<ShippingReturnsPage />} />
              <Route path="size-guide" element={<SizeGuidePage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
