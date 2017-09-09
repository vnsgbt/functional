function *naturalNumbers() {
  let n = 1;
 
  while (true) {
    yield n++;
  }
}
 
const nats = naturalNumbers();
 
//console.log(nats.next().value) // 1
//console.log(nats.next().value) // 2
//console.log(nats.next().value) // 3



function *naturalNumbers () {
  function *_naturalNumbers(n) {
    yield n;
    yield *_naturalNumbers(n + 1);
  }
 
  yield *_naturalNumbers(1);
}
 
const nats2 = naturalNumbers();
 
//console.log(nats2.next().value) // 1
//console.log(nats2.next().value) // 2
//console.log(nats2.next().value) // 3



function naturalNumbers() {
  function _stream(n) {
    return {
      value: n,
      next() {
        return _stream(n + 1);
      }
    };
  }
 
  return () => _stream(1);
}
 
const nats3 = naturalNumbers();
const one = nats3();
const two = one.next();
const three = two.next();
 
//console.log(one.value);
//console.log(two.value);
//console.log(three.value);

function take(n, str) {
  function _take(n, str, accum) {
    if (n === 0) {
      return accum;
    }
 
    const { value, next } = str();
 
    return _take(n - 1, next, accum.concat(value));
  }
 
  return _take(n, str, []);
}

const nats4 = naturalNumbers();
const firstTen = take(10, nats4);
 
//console.log(firstTen);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


function fibonacciSequence() {
  function _stream(current, next) {
    return {
      value: current,
      next() {
        return _stream(next, current + next);
      }
    };
  }
 
  return () => _stream(0, 1);
}
 
const fibs = fibonacciSequence();
const firstTen1 = take(10, fibs);
 
// console.log(firstTen1);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


function stream(fn, initial) {
  function _stream(value) {
    return {
      value,
      next() {
        return _stream(fn(value));
      }
    };
  }
 
  return () => _stream(initial);
}


const nats5 = stream(n => n + 1, 1);
const fibs2 = stream(([current, next]) => [next, current + next], [0, 1]);
 
//console.log(take(10, nats5));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 
//console.log(take(10, fibs2));


function map(fn, originalStr) {
  function _stream(str) {
    const { value, next } = str();
 
    return {
      value: fn(value),
      next() {
        return _stream(next);
      }
    };
  }
 
  return () => _stream(originalStr);
}

function first(array) {
  return array[0];
}
 
const fibs3 = map(first, stream(([current, next]) => [next, current + next], [0, 1]));
 
console.log(take(10, fibs));
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


const nats6 = stream(n => n + 1, 1);
const evenNumbers = map(n => n * 2, nats);
 
console.log(take(10, evenNumbers));
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]


function filter(fn, originalStr) {
  function _stream(str) {
    const { value, next } = str();
 
    if (fn(value)) {
      return {
        value,
        next() {
          return _stream(next);
        }
      };
    }
 
    return _stream(next);
  }
 
  return () => _stream(originalStr);
}


const nats7 = stream(n => n + 1, 1);
const oddNumbers = filter(n => n % 2 !== 0, nats);
const gte42 = filter(n => n >= 42, nats);
 
console.log(take(10, oddNumbers));
// [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
 
console.log(take(10, gte42));
// [42, 43, 44, 45, 46, 47, 48, 49, 50, 51]


