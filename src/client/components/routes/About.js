import T from 'prop-types';
import {CircleOutlineIcon} from '@deshaw/djs-icons';
import _ from 'lodash';
import {
    DJSBox,
    DJSButton,
    DJSCard,
    DJSCardActions,
    DJSCardContent,
    DJSCardHeader,
    DJSGrid,
    DJSLink,
    DJSList,
    DJSListItem,
    DJSListItemIcon,
    DJSListItemText,
    DJSTypography,
    styled,
} from '@deshaw/djs-gravity-ui';
/**
 * Refer Gravity-UI documentation https://djs.deshaw.com/storybook/djs--djs-gravity-ui?path=/docs/overview-getting-started--1-welcome&version=master to build your components
 */
const queryProps = {
    title: 'Have a query?',
    content:
        "Running into a problem? Chances are, you're not the first! Explore some of the questions that people have posted or post a new query in the DJS help channel on Slack.",
    link: 'https://deshaw.slack.com/archives/CKMVBUSH5',
    buttonText: '#help-djs',
    linkStyle: {
        textTransform: 'lowercase',
    },
};
const dochubProps = {
    title: 'Explore DJS',
    content:
        'Explore all the libraries provided by DJS by browsing the API documentation and interactive guides available on the Documentation Hub.',
    link: 'https://djs.deshaw.com',
    buttonText: 'DJS DocHub',
};
const StyledTitleBox = styled(DJSBox)({
    display: 'flex',
    flexDirection: 'row',
});
const StyledCard = styled(DJSCard)({
    maxWidth: 300,
    padding: '10px',
    marginRight: '30px',
    marginTop: '10px',
    '.MuiCardContent-root:last-child': {
        paddingBottom: '10px',
    },
});
const StyledButton = styled(DJSButton)(({theme}) => ({
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        color: theme.palette.secondary.contrastText,
    },
}));
const Card = ({title, content, link, buttonText, linkStyle = {}}) => {
    const titleComponent = (
        <StyledTitleBox>
            <DJSTypography fontWeight="bold" variant="h5">
                {title}
            </DJSTypography>
        </StyledTitleBox>
    );
    return (
        <StyledCard>
            <DJSCardHeader title={titleComponent} />
            <DJSCardContent>
                <DJSTypography fontSize="12px">{content}</DJSTypography>
            </DJSCardContent>
            <DJSCardActions
                sx={{
                    marginTop: '10px',
                }}
            >
                <StyledButton style={linkStyle} rel="noreferrer" target="_blank" href={link}>
                    {buttonText}
                </StyledButton>
            </DJSCardActions>
        </StyledCard>
    );
};
const contentLinks = [
    {
        hrefLink: 'https://djs.deshaw.com/projects/djs-views/master/docs/getting-started/integration',
        hrefText: 'Views Integration',
    },
    {
        hrefLink:
            'https://djs.deshaw.com/storybook/djs--djs-gravity-ui?path=/story/overview-getting-started--1-welcome&version=master',
        hrefText: 'DJS Gravity UI',
    },
    {
        hrefLink:
            'https://djs.deshaw.com/projects/djs-react-grid/master/docs/api-docs/interfaces/uic.IDJSReactGridProps',
        hrefText: 'DJS React Grid',
    },
    {
        hrefLink: 'https://djs.deshaw.com/storybook/djs--djs-highcharts?version=master',
        hrefText: 'DJS Highcharts',
    },
    {
        hrefLink: 'https://djs.deshaw.com/projects/djs-prism/master/docs/api-docs/interfaces/IPrismProps',
        hrefText: 'DJS Prism',
    },
];
const LinkCard = () => {
    const title = 'Other Important Links';
    const titleComponent = (
        <StyledTitleBox>
            <DJSTypography fontWeight="bold" variant="h5">
                {title}
            </DJSTypography>
        </StyledTitleBox>
    );
    const content = (
        <DJSList>
            {_.map(contentLinks, (contentLink) => {
                const {hrefLink, hrefText} = contentLink;
                return (
                    <DJSListItem key={hrefText}>
                        <DJSListItemIcon>
                            <CircleOutlineIcon size="xs" />
                        </DJSListItemIcon>
                        <DJSListItemText
                            primary={
                                <DJSLink underline="none" href={hrefLink} target="_blank" rel="noreferrer">
                                    <DJSTypography fontSize="12px">{hrefText}</DJSTypography>
                                </DJSLink>
                            }
                        />
                    </DJSListItem>
                );
            })}
        </DJSList>
    );
    return (
        <StyledCard>
            <DJSCardHeader title={titleComponent} />
            <DJSCardContent>{content}</DJSCardContent>
        </StyledCard>
    );
};
const About = () => {
    return (
        <DJSGrid
            container
            columnSpacing={1}
            rowSpacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '10px',
            }}
        >
            <DJSGrid item key="doc">
                <Card {...dochubProps} />
            </DJSGrid>
            <DJSGrid item key="query">
                <Card {...queryProps} />
            </DJSGrid>
            <DJSGrid item key="links">
                <LinkCard />
            </DJSGrid>
        </DJSGrid>
    );
};
Card.propTypes = {
    title: T.string.isRequired,
    content: T.string.isRequired,
    link: T.string.isRequired,
    buttonText: T.string.isRequired,
    linkStyle: T.object,
};
export default About;
