import { useEffect, useState } from "react";
import api from "../api";

export default function DemoList({ refresh, onOutcomeUpdated }) {
  const [demos, setDemos] = useState([]);

  useEffect(() => {
    fetchDemos();
  }, [refresh]);

  const fetchDemos = async () => {
    try {
      const res = await api.get("/demos");
      setDemos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOutcome = async (demo_id, outcome) => {
    try {
      await api.post("/demos/outcome", {
        demo_id,
        outcome,
      });
      onOutcomeUpdated();
    } catch (err) {
      alert("Failed to update outcome");
      console.error(err);
    }
  };
  

  return (
    <div className="actions">
      <h2>Demos</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Lead</th>
            <th>Teacher</th>
            <th>Scheduled At</th>
            <th>Outcome</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demos.map((demo) => (
            <tr key={demo.id}>
              <td>{demo.id}</td>
              <td>{demo.lead.parent_name}</td>
              <td>{demo.teacher_name}</td>
              <td>{new Date(demo.scheduled_datetime).toLocaleString()}</td>
              <td>{demo.outcome || "PENDING"}</td>
              <td>
                <button onClick={() => updateOutcome(demo.id, "COMPLETED")}>
                  Completed
                </button>
                <button onClick={() => updateOutcome(demo.id, "NO_SHOW")}>
                  No-show
                </button>
                <button onClick={() => updateOutcome(demo.id, "CONVERTED")}>
                  Converted
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
