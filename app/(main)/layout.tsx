import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { CartProvider } from "@/context/CartContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderProvider>
      <CartProvider>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var el=document.createElement('div');
  el.id='preloader-static';
  el.style.cssText='position:fixed;inset:0;z-index:9998;background:#0a0a0a;display:flex;align-items:center;justify-content:center;';
  el.innerHTML='<img src="/yariloLogo.jpg" style="width:72px;height:72px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);object-fit:cover;" alt="" />';
  document.body.appendChild(el);
})();`,
        }}
      />
      <Preloader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      </CartProvider>
    </PreloaderProvider>
  );
}
