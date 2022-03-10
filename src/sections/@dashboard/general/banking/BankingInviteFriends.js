// @mui
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button, OutlinedInput } from '@mui/material';
// components
import Image from '../../../../components/Image';
import { useState } from 'react';
import useAuth from '../../../../firebaseLogin/contexts/AuthContext';

// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.info.main} 0%,
    ${theme.palette.success.dark} 100%)`,
}));

// ----------------------------------------------------------------------

export default function BankingInviteFriends({ url = 'example.com', title = 'None', virusTotal = true }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (url != 'Enter your suggestion') url = url.slice(7, -1);
  console.log('image = ' + currentUser?.photoURL);
  const [submitValue, setSubmitValue] = useState('');
  function onSubmit() {
    // console.log('submit ' + submitValue);
    // console.log(currentUser.displayName);
    fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/createNew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: submitValue,
        user: currentUser.displayName,
        image: currentUser?.photoURL,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setSubmitValue('');

        console.log(json);
      });
  }

  return (
    <div>
      <Image
        visibleByDefault
        disabledEffect
        src={'https://votuenam.github.io/image-hosting/BackGroud3Block' + virusTotal + '.png'}
        // src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_invite.png"
        sx={{
          left: 45,
          zIndex: 9,
          width: 160,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" noWrap>
            {url}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          {title}
        </Typography>

        {virusTotal && (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <OutlinedInput
              size="small"
              placeholder="..."
              value={submitValue}
              onChange={(e) => {
                setSubmitValue(e.target.value);
              }}
              sx={{
                width: 1,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
                '& input::placeholder': {
                  color: (theme) => alpha(theme.palette.common.white, 0.48),
                },
                '& fieldset': { display: 'none' },
              }}
            />
            <Button color="warning" variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          </Stack>
        )}
      </ContentStyle>
    </div>
  );
}
