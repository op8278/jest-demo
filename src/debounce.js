function debounce(fn, waitTime, isImmediate) {
  let timer;
  let result;

  const debounced = function() {
    const context = this;
    const args = [...arguments];
    timer && clearTimeout(timer);
    if (isImmediate) {
      let flag = !timer;
      timer = setTimeout(() => {
        flag = null;
      }, waitTime);

      if (flag) {
        result = fn.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, waitTime);
    }

    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

function throttle(fn, waitTime) {
  let timer;
  let previous = 0;

  const throttled = function() {
    const current = Date.now();
    const context = this;
    const args = [...arguments];
    const remain = waitTime - (current - previous);

    if (remain <= 0 || remain > waitTime) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = current;
      fn.apply(context, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        previous = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remain);
    }
  };
  throttled.cancel = function() {
    clearTimeout(timer);
    previous = 0;
    timer = null;
  };

  return throttled;
}
module.exports = {
  debounce,
  throttle
};
