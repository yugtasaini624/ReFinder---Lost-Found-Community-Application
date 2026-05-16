import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

import AdminDashboard from './pages/AdminDashboard';
import ManageUser from './pages/ManageUser';
import ManageLostItems from './pages/ManageLostItems';
import ManageFoundItems from './pages/ManageFoundItems';
import AdminStatistics from './pages/AdminStatistics';
import AdminSuccessStories from './pages/AdminSuccessStories';

import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminAuth from './components/AdminAuth';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <div className="App">

      <Routes>
        <Route path='/admin-auth' element={<AdminAuth />} />

        <Route
          path='/'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <AdminDashboard />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path='/admin/manageusers'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <ManageUser />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path='/admin/lost-items'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <ManageLostItems />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path='/admin/found-items'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <ManageFoundItems />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path='/admin/statistics'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <AdminStatistics />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path='/admin/story'
          element={
            <ProtectedAdminRoute>
              <>
                <Header toggleSidebar={toggleSidebar} />
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <AdminSuccessStories />
                <Footer />
              </>
            </ProtectedAdminRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;