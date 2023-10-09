import locale from './zh_TW';

export const t = (keyName: string): string => {
  return locale[keyName];
};
const i18n = { t };

export default i18n;
