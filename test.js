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

const c = getLogo('chongluadao');
