import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-6xl font-black text-brand-600">404</p>
      <p className="mt-4 text-ink-soft">Página no encontrada · Page not found</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-brand-700 hover:underline">
        ← SAMI
      </Link>
    </div>
  );
}
