import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HistoryRouter as ConnectedRouter} from 'redux-first-history/rr6';
import PropTypes from 'prop-types';
import {hot} from '@deshaw/djs-app';
import AppLayout from './AppLayout';

/**
 * To improve performance, things that are currently needed by the user are lazy-loaded using Code Splitting
 * Refer Route-based code splitting documentation https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
 */
const Home = lazy(() => import('../routes/Home'));
const About = lazy(() => import('../routes/About'));
const Analytics = lazy(() => import('../routes/Analytics'));
const PriceData = lazy(() => import('../routes/PriceData'));

/**
 * Top level Application Routes
 * React Router is being used for routing, refer React Router documentation https://reactrouter.com/docs/en/v6
 */
const AppRouterInner = ({history}) => (
    <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
            <AppLayout>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/price-data" element={<PriceData />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </AppLayout>
        </Suspense>
    </ConnectedRouter>
);
AppRouterInner.propTypes = {
    history: PropTypes.any.isRequired,
};
const AppRouter = hot(module)(AppRouterInner);
export default AppRouter;
