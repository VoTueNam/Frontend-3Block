import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _analyticTraffic } from '../../../../_mock';

// ----------------------------------------------------------------------

export default function AnalyticsTrafficBySite({ props }) {
  return (
    <Card>
      <CardHeader title="Categories by Site" />
      <CardContent>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {props.map((site) => (
            <Grid item xs={4} key={site.value + 'Categories'}>
              <SiteItem key={site.value} site={site} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.shape({
    icon: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
};

function SiteItem({ site }) {
  const { icon, value, name } = site;
  return (
    <Grid item xs={4} sm={8} md={12}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{value}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}
