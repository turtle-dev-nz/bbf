import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
import { HomePage } from "./pages/HomePage";
import { SamsBigBrainRunPage } from "./events/sams-big-brain-run/SamsBigBrainRunPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.samBigBrainRun} element={<SamsBigBrainRunPage />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}

export default App;
