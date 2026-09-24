import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import CursorGlow from "./components/CursorGlow";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><CursorGlow /><Toaster /><Home /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
