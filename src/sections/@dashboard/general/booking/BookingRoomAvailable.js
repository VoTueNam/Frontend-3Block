import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [75, 7, 45, 23, 12, 3];
const SOLD_OUT = 120;
const AVAILABLE = 66;

export default function BookingRoomAvailable() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    labels: ['Mens', 'Womens', 'Nonr', 'malware', 'phishing', 'ccc'],
    grid: {
      padding: { top: -3, bottom: -3 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            // { offset: 25, color: theme.palette.warning.light },
            // { offset: 50, color: theme.palette.info.light },
            // { offset: 75, color: theme.palette.error.light },
            { offset: 100, color: theme.palette.primary.main },
          ],
          [
            {
              offset: 0,
              color: theme.palette.primary.light,
            },
            {
              offset: 100,
              color: theme.palette.primary.main,
            },
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light,
            },
            {
              offset: 100,
              color: theme.palette.warning.main,
            },
          ],
          [
            {
              offset: 0,
              color: theme.palette.warning.light,
            },
            {
              offset: 100,
              color: theme.palette.warning.main,
            },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Rooms',
            formatter: () => fNumber(186),
          },
        },
      },
    },
  });

  return (
    <Card>
      {/* <CardHeader title="Room Available" sx={{ mb: 8 }} /> */}
      <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={310} />

      {/* 
      <Stack spacing={2} sx={{ p: 5 }}>
        <Legend label="Sold out" number={SOLD_OUT} />
        <Legend label="Available" number={AVAILABLE} />
      </Stack> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

Legend.propTypes = {
  label: PropTypes.string,
  number: PropTypes.number,
};

function Legend({ label, number }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Sold out' && {
              bgcolor: 'primary.main',
            }),
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number} Rooms</Typography>
    </Stack>
  );
}
