import {useCallback} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import T from 'prop-types';
import {
    DJSBox,
    DJSButton,
    DJSContainer,
    DJSIconWrapper,
    DJSLink,
    DJSList,
    DJSTypography,
    styled,
} from '@deshaw/djs-gravity-ui';
import {ThumbsUpSolidIcon as ThumbsUpIcon} from '@deshaw/djs-icons';
import {getUsageLogger, VERBS} from '@deshaw/djs-logger';
import {incrementCount} from '../../redux/counter';
/**
 * Refer https://github.deshaw.com/djs/djs-logger/blob/master/guides/usage-logging-guideline.md for usage logging guidelines
 */
const usageLogger = getUsageLogger();
const StyledContainer = styled(DJSContainer)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
});
const StyledBox = styled(DJSBox)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    paddingBottom: '30px',
});
const StyledContentBox = styled(DJSBox)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '46px',
    backgroundColor: 'white',
    width: '50%',
    padding: '32px',
});
const StyledListBox = styled(DJSBox)({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '16px',
});
const StyledLink = styled(DJSLink)({
    marginRight: '4px',
    marginLeft: '4px',
});
const StyledTypography = styled(DJSTypography)({
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4px',
});
const LinkComponent = ({hrefLink, hrefText, content}) => {
    return (
        <StyledListBox>
            <StyledLink underline="none" href={hrefLink} target="_blank" rel="noreferrer">
                <DJSTypography fontSize="12px">{hrefText}</DJSTypography>
            </StyledLink>
            <DJSTypography fontSize="12px">{content}</DJSTypography>
        </StyledListBox>
    );
};
const contentLinks = [
    {
        hrefLink: 'https://redux.js.org/introduction/getting-started',
        hrefText: 'Redux',
        content: ' to act as a predictive state container.',
    },
    {
        hrefLink: 'https://webpack.js.org/',
        hrefText: 'Webpack',
        content: ' to serve as a static module bundler.',
    },
    {
        hrefLink: 'https://reactrouter.com/',
        hrefText: 'React Router',
        content: ' for client and server-side routing.',
    },
];

/**
 * A simple Home Component
 */
export const HomeComponent = ({count, onIncrement}) => {
    const heading = 'Welcome to DJS!';
    const onIncrementClick = useCallback(() => {
        usageLogger.log({
            verb: VERBS.CLICK,
            target: 'Like Counter',
            path: ['Home'],
        });
        onIncrement();
    }, [onIncrement]);
    return (
        <StyledContainer>
            <StyledBox>
                <img src="//cdn/djs/@deshaw/djs-styles/latest/images/djs/djs-logo-128X128.png" alt="djs-logo" />
            </StyledBox>
            <StyledContentBox>
                <DJSTypography
                    sx={{
                        marginBottom: '32px',
                    }}
                    alignSelf="center"
                    variant="h3"
                >
                    {heading}
                </DJSTypography>
                <StyledTypography fontSize="12px">
                    This is a full-stack DJS application based on
                    <StyledLink
                        underline="none"
                        href="https://www.mongodb.com/mern-stack"
                        target="_blank"
                        rel="noreferrer"
                    >
                        MERN
                    </StyledLink>
                    stack. Some of the other major technologies used to brew the application are :
                </StyledTypography>
                <DJSList>
                    {_.map(contentLinks, (contentLink) => {
                        const {hrefLink, hrefText, content} = contentLink;
                        return (
                            <LinkComponent hrefLink={hrefLink} hrefText={hrefText} content={content} key={hrefText} />
                        );
                    })}
                </DJSList>
            </StyledContentBox>
            <DJSLink
                fontSize="16px"
                underline="none"
                rel="noreferrer"
                target="_blank"
                href="https://djs.deshaw.com/learn/getting-started/quick-setup"
            >
                Learn more about the application
            </DJSLink>
            <DJSBox
                sx={{
                    padding: '16px',
                }}
            >
                <DJSButton onClick={onIncrementClick}>
                    <DJSIconWrapper djsIcon={ThumbsUpIcon} />
                    <DJSBox>{count}</DJSBox>
                </DJSButton>
            </DJSBox>
        </StyledContainer>
    );
};
LinkComponent.propTypes = {
    hrefLink: T.string.isRequired,
    hrefText: T.string.isRequired,
    content: T.string.isRequired,
};
HomeComponent.propTypes = {
    count: T.number.isRequired,
    onIncrement: T.func.isRequired,
};
const Home = connect(
    (state) => ({
        count: _.get(state, ['app', 'sampleReducer', 'count']),
    }),
    (dispatch) => ({
        onIncrement: () => dispatch(incrementCount(1)),
    })
)(HomeComponent);
export default Home;
