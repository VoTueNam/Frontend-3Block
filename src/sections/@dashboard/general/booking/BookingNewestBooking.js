import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography, Paper, CardHeader } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// _mock_
import { _bookingNew } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';
import { AppCurrentDownload } from '../app';

// ----------------------------------------------------------------------
const MostUsers = [
  {
    avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar1.jpg',
    bookdAt: 'namvtce140557@fpt.edu.vn',
    cover:
      'https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Ffacebook.com&output=image&file_type=png&wait_for_event=load',
    name: 'Võ Tuệ Nam',
    roomType: 'success',
    data: [50, 12, 3],
  },
  {
    avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar2.jpg',
    bookdAt: 'longnmce140603@fpt.edu.vn',
    cover:
      'https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Ffacebook.com&output=image&file_type=png&wait_for_event=load',
    name: 'Nguyễn Minh Long',
    roomType: 'info',
    data: [20, 13, 90],
  },
  {
    avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar3.jpg',
    bookdAt: 'vuntce140419@fpt.edu.vn',
    cover:
      'https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Ffacebook.com&output=image&file_type=png&wait_for_event=load',
    name: 'Nguyễn Tấn Vũ',
    roomType: 'warning',
    data: [10, 100, 23],
  },
  {
    avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar4.jpg',
    bookdAt: 'thailqce140217@fpt.edu.vn',
    cover:
      'https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Ffacebook.com&output=image&file_type=png&wait_for_event=load',
    name: 'Lê Quốc Thái',
    roomType: 'info',
    data: [12, 23, 33],
  },
  {
    avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar5.jpg',
    bookdAt: 'phucnpdce140024@fpt.edu.vn',
    name: 'Nguyễn Phạm Đình Phúc',
    roomType: 'warning',
    cover: `https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Fgoogle.com&output=image&file_type=png&wait_for_event=load`,
    data: [33, 55, 1],
  },
];

export default function BookingNewestBooking() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Most Contributing Users"
        subheader="5 Users"
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {MostUsers.map((item) => (
          <BookingItem key={item.name} item={item} />
        ))}
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------

BookingItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    bookdAt: PropTypes.string,
    cover: PropTypes.string,
    name: PropTypes.string,
    roomType: PropTypes.string,
    data: PropTypes.array,
  }),
};

function BookingItem({ item }) {
  const { avatar, name, bookdAt, cover, roomType, data } = item;

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatar} />
          <div>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {bookdAt}
            </Typography>
          </div>
        </Stack>

        {/* <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'ic:round-vpn-key'} width={16} height={16} />
            <Typography variant="caption">Room {roomNumber}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'eva:people-fill'} width={16} height={16} />
            <Typography variant="caption">{person} Person</Typography>
          </Stack>
        </Stack> */}
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={roomType}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 370,
            position: 'absolute',
            textTransform: 'capitalize',
          }}
        >
          {(() => {
            if (roomType == 'info') {
              return 'None';
            }
            if (roomType == 'success') {
              return 'Verification';
            }
            if (roomType == 'warning') {
              return 'Reject';
            }
            return roomType;
          })()}
        </Label>
        <AppCurrentDownload data={data} />
        {/* <Image src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} /> */}
      </Box>
    </Paper>
  );
}
