export const type = {
  getType(item) {
    if( ['undefined', 'bigint', 'boolean', 'string', 'symbol', 'function'].includes(typeof item) ) {
      return typeof item;
    } else if(typeof item === 'number') {
      return isNaN(item) ? 'NaN' : !isFinite(item) ? 'Infinity' : typeof item;
    } else if(typeof item === 'object') {
      return item === null ? 'null' : Array.isArray(item) ? 'array' : typeof item;
    } else {
      throw new Error('Type error');
    }
  },

  isUndefined(item) {
    return this.getType(item) === 'undefined';
  },

  isNull(item) {
    return this.getType(item) === 'null';
  },

  isBoolean(item) {
    return this.getType(item) === 'boolean';
  },

  isNumber(item) {
    return this.getType(item) === 'number';
  },

  isInfinity(item) {
    return this.getType(item) === 'Infinity';
  },

  isNaN() {
    return this.getType(item) === 'NaN';
  },

  isBigInt(item) {
    return this.getType(item) === 'bigint';
  },

  isString(item) {
    return this.getType(item) === 'string';
  },

  isFunction(item) {
    return this.getType(item) === 'function';
  },

  isArray(item) {
    return this.getType(item) === 'array';
  },

  isObject(item) {
    return this.getType(item) === 'object';
  },

  isSymbol(item) {
    return this.getType(item) === 'symbol';
  }
}