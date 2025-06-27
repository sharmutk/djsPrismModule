// See our note on managing configuration - https://djs.deshaw.com/projects/djs-dev-tools/master/docs/advanced-usage/configuration
const path = require('path');
const convict = require('convict');
const {environments} = require('@deshaw/djs-utils');
const _ = require('lodash');
const json5 = require('json5');

const debug = require('debug')('configReader');

// Human readable JSON
convict.addParser({extension: 'json5', parse: json5.parse});

// Define a schema
const conf = convict({
    nodeEnv: {
        doc: 'The application environment.',
        format: environments.ALL_ENVS,
        default: environments.DEVELOPMENT,
        env: 'NODE_ENV',
    },
    server: {
        doc: 'The server configuration object',
        default: {},
        format: Object,
    },
    node: {
        doc: 'Options we want to have in node',
        default: {},
        format: Object,
    },
    desflowRequestConfig: {
        desflowHost: {
            doc: 'DESFlow host name',
            format: String,
            default: undefined,
        },
        ba: {
            doc: 'DESFlow business area',
            format: String,
            default: undefined,
        },
        category: {
            doc: 'DESFlow category',
            format: String,
            default: undefined,
        },
    },
});

// Load environment dependent configuration
const env = conf.get('nodeEnv');
const file = path.resolve(__dirname, 'env', `${env}.json5`);
conf.loadFile(file);

// Perform validation
conf.validate();

/**
 * A function that should return a {SERVER_CONFIG} object
 * this function should be named getServerConfig for it to
 * be picked correctly when you want to generate configuration at runtime using djs-start-app --generate-config
 */
function getServerConfig() {
    const properties = conf.getProperties();
    const serverConfig = _.assign({}, {nodeEnv: properties.nodeEnv}, _.get(properties, ['server']));
    debug('Server config is %O', serverConfig);
    return serverConfig;
}

module.exports = {
    properties: conf.getProperties(),
    getServerConfig,
};
