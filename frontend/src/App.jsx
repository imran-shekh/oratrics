import { useState } from "react";
import LeadsTable from "./components/LeadsTable";
import CreateLeadForm from "./components/CreateLeadForm";
import ScheduleDemoForm from "./components/ScheduleDemoForm";
import DashboardMetrics from "./components/DashboardMetrics";
import DemoList from "./components/DemoList";
import Navbar from "./components/Navbar";


function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1>Oratrics Internal Dashboard</h1>

      <DashboardMetrics refresh={refresh} />

      <h2>Create Lead</h2>
      <CreateLeadForm onLeadCreated={() => setRefresh(!refresh)} />

      <h2>Schedule Demo</h2>
      <ScheduleDemoForm onDemoScheduled={() => setRefresh(!refresh)} />
        <DemoList
            refresh={refresh}
            onOutcomeUpdated={() => setRefresh(!refresh)}
          />

      <h2>Leads</h2>
      <LeadsTable key={refresh} />
    </div>

    </>
  );
}

export default App;
