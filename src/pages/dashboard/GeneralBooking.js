// @mui
import { Grid, Container, InputLabel, InputBase, InputAdornment, IconButton, TextField, Stack } from '@mui/material';
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
import Iconify from '../../components/Iconify';
import EmojiPicker from '../../components/EmojiPicker';
import MyAvatar from '../../components/MyAvatar';
import { BankingInviteFriends } from '../../sections/@dashboard/general/banking';
import { useState } from 'react';

// ----------------------------------------------------------------------
var grays;
if (!localStorage.getItem('grayList')) {
  getGrayLists();
} else {
  grays = JSON.parse(localStorage.getItem('grayList'));
  // console.log(gray);
}
var isChecked = 0;
var notChecked = 0;

for (var url of grays) {
  if (url.isCheck == 'false') {
    notChecked++;
  } else if (url.isCheck == 'true') {
    isChecked++;
  }
}

export default function GeneralBooking() {
  const { themeStretch } = useSettings();
  const [gray, setGray] = useState(grays);

  return (
    <Page title="Gray Lists">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BankingInviteFriends virusTotal={true} url={'Enter your suggestion'} title={' URL here:'} />
          </Grid>

          <Grid item xs={12} md={6}>
            <br />
            <br />
            <BookingWidgetSummary
              title="Total URL"
              total={gray.length}
              icon={<BookingIllustration />}
              setGray={setGray}
            />
            {/* <Grid item xs={12} md={4}> */}
            <br />
            <BookingCheckInWidgets isChecked={isChecked} notChecked={notChecked} size={gray.length} />
            {/* </Grid> */}
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
            <BookingNewestBooking grayList={gray} />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails grayList={gray} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
function getGrayLists() {
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
