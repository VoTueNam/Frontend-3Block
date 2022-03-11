import { Button, Card, CardContent, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  domain: PropTypes.string,
  url: PropTypes.string,
};

export default function AppWelcome({ domain, url, screenshot, report }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Domain:
          <br /> {!domain ? '...' : domain}
        </Typography>
        <a href={url} target="_blank" rel="noreferrer">
          <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
            {`URL: ${url}`}
          </Typography>
        </a>
        <a href={report} target="_blank" rel="noreferrer">
          <Button variant="contained" color="error" sx={{ mr: 1, fontWeight: 'fontWeightBold' }}>
            More Report
          </Button>
        </a>
        <a href={screenshot} target="_blank" rel="noreferrer">
          <Button variant="contained" sx={{ mr: 1, fontWeight: 'fontWeightBold' }}>
            See Full Screenshot
          </Button>
        </a>
      </CardContent>

      {/* <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      /> */}
      <a href={screenshot} target="_blank" rel="noreferrer">
        <img src={screenshot} p={3} width={330} alt={'screenshot of this URL'} />
      </a>
    </RootStyle>
  );
}
