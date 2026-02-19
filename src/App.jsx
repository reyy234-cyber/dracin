import React, { useContext, useState } from 'react';
import { PlatformProvider, PlatformContext } from './contexts/PlatformContext';
import { PLATFORMS } from './utils/api';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import UploaderPage from './pages/UploaderPage';
import AboutPage from './pages/AboutPage';

/**
 * Root component with providers and page routing.
 * Controls sidebar visibility and manages navigation.
 */
function AppWrapper() {
  return (
    <PlatformProvider>
      <App />
    </PlatformProvider>
  );
}

function App() {
  const { activePlatform, setActivePlatform } = useContext(PlatformContext);
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(null);

  const openDetail = (item) => {
    if (item.platform && item.platform !== activePlatform) {
      setActivePlatform(item.platform);
    }
    setDetailTarget(item);
    setPage('detail');
  };

  const pageTitle = (() => {
    switch (page) {
      case 'home':
        return PLATFORMS[activePlatform]?.name || 'Home';
      case 'search':
        return 'Search';
      case 'detail':
        return detailTarget?.title || 'Detail';
      case 'chat':
        return 'AI Chat';
      case 'history':
        return 'History';
      case 'uploader':
        return 'Uploader';
      case 'about':
        return 'About';
      default:
        return 'Streaming';
    }
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar title={pageTitle} onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(p) => {
          setPage(p);
          setSidebarOpen(false);
        }}
        onPlatformChange={(plat) => {
          setActivePlatform(plat);
          setPage('home');
          setSidebarOpen(false);
        }}
      />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <main className="flex-1 px-4 pt-4 pb-24">
        {page === 'home' && <HomePage onSelectItem={openDetail} />}
        {page === 'search' && <SearchPage onSelectItem={openDetail} />}
        {page === 'detail' && detailTarget && (
          <DetailPage item={detailTarget} />
        )}
        {page === 'chat' && <ChatPage />}
        {page === 'history' && <HistoryPage onSelectItem={openDetail} />}
        {page === 'uploader' && <UploaderPage />}
        {page === 'about' && <AboutPage />}
      </main>
    </div>
  );
}

export default AppWrapper;