import Navbar from "@/src/components/layout/Navbar";
export default function WorkLayout({ children }) {
  return <><a href="#main-content" className="skip-link">Skip to content</a><Navbar />{children}</>;
}
