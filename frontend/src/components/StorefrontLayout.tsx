import { Outlet } from "react-router-dom";
import CartDrawer from "@/components/CartDrawer.tsx";
import Footer from "@/components/Footer.tsx";
import Navbar from "@/components/Navbar.tsx";

export default function StorefrontLayout() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Outlet />
      <Footer />
    </>
  );
}
