import { type } from './type.js'


const reservedТames = ['getItem', 'setItem', 'removeItem', 'clear', 'length', 'key'];

function validateKey(key) {
  if( typeof(key) !== 'string' || key.trim() === '' ) {
    throw new Error('Key param have to be string type and can not be empty');
  }

  if( reservedТames.includes(key) ) {
    throw new Error('Key name is reserved');
  }
}

function validateValue(value) {
  if( typeof(value) === 'symbol' || typeof(value) === 'function' ) {
    throw new Error('Value have not to be function or symbol types');
  }
}

function validateCallback(callback) {
  if( typeof(callback) !== 'function' ) {
    throw new Error('Callback param is not a function');
  }
}

function validateRewrite(rewrite) {
  if( typeof(rewrite) !=='boolean' ) {
    throw new Error('Rewrite param have to be boolean type');
  }
}

function validateParams(key, callback) {
  validateKey(key);

  validateCallback(callback);
}

function validateType(typeName, item) {
  if( type.getType(item) !== typeName ) {
    throw new Error(`Item param have to be an ${typeName}`);
  }
}

const emptyFunc = () => {};

export const locStore = {
  setItem(key, value, rewrite = true, callback = emptyFunc) {
    validateParams(key, callback);
    validateRewrite(rewrite);
    validateValue(value);

    if( typeof(value) === 'undefined' ) {
      value = null;
    }

    value = JSON.stringify(value);

    if(rewrite) {
      localStorage.setItem(key, value);
    } else {
      !localStorage.getItem(key) ? localStorage.setItem(key, value): null;
    }

    callback();
  },

  getItem(key, callback = emptyFunc) {
    validateParams(key, callback);

    const value = JSON.parse( localStorage.getItem(key) );
    callback();
    return value;
  },

  hasItem(key, callback = emptyFunc) {
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

  removeItem(key, callback = emptyFunc) {
    validateParams(key, callback);

    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  getAllStore(callback = emptyFunc) {
    validateCallback(callback);

    const store = {};
    for(let k in localStorage) {
      if( !reservedТames.includes(k) ) {
        store[k] = JSON.parse(localStorage[k]);
      }
    }

    callback();
    return store;
  },

  getAllKeys(callback = emptyFunc) {
    validateCallback(callback);

    const keys = Object.keys(localStorage);
    callback();
    return keys;
  },

  getAllValues(callback = emptyFunc) {
    validateCallback(callback);

    let values = Object.values(localStorage);
    values = values.map( item => JSON.parse(item) );
    callback();
    return values;
  },

  getEntries(callback = emptyFunc) {
    validateCallback(callback);

    const entries = Object.entries(localStorage);
    callback();
    return entries;
  },

  getKeysByValue(value, callback = emptyFunc) {
    validateCallback(callback);

    const store = this.getAllStore();
    const keys = [];
    for(let k in store) {
      store[k] === value && keys.push(k);
    }

    callback();
    return keys;
  },

  getStoreLength(callback = emptyFunc) {
    validateCallback(callback);

    const len = localStorage.length;
    callback();
    return len;
  },

  getValuesByKeys(params) {
    params = {
      callback: emptyFunc,
      returnUndefined: false,
      keys: [],
      ...params
    }

    validateCallback(params.callback);

    const store = this.getAllStore();

    const values = [];

    params.keys.map( key => {
      validateKey(key);

      if(store[key] !== undefined) {
        values.push( store[key] );
      } else {
        params.returnUndefined && values.push(undefined);
      }
    } );

    params.callback();
    return values;
  },
  
  setFromEntries(items = [], rewrite = true, callback = emptyFunc) {
    validateType('array', items);
    validateRewrite(rewrite);
    validateCallback(callback);

    items.map( item => {
      validateType('array', item);
      let [key, value] = item;

      this.setItem(key, value, rewrite);
    } );

    callback();
  },

  setFromObjectOfValues(items = {}, rewrite = true, callback = emptyFunc) {
    validateType('object', items);
    validateRewrite(rewrite);
    validateCallback(callback);

    for(let k in items) {
      let value = items[k];

      this.setItem(k, value);
    }

    callback();
  },

  setFromArrayOfObjects(items = [], rewrite = true, callback = emptyFunc) {
    validateType('array', items);
    validateRewrite(rewrite);
    validateCallback(callback);

    items.map( obj => {
      this.setFromObjectOfValues(obj, rewrite);
    } );

    callback();
  }
}