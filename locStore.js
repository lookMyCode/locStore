const reservedТames = ['getItem', 'setItem', 'removeItem', 'clear', 'length', 'key'];

function validateParams(key, callback) {
  if( typeof(key) !== 'string' || key.trim() === '' ) {
    throw new Error('Key param have to be string type and can not be empty');
  }

  if( reservedТames.includes(key) ) {
    throw new Error('Key name is reserved');
  }

  if( typeof(callback) !== 'function' ) {
    throw new Error('Callback param is not a function');
  }
}

export const locStore = {
  setItem(key, value, rewrite = true, callback = () => {}) {
    validateParams(key, callback);
    if( typeof(rewrite) !=='boolean' ) {
      throw new Error('Rewrite param have to be boolean type');
    }

    value = JSON.stringify(value);

    if(rewrite) {
      localStorage.setItem(key, value);
    } else {
      !localStorage.getItem(key) ? localStorage.setItem(key, value): null;
    }

    callback();
  },

  getItem(key, callback = () => {}) {
    validateParams(key, callback);

    const value = JSON.parse( localStorage.getItem(key) );
    callback();
    return value;
  },

  hasItem(key, callback = () => {}) {
    validateParams(key, callback);
    
    for(let k in localStorage) {
      if(localStorage[key]) {
        callback();
        return true;
      }
    }

    callback();
    return false;
  },

  removeItem(key, callback = () => {}) {
    validateParams(key, callback);

    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
}