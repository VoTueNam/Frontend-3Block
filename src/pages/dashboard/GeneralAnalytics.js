// @mui
import { Container, Grid, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
// sections
import { AnalyticsCurrentVisits, AnalyticsTrafficBySite } from '../../sections/@dashboard/general/analytics';
import { AppTopRelated, AppWidget } from '../../sections/@dashboard/general/app';
import { BankingInviteFriends } from '../../sections/@dashboard/general/banking';
import Iconify from '../../components/Iconify';
import { typeOfCategories } from './getTypeOfCategories/types';
import { func } from 'prop-types';

// ----------------------------------------------------------------------

function resetURL() {
  result = {
    url: 'http://pornhub.com/',
    level: 'medium',
    result: {
      clean: '91.40',
      unrated: '8.60',
    },
    detail: {
      Lumu: 'malicious',
      Netcraft: 'phishing',
      NotMining: 'malware',
      SafeToOpen: 'suspicious',
    },
    title: 'Free Porn Videos & Sex Movies - Porno, XXX, Porn Tube | Pornhub',
    categories: [
      'adult content',
      'blogs and personal sites',
      'onlineshop',
      'games',
      'Ads/Analytics, Marketing/Merchandising',
      'computersandsoftware',
      'Malware Sites',
      'online brokerage and trading',
      'kids sites',
      'hahahahaha',
    ],
  };
}
try {
  var result = JSON.parse(localStorage.getItem('virusTotal'));
  console.log(result);
  if (result?.error || result == null) {
    resetURL();
  }
} catch {
  resetURL();
}

// Level
let colorLevel = 'primary';
const props = {
  chartData: [],
  label: [],
};

switch (result.level) {
  case 'none':
    colorLevel = 'primary';
    break;
  case 'low':
    colorLevel = 'info';
    break;
  case 'medium':
    colorLevel = 'warning';
    break;
  case 'high':
    colorLevel = 'error';
    break;
  default:
    break;
}

// categories
const typeCategory = [];
result.categories.forEach((i) =>
  typeCategory.push({
    name: typeOfCategories(i).name,
    value: i,
    icon: <Iconify icon={typeOfCategories(i).icon} color="#1877F2" width={32} height={32} />,
  })
);

// Percent result
const propsDetails = [];
Object.keys(result.result).forEach((i) => props.label.push(i));
Object.values(result.result).forEach((i) => props.chartData.push(Number(i)));
Object.keys(result.detail).forEach((i) => {
  propsDetails.push({ [i]: result.detail[i] });
});

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome, Analytics URL
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <BankingInviteFriends url={result.url} title={result.title} />

            {/* <AnalyticsWidgetSummary
              title="Level"
              total={result.level.charAt(0).toUpperCase() + result.level.slice(1)}
              color={colorLevel}
              icon={'ant-design:bug-filled'}
            /> */}
          </Grid>

          {/* Biểu đồ tròn */}
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits props={props} />
          </Grid>

          {/* Detail */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline props={result.detail} />
          </Grid> */}
          <Grid item xs={12} md={6} lg={4}>
            {/* Logo */}
            <AppWidget
              title="Level"
              total={result.level.charAt(0).toUpperCase() + result.level.slice(1)}
              color={colorLevel}
              icon={'ant-design:bug-filled'}
              chartData={(100 - Number(result.result.clean)).toFixed(2)}
            />
            <br />
            {/* Detail */}
            <AppTopRelated props={propsDetails} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AnalyticsTrafficBySite props={typeCategory} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="LEVEL" total={result.level} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          {/* Bỏ cái biểu đồ cột */}
          {/* <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
