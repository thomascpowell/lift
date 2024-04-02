// Styles
import styles from "../styles/components/movement_list.module.css";

// React
import { useRouter } from "next/router";

// Misc
import date from "@/lib/date";

// Reusable list of movements
// Props: Movements (To be displayed), Title, New Movement State

const MovementList = ({
  movements,
  title,
  setNewMovementModal,
  newMovementModal,
  setEditor,
  isId
}) => {

  // Router
  const router = useRouter();

  // Handle click on movment
  function handleClick(movementId) {
    if (setEditor) setEditor(movementId);
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        style={movements.length > 0 ? {} : { borderRadius: ".4em" }}
      >
        <p>{title}</p>
        {!isId ? (
          ""
        ) : (
          <div onClick={() => setNewMovementModal(!newMovementModal)}>
            <p>New Movement</p>
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
        )}
      </div>
      {movements.map((movement) => {
        return (
          <div
            key={movement.id}
            onClick={() => handleClick(movement.id)}
            className={styles.item}
          >
            <div className={styles.itemleft}>
              <p>
                {
                  (isId) ? <>#{movement.position} – {movement.name} </> : <>{date(movement.created_at)} </>
                }
              </p>
              <p>
                {movement.sets} x {movement.reps}
              </p>
            </div>
            <div className={styles.itemright}>
              <div>
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
                  <path d="M3 3m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
                  <path d="M12 7c1.956 0 3.724 .802 5 2.095l-2.956 2.904a3 3 0 0 0 -2.038 -.799a3 3 0 0 0 -2.038 .798l-2.956 -2.903a6.979 6.979 0 0 1 5 -2.095z" />
                </svg>
                <p>{movement.weight}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovementList;
