import {default as md5} from 'md5';
import {default as chance} from 'chance';

const hashnaize = ({email}) => {
  // https://chancejs.com/usage/seed.html
  const mark = `ch`;
  const prefixSalt = chance(email).cf();
  const suffixSalt = chance(email).cf();
  return `${mark}` + md5(`${prefixSalt}${email}${suffixSalt}`);
};

export {hashnaize};
