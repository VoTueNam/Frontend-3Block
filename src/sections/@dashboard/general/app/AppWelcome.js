import { Button, Card, CardContent, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();
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
          <Button
            color="primary"
            variant="text"
            onClick={getURLList}
            sx={{ fontWeight: 'fontWeightBold' }}
            startIcon={<AutorenewIcon />}
          >
            Update Data
          </Button>
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
          <Button variant="contained" color="success" sx={{ mr: 1, fontWeight: 'fontWeightBold' }}>
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
        <img className="spoilerImage" src={screenshot} p={3} width={330} alt={'screenshot of this URL'} />
      </a>
    </RootStyle>
  );
  function getURLList() {
    const urlForScan = url;
    console.log('zo');
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/urlscan/v100', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: urlForScan,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        console.log('done!');
        try {
          var results = JSON.parse(localStorage.getItem('URLScan'));
          getURLScanList();
          // console.log(typeof results);
          if (results?.error || results == null) {
            // resetScan(true);
            enqueueSnackbar('Error, Update URL Scan!', { variant: 'error', delay: 3000 });
          } else {
            localStorage.setItem('URLScan', JSON.stringify(json));
            window.location.reload();
          }
        } catch {
          // resetScan(true);
          enqueueSnackbar('Error, Update URL Scan!', { variant: 'error', delay: 3000 });
        }
      })
      .catch(() => {
        // resetScan(true);
        enqueueSnackbar('Error, Update URL Scan!', { variant: 'error', delay: 3000 });
      });
  }

  function getURLScanList() {
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/GetAllURLScan', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('URLScanList', JSON.stringify(json));
        console.log('Update URLScanList Success!');
      })
      .catch(() => {
        console.log('Update URLScanList Failure!');
      });
  }
}
