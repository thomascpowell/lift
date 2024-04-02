// React
import { useEffect, useState, useRef } from "react";

// Styles
import styles from "../styles/components/modal.module.css";

// Modal Component
// Props: Title, Action Name, Action Label, Action Function, Self State, Toast Setter

const Modal = ({
  title,
  actionName,
  inputLabel,
  func,
  isInput,
  setOpen,
  open,
  setToast,
}) => {

  // State
  const [input, setInput] = useState();

  // Logic for clicking outside to close
  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick, true);
  }, []);
  const modalRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (!modalRef?.current?.contains(e.target) && modalRef.current) {
      setOpen(false);
    }
  };

  // Logic if modal is accepted (run function, send toast)
  function accepted() {
    if (isInput) {
      func(input);
    } else {
      func();
    }

    setToast([title, true]);
    setOpen(false);

    // Close toast
    setTimeout(function () {
      setToast(["", false]);
    }, 3000);
  }

  // Modalmode
  useEffect(() => {
    if (open) {
      document.body.classList.add("modalMode");
    }
    else {
      document.body.classList.remove("modalMode");
    }
  }, [open]);

  if (!open) return <></>;

  return (
    <div className={styles.wrapper}>
      <div ref={modalRef} className={styles.inner}>
        <div className={styles.header}>
          <h1>{title}</h1>
        </div>

        <div className={styles.content}>
          {isInput ? (
            <div>
              <input
                placeholder={inputLabel}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />{" "}
              <button onClick={accepted}>{actionName}</button>
            </div>
          ) : (
            <div>
              <button
                style={{ backgroundColor: "transparent" }}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button onClick={accepted}>{actionName}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
