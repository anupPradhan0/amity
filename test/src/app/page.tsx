import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MarqueeTicker from '@/components/MarqueeTicker'
import FeaturedProducts from '@/components/FeaturedProducts'
import CategoryStrip from '@/components/CategoryStrip'
import WhyAmity from '@/components/WhyAmity'
import Testimonials from '@/components/Testimonials'
import LimitedDropBanner from '@/components/LimitedDropBanner'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-body selection:bg-[#F5C518] selection:text-[#0D1B2A]">
      <Navbar cartCount={2} />
      <main className="flex-grow">
        <HeroSection />
        <MarqueeTicker />
        <FeaturedProducts />
        <CategoryStrip />
        <WhyAmity />
        <Testimonials />
        <LimitedDropBanner />
      </main>
      <Footer />
    </div>
  )
}
