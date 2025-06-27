import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import T from 'prop-types';
import {HomeIcon, ActiveIcon} from '@deshaw/djs-icons/old-design';
import {BarChartIcon} from '@deshaw/djs-icons';
import {DJSLayoutRoot, DJSBorderLayout, DJSLayoutPanel} from '@deshaw/djs-ui-components';
import {
    DJSAvatar,
    DJSBox,
    DJSIconWrapper,
    DJSScopedCssBaseline,
    DJSTab,
    DJSTabContext,
    DJSTabs,
    DJSThemeProvider,
    styled,
} from '@deshaw/djs-gravity-ui';
/**
 * Refer https://djs.deshaw.com/storybook/djs--djs-gravity-ui?version=master&path=%2Fdocs%2Fcustomization-styling-components--1-styled to create styled components
 */
const StyledIconWrapper = styled(DJSIconWrapper)({
    verticalAlign: 'middle',
    fontSize: 'large',
});
const StyledBox = styled(DJSBox)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.secondary.dark,
    height: '100%',
}));
const StyledTabs = styled(DJSTabs)({
    '& .MuiTabs-indicator': {
        background: '#69CDEC',
    },
});
const StyledTab = styled(DJSTab)(({theme}) => ({
    border: '0px',
    color: theme.palette.primary.contrastText,
    height: '40px',
    '&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        fontWeight: theme.typography.fontWeightMedium,
        background: theme.palette.primary.main,
        '&:focus': {
            outline: 'none',
        },
        '&:hover': {
            background: theme.palette.secondary.light,
        },
    },
    ':not(.Mui-selected)': {
        '&:hover': {
            background: theme.palette.secondary.light,
        },
    },
    '&:hover': {
        color: theme.palette.primary.contrastText,
        background: theme.palette.secondary.light,
    },
    '.MuiSvgIcon-root:not(.MuiTab-closeButton)': {
        fontSize: '20px',
    },
    '&:focus': {
        outlineWidth: '0px',
    },
}));
const StyledAvatarBox = styled(DJSBox)({
    position: 'fixed',
    right: '10px',
    verticalAlign: 'middle',
    top: '0.5%',
    height: '100%',
});

/**
 * Container component which presents a navigation bar and top level layout
 */
const AppLayoutComponent = ({children, username}) => {
    const location = useLocation();
    const [tab, setTab] = useState(location.pathname);
    const onTabChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <DJSThemeProvider htmlFontSize={10} themePreset="legacy">
            <DJSScopedCssBaseline>
                <DJSLayoutRoot>
                    <DJSBorderLayout pack>
                        <DJSLayoutPanel orientation="top" size="40" key="header">
                            <StyledBox>
                                <DJSTabContext value={tab}>
                                    <StyledTabs onChange={onTabChange}>
                                        <StyledTab
                                            label="Home"
                                            value="/"
                                            icon={<StyledIconWrapper djsIcon={HomeIcon} />}
                                            component={Link}
                                            to="/"
                                        />
                                        <StyledTab
                                            label="About"
                                            value="/about"
                                            icon={<StyledIconWrapper djsIcon={ActiveIcon} />}
                                            component={Link}
                                            to="/about"
                                        />
                                        <StyledTab
                                            label="Analytics"
                                            value="/analytics"
                                            icon={<BarChartIcon size="sm" />}
                                            component={Link}
                                            to="/analytics"
                                        />
                                        <StyledTab
                                            label="Price Data"
                                            value="/price-data"
                                            icon={<BarChartIcon size="sm" />}
                                            component={Link}
                                            to="/price-data"
                                        />
                                    </StyledTabs>
                                </DJSTabContext>
                                <StyledAvatarBox>
                                    <DJSAvatar variant="circular" userName={username} />
                                </StyledAvatarBox>
                            </StyledBox>
                        </DJSLayoutPanel>
                        <DJSLayoutPanel orientation="center" bodyScroller key="children">
                            {children}
                        </DJSLayoutPanel>
                    </DJSBorderLayout>
                </DJSLayoutRoot>
            </DJSScopedCssBaseline>
        </DJSThemeProvider>
    );
};
const mapStateToProps = (state) => ({
    username: state.app.currentUser,
});
AppLayoutComponent.propTypes = {
    children: T.node,
    username: T.string.isRequired,
};
const AppLayout = connect(mapStateToProps, undefined, undefined, {
    forwardRef: true,
})(AppLayoutComponent);
export default AppLayout;
