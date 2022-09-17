import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountPage from "./Components/AccountPage";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import Navbar from "./Components/Navbar";
import ProjectBoard from "./Components/ProjectBoard";
import { ME } from "./graphql/queries/user";

function App() {
  const { data: user, loading } = useQuery(ME);

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden ">
      <Router>
        {user?.me && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={<Home user={user} userLoading={loading} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectBoard user={user} userLoading={loading} />}
          />
          <Route
            path="/account"
            element={<AccountPage user={user} userLoading={loading} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
