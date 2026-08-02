import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
import { HomePage } from "./pages/HomePage";
import { SamsBigBrainRunPage } from "./events/sams-big-brain-run/SamsBigBrainRunPage";
import { BigBrain2Page } from "./events/big-brain-2/BigBrain2Page";
import { GeorgiesStoryPage } from "./events/big-brain-2/GeorgiesStoryPage";
import { NZMapUnderlay } from "./components/ui/NZMapUnderlay";

function App() {
  return (
    <>
      {/* Fixed map + trail — sits beneath all page content (z-index 0) */}
      <NZMapUnderlay />

      {/* Content wrapper — establishes stacking context above the map */}
      <div className="app-content">
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          {/* <Route path={ROUTES.samBigBrainRun} element={<SamsBigBrainRunPage />} /> */}
          <Route path={ROUTES.bigBrain2} element={<BigBrain2Page />} />
          <Route path={ROUTES.georgiesStory} element={<GeorgiesStoryPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
