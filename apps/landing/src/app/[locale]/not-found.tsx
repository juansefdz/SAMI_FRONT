import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-8xl font-semibold tracking-tight text-brand-600">404</p>
        <p className="mt-4 text-ink-soft">Página no encontrada · Page not found</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white">
          SAMI
        </Link>
      </div>
    </div>
  );
}
