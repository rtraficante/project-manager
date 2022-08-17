import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/Navbar";
import ProjectBoard from "./Components/ProjectBoard";
import { ME } from "./graphql/queries/user";

function App() {
  const { data: user } = useQuery(ME);

  return (
    <div className="w-full h-screen overflow-hidden ">
      <Router>
        {user?.me && <Navbar />}
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectBoard user={user} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
