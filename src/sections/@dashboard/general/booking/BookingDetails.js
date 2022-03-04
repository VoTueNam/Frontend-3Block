import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// _mock_
import { _bookings } from '../../../../_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';

// ----------------------------------------------------------------------

export default function BookingDetails({ grayList }) {
  const [sizeLink, setSizeLink] = useState(6);
  const grayView = grayList.slice(0, sizeLink);
  function ButtonView() {
    if (sizeLink < grayList.length) {
      return (
        <Button
          onClick={() => {
            setSizeLink(grayList.length);
          }}
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      );
    } else if (sizeLink > 6) {
      return (
        <Button
          onClick={() => {
            setSizeLink(6);
          }}
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View Less
        </Button>
      );
    }
  }

  const theme = useTheme();
  console.log(grayList);
  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <Card>
        <CardHeader title="Gray Lists" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>URL</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Submit In</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Verify at</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>User</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Level</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {grayView.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <a href={row.url} target="_blank">
                          <Avatar alt={row.url} src={'https://api.faviconkit.com/' + validURL(row.url) + '/144'} />
                        </a>
                        <a
                          href={'/dashboard/analytics'}
                          target="_blank"
                          onClick={() => {
                            localStorage.setItem('virusTotal', JSON.stringify(row));
                          }}
                        >
                          <Typography variant="subtitle2">{row.url}</Typography>
                        </a>
                      </Stack>
                    </TableCell>

                    <TableCell>{format(new Date(row.createdAt), 'dd MMM yyyy')}</TableCell>
                    <TableCell>
                      {(() => {
                        if (row.isCheck != 'none')
                          // const a = format(new Date(row.createdAt), 'dd MMM yyyy'),
                          //   b = format(new Date(row.updatedAt), 'dd MMM yyyy');
                          // if (a != b)
                          return format(new Date(row.updatedAt), 'dd MMM yyyy');
                      })()}
                    </TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.isCheck === 'false' && 'warning') || (row.isCheck === 'true' && 'primary') || 'info'
                        }
                      >
                        {sentenceCase(
                          (() => {
                            if (row.isCheck == 'true') {
                              return 'Verification';
                            }
                            if (row.isCheck == 'false') {
                              return 'Reject';
                            }
                            if (row.isCheck == 'none') {
                              return 'None';
                            }
                          })()
                        )}
                      </Label>
                    </TableCell>

                    <TableCell>{row.user}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.level === 'medium' && 'warning') ||
                          (row.level === 'high' && 'error') ||
                          (row.level === 'low' && 'info') ||
                          'success'
                        }
                      >
                        {sentenceCase(row.level)}
                      </Label>
                    </TableCell>

                    {/* <TableCell align="right">
                      <MoreMenuButton />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>{ButtonView()}</Box>
      </Card>
    </>
  );
}
function validURL(url) {
  var match;
  if ((match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))) {
    return match[1];
  }
}
// ----------------------------------------------------------------------

// function MoreMenuButton() {
//   const [open, setOpen] = useState(null);

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const ICON = {
//     mr: 2,
//     width: 20,
//     height: 20,
//   };

//   return (
//     <>
//       <IconButton size="large" onClick={handleOpen}>
//         <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
//       </IconButton>

//       <MenuPopover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         arrow="right-top"
//         sx={{
//           mt: -0.5,
//           width: 160,
//           '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
//         }}
//       >
//         <MenuItem>
//           <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
//           Download
//         </MenuItem>

//         <MenuItem>
//           <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
//           Print
//         </MenuItem>

//         <MenuItem>
//           <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
//           Share
//         </MenuItem>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <MenuItem sx={{ color: 'error.main' }}>
//           <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
//           Delete
//         </MenuItem>
//       </MenuPopover>
//     </>
//   );
// }
