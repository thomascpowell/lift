// React
import { useState, useEffect, useRef } from "react";

// Supabase
import supabase from "@/supabase/supabase";

// Styles
import styles from "../styles/components/movement_editor.module.css";

// Misc
import Modal from "./modal";

// Movement Editor (Modal) Component
// Props: Editor State (Contains which movement is being edited), Function to trigger a refresh, Toast Setter

const MovementEditor = ({ editor, setEditor, triggerFetch, setToast }) => {
  
  const [loading, setLoading] = useState(true);

  // Data
  const [name, setName] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [position, setPosition] = useState();

  // Delete Modal
  const [deleteMovementModalOpen, setDeleteMovementModalOpen] = useState(false);

  // Fetch movement
  async function fetchMovement() {
    setLoading(true);

    let { data: movement } = await supabase
      .from("movements")
      .select()
      .eq("id", editor);

    movement = movement[0];

    setName(movement.name);
    setSets(movement.sets);
    setReps(movement.reps);
    setWeight(movement.weight);
    setPosition(movement.position);
    setLoading(false);
  }

  // Delete Movement
  async function deleteMovement() {
    setLoading(true);

    const { error } = await supabase
      .from("movements")
      .delete()
      .eq("id", editor);
    if (error) {
      console.log(error);
    }
    setDeleteMovementModalOpen(false);
    setEditor(0);
    setLoading(false);
  }

  // Save and close
  async function saveMovement() {
    const { error } = await supabase
      .from("movements")
      .update({
        name: name,
        sets: sets,
        reps: reps,
        weight: weight,
        position: position,
      })
      .eq("id", editor);
    setEditor(0);
    triggerFetch();
  }

  // Onload, unless nothing is being edited
  useEffect(() => {
    if (editor != 0) {
      fetchMovement();
    }
  }, [editor]);

  // Logic for clicking outside to close
  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick, true);
  }, []);
  const modalRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (!modalRef?.current?.contains(e.target) && modalRef.current) {
      saveMovement();
    }
  };

  // Editormode
  useEffect(() => {
    if (editor != 0) {
      document.body.classList.add("editorMode");
    } else {
      document.body.classList.remove("editorMode");
    }
  }, [editor]);

  if (loading || editor == 0) return <></>;

  return (
    <>
      <Modal
        setOpen={setDeleteMovementModalOpen}
        open={deleteMovementModalOpen}
        title="Delete Movement"
        actionName="Delete"
        text=""
        isInput={false}
        inputLabel="Lift Title"
        func={deleteMovement}
        setToast={setToast}
      />

      <div className={styles.wrapper}>
        <div ref={modalRef} className={styles.inner}>
          <div className={styles.header}>
            <h1>
              <input
                value={name}
                size="14"
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </h1>
            <div className={styles.buttons}>
              <button onClick={() => setDeleteMovementModalOpen(true)}>
                {" "}
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
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
              <button onClick={saveMovement}>
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
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.inputs}>
            <div>
              <p>Sets:</p>
              <input
                value={sets}
                size="3"
                type="text"
                onChange={(e) => setSets(e.target.value)}
              />
            </div>
            <div>
              <p>Reps:</p>
              <input
                value={reps}
                size="3"
                type="text"
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div>
              <p>Weight:</p>
              <input
                value={weight}
                size="3"
                type="text"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <p>Position:</p>
              <input
                value={position}
                size="3"
                type="text"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovementEditor;
