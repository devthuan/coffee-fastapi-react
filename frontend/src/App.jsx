import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes, privateRoutes, adminRoutes } from "./routes/routes";
import AdminRoute from "./routes/adminRoutes";
import ClientRoutes from "./routes/clientRoutes";

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            }
            // Nếu người dùng đã đăng nhập, hiển thị tuyến đường riêng tư
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ClientRoutes>
                    <Layout>
                      <Page />
                    </Layout>
                  </ClientRoutes>
                }
              />
            );
          })}

          {adminRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            }
            // Nếu người dùng đã đăng nhập, hiển thị tuyến đường riêng tư
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AdminRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </AdminRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
