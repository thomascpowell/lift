// Styles
import styles from "../styles/components/toast.module.css";

// Toast Component (_app.js)
// Props: Toast Text

const Toast = ({ toast }) => {

  // Data
  const text = toast[0];
  const isGood = toast[1];

  if (text != "")
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {!isGood ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-alert-circle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-circle-check"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          )}
          <div className={styles.text}>
            <p>{isGood ? "Success" : "Error"}</p>
            <p>{text}</p>
          </div>{" "}
        </div>
      </div>
    );
};

export default Toast;
