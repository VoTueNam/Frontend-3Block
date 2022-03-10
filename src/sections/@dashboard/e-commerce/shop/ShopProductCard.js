import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import { format } from 'date-fns';
import { BookingRoomAvailable } from '../../general/booking';
import { EcommerceSaleByGender } from '../../general/e-commerce';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  var { url, updatedAt } = product;

  const colors = [];
  var randomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  for (let i = 0; i <= randomNumber; i += 1) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors.push('#' + randomColor);
  }

  const linkTo = `/dashboard/analytics`;
  const status = product.level;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={
              (status === 'high' && 'error') ||
              (status === 'medium' && 'warning') ||
              (status === 'low' && 'info') ||
              'success'
            }
            sx={{
              top: 6,
              right: 6,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {/* <EcommerceSaleByGender /> */}
        <BookingRoomAvailable product={product.result} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link
          to={linkTo}
          color="inherit"
          component={RouterLink}
          onClick={() => {
            localStorage.setItem('virusTotal', JSON.stringify(product));
          }}
        > */}
        <a
          href={'/dashboard/analytics'}
          target="_blank"
          onClick={() => {
            localStorage.setItem('virusTotal', JSON.stringify(product));
          }}
        >
          <Typography variant="subtitle1" noWrap>
            {validURL(url)}
          </Typography>
        </a>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {/* {updatedAtSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(updatedAtSale)}
              </Typography>
            )} */}

            <Typography variant="subtitle2">{'Updated: ' + format(new Date(updatedAt), 'dd MMM yyyy')}</Typography>
          </Stack>
        </Stack>
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
