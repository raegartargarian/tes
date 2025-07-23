// App.tsx
import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./containers/home/loadable";
import AuthModal from "./shared/components/AuthModal";
import PageLayout from "./shared/components/PageLayOut";
import ScrollToTop from "./shared/components/ScrollToTop";
import { appRoutes } from "./shared/constants/routes";

function App() {
  useEffect(() => {
    // add the class u-bg to the html element
    document.documentElement.classList.add("u-bg");
  }, []);

  return (
    <HashRouter>
      <AuthModal />
      <ScrollToTop />

      <Routes>
        {/* Home Route */}
        <Route
          path={appRoutes.dashboard.path}
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          }
          index
        />

        {/* Keep existing routes */}
        <Route
          path={appRoutes.attachments.path}
          element={
            <PageLayout>
              <HomePage />
            </PageLayout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
