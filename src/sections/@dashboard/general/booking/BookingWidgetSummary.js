import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

BookingWidgetSummary.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function BookingWidgetSummary({ title, total, icon, setGray }) {
  const { enqueueSnackbar } = useSnackbar();
  function getGrayList() {
    fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/getAll', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // throw 'Err';
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('grayList', JSON.stringify(json));
        setGray(json);
        enqueueSnackbar('Update Gray Lists Successfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Update Gray Lists Failure!', { variant: 'error' });
      });
  }
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          // console.log('Reset Data');
          getGrayList();
        }}
      >
        Update Data
      </Button>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}
