import _debug from 'debug';
import {client} from '@deshaw/djs-app';
import {getLogger, loggingUtilities} from '@deshaw/djs-logger';
import * as logMsgTypes from '../shared/consts/logMsgTypes';
import counterReducer from './redux/counter';

/**
 * Initialize AppClient instance
 */
const debug = _debug('djs-practise-app:app');
debug('Starting app');
const {
    clientInitialState: {username},
} = JSON.parse(unescape(window.__INITIAL_REDUX_STATE__));

/**
 * Create a basic app
 */
const app = new client.AppClient({
    appName: 'djs-practise-app',
    appReducers: {
        sampleReducer: counterReducer,
        currentUser: () => username,
    },
});
const appLogger = getLogger(logMsgTypes.MODULE_NAME);
loggingUtilities.logInit(appLogger, logMsgTypes.LOG_VERSION, {}, 'Creating djs-practise-app client');
export default app;
