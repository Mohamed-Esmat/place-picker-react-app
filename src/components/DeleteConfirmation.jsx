import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  function handleCancel() {
    clearTimeout(timerRef.current); // Clear the timeout when the user clicks "No"
    onCancel(); // call the parent-provided cancel handler
  }

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={handleCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
