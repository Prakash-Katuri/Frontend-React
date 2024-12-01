import Layout from "./Layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
