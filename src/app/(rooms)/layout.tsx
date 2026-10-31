import Link from "next/link";
import { env } from "@/lib/env";

/**
 * Route group "(rooms)": the employee-facing app shell (App Header in Figma).
 * Parentheses mean the folder name does NOT appear in the URL.
 */
export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
          <span className="text-h3 text-fg-brand">Rooms</span>
          <Link href="/" className="text-label-md text-fg-secondary hover:text-fg">
            Rooms
          </Link>
          <Link href="/my-bookings" className="text-label-md text-fg-secondary hover:text-fg">
            My bookings
          </Link>
          <a href={env.PORTAL_URL} className="ml-auto text-label-md text-fg-secondary hover:text-fg">
            RC Portal
          </a>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </>
  );
}
