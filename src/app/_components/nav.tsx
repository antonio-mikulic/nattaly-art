"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const links = new Map<string, string>([
    ["/", "Home"],
    ["/products", "Products"],
    ["/contact", "Contact"],
  ]);

  return (
    <nav>
      <ul className="flex gap-16 p-4 text-2xl">
        {[...links].map(([path, label]) => (
          <li
            key={path}
            className={`${
              pathname === path
                ? "border-b-2 border-b-rose-500"
                : "text-white/50"
            }`}
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
