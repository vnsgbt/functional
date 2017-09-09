
function fib(n) {
  if (n < 2) {
    return n;
  }
 
  return fib(n - 1) + fib(n - 2);
}


function fib(n) {
  if (n < 2) {
    return n;
  }
 
  var n0 = 0;
  var n1 = 1;
  var ans = 0;
 
  for (var i = 2; i <= n; i++) {
    ans = n0 + n1;
    n0 = n1;
    n1 = ans;
  }
 
  return ans;
}


var Cons = function(head, tail) {
  this.head = head;
  this.tail = tail;
};
 
Cons.prototype.isEmpty = false;


var Nil = {
  isEmpty: true,
 
  get head() {
    throw new Error('Accessing head on empty list.');
  },
 
  get tail() {
    throw new Error('Accessing tail on empty list.');
  }
};



var list = new Cons(1, new Cons(3, new Cons(42, new Cons(28, Nil))));


//console.log(list)



var cons = function(head, tail) {
  return new Cons(head, tail);
};
 
var list1 = cons(1, cons(3, cons(42, cons(28, Nil))));

//console.log(list1)


var map = function(list, fn) {
  if (list.isEmpty) {
    return list;
  }
 
  return cons(fn(list.head), map(list.tail, fn));
};


var list2 = cons(1, cons(2, cons(3, Nil)));
var double = (n) => n * 2;
 
map(list, double); // yields:
 
//console.log(cons(2, map(cons(2, cons(3, Nil)), double)))
//console.log(cons(2, cons(4, map(cons(3, Nil), double))))
//console.log(cons(2, cons(4, cons(6, map(Nil, double)))))
//console.log(cons(2, cons(4, cons(6, Nil))))


Cons.prototype.map = function(fn) {
  return cons(fn(this.head), this.tail.map(fn));
};
 
Nil.map = function() {
  return this;
};

var list3 = cons(1, cons(2, cons(3, Nil)));
var double = (n) => n * 2;
 
console.log(list.map(double)) // cons(2, cons(4, cons(6, Nil)))


var reduce = function(list, fn, memo) {
  if (list.isEmpty) {
    return memo;
  }
 
  return reduce(list.tail, fn, fn(memo, list.head));
};

var list4 = cons(1, cons(2, cons(3, Nil)));
var add = (x, y) => x + y;
 
console.log(reduce(list4, add, 0)) //=> 6

Cons.prototype.reduce = function(fn, memo) {
  return this.tail.reduce(fn, fn(memo, this.head));
};
 
Nil.reduce = function(fn, memo) {
  return memo;
};


Cons.prototype.reduceRight = function(fn, memo) {
  return fn(this.tail.reduceRight(fn, memo), this.head);
};
 
Nil.reduceRight = Nil.reduce;

Cons.prototype.map = function (fn) {
  var consBuilder = function(memo, value) {
    return cons(fn(value), memo);
  };
 
  return this.reduceRight(consBuilder, Nil);
};


var list = function () {
  if (arguments.length === 0) {
    return Nil;
  }
 
  var head = arguments[0];
  var tail = [].slice.call(arguments, 1);
 
  return cons(head, list.apply(null, tail));
};


var myList = list(1, 3, 5);
//=> cons(1, cons(3, cons(5, Nil)));
 
var myOtherList = myList.map(n => n * 3);
//=> cons(3, cons(9, cons(15, Nil)));
 
var nine = myList.reduce((x, y) => x + y);
//=> 9
 
var listOfLists = list(list(1), list(2), list(3));
//=> cons(cons(1, Nil), cons(cons(2, Nil), cons(cons(3, Nil), Nil)));
 
var flattened = listOfLists.map(innerList => innerList.head);
//=> cons(1, cons(2, cons(3, Nil)));

