import Navbar from "@/src/components/layout/Navbar";
export default function WorkLayout({ children }) {
  return <><a href="#main-content" className="skip-link fixed top-4 left-4 z-[110] -translate-y-[200%] rounded-full bg-accent px-4 py-3 font-bold text-background focus:translate-y-0 focus:outline-2 focus:outline-offset-[3px] focus:outline-white">Skip to content</a><Navbar />{children}</>;
}
