// React & Next
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Styles
import styles from "../styles/index.module.css";

// Supabase
import supabase from "@/supabase/supabase";

// Misc
import Nav from "@/components/nav";
import Helmet from "@/components/helmet";
import Loading from "@/components/loading";
import Modal from "@/components/modal";
import LiftList from "@/components/lift_list";

// Lifts View
// Props: Session and Toast Setter

const Index = ({ session, setToast }) => {
  // Router
  const router = useRouter();

  // Data
  const [loading, setLoading] = useState(true);
  const [lifts, setLifts] = useState();

  // Modal
  const [newLiftModal, setNewLiftModal] = useState(false);

  // Get lifts
  async function fetchLifts() {
    setLoading(true);
    const { data: lifts } = await supabase
      .from("lifts")
      .select()
      .order("id", { ascending: false });
    setLifts(lifts);
    setLoading(false);
  }

  // Create lift
  async function newLift(title) {
    const { data: error } = await supabase.from("lifts").insert({
      title: title == null ? "Title" : title,
      notes: "",
      owner: session.user.id,
    });
    if (error) {
      console.log(error);
    }
    fetchLifts();
  }

  // On load
  useEffect(() => {
    fetchLifts();
  }, []);

  if (loading)
    return (
      <>
        <Nav /> <Loading />
      </>
    );

  if (!session) {
    router?.push("/auth");
  }

  return (
    <>
      <Helmet title="All Lifts" />
      <Modal
        setOpen={setNewLiftModal}
        open={newLiftModal}
        title="New Lift"
        actionName="Create"
        text=""
        isInput={true}
        inputLabel="Lift Title"
        func={newLift}
        setToast={setToast}
      />

      <div className={styles.wrapper}>
        <Nav setToast={setToast} />
        <LiftList
          setNewLiftModal={setNewLiftModal}
          newLiftModal={newLiftModal}
          lifts={lifts}
        />
      </div>
    </>
  );
};

export default Index;
