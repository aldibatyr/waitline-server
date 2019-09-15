/* eslint-disable strict */
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const ValidationService = {
  validateUrl(url) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
  },

  validateEmal(email) {
    if(email.includes('@')){
      return true;
    }
    return false;
  },

  validatePassword(password) {
    if(password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if(password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces';
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
      return 'Password must contain one upper case, lower case, number and special character';
    }
    return null;
  }
};

module.exports = ValidationService;