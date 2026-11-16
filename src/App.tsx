import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "./app/routes";
import { HomePage } from "./pages/HomePage";
import { DonatePage } from "./events/sams-big-brain-run/pages/DonatePage";
import { TheRunPage } from "./events/sams-big-brain-run/pages/TheRunPage";
import { FollowPage } from "./events/sams-big-brain-run/pages/FollowPage";
import { RegistryPage } from "./events/sams-big-brain-run/pages/RegistryPage";
import { FaqPage } from "./events/sams-big-brain-run/pages/FaqPage";
import { GeorgiesStoryPage } from "./events/sams-big-brain-run/pages/GeorgiesStoryPage";
import { LiveDashboardPage } from "./events/sams-big-brain-run/pages/LiveDashboardPage";
import { NZMapUnderlay } from "./components/ui/NZMapUnderlay";
import { PageMetadata } from "./components/seo/PageMetadata";

function App() {
  const { pathname } = useLocation();
  // The campaign pages have their own full-bleed backgrounds, so the map underlay is home-page only.
  const showUnderlay = !pathname.startsWith(ROUTES.samsBigBrainRun);

  return (
    <>
      <PageMetadata pathname={pathname} />

      {/* Fixed map + trail */}
      {showUnderlay ? <NZMapUnderlay /> : null}

      {/* Content wrapper - establishes stacking context above the map */}
      <div className="app-content">
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.samsBigBrainRun} element={<DonatePage />} />
          <Route path={ROUTES.theRun} element={<TheRunPage />} />
          <Route path={ROUTES.follow} element={<FollowPage />} />
          <Route path={ROUTES.registry} element={<RegistryPage />} />
          <Route path={ROUTES.faq} element={<FaqPage />} />
          <Route path={ROUTES.georgiesStory} element={<GeorgiesStoryPage />} />
          <Route path={ROUTES.liveDashboard} element={<LiveDashboardPage />} />
          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
