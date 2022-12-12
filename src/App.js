import "./App.css";
import PaginatedTable from "./table/PaginatedTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <main className="container">
      <div className="wrapper">
        <PaginatedTable />
      </div>
    </main>
  );
}

export default App;
