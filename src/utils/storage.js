const localstorage = {
  /**
   * Save JSON object to local storage as string
   *
   * @param {string} key
   * @param {object} object
   */
  set: (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
  },

  /**
   * Get object from local storage
   *
   * @param {string} key
   */
  get: key => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return false;
  }
};
export default localstorage;
