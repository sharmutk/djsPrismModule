import {expect} from 'chai';
import TestRenderer from 'react-test-renderer';
import {DJSThemeProvider} from '@deshaw/djs-gravity-ui';
import About from '../../../src/client/components/routes/About';

/**
 * Refer React Test Renderer documentation https://reactjs.org/docs/test-renderer.html
 */
describe('About Page', () => {
    it('Should render About page with the correct class name', () => {
        const testRenderer = TestRenderer.create(
            <DJSThemeProvider>
                <About />
            </DJSThemeProvider>
        );
        const testInstance = testRenderer.root;
        /* eslint-disable no-unused-expressions */
        // The root of the About page should be a Grid container. Instead of asserting
        // on a generated CSS class that can change between MUI releases, assert on
        // the presence of a component with the `container` prop.
        expect(
            testInstance.findAllByProps({
                container: true,
            }).length,
            'Should render a Grid container'
        ).to.be.greaterThan(0);
    });
});
