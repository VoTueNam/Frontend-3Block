// routes
// components
import Iconify from '../../components/Iconify';
import { PATH_DOCS } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/about-us',
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/contact-us',
  },
  {
    title: 'FAQS',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/faqs',
  },
  {
    title: 'Login',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/auth/login',
  },
  {
    title: 'Mentor',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: PATH_DOCS,
  },
  {
    title: 'Get Started',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/dashboard/analytics',
  },
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: 'Other',
  //       items: [
  //         { title: 'About us', path: PATH_PAGE.about },
  //         { title: 'Contact us', path: PATH_PAGE.contact },
  //         { title: 'FAQs', path: PATH_PAGE.faqs },
  //         { title: 'Pricing', path: PATH_PAGE.pricing },
  //         { title: 'Payment', path: PATH_PAGE.payment },
  //         { title: 'Maintenance', path: PATH_PAGE.maintenance },
  //         { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
  //       ],
  //     },
  //     {
  //       subheader: 'Authentication',
  //       items: [
  //         { title: 'Login', path: PATH_AUTH.loginUnprotected },
  //         { title: 'Register', path: PATH_AUTH.registerUnprotected },
  //         { title: 'Reset password', path: PATH_AUTH.resetPassword },
  //         { title: 'Verify code', path: PATH_AUTH.verify },
  //       ],
  //     },
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 404', path: PATH_PAGE.page404 },
  //         { title: 'Page 500', path: PATH_PAGE.page500 },
  //       ],
  //     },
  //     {
  //       subheader: 'Dashboard',
  //       items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
  //     },
  //   ],
  // },
];

export default menuConfig;
