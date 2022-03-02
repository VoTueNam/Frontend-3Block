// @mui
import { Box, Card, Stack, Button, Avatar, Tooltip, Typography, CardHeader, IconButton } from '@mui/material';
// _mock_
import { _bankingContacts } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
import { useState } from 'react';

// ----------------------------------------------------------------------
export default function BankingContacts({ links }) {
  const [sizeLink, setSizeLink] = useState(3);

  links.map((oneLink) => {
    oneLink.avatar = 'https://api.faviconkit.com/' + validURL(oneLink.href) + '/144';
  });
  const linkView = links.slice(0, sizeLink);
  var keyIndex = 0;
  function ButtonView() {
    if (sizeLink < links.length) {
      return (
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          onClick={() => {
            setSizeLink(links.length);
          }}
        >
          View All
        </Button>
      );
    } else if (sizeLink > 3) {
      return (
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          onClick={() => {
            setSizeLink(3);
          }}
        >
          View Less
        </Button>
      );
    }
  }
  return (
    <Card>
      <CardHeader
        title="Related Links"
        subheader={`There are ${links.length} links`}
        // action={
        //   <Tooltip title="Add Contact">
        //     <IconButton color="primary" size="large">
        //       <Iconify icon={'eva:plus-fill'} width={20} height={20} />
        //     </IconButton>
        //   </Tooltip>
        // }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {linkView.map((oneLink) => (
          <Stack direction="row" alignItems="center" key={`${oneLink.text}+${keyIndex++}`}>
            <Avatar
              src={'https://api.faviconkit.com/' + validURL(oneLink.href) + '/144'}
              sx={{ width: 48, height: 48 }}
            />
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {oneLink.text}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {oneLink.href}
              </Typography>
            </Box>
            <a href={oneLink.href} target="_blank">
              <Tooltip title="Access This Link">
                <IconButton size="small">
                  <Iconify icon={'eva:flash-fill'} width={22} height={22} />
                </IconButton>
              </Tooltip>
            </a>
          </Stack>
        ))}
        {ButtonView()}
      </Stack>
    </Card>
  );
}
function validURL(url) {
  var match;
  if ((match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))) {
    return match[1];
  }
}
