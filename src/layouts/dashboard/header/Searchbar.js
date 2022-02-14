import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useNavigate } from 'react-router-dom';

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

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAPI = () => {
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/virustotal/v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('virusTotal', JSON.stringify(json));
        try {
          var result = JSON.parse(localStorage.getItem('virusTotal'));
          if (result?.error || result == null) {
            resetURL();
          }
          console.log(result);
          window.location.reload();
        } catch {
          resetURL();
        }
      });
  };

  function resetURL() {
    const result = {
      url: 'http://pornhub.com/',
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
      title: 'Free Porn Videos & Sex Movies - Porno, XXX, Porn Tube | Pornhub',
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
    navigate('/404');
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
              }}
            />

            <Button variant="contained" onClick={handleAPI}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
