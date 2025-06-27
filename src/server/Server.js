import path from 'path';
import {server} from '@deshaw/djs-app';
import {getLogger, loggingUtilities} from '@deshaw/djs-logger';
import {restrictAccess, assets} from '@deshaw/djs-server';
import _ from 'lodash';
import {properties} from '../../config/configReader';
import * as loggingTypes from '../shared/consts/logMsgTypes';

/**
 * Very trivial DJS AppServer.
 * @class ExampleServer
 */
export default class Server extends server.AppServer {
    constructor(options) {
        // Creating options for server, passing dist directory and application specific reducers
        const extendedOptions = {
            djsServerOptions: {
                name: 'djs-practise-app',
                ...(properties.node?.djsServerOptions ?? {}),
            },
            adminAuth: [],
            desflowRequestConfig: properties.desflowRequestConfig,
            distdir: path.resolve('dist'),
            log: {
                usage: {
                    logToSQL: true,
                },
            },
        };

        // Merging extended options with default options
        const mergedOptions = _.merge(options, extendedOptions);
        super(mergedOptions);
        this._createIndexRoute();
        /**
         * We use a SQL based logger
         * Refer https://github.deshaw.com/djs/djs-logger/blob/master/guides/usage-logger.md
         */
        this.appLogger = getLogger(loggingTypes.MODULE_NAME);
        loggingUtilities.logInit(this.appLogger, loggingTypes.LOG_VERSION, {}, 'Creating File Server');
        // Uncomment me to view the tree on change
        // this.store.subscribe(() => console.log(JSON.stringify(this.store.getState().server.toJS(), undefined, 2)));
    }

    // Creates routes for the application
    _createIndexRoute() {
        /* Getting the username from request object and passing to the
       client side  so that it is available on the client on page load
     */
        this.app.get('*', restrictAccess.restrictByCookie(), (req, res) => {
            const clientInitialState = {
                username: req.user.username,
            };
            const reduxState = escape(
                JSON.stringify({
                    clientInitialState,
                })
            );
            res.render('index', {
                assets,
                reduxState,
            });
        });
    }
}
