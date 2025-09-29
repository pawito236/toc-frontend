import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AnimeDetailPage } from './pages/AnimeDetailPage';

type AppState = 
  | { type: 'home' }
  | { type: 'detail'; animeId: number };

function App() {
  const [state, setState] = useState<AppState>({ type: 'home' });

  const handleAnimeClick = (animeId: number) => {
    setState({ type: 'detail', animeId });
  };

  const handleHomeClick = () => {
    setState({ type: 'home' });
  };

  const handleBackClick = () => {
    setState({ type: 'home' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onHomeClick={handleHomeClick}
        onSearchResultClick={handleAnimeClick}
        onBackClick={state.type === 'detail' ? handleBackClick : undefined}
        showBackButton={state.type === 'detail'}
        title={state.type === 'detail' ? 'Anime Details' : 'Anime Explorer'}
      />

      <main>
        {state.type === 'home' && (
          <HomePage onAnimeClick={handleAnimeClick} />
        )}
        
        {state.type === 'detail' && (
          <AnimeDetailPage
            animeId={state.animeId}
            onAnimeClick={handleAnimeClick}
          />
        )}
      </main>
    </div>
  );
}

export default App;