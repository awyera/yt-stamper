import { Link, Route, Switch } from 'wouter';
import { Manage } from './pages/Manage';
import { Options } from './pages/Options';

export function App() {
  return (
    <section>
      <div className="p-4 text-lg">
        <Link className={(active) => (active ? 'text-blue-500' : 'text-black')} to="/options.html">
          options
        </Link>
        <span> / </span>
        <Link className={(active) => (active ? 'text-blue-500' : 'text-black')} to="/manage">
          manage
        </Link>
      </div>

      <Switch>
        <Route path="/options.html">
          <Options />
        </Route>

        <Route path="/manage">
          <Manage />
        </Route>
      </Switch>
    </section>
  );
}
