import {expect} from 'chai';
import counterReducer, {incrementCount} from '../../../src/client/redux/counter';

/**
 * Refer Chai(assertion library) documentation https://www.chaijs.com/ and mocha (test runner) documentation https://mochajs.org/ for writing tests.
 */
describe('Counter Reducer', () => {
    it('Can increment count', () => {
        // Initial state should be 1.
        let state = counterReducer(undefined, {});
        expect(state.count).to.eql(1);
        // incrementCount should default to increase by 1.
        state = counterReducer(state, incrementCount(1));
        expect(state.count).to.eql(2);
        state = counterReducer(state, incrementCount(1));
        expect(state.count).to.eql(3);
        // Supply custom payload.
        state = counterReducer(state, incrementCount(5));
        expect(state.count).to.eql(8);
    });
});
