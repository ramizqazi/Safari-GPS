import english from './english';
import german from './german';
import turkish from './turkish';
import ukraine from './ukraine';
import russian from './russian';

/**
 * supported languages
 */
const languages = {
  english,
  german,
  turkish,
  ukraine,
  russian,
};

/**
 * actually translator
 */
// eslint-disable-next-line import/no-mutable-exports
let translator = languages.english;

/**
 * for update languages
 * @param {string} language
 */
const updateLanguage = language => {
  translator = languages[language];
};

/**
 * exports
 */
export { translator, updateLanguage };
