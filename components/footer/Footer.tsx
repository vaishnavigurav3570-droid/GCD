export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border py-6">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          AgriVision Dashboard © {currentYear}
        </p>
        <p className="text-xs text-muted-foreground">
          Powered by AI &amp; Supabase
        </p>
      </div>
    </footer>
  );
}
