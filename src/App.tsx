import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
import { HomePage } from "./pages/HomePage";
import { SamsBigBrainRunPage } from "./events/sams-big-brain-run/SamsBigBrainRunPage";
import { BigBrain2Page } from "./events/big-brain-2/BigBrain2Page";
import { GeorgiesStoryPage } from "./events/big-brain-2/GeorgiesStoryPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.samBigBrainRun} element={<SamsBigBrainRunPage />} />
      <Route path={ROUTES.bigBrain2} element={<BigBrain2Page />} />
      <Route path={ROUTES.georgiesStory} element={<GeorgiesStoryPage />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}

export default App;
