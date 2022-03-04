// @mui
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../assets';

// ----------------------------------------------------------------------
var gray;
if (!localStorage.getItem('grayList')) {
  getGrayList();
} else {
  gray = JSON.parse(localStorage.getItem('grayList'));
  // console.log(gray);
}
var isChecked = 0;
var notChecked = 0;

for (var url of gray) {
  if (url.isCheck == 'false') {
    notChecked++;
  } else if (url.isCheck == 'true') {
    isChecked++;
  }
}
export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Gray Lists">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Total URL" total={gray.length} icon={<BookingIllustration />} />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingCheckInWidgets isChecked={isChecked} notChecked={notChecked} size={gray.length} />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Verification" total={isChecked} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Reject" total={notChecked} icon={<CheckOutIllustration />} />
          </Grid> */}

          {/* 
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid> */}

          {/* <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid> */}

          {/* <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid> */}

          <Grid item xs={12}>
            <BookingNewestBooking />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails grayList={gray} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
function getGrayList() {
  fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('grayList', JSON.stringify(json));
      window.location.reload();
    });
}
