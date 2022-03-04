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

  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(url)}`;
  const status = 'isChecked';

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info' || 'warning'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {/* <EcommerceSaleByGender /> */}
        <BookingRoomAvailable />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {'Update at: ' + format(new Date(updatedAt), 'dd MMM yyyy')}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {/* {updatedAtSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(updatedAtSale)}
              </Typography>
            )} */}

            <Typography variant="subtitle1">{validURL(url)}</Typography>
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
