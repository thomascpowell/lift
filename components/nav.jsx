// React & Next
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Styles
import styles from "../styles/components/nav.module.css";

// Supabase
import supabase from "@/supabase/supabase";

// Misc
import Modal from "./modal";

// Nav Component (History/Index)
// Props: Toast Setter

const Nav = ({ setToast }) => {
  // Router
  const router = useRouter();

  // Modal
  const [deauthModalOpen, setDeauthModalOpen] = useState(false);

  // Deauth
  async function deauth() {
    supabase.auth.signOut();
  }

  return (
    <>
      <Modal
        setOpen={setDeauthModalOpen}
        open={deauthModalOpen}
        title="Sign Out"
        actionName="Continue"
        text=""
        isInput={false}
        func={deauth}
        setToast={setToast}
      />

      <div className={styles.wrapper}>
        <div className={styles.pages}>
          <Link href="/" className={router.pathname == "/" ? "" : "inactive"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
              <path d="M13 8l2 0" />
              <path d="M13 12l2 0" />
            </svg>
            <p>Lifts</p>
          </Link>
          <Link
            href="/history"
            className={router.pathname == "/history" ? "" : "inactive"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8l0 4l2 2" />
              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
            <p>History</p>
          </Link>
        </div>
        <div className={styles.logout}>
          <button onClick={() => setDeauthModalOpen(!deauthModalOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
