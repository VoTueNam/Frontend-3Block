function checkType(keyword) {
  if (keyword == 'Pornography') return '18+';
}

const a = checkType('Pornography'); //==>  18+
console.log(a);

const typeAll = {
  '18+': ['sex', 'adult'],
  life: ['dogs', 'cats'],
};
