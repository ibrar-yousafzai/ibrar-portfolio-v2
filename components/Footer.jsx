export default function Footer({ settings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-display text-sm font-semibold text-text">{settings.name}</p>
        <p className="mt-2 text-xs text-text-muted">
          © {year} {settings.name}. All rights reserved. {settings.location}
        </p>
      </div>
    </footer>
  );
}
