import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, linkEngine, CardHeader, Typography, Stack } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
// utils
import { fCurrency, fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
// import { _appRelated } from '../../../../_mock';
import _mock from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

const engineDetail = [
  {
    Engine: 'CRDF',
    logo: 'https://www.crdfglobal.org/sites/default/files/crdf-mark.png',
    link: 'https://www.crdfglobal.org/',
  },
  {
    Engine: 'chongluadao',
    logo: 'https://chongluadao.vn/wp-content/uploads/2020/09/logo-rm.png',
    link: 'https://chongluadao.vn/',
  },
  {
    Engine: 'virus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    link: 'https://www.google.com',
  },
];

function getLogo(Engine) {
  return engineDetail.find((detail) => detail.Engine === Engine).logo;
}
function getLink(Engine) {
  return engineDetail.find((detail) => detail.Engine === Engine).link;
}

let _appRelated = [];
export default function AppTopRelated({ props = [] }) {
  _appRelated = props.map((appName, index) => ({
    id: _mock.id(index),
    name: Object.keys(appName)[0],
    system: Object.values(appName)[0],
    price: index === 0 || index === 2 || index === 4 ? 0 : _mock.number.price(index),
    linkEngine: getLink(Object.keys(appName)[0]),
    review: 9,
    logo: getLogo(Object.keys(appName)[0]),
  }));

  return (
    <Card>
      <CardHeader title="Detail Result" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_appRelated.map((app) => (
            <ApplicationItem key={app.id} app={app} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    linkEngine: PropTypes.string,
    review: PropTypes.number,
    logo: PropTypes.string,
    system: PropTypes.string,
  }),
};

function ApplicationItem({ app }) {
  const theme = useTheme();
  const { logo, system, price, linkEngine, review, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Image src={logo} alt={name} sx={{ width: 24, height: 24 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Iconify
            width={16}
            height={16}
            icon={system === 'Malicious' ? 'ant-design:code-sandbox-outlined' : 'ant-design:code-twotone'}
          />
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            Type:
          </Typography>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={price === 0 ? 'success' : 'error'}
          >
            {system}
          </Label>
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <a href={linkEngine} target="_blank" rel="noreferrer">
          <ReadMoreIcon />
        </a>
        <a href={linkEngine} target="_blank" rel="noreferrer">
          <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
            {'see more'}
          </Typography>
        </a>
      </Stack>
    </Stack>
  );
}
