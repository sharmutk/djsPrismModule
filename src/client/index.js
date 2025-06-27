import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import AppRouter from './components/app/AppRouter';
import app from './app';

/**
 * Render react to a node named 'app' in index.html
 */
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={app.store}>
        <AppRouter history={app.history} />
    </Provider>
);
