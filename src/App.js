import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes/>}/>
          <Route path="/admin/*" element={<AdminRoutes/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
