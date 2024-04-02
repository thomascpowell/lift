// Styles
import styles from "../styles/history.module.css";

// Supabase
import supabase from "@/supabase/supabase";

// React
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Misc
import Nav from "@/components/nav";
import Helmet from "@/components/helmet";
import Loading from "@/components/loading";
import MovementEditor from "@/components/movement_editor";
import MovementList from "@/components/movement_list";

// History View

const History = ({ session, setToast }) => {
  // Router
  const router = useRouter();

  // State
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState([]);

  // Movement editor
  const [editor, setEditor] = useState(0);

  // Fetch movements
  async function fetchMovements() {
    setLoading(true);
    const { data: data } = await supabase
      .from("movements")
      .select("*")
      .order("name", { ascending: true })
      .order("id", { ascending: false });

    if (data[0] == null) {
      return [];
    }

    let previous = data[0].name;
    let type = [];
    let all = [];

    // Sort movments into arrays of same name
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == previous) {
        type.push(data[i]);
      } else {
        previous = data[i].name;
        all.push(type);
        type = [data[i]];
      }
    }
    if (type.length != 0) all.push(type);

    setMovements(all);
    setLoading(false);
  }

  // On load
  useEffect(() => {
    fetchMovements();
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
      <MovementEditor
        editor={editor}
        setEditor={setEditor}
        triggerFetch={fetchMovements}
        setToast={setToast}
      />

      <Helmet title="Movement History" />
      <div className={styles.wrapper}>
        <Nav />

        <div className={styles.search}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search movements..."
          />
        </div>
        {movements.map((list) => {
          if (list[0].name.toLowerCase().includes(search)) {
            return (
              <MovementList
                title={list[0].name}
                movements={list}
                setEditor={setEditor}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default History;
