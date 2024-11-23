import { useState } from 'react';
import { Button } from '../components/Button';
import { TrieProvider } from '../context/TrieContext';
import { Manage } from './pages/Manage';
import { Options } from './pages/Options';

type Page = 'index' | 'options';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('index');

  const handleClick = (page: Page) => () => {
    setCurrentPage(page);
  };

  const isActive = (page: Page) => page === currentPage;

  return (
    <TrieProvider>
      <section>
        <div className="p-4 text-lg">
          <Button variant={isActive('index') ? 'default' : 'white'} inline onClick={handleClick('index')}>
            manage
          </Button>
          <span> / </span>
          <Button variant={isActive('options') ? 'default' : 'white'} inline onClick={handleClick('options')}>
            options
          </Button>
        </div>

        {currentPage === 'index' ? <Manage /> : currentPage === 'options' ? <Options /> : null}
      </section>
    </TrieProvider>
  );
}
