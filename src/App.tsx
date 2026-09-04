import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "./app/routes";
import { HomePage } from "./pages/HomePage";
import { SamsBigBrainRunPage } from "./events/sams-big-brain-run/SamsBigBrainRunPage";
import { GeorgiesStoryPage } from "./events/sams-big-brain-run/GeorgiesStoryPage";
import { NZMapUnderlay } from "./components/ui/NZMapUnderlay";
import { PageMetadata } from "./components/seo/PageMetadata";

function App() {
  const { pathname } = useLocation();
  const showUnderlay = !pathname.includes("georgies-story");

  return (
    <>
      <PageMetadata pathname={pathname} />

      {/* Fixed map + trail - hidden on Big Brain 2 run routes */}
      {showUnderlay ? <NZMapUnderlay /> : null}

      {/* Content wrapper - establishes stacking context above the map */}
      <div className="app-content">
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.samsBigBrainRun} element={<SamsBigBrainRunPage />} />
          <Route path={ROUTES.georgiesStory} element={<GeorgiesStoryPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
