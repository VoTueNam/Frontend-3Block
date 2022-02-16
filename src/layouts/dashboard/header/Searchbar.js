import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useNavigate, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur(),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [url, setURL] = useState('3block.systems');
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAPI = () => {
    setOpen(false);
    if (!validURL(url)) {
      resetURL(true);
      return;
    } else {
      fetch('https://api3blockserver.herokuapp.com/api/3block/system/virustotal/v3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: localStorage.getItem('URL'),
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('virusTotal', JSON.stringify(json));
          try {
            var result = JSON.parse(localStorage.getItem('virusTotal'));
            if (result?.error || result == null) {
              resetURL(true);
            } else {
              console.log(result);
              if (location.pathname == '/dashboard/analytics') {
                window.location.reload();
              } else {
                navigate('/dashboard/analytics');
              }
            }
          } catch {
            resetURL(true);
          }
        })
        .catch(() => resetURL(true));
    }
  };

  const handleScan = () => {
    setOpen(false);
    if (!validURL(url)) {
      resetURL(true);
      return;
    } else {
      fetch('https://api3blockserver.herokuapp.com/api/3block/system/urlscan/v100', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: localStorage.getItem('URL'),
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(JSON.stringify(json));
          localStorage.setItem('URLScan', JSON.stringify(json));
          console.log('done!');
          try {
            var results = JSON.parse(localStorage.getItem('URLScan'));
            console.log(typeof results);
            if (results?.error || results == null) {
              resetScan(true);
            } else {
              console.log(results);
              if (location.pathname == '/dashboard/app') {
                window.location.reload();
              } else {
                navigate('/dashboard/app');
              }
            }
          } catch {
            resetScan(true);
          }
        })
        .catch(() => {
          resetScan(true);
        });
    }
  };
  function resetButton() {
    resetURL(false);
    resetScan(false);
  }
  function resetScan(checked) {
    const google = {
      page: {
        url: 'https://www.google.com/?gws_rd=ssl',
        domain: 'www.google.com',
        country: 'DE',
        city: 'Frankfurt am Main',
        server: 'gws',
        ip: '2a00:1450:4001:810::2004',
        asn: 'AS15169',
        asnname: 'GOOGLE, US',
      },
      headers: {
        date: 'Wed, 16 Feb 2022 14:18:33 GMT',
        server: 'gws',
      },
      port: 443,
      ipaddress: '[2a00:1450:4001:810::2004]',
      asn: {
        asn: '15169',
        country: 'US',
        description: 'GOOGLE, US',
        name: 'GOOGLE',
      },
      geoip: {
        countries: 'DE',
        timezone: 'Europe/Berlin',
        country_name: 'Germany',
      },
      links: [
        {
          href: 'https://about.google/?fg=1&utm_source=google-DE&utm_medium=referral&utm_campaign=hp-header',
          text: 'Über Google',
        },
        {
          href: 'https://store.google.com/DE?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=de-DE',
          text: 'Store',
        },
        {
          href: 'https://mail.google.com/mail/&ogbl',
          text: 'Gmail',
        },
        {
          href: 'https://www.google.de/imghp?hl=de&ogbl',
          text: 'Bilder',
        },
        {
          href: 'https://www.google.de/intl/de/about/products',
          text: '',
        },
        {
          href: 'https://accounts.google.com/ServiceLogin?hl=de&passive=true&continue=https://www.google.com/%3Fgws_rd%3Dssl&ec=GAZAmgQ',
          text: 'Anmelden',
        },
        {
          href: 'https://support.google.com/websearch/answer/106230?hl=de',
          text: 'Weitere Informationen',
        },
        {
          href: 'https://google.com/search/howsearchworks/?fg=1',
          text: 'Wie funktioniert die Google Suche?',
        },
        {
          href: 'https://sustainability.google/intl/de/commitments/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=',
          text: 'CO2-neutral seit 2007',
        },
        {
          href: 'https://policies.google.com/privacy?hl=de&fg=1',
          text: 'Datenschutzerklärung',
        },
        {
          href: 'https://policies.google.com/terms?hl=de&fg=1',
          text: 'Nutzungsbedingungen',
        },
        {
          href: 'https://support.google.com/websearch/?p=ws_results_help&hl=de&fg=1',
          text: 'Hilfe zur Suche',
        },
        {
          href: 'https://policies.google.com/technologies/cookies?utm_source=ucbs&hl=de',
          text: 'Cookies',
        },
        {
          href: 'https://policies.google.com/privacy?hl=de&fg=1&utm_source=ucbs',
          text: 'Datenschutz',
        },
        {
          href: 'https://policies.google.com/terms?hl=de&fg=1&utm_source=ucbs',
          text: 'Nutzungsbedingungen',
        },
      ],
      countries: ['DE'],
      linkDomains: [
        'about.google',
        'store.google.com',
        'mail.google.com',
        'www.google.de',
        'accounts.google.com',
        'support.google.com',
        'google.com',
        'sustainability.google',
        'policies.google.com',
      ],
      screenshot: 'https://urlscan.io/screenshots/769e46f1-2c9f-4423-81b7-90e93225b07a.png',
      report: 'https://urlscan.io/result/769e46f1-2c9f-4423-81b7-90e93225b07a/',
    };
    localStorage.setItem('URLScan', JSON.stringify(google));
    if (checked) {
      navigate('/404');
    } else {
      window.location.reload();
    }
  }
  function resetURL(checked) {
    const result = {
      url: 'http://example.com/',
      level: 'medium',
      result: {
        clean: '91.40',
        unrated: '8.60',
      },
      detail: {
        Lumu: 'malicious',
        Netcraft: 'phishing',
        NotMining: 'malware',
        SafeToOpen: 'suspicious',
      },
      title: 'This domain is for use in illustrative examples in documents.',
      categories: [
        'adult content',
        'blogs and personal sites',
        'onlineshop',
        'games',
        'Ads/Analytics, Marketing/Merchandising',
        'computersandsoftware',
        'Malware Sites',
        'online brokerage and trading',
        'kids sites',
        'hahahahaha',
      ],
    };
    localStorage.setItem('virusTotal', JSON.stringify(result));
    if (checked) {
      navigate('/404');
    } else {
      window.location.reload();
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButtonAnimate onClick={handleOpen}>
            <Iconify icon={'eva:search-fill'} width={20} height={20} />
          </IconButtonAnimate>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAPI();
                }
              }}
              onChange={(e) => {
                setURL(e.target.value);
                localStorage.setItem('URL', e.target.value);
              }}
            />

            <Button variant="contained" onClick={handleAPI} sx={{ mr: 1, fontWeight: 'fontWeightBold' }}>
              Analytics
            </Button>

            <Button
              variant="contained"
              onClick={handleScan}
              color="secondary"
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            >
              Scan!
            </Button>

            <Button
              variant="contained"
              onClick={resetButton}
              color="error"
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            >
              Reset
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}
