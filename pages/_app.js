import "@/styles/globals.css";

import { ChatAppProvider } from "@/Context/ChatAppContext";
import { NavBar } from "@/Components";
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ChatAppProvider>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </ChatAppProvider>

    </div>);
}
