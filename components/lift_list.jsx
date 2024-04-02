// Next
import Link from "next/link";

//Styles
import styles from "../styles/components/lift_list.module.css";

// Misc
import date from "@/lib/date";

// Lifts List Component
// Props: Lifts, Modal State

const LiftList = ({ lifts, setNewLiftModal, newLiftModal }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        style={lifts.length > 0 ? {} : { borderRadius: ".4em" }}
      >
        <p>All Lifts</p>
        <div onClick={() => setNewLiftModal(!newLiftModal)}>
          <p>New Lift</p>
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
            <path d="M9 12l6 0" />
            <path d="M12 9l0 6" />
            <path d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2m0 -5" />
          </svg>
        </div>
      </div>
      {lifts.map((lift) => {
        return (
          <Link
            href={"/lift/" + `${lift.id}`}
            className={styles.item}
            key={lift.id}
          >
            <div className={styles.itemleft}>
              <p>{lift.title}</p>
              <p>{date(lift.created_at)}</p>
            </div>
            <div className={styles.itemright}>
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
              <path d="M17 7l-10 10" />
              <path d="M8 7l9 0l0 9" />
            </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LiftList;
