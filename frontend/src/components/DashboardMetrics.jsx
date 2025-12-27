import { useEffect, useState } from "react";
import api from "../api";

export default function DashboardMetrics({ refresh }) {
  const [metrics, setMetrics] = useState({
    totalDemos: 0,
    converted: 0,
    noShows: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, [refresh]);

  const fetchMetrics = async () => {
    try {
      const res = await api.get("/dashboard/metrics");
      setMetrics(res.data);
    } catch (err) {
      console.error("Failed to load metrics", err);
    }
  };

  return (
    <div className="metrics">
      <div className="metric"><strong>Total Demos: {metrics.totalDemos}</strong></div>
      <div className="metric"><strong>Converted: {metrics.converted}</strong></div>
      <div className="metric"><strong>No Shows: {metrics.noShows}</strong></div>
    </div>
  );
}
{/* <div className="metrics">
  <div className="metric">Total Demos<br /><strong>{total}</strong></div>
  <div className="metric">Converted<br /><strong>{converted}</strong></div>
  <div className="metric">No Shows<br /><strong>{noShows}</strong></div>
</div> */}


const cardStyle = {
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  minWidth: "150px",
  textAlign: "center",
  fontWeight: "bold",
};
