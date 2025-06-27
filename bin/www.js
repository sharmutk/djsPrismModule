const startServer = require('@deshaw/djs-app').startServer;
const Server = require('../dist/server/Server').default;

const usage = {
    title: 'djs-practise-app',
    description: 'Everyone Wants a Webapp'
};

startServer(Server, usage, __dirname);
