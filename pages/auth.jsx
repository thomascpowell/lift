// Styles
import styles from "../styles/auth.module.css";

// Supabase
import supabase from "@/supabase/supabase";

// React & Next
import { useRouter } from "next/router";
import { useState } from "react";

// Misc
import Helmet from "@/components/helmet";

// Authentication Page
// Props: Toast Setter

const Auth = ({ setToast }) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Router
  const router = useRouter();

  // Auth function
  async function auth(e) {
    e.preventDefault();

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // Send toast and redirect
      if (!error) {
        router.push("/");
      } else {
        setToast([error.message, false]);
        // Close
        setTimeout(function () {
          setToast(["", false]);
        }, 3000);
      }
    }

    if (!isLogin) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      // Send toast and redirect
      if (!error) {
        setToast(["Account Created", true]);
        router.push("/");
        // Close
        setTimeout(function () {
          setToast(["", false]);
        }, 3000);
      } else {
        setToast([error.message, false]);
        // Close
        setTimeout(function () {
          setToast(["", false]);
        }, 3000);
      }
    }
  }

  return (
    <>
      <Helmet title="Auth" />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.mode}>
            <button
              className={isLogin ? styles.active : ""}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={!isLogin ? styles.active : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className={styles.form}>
            <form onSubmit={auth}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
              />
              <input
                className={styles.submit}
                type="submit"
                value={isLogin ? "Authenticate" : "Create Account"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
