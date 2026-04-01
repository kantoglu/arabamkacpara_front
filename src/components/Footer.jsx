export default function Footer() {
  return (
    <footer
      className="
        bg-background border-t border-border
        text-muted-foreground text-sm
        transition-colors duration-500 ease-in-out
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-foreground font-medium transition-colors duration-500 ease-in-out">
            © {new Date().getFullYear()} Araban Kaç Para
          </p>
          <p className="text-xs text-muted-foreground/70 transition-colors duration-500 ease-in-out">
            Tüm hakları saklıdır • Güvenilir platformlardan alınan fiyat verileri
          </p>
        </div>

        <div className="flex gap-4 text-xs text-muted-foreground transition-colors duration-500 ease-in-out">
          <span>yyz.com</span>
          <span>xxx.com</span>
          <span>xzc.net</span>
          <span>+ daha fazlası</span>
        </div>
      </div>
    </footer>
  );
}