// React & Next
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Styles
import styles from "../../styles/id.module.css";

// Supabase
import supabase from "@/supabase/supabase";

// Misc
import Modal from "@/components/modal";
import MovementEditor from "@/components/movement_editor";
import MovementList from "@/components/movement_list";
import Helmet from "@/components/helmet";
import Loading from "@/components/loading";

// Lift View
// Props: Session and Toast Setter

const Id = ({ session, setToast }) => {
  // Router
  const router = useRouter();

  // Data
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);
  const [movements, setMovements] = useState();

  // Notes
  const [notes, setNotes] = useState("");
  let initialNotes = "";
  const [title, setTitle] = useState("");
  let initialTitle = "";

  // Movement editor
  const [editor, setEditor] = useState(0);
  // New movement modal
  const [newMovementModal, setNewMovementModal] = useState(false);
  // Delete lift modal
  const [deleteLiftModal, setDeleteLiftModal] = useState(false);

  // Get lift info
  async function fetchLift() {
    setLoadingA(true);
    const { data: lift } = await supabase
      .from("lifts")
      .select()
      .eq("id", router.query.id);

    if (lift == null) {
      router.push("/");
    } else {
      setTitle(lift[0].title);
      initialTitle = title;
      setNotes(lift[0].notes);
      initialNotes = notes;
      setLoadingA(false);
    }
  }

  // Get list of movements
  async function fetchMovements() {
    setLoadingB(true);
    const { data: movements } = await supabase
      .from("movements")
      .select()
      .eq("lift_id", router.query.id)
      .order("position");

    if (movements == null) {
      router.push("/");
    } else {
      setMovements(movements);
      setLoadingB(false);
    }
  }

  // Trigger fetch after editor closes
  async function triggerFetch() {
    setLoadingB(true);
    const { data: newMovements } = await supabase
      .from("movements")
      .select()
      .eq("lift_id", router.query.id)
      .order("position");

    if (newMovements == null) {
      router.push("/");
    } else {
      setMovements(newMovements);
      setLoadingB(false);
    }
  }

  // Save and close lift
  async function saveLift() {
    if (notes != initialNotes || title != initialTitle) {
      const { error } = await supabase
        .from("lifts")
        .update({
          title: title == "" ? "Lift Title" : title,
          notes: notes,
        })
        .eq("id", router.query.id);
    }
    router.push("/");
  }

  // Save title and notes
  async function saveTitleAndNotes() {
    if (notes != initialNotes || title != initialTitle) {
      const { error } = await supabase
        .from("lifts")
        .update({
          title: title,
          notes: notes,
        })
        .eq("id", router.query.id);
    }
  }

  // Create movement
  async function newMovement(name) {
    const { data: error } = await supabase.from("movements").insert({
      name: name,
      lift_id: router.query.id,
      owner: session.user.id,
      sets: "3",
      reps: "12",
      weight: "100",
      position: movements.length + 1,
    });
    if (error) {
      console.log(error);
    }
    fetchMovements();
  }

  // Delete lift
  async function deleteLift() {
    setLoadingA(true);
    const { error } = await supabase
      .from("lifts")
      .delete()
      .eq("id", router.query.id);
    if (error) {
      console.log(error);
    }
    router.push("/");
  }

  // On load
  useEffect(() => {
    fetchLift();
    fetchMovements();
  }, []);

  if (loadingA || loadingB) return <Loading />;

  return (
    <>
      <Modal
        setOpen={setNewMovementModal}
        open={newMovementModal}
        title="New Movement"
        actionName="Create"
        text=""
        isInput={true}
        inputLabel="Movement Name"
        func={newMovement}
        setToast={setToast}
      />
      <Modal
        setOpen={setDeleteLiftModal}
        open={deleteLiftModal}
        title="Delete Lift"
        actionName="Delete"
        isInput={false}
        inputLabel=""
        func={deleteLift}
        setToast={setToast}
      />
      <MovementEditor
        editor={editor}
        setEditor={setEditor}
        triggerFetch={triggerFetch}
        setToast={setToast}
      />

      <Helmet title={title} />

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>
            <input
              onBlur={saveTitleAndNotes}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </h1>
          <div>
            <button onClick={saveLift}>
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
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </button>
            <button onClick={() => setDeleteLiftModal(true)}>
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
          </div>
        </div>

        <MovementList
          newMovementModal={newMovementModal}
          setNewMovementModal={setNewMovementModal}
          liftId={router.query.id}
          setEditor={setEditor}
          movements={movements}
          title={"Movements"}
          isId={true}
        />

        <div className={styles.notes}>
          <p>Notes</p>
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder="For miscellaneous information"
            onBlur={saveTitleAndNotes}
          ></textarea>
        </div>

      </div>
    </>
  );
};

export default Id;
