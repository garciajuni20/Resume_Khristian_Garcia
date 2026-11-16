/**
 * The reading column. Horizontal overflow (the full-bleed engraving on phones)
 * is cut with `clip`, not `hidden`: `overflow-x: hidden` turns overflow-y into
 * `auto`, so the container became a scroll box of its own and showed a second
 * scrollbar while the entrance moved its content.
 */
export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl overflow-x-clip px-4 sm:px-6 lg:px-8">{children}</div>;
}
