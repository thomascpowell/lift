// React
import { useState, useEffect } from "react";

// Styles
import "../styles/globals.css";

// Supabase
import supabase from "@/supabase/supabase";

// Misc
import Toast from "@/components/toast";

export default function App({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  // Supabase auth
  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Toast
  const [toast, setToast] = useState(["", false])

  return (
    <>
      <Toast toast={toast} setToast={setToast}/>
      <Component {...pageProps} session={session} setToast={setToast} />
    </>
  )
}