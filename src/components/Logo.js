import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../public_Logo/Three_Blocksystem.svg';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <LogoSvg />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
