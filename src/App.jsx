import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

import { userRoutes } from "./Routes/Routes"; // импорт твоих массивов маршрутов

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route element={<MainLayout />}>
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
