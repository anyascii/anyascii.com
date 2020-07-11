var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$F =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$f = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$e = fails$f;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$e(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var call$e = Function.prototype.call;

var functionCall = call$e.bind ? call$e.bind(call$e) : function () {
  return call$e.apply(call$e, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var FunctionPrototype$3 = Function.prototype;
var bind$5 = FunctionPrototype$3.bind;
var call$d = FunctionPrototype$3.call;
var callBind = bind$5 && bind$5.bind(call$d);

var functionUncurryThis = bind$5 ? function (fn) {
  return fn && callBind(call$d, fn);
} : function (fn) {
  return fn && function () {
    return call$d.apply(fn, arguments);
  };
};

var uncurryThis$m = functionUncurryThis;

var toString$8 = uncurryThis$m({}.toString);
var stringSlice$4 = uncurryThis$m(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$4(toString$8(it), 8, -1);
};

var global$E = global$F;
var uncurryThis$l = functionUncurryThis;
var fails$d = fails$f;
var classof$9 = classofRaw$1;

var Object$5 = global$E.Object;
var split = uncurryThis$l(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$d(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$5('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$9(it) == 'String' ? split(it, '') : Object$5(it);
} : Object$5;

var global$D = global$F;

var TypeError$c = global$D.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (it == undefined) throw TypeError$c("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$8 = function (it) {
  return IndexedObject$1(requireObjectCoercible$3(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$j = function (argument) {
  return typeof argument == 'function';
};

var isCallable$i = isCallable$j;

var isObject$b = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$i(it);
};

var global$C = global$F;
var isCallable$h = isCallable$j;

var aFunction = function (argument) {
  return isCallable$h(argument) ? argument : undefined;
};

var getBuiltIn$6 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$C[namespace]) : global$C[namespace] && global$C[namespace][method];
};

var uncurryThis$k = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$k({}.isPrototypeOf);

var getBuiltIn$5 = getBuiltIn$6;

var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

var global$B = global$F;
var userAgent = engineUserAgent;

var process = global$B.process;
var Deno = global$B.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$c = fails$f;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$c(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$3 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$3
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$A = global$F;
var getBuiltIn$4 = getBuiltIn$6;
var isCallable$g = isCallable$j;
var isPrototypeOf$2 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$4 = global$A.Object;

var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$4('Symbol');
  return isCallable$g($Symbol) && isPrototypeOf$2($Symbol.prototype, Object$4(it));
};

var global$z = global$F;

var String$4 = global$z.String;

var tryToString$3 = function (argument) {
  try {
    return String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$y = global$F;
var isCallable$f = isCallable$j;
var tryToString$2 = tryToString$3;

var TypeError$b = global$y.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$4 = function (argument) {
  if (isCallable$f(argument)) return argument;
  throw TypeError$b(tryToString$2(argument) + ' is not a function');
};

var aCallable$3 = aCallable$4;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$3(func);
};

var global$x = global$F;
var call$c = functionCall;
var isCallable$e = isCallable$j;
var isObject$a = isObject$b;

var TypeError$a = global$x.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$a(val = call$c(fn, input))) return val;
  if (isCallable$e(fn = input.valueOf) && !isObject$a(val = call$c(fn, input))) return val;
  if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$a(val = call$c(fn, input))) return val;
  throw TypeError$a("Can't convert object to primitive value");
};

var shared$5 = {exports: {}};

var global$w = global$F;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$4(global$w, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$w[key] = value;
  } return value;
};

var global$v = global$F;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$v[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$5.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.3',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var global$u = global$F;
var requireObjectCoercible$2 = requireObjectCoercible$4;

var Object$3 = global$u.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return Object$3(requireObjectCoercible$2(argument));
};

var uncurryThis$j = functionUncurryThis;
var toObject$4 = toObject$5;

var hasOwnProperty = uncurryThis$j({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$4(it), key);
};

var uncurryThis$i = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$7 = uncurryThis$i(1.0.toString);

var uid$3 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$7(++id + postfix, 36);
};

var global$t = global$F;
var shared$4 = shared$5.exports;
var hasOwn$c = hasOwnProperty_1;
var uid$2 = uid$3;
var NATIVE_SYMBOL$2 = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore$1 = shared$4('wks');
var Symbol$1 = global$t.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

var wellKnownSymbol$j = function (name) {
  if (!hasOwn$c(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$2 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL$2 && hasOwn$c(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore$1[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore$1[name];
};

var global$s = global$F;
var call$b = functionCall;
var isObject$9 = isObject$b;
var isSymbol$2 = isSymbol$3;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$i = wellKnownSymbol$j;

var TypeError$9 = global$s.TypeError;
var TO_PRIMITIVE$1 = wellKnownSymbol$i('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$9(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE$1);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$b(exoticToPrim, input, pref);
    if (!isObject$9(result) || isSymbol$2(result)) return result;
    throw TypeError$9("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$3;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$4 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var global$r = global$F;
var isObject$8 = isObject$b;

var document$1 = global$r.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$8(document$1) && isObject$8(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$8 = descriptors;
var fails$b = fails$f;
var createElement = documentCreateElement$2;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$8 && !fails$b(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$7 = descriptors;
var call$a = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$7 = toIndexedObject$8;
var toPropertyKey$3 = toPropertyKey$4;
var hasOwn$b = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$7(O);
  P = toPropertyKey$3(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$a(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var global$q = global$F;
var isObject$7 = isObject$b;

var String$3 = global$q.String;
var TypeError$8 = global$q.TypeError;

// `Assert: Type(argument) is Object`
var anObject$d = function (argument) {
  if (isObject$7(argument)) return argument;
  throw TypeError$8(String$3(argument) + ' is not an object');
};

var global$p = global$F;
var DESCRIPTORS$6 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$c = anObject$d;
var toPropertyKey$2 = toPropertyKey$4;

var TypeError$7 = global$p.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$6 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$c(O);
  P = toPropertyKey$2(P);
  anObject$c(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$7('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$5 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$6 = DESCRIPTORS$5 ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$6 = {exports: {}};

var uncurryThis$h = functionUncurryThis;
var isCallable$d = isCallable$j;
var store$1 = sharedStore;

var functionToString$1 = uncurryThis$h(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$d(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString$1(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$o = global$F;
var isCallable$c = isCallable$j;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$o.WeakMap;

var nativeWeakMap = isCallable$c(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$3 = shared$5.exports;
var uid$1 = uid$3;

var keys = shared$3('keys');

var sharedKey$4 = function (key) {
  return keys[key] || (keys[key] = uid$1(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$n = global$F;
var uncurryThis$g = functionUncurryThis;
var isObject$6 = isObject$b;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
var hasOwn$a = hasOwnProperty_1;
var shared$2 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$4 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$6 = global$n.TypeError;
var WeakMap = global$n.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$6(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$6('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$2.state) {
  var store = shared$2.state || (shared$2.state = new WeakMap());
  var wmget = uncurryThis$g(store.get);
  var wmhas = uncurryThis$g(store.has);
  var wmset = uncurryThis$g(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$6(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$3('state');
  hiddenKeys$4[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$a(it, STATE)) throw new TypeError$6(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$5(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$a(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$a(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var DESCRIPTORS$4 = descriptors;
var hasOwn$9 = hasOwnProperty_1;

var FunctionPrototype$2 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$9(FunctionPrototype$2, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$2, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$m = global$F;
var isCallable$b = isCallable$j;
var hasOwn$8 = hasOwnProperty_1;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$3 = internalState;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

var getInternalState$4 = InternalStateModule$3.get;
var enforceInternalState = InternalStateModule$3.enforce;
var TEMPLATE = String(String).split('String');

(redefine$6.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable$b(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn$8(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      createNonEnumerableProperty$4(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global$m) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$4(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$b(this) && getInternalState$4(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$3 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

var max$2 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$2(index);
  return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$5 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$6 = toIndexedObject$8;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$4 = lengthOfArrayLike$5;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$6($this);
    var length = lengthOfArrayLike$4(O);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var uncurryThis$f = functionUncurryThis;
var hasOwn$7 = hasOwnProperty_1;
var toIndexedObject$5 = toIndexedObject$8;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var push$3 = uncurryThis$f([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$5(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$7(hiddenKeys$3, key) && hasOwn$7(O, key) && push$3(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$7(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$3(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$2);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$3 = getBuiltIn$6;
var uncurryThis$e = functionUncurryThis;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$b = anObject$d;

var concat$1 = uncurryThis$e([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$b(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$6 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$4 = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$4.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$6(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$a = fails$f;
var isCallable$a = isCallable$j;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$a(detection) ? fails$a(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$l = global$F;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
var redefine$5 = redefine$6.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$l;
  } else if (STATIC) {
    target = global$l[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$l[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$5(target, key, sourceProperty, options);
  }
};

var uncurryThis$d = functionUncurryThis;

var arraySlice$4 = uncurryThis$d([].slice);

var global$k = global$F;
var uncurryThis$c = functionUncurryThis;
var aCallable$2 = aCallable$4;
var isObject$5 = isObject$b;
var hasOwn$5 = hasOwnProperty_1;
var arraySlice$3 = arraySlice$4;

var Function$1 = global$k.Function;
var concat = uncurryThis$c([].concat);
var join = uncurryThis$c([].join);
var factories = {};

var construct$1 = function (C, argsLength, args) {
  if (!hasOwn$5(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = Function$1('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = Function$1.bind || function bind(that /* , ...args */) {
  var F = aCallable$2(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice$3(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice$3(arguments));
    return this instanceof boundFunction ? construct$1(F, args.length, args) : F.apply(that, args);
  };
  if (isObject$5(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

var $$9 = _export;
var bind$4 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$$9({ target: 'Function', proto: true }, {
  bind: bind$4
});

var wellKnownSymbol$h = wellKnownSymbol$j;

var TO_STRING_TAG$3 = wellKnownSymbol$h('toStringTag');
var test = {};

test[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var global$j = global$F;
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$9 = isCallable$j;
var classofRaw = classofRaw$1;
var wellKnownSymbol$g = wellKnownSymbol$j;

var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
var Object$2 = global$j.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$8 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object$2(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$9(O.callee) ? 'Arguments' : result;
};

var global$i = global$F;
var classof$7 = classof$8;

var String$2 = global$i.String;

var toString$6 = function (argument) {
  if (classof$7(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String$2(argument);
};

var uncurryThis$b = functionUncurryThis;
var toIntegerOrInfinity = toIntegerOrInfinity$3;
var toString$5 = toString$6;
var requireObjectCoercible$1 = requireObjectCoercible$4;

var charAt$3 = uncurryThis$b(''.charAt);
var charCodeAt = uncurryThis$b(''.charCodeAt);
var stringSlice$3 = uncurryThis$b(''.slice);

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$5(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$3(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$3(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var $$8 = _export;
var codeAt = stringMultibyte.codeAt;

// `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat
$$8({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

var anObject$a = anObject$d;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$a(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var fails$9 = fails$f;
var global$h = global$F;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$h.RegExp;

var UNSUPPORTED_Y$2 = fails$9(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$9(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$9(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var anObject$9 = anObject$d;
var toIndexedObject$4 = toIndexedObject$8;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$9(O);
  var props = toIndexedObject$4(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$2 = getBuiltIn$6;

var html$1 = getBuiltIn$2('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$8 = anObject$d;
var defineProperties = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$5;
var html = html$1;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$4;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$8(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

var fails$8 = fails$f;
var global$g = global$F;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$g.RegExp;

var regexpUnsupportedDotAll = fails$8(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$7 = fails$f;
var global$f = global$F;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$f.RegExp;

var regexpUnsupportedNcg = fails$7(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$9 = functionCall;
var uncurryThis$a = functionUncurryThis;
var toString$4 = toString$6;
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared$1 = shared$5.exports;
var create$2 = objectCreate;
var getInternalState$3 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$2 = uncurryThis$a(''.charAt);
var indexOf = uncurryThis$a(''.indexOf);
var replace$1 = uncurryThis$a(''.replace);
var stringSlice$2 = uncurryThis$a(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$9(nativeExec, re1, 'a');
  call$9(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$3(re);
    var str = toString$4(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$9(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = call$9(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$1(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$2(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$9(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$2(match.input, charsAdded);
        match[0] = stringSlice$2(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$9(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$3 = patchedExec;

var $$7 = _export;
var exec$2 = regexpExec$3;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$7({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
  exec: exec$2
});

var FunctionPrototype$1 = Function.prototype;
var apply$2 = FunctionPrototype$1.apply;
var bind$3 = FunctionPrototype$1.bind;
var call$8 = FunctionPrototype$1.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$3 ? call$8.bind(apply$2) : function () {
  return call$8.apply(apply$2, arguments);
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$9 = functionUncurryThis;
var redefine$4 = redefine$6.exports;
var regexpExec$2 = regexpExec$3;
var fails$6 = fails$f;
var wellKnownSymbol$f = wellKnownSymbol$j;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;

var SPECIES$4 = wellKnownSymbol$f('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$f(KEY);

  var DELEGATES_TO_SYMBOL = !fails$6(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$6(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$4] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$9(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$9(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine$4(String.prototype, KEY, methods[0]);
    redefine$4(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$2(RegExpPrototype[SYMBOL], 'sham', true);
};

var isObject$4 = isObject$b;
var classof$6 = classofRaw$1;
var wellKnownSymbol$e = wellKnownSymbol$j;

var MATCH = wellKnownSymbol$e('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$4(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$6(it) == 'RegExp');
};

var uncurryThis$8 = functionUncurryThis;
var fails$5 = fails$f;
var isCallable$8 = isCallable$j;
var classof$5 = classof$8;
var getBuiltIn$1 = getBuiltIn$6;
var inspectSource = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$1('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$8(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable$8(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable$8(argument)) return false;
  switch (classof$5(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$4 = !construct || fails$5(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var global$e = global$F;
var isConstructor$3 = isConstructor$4;
var tryToString$1 = tryToString$3;

var TypeError$5 = global$e.TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor$3(argument)) return argument;
  throw TypeError$5(tryToString$1(argument) + ' is not a constructor');
};

var anObject$7 = anObject$d;
var aConstructor = aConstructor$1;
var wellKnownSymbol$d = wellKnownSymbol$j;

var SPECIES$3 = wellKnownSymbol$d('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$7(O).constructor;
  var S;
  return C === undefined || (S = anObject$7(C)[SPECIES$3]) == undefined ? defaultConstructor : aConstructor(S);
};

var charAt$1 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};

var toPropertyKey$1 = toPropertyKey$4;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;

var createProperty$3 = function (object, key, value) {
  var propertyKey = toPropertyKey$1(key);
  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$2(0, value));
  else object[propertyKey] = value;
};

var global$d = global$F;
var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var lengthOfArrayLike$3 = lengthOfArrayLike$5;
var createProperty$2 = createProperty$3;

var Array$4 = global$d.Array;
var max$1 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$3(O);
  var k = toAbsoluteIndex$1(start, length);
  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
  var result = Array$4(max$1(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
  result.length = n;
  return result;
};

var global$c = global$F;
var call$7 = functionCall;
var anObject$6 = anObject$d;
var isCallable$7 = isCallable$j;
var classof$4 = classofRaw$1;
var regexpExec$1 = regexpExec$3;

var TypeError$4 = global$c.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$7(exec)) {
    var result = call$7(exec, R, S);
    if (result !== null) anObject$6(result);
    return result;
  }
  if (classof$4(R) === 'RegExp') return call$7(regexpExec$1, R, S);
  throw TypeError$4('RegExp#exec called on incompatible receiver');
};

var apply$1 = functionApply;
var call$6 = functionCall;
var uncurryThis$7 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var isRegExp = isRegexp;
var anObject$5 = anObject$d;
var requireObjectCoercible = requireObjectCoercible$4;
var speciesConstructor = speciesConstructor$1;
var advanceStringIndex = advanceStringIndex$1;
var toLength = toLength$2;
var toString$3 = toString$6;
var getMethod$2 = getMethod$4;
var arraySlice$2 = arraySliceSimple;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers = regexpStickyHelpers;
var fails$4 = fails$f;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis$7(/./.exec);
var push$2 = uncurryThis$7($push);
var stringSlice$1 = uncurryThis$7(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$4(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString$3(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call$6(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call$6(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push$2(output, stringSlice$1(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply$1($push, output, arraySlice$2(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push$2(output, '');
      } else push$2(output, stringSlice$1(string, lastLastIndex));
      return output.length > lim ? arraySlice$2(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call$6(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod$2(separator, SPLIT);
      return splitter
        ? call$6(splitter, separator, O, limit)
        : call$6(internalSplit, toString$3(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject$5(this);
      var S = toString$3(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$1(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push$2(A, stringSlice$1(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push$2(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push$2(A, stringSlice$1(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

var classof$3 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$4 = Array.isArray || function isArray(argument) {
  return classof$3(argument) == 'Array';
};

var fails$3 = fails$f;
var wellKnownSymbol$c = wellKnownSymbol$j;
var V8_VERSION = engineV8Version;

var SPECIES$2 = wellKnownSymbol$c('species');

var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails$3(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$2] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$6 = _export;
var global$b = global$F;
var isArray$3 = isArray$4;
var isConstructor$2 = isConstructor$4;
var isObject$3 = isObject$b;
var toAbsoluteIndex = toAbsoluteIndex$3;
var lengthOfArrayLike$2 = lengthOfArrayLike$5;
var toIndexedObject$3 = toIndexedObject$8;
var createProperty$1 = createProperty$3;
var wellKnownSymbol$b = wellKnownSymbol$j;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
var un$Slice = arraySlice$4;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES$1 = wellKnownSymbol$b('species');
var Array$3 = global$b.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$3(this);
    var length = lengthOfArrayLike$2(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$3(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor$2(Constructor) && (Constructor === Array$3 || isArray$3(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$3(Constructor)) {
        Constructor = Constructor[SPECIES$1];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array$3 || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array$3 : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$2 = classof$8;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$2(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine$3 = redefine$6.exports;
var toString$2 = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$3(Object.prototype, 'toString', toString$2, { unsafe: true });
}

var DESCRIPTORS$2 = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis$6 = functionUncurryThis;
var defineProperty$3 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis$6(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis$6(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$2 && !FUNCTION_NAME_EXISTS) {
  defineProperty$3(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var uncurryThis$5 = functionUncurryThis;
var aCallable$1 = aCallable$4;

var bind$2 = uncurryThis$5(uncurryThis$5.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined ? fn : bind$2 ? bind$2(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var call$5 = functionCall;
var anObject$4 = anObject$d;
var getMethod$1 = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$4(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$5(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$4(innerResult);
  return value;
};

var anObject$3 = anObject$d;
var iteratorClose = iteratorClose$1;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var iterators = {};

var wellKnownSymbol$a = wellKnownSymbol$j;
var Iterators$4 = iterators;

var ITERATOR$5 = wellKnownSymbol$a('iterator');
var ArrayPrototype$1 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
};

var classof$1 = classof$8;
var getMethod = getMethod$4;
var Iterators$3 = iterators;
var wellKnownSymbol$9 = wellKnownSymbol$j;

var ITERATOR$4 = wellKnownSymbol$9('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR$4)
    || getMethod(it, '@@iterator')
    || Iterators$3[classof$1(it)];
};

var global$a = global$F;
var call$4 = functionCall;
var aCallable = aCallable$4;
var anObject$2 = anObject$d;
var tryToString = tryToString$3;
var getIteratorMethod$1 = getIteratorMethod$2;

var TypeError$3 = global$a.TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject$2(call$4(iteratorMethod, argument));
  throw TypeError$3(tryToString(argument) + ' is not iterable');
};

var global$9 = global$F;
var bind$1 = functionBindContext;
var call$3 = functionCall;
var toObject$3 = toObject$5;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var isConstructor$1 = isConstructor$4;
var lengthOfArrayLike$1 = lengthOfArrayLike$5;
var createProperty = createProperty$3;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;

var Array$2 = global$9.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject$3(arrayLike);
  var IS_CONSTRUCTOR = isConstructor$1(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array$2 && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call$3(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike$1(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array$2(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var wellKnownSymbol$8 = wellKnownSymbol$j;

var ITERATOR$3 = wellKnownSymbol$8('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$3] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $$5 = _export;
var from = arrayFrom;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$$5({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

var fails$2 = fails$f;

var correctPrototypeGetter = !fails$2(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var global$8 = global$F;
var hasOwn$4 = hasOwnProperty_1;
var isCallable$6 = isCallable$j;
var toObject$2 = toObject$5;
var sharedKey$1 = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey$1('IE_PROTO');
var Object$1 = global$8.Object;
var ObjectPrototype$1 = Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
  var object = toObject$2(O);
  if (hasOwn$4(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$6(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object$1 ? ObjectPrototype$1 : null;
};

var fails$1 = fails$f;
var isCallable$5 = isCallable$j;
var getPrototypeOf$1 = objectGetPrototypeOf;
var redefine$2 = redefine$6.exports;
var wellKnownSymbol$7 = wellKnownSymbol$j;

var ITERATOR$2 = wellKnownSymbol$7('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$5(IteratorPrototype$2[ITERATOR$2])) {
  redefine$2(IteratorPrototype$2, ITERATOR$2, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var wellKnownSymbol$6 = wellKnownSymbol$j;

var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');

var setToStringTag$3 = function (it, TAG, STATIC) {
  if (it && !hasOwn$3(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
    defineProperty$2(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;
var setToStringTag$2 = setToStringTag$3;
var Iterators$2 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var global$7 = global$F;
var isCallable$4 = isCallable$j;

var String$1 = global$7.String;
var TypeError$2 = global$7.TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$4(argument)) return argument;
  throw TypeError$2("Can't set " + String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$4 = functionUncurryThis;
var anObject$1 = anObject$d;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$4(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$1(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$4 = _export;
var call$2 = functionCall;
var FunctionName = functionName;
var isCallable$3 = isCallable$j;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
var redefine$1 = redefine$6.exports;
var wellKnownSymbol$5 = wellKnownSymbol$j;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol$5('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$3(CurrentIteratorPrototype[ITERATOR$1])) {
          redefine$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$2(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$1(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$4({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    redefine$1(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
  }
  Iterators$1[NAME] = defaultIterator;

  return methods;
};

var charAt = stringMultibyte.charAt;
var toString$1 = toString$6;
var InternalStateModule$2 = internalState;
var defineIterator$1 = defineIterator$2;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$2 = InternalStateModule$2.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator$1(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: toString$1(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$3 = _export;
var global$6 = global$F;
var call$1 = functionCall;
var uncurryThis$3 = functionUncurryThis;
var isCallable$2 = isCallable$j;
var isObject$2 = isObject$b;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global$6.Error;
var un$Test = uncurryThis$3(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$$3({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable$2(exec)) return un$Test(this, str);
    var result = call$1(exec, this, str);
    if (result !== null && !isObject$2(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var classof = classofRaw$1;
var toIndexedObject$2 = toIndexedObject$8;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var arraySlice$1 = arraySliceSimple;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return arraySlice$1(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$2(it));
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$4 = wellKnownSymbol$j;

wellKnownSymbolWrapped.f = wellKnownSymbol$4;

var global$5 = global$F;

var path$1 = global$5;

var path = path$1;
var hasOwn$2 = hasOwnProperty_1;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol$2 = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn$2(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var global$4 = global$F;
var isArray$2 = isArray$4;
var isConstructor = isConstructor$4;
var isObject$1 = isObject$b;
var wellKnownSymbol$3 = wellKnownSymbol$j;

var SPECIES = wellKnownSymbol$3('species');
var Array$1 = global$4.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$2(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array$1 || isArray$2(C.prototype))) C = undefined;
    else if (isObject$1(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array$1 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind = functionBindContext;
var uncurryThis$2 = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject$1 = toObject$5;
var lengthOfArrayLike = lengthOfArrayLike$5;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push$1 = uncurryThis$2([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$1($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var $$2 = _export;
var global$3 = global$F;
var getBuiltIn = getBuiltIn$6;
var apply = functionApply;
var call = functionCall;
var uncurryThis$1 = functionUncurryThis;
var DESCRIPTORS$1 = descriptors;
var NATIVE_SYMBOL$1 = nativeSymbol;
var fails = fails$f;
var hasOwn$1 = hasOwnProperty_1;
var isArray$1 = isArray$4;
var isCallable$1 = isCallable$j;
var isObject = isObject$b;
var isPrototypeOf$1 = objectIsPrototypeOf;
var isSymbol = isSymbol$3;
var anObject = anObject$d;
var toObject = toObject$5;
var toIndexedObject$1 = toIndexedObject$8;
var toPropertyKey = toPropertyKey$4;
var $toString = toString$6;
var createPropertyDescriptor = createPropertyDescriptor$5;
var nativeObjectCreate = objectCreate;
var objectKeys = objectKeys$2;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var arraySlice = arraySlice$4;
var redefine = redefine$6.exports;
var shared = shared$5.exports;
var sharedKey = sharedKey$4;
var hiddenKeys = hiddenKeys$5;
var uid = uid$3;
var wellKnownSymbol$2 = wellKnownSymbol$j;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;
var setToStringTag = setToStringTag$3;
var InternalStateModule$1 = internalState;
var $forEach = arrayIteration.forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global$3.Symbol;
var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
var TypeError$1 = global$3.TypeError;
var QObject = global$3.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule$1.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis$1([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$1 && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$1) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn$1(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject$1(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS$1 || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn$1(AllSymbols, P) && !hasOwn$1(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn$1(this, P) || !hasOwn$1(AllSymbols, P) || hasOwn$1(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$1(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn$1(AllSymbols, key) && !hasOwn$1(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn$1(AllSymbols, key) && !(hasOwn$1(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn$1(AllSymbols, key) && !hasOwn$1(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$1(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL$1) {
  $Symbol = function Symbol() {
    if (isPrototypeOf$1(SymbolPrototype$1, this)) throw TypeError$1('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn$1(this, HIDDEN) && hasOwn$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype$1 = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype$1, 'toString', function toString() {
    return getInternalState$1(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule$1.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol$2(name), name);
  };

  if (DESCRIPTORS$1) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype$1, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1(this).description;
      }
    });
    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$$2({ global: true, wrap: true, forced: !NATIVE_SYMBOL$1, sham: !NATIVE_SYMBOL$1 }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$1(name);
});

$$2({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$1 }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError$1(sym + ' is not a symbol');
    if (hasOwn$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$2({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$1, sham: !DESCRIPTORS$1 }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$$2({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$1 }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$$2({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$1 || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $$2({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray$1(replacer)) replacer = function (key, value) {
        if (isCallable$1($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype$1[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype$1.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype$1, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

var $$1 = _export;
var DESCRIPTORS = descriptors;
var global$2 = global$F;
var uncurryThis = functionUncurryThis;
var hasOwn = hasOwnProperty_1;
var isCallable = isCallable$j;
var isPrototypeOf = objectIsPrototypeOf;
var toString = toString$6;
var defineProperty = objectDefineProperty.f;
var copyConstructorProperties = copyConstructorProperties$2;

var NativeSymbol = global$2.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $$1({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

var defineWellKnownSymbol = defineWellKnownSymbol$2;

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

var wellKnownSymbol$1 = wellKnownSymbol$j;
var create = objectCreate;
var definePropertyModule = objectDefineProperty;

var UNSCOPABLES = wellKnownSymbol$1('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var toIndexedObject = toIndexedObject$8;
var addToUnscopables = addToUnscopables$1;
var Iterators = iterators;
var InternalStateModule = internalState;
var defineIterator = defineIterator$2;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$1 = global$F;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$6;
var wellKnownSymbol = wellKnownSymbol$j;

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var $ = _export;
var isArray = isArray$4;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

function block(blockNum) {
  switch (blockNum) {
    case 0:
      return "																																																																																																																																																																 	!	c	L	$	Y	|	S	\"	(C)	a	<<	!	-	(R)	-	deg	+-	2	3	'	u	P	-	,	1	o	>>	1/4	1/2	3/4	?	A	A	A	A	A	A	Ae	C	E	E	E	E	I	I	I	I	D	N	O	O	O	O	O	*	O	U	U	U	U	Y	Th	ss	a	a	a	a	a	a	ae	c	e	e	e	e	i	i	i	i	d	n	o	o	o	o	o	/	o	u	u	u	u	y	th	y";

    case 1:
      return "A	a	A	a	A	a	C	c	C	c	C	c	C	c	D	d	D	d	E	e	E	e	E	e	E	e	E	e	G	g	G	g	G	g	G	g	H	h	H	h	I	i	I	i	I	i	I	i	I	i	IJ	ij	J	j	K	k	q	L	l	L	l	L	l	L	l	L	l	N	n	N	n	N	n	'n	Ng	ng	O	o	O	o	O	o	Oe	oe	R	r	R	r	R	r	S	s	S	s	S	s	S	s	T	t	T	t	T	t	U	u	U	u	U	u	U	u	U	u	U	u	W	w	Y	y	Y	Z	z	Z	z	Z	z	s	b	B	B	b	6	6	O	C	c	D	D	D	d	z	E	e	E	F	f	G	G	hw	I	I	K	k	l	l	W	N	n	O	O	o	Gh	gh	P	p	R	2	2	Sh	sh	t	T	t	T	U	u	U	V	Y	y	Z	z	Zh	`	`	zh	dz	5	5	ts	w	|	||	=	!	DZ	Dz	dz	LJ	Lj	lj	NJ	Nj	nj	A	a	I	i	O	o	U	u	U	u	U	u	U	u	U	u	e	A	a	A	a	Ae	ae	G	g	G	g	K	k	O	o	O	o	Zh	zh	j	DZ	Dz	dz	G	g	Hw	W	N	n	A	a	Ae	ae	O	o";

    case 2:
      return "A	a	A	a	E	e	E	e	I	i	I	i	O	o	O	o	R	r	R	r	U	u	U	u	S	s	T	t	Y	y	H	h	N	d	Ou	ou	Z	z	A	a	E	e	O	o	O	o	O	o	O	o	Y	y	l	n	t	j	db	qp	A	C	c	L	T	s	z	'	'	B	U	V	E	e	J	j	Q	q	R	r	Y	y	a	a	a	b	o	c	d	d	e	e	er	e	e	er	e	j	g	g	G	g	u	h	h	h	i	i	I	l	l	l	lzh	w	m	m	n	n	N	o	Oe	o	f	r	r	r	r	r	r	r	R	R	s	sh	j	r	sh	t	t	u	u	v	v	w	y	Y	z	z	zh	zh	'	`	x	c	@	B	e	G	H	j	k	L	q	'	`	dz	dzh	dz	ts	tsh	tc	fng	ls	lz	ww	]]	h	h	h	h	j	r	r	r	R	w	y	'	\"	'	'	'	'	`	?	?	<	>	^	v	^	v	'	-	'	`	,	_	,	,	:	'	`	'	,	,	+	-	^	.	'	,	~	\"	r	x	g	l	s	x	?	5	4	3	2	1	3	7	v	=	\"	v	^	<	>	.	`	``	''	~	:	'	'	,	,	_	_	<";

    case 3:
      return "																																																																																																			a	e	i	o	u	c	d	h	m	r	t	v	x	H	h	S	s	'	,	W	w			i	s	s.	s.	;	J					'	\"'	A	;	E	I	I		O		Y	O	i	A	V	G	D	E	Z	I	Th	I	K	L	M	N	X	O	P	R		S	T	Y	F	Ch	Ps	O	I	Y	a	e	i	i	y	a	v	g	d	e	z	i	th	i	k	l	m	n	x	o	p	r	s	s	t	y	f	ch	ps	o	i	y	o	y	o	&	b	th	Y	Y	Y	ph	p	&	Q	q	St	st	W	w	Q	q	S	s	Sh	sh	F	f	X	x	H	h	J	j	C	c	Ti	ti	k	r	s	j	Th	e	e	Sh	sh	S	S	s	r.	S	S.	S.";

    case 4:
      return "E	E	Dj	G	Ie	Dz	I	I	J	Lj	Nj	C	K	I	U	Dzh	A	B	V	G	D	E	Zh	Z	I	Y	K	L	M	N	O	P	R	S	T	U	F	Kh	Ts	Ch	Sh	Shch	'	Y	'	E	Yu	Ya	a	b	v	g	d	e	zh	z	i	y	k	l	m	n	o	p	r	s	t	u	f	kh	ts	ch	sh	shch	'	y	'	e	yu	ya	e	e	dj	g	ie	dz	i	i	j	lj	nj	c	k	i	u	dzh	O	o	E	e	Ie	ie	E	e	Ie	ie	O	o	Io	io	Ks	ks	Ps	ps	F	f	Y	y	Y	y	U	u	O	o	O	o	Ot	ot	Q	q	1000	.				.	100000	1000000	Jh	jh	'	'	Rh	rh	G	g	Gh	gh	Gh	gh	J	j	Z	z	Q	q	G	g	Q	q	Q	q	Ng	ng	Ng	ng	Ph	ph	W	w	S	s	Th	th	U	u	U	u	H	h	Ts	ts	J	j	C	c	H	h	Ch	ch	Ch	ch	H	Gi	gi	Q	q	Lh	lh	Ng	ng	Nh	nh	Dzh	dzh	Mh	mh	h	A	a	A	a	Ae	ae	E	e	A	a	E	e	Dzh	dzh	J	j	Dz	dz	I	i	I	i	O	o	O	o	Y	y	A	a	U	u	U	u	U	u	Tsh	tsh	Gh	gh	Y	y	Xh	xh	X	x	H	h";

    case 5:
      return "D	d	Dj	dj	Zj	zj	Dz	dz	Lj	lj	Nj	nj	Sj	sj	Tj	tj	A	a	L	l	Lkh	lkh	Rkh	rkh	A	a	Q	q	W	w	Q	q	L	l	N	n	Ph	ph	'	'	Ny	ny	Dzh	dzh	Dch	dch	L	l		A	B	G	D	E	Z	E	Y	T'	Zh	I	L	Kh	Ts	K	H	Dz	Gh	Ch	M	Y	N	Sh	O	Ch'	P	J	Rr	S	V	T	R	Ts'	W	P'	K'	O	F			`	'	*	!	,	?	.	a	a	b	g	d	e	z	e	y	t'	zh	i	l	kh	ts	k	h	dz	gh	ch	m	y	n	sh	o	ch'	p	j	rr	s	v	t	r	ts'	w	p'	k'	o	f	ev	h	.	-			*	*	Dram																																	e	e	a	o	i	e	e	a	a	o	o	u			-		|	h		.	`	`	^	o									'	v	g	d	h	v	z	h	t	y	kh	kh	l	m	m	n	n	s	'	f	f	ts	ts	k	r	s	t					YYY	v	oy	ey	'	\"";

    case 6:
      return "#	sn.	^	#	sm.	#	cbrt	4rt	r	%0	%00	Af	,	/	^	*							i					;			.	?	y	'	a	'	u'	'	i'		b	h	t	th	j	h	kh	d	dh	r	z	s	sh	s	d	t	dh	`	gh	g	g	y	i	i		f	q	k	l	m	n	h	w	y	y				a	u	i			a	'	'	i	o	e	e	o	e	e	o	a	'	0	1	2	3	4	5	6	7	8	9	%	.	,	*	b	q	a	'	a	u	'	a	o	u	i	t	th	b	t	t	p	th	bh	dz	dz	n	j	ts	ch	ch	d	d	d	dd	dh	dh	dh	d	d	r	r	r	r	r	zh	d	zh	r	sh	s	ch	ts	ch	th	ng	f	f	p	v	v	ph	q	g	k	k	g	g	g	kp	g	gg	n	g	g	n	l	l	l	l	n	n	n	n	ny	h	n	e	h	h	t	o	o	o	u	u	u	u	v	i	ey	e	v	e	ny	e	e'	.	e								#	#											^					d	l	0	1	2	3	4	5	6	7	8	9	s	l	n	&	m	h";

    case 7:
      return "*	.	.	!	!	:	:	:	;	?	.	/	\\	+		.	'	'	b	g	j	d	d	h	w	z	h	t	d	y	yh	k	l	m	n	s	s	`	p	p	s	q	r	sh	t	bh	gh	dh	a	a	a	o	u	a	e	e	i	e	i	i	i	u	u	o			h			h	h							zh	kh	ph	y	p	p	c	ny	p	c	ng	c	dd	d	r	sh	ng	ng	g	p	v	g	n	ng	b	mb	n	n	n	sl	r	zh	sh	j	c	s	z	j	a	aa	i	ii	y	o	oo	e	ee	ch	s	s	g	h	sh	n	r	b	lh	k		v	m	f	dh	th	l	g	gn	s	d	z	t	y	p	j	ch	th'	h'	kh	dh'	x	sh'	s'	l'	t'	z'	'	gh	q	w	a	aa	i	ee	u	oo	e	ey	o	oa		n															0	1	2	3	4	5	6	7	8	9	a	e	i	e	u	o	o		n	b	p	t	j	c	d	r	rr	s	gb	f	k	l	n	m	ny	n	h	w	y	ny	j	c	r								n		'	`	o	*	,	!	-			.	$	$";

    case 8:
      return "'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	f	s	q	r	sh	t	`	`			y	y	e	e	a	a	a	a	a	a	a	a	u	u	i	i	i	o					;	:	..	<.	<:	?	.	-<	-.	-:	=:	|:	/	.	...		a	b	g	d	h	u	z	h	t	i	k	l	m	n	s	`	p	s	q	r	sh	t	d	kd	`	'					,		n	j	n	t	n	n	bh	r	l	l	s																																																						b	b	c	t	vb	gb	zl	mv	y	ny	r	w	y		dz	ts	j	u	z	n	k		mb	mp	t	nr	ny	f	q	n	p	t	t	ch	k	gy	ky	n	n	l																											#	e	o	ou	e	on	oun	en							a	u	i	u	e	a	i	o	u	e	e	un	on	o	o";

    case 9:
      return "m	m	m	h	a	a	a	i	i	u	u	r	l	e	e	e	ai	o	o	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	n	p	ph	b	bh	m	y	r	r	l	l	l	v	s	s	s	h	o	o	'	'	a	i	i	u	u	r	r	e	e	e	ai	o	o	o	au		e	a	Om					e	u	u	q	kh	g	z	r	rh	f	y	r	l	l	l	,	.	0	1	2	3	4	5	6	7	8	9	.	'	a	o	o	a	u	u	d	zh	y	g	j	'	d	b	*	m	m	h		a	a	i	i	u	u	r	l			e	ai			o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r		l				s	s	s	h			'	'	a	i	i	u	u	r	r			e	ai			o	au		t									u					r	rh		y	r	l	l	l			0	1	2	3	4	5	6	7	8	9	r	v	Rs	Rs	1/16	1/8	3/16	1/4	3/4	/16	^	g	m	.	'";

    case 10:
      return "	m	m	h		a	a	i	i	u	u					e	ai			o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r		l	l		v	s		s	h			'		a	i	i	u	u					e	ai			o	au													kh	g	z	r		ph								0	1	2	3	4	5	6	7	8	9	m	'			*	y	.											m	m	h		a	a	i	i	u	u	r	l	e		e	ai	o		o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r		l	l		v	s	s	s	h			'	'	a	i	i	u	u	r	r	e		e	ai	o		o	au				Om																r	l	l	l			0	1	2	3	4	5	6	7	8	9	.	Rs								zh				'	'	'";

    case 11:
      return "	m	m	h		a	a	i	i	u	u	r	l			e	ai			o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r		l	l		v	s	s	s	h			'	'	a	i	i	u	u	r	r			e	ai			o	au										i	u					r	rh		y	r	l	l	l			0	1	2	3	4	5	6	7	8	9	^	w	1/4	1/2	3/4	1/16	1/8	3/16											m	k		a	a	i	i	u	u				e	e	ai		o	o	au	k				n	c		j		n	t				n	t				n	n	p				m	y	r	r	l	l	l	v	s	s	s	h					a	i	i	u	u				e	e	ai		o	o	au				Om							u															0	1	2	3	4	5	6	7	8	9	10	100	1000	N	M	V	-	+	-	Rs	#";

    case 12:
      return "m	n	m	h	m	a	a	i	i	u	u	r	l		e	e	ai		o	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r	r	l	l	l	v	s	s	s	h				'	a	i	i	u	u	r	r		e	e	ai		o	o	au									'	i		c	z	r						r	l	l	l			0	1	2	3	4	5	6	7	8	9								*	0	1	2	3	1	2	3	t	m	m	m	h	*	a	a	i	i	u	u	r	l		e	e	ai		o	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r	r	l	l		v	s	s	s	h			'	'	a	i	i	u	u	r	r		e	e	ai		o	o	au									'	i								l		r	l	l	l			0	1	2	3	4	5	6	7	8	9		h	h";

    case 13:
      return "m	m	m	h	m	a	a	i	i	u	u	r	l		e	e	ai		o	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	n	p	ph	b	bh	m	y	r	r	l	l	l	v	s	s	s	h	t			'	a	i	i	u	u	r	r		e	e	ai		o	o	au		r	p					m	y	l	u	1/160	1/40	3/8	1/20	1/10	3/20	1/5	i	r	l	l	l			0	1	2	3	4	5	6	7	8	9	10	100	1000	1/4	1/2	3/4	1/16	1/8	3/16	d	n	n	r	l	l	k		m	m	h		a	a	ae	ae	i	i	u	u	r	r	l	l	e	e	ai	o	o	au				k	kh	g	gh	n	ng	c	ch	j	jh	n	jn	nj	t	th	d	dh	n	nd	t	th	d	dh	n		nd	p	ph	b	bh	m	mb	y	r		l			v	s	s	s	h	l	f									a	ae	ae	i	i	u		u		r	e	e	ai	o	o	au	u							0	1	2	3	4	5	6	7	8	9			r	l	~";

    case 14:
      return "	k	kh	kh	kh	kh	kh	ng	ch	ch	ch	s	ch	y	d	t	th	th	th	n	d	t	th	th	th	n	b	p	ph	f	ph	f	ph	m	y	r	rue	l	lue	w	s	s	s	h	l	o	h	.	a	a	a	am	i	i	ue	ue	u	u						Bt	e	ae	o	ai	ai		-							m		*	0	1	2	3	4	5	6	7	8	9	#	@																																						k	kh		kh		gh	ng	ch	ch	x		jh	gn	n	t	th	d	dh	n	d	t	th	th	dh	n	b	p	ph	f	ph	f	bh	m	y	r		l		v	s	s	s	h	l		h	...	a	a	a	am	i	i	u	u	ou	ou		o	l	i			e	e	o	ai	ai		'							o			0	1	2	3	4	5	6	7	8	9			n	m	g	n";

    case 15:
      return "Om	@	@	@	@	#	$	%	!	*	*	-	-	/	//	;	|	|	/	*	:	*	*	*			o	oo	ooo	x	xx	ox	0	1	2	3	4	5	6	7	8	9	.5	1.5	2.5	3.5	4.5	5.5	6.5	7.5	8.5	-.5	=		^		*		<	>	(	)			k	kh	g	gh	ng	c	ch	j		ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	ts	tsh	dz	dzh	w	zh	z	'	y	r	l	sh	s	s	h		ks	r	q	r					a	i	i	u	u	r	r	l	l	e	ai	o	au	m	h	i	i		m		`											k	kh	g	gh	ng	c	ch	j		ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	ts	tsh	dz	dzh	w	zh	z	'	y	r	l	sh	s	s	h		ks	w	y	r		-	^	*	*	*	*	*	*		*	*	*	*	*	*		xo	xxx	*	*	:	@	#	+	+	+	+	^	^";

    case 16:
      return "k	kh	g	gh	n	c	ch	j	jh	n	nn	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	h	l	'	'	i	i	u	u	e	e	o	o	a	a	i	i	u	u	e	ai	i	ao	e	m					y	r	v	h	ss	0	1	2	3	4	5	6	7	8	9	,	.	n*	r*	l*	e*	s	s	r	r	l	l	r	r	l	l	n	jh	b	b	n	m	l	sh	oe			th	pw	oe	u						n	yw	khw	i	oe	u	ee	k	kh	g	c	z	n	d	n	ph	f	b	x	h	v	a	e	e	ai								f		0	1	2	3	4	5	6	7	8	9			a	ai	n*	u*	A	B	G	D	E	V	Z	T	I	K'	L	M	N	O	P'	Zh	R	S	T'	U	P	K	Gh	Q'	Sh	Ch	Ts	Dz	Ts'	Ch'	Kh	J	H	E	Y	W	X	O		E						Ae			a	b	g	d	e	v	z	t	i	k'	l	m	n	o	p'	zh	r	s	t'	u	p	k	gh	q'	sh	ch	ts	dz	ts'	ch'	kh	j	h	e	y	w	x	o	f	e	`	g	`	*	n	ae	`	w";

    case 17:
      return "g	kk	n	d	tt	l	m	b	pp	s	ss		j	jj	ch	k	t	p	h	ng	nn	nd	nb	dg	ln	ll	lh	lh	mb	mh	bg	bn	bd	bs	bsg	bsd	bsb	bss	bsj	bj	bch	bt	bp	v	pph	sg	sn	sd	sl	sm	sb	sbg	sss	s	sj	sch	sk	st	sp	sh	s	ss	s	ss	z	g	d	m	b	s	z		j	ch	t	p	ng	j	j	jj	j	jj	chk	chh	ch	ch	pb	f	hh	q	gd	ns	nj	nh	dl			a	ae	ya	yae	eo	e	yeo	ye	o	wa	wae	oe	yo	u	wo	we	wi	yu	eu	ui	i	ao	au	yao	yayo	eoo	eou	eoeu	yeoo	yeou	oeo	oe	oye	oo	ou	yoya	yoyae	yoyeo	yoo	yoi	ua	uae	ueoeu	uye	uu	yua	yueo	yue	yuyeo	yuye	yuu	yui	euu	eueu	uiu	ia	iya	io	iu	ieu	io	o	oeo	ou	oy	oo	aeu	yau	yeoya	oya	oyae	g	kk	gs	n	nj	nh	d	l	lg	lm	lb	ls	lt	lp	lh	m	b	bs	s	ss	ng	j	ch	k	t	p	h	gl	gsg	ng	nd	ns	nz	nt	dg	dl	lgs	ln	ld	ldh	ll	lmg	lms	lbs	lbh	lv	lss	lz	lk	lq	mg	ml	mb	ms	mss	mz	mch	mh	mh	bl	bp	bh	v	sg	sd	sl	sb	z	ngg	ngkk	ngng	ngk	ng	ngs	ngz	pb	f	hn	hl	hm	hb	q	gn	gb	gch	gk	gh	nn";

    case 18:
      return "he	hu	hi	ha	hie	h	ho	hoa	le	lu	li	la	lie	l	lo	lwa	he	hu	hi	ha	hie	h	ho	hwa	me	mu	mi	ma	mie	m	mo	mwa	se	su	si	sa	sie	s	so	swa	re	ru	ri	ra	rie	r	ro	rwa	se	su	si	sa	sie	s	so	swa	she	shu	shi	sha	shie	sh	sho	shwa	k'e	k'u	k'i	k'a	k'ie	k'	k'o	k'oa	k'we		k'wi	k'wa	k'wie	k'wi			kh'e	kh'u	kh'i	kh'a	kh'ie	kh'	kh'o		kh'we		kh'wi	kh'wa	kh'wie	kh'wi			be	bu	bi	ba	bie	b	bo	bwa	ve	vu	vi	va	vie	v	vo	vwa	te	tu	ti	ta	tie	t	to	twa	che	chu	chi	cha	chie	ch	cho	chwa	he	hu	hi	ha	hie	h	ho	hoa	hwe		hwi	hwa	hwie	hwi			ne	nu	ni	na	nie	n	no	nwa	nye	nyu	nyi	nya	nyie	ny	nyo	nywa	'e	'u	'i	'a	'ie	'	'o	'wa	ke	ku	ki	ka	kie	k	ko	koa	kwe		kwi	kwa	kwie	kwi			he	hu	hi	ha	hie	h	ho		hwe		hwi	hwa	hwie	hwi			we	wu	wi	wa	wie	w	wo	woa	`e	`u	`i	`a	`ie	`	`o		ze	zu	zi	za	zie	z	zo	zwa	zhe	zhu	zhi	zha	zhie	zh	zho	zhwa	ye	yu	yi	ya	yie	y	yo	yoa	de	du	di	da	die	d	do	dwa	d'e	d'u	d'i	d'a	d'ie	d'	d'o	d'wa";

    case 19:
      return "je	ju	ji	ja	jie	j	jo	jwa	ge	gu	gi	ga	gie	g	go	goa	gwe		gwi	gwa	gwie	gwi			nge	ngu	ngi	nga	ngie	ng	ngo	ngwa	t'e	t'u	t'i	t'a	t'ie	t'	t'o	t'wa	ch'e	ch'u	ch'i	ch'a	ch'ie	ch'	ch'o	ch'wa	p'e	p'u	p'i	p'a	p'ie	p'	p'o	p'wa	ts'e	ts'u	ts'i	ts'a	ts'ie	ts'	ts'o	ts'wa	ts'e	ts'u	ts'i	ts'a	ts'ie	ts'	ts'o	ts'oa	fe	fu	fi	fa	fie	f	fo	fwa	pe	pu	pi	pa	pie	p	po	pwa	rya	mya	fya						+	 	.	,	;	:	:-	?	#	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	10000				mwe	mwi	mwie	mwi	bwe	bwi	bwie	bwi	fwe	fwi	fwie	fwi	pwe	pwi	pwie	pwi																	A	E	I	O	U	V	Ga	Ka	Ge	Gi	Go	Gu	Gv	Ha	He	Hi	Ho	Hu	Hv	La	Le	Li	Lo	Lu	Lv	Ma	Me	Mi	Mo	Mu	Na	Hna	Nah	Ne	Ni	No	Nu	Nv	Qua	Que	Qui	Quo	Quu	Quv	Sa	S	Se	Si	So	Su	Sv	Da	Ta	De	Te	Di	Ti	Do	Du	Dv	Dla	Tla	Tle	Tli	Tlo	Tlu	Tlv	Tsa	Tse	Tsi	Tso	Tsu	Tsv	Wa	We	Wi	Wo	Wu	Wv	Ya	Ye	Yi	Yo	Yu	Yv	Mv			ye	yi	yo	yu	yv	mv";

    case 20:
      return "-	e	aai	i	ii	o	oo	oo	ee	i	a	aa	we	we	wi	wi	wii	wii	wo	wo	woo	woo	woo	wa	wa	waa	waa	waa	ai	w	'	t	k	sh	s	n	w	tt	h	w	c	n	l	en	in	on	an	pe	paai	pi	pii	po	poo	poo	hee	hi	pa	paa	pwe	pwe	pwi	pwi	pwii	pwii	pwo	pwo	pwoo	pwoo	pwa	pwa	pwaa	pwaa	pwaa	p	p	h	te	taai	ti	tii	to	too	too	dee	di	ta	taa	twe	twe	twi	twi	twii	twii	two	two	twoo	twoo	twa	twa	twaa	twaa	twaa	t	tte	tti	tto	tta	ke	kaai	ki	kii	ko	koo	koo	ka	kaa	kwe	kwe	kwi	kwi	kwii	kwii	kwo	kwo	kwoo	kwoo	kwa	kwa	kwaa	kwaa	kwaa	k	kw	keh	kih	koh	kah	ce	caai	ci	cii	co	coo	coo	ca	caa	cwe	cwe	cwi	cwi	cwii	cwii	cwo	cwo	cwoo	cwoo	cwa	cwa	cwaa	cwaa	cwaa	c	th	me	maai	mi	mii	mo	moo	moo	ma	maa	mwe	mwe	mwi	mwi	mwii	mwii	mwo	mwo	mwoo	mwoo	mwa	mwa	mwaa	mwaa	mwaa	m	m	mh	m	m	ne	naai	ni	nii	no	noo	noo	na	naa	nwe	nwe	nwa	nwa	nwaa	nwaa	nwaa	n	ng	nh	le	laai	li	lii	lo	loo	loo	la	laa	lwe	lwe	lwi	lwi	lwii	lwii	lwo	lwo	lwoo	lwoo	lwa	lwa	lwaa	lwaa	l	l	l	se	saai	si	sii	so	soo	soo	sa	saa	swe	swe	swi	swi	swii	swii	swo	swo	swoo	swoo";

    case 21:
      return "swa	swa	swaa	swaa	swaa	s	s	sw	s	sk	skw	s-w	spwa	stwa	skwa	scwa	she	shi	shii	sho	shoo	sha	shaa	shwe	shwe	shwi	shwi	shwii	shwii	shwo	shwo	shwoo	shwoo	shwa	shwa	shwaa	shwaa	sh	ye	yaai	yi	yii	yo	yoo	yoo	ya	yaa	ywe	ywe	ywi	ywi	ywii	ywii	ywo	ywo	ywoo	ywoo	ywa	ywa	ywaa	ywaa	ywaa	y	y	y	yi	re	re	le	raai	ri	rii	ro	roo	lo	ra	raa	la	rwaa	rwaa	r	r	r	fe	faai	fi	fii	fo	foo	fa	faa	fwaa	fwaa	f	the	the	thi	thi	thii	thii	tho	thoo	tha	thaa	thwaa	thwaa	th	tthe	tthi	ttho	ttha	**	tye	tyi	tyo	tya	he	hi	hii	ho	hoo	ha	haa	h	h	hk	qaai	qi	qii	qo	qoo	qa	qaa	q	tlhe	tlhi	tlho	tlha	re	ri	ro	ra	ngaai	ngi	ngii	ngo	ngoo	nga	ngaa	ng	nng	she	shi	sho	sha	the	thi	tho	tha	th	lhi	lhii	lho	lhoo	lha	lhaa	lh	the	thi	thii	tho	thoo	tha	thaa	th	b	e	i	o	a	we	wi	wo	wa	ne	ni	no	na	ke	ki	ko	ka	he	hi	ho	ha	ghu	gho	ghe	ghee	ghi	gha	ru	ro	re	ree	ri	ra	wu	wo	we	wee	wi	wa	hwu	hwo	hwe	hwee	hwi	hwa	thu	tho	the	thee	thi	tha	ttu	tto	tte	ttee	tti	tta	pu	po	pe	pee	pi	pa	p	gu	go	ge	gee	gi	ga	khu	kho	khe	khee	khi	kha	kku	kko	kke	kkee	kki";

    case 22:
      return "kka	kk	nu	no	ne	nee	ni	na	mu	mo	me	mee	mi	ma	yu	yo	ye	yee	yi	ya	ju	ju	jo	je	jee	ji	ji	ja	jju	jjo	jje	jjee	jji	jja	lu	lo	le	lee	li	la	dlu	dlo	dle	dlee	dli	dla	lhu	lho	lhe	lhee	lhi	lha	tlhu	tlho	tlhe	tlhee	tlhi	tlha	tlu	tlo	tle	tlee	tli	tla	zu	zo	ze	zee	zi	za	z	z	dzu	dzo	dze	dzee	dzi	dza	su	so	se	see	si	sa	shu	sho	she	shee	shi	sha	sh	tsu	tso	tse	tsee	tsi	tsa	chu	cho	che	chee	chi	cha	ttsu	ttso	ttse	ttsee	ttsi	ttsa	X	.	qai	ngai	nngi	nngii	nngo	nngoo	nnga	nngaa	thwee	thwi	thwii	thwo	thwoo	thwa	thwaa	th	w	 	b	l	f	s	n	h	d	t	c	q	m	g	ng	z	r	a	o	u	e	i	ea	oi	ui	ia	ae	p	>	<				f	v	u	y	y	w	th	dh	a	o	a	ae	a	a	o	o	o	r	k	c	k	g	ng	g	g	w	h	h	h	h	n	n	n	i	e	j	j	a	a	i	p	z	s	s	s	c	z	t	t	d	b	b	p	p	e	m	m	m	l	l	ng	ng	d	o	ea	io	q	k	k	st	r	r	y	q	x	.	:	+	17	18	19	k	sh	oo	o	i	e	a	ae";

    case 23:
      return "a	i	u	k	g	ng	t	d	n	p	b	m	y		l	w	s	h	i	u													a	i	u	k	g	ng	t	d	n	p	b	m	y	r	l	w	s	h	i	u		,	.										a	i	u	k	g	ng	t	d	n	p	b	m	y	r	l	w	s	h	i	u													a	i	u	k	g	ng	t	d	n	p	b	m	y		l	w	s		i	u													k	kh	k	kh	ng	ch	chh	ch	chh	nh	d	th	d	th	n	t	th	t	th	n	b	ph	p	ph	m	y	r	l	v	s	s	s	h	l	'	'	'a	e	ei	o	o	ou	au	rue	rueu	lue	lueu	ae	ai	ao	ao	ov			a	e	ei	oe	eu	o	ou	uo	aeu	oea	ie	e	ae	ai	ao	au	am	ah	ak			a	r		!		a				.	#	:	-	-Lo-	*	@	CR	'				0	1	2	3	4	5	6	7	8	9							0	1	2	3	4	5	6	7	8	9";

    case 24:
      return "@	...	,	.	:	*	-	-	,	.	-						0	1	2	3	4	5	6	7	8	9							a	e	i	o	u	o	u	e	n	ng	b	p	h	g	m	l	s	x	t	d	q	j	y	r	w	f	k	k	c	z	h	r	lh	zh	ch		e	i	o	u	o	u	ng	b	p	h	gh	m	t	d	ch	dzh	c	j	v	k	g	g	dzh	nj	dz	e	i	y	u	u	ng	k	g	h	p	sh	t	d	j	f	g	h	ts	dz	zh	c	j	i	k	r	f	j	sh								m	h	h	h	h	3	9	a	i	k	ng	ts	t	th	d	n	t	d	p	ph	s	zh	z	'	t	zh	gh	ng	ts	dzh	t	dh	t	dh	s	c	zh	z	w	y	bh		lh						oy	ay	aay	way	poy	pay	pwoy	tay	kay	kway	may	noy	nay	lay	soy	say	shoy	shay	shwoy	yoy	yay	ray	nwi	nwi	nwii	nwii	nwo	nwo	nwoo	nwoo	rwee	rwi	rwii	rwo	rwoo	rwa	p	t	k	c	m	n	s	sh	w	w	'	'	rwe	loo	laa	thwe	thwa	tthwe	tthoo	tthaa	tlhwe	tlhoo	shwe	shoo	hoo	gwu	gee	gaa	gwa	juu	jwa	l	r	s";

    case 25:
      return "	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	jn	tr		a	i	u	e	ai	o	au	e	o	y	r	v					k	n	n	t	n	p	m	r	l	h	'						lo				!	?	0	1	2	3	4	5	6	7	8	9	g	h	ng	z	s	y	d	t	l	b	p	m	f	w	hh	'	k	c	n	aa	i	e	ae	u	o	oa	ue	oe	aue	ai																					g	k	ng	g	k	ng	z	s	y	z	s	y	d	t	n	d	t	n	b	p	m	b	p	m	f	w	l	f	w	l	h	dd	bb	h	dd	bb	gw	kw	gw	kw	sw	sw					'	aa	i	u	u	e	ae	o	oa	ue	ai	aai	ui	oi	oai	uei	ii	w	ng	n	m	k	t	p									0	1	2	3	4	5	6	7	8	9	1				lae	laew	08	1.	2.	3.	4.	5.	6.	7.	8.	9.	10.	11.	12.	13.	14.	15.	88	.1	.2	.3	.4	.5	.6	.7	.8	.9	.10	.11	.12	.13	.14	.15";

    case 26:
      return "k	g	ng	ngk	p	b	m	mp	t	d	n	nr	c	j	ny	nc	y	r	l	w	s		h	i	u	e	o	e			\\	*	k	kh	kh	k	kh	kh	ng	ch	s	ch	s	s	ny	t	th	d	th	n	t	th	t	th	n	b	p	ph	f	p	f	ph	m	ny	y	h	lue	l	lue	w	s	s	s	h	l		h	i	i	u	u	e	o	lae	th	r	l	lng	ng	ng	p	p	m	b	s			a	a	a	a	i	i	ue	ue	u	u	o	oa	oy	e	ae	o	ai	ai	oa	m							-				.	0	1	2	3	4	5	6	7	8	9							0	1	2	3	4	5	6	7	8	9							@	@	@	*	*	*	#	-	,	.	;	:	#	*";

    case 27:
      return "m	ng	ng	r	h	a	a	i	i	u	u	re	ro	le	lo	e	ai	o	au	k	kh	g	gh	ng	c	ch	j	jh	ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	w	s	s	s	h	'	a	i	i	u	u	re	ro	le	lo	e	ai	o	au	e	o		k'	kh	t'	p'	w'	s'	sy					0	1	2	3	4	5	6	7	8	9	*	@	.	:	,	.	-	a	e	u	ng	r	i	e	u	ai	h										^	^	^	^	^	^	^	^	^				ng	r	h	a	i	u	e	o	e	eu	k	q	g	ng	c	j	z	ny	t	d	n	p	f	v	b	m	y	r	l	w	s	x	h	y	r	l	i	u	e	o	e	eu			m	w	kh	sy	0	1	2	3	4	5	6	7	8	9	'	reu	leu	bh	k	m			h	h	h	b	b	p	p	n	n	w	w	w	g	g	j	d	r	r	m	m	t	t	s	s	s	y	y	ng	l	l	ny	c	nd	mb	i	u	'	e	e	e	i	i	o	o	u	u	ng	h											*	+	|	)";

    case 28:
      return "k	kl	kh	g	gl	ng	c	ch	j	ny	t	th	d	n	p	pl	ph	f	fl	b	bl	m	ml	ts	tsh	z	y	r	l	h	hl	v	s	sh	w		y	r	a	i	o	o	u	u	e	k	m	l	n	p	r	t	ng	ng		'				,	.	.	.	.	0	1	2	3	4	5	6	7	8	9				t	th	d	0	1	2	3	4	5	6	7	8	9	a	t	g	m	l	a	k	j	m	w	i	s	h	n	r	u	c	d	n	y	e	p	d	n	r	o	t	b	n	h	m		m			'	,	.	v	d	o	s	t	t	'	e	u								A	B	G	D	E	V	Z	T	I	K'	L	M	N	O	P'	Zh	R	S	T'	U	P	K	Gh	Q'	Sh	Ch	Ts	Dz	Ts'	Ch'	Kh	J	H	E	Y	W	X	O	F	E	`	G	`			Ae	`	W	.	*	;	,	L	K	D	B												\"															h	h	h	h	h	h	h	m	m	m	m	m	m	m	m	m	h	h		h	h";

    case 29:
      return "A	Ae	ae	B	C	D	D	E	e	i	J	K	L	M	N	O	O	o	o	o	oe	Ou	o	o	P	R	R	T	U	u	u	m	V	W	Z	Zh	`	`	G	L	P	R	Ps	L	A	Ae	B	B	D	E	E	G	H	I	J	K	L	M	N	N	O	Ou	P	R	T	U	W	a	a	a	ae	b	d	e	e	e	e	g	i	k	m	ng	o	o	o	o	p	t	u	u	w	v	`	v	g	d	f	ch	i	r	u	v	v	g	r	f	ch	ue	b	d	f	m	n	p	r	r	s	t	z	g	n	g	th	I	i	p	U	u	b	d	f	g	k	l	m	n	p	r	s	sh	v	x	z	a	a	d	e	e	e	e	i	o	sh	u	zh	a	c	c	d	e	f	j	g	h	i	i	I	I	j	l	l	L	m	m	n	n	N	o	f	s	sh	t	u	u	U	v	v	z	z	z	zh	th";

    case 30:
      return "A	a	B	b	B	b	B	b	C	c	D	d	D	d	D	d	D	d	D	d	E	e	E	e	E	e	E	e	E	e	F	f	G	g	H	h	H	h	H	h	H	h	H	h	I	i	I	i	K	k	K	k	K	k	L	l	L	l	L	l	L	l	M	m	M	m	M	m	N	n	N	n	N	n	N	n	O	o	O	o	O	o	O	o	P	p	P	p	R	r	R	r	R	r	R	r	S	s	S	s	S	s	S	s	S	s	T	t	T	t	T	t	T	t	U	u	U	u	U	u	U	u	U	u	V	v	V	v	W	w	W	w	W	w	W	w	W	w	X	x	X	x	Y	y	Z	z	Z	z	Z	z	h	t	w	y	a'	s	s.	s.	Ss	d	A	a	A	a	A	a	A	a	A	a	A	a	A	a	A	a	A	a	A	a	A	a	A	a	E	e	E	e	E	e	E	e	E	e	E	e	E	e	E	e	I	i	I	i	O	o	O	o	O	o	O	o	O	o	O	o	O	o	O	o	O	o	O	o	O	o	O	o	U	u	U	u	U	u	U	u	U	u	U	u	U	u	Y	y	Y	y	Y	y	Y	y	Ll	ll	V	v	Y	y";

    case 31:
      return "a	ha	a	ha	a	ha	a	ha	A	Ha	A	Ha	A	Ha	A	Ha	e	he	e	he	e	he			E	He	E	He	E	He			i	hi	i	hi	i	hi	i	hi	I	Hi	I	Hi	I	Hi	I	Hi	i	hi	i	hi	i	hi	i	hi	I	Hi	I	Hi	I	Hi	I	Hi	o	ho	o	ho	o	ho			O	Ho	O	Ho	O	Ho			y	hy	y	hy	y	hy	y	hy		Hy		Hy		Hy		Hy	o	ho	o	ho	o	ho	o	ho	O	Ho	O	Ho	O	Ho	O	Ho	a	a	e	e	i	i	i	i	o	o	y	y	o	o			a	ha	a	ha	a	ha	a	ha	A	Ha	A	Ha	A	Ha	A	Ha	i	hi	i	hi	i	hi	i	hi	I	Hi	I	Hi	I	Hi	I	Hi	o	ho	o	ho	o	ho	o	ho	O	Ho	O	Ho	O	Ho	O	Ho	a	a	a	a	a		a	a	A	A	A	A	A	'	i	'	~	\"~	i	i	i		i	i	E	E	I	I	I	'`	''	'~	i	i	i	i			i	i	I	I	I	I		h`	h'	h~	y	y	y	y	r	rh	y	y	Y	Y	Y	Y	Rh	\"`	\"'	`			o	o	o		o	o	O	O	O	O	O	'	h";

    case 32:
      return " 	 	 	 	 	 	 	 	 	 	 						-	-	-	-	-	-	||	_	'	'	'	'	\"	\"	\"	\"	+	++	*	*	.	..	...	-	 	 						 	%0	%00	'	''	'''	`	``	```	^	<	>	*	!!	!?	-	_	-	^	***	-	/	[	]	??	?!	!?	&	P	<	>	*	;	_	**	./.	~	_	*	:	''''	:	*	:	:	+	:	:	 																	0	i			4	5	6	7	8	9	+	-	=	(	)	n	0	1	2	3	4	5	6	7	8	9	+	-	=	(	)		a	e	o	x	e	h	k	l	m	n	p	s	t				CE	C	Cr	Fr	L	mil	N	Pts	Rs	Won	NIS	D	EUR	K	Tg	Dr	Pf	P	G	ARA	HRN	GHC	lt	Sm	T	Rs	TL	M	Manat	Rb	Lari	BTC";

    case 33:
      return "a/c	a/s	C	C	CL	c/o	c/u	E	E	F	g	H	H	H	h	h	I	I	L	l	lb	N	No	(P)	P	P	Q	R	R	R	Rx	R	SM	TEL	TM	V	Z	oz	Ohm	Mho	Z	i	K	A	B	C	e	e	E	F	F	M	o	a	b	g	d	i	Q	FAX	p	g	G	P	S	G	L	L	Y	D	d	e	i	j	PL	&	P	A/S	f	ooo	1/7	1/9	1/10	1/3	2/3	1/5	2/5	3/5	4/5	1/6	5/6	1/8	3/8	5/8	7/8	1/	I	II	III	IV	V	VI	VII	VIII	IX	X	XI	XII	L	C	D	M	i	ii	iii	iv	v	vi	vii	viii	ix	x	xi	xii	l	c	d	m	(|)	|))	((|))	C	c	6	L	|)))	(((|)))	0/3	2	3					<	^	>	v	:left_right_arrow:	:arrow_up_down:	:arrow_upper_left:	:arrow_upper_right:	:arrow_lower_right:	:arrow_lower_left:	<	>	<	>	<	^	>	v	<	>	<	^	>	v	|	:leftwards_arrow_with_hook:	:arrow_right_hook:	<	>	~	-	v	<	>	<	>	v	<	<	>	\\	=	<	>	<	<	^	^	>	>	v	v	=	|	=	<	^	>	v	=	=	<	-	>	<	^	>	v	-	|	\\	/	\\	/	<	>	<	>	^	v	<	^	>	v	<	>	<	^	>	v	^	^	^	^	^	^	>	\\	\\	|	>	|	>	<	>	-	<	>	-	<	>	-";

    case 34:
      return "V	C	d	E	E	0	^	D	E	E	E	E	E	E	#	P	U	S	-	-+	+	/	\\	*	*	*	sqrt	cbrt	4rt	~	inf	L	<	<	<	|	|	||	||	^	v	^	v	S	S	SSS	S	SS	SSS	S	S	S	:	:	:	::	_	-:	-	~	~	~	~	~	~	~	-~	~	~	~=	=	=	~	~	~	~	~=	=	=	=	=	=	=	=	:=	=:	=	=	=	=	=	=	=	=	=	=	=	=	=	=	<=	>=	<=	>=	<	>	<<	>>	()	=	<	>	<	>	<~	>~	<	>	=	=	=	=	<	>	<	>	<	>	<	>	<	>	<	>	<	>	<	>	<	>	v	v	v	[	]	[	]	^	v	+	-	x	/	.	o	*	=	-	+	-	x	.	+	+	+	+	+	+	+	+	+	+	+	+	+	+	<	>	<	>	<	>	-	-	-	+	T	v	^	v	<	/	^	v	^	v	*	*	*	*	><	><	><	>	<	~=	v	^	<	>	^	v	+	#	<	>	<<<	>>>	=	=	=<	=>	<	>	<	>	[	]	[	]	<	>	<	>	<	>	<	>	|	-	/	\\	+	+	+	+	+	+	+	+	+	+	+	+	+	E";

    case 35:
      return "0	~	^	^	v	^	^	~	[	]	[	]	+	+	+	+	-	*	*	*	*	*	+	#	#	-	:watch:	:hourglass:	+	+	+	+	(	)	(	)	^	*	>	x	:keyboard:	<	>	<	#	*	*	*	*	*	*	*	*	*	I	#	=	:	*	*	*	*	*	/	\\	/	\\	<	>	<	>	<	>	0	*	*	v	*	*	^	^	*	*	^	*	*	v	v	'	*	*	*	*	*	'	*	:	*	*	*	*	*	*	*	~	>	,	*	0	|	;	=	?	v	^	i	r	o	a	e	i	o	a	NAK	+	*	*	|	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	#	.	<	>	#	#	(	(	(	)	)	)	[	[	[	]	]	]	{	{	{	|	}	}	}	|	-	{	{	S	S	[	]	][	/	|	|	-	-	-	-	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	'	<	:eject:	|	-	-	-	-	-	-	3	4	5	+	-	(	)	{	}	[	]	#	#	-	#	*	*	E	:fast_forward:	:rewind:	:arrow_double_up:	:arrow_double_down:	:track_next:	:track_previous:	:play_pause:	:alarm_clock:	:stopwatch:	:timer:	:hourglass_flowing_sand:	<	>	^	v	:pause_button:	:stop_button:	:record_button:	*	*	*	*	<";

    case 36:
      return "NUL	SOH	STX	ETX	EOT	ENQ	ACK	BEL	BS	HT	LF	VT	FF	CR	SS	SI	DLE	DC1	DC2	DC3	DC4	NAK	SYN	ETB	CAN	EM	SUB	ESC	FS	GS	RS	US	SP	DEL	b	_	NL	/	?																										<	>	]	*	*	*	:	;	<	=	\\\\																						1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	(1)	(2)	(3)	(4)	(5)	(6)	(7)	(8)	(9)	(10)	(11)	(12)	(13)	(14)	(15)	(16)	(17)	(18)	(19)	(20)	1.	2.	3.	4.	5.	6.	7.	8.	9.	10.	11.	12.	13.	14.	15.	16.	17.	18.	19.	20.	(a)	(b)	(c)	(d)	(e)	(f)	(g)	(h)	(i)	(j)	(k)	(l)	(m)	(n)	(o)	(p)	(q)	(r)	(s)	(t)	(u)	(v)	(w)	(x)	(y)	(z)	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	0	11	12	13	14	15	16	17	18	19	20	1	2	3	4	5	6	7	8	9	10	0";

    case 37:
      return "-	-	|	|	-	-	|	|	-	-	|	|	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	-	-	|	|	-	|	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	/	\\	X	-	|	-	|	-	|	-	|	-	|	-	|	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	:black_small_square:	:white_small_square:	#	#	#	#	#	#	^	^	^	^	:arrow_forward:	>	>	>	>	>	v	v	v	v	:arrow_backward:	<	<	<	<	<	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	(	)	*	*	*	*	*	*	*	*	*	*	/	\\	/	\\	*	#	#	#	#	#	^	^	^	*	#	#	#	#	*	*	*	*	/	\\	\\	:white_medium_square:	:black_medium_square:	:white_medium_small_square:	:black_medium_small_square:	/";

    case 38:
      return ":sunny:	:cloud:	:umbrella2:	:snowman2:	:comet:	*	*	*	*	*	*	*	0	180	:telephone:	@	#	:ballot_box_with_check:	x	X	:umbrella:	:coffee:	W	B	:shamrock:	*	<	>	<	:point_up:	>	v	:skull_crossbones:	Z	:radioactive:	:biohazard:	+	+	:orthodox_cross:	ChR.	+	+	:star_and_crescent:	*	*	*	:peace:	:yin_yang:	Qian	Dui	Li	Zhen	Xun	Kan	Gen	Kun	:wheel_of_dharma:	:frowning2:	:relaxed:	:)	*	)	(	Mercury	:female_sign:	Earth	:male_sign:	Jupiter	Saturn	Uranus	Neptune	Pluto	:aries:	:taurus:	:gemini:	:cancer:	:leo:	:virgo:	:libra:	:scorpius:	:sagittarius:	:capricorn:	:aquarius:	:pisces:	K	Q	R	B	N	P	k	q	r	b	n	:chess_pawn:	:spades:	H	D	:clubs:	S	:hearts:	:diamonds:	C	:hotsprings:	#	#	#	#	b	#	#	+	+	*	1	2	3	4	5	6	7	*	:recycle:	*	*	:infinity:	:wheelchair:	1	2	3	4	5	6	*	*	*	*	YangYao	YinYao	TaiYang	ShaoYin	ShaoYang	TaiYin	*	*	:hammer_pick:	:anchor:	:crossed_swords:	:medical_symbol:	:scales:	:alembic:	*	:gear:	*	:atom:	:fleur_de_lis:	*	>	<	:warning:	:zap:	*	*	*	*	*	*	*	*	:white_circle:	:black_circle:	*	*	*	*	:coffin:	:urn:	*	*	*	*	*	*	*	*	30	150	135	:soccer:	:baseball:	*	M	K	m	k	:snowman:	:partly_sunny:	*	*	:thunder_cloud_rain:	w	b	#	X	*	:ophiuchus:	:pick:	*	:helmet_with_cross:	*	:chains:	:no_entry:	*	*	*	*	*	*	v	*	X	\\	*	*	*	Uranus	*	*	*	*	*	+	:shinto_shrine:	:church:	*	*	*	*	*	:mountain:	:beach_umbrella:	:fountain:	:golf:	:ferry:	:sailboat:	#	:skier:	:ice_skate:	:person_bouncing_ball:	:tent:	*	*	:fuelpump:	*	*";

    case 39:
      return "<	<	:scissors:	<	<	:white_check_mark:	@	@	:airplane:	:envelope:	:fist:	:raised_hand:	:v:	:writing_hand:	\\	:pencil2:	/	>	:black_nib:	v	:heavy_check_mark:	X	:heavy_multiplication_x:	x	x	+	+	+	+	:cross:	+	+	+	:star_of_david:	*	*	*	*	*	*	:sparkles:	*	*	*	*	*	*	*	*	*	*	:eight_spoked_asterisk:	:eight_pointed_black_star:	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	:snowflake:	*	*	:sparkle:	*	*	*	*	:x:	*	:negative_squared_cross_mark:	#	#	#	#	:question:	:grey_question:	:grey_exclamation:	*	:exclamation:	|	|	|	'	'	\"	\"	'	\"	P	!	:heart_exclamation:	:heart:	*	*	*	(	)	(	)	<	>	<	>	<	>	(	)	{	}	1	2	3	4	5	6	7	8	9	10	1	2	3	4	5	6	7	8	9	10	1	2	3	4	5	6	7	8	9	10	>	:heavy_plus_sign:	:heavy_minus_sign:	:heavy_division_sign:	\\	>	/	>	>	>	>	>	>	:arrow_right:	>	>	>	>	>	>	>	>	>	>	>	>	>	>	:curly_loop:	>	>	>	\\	>	/	\\	>	/	>	>	>	>	>	:loop:	^	^	T	<	>	{	}	v	\\<	>/	|	/	)	\\	^	v	#	^	w	>	<	*	*	*	T	T	#	+	-	-	-	+	#	#	#	#	#	#	[	]	<	>	<<	>>	[	]	(	)	^	v	<	>	>	<	>	-	<	>	-	<	>	<	>	~";

    case 40:
      return " 	a	,	b	'	k	;	l	@	c	i	f	st	m	s	p	*	e	:	h	in	o	!	r	^	d	j	g	ar	n	t	q	+	ch	en	gh	-	u	?	v	_	sh	ow	ed	ing	x	the	and	1	wh	.	ou	\"	z	`	of	|	th	w	er	#	y	with	for	{7}	A	{27}	B	{37}	K	{237}	L	{47}	C	I	F	{347}	M	S	P	{57}	E	{257}	H	{357}	O	{2357}	R	{457}	D	J	G	{3457}	N	T	Q	{67}	{167}	{267}	{1267}	{367}	U	{2367}	V	{467}	{1467}	{2467}	{12467}	{3467}	X	{23467}	{123467}	{567}	{1567}	{2567}	{12567}	{3567}	Z	{23567}	{123567}	{4567}	{14567}	W	{124567}	{34567}	Y	{234567}	{1234567}	{8}	{18}	{28}	{128}	{38}	{138}	{238}	{1238}	{48}	{148}	{248}	{1248}	{348}	{1348}	{2348}	{12348}	{58}	{158}	{258}	{1258}	{358}	{1358}	{2358}	{12358}	{458}	{1458}	{2458}	{12458}	{3458}	{13458}	{23458}	{123458}	{68}	{168}	{268}	{1268}	{368}	{1368}	{2368}	{12368}	{468}	{1468}	{2468}	{12468}	{3468}	{13468}	{23468}	{123468}	{568}	{1568}	{2568}	{12568}	{3568}	{13568}	{23568}	{123568}	{4568}	{14568}	{24568}	{124568}	{34568}	{134568}	{234568}	{1234568}	{78}	{178}	{278}	{1278}	{378}	{1378}	{2378}	{12378}	{478}	{1478}	{2478}	{12478}	{3478}	{13478}	{23478}	{123478}	{578}	{1578}	{2578}	{12578}	{3578}	{13578}	{23578}	{123578}	{4578}	{14578}	{24578}	{124578}	{34578}	{134578}	{234578}	{1234578}	{678}	{1678}	{2678}	{12678}	{3678}	{13678}	{23678}	{123678}	{4678}	{14678}	{24678}	{124678}	{34678}	{134678}	{234678}	{1234678}	{5678}	{15678}	{25678}	{125678}	{35678}	{135678}	{235678}	{1235678}	{45678}	{145678}	{245678}	{1245678}	{345678}	{1345678}	{2345678}	{12345678}";

    case 41:
      return ">	>	<	>	-	>	<	>	v	^	^	v	<	>	<	>	>	>	^	v	>	>	>	>	>	<	>	<	>	<	>	<	>	\\	/	\\	/	\\	/	X	X	X	X	X	X	X	X	X	X	X	X	>	:arrow_heading_up:	:arrow_heading_down:	<	>	<	>	<	>	-	+	<	>	<	>	=	=	=	>	<	>	-	^	-	-	|	|	-	|	-	|	<	>	^	v	<	>	^	v	<	>	^	v	<	>	^	v	<	^	>	v	=	=	=	=	<	<	>	>	|	|	>	=	~	<	>	~	<	<	>	>	<	<	>	<	v	^	|||	*	:	{	}	(	)	(	)	<	>	[	]	[	]	[	]	<	>	<	>	>	<	[	]	:	|	>	^	^	<	<	>	^	>	>	<	>	^	^	^	^	^	^	^	^	^	^	0	0	0	0	0	*	*	*	*	*	*	*	*	*	*	*	<	>	*	*	/	\\	*	o	#	#	^	^	^	^	#	<	>	*	*	*	*	*	*	*	{	}	{{	}}	*	*	*	*	#	<	E	#	#	#	#	#	^	^	#	#	*	*	+	+	+	+	+	+	:>	\\	/	\\	/	\\	++	+++	<	>	+	-";

    case 42:
      return "*	+	x	.	+	^	v	M	W	X	S	S	SSSS	S	S	S	S	S	S	S	S	S	S	S	S	S	S	S	S	><	<	;	>>	|	+	+	+	+	+	+	+	-	-	-	-	(+	+)	x	x	x	x	*	(x	x)	x	x	/	+	-	x	-	-	;	U	^	v	v	^	^	v	X	0	X	0	w	m	v	^	^	v	*	^	v	^	v	M	W	v	^	X	^	v	^	v	^	^	^	v	v	v	<	>	=	=	#	#	~	~	~	=	=	=	=	=+	+=	=~	::=	==	===	=	=	<	>	?<	>?	<=	>=	<=	>=	<=	>=	<=	>=	<	>	<	>	<	>	=	=	<	>	~	~	=	=	=	=	=<	=>	=<	=>	=<	=>	=<	=>	~<	~>	<	>	<<	>>	<<	><	><	<	>	<	>	<	>	<	>	=	<	>	<	>	<	>	<	>	<	>	<	>	<<	>>	<	>	<	>	<	>	<	>	<	>	<	>	<	>	<	>	[	]	<	>	<	>	-	-	<	>	><	><	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	+	-	-	|	|	|	|	||	||	|||	|||	:	<<<	>>>	<=	>=	///	|||	//	|	|";

    case 43:
      return "/	\\	\\	/	-	:arrow_left:	:arrow_up:	:arrow_down:	/	\\	\\	/	-	|	v	^	v	^	-	-	\\	\\	|	|	-	-	#	:black_large_square:	:white_large_square:	-	-	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	<	<	<	<	<	<	<	<	<	<	<	<	<	<	<	<	<	<	<	>	>	<	>	>	>	<	<	<	>	v	/	\\	:star:	*	*	*	*	:o:	*	*	*	*	/	\\	/	\\	>	>	<	^	>	v	-	|	\\	/	\\	/	<	^	>	v	>	<	<	^	>	v			\\	/	\\	/	<	^	>	v	-	|	-	|	-	|	<	^	>	v	<	^	>	v	<	^	>	v	<	>	<	>	<	>		A	<	^	>	v	<	^	>	v	<	>	<	>	^	^	v	v	<	>	<	>	^	^	v	v	<	>	<	>	^	^	v	v	^	^	*	*	*	x	x	x	*	*	*	*	*	^	v	<	>	Neptune	^	v	*	*	*	*	+	?	+	Pluto	Pluto	Pluto	Pluto	*	*	*	*	*	*	*	*	*	Cupido	Hades	Zeus	Kronos	Apollon	Admetos	Vulcanus	Poseidon	*	*	*	*	<	^	>	v	*	*	*	V	N	Q	N2	100	D3	*	*	*	*	*	*	#";

    case 44:
      return "A	B	V	G	D	E	Zh	Dz	Z	I	J	I	G	K	L	M	N	O	P	R	S	T	U	F	H	O	P	Sht	C	Ch	Sh	U	I	E	H	Ju	E	E	Jo	Je	O	Jo	Th	U	I	A	M		a	b	v	g	d	e	zh	dz	z	i	j	i	g	k	l	m	n	o	p	r	s	t	u	f	h	o	p	sht	c	ch	sh	u	i	e	h	ju	e	e	jo	je	o	jo	th	u	i	a	m		L	l	L	P	R	a	t	H	h	K	k	Z	z	A	M	A	A	v	W	w	v	H	h	o	e	r	o	E	j	V	S	Z	A	a	B	b	G	g	D	d	E	e	6	6	Z	z	E	e	Th	th	I	i	K	k	L	l	M	m	N	n	Ks	ks	O	o	P	p	R	r	S	s	T	t	U	u	Ph	ph	Kh	kh	Ps	ps	O	o	'	'	`	`	E	e	K	k	N	n	N	n	O	o	900	900	Sh	sh	Sh	sh	Sh	sh	X	x	H	h	H	h	H	h	H	h	H	h	H	h	J	j	Dj	dj	C	c	C	c	Ng	ng	Ny	ny	W	w	&	MR.	PR.	STRS.	TR.	KhR.	CS.	Sh	sh	J	j	n			X	x						\\\\	/.	.\\	//	.5	.	'";

    case 45:
      return "a	b	g	d	e	v	z	t	i	k'	l	m	n	o	p'	zh	r	s	t'	u	p	k	gh	q'	sh	ch	ts	dz	ts'	ch'	kh	j	h	e	y	w	x	o		e						ae			a	b	b	g	g	dj	dj	d	d	d	d	e	f	k	k	k	h	h	h	h	'	x	x	q	q	i	j	j	j	l	m	n	gn	ng	p	u	r	r	gh	gh	gh	s	s	c	t	t	tc	t	v	w	y	z	z	z	e	o								w	 																loa	moa	roa	soa	shoa	boa	toa	choa	noa	nyoa	'oa	zoa	doa	d'oa	joa	t'oa	ch'oa	p'oa	poa	ngwe	ngwi	ngwie	ngwi										she	shu	shi	sha	shie	sh	sho		che	chu	chi	cha	chie	ch	cho		zhe	zhu	zhi	zha	zhie	zh	zho		ch'e	ch'u	ch'i	ch'a	ch'ie	ch'	ch'o		k'ye	k'yu	k'yi	k'ya	k'yie	k'y	k'yo		kye	kyu	kyi	kya	kyie	ky	kyo		xye	xyu	xyi	xya	xyie	xy	xyo		gye	gyu	gyi	gya	gyie	gy	gyo		b	v	g	d	zh	z	k	l	m	n	o	p	r	s	t	kh	ts	ch	sh	shch	f	st	a	e	dj	u	e	yu	ia	e	o	io";

    case 46:
      return "+	+	+	+	+	+	+	+	+	+	+	*	\\	/	#	_	_	_	,	/	/	/	>	=	!?	/	-	~	\\	/	~	~	[	]	[	]	[	]	(	)	((	))	:	:	::	+	?	'	*	-	,	-	,	;	+	+	+	S	--	---	.	:	|	C	=	,	\"	-	:	.	:	.	.	;	/	+++	,	P	;	/	+	+	&																																														Bing	Han	Yi	Yi	Yi	Ren	Fang	Ji	Dao	Dao	Bu	Jie	Xiao	Xiao	Wang	Wang	Wang	Wang	Ji	Yao	Ji	Ji	Xin	Xin	Shou	Pu		Wu	Ri	Yue	Dai	Wu	Shi	Shui	Shui	Huo	Zhao	Zhao	Qiang	Niu	Quan	Yu	Pi	Mu	Shi	Shi	Zhu	Mi	Mi	Wang	Wang	Wang	Wang	Wang	Yang	Yang	Yang	Lao	Yu	Yu	Rou	Jiu	Cao	Cao	Cao	Hu	Yi	Ya	Ya	Jian	Jiao	Jiao	Yan	Bei	Zu	Che	Chuo	Chuo	Chuo	Yi	Jin	Chang	Chang	Chang	Men	Fu	Fu	Yu	Qing	Wei	Ye	Feng	Fei	Shi	Shi	Shi	Shi	Shou	Ma	Gu	Gui	Yu	Niao	Lu	Mai	Huang	Min	Sei	Qi	Ha	Chi	Ryu	Long	Gui	Kame	Gui";

    case 47:
      return "Yi	Gun	Zhu	Pie	Yi	Jue	Er	Tou	Ren	Er	Ru	Ba	Jiong	Mi	Bing	Ji	Kan	Dao	Li	Bao	Bi	Fang	Xi	Shi	Bu	Jie	Han	Si	You	Kou	Wei	Tu	Shi	Zhi	Sui	Xi	Da	Nu	Zi	Mian	Cun	Xiao	Wang	Shi	Che	Shan	Chuan	Gong	Ji	Jin	Gan	Yao	Guang	Yin	Gong	Yi	Gong	Ji	Shan	Chi	Xin	Ge	Hu	Shou	Zhi	Pu	Wen	Dou	Jin	Fang	Wu	Ri	Yue	Yue	Mu	Qian	Zhi	Dai	Shu	Wu	Bi	Mao	Shi	Qi	Shui	Huo	Zhao	Fu	Yao	Qiang	Pian	Ya	Niu	Quan	Xuan	Yu	Gua	Wa	Gan	Sheng	Yong	Tian	Pi	Ne	Bo	Bai	Pi	Min	Mu	Mao	Shi	Shi	Shi	Rou	He	Xue	Li	Zhu	Mi	Mi	Fou	Wang	Yang	Yu	Lao	Er	Lei	Er	Yu	Rou	Chen	Zi	Zhi	Jiu	She	Chuan	Zhou	Gen	Se	Cao	Hu	Chong	Xue	Xing	Yi	Ya	Jian	Jiao	Yan	Gu	Dou	Shi	Zhi	Bei	Chi	Zou	Zu	Shen	Che	Xin	Chen	Chuo	Yi	You	Bian	Li	Jin	Chang	Men	Fu	Li	Zhui	Yu	Qing	Fei	Mian	Ge	Wei	Jiu	Yin	Ye	Feng	Fei	Shi	Shou	Xiang	Ma	Gu	Gao	Biao	Dou	Chang	Li	Gui	Yu	Niao	Lu	Lu	Mai	Ma	Huang	Shu	Hei	Zhi	Min	Ding	Gu	Shu	Bi	Qi	Chi	Long	Gui	Yue																											+	+	+	+	+	+	+	+	+	+	+	+";

    case 48:
      return " 	,	.	\"	(JIS)	-	/	0	<	>	<<	>>	[	]	[	]	[(	)]	@	=	[	]	[(	)]	[	]	[	]	~	\"	\"	\"	@	1	2	3	4	5	6	7	8	9							:wavy_dash:	<	<'	/	/'	\\	@	XX	10	20	30	-	Masu	:part_alternation_mark:	~	#		a	a	i	i	u	u	e	e	o	o	ka	ga	ki	gi	ku	gu	ke	ge	ko	go	sa	za	shi	ji	su	zu	se	ze	so	zo	ta	da	chi	ji	tsu	tsu	zu	te	de	to	do	na	ni	nu	ne	no	ha	ba	pa	hi	bi	pi	fu	bu	pu	he	be	pe	ho	bo	po	ma	mi	mu	me	mo	ya	ya	yu	yu	yo	yo	ra	ri	ru	re	ro	wa	wa	i	e	o	n	vu	ka	ke			'	`	'	`	-	-'	yori	=	a	a	i	i	u	u	e	e	o	o	ka	ga	ki	gi	ku	gu	ke	ge	ko	go	sa	za	shi	ji	su	zu	se	ze	so	zo	ta	da	chi	ji	tsu	tsu	zu	te	de	to	do	na	ni	nu	ne	no	ha	ba	pa	hi	bi	pi	fu	bu	pu	he	be	pe	ho	bo	po	ma	mi	mu	me	mo	ya	ya	yu	yu	yo	yo	ra	ri	ru	re	ro	wa	wa	i	e	o	n	vu	ka	ke	va	vi	ve	vo	-		-	-'	koto";

    case 49:
      return "					B	P	M	F	D	T	N	L	G	K	H	J	Q	X	Zh	Ch	Sh	R	Z	C	S	A	O	E	Eh	Ai	Ei	Ao	Ou	An	En	Ang	Eng	Er	I	U	Yu	V	Ng	Ny	Ih	E	Nn		g	kk	gs	n	nj	nh	d	tt	l	lg	lm	lb	ls	lt	lp	lh	m	b	pp	bs	s	ss		j	jj	ch	k	t	p	h	a	ae	ya	yae	eo	e	yeo	ye	o	wa	wae	oe	yo	u	wo	we	wi	yu	eu	ui	i		nn	nd	ns	nz	lgs	ld	lbs	lz	lq	mb	ms	mz	mh	bg	bd	bsg	bsd	bj	bt	v	pph	sg	sn	sd	sb	sj	z		ng	ngs	ngz	f	hh	q	yoya	yoyae	yoi	yuyeo	yuye	yui	o	oy		-	<	1	2	3	4	A	B	C	1st	2nd	3rd	4th	a	b	c	Bu	Zi	Ji	Gu	Ee	Enn	Oo	Onn	Ir	Ann	Inn	Unn	Im	Ngg	Ainn	Aunn	Am	Om	Ong	Innn	P	T	K	H	Gh	Lh	Zy	G	Gw	Kw	Oe	Ah	T	WG	XG	BXG	SW	HZZ	HZG	HP	HZWG	SZWG	HZT	HZZP	HPWG	HZW	HZZZ	N	H	S	P	SP	D	HZ	HG	SZ	SWZ	ST	SG	PD	PZ	TN	SZZ	SWG	HXWG	HZZZG	PG	Q													ku	shi	su	to	nu	ha	hi	fu	he	ho	mu	ra	ri	ru	re	ro";

    case 50:
      return "(g)	(n)	(d)	(l)	(m)	(b)	(s)	()	(j)	(ch)	(k)	(t)	(p)	(h)	(Ga)	(Na)	(Da)	(La)	(Ma)	(Ba)	(Sa)	(A)	(Ja)	(Cha)	(Ka)	(Ta)	(Pa)	(Ha)	(Ju)	(OJeon)	(OHu)		(1)	(2)	(3)	(4)	(5)	(6)	(7)	(8)	(9)	(10)	(Yue)	(Huo)	(Shui)	(Mu)	(Jin)	(Tu)	(Ri)	(Zhu)	(You)	(She)	(Ming)	(Te)	(Cai)	(Zhu)	(Lao)	(Dai)	(Hu)	(Xue)	(Jian)	(Qi)	(Zi)	(Xie)	(Ji)	(Xiu)	(Zi)	(Zhi)	Wen	You	Wen	Zheng	10	20	30	40	50	60	70	80	PTE	21	22	23	24	25	26	27	28	29	30	31	32	33	34	35	g	n	d	l	m	b	s		j	ch	k	t	p	h	Ga	Na	Da	La	Ma	Ba	Sa	A	Ja	Cha	Ka	Ta	Pa	Ha	ChamGo	JuUi	U	(K)	(1)	(2)	(3)	(4)	(5)	(6)	(7)	(8)	(9)	(10)	Yue	Huo	Shui	Mu	Jin	Tu	Ri	Zhu	You	She	Ming	Te	Cai	Zhu	Lao	Mi	Nan	Nu	Shi	You	Yin	Zhu	Xiang	Xiu	Xie	Zheng	Shang	Zhong	Xia	Zuo	You	Yi	Zong	Xue	Jian	Qi	Zi	Xie	Ye	36	37	38	39	40	41	42	43	44	45	46	47	48	49	50	1M	2M	3M	4M	5M	6M	7M	8M	9M	10M	11M	12M	Hg	erg	eV	LTD	a	i	u	e	o	ka	ki	ku	ke	ko	sa	shi	su	se	so	ta	chi	tsu	te	to	na	ni	nu	ne	no	ha	hi	fu	he	ho	ma	mi	mu	me	mo	ya	yu	yo	ra	ri	ru	re	ro	wa	i	e	o	Reiwa";

    case 51:
      return "apartment	alpha	ampere	are	inning	inch	won	escudo	acre	ounce	ohm	kai-ri	carat	calorie	gallon	gamma	giga	guinea	curie	guilder	kilo	kilogram	kilometer	kilowatt	gram	gram ton	cruzeiro	krone	case	koruna	co-op	cycle	centime	shilling	centi	cent	dozen	deci	dollar	ton	nano	knot	heights	percent	parts	barrel	piaster	picul	pico	building	farad	feet	bushel	franc	hectare	peso	pfennig	hertz	pence	page	beta	point	volt	hon	pound	hall	horn	micro	mile	mach	mark	mansion	micron	milli	millibar	mega	megaton	meter	yard	yard	yuan	liter	lira	rupee	ruble	rem	roentgen	watt	0H	1H	2H	3H	4H	5H	6H	7H	8H	9H	10H	11H	12H	13H	14H	15H	16H	17H	18H	19H	20H	21H	22H	23H	24H	hPa	da	AU	bar	oV	pc	dm	dm2	dm3	IU	Heisei	Showa	Taisho	Meiji	Inc.	pA	nA	uA	mA	kA	KB	MB	GB	cal	kcal	pF	nF	uF	ug	mg	kg	Hz	kHz	MHz	GHz	THz	ul	ml	dl	kl	fm	nm	um	mm	cm	km	mm2	cm2	m2	km2	mm3	cm3	m3	km3	m/s	m/s2	Pa	kPa	MPa	GPa	rad	rad/s	rad/s2	ps	ns	us	ms	pV	nV	uV	mV	kV	MV	pW	nW	uW	mW	kW	MW	kOhm	MOhm	a.m.	Bq	cc	cd	C/kg	Co.	dB	Gy	ha	HP	in	KK	KM	kt	lm	ln	log	lx	mb	mil	mol	PH	p.m.	PPM	PR	sr	Sv	Wb	V/m	A/m	1D	2D	3D	4D	5D	6D	7D	8D	9D	10D	11D	12D	13D	14D	15D	16D	17D	18D	19D	20D	21D	22D	23D	24D	25D	26D	27D	28D	29D	30D	31D	gal";

    case 52:
      return "Qiu	Tian	Hei		Kua	Wu	Yin						Yi										Xie						Chou					Nuo			Dan			Dai	Xu	Xing		Xiong	Liu	Lin	Xiang	Yong	Xin	Zhen	Dai	Wu	Pan	Ru		Ma	Qian	Yi	Yin	Nei	Cheng	Feng			Taai	Zhuo	Fang	Ao	Wu	Zuo		Zhou	Dong	Su	Yi	Qiong	Kuang	Lei	Nao	Zhu	Shu				Xu			Shen	Jie	Die	Nuo	Su	Yi	Long	Ying	Beng				Lan	Miao	Yi	Li	Ji	Yu	Luo	Chai	Nom			Hun	Xu	Hui	Rao		Zhou	Caam	Han	Xi	Tai	Yao	Hui	Jun	Ma	Lue	Tang	Yao	Zhao	Zhai	Yu	Zhuo	Er	Ran	Qi	Chi	Wu	Han	Tang	Se	Si	Qiong	Lei	Sa			Kui	Pu	Ta	Shu	Yang	Ou	Tai		Mian	Yin	Diao	Yu	Mie	Jun	Niao	Xie	You			Che	Feng	Lei	Li	Sin	Luo	Sek	Ji		Kwaan		Jip	Quan		Cai	Liang	Gu	Mao	Gung	Gua	Sui	Din	Wang	Mao	Man	Quan	Shi	Li		Wang	Kou	Du	Zhen	Ting			Bing	Huo	Dong	Gong	Cheng		Qin	Jiong	Lu	Xing		Nan	Xie	Mie	Bi	Jie	Su	Hung	Gong	Gung	You	Xing	Qia	Pi	Dian	Fu	Luo	Qia	Qia	Tang	Bai	Gan	Ci	Xuan	Lang		Fu	She	Diu	Li	Hua	Tou	Pian	Di	Ruan	E	Qie	Yi	Zhuo	Rui	Jian	Gong	Chi	Chong	Xi";

    case 53:
      return "Lue	Deng	Lin	Jue	Su	Xiao	Zan	Put		Zhu	Zhan	Jian	Zou	Chua	Xie	Li	Cim	Chi	Xi	Jian		Ji		Fei	Chu	Beng	Jie		Ba	Liang	Kuai		Xia	Bie	Jue	Lei	Xin	Bai	Yang	Lu	Bei	E	Lu		Coek	Che	Nuo	Xuan	Heng	Yu		Gui	Yi	Xuan	Gong	Lou	Ti	Le	Shi	Pei	Sun	Yao	Xian	Zou		Que	Yin	Xi	Zhi	Jia	Hu	La	Yi	Ke	Fu	Qin	Ai	Deoi	Ke	Chu	Xie	Chu	Wei	Cin	Teng	Huan	Su	You	Caam	Jun	Zhao	Xu	Shi		Shua	Kui	Shuang	He	Gai	Yan	Qiu	Shen	Hua	Xi	Fan	Pang	Dan	Fang	Gong	Ao	Fu	Ne	Xue	You	Hua	Hung	Chen	Guo	N	Hua	Li	Fa	Xiao	Pou	Dung	Si			Le	Lin	Yi	Hou	Zaau	Xu	Qu	Er			Xun					Nie	Wei	Xie	Ti	Hong	Tun	Nie	Nie	Yin	Zhen						Wai	Shou	Nuo	Ye	Qi	Tou	Han	Jun	Dong	Hun	Lu	Ju	Huo	Ling		Tian	Lun							Ge	Yan	Shi	Xue	Pen	Chun	Niu	Duo	Ze	E	Xie	You	E	Sheng	Wen	Ku	Hu	Ge	Xia	Man	Lue	Ji	Hou	Zhi		Gaa	Wai		Bai	Ai	Zhui	Qian	Gou	Dan	Bei	Bo	Chu	Li	Xiao	Xiu	Gou					Hong	Ti	Cu	Kuo	Lao	Zhi	Xie	Xi		Qie	Zha	Xi			Cong	Ji	Huo	Ta	Yan	Xu	Po	Sai				Guo	Ye	Xiang	Xue	He";

    case 54:
      return "Zuo	Yi	Ci		Leng	Xian	Tai	Rong	Yi	Zhi	Xi	Xian	Ju	Ji	Han		Pao	Li		Lan	Sai	Han	Yan	Qu	Lyun	Yan	Han	Kan	Chi	Nie	Huo		Bi	Xia	Weng	Xuan	Wan	You	Qin	Xu	Nie	Bi	Hao	Jing	Ao	Ao			Zhen	Tan	Ju	Zaau	Zuo	Bu	Jie	Ai	Zang	Ci	Fa	Zaan			Jyu	Nie	Liu	Mei	Dui	Bang	Bi	Bao		Chu	Xia	Tian	Chang			Duo	Wei	Fu	Duo	Yu	Ye	Kui	Wei	Kuai		Wei	Yao	Long	Xing	Bu	Chi	Xie	Nie	Lang	Yi	Zong	Man	Zhang	Xia	Gun	Xie		Ji	Liao	Yi	Ji	Yin		Da	Yi	Xie	Hao	Yong	Kan	Chan	Tai	Tang	Zhi	Bao	Meng	Kui	Chan	Lei		Xi		Xi	Qiao	Nang	Yun		Long	Fu	Zong		Gu	Kai	Diao	Hua	Kui		Gao	Tao		Shan	Lai	Nie	Fu	Gao	Qie	Ban	Jia	Kong	Xi	Yu	Zhui	Shen	Chuo	Xiao	Ji	Nu	Xiao	Yi	Yu	Yi	Yan	Shen	Ran	Hao	Sa	Jun	You	Daam	Xin	Pei	Qiu	Chan	O	Bu	Dong	Si	Er	Si	Mao	Yun	Ji	Naau	Qiao	Xiong	Pao	Chu	Peng	Nuo	Jie	Yi	Er	Duo	Zong	Haau		Duo			Qie	Lu	Qiu	Sou	Can	Dou	Xi	Feng	Yi	Suo	Qie	Po	Xin	Tong	Xin	You	Bei	Long	Wun	Haan	Wan	Sau	Yun	Li	Ta	Lan	Man	Qiang	Zhou	Yan	Xi	Lu	Xi	Sao	Fan	Fan	Wei	Fa	Yi	Nao	Cheng	Tan	Ji	Shu	Pian	An	Kua	Cha	Saan	Xian	Zhi";

    case 55:
      return "	Caa	Feng	Lian	Xun	Xu	Mi	Hui	Mu	Yong	Zhan	Yi	Nou	Tang	Xi	Yun	Shu	Fu	Yi	Da		Lian	Cao	Can	Ju	Lu	Su	Nen	Ao	An	Qian		Cui	Cong	Leoi	Ran	Nian	Mai	Xin	Yue	Nai	Ao	Shen	Ma	Daam	Dong	Lan	Xi	Yue	Zhi	Weng	Huai	Meng	Niao	Wan	Mi	Nie	Qu	Zan	Lian	Zhi	Zi	Hai	Xu	Hao	Xuan	Zhi	Mian	Chun	Gou		Chun	Luan	Zhu	Shou	Liao	Jiu	Xie	Ding	Jie	Rong	Mang	Geoi	Ke	Yao	Ning	Yi	Lang	Yong	Yin	Yan	Su	Sik	Lin	Ya	Mao	Ming	Zui	Yu	Yi	Gou	Mi	Jun	Wen		Kang	Dian	Long		Xing	Cui	Qiao	Mian	Meng	Qin		Wan	De	Ai		Bian	Nou	Lian	Jin	Yu	Chui	Zuo	Bo	Hui	Yao	Tui	Ji	An	Luo	Ji	Wei	Bo	Za	Xu	Nian	Yun		Ba	Zhe	Ju	Wei	Xie	Qi	Yi	Xie	Ci	Qiu	Du	Niao	Qi	Ji	Tui		Song	Dian	Lao	Zhan	Zi	Fan	Yin	Cen	Ji	Hui	Zi	Lan	Nao	Ju	Qin	Dai	Shutsu	Jie	Xu	Cong	Yong	Dou	Chi	Tou	Min	Huang	Sui	Ke	Zu	Hao	Cheng	Xue	Ni	Chi	Lian	An	Mu	Si	Xiang	Yang	Hua	Cuo	Qiu	Lao	Fu	Dui	Mang	Lang	Tuo	Han	Mang	Bo	Qun	Qi	Han		Long	Ban	Tiao	Ze	Qi	Zan	Mi	Pei	Zhan	Xiang	Gang		Qi		Lu	Caam	Yun	E	Duan	Min	Wei	Quan	Sou	Min	Tu		Ming	Yao	Jue	Li	Kuai	Gang	Yuan	Da	Gou	Lao	Lou	Qian	Ao	Biao	Yong	Mang";

    case 56:
      return "Dao	Caam	Ao		Xi	Fu	Dan	Jiu	Run	Tong	Qu	E	Qi	Ji	Ji	Hua	Jiao	Zui	Biao	Meng	Bai	Wei	Yi	Ao	Yu	Hao	Dui	Wo	Ni	Cuan		Li	Lu	Niao	Huai	Li		Lu	Feng	Mi	Yu	Fong	Ju			Zhan	Peng	Yi		Ji	Bi		Ren	Huang	Fan	Ge	Ku	Jie	Sha	Hei	Si	Tong	Yuan	Zi	Bi	Kua	Li	Huang	Xun	Nuo	Fong	Zhe	Wen	Xian	Qia	Ye	Mao		Saam	Shu	Zin	Qiao	Zhun	Kun	Wu	Ying	Chuang	Ti	Lian	Bi	Gou	Mang	Xie	Feng	Lou	Zao	Zheng	Chu	Man	Long		Yin	Pin	Zheng	Jian	Luan	Nie	Yi		Ji	Ji	Zhai	Yu	Jiu	Huan	Zhi	La	Ling	Zhi	Ben	Zha	Ju	Dan	Liao	Yi	Zhao	Xian	Chi	Ci	Chi	Yan	Lang	Dou	Long	Chan		Tui	Cha	Ai	Chi		Ying	Zhe	Tou		Tui	Cha	Yao	Zong	Zung	Pan	Qiao	Lian	Qin	Lu	Yan	Kang	Su	Yi	Chan	Jiong	Jiang		Jing		Dong	Go	Juan	Han	Di	Wu		Hong	Tou	Chi	Diao	Bi		Xun	Lu	Sai	Xie	Bi		Bi		Xian	Rui	Bie	Er	Juan		Zhen	Bei	E	Yu	Qu	Zan	Mi	Yi	Si	Gung		Daan	Shan	Tai	Mu	Jing	Bian	Rong	Ceng	Can	Ding				Keoi	Di	Tong	Ta	Xing	Song	Duo	Xi	Tao		Ti	Shan	Jian	Zhi	Wei	Yin			Huan	Zhong	Qi	Zong		Xie	Xie	Ze	Wei			Ta	Zhan	Ning			Sam	Yi	Ren	Shu	Cha	Zhuo";

    case 57:
      return "	Mian	Ji	Fang	Pei	Ai	Fan	Ao	Qin	Qia	Xiao	Fen	Gan	Qiao	Ge	Tong	Chan	You	Gao	Ben	Fu	Chu	Zhu		Zhou	Zaan	Hang	Nin	Jue	Chong	Cha	Kong	Lie	Li	Yu	Paang	Yu	Hai	Li	Hou	Gong	Ke	Yuan	De	Hui	Giu	Guang	Jiong	Zuo	Fu	Qie	Bei	Che	Ci	Mang	Han	Xi	Qiu	Huang	Nan		Chou	San	Yan	Zhi	De	Te	Men	Ling	Shou	Tui	Can	Die	Che	Peng	Yi	Ju	Ji	Lai	Tian	Yuan	Zaau	Cai	Qi	Yu	Lian	Cong				Yu	Ji	Wei	Mi	Sui	Xie	Xu	Chi	Qiu	Hui	Ging	Yu	Qie	Shun	Shui	Duo	Lou	Deon	Pang	Tai	Zhou	Yin	Sao	Fei	Chen	Yuan	Yi	Hun	Se	Ye	Min	Fen	He		Yin	Ce	Ni	Ao	Feng	Lian	Chang	Chan	Ma	Die	Hu	Lu	Ai	Yi	Hua	Zha	Hu	E	Huo	Sun	Ni	Xian	Li	Xian	Yan	Long	Men	Jin	Ji	Jyu	Bian	Yu	Huo	Miao	Chou	Mai		Le	Jie	Wei	Yi	Xuan	Xi	Can	Lan	Yin	Xie	Za	Luo	Ling	Qian	Huo	Jian	Wo	Zoi		Ge	Zhu	Die	Yong	Ji	Yang	Ru	Xi	Shuang	Yu	Yi	Qian	Ji	Qu	Tian	Shou	Qian	Mu	Jin	Mao	Yin	Gai	Po	Xuan	Mao	Fang	Ya	Gang	Song	Hui	Yu	Gua	Guai	Liu	E	Zi	Zi	Bi	Wa	Hin	Lie	Gaa		Kuai		Hai	Yin	Zhu	Chong	Xian	Xuan	So	Qiu	Pei	Gui	Er	Gong	Qiong	Hu	Lao	Li	Chen	San	Zhuo	Wo	Pou	Keng	Tun	Peng	Te	Ta	Zhuo	Biao	Gu	Hu	Coeng";

    case 58:
      return "Bing	Zhi	Dong	Dui	Zhou	Nei	Lin	Po	Ji	Min	Wei	Che	Gou	Bang	Ru	Tan	Bu	Zong	Kui	Lao	Han	Ying	Zhi	Jie	Xing	Xie	Xun	Shan	Qian	Xie	Su	Hai	Mi	Hun	Pi		Hui	Na	Song	Ben	Chou	Jie	Huang	Lan		Hu	Dou	Huo	Gun	Yao	Ce	Gui	Jian	Jian	Dao	Jin	Ma	Hui	Mian	Can	Lue	Pi	Yang	Ju	Ju	Que		Qian	Shai	Cau	Jiu	Huo	Yun	Da	Xuan	Xiao	Fei	Ce	Ye		Den		Qin	Hui	Tun	Ling	Qiang	Xi	Ni	Sai	Meng	Tuan	Lan	Hao	Ci	Zhai	Ao	Luo	Mie	Buk	Fu	Cam	Xie	Bo	Hui	Qing	Xie		Hei	Bo	Qian	Po	Jiao	Jue	Kun	Song	Ju	E	Nie	Qian	Die	Die	Pei	Qi	Zhi	Qi	Zhui	Ku	Yu	Qin	Ku	He	Fu	Gaang	Di	Xian	Gui	He	Qun	Han	Tong	Bo	Shan	Bi	Lu	Ye	Ni	Chuai	San	Diao	Lu	Tou	Lian	Ke	San	Zhen	Chuai	Lian	Mao	Deon	Qian	Kai	Shao	Xiao	Bi	Zha	Yin	Xi	Shan	Su	Sa	Rui	Chuo	Lu	Ling	Cha	Zaai	Huan			Jia	Ban	Hu	Dou	Caam	Lou	Ju	Juan	Ke	Suo	Luo	Zhe	Ding	Duan	Zhu	Yan	Pang	Cha					Yi	Zin		You	Hui	Yao	Yao	Zhi	Gong	Qi	Gen	Gwong		Hou	Mi	Fu	Hu	Guang	Tan	Di	Tou	Yan	Bun	Dung	Qu		Chang	Ming	Tao	Bao	An	Ceon	Zung	Xian				Mao	Lang	Nan	Bei	Chen	Hau	Fei	Zhou	Ji	Jie	Shu	Sik	Kun	Die	Lu	Thung";

    case 59:
      return "	Caap	Yu	Tai	Chan	Man	Min	Huan	Wen	Nuan	Huan	Hou	Jing	Bo	Xian	Li	Jin		Mang	Piao	Hao	Yang		Xian	Su	Wei	Che	Xi	Jin	Ceng	He	Fen	Shai	Ling	Fui	Dui	Qi	Pu	Yue	Bo		Hui	Die	Yan	Ju	Jiao	Nan	Lie	Yu	Ti	Tian	Wu	Hong	Xiao	Hao		Tiao	Zheng	Teng	Huang	Fu			Tun		Reng	Jiao	Gong	Xin			Yuan	Jue	Hua	Sik	Bang	Mou	Cat	Gang	Wei		Mei	Si	Bian	Lu	Qu			Ge	Zhe	Lu	Pai	Rong	Qiu	Lie	Gong	Xian	Xi	Xin		Niao				Xie	Lie	Fu	Cuo	Zhuo	Ba	Zuo	Zhe	Zui	He	Ji		Jian				Tu	Xian	Yan	Tang	Ta	Di	Jue	Ang	Han	Xiao	Ju	Wei	Bang	Zhui	Nie	Tian	Nai			You	Mian	Zin	Bui	Nai	Sheng	Cha	Yan	Gen	Chong	Ruan	Jia	Qin	Mao	E	Li	Chi	Zang	He	Jie	Nian	Wing	Guan	Hou	Gai	Cung	Ben	Suo	Wu	Ji	Xi	Qiong	He	Weng	Xian	Jie	Hun	Pi	Shen	Chou	Zhen	Sau	Zhan	Shuo	Ji	Song	Zhi	Ben		Sin		Lang	Bi	Xuan	Pei	Dai	Cat	Zhi	Pi	Chan	Bi	Su	Huo	Hen	Jiong	Chuan	Jiang	Nen	Gu	Fang			Ta	Cui	Xi	De	Xian	Kuan	Zhe	Ta	Hu	Cui	Lu	Juan	Lu	Qian	Pao	Zhen	Fan	Li	Cao	Qi			Ti	Ling	Qu	Lian	Lu	Shu	Gong	Zhe	Pao	Jin	Qing	Jung		Zong	Pu	Jin	Biao	Jian	Gun		Ban	Zao	Lie";

    case 60:
      return "Li	Luo	Shen	Mian	Jian	Di	Bei	Cim	Lian	Zeon	Xian	Pin	Que	Long	Zui	Gou	Jue	Shan	Xue		Xie	Hei	Lan	Qi	Yi	Nuo	Li	Yue		Yi	Chi	Ji	Hang	Xie	Keng	Zi	He	Xi	Qu	Hai	Xia	Hai	Gui	Chan	Xun	Xu	Shen	Kou	Xia	Sha	Yu	Ya	Pou	Zu	You	Zi	Lian	Xian	Xia	Yi	Sha	Yan	Jiao	Xi	Chi	Shi	Kang	Yin	Hei	Yi	Xi	Se	Jin	Ye	You	Que	Ye	Luan	Kun	Zheng			Ho		Xie	Gwai	Cui	Xiu	An	Xiu	Can	Chuan	Zha		Yi	Pi	Ku	Sheng	Lang	Tui	Xi	Ling	Qi	Wo	Lian	Du	Men	Lan	Wei	Duan	Kuai	Ai	Zai	Hui	Yi	Mo	Zi	Fen	Peng		Bi	Li	Lu	Luo	Hai	Zhen	Gai	Que	Zhen	Kong	Cheng	Jiu	Jue	Ji	Ling	Ci	Shao	Que	Rui	Chuo	Neng	Zhi	Lou	Pao			Bao	Rong	Xian	Lei	Xiao	Fu	Qu	Saau	Sha	Zhi	Tan	Rong	Su	Ying	Mao	Nai	Bian	Saau	Shuai	Tang	Han	Sao	Rong		Deng	Pu	Jiao	Tan		Ran	Ning	Lie	Die	Die	Zhong	Siu	Lu	Dan	Xi	Gui	Ji	Ni	Yi	Nian	Yu	Wang	Guo	Ze	Yan	Cui	Xian	Jiao	Tou	Fu	Pei	Ngoet	You	Qiu	Ya	Bu	Bian	Shi	Zha	Yi	Bian		Dui	Lan	Yi	Chai	Chong	Xuan	Xu	Yu	Xiu	Hong	Cung		Ta	Guo	Kiu		Suk	Long	Xie	Che	Jian	Tan	Pi	Zan	Xuan	Xian	Niao	San	Gaau				Mi	Ji	Nou	Hu	Hua	Wang	You	Ze	Bi	Mi	Qiang	Xie";

    case 61:
      return "Fan	Yi	Tan	Lei	Yong	Siu	Jin	She	Yin	Ji	Zyun	Su			Nai	Wang	Mian	Su	Yi	Shai	Xi	Ji	Luo	You	Mao	Zha	Sui	Zhi	Bian	Li	Caai							Qiao	Guan	Xi	Zhen	Yong	Nie	Jun	Xie	Yao	Xie	Zhi	Neng	Sam	Si	Long	Chen	Mi	Que	Dan	Shan			Syu	Su	Xie	Bo	Ding	Zu	Fong	Shu	She	Han	Tan	Gao				Na	Mi	Xun	Men	Jian	Cui	Jue	He	Fei	Shi	Che	Shen	Nu	Ping	Man	Cing				Yi	Chou	Mei	Ku	Bao	Lei	Ke	Sha	Bi	Sui	Ge	Pi	Yi	Xian	Ni	Ying	Zhu	Chun	Feng	Xu	Piao	Wu	Liao	Cang	Zou	Zuo	Bian	Yao	Huan	Pai	Xiu		Lei	Qing	Xiao	Jiao	Guo			Yan	Xue	Zhu	Heng	Ying	Xi	Can		Lian	Xian	Huan	Yin		Lian	Shan	Cang	Bei	Jian	Shu	Fan	Dian		Ba	Yu	Zyun		Nang	Lei	Yi	Dai		Chan	Chao	Gan	Jin	Nen	Pei			Liao	Mo	You	Siu	Liu	Han		Yong	Jin	Chi	Ren	Nong		Xie	Hong	Tian	Bung	Ai	Gua	Biao	Bo	Qiong		Shu	Chui	Hui	Chao	Fu	Hui	E	Wei	Fen	Tan	Zau	Lun	He	Yong	Hui	Nim	Yu	Zong	Yan	Qiu	Zhao	Jiong	Tai	Zin	Doanh	Bou		Dut		Tui	Lin	Jiong	Zha	Xing	Hu	Zing	Xu	Jyun	Fung	Hei	Cui	Qing	Mo	Fung	Zao	Beng	Chi			Yan	Ge	Mo	Bei	Juan	Die	Zhao		Wu	Yan	Sin	Jue	Xian";

    case 62:
      return "Tai	Han		Dian	Ji	Jie	Kao	Zuan	Ziu	Xie	Lai	Fan	Huo	Xi	Nie	Mi	Ran	Cuan	Yin	Mi		Jue	Qu	Tong	Wan	Zhe	Li	Shao	Kong	Xian	Zhe	Zhi	Tiao	Shu	Bei	Ye	Pian	Chan	Hu	Ken	Jiu	An	Chun	Qian	Bei	Ba	Fen	Ke	Tuo	Tuo	Zuo	Ling		Gui	Yan	Shi	Hou	Lie	Sha	Si	Fung	Bei	Ren	Du	Bo	Liang	Qian	Fei	Ji	Zong	Hui	He	Li	Yuan	Yue	Xiu	Chan	Di	Lei	Jin	Chong	Si	Pu	Yao	Jiang	Huan	Huan	Tao	Ru	Weng	Ying	Rao	Yin	Shi	Yin	Jue	Tun	Xuan	Jia	Zhong	Qie	Zhu	Diao	Zoeng	You		Saan	Yi	Shi	Yi	Mo	Zaau		Que	Xiao	Wu	Geng	Ying	Ting	Shi	Ni	Geng	Ta	Wo	Ju	Chan	Piao	Zhuo	Hu	Nao	Yan	Gou	Yu	Hou		Si	Chi	Hu	Yang	Weng	Xian	Pin	Rong	Lou	Lao	Shan	Xiao	Ze	Hai	Fan	Han	Chan	Zhan		Ta	Zhu	Nong	Han	Yu	Zhuo	You	Li	Huo	Xi	Xian	Chan	Lian	Hei	Si	Jiu	Pu	Qiu	Gong	Zi	Yu		Si	Reng	Niu	Mei	Ba	Jiu		Xu	Ping	Bian	Mao					Yi	Yu	Gwai	Ping	Qu	Bao	Hui		Cyun		Bu	Mang	La	Tu	Wu	Li	Ling	Ceon	Ji	Jun	Zou	Duo	Jue	Dai	Bei	Sam		Pang	Ji		La	Bin	Sui	Tu	Xue	Si					Duo		Gim	Sui	Bi	Tu	Se	Can	Tu	Mian	Jin	Lu	Lei	Maan	Zhan	Bi	Ji	Zen	Xuan	Li		Taam	Sui	Yong	Shu";

    case 63:
      return "Daat		E		Gei		Jing	Qiong	Luo	Zhen	Tun	Gu	Yu	Lei	Bo	Nei	Pian	Lian	Tang	Lian	Wen	Dang	Li	Ting	Wa	Zhou	Gang	Xing	Ang	Fan	Peng	Bo	Tuo	Shu	Yi	Bo	Qie	Tou	Gong	Tong	Han	Cheng	Jie	Huan	Xing	Dian	Chai	Dong	Pi	Ruan	Lie	Sheng	Ou	Di	Yu	Chuan	Rong	Kang	Tang	Cong	Piao	Chuang	Lu	Tong	Zheng	Li	Sa	Pan	Si	Dang	Dang	Hu	Yi	Xian	Xie	Luo	Liu	Ham	Tan	Gan	Cim	Tan	Saang	San		You	Nan		Gang	Jun	Chi	Gou	Wan	Li	Liu	Lie	Xia	Bei	An	Yu	Ju	Rou	Xun	Zi	Cuo	Can	Zeng	Yong	Fu	Ruan	Sing	Xi	Shu	Jiao	Jiao	Xu	Zhang	Zong		Shui	Chen	Fan	Ji	Zhi	Jan	Gu	Wu	Wo	Qie	Shu	Hai	Tuo	Du	Zi	Ran	Mu	Fu	Ling	Ji	Xiu	Xuan	Nai	Ya	Jie	Li	Da	Ru	Yuan	Lu	Shen	Li	Liang	Geng	Xin	Xie	Qin	Qie	Che	You	Bu	Kuang	Que	Ai	Qin	Qiang	Chu	Pei	Kuo	Yi	Guai	Sheng	Pian	Gaai	Zhou	Huang	Hui	Hu	Bei			Zha	Ji	Gu	Xi	Gao	Chai	Ma	Zhu	Tui	Zhui	Xian	Lang	Baan		Zing	Zhi	Ai	Xian	Guo	Xi	Zung	Tui	Can	Sao	Xian	Jie	Fen	Qun		Yao	Dao	Jia	Lei	Yan	Lu	Tui	Ying	Pi	Luo	Li	Bie	Hoeng	Mao	Bai	Huang	Dau	Yao	He	Chun	He	Ning	Chou	Li	Tang	Huan	Bi	Ba	Che	Yang	Da	Ao	Xue	Zi	Zi	Da	Ran	Bang	Cuo	Wan	Ta	Bao	Gan	Yan	Xi	Zhu	Ya";

    case 64:
      return "Fan	You	An	Tui	Meng	She	Jin	Gu	Ji	Qiao	Jiao	Yan	Xi	Kan	Mian	Xuan	Shan	Wo	Qian	Huan	Ren	Zhen	Tian	Jue	Xie	Qi	Ang	Mei	Gu	Bei	Tao	Fan	Ju	Chan	Shun	Bi	Mao	Shuo	Gu	Hong	Hua	Luo	Hang	Jia	Quan	Gai	Huang	Bu	Gu	Feng	Mu	Ai	Ying	Shun	Liang	Jie	Chi	Jie	Chou	Ping	Chen	Yan	Du	Di		Liang	Xian	Biao	Xing	Meng	Ye	Mi	Qi	Qi	Wo	Xie	Yu	Qia	Cheng	Yao	Ying	Yang	Ji	Zong	Xuan	Min	Lou	Kai	Yao	Yan	Sun	Gui	Huang	Ying	Sheng	Cha	Lian		Xuan	Chuan	Che	Ni	Qu	Miao	Huo	Yu	Zhan	Hu	Ceng	Biao	Qian	Xi	Jiang	Kou	Mai	Mang	Zhan	Bian	Ji	Jue	Nang	Bi	Shi	Shuo	Mo	Lie	Mie	Mo	Xi	Chan	Qu	Jiao	Huo	Xian	Xu	Niu	Tong	Hou	Yu		Chong	Bo	Zuan	Diao	Zhuo	Ji	Qia	Kwai	Xing	Hui	Shi	Ku	Caam	Dui	Yao	Yu	Bang	Jie	Zhe	Jia	Shi	Di	Dong	Ci	Fu	Min	Zhen	Zhen	Cik	Yan	Qiao	Hang	Gong	Qiao	Lue	Guai	La	Rui	Fa	Cuo	Yan	Gong	Jie	Guai	Guo	Suo	Wo	Zheng	Nie	Diao	Lai	Ta	Cui	Ya	Gun			Di		Mian	Jie	Min	Ju	Yu	Zhen	Zhao	Zha	Xing		Ban	He	Gou	Hong	Lao	Wu	Bo	Keng	Lu	Cu	Lian	Yi	Qiao	Shu	Saan	Xuan	Jin	Qin	Hui	Su	Chuang	Dun	Long		Nao	Tan	Dan	Wei	Gan	Da	Li	Ca	Xian	Pan	La	Zhu	Niao	Huai	Ying	Xian	Lan	Mo	Ba		Gui	Bi	Fu";

    case 65:
      return "Huo	Yi	Liu	Zoeng	Yin	Juan	Huo	Cheng	Dou	E		Yan	Zhui	Zha	Qi	Yu	Quan	Huo	Nie	Huang	Ju	She			Peng	Ming	Cao	Lou	Li	Chuang		Cui	Shan	Dan	Qi		Lai	Ling	Liao	Reng	Yu	Yi	Diao	Qi	Yi	Nian	Fu	Jian	Ya	Fang	Rui	Xian			Bi	Shi	Po	Nian	Zhi	Tao	Tian	Tian	Ru	Yi	Lie	An	He	Qiong	Li	Gui	Zi	Su	Yuan	Ya	Cha	Wan	Juan	Ting	You	Hui	Jian	Rui	Mang	Ju	Zi	Ju	An	Sui	Lai	Hun	Quan	Chang	Duo	Kong	Ne	Can	Ti	Xu	Jiu	Huang	Qi	Jie	Mao	Yan	Heoi	Zhi	Tui		Ai	Pang	Cang	Tang	En	Hun	Qi	Chu	Suo	Zhuo	Nou	Tu	Shen	Lou	Biao	Li	Man	Xin	Cen	Huang	Mei	Gao	Lian	Dao	Zhan	Zi			Zhi	Ba	Cui	Qiu		Long	Xian	Fei	Guo	Cheng	Jiu	E	Chong	Yue	Hong	Yao	Ya	Yao	Tong	Zha	You	Xue	Yao	Ke	Huan	Lang	Yue	Chen	Cyun	Cyun	Shen	Fo	Ning	Ming	Hong	Chuang	Yun	Xuan	Jin	Zhuo	Yu	Tan	Kang	Qiong		Cheng	Jiu	Xue	Zheng	Chong	Pan	Qiao	Fo	Qu	Lan	Yi	Rong	Si	Qian	Si	Hat	Fa		Meng	Hua		Gong	Hai	Qiao	Chu	Que	Dui	Li	Ba	Jie	Xu	Luo	Deoi	Yun	Zhong	Hu	Yin	Pok	Zhi	Qian	Zim	Gan	Jian	Zhu	Zhu	Ku	Nie	Rui	Ze	Ang	Zhi	Gong	Yi	Chi	Ji	Zhu	Lao	Ren	Rong	Zheng	Na	Ce	Zin		Yi	Jue	Bie	Cheng	Jun	Dou	Wei	Yi	Zhe	Yan";

    case 66:
      return "San	Lun	Ping	Zhao	Han	Yu	Dai	Zhao	Fei	Sha	Ling	Ta	Qu	Mang	Ye	Bao	Gui	Gua	Nan	Ge	Gaa	Shi	Ke	Suo	Ci	Zhou	Tai	Kuai	Qin	Xu	Du	Ce	Huan	Cong	Sai	Zheng	Qian	Jin	Zong	Wei			Xi	Na	Pu	Sou	Ju	Zhen	Shao	Tao	Ban	Ta	Qian	Weng	Rong	Luo	Hu	Sou	Zhong	Pu	Mie	Jin	Shao	Mi	Shu	Ling	Lei	Jiang	Leng	Zhi	Diao		San	Gu	Fan	Mei	Sui	Jian	Tang	Xie	Ku	Wu	Fan	Luo	Can	Ceng	Ling	Yi	Cong	Yun	Meng	Yu	Zhi	Yi	Dan	Huo	Wei	Tan	Se	Xie	Sou	Song	Qian	Liu	Yi	Aau	Lei	Li	Fei	Lie	Lin	Xian	Xiao	Ou	Mi	Xian	Rang	Zhuan	Shuang	Yan	Bian	Ling	Hong	Qi	Liao	Ban	Bi	Hu	Hu	Caap	Ce	Pei	Qiong	Ming	Jiu	Bu	Mei	San	Wei	Zong	Bei	Li	Quan	Sam	Hun	Xiang	Zing	Shi	Ying	Gin	Nan	Huang	Jiu	Yan	Deoi	Sa	Tuan	Xie	Zhe	Men	Xi	Man	Zoeng	Huang	Tan	Xiao	Ye	Bi	Luo	Fan	Li	Cui	Chua	Dao	Di	Kuang	Chu	Xian	Chan	Mi	Qian	Qiu	Zhen	Zi	Heoi	Cim	Hu	Gan	Chi	Guai	Mu	Bo	Hua	Geng	Yao	Mao	Wang				Ru	Xue	Zheng	Min	Jiang	O	Zhan	Zuo	Yue	Lie	Nou	Zhou	Bi	Ren	Yu	Gin	Chuo	Er	Yi	Mi	Qing	Zing	Wang	Ji	Bu	Syu	Bie	Fan	Yue	Li	Fan	Qu	Fu	Er	E	Zheng	Tian	Yu	Jin	Qi	Ju	Lai	Che	Bei	Niu	Yi	Xu	Mou	Xun	Fu	Cau	Nin	Ting	Beng	Zha	Wei";

    case 67:
      return "Ke	Yao	Ou	Xiao	Geng	Tang	Gui	Hui	Ta	Gong	Yao	Da	Qi	Jin	Lue	Mi	Mi	Jian	Lu	Fan	Ou	Mi	Jie	Fu	Bie	Huang	Su	Yao	Nie	Jin	Lian	Bo	Jian	Ti	Ling	Zuan	Shi	Yin	Dao	Chou	Ca	Mie	Yan	Lan	Chong	Jiao	Shuang	Quan	Nie	Luo	Fan	Shi	Luo	Zhu	Zi	Chou	Juan	Jiong	Er	Yi	Rui	Cai	Ren	Fu	Lan	Sui	Yu	You	Dian	Ling	Zhu	Ta	Ping	Zhai	Jiao	Chui	Bu	Kou	Cun		Han	Han	Mou	Hu	Gong	Di	Fu	Xuan	Mi	Mei	Lang	Gu	Zhao	Ta	Yu	Zong	Li	Lu	Wu	Lei	Ji	Li	Li	Zong	Po	Yang	Wa	Tuo	Peng	Cau	Zhao	Gui	Zaan	Xu	Nai	Que	Wei	Zheng	Dong	Wei	Bo	Zin	Huan	Xuan	Zan	Li	Yan	Huang	Xue	Hu	Bao	Ran	Xiao	Po	Liao	Zhou	Yi	Xu	Luo	Kao	Chu	Fu	Na	Han	Chao	Lu	Zhan	Ta	Fu	Hong	Zeng	Qiao	Su	Pin	Guan		Hun	Chu		Er	Er	Ruan	Qi	Si	Ju		Yan	Bang	Ye	Zi	Ne	Chuang	Ba	Cao	Ti	Han	Zuo	Ba	Zhe	Wa	Geng	Bi	Er	Zhu	Wu	Wen	Zhi	Zhou	Lu	Wen	Gun	Qiu	La	Zai	Sou	Mian	Di	Qi	Cao	Piao	Lian	Shi	Long	Su	Qi	Yuan	Feng	Xu	Jue	Di	Pian	Guan	Niu	Ren	Zhen	Gai	Pi	Tan	Chao	Chun	He	Zhuan	Mo	Bie	Qi	Shi	Bi	Jue	Si	Taam	Gua	Na	Hui	Xi	Er	Xiu	Mou	Zyu	Xi	Zhi	Run	Ju	Die	Zhe	Shao	Meng	Bi	Han	Yu	Xian	Pang	Neng	Can	Bu	Pong	Qi";

    case 68:
      return "Ji	Zhuo	Lu	Jun	Xian	Xi	Cai	Wen	Zhi	Zi	Kun	Cong	Tian	Chu	Di	Chun	Qiu	Zhe	Zha	Rou	Bin	Ji	Xi	Zhu	Jue	Ge	Ji	Da	Chen	Suo	Ruo	Xiang	Huang	Qi	Zhu	Sun	Chai	Weng	Ke	Kao	Gu	Gai	Fan	Cong	Cao	Zhi	Chan	Lei	Xiu	Zhai	Zhe	Yu	Gui	Gong	Zan	Dan	Huo	Sou	Tan	Gu	Xi	Man	Duo	Ao	Pi	Wu	Ai	Meng	Pi	Meng	Yang	Zhi	Bo	Ying	Wei	Rang	Lan	Yan	Chan	Quan	Zhen	Pu		Tai	Fei	Shu		Dang	Cuo	Tan	Tian	Chi	Ta	Jia	Shun	Huang	Liao	Caa	Dou	Chen	Jin	E	Gou	Fu	Duo		E	Beng	Tao	Di		Di	Bu	Wan	Zhao	Lun	Qi	Mu	Qian		Zong	Sou	Fan	You	Zhou	Ta		Su	Bu	Xi	Jiang	Cao	Fu	Teng	Che	Fu	Fei	Wu	Xi	Yang	Ming	Pang	Mang	Seng	Meng	Cao	Tiao	Kai	Bai	Xiao	Xin	Qi	Seoi		Shao	Huan	Niu	Xiao	Chen	Dan	Feng	Yin	Ang	Ran	Ri	Man	Fan	Qu	Shi	He	Bian	Dai	Mo	Deng			Kuang	Zing	Cha	Duo	You	Hao	Tin	Gua	Xue	Lei	Jin	Qi	Qu	Wang	Yi	Liao	Gat		Yan	Yi	Yin	Qi	Zhe	Xi	Yi	Ye	Wu	Zhi	Zhi	Han	Chuo	Fu	Chun	Ping	Kuai	Chou		Tuo	Qiong	Cong	Gao	Kua	Qu	Qu	Zhi	Meng	Li	Zhou	Ta	Zhi	Gu	Liang	Hu	La	Dian	Ci	Ying	Zi	Jik	Qi	Zhuo	Cha	Mao	Du	Yin	Chai	Rui	Hen	Ruan	Fu	Lai	Xing	Jian	Yi	Mei		Mang	Ji	Suo	Han";

    case 69:
      return "Seoi	Li	Zi	Zu	Yao	Ge	Li	Qi	Gong	Li	Bing	Suo			Su	Chou	Jian	Xie	Bei	Xu	Jing	Pu	Ling	Xiang	Zuo	Diao	Chun	Qing	Nan	Zhai	Lu	Yi	Shao	Yu	Hua	Li	Pa	Siu		Li			Shuang		Yi	Ning	Si	Ku	Fu	Yi	Deng	Ran	Ce	Gaan	Ti	Qin	Biao	Sui	Wei	Dun	Se	Ai	Qi	Zun	Kuan	Fei		Yin	Zing	Sao	Dou	Hui	Xie	Ze	Tan	Tang	Zhi	Yi	Fu	E		Jun	Jia	Cha	Xian	Man	Syun	Bi	Ling	Jie	Kui	Jia	Ceoi	Cheng	Lang	Xing	Fei	Lu	Zha	He	Ji	Ni	Ying	Xiao	Teng	Lao	Ze	Kui	Goeng	Qian	Ju	Piao	Fan	Tou	Lin	Mi	Zhuo	Xie	Hu	Mi	Jie	Za	Cong	Li	Ran	Zhu	Yin	Han	Ceoi	Yi	Luan	Yue	Ran	Ling	Niang	Yu	Nue	Heoi	Yi	Nue	Yi	Qian	Xia	Chu	Yin	Mi	Xi	Na	Kan	Zu	Xia	Yan	Tu	Ti	Wu	Suo	Yin	Chong	Zhou	Mang	Yuan	Nu	Miao	Zao	Wan	Li	Qu	Na	Shi	Bi	Zi	Bang		Juan	Xiang	Kui	Pai	Kuang	Xun	Zha	Yao	Kun	Hui	Xi	E	Yang	Tiao	You	Jue	Li		Li	Cheng	Ji	Hu	Zhan	Fu	Chang	Guan	Ju	Meng	Chang	Tan	Mou	Xing	Li	Yan	Sou	Shi	Yi	Bing	Cong	Hou	Wan	Di	Ji	Ge	Han	Bo	Xiu	Liu	Can	Can	Yi	Xuan	Yan	Zao	Han	Yong	Zong	Fung	Kang	Yu	Qi	Zhe	Ma	Fung		Shuang	Jin	Guan	Pu	Lin		Ting	Jiang	La	Yi	Yong	Ci	Yan	Jie	Xun	Wei	Xian	Ning";

    case 70:
      return "Fu	Ge		Mo	Zhu	Nai	Xian	Wen	Li	Can	Mie	Jian	Ni	Chai	Wan	Xu	Nu	Mai	Zui	Kan	Ka	Hang		Faai	Yu	Wei	Zhu	Gei	Gan	Yi	Mo	Diao	Fu	Bi	Zhu	Zi	Shu	Xia	Ni		Jiao	Xun	Chong	Nou	Rong	Zhi	Sang	Sau	Shan	Yu		Jin	Zung	Lu	Han	Bie	Yi	Zui	Zhan	Yu	Wan	Ni	Guan	Jue	Beng	Can	Zung	Duo	Qi	Yao	Kui	Ruan	Hou	Xun	Xie		Kui		Xie	Bo	Ke	Cui	Xu	Bai	Ou	Zong	Bang	Ti	Chu	Chi	Niao	Guan	Feng	Xie	Deng	Wei	Jue	Kui	Zeng	Sa	Duo	Ling	Meng	Fan	Guo	Meng	Long		Ying	Hin	Guan	Cu	Li	Du	Ceng	Biao	Sin	Xi		De	De	Xian	Lian		Shao	Xie	Shi	Wei	Cam		He	You	Lu	Lai	Ying	Sheng	Juan	Qi	Jian	Yun		Qi	Zong	Lin	Ji	Mai	Chuang	Nian	Bin	Li	Ling	Gang	Cheng	Xuan	Xian	Hu	Bi	Zu	Dai	Dai	Hun	Sai	Che	Ti		Nuo	Zhi	Liu	Fei	Jiao	Guan	Xi	Lin	Xuan	Reng	Tao	Pi	Xin	Shan	Zhi	Wa	Tou	Tian	Yi	Xie	Pi	Yao	Yao	Nu	Hao	Nin	Yin	Fan	Nan	Yao	Wan	Yuan	Xia	Zhou	Yuan	Shi	Mian	Xi	Ji	Tao	Fei	Xue	Ni	Ci	Mi	Bian	Gam	Na	Yu	E	Zhi	Ren	Xu	Lue	Hui	Xun	Nao	Han	Jia	Dou	Hua	Tu	Ping	Cu	Xi	Song	Mi	Xin	Wu	Qiong	Zhang	Tao	Xing	Jiu	Ju	Hun	Ti	Man	Yan	Ji	Shou	Lei	Wan	Che	Can	Jie	You	Hui	Zha	Su	Ge";

    case 71:
      return "Nao	Xi		Dui	Chi	Wei	Zhe	Gun	Chao	Chi	Zao	Hui	Luan	Liao	Lao	Tuo	Hui	Wu	Ao	She	Sui	Mai	Tan	Xin	Jing	An	Ta	Chan	Wei	Tuan	Ji	Chen	Che	Yu	Xian	Xin		Daan		Nao		Yan	Qiu	Jiang	Song	Jun	Liao	Ju		Man	Lie		Chu	Chi	Xiang	Qin	Mei	Shu	Chai	Chi	Gu	Yu	Yin		Liu	Lao	Shu	Zhe	Shuang	Hui	Fat	Fui	E		Sha	Zong	Jue	Jun	Tuan	Lou	Wei	Chong	Zhu	Lie	Fun	Zhe	Zhao	Zaau	Yi	Chu	Ni	Bo	Suan	Yi	Hao	Ya	Huan	Man	Man	Qu	Lao	Hao	Zhong	Min	Xian	Zhen	Shu	Zuo	Zhu	Gou	Xuan	Yi	Zhi	Xie	Jin	Can	Zai	Bu	Liang	Zhi	Ji	Wan	Guan	Ju	Jing	Ai	Fu	Gui	Hou	Yan	Ruan	Zhi	Biao	Yi	Suo	Die	Gui	Sheng	Xun	Chen	She	Qing			Chun	Hong	Dong	Cheng	Wei	Ru	Shu	Cai	Ji	Za	Qi	Yan	Fu	Yu	Fu	Po	Zhi	Tan	Zuo	Che	Qu	You	He	Hou	Gui	E	Jiang	Yun	Tou	Cun	Tu	Fu	Zuo	Hu		Bo	Zhao	Jue	Tang	Jue	Fu	Huang	Chun	Yong	Chui	Suo	Chi	Qian	Cai	Xiao	Man	Can	Qi	Jian	Bi	Ji	Zhi	Zhu	Qu	Zhan	Ji	Bian		Li	Li	Yue	Quan	Cheng	Fu	Cha	Tang	Shi	Hang	Qie	Qi	Bo	Na	Tou	Chu	Cu	Yue	Zhi	Chen	Chu	Bi	Meng	Ba	Tian	Min	Lie	Feng	Cheng	Qiu	Tiao	Fu	Kuo	Jian	Ci			Zhen	Qiu	Zuo	Chi	Kui	Lie	Bei	Du	Wu	So	Zhuo	Lu";

    case 72:
      return "Tang	Zai	Chu	Liang	Tian	Kun	Chang	Jue	Tu	Huan	Fei	Bi		Xia	Wo	Ji	Qu	Kui	Hu	Qiu	Sui	Cai		Qiu	Pi	Pang	Wa	Yao	Rong	Xun	Cu	Die	Chi	Cuo	Meng	Xuan	Duo	Bie	Zhe	Chu	Chan	Gui	Duan	Zou	Deng	Lai	Teng	Yue	Quan	Zhu	Ling	Chen	Zhen	Fu	She	Tiao	Kua	Ai		Qiong	Shu	Hai	Shan	Wai	Zhan	Long	Jiu	Li		Chun	Rong	Yue	Jue	Kang	Fan	Qi	Hong	Fu	Lu	Hong	Tuo	Min	Tian	Juan	Qi	Zheng	Qing	Gong	Tian	Lang	Mao	Yin	Lu	Yuan	Ju	Pi		Xie	Bian	Hun	Zhu	Rong	Sang	Wu	Cha	Keng	Shan	Peng	Man	Xiu	Zung	Cong	Keng	Zhuan	Chan	Si	Chong	Sui	Bei	Kai		Zhi	Wei	Min	Ling	Zuan	Nie	Ling	Qi	Yue	Lip	Yi	Xi	Chen		Rong	Chen	Nong	You	Ji	Bo	Fang	Gei		Cu	Di	Jiao	Yu	He	Xu	Yu	Qu		Bai	Geng	Jiong	Gwai	Ya	Shu	You	Song	Ye	Cang	Yao	Shu	Yan	Shuai	Liao	Cong	Yu	Bo	Sui	Cin	Yan	Lei	Lin	Ti	Du	Yue	Ji	Cin	Yun	Bong		Ju	Ju	Chu	Chen	Gong	Xiang	Xian	An	Gui	Yu	Lei		Tu	Chen	Xing	Qiu	Hang		Dang	Cai	Di	Yan	Zi	Gung	Ying	Chan		Li	Suo	Ma	Ma		Tang	Pei	Lou	Qi	Cuo	Tu	E	Can	Jie	Yi	Ji	Dang	Jue	Bi	Lei	Yi	Chun	Chun	Po	Li	Zai	Tai	Po	Cu	Ju	Xu	Fan	Si	Xu	Er	Huo	Zhu	Ran	Fa	Juan	Han	Liang	Zhi	Mi	Yu";

    case 73:
      return "	Cen	Mei	Yin	Mian	Tu	Kui	Sau	Hei	Mi	Rong	Yu	Qiang	Mi	Ju	Pi	Jin	Wang	Ji	Meng	Jian	Xue	Bao	Gan	Chan	Li	Li	Qiu	Dun	Ying	Yun	Chen	Zhi	Ran		Lue	Kai	Gui	Yue	Hui	Pi	Cha	Duo	Chan	Sha	Shi	She	Xing	Ying	Shi	Chi	Ye	Han	Fei	Ye	Yan	Zuan	Sou	Jin	Duo	Xian	Guan	Tao	Qie	Chan	Han	Meng	Yue	Cu	Qian	Jin	Shan	Mu	Yuan	Coeng	Peng	Zheng	Zhi	Chun	Yu	Mou	Wan	Jiang	Qi	Su	Pie	Tian	Kuan	Cu	Sui	Co	Jie	Jian	Ao	Jiao	Ye	Saam	Ye	Long	Zao	Bao	Lian		Huan	Lu	Wei	Xian	Tie	Bo	Zheng	Zhu	Bei	Meng	Xie	Ou	You	Teon	Xiao	Li	Zha	Mi		Ye			Po	Xie	Lai	Jyu	Bong	Shan	Zhuo		Shan	Jue	Ji	Jie	Sei	Niao	Ao	Chu	Wu	Guan	Xie	Ting	Xue	Dang	Zhan	Tan	Peng	Xie	Xu	Xian	Si	Kua	Zheng	Wu	Huo	Run	Wen	Du	Huan	Kuo	Fu	Chuai	Xian	Qin	Qie	Lan		Ya	Ying	Que	Hang	Chun	Zhi	Gau	Wei	Yan	Xiang	Yi	Ni	Zheng	Chuai		Shi	Ding	Zi	Jue	Xu	Yuan			Xu	Dao	Tian	Ge	Yi	Hong	Yi		Li	Ku	Xian	Sui	Xi	Xuan		Gwik	Di	Lai	Zhou	Nian	Cheng	Jian	Bi	Zhuan	Ling	Hao	Bang	Tang	Chi	Ma	Xian	Shuan	Yong	Qu	Zaan	Pu	Hui	Wei	Yi	Ye		Che	Hao	Bin		Xian	Chan	Hun	Gaau	Han	Ci	Zhi	Qi	Kui	Rou	Gu	Ying	Xiong	Gap	Hu	Cui	Syu	Que";

    case 74:
      return "Di	Wu	Qiu		Yan	Liao	Bi	Soeng	Bin	Zing	Yuan	Nue	Bao	Ying	Hong	Ci	Qia	Ti	Yu	Lei	Bao	Wu	Ji	Fu	Xian	Cen	Hu	Se	Beng	Qing	Yu	Wa	Ai	Han	Dan	Ge	Di	Huo	Pang	Zaam	Zhui	Ling	Mai	Mai	Lian	Xiao	Xue	Zhen	Po	Fu	Nou	Xi	Dui	Dan	Yun	Xian	Yin	Shu	Dui	Beng	Hu	Fei	Fei	Za	Bei	Fei	Xian	Shi	Mian	Zhan	Zhan	Zhan	Hui	Fu	Wan	Mo	Qiao	Liao		Mie	Hu	Hong	Yu	Qi	Duo	Ang	Saa	Ba	Di	Xuan	Di	Bi	Zhou	Pao	Tie	Yi	Ting	Jia	Zhi	Tu	Xie	Dan	Tiao	Xie	Chang	Yuan	Guan	Liang	Beng	Gei	Lu	Ji	Xuan	Shu	Du	Sou	Hu	Yun	Chan	Bang	Rong	E	Weng	Ba	Feng	Yu	Zhe	Fen	Guan	Bu	Ge	Dun	Huang	Du	Ti	Bo	Qian	Lie	Long	Wei	Zhan	Lan	Sui	Na	Bi	Tuo	Zhu	Die	Bu	Ju	Po	Xia	Wei	Po	Da	Fan	Chan	Hu	Za		Saai	Zai	Zai	Zai	Fan	Xie	Hong	Chi	Bao	Yin		Jing	Bo	Ruan	Chou	Ying	Yi	Gai	Kun	Yun	Zhen	Ya	Ju	Hou	Min	Bai	Ge	Bian	Zhuo	Hao	Zhen	Sheng	Gen	Bi	Duo	Chun	Chua	San	Cheng	Ran	Chen	Mao	Pei	Wei	Pi	Fu	Zhuo	Qi	Lin	Yi	Men	Wu	Qi	Die	Chen	Xia	He	Sang	Gua	Hou	Ao	Fu	Qiao	Hun	Pi	Yan	Si	Xi	Ming	Kui	Ge		Ao	San	Shuang	Lou	Zhen	Hui	Chan	Ci	Lin	Na	Han	Du	Jin	Mian	Fan	E	Chao	Hong	Hong	Yu	Xue	Pao	Bi	Chao";

    case 75:
      return "You	Yi	Xue	Sa	Xu	Li	Li	Yuan	Dui	Huo	Sha	Leng	Pou	Hu	Guo	Bu	Rui	Wei	Sou	An	Yu	Xiang	Heng	Yang	Xiao	Yao	Fan	Bi	Ci	Heng	Tao	Liu	Fei	Zhu	Tou	Xi	Zan	Yi	Dou	Yuan	Jiu	Zai	Bo	Ti	Ying	Tou	Yi	Nian	Shao	Ben	Gou	Ban	Mo	Gai	En	She	Caan	Zhi	Yang	Jian	Yuan	Shui	Ti	Wei	Xun	Zhi	Yi	Ren	Shi	Hu	Ne	Ye	Jian	Sui	Ying	Bao	Hu	Hu	Ye		Yang	Lian	Xi	En	Dui	Zan	Zhu	Ying	Ying	Jin	Chuang	Dan		Kuai	Yi	Ye	Jian	En	Ning	Ci	Qian	Xue	Bo	Mi	Shui	Mo	Liang	Qi	Qi	Shou	Fu	Bo	Beng	Bie	Yi	Wei	Huan	Fan	Qi	Mao	Fu	Ang	Ang	Fu	Qi	Qun	Tuo	Yi	Bo	Pian	Ba	Keoi	Xuan		Baai	Yu	Chi	Lu	Yi	Li	Zaau	Niao	Xi	Wu	Gwing	Lei	Pu	Zhuo	Zui	Zhuo	Chang	An	Er	Yu	Leng	Fu	Zha	Hun	Chun	Sou	Bi	Bi	Zha	Song	He	Li	Giu	Han	Zai	Gu	Cheng	Lou	Mo	Mi	Mai	Ao	Zhe	Zhu	Huang	Fan	Deng	Tong		Du	Wo	Wei	Ji	Chi	Lin	Biao	Long	Jian	Nie	Luo	Shen	Ngon	Gua	Nie	Yi	Ku	Wan	Wa	Qia	Bo	Kao	Ling	Gan	Gua	Hai	Kuang	Heng	Kui	Ze	Ting	Lang	Bi	Huan	Po	Yao	Wan	Ti	Sui	Kua	Dui	Ao	Jian	Mo	Kui	Kuai	An	Ma	Qing	Qiao		Kao	Hao	Duo	Xian	Nai	Suo	Jie	Pi	Pa	Song	Chang	Nie	Man	Song	Ci	Xian	Kuo	Gai	Di	Pou	Tiao	Zu";

    case 76:
      return "Wo	Fei	Cai	Peng	Sai	Sou	Rou	Qi	Cuo	Pan	Bo	Man	Zong	Ci	Kui	Ji	Lan	Siu	Meng	Mian	Pan	Lu	Zuan	Gau	Liu	Yi	Wen	Li	Li	Zeng	Zhu	Hun	Shen	Chi	Xing	Wang	Dong	Huo	Pi	Hu	Mei	Che	Mei	Chao	Ju	Nou		Yi	Ru	Ling	Ya		Qi	Zi		Bang	Gong	Ze	Jie	Yu	Qin	Bei	Ba	Tuo	Yang	Qiao	You	Zhi	Jie	Mo	Sheng	Shan	Qi	Shan	Mi	Gong	Yi	Geng	Geng	Tou	Fu	Xue	Ye	Ting	Tiao	Mou	Liu	Can	Li	Shu	Lu	Huo	Cuo	Pai	Liu	Ju	Zhan	Ju	Zheng	Zu	Xian	Zhi			La			La	Xu	Geng	E	Mu	Zhong	Ti	Yuan	Zhan	Geng	Weng	Lang	Yu	Sou	Zha	Hai	Hua	Zhan	Coeng	Lou	Chan	Zhi	Wei	Xuan	Zao	Min	Gui	Su			Si	Duo	Cen	Kuan	Teng	Nei	Lao	Lu	Yi	Xie	Yan	Qing	Pu	Chou	Xian	Guan	Jie	Lai	Meng	Ye	Ceoi	Li	Yin	Chun	Qiu	Teng	Yu	Zau	Gau	Dai	Du	Hong	Si	Xi	Gaau	Qi	Ci	Yuan	Ji	Yun	Fang	Gong	Hang	Zhen	Que		Hiu	Jie	Pi	Gan	Xuan	Sheng	Shi	Qiao	Ci	Die	Bo	Diao	Wan	Ci	Zhi	Bai	Wu	Bao	Dan	Ba	Tong	Gyun	Gong	Jiu	Gui	Ci	You	Yuan	Lao	Ju	Fu	Nie	E	E	Xing	Kan	Yan	Tu	Pou	Beng	Ming	Shui	Yan	Qi	Yuan	Bie		Xuan	Hou	Huang	Yao	Juan	Kui	E	Ji	Mo	Chong	Bao	Wu	Zhen	Xu	Ta	Chi	Xi	Cong	Ma	Kou	Yan	Can	Aau	He	Deng	Ran";

    case 77:
      return "Tong	Yu	Xiang	Nao	Shun	Fen	Pu	Ling	Ao	Huan	Yi	Huan	Meng	Ying	Lei	Yan	Bao	Die	Ling	Shi	Jiao	Lie	Jing	Ju	Ti	Pi	Gang	Xiao	Wai	Chuai	Di	Huan	Yao	Li	Mi	Hu	Sheng	Jia	Yin	Wei		Piao	Lu	Ling	Yi	Cai	Shan	Hu	Shu	Tuo	Mo	Hua	Tie	Bing	Peng	Hun	Fu	Guo	Bu	Li	Chan	Pi	Cuo	Meng	Suo	Qiang	Zhi	Kuang	Bi	Ao	Meng	Xian	Ku	Tou	Tuan	Wei	Xian	Tan	Tuan	Lao	Chan	Ni	Ni	Li	Dong	Ju	Qian	Bo	Shai	Zha	Tao	Qian	Nong	Yi	Jing	Gan	Di	Jian	Mei	Da	Jian	Yu	Xie	Zai	Mang	Li	Gun	Xun	Ta	Zhe	Yang	Tuan	Shang	Xi	Qiao	Wei	Ying	Chua	Qu	Wa	Caau	Zhi	Ting	Gu	Shang	Ca	Fu	Tie	Ta	Ta	Zhuo	Han	Ping	He	Zhui	Zhou	Bo	Liu	Nu	Xi	Pao	Di	He	Ti	Wai	Ti	Qi	Ji	Chi	Ba	Jin	Ke	Li	Ju	Qu	La	Gu	Qia	Qi	Xian	Jian	Shi	Jian	Ai	Hua	Zha	Ze	Yao	Zhan	Ji	Cha	Yan	Jian		Yan	Gwaai	Jiao	Tong	Nan	Yue	Ceoi	Chi											Qian	Kun	Zhun	Meng	Xu	Song	Shi	Bi	XiaoChu	Lu	Tai	Pi	TongRen	DaYou	Qian	Yu	Sui	Gu	Lin	Guan	ShiKe	Bi	Bo	Fu	WuWang	DaChu	Yi	DaGuo	Kan	Li	Xian	Heng	Dun	DaZhuang	Jin	MingYi	JiaRen	Kui	Jian	Xie	Sun	Yi	Guai	Gou	Cui	Sheng	Kun	Jing	Ge	Ding	Zhen	Gen	Jian	GuiMei	Feng	Lu	Xun	Dui	Huan	Jie	ZhongFu	XiaoGuo	JiJi	WeiJi";

    case 78:
      return "Yi	Ding	Kao	Qi	Shang	Xia	Han	Wan	Zhang	San	Shang	Xia	Ji	Bu	Yu	Mian	Gai	Chou	Chou	Zhuan	Qie	Pi	Shi	Shi	Qiu	Bing	Ye	Cong	Dong	Si	Cheng	Diu	Qiu	Liang	Diu	You	Liang	Yan	Bing	Sang	Gun	Jiu	Ge	Ya	Qiang	Zhong	Ji	Jie	Feng	Guan	Chuan	Chan	Lin	Zhuo	Zhu	Ba	Wan	Dan	Wei	Zhu	Jing	Li	Ju	Pie	Fu	Yi	Yi	Nai	Wu	Jiu	Jiu	Tuo	Me	Yi	Yi	Zhi	Wu	Zha	Hu	Fa	Le	Yin	Ping	Pang	Qiao	Hu	Guai	Cheng	Cheng	Yi	Yin	Ya	Mie	Jiu	Qi	Ye	Xi	Xiang	Gai	Jiu	Xia	Hu	Shu	Dou	Shi	Ji	Nang	Jia	Ju	Shi	Mao	Hu	Mai	Luan	Zi	Ru	Xue	Yan	Fu	Sha	Na	Gan	Suo	Yu	Cui	Zhe	Gan	Zhi	Gui	Gan	Luan	Lin	Yi	Jue	Le	Ma	Yu	Zheng	Shi	Shi	Er	Chu	Yu	Kui	Yu	Yun	Hu	Qi	Wu	Jing	Si	Sui	Gen	Gen	Ya	Xie	Ya	Qi	Ya	Ji	Tou	Wang	Kang	Da	Jiao	Hai	Yi	Chan	Heng	Mu	Ye	Xiang	Jing	Ting	Liang	Xiang	Jing	Ye	Qin	Bo	You	Xie	Dan	Lian	Duo	Men	Ren	Ren	Ji	Ji	Wang	Yi	Shen	Ren	Le	Ding	Ze	Jin	Pu	Chou	Ba	Zhang	Jin	Jie	Bing	Reng	Cong	Fo	San	Lun	Bing	Cang	Zi	Shi	Ta	Zhang	Fu	Xian	Xian	Tuo	Hong	Tong	Ren	Qian	Gan	Ge	Bo	Dai	Ling	Yi	Chao	Chang	Sa	Chang	Yi	Mu	Men	Ren	Fan	Chao	Yang	Qian	Zhong	Pi	Wo	Wu	Jian	Jia	Yao	Feng	Cang	Ren	Wang	Fen	Di	Fang";

    case 79:
      return "Zhong	Qi	Pei	Yu	Diao	Dun	Wu	Yi	Xin	Kang	Yi	Ji	Ai	Wu	Ji	Fu	Fa	Xiu	Jin	Pi	Dan	Fu	Tang	Zhong	You	Huo	Hui	Yu	Cui	Yun	San	Wei	Chuan	Che	Ya	Xian	Shang	Chang	Lun	Cang	Xun	Xin	Wei	Zhu	Ze	Xian	Nu	Bo	Gu	Ni	Ni	Xie	Ban	Xu	Ling	Zhou	Shen	Qu	Ci	Beng	Shi	Jia	Pi	Yi	Si	Yi	Zheng	Dian	Han	Mai	Dan	Zhu	Bu	Qu	Bi	Zhao	Ci	Wei	Di	Zhu	Zuo	You	Yang	Ti	Zhan	He	Bi	Tuo	She	Yu	Yi	Fu	Zuo	Gou	Ning	Tong	Ni	Xian	Qu	Yong	Wa	Qian	Shi	Ka	Bao	Pei	Hui	He	Lao	Xiang	Ge	Yang	Bai	Fa	Ming	Jia	Er	Bing	Ji	Hen	Huo	Gui	Quan	Tiao	Jiao	Ci	Yi	Shi	Xing	Shen	Tuo	Kan	Zhi	Gai	Lai	Yi	Chi	Kua	Guang	Li	Yin	Shi	Mi	Zhu	Xu	You	An	Lu	Mou	Er	Lun	Dong	Cha	Chi	Xun	Gong	Zhou	Yi	Ru	Cun	Xia	Si	Dai	Lu	Ta	Jiao	Zhen	Ce	Qiao	Kuai	Chai	Ning	Nong	Jin	Wu	Hou	Jiong	Cheng	Zhen	Zuo	Chou	Qin	Lu	Ju	Shu	Ting	Shen	Tui	Bo	Nan	Xiao	Bian	Tui	Yu	Xi	Cu	E	Qiu	Xu	Guang	Ku	Wu	Jun	Yi	Fu	Liang	Zu	Qiao	Li	Yong	Hun	Jing	Qian	San	Pei	Su	Fu	Xi	Li	Fu	Ping	Bao	Yu	Qi	Xia	Xin	Xiu	Yu	Di	Che	Chou	Zhi	Yan	Lia	Li	Lai	Si	Jian	Xiu	Fu	Huo	Ju	Xiao	Pai	Jian	Biao	Chu	Fei	Feng	Ya	An	Bei	Yu	Xin	Bi	Hu";

    case 80:
      return "Chang	Zhi	Bing	Jiu	Yao	Cui	Lia	Wan	Lai	Cang	Zong	Ge	Guan	Bei	Tian	Shu	Shu	Men	Dao	Tan	Jue	Chui	Xing	Peng	Tang	Hou	Yi	Qi	Ti	Gan	Jing	Jie	Sui	Chang	Jie	Fang	Zhi	Kong	Juan	Zong	Ju	Qian	Ni	Lun	Zhuo	Wo	Luo	Song	Leng	Hun	Dong	Zi	Ben	Wu	Ju	Nai	Cai	Jian	Zhai	Ye	Zhi	Sha	Qing	Ning	Ying	Cheng	Qian	Yan	Ruan	Zhong	Chun	Jia	Ji	Wei	Yu	Bing	Ruo	Ti	Wei	Pian	Yan	Feng	Tang	Wo	E	Xie	Che	Sheng	Kan	Di	Zuo	Cha	Ting	Bei	Xie	Huang	Yao	Zhan	Chou	Yan	You	Jian	Xu	Zha	Ci	Fu	Bi	Zhi	Zong	Mian	Ji	Yi	Xie	Xun	Cai	Duan	Ce	Zhen	Ou	Tou	Tou	Bei	Za	Lou	Jie	Wei	Fen	Chang	Gui	Sou	Zhi	Su	Xia	Fu	Yuan	Rong	Li	Nu	Yun	Jiang	Ma	Bang	Dian	Tang	Hao	Jie	Xi	Shan	Qian	Jue	Cang	Chu	San	Bei	Xiao	Yong	Yao	Tan	Suo	Yang	Fa	Bing	Jia	Dai	Zai	Tang	Gu	Bin	Chu	Nuo	Can	Lei	Cui	Yong	Zao	Zong	Beng	Song	Ao	Chuan	Yu	Zhai	Zu	Shang	Chuang	Jing	Chi	Sha	Han	Zhang	Qing	Yan	Di	Xie	Lou	Bei	Piao	Jin	Lian	Lu	Man	Qian	Xian	Tan	Ying	Dong	Zhuan	Xiang	Shan	Qiao	Jiong	Tui	Zun	Pu	Xi	Lao	Chang	Guang	Liao	Qi	Cheng	Chan	Wei	Ji	Bo	Hui	Chuan	Tie	Dan	Jiao	Jiu	Seng	Fen	Xian	Ju	E	Jiao	Jian	Tong	Lin	Bo	Gu	Xian	Su	Xian	Jiang	Min	Ye	Jin	Jia	Qiao	Pi	Feng	Zhou	Ai	Sai";

    case 81:
      return "Yi	Jun	Nong	Chan	Yi	Dang	Jing	Xuan	Kuai	Jian	Chu	Dan	Jiao	Sha	Zai	Can	Bin	An	Ru	Tai	Chou	Chai	Lan	Ni	Jin	Qian	Meng	Wu	Ning	Qiong	Ni	Chang	Lie	Lei	Lu	Kuang	Bao	Yu	Biao	Zan	Zhi	Si	You	Hao	Qing	Chen	Li	Teng	Wei	Long	Chu	Chan	Rang	Shu	Hui	Li	Luo	Zan	Nuo	Tang	Yan	Lei	Nang	Er	Wu	Yun	Zan	Yuan	Xiong	Chong	Zhao	Xiong	Xian	Guang	Dui	Ke	Dui	Mian	Tu	Chang	Er	Dui	Er	Jin	Tu	Si	Yan	Yan	Shi	ShiKe	Dang	Qian	Dou	Fen	Mao	Shen	Dou	BaiKe	Jing	Li	Huang	Ru	Wang	Nei	Quan	Liang	Yu	Ba	Gong	Liu	Xi	Han	Lan	Gong	Tian	Guan	Xing	Bing	Qi	Ju	Dian	Zi	Fen	Yang	Jian	Shou	Ji	Yi	Ji	Chan	Jiong	Mao	Ran	Nei	Yuan	Mao	Gang	Ran	Ce	Jiong	Ce	Zai	Gua	Jiong	Mao	Zhou	Mao	Gou	Xu	Mian	Mi	Rong	Yin	Xie	Kan	Jun	Nong	Yi	Mi	Shi	Guan	Meng	Zhong	Ju	Yuan	Ming	Kou	Lin	Fu	Xie	Mi	Bing	Dong	Tai	Gang	Feng	Bing	Hu	Chong	Jue	Hu	Kuang	Ye	Leng	Pan	Fu	Min	Dong	Xian	Lie	Qia	Jian	Jing	Sou	Mei	Tu	Qi	Gu	Zhun	Song	Jing	Liang	Qing	Diao	Ling	Dong	Gan	Jian	Yin	Cou	Ai	Li	Chuang	Ming	Zhun	Cui	Si	Duo	Jin	Lin	Lin	Ning	Xi	Du	Ji	Fan	Fan	Fan	Feng	Ju	Chu	Zheng	Feng	Mu	Zhi	Fu	Feng	Ping	Feng	Kai	Huang	Kai	Gan	Deng	Ping	Qian	Xiong	Kuai	Tu	Ao	Chu	Ji	Dang	Han	Han	Zao";

    case 82:
      return "Dao	Diao	Dao	Ren	Ren	Chuang	Fen	Qie	Yi	Ji	Kan	Qian	Cun	Chu	Wen	Ji	Dan	Xing	Hua	Wan	Jue	Li	Yue	Lie	Liu	Ze	Gang	Chuang	Fu	Chu	Qu	Diao	Shan	Min	Ling	Zhong	Pan	Bie	Jie	Jie	Pao	Li	Shan	Bie	Chan	Jing	Gua	Geng	Dao	Chuang	Kui	Ku	Duo	Er	Zhi	Shua	Quan	Sha	Ci	Ke	Jie	Gui	Ci	Gui	Kai	Duo	Ji	Ti	Jing	Lou	Luo	Ze	Yuan	Cuo	Xue	Ke	La	Qian	Sha	Chuang	Gua	Jian	Cuo	Li	Ti	Fei	Pou	Chan	Qi	Chuang	Zi	Gang	Wan	Bo	Ji	Duo	Qing	Shan	Du	Jian	Ji	Bo	Yan	Ju	Huo	Sheng	Jian	Duo	Duan	Wu	Gua	Fu	Sheng	Jian	Ge	Da	Kai	Chuang	Chuan	Chan	Tuan	Lu	Li	Peng	Shan	Piao	Kou	Jiao	Gua	Qiao	Jue	Hua	Zha	Zhuo	Lian	Ju	Pi	Liu	Gui	Jiao	Gui	Jian	Jian	Tang	Huo	Ji	Jian	Yi	Jian	Zhi	Chan	Jian	Mo	Li	Zhu	Li	Ya	Quan	Ban	Gong	Jia	Wu	Mai	Lie	Jin	Keng	Xie	Zhi	Dong	Zhu	Nu	Jie	Qu	Shao	Yi	Zhu	Mo	Li	Jin	Lao	Lao	Juan	Kou	Yang	Wa	Xiao	Mou	Kuang	Jie	Lie	He	Shi	Ke	Jin	Gao	Bo	Min	Chi	Lang	Yong	Yong	Mian	Ke	Xun	Juan	Qing	Lu	Bu	Meng	Chi	Lei	Kai	Mian	Dong	Xu	Xu	Kan	Wu	Yi	Xun	Weng	Sheng	Lao	Mu	Lu	Piao	Shi	Ji	Qin	Jiang	Chao	Quan	Xiang	Yi	Jue	Fan	Juan	Tong	Ju	Dan	Xie	Mai	Xun	Xun	Lu	Li	Che	Rang	Quan	Bao	Shao	Yun	Jiu	Bao	Gou	Wu";

    case 83:
      return "Yun	Wen	Xiong	Gai	Gai	Bao	Cong	Yi	Xiong	Peng	Ju	Tao	Ge	Pu	E	Pao	Fu	Gong	Da	Jiu	Gong	Bi	Hua	Bei	Nao	Shi	Fang	Jiu	Yi	Za	Jiang	Kang	Jiang	Kuang	Hu	Xia	Qu	Fan	Gui	Qie	Zang	Kuang	Fei	Hu	Yu	Gui	Kui	Hui	Dan	Gui	Lian	Lian	Suan	Du	Jiu	Jue	Xi	Pi	Qu	Yi	Ke	Yan	Bian	Ni	Qu	Shi	Xun	Qian	Nian	Sa	Zu	Sheng	Wu	Hui	Ban	Shi	Xi	Wan	Hua	Xie	Wan	Bei	Zu	Zhuo	Xie	Dan	Mai	Nan	Dan	Ji	Bo	Shuai	Bo	Kuang	Bian	Bu	Zhan	Ka	Lu	You	Lu	Xi	Gua	Wo	Xie	Jie	Jie	Wei	Ang	Qiong	Zhi	Mao	Yin	Wei	Shao	Ji	Que	Luan	Chi	Juan	Xie	Xu	Jin	Que	Wu	Ji	E	Qing	Xi	San	Chang	Wei	E	Ting	Li	Zhe	Han	Li	Ya	Ya	Yan	She	Di	Zha	Pang	Ya	Qie	Ya	Zhi	Ce	Pang	Ti	Li	She	Hou	Ting	Zui	Cuo	Fei	Yuan	Ce	Yuan	Xiang	Yan	Li	Jue	Sha	Dian	Chu	Jiu	Jin	Ao	Gui	Yan	Si	Li	Chang	Lan	Li	Yan	Yan	Yuan	Si	Gong	Lin	Rou	Qu	Qu	Er	Lei	Du	Xian	Zhuan	San	Can	Can	Can	Can	Ai	Dai	You	Cha	Ji	You	Shuang	Fan	Shou	Guai	Ba	Fa	Ruo	Shi	Shu	Zhuo	Qu	Shou	Bian	Xu	Jia	Pan	Sou	Ji	Wei	Sou	Die	Rui	Cong	Kou	Gu	Ju	Ling	Gua	Dao	Kou	Zhi	Jiao	Zhao	Ba	Ding	Ke	Tai	Chi	Shi	You	Qiu	Po	Ye	Hao	Si	Tan	Chi	Le	Diao	Ji	Liao	Hong";

    case 84:
      return "Mie	Xu	Mang	Chi	Ge	Xuan	Yao	Zi	He	Ji	Diao	Cun	Tong	Ming	Hou	Li	Tu	Xiang	Zha	Xia	Ye	Lu	Ya	Ma	Ou	Huo	Yi	Jun	Chou	Lin	Tun	Yin	Fei	Bi	Qin	Qin	Jie	Bu	Fou	Ba	Dun	Fen	E	Han	Ting	Keng	Shun	Qi	Hong	Zhi	Yin	Wu	Wu	Chao	Na	Xue	Xi	Chui	Dou	Wen	Hou	Hong	Wu	Gao	Ya	Jun	Lu	E	Ge	Mei	Dai	Qi	Cheng	Wu	Gao	Fu	Jiao	Hong	Chi	Sheng	Na	Tun	Wu	Yi	Dai	Ou	Li	Bei	Yuan	Guo	Wen	Qiang	Wu	E	Shi	Juan	Pen	Wen	Ne	M	Ling	Ran	You	Di	Zhou	Shi	Zhou	Tie	Xi	Yi	Qi	Ping	Zi	Gu	Ci	Wei	Xu	He	Nao	Ga	Pei	Yi	Xiao	Shen	Hu	Ming	Da	Qu	Ju	Han	Za	Tuo	Duo	Pou	Pao	Bie	Fu	Yang	He	Za	He	Hai	Jiu	Yong	Fu	Da	Zhou	Wa	Ka	Gu	Ka	Zuo	Bu	Long	Dong	Ning	Ta	Si	Xian	Huo	Qi	Er	E	Guang	Zha	Xi	Yi	Lie	Zi	Mie	Mi	Zhi	Yao	Ji	Zhou	Ge	Shu	Zan	Xiao	Hai	Hui	Kua	Huai	Tao	Xian	E	Xuan	Xiu	Guo	Yan	Lao	Yi	Ai	Pin	Shen	Tong	Hong	Xiong	Duo	Wa	Ha	Zai	You	Die	Pai	Xiang	Ai	Gen	Kuang	Ya	Da	Xiao	Bi	Hui	Nian	Hua	Xing	Kuai	Duo	Fen	Ji	Nong	Mou	Yo	Hao	Yuan	Long	Pou	Mang	Ge	O	Chi	Shao	Li	Na	Zu	He	Ku	Xiao	Xian	Lao	Bo	Zhe	Zha	Liang	Ba	Mie	Lie	Sui	Fu	Bu	Han	Heng	Geng	Shuo	Ge";

    case 85:
      return "You	Yan	Gu	Gu	Bei	Han	Suo	Chun	Yi	Ai	Jia	Tu	Xian	Wan	Li	Xi	Tang	Zuo	Qiu	Che	Wu	Zao	Ya	Dou	Qi	Di	Qin	Ma	Mo	Gong	Dou	Qu	Lao	Liang	Suo	Zao	Huan	Lang	Sha	Ji	Zu	Wo	Feng	Jin	Hu	Qi	Shou	Wei	Shua	Chang	Er	Li	Qiang	An	Ze	Yo	Nian	Yu	Tian	Lai	Sha	Xi	Tuo	Hu	Ai	Zhao	Nou	Ken	Zhuo	Zhuo	Shang	Di	Heng	Lin	A	Cai	Xiang	Tun	Wu	Wen	Cui	Sha	Gu	Qi	Qi	Tao	Dan	Dan	Ye	Zi	Bi	Cui	Chuai	He	Ya	Qi	Zhe	Fei	Liang	Xian	Pi	Sha	La	Ze	Ying	Gua	Pa	Zhe	Se	Zhuan	Nie	Guo	Luo	Yan	Di	Quan	Chan	Bo	Ding	Lang	Xiao	Ju	Tang	Chi	Ti	An	Jiu	Dan	Ka	Yong	Wei	Nan	Shan	Yu	Zhe	La	Jie	Hou	Han	Die	Zhou	Chai	Wai	Nuo	Yu	Yin	Za	Yao	O	Mian	Hu	Yun	Chuan	Hui	Huan	Huan	Xi	He	Ji	Kui	Zhong	Wei	Sha	Xu	Huang	Duo	Nie	Xuan	Liang	Yu	Sang	Chi	Qiao	Yan	Dan	Pen	Can	Li	Yo	Zha	Wei	Miao	Ying	Pen	Bu	Kui	Xi	Yu	Jie	Lou	Ku	Zao	Hu	Ti	Yao	He	A	Xiu	Qiang	Se	Yong	Su	Hong	Xie	Ai	Suo	Ma	Cha	Hai	Ke	Da	Sang	Chen	Ru	Sou	Wa	Ji	Pang	Wu	Qian	Shi	Ge	Zi	Jie	Lao	Weng	Wa	Si	Chi	Hao	Suo	Garon	Hai	Suo	Qin	Nie	He	Zhi	Sai	N	Ge	Na	Die	Ai	Qiang	Tong	Bi	Ao	Ao	Lian	Zui	Zhe	Mo	Sou	Sou	Tan";

    case 86:
      return "Di	Qi	Jiao	Chong	Jiao	Kai	Tan	Shan	Cao	Jia	Ai	Xiao	Piao	Lou	Ga	Gu	Xiao	Hu	Hui	Guo	Ou	Xian	Ze	Chang	Xu	Po	De	Ma	Ma	Hu	Lei	Du	Ga	Tang	Ye	Beng	Ying	Sai	Jiao	Mi	Xiao	Hua	Mai	Ran	Chuai	Peng	Lao	Xiao	Ji	Zhu	Chao	Kui	Zui	Xiao	Si	Hao	Fu	Liao	Qiao	Xi	Chu	Chan	Dan	Hei	Xun	E	Zun	Fan	Chi	Hui	Zan	Chuang	Cu	Dan	Yu	Tun	Ceng	Jiao	Ye	Xi	Qi	Hao	Lian	Xu	Deng	Hui	Yin	Pu	Jue	Qin	Xun	Nie	Lu	Si	Yan	Ying	Da	Zhan	O	Zhou	Jin	Nong	Hui	Xie	Qi	E	Zao	Yi	Shi	Jiao	Yuan	Ai	Yong	Jue	Kuai	Yu	Pen	Dao	Ga	Hm	Dun	Dang	Xin	Sai	Pi	Pi	Yin	Zui	Ning	Di	Lan	Ta	Huo	Ru	Hao	Xia	Ye	Duo	Pi	Chou	Ji	Jin	Hao	Ti	Chang	Xun	Me	Ca	Ti	Lu	Hui	Bo	You	Nie	Yin	Hu	Me	Hong	Zhe	Li	Liu	Hai	Nang	Xiao	Mo	Yan	Li	Lu	Long	Mo	Dan	Chen	Pin	Pi	Xiang	Huo	Mo	Xi	Duo	Ku	Yan	Chan	Ying	Rang	Dian	La	Ta	Xiao	Jue	Chuo	Huan	Huo	Zhuan	Nie	Xiao	Ca	Li	Chan	Chai	Li	Yi	Luo	Nang	Za	Su	Xi	Zen	Jian	Za	Zhu	Lan	Nie	Nang	Lan	Lo	Wei	Hui	Yin	Qiu	Si	Nin	Jian	Hui	Xin	Yin	Nan	Tuan	Tuan	Dun	Kang	Yuan	Jiong	Pian	Yun	Cong	Hu	Hui	Yuan	E	Guo	Kun	Cong	Tong	Tu	Wei	Lun	Guo	Qun	Ri	Ling	Gu	Guo	Tai	Guo	Tu	You";

    case 87:
      return "Guo	Yin	Hun	Pu	Yu	Han	Yuan	Lun	Quan	Yu	Qing	Guo	Chuan	Wei	Yuan	Quan	Ku	Pu	Yuan	Yuan	Ya	Tu	Tu	Tu	Tuan	Lue	Hui	Yi	Huan	Luan	Luan	Tu	Ya	Tu	Ting	Sheng	Pu	Lu	Kuai	Ya	Zai	Wei	Ge	Yu	Wu	Gui	Pi	Yi	De	Qian	Qian	Zhen	Zhuo	Dang	Qia	Xia	Shan	Kuang	Chang	Qi	Nie	Mo	Ji	Jia	Zhi	Zhi	Ban	Xun	Yi	Qin	Mei	Jun	Rong	Tun	Fang	Ben	Ben	Tan	Kan	Huai	Zuo	Keng	Bi	Jing	Di	Jing	Ji	Kuai	Di	Jing	Jian	Tan	Li	Ba	Wu	Fen	Zhui	Po	Ban	Tang	Kun	Qu	Tan	Zhi	Tuo	Gan	Ping	Dian	Gua	Ni	Tai	Pi	Jiong	Yang	Fo	Ao	Lu	Qiu	Mu	Ke	Gou	Xue	Ba	Chi	Che	Ling	Zhu	Fu	Hu	Zhi	Chui	La	Long	Long	Lu	Ao	Dai	Pao	Min	Xing	Dong	Ji	He	Lu	Ci	Chi	Lei	Gai	Yin	Hou	Dui	Zhao	Fu	Guang	Yao	Duo	Duo	Gui	Cha	Yang	Yin	Fa	Gou	Yuan	Die	Xie	Ken	Shang	Shou	E	Bing	Dian	Hong	Ya	Kua	Da	Ka	Dang	Kai	Hang	Nao	An	Xing	Xian	Yuan	Bang	Fu	Ba	Yi	Yin	Han	Xu	Chui	Qin	Geng	Ai	Beng	Fang	Que	Yong	Jun	Jia	Di	Mai	Lang	Juan	Cheng	Shan	Jin	Zhe	Lie	Lie	Bu	Cheng	Hua	Bu	Shi	Xun	Guo	Jiong	Ye	Nian	Di	Yu	Bu	Ya	Quan	Sui	Pi	Qing	Wan	Ju	Lun	Zheng	Kong	Chong	Dong	Dai	Tan	An	Cai	Chu	Beng	Kan	Zhi	Duo	Yi	Zhi	Yi	Pei	Ji	Zhun	Qi	Sao	Ju	Ni";

    case 88:
      return "Ku	Ke	Tang	Kun	Ni	Jian	Dui	Jin	Gang	Yu	E	Peng	Gu	Tu	Leng	Fang	Ya	Qian	Kun	An	Shen	Duo	Nao	Tu	Cheng	Yin	Hun	Bi	Lian	Guo	Die	Zhuan	Hou	Bao	Bao	Yu	Di	Mao	Jie	Ruan	Ye	Geng	Kan	Zong	Yu	Huang	E	Yao	Yan	Bao	Ci	Mei	Chang	Du	Tuo	Yin	Feng	Zhong	Jie	Jin	Heng	Gang	Chun	Jian	Ping	Lei	Xiang	Huang	Leng	Duan	Wan	Xuan	Ji	Ji	Kuai	Ying	Ta	Cheng	Yong	Kai	Su	Su	Shi	Mi	Ta	Weng	Cheng	Tu	Tang	Que	Zhong	Li	Zhong	Bang	Sai	Zang	Dui	Tian	Wu	Zheng	Xun	Ge	Zhen	Ai	Gong	Yan	Kan	Tian	Yuan	Wen	Xie	Liu	Hai	Lang	Chang	Peng	Beng	Chen	Lu	Lu	Ou	Qian	Mei	Mo	Zhuan	Shuang	Shu	Lou	Chi	Man	Biao	Jing	Ce	Shu	Zhi	Zhang	Kan	Yong	Dian	Chen	Zhi	Xi	Guo	Qiang	Jin	Di	Shang	Mu	Cui	Yan	Ta	Zeng	Qian	Qiang	Liang	Wei	Zhui	Qiao	Zeng	Xu	Shan	Shan	Ba	Pu	Kuai	Dong	Fan	Que	Mo	Dun	Dun	Zun	Di	Sheng	Duo	Duo	Tan	Deng	Mu	Fen	Huang	Tan	Da	Ye	Zhu	Jian	Ao	Qiang	Ji	Qiao	Ken	Yi	Pi	Bi	Dian	Jiang	Ye	Yong	Xue	Tan	Lan	Ju	Huai	Dang	Rang	Qian	Xun	Xian	Xi	He	Ai	Ya	Dao	Hao	Ruan	Jin	Lei	Kuang	Lu	Yan	Tan	Wei	Huai	Long	Long	Rui	Li	Lin	Rang	Chan	Xun	Yan	Lei	Ba	Wan	Shi	Ren	San	Zhuang	Zhuang	Sheng	Yi	Mai	Ke	Zhu	Zhuang	Hu	Hu	Kun	Yi	Hu	Xu	Kun	Shou	Mang	Zun";

    case 89:
      return "Shou	Yi	Zhi	Gu	Chu	Jiang	Feng	Bei	Zhai	Bian	Sui	Qun	Ling	Fu	Cuo	Xia	Xiong	Xie	Nao	Xia	Kui	Xi	Wai	Yuan	Mao	Su	Duo	Duo	Ye	Qing	Wai	Gou	Gou	Qi	Meng	Meng	Yin	Huo	Chen	Da	Ze	Tian	Tai	Fu	Guai	Yao	Yang	Hang	Gao	Shi	Tao	Tai	Tou	Yan	Bi	Yi	Kua	Jia	Duo	Hua	Kuang	Yun	Jia	Ba	En	Lian	Huan	Di	Yan	Pao	Juan	Qi	Nai	Feng	Xie	Fen	Dian	Quan	Kui	Zou	Huan	Qi	Kai	Zha	Ben	Yi	Jiang	Tao	Zang	Ben	Xi	Huang	Fei	Diao	Xun	Beng	Dian	Ao	She	Weng	Ha	Ao	Wu	Ao	Jiang	Lian	Duo	Yun	Jiang	Shi	Fen	Huo	Bi	Luan	Duo	Nu	Nu	Ding	Nai	Qian	Jian	Ta	Jiu	Nuan	Cha	Hao	Xian	Fan	Ji	Shuo	Ru	Fei	Wang	Hong	Zhuang	Fu	Ma	Dan	Ren	Fu	Jing	Yan	Hai	Wen	Zhong	Pa	Du	Ji	Keng	Zhong	Yao	Jin	Yun	Miao	Fou	Chi	Yue	Zhuang	Niu	Yan	Na	Xin	Fen	Bi	Yu	Tuo	Feng	Wan	Fang	Wu	Yu	Gui	Du	Ba	Ni	Zhou	Zhuo	Zhao	Da	Nai	Yuan	Tou	Xian	Zhi	E	Mei	Mo	Qi	Bi	Shen	Qie	E	He	Xu	Fa	Zheng	Min	Ban	Mu	Fu	Ling	Zi	Zi	Shi	Ran	Shan	Yang	Man	Jie	Gu	Si	Xing	Wei	Zi	Ju	Shan	Pin	Ren	Yao	Dong	Jiang	Shu	Ji	Gai	Xiang	Hua	Juan	Jiao	Gou	Lao	Jian	Jian	Yi	Nian	Zhi	Ji	Ji	Xian	Heng	Guang	Jun	Kua	Yan	Ming	Lie	Pei	E	You	Yan	Cha	Shen	Yin	Shi	Gui	Quan	Zi";

    case 90:
      return "Song	Wei	Hong	Wa	Lou	Ya	Rao	Jiao	Luan	Ping	Xian	Shao	Li	Cheng	Xie	Mang	Fu	Suo	Mei	Wei	Ke	Chuo	Chuo	Ting	Niang	Xing	Nan	Yu	Na	Pou	Nei	Juan	Shen	Zhi	Han	Di	Zhuang	E	Pin	Tui	Xian	Mian	Wu	Yan	Wu	Ai	Yan	Yu	Si	Yu	Wa	Li	Xian	Ju	Qu	Zhui	Qi	Xian	Zhuo	Dong	Chang	Lu	Ai	E	E	Lou	Mian	Cong	Pou	Ju	Po	Cai	Ling	Wan	Biao	Xiao	Shu	Qi	Hui	Fan	Wo	Rui	Tan	Fei	Fei	Jie	Tian	Ni	Quan	Jing	Hun	Jing	Qian	Dian	Xing	Hu	Wan	Lai	Bi	Yin	Chou	Nao	Fu	Jing	Lun	An	Lan	Kun	Yin	Ya	Ju	Li	Dian	Xian	Hua	Hua	Ying	Chan	Shen	Ting	Dang	Yao	Wu	Nan	Chuo	Jia	Tou	Xu	Yu	Wei	Di	Rou	Mei	Dan	Ruan	Qin	Hui	Wo	Qian	Chun	Miao	Fu	Jie	Duan	Yi	Zhong	Mei	Huang	Mian	An	Ying	Xuan	Jie	Wei	Mei	Yuan	Zheng	Qiu	Shi	Xie	Tuo	Lian	Mao	Ran	Si	Pian	Wei	Wa	Cu	Hu	Ao	Jie	Bao	Xu	Tou	Gui	Chu	Yao	Pi	Xi	Yuan	Ying	Rong	Ru	Chi	Liu	Mei	Pan	Ao	Ma	Gou	Kui	Qin	Jia	Sao	Zhen	Yuan	Jie	Rong	Ming	Ying	Ji	Su	Niao	Xian	Tao	Pang	Lang	Nao	Bao	Ai	Pi	Pin	Yi	Piao	Yu	Lei	Xuan	Man	Yi	Zhang	Kang	Yong	Ni	Li	Di	Gui	Yan	Jin	Zhuan	Chang	Ze	Han	Nen	Lao	Mo	Zhe	Hu	Hu	Ao	Nen	Qiang	Ma	Pie	Gu	Wu	Qiao	Tuo	Zhan	Miao	Xian	Xian	Mo	Liao	Lian	Hua";

    case 91:
      return "Gui	Deng	Zhi	Xu	Yi	Hua	Xi	Kui	Rao	Xi	Yan	Chan	Jiao	Mei	Fan	Fan	Xian	Yi	Hui	Jiao	Fu	Shi	Bi	Shan	Sui	Qiang	Lian	Huan	Xin	Niao	Dong	Yi	Can	Ai	Niang	Ning	Ma	Tiao	Chou	Jin	Ci	Yu	Pin	Rong	Ru	Nai	Yan	Tai	Ying	Qian	Niao	Yue	Ying	Mian	Bi	Ma	Shen	Xing	Ni	Du	Liu	Yuan	Lan	Yan	Shuang	Ling	Jiao	Niang	Lan	Qian	Ying	Shuang	Hui	Quan	Mi	Li	Luan	Yan	Zhu	Lan	Zi	Jie	Jue	Jue	Kong	Yun	Ma	Zi	Cun	Sun	Fu	Bei	Zi	Xiao	Xin	Meng	Si	Tai	Bao	Ji	Gu	Nu	Xue	You	Zhuan	Hai	Luan	Sun	Nao	Mie	Cong	Qian	Shu	Can	Ya	Zi	Ni	Fu	Zi	Li	Xue	Bo	Ru	Nai	Nie	Nie	Ying	Luan	Mian	Ning	Rong	Ta	Gui	Zhai	Qiong	Yu	Shou	An	Tu	Song	Wan	Rou	Yao	Hong	Yi	Jing	Zhun	Mi	Zhu	Dang	Hong	Zong	Guan	Zhou	Ding	Wan	Yi	Bao	Shi	Shi	Chong	Shen	Ke	Xuan	Shi	You	Huan	Yi	Tiao	Shi	Xian	Gong	Cheng	Qun	Gong	Xiao	Zai	Zha	Bao	Hai	Yan	Xiao	Jia	Shen	Chen	Rong	Huang	Mi	Kou	Kuan	Bin	Su	Cai	Zan	Ji	Yuan	Ji	Yin	Mi	Kou	Qing	He	Zhen	Jian	Fu	Ning	Bing	Huan	Mei	Qin	Han	Yu	Shi	Ning	Jin	Ning	Zhi	Yu	Bao	Kuan	Ning	Qin	Mo	Cha	Ju	Gua	Qin	Hu	Wu	Liao	Shi	Ning	Zhai	Shen	Wei	Xie	Kuan	Hui	Liao	Jun	Huan	Yi	Yi	Bao	Qin	Chong	Bao	Feng	Cun	Dui	Si	Xun	Dao	Lu	Dui	Shou";

    case 92:
      return "Po	Feng	Zhuan	Fu	She	Ke	Jiang	Jiang	Zhuan	Wei	Zun	Xun	Shu	Dui	Dao	Xiao	Jie	Shao	Er	Er	Er	Ga	Jian	Shu	Chen	Shang	Shang	Mo	Ga	Chang	Liao	Xian	Xian	Kun	You	Wang	You	Liao	Liao	Yao	Mang	Wang	Wang	Wang	Ga	Yao	Duo	Kui	Zhong	Jiu	Gan	Gu	Gan	Tui	Gan	Gan	Shi	Yin	Chi	Kao	Ni	Jin	Wei	Niao	Ju	Pi	Ceng	Xi	Bi	Ju	Jie	Tian	Qu	Ti	Jie	Wu	Diao	Shi	Shi	Ping	Ji	Xie	Zhen	Xie	Ni	Zhan	Xi	Wei	Man	E	Lou	Ping	Ti	Fei	Shu	Xie	Tu	Lu	Lu	Xi	Ceng	Lu	Ju	Xie	Ju	Jue	Liao	Jue	Shu	Xi	Che	Tun	Ni	Shan	Wa	Xian	Li	E	Hui	Hui	Long	Yi	Qi	Ren	Wu	Han	Shen	Yu	Chu	Sui	Qi	Ren	Yue	Ban	Yao	Ang	Ya	Wu	Jie	E	Ji	Qian	Fen	Wan	Qi	Cen	Qian	Qi	Cha	Jie	Qu	Gang	Xian	Ao	Lan	Dao	Ba	Zuo	Zuo	Yang	Ju	Gang	Ke	Gou	Xue	Po	Li	Tiao	Qu	Yan	Fu	Xiu	Jia	Ling	Tuo	Pi	Ao	Dai	Kuang	Yue	Qu	Hu	Po	Min	An	Tiao	Ling	Chi	Ping	Dong	Han	Kui	Xiu	Mao	Tong	Xue	Yi	Bian	He	Ba	Luo	E	Fu	Xun	Die	Lu	En	Er	Gai	Quan	Dong	Yi	Mu	Shi	An	Wei	Huan	Zhi	Mi	Li	Ji	Tong	Wei	You	Qia	Xia	Li	Yao	Jiao	Zheng	Luan	Jiao	E	E	Yu	Xie	Bu	Qiao	Qun	Feng	Feng	Nao	Li	You	Xian	Rong	Dao	Shen	Cheng	Tu	Geng	Jun	Gao	Xia	Yin	Yu";

    case 93:
      return "Lang	Kan	Lao	Lai	Xian	Que	Kong	Chong	Chong	Ta	Lin	Hua	Ju	Lai	Qi	Min	Kun	Kun	Zu	Gu	Cui	Ya	Ya	Gang	Lun	Lun	Leng	Jue	Duo	Zheng	Guo	Yin	Dong	Han	Zheng	Wei	Xiao	Pi	Yan	Song	Jie	Beng	Zu	Ku	Dong	Zhan	Gu	Yin	Zi	Ze	Huang	Yu	Wai	Yang	Feng	Qiu	Yang	Ti	Yi	Zhi	Shi	Zai	Yao	E	Zhu	Kan	Lu	Yan	Mei	Han	Ji	Ji	Huan	Ting	Sheng	Mei	Qian	Wu	Yu	Zong	Lan	Ke	Yan	Yan	Wei	Zong	Cha	Sui	Rong	Ke	Qin	Yu	Qi	Lou	Tu	Dui	Xi	Weng	Cang	Dang	Rong	Jie	Kai	Liu	Wu	Song	Qiao	Zi	Wei	Beng	Dian	Cuo	Qian	Yong	Nie	Cuo	Ji	Shi	Ruo	Song	Zong	Jiang	Liao	Kang	Chan	Die	Cen	Ding	Tu	Lou	Zhang	Zhan	Zhan	Ao	Cao	Qu	Qiang	Cui	Zui	Dao	Dao	Xi	Yu	Pei	Long	Xiang	Ceng	Bo	Qin	Jiao	Yan	Lao	Zhan	Lin	Liao	Liao	Jin	Deng	Duo	Zun	Jiao	Gui	Yao	Jiao	Yao	Jue	Zhan	Yi	Xue	Nao	Ye	Ye	Yi	Nie	Xian	Ji	Xie	Ke	Xi	Di	Ao	Zui	Wei	Yi	Rong	Dao	Ling	Jie	Yu	Yue	Yin	Ru	Jie	Li	Gui	Long	Long	Dian	Rong	Xi	Ju	Chan	Ying	Kui	Yan	Wei	Nao	Quan	Chao	Cuan	Luan	Dian	Dian	Nie	Yan	Yan	Yan	Kui	Yan	Chuan	Kuai	Chuan	Zhou	Huang	Jing	Xun	Chao	Chao	Lie	Gong	Zuo	Qiao	Ju	Gong	Ju	Wu	Pu	Pu	Cha	Qiu	Qiu	Ji	Yi	Si	Ba	Zhi	Zhao	Xiang	Yi	Jin	Xun	Juan	Ba	Xun	Jin	Fu";

    case 94:
      return "Za	Bi	Shi	Bu	Ding	Shuai	Fan	Nie	Shi	Fen	Pa	Zhi	Xi	Hu	Dan	Wei	Zhang	Tang	Dai	Mo	Pei	Pa	Tie	Bo	Lian	Zhi	Zhou	Bo	Zhi	Di	Mo	Yi	Yi	Ping	Qia	Juan	Ru	Shuai	Dai	Zheng	Shui	Qiao	Zhen	Shi	Qun	Xi	Bang	Dai	Gui	Chou	Ping	Zhang	San	Wan	Dai	Wei	Chang	Sha	Qi	Ze	Guo	Mao	Du	Hou	Zheng	Xu	Mi	Wei	Wo	Fu	Yi	Bang	Ping	Die	Gong	Pan	Huang	Tao	Mi	Jia	Teng	Hui	Zhong	Shan	Man	Mu	Biao	Guo	Ze	Mu	Bang	Zhang	Jing	Chan	Fu	Zhi	Hu	Fan	Chuang	Bi	Bi	Zhang	Mi	Qiao	Chan	Fen	Meng	Bang	Chou	Mie	Chu	Jie	Xian	Lan	Gan	Ping	Nian	Jian	Bing	Bing	Xing	Gan	Yao	Huan	You	You	Ji	Guang	Pi	Ting	Ze	Guang	Zhuang	Mo	Qing	Bi	Qin	Dun	Chuang	Gui	Ya	Bai	Jie	Xu	Lu	Wu	Zhuang	Ku	Ying	Di	Pao	Dian	Ya	Miao	Geng	Ci	Fu	Tong	Pang	Fei	Xiang	Yi	Zhi	Tiao	Zhi	Xiu	Du	Zuo	Xiao	Tu	Gui	Ku	Mang	Ting	You	Bu	Bing	Cheng	Lai	Bi	Ji	An	Shu	Kang	Yong	Tuo	Song	Shu	Qing	Yu	Yu	Miao	Sou	Ce	Xiang	Fei	Jiu	E	Gui	Liu	Sha	Lian	Lang	Sou	Zhi	Bu	Qing	Jiu	Jiu	Jin	Ao	Kuo	Lou	Yin	Liao	Dai	Lu	Yi	Chu	Chan	Tu	Si	Xin	Miao	Chang	Wu	Fei	Guang	Ku	Kuai	Bi	Qiang	Xie	Lin	Lin	Liao	Lu	Ji	Ying	Xian	Ting	Yong	Li	Ting	Yin	Xun	Yan	Ting	Di	Pai	Jian	Hui	Nai	Hui	Gong	Nian";

    case 95:
      return "Kai	Bian	Yi	Qi	Nong	Fen	Ju	Yan	Yi	Zang	Bi	Yi	Yi	Er	San	Shi	Er	Shi	Shi	Gong	Diao	Yin	Hu	Fu	Hong	Wu	Tui	Chi	Jiang	Ba	Shen	Di	Zhang	Jue	Tao	Fu	Di	Mi	Xian	Hu	Chao	Nu	Jing	Zhen	Yi	Mi	Quan	Wan	Shao	Ruo	Xuan	Jing	Diao	Zhang	Jiang	Qiang	Peng	Dan	Qiang	Bi	Bi	She	Dan	Jian	Gou	Ge	Fa	Bi	Kou	Jian	Bie	Xiao	Dan	Guo	Jiang	Hong	Mi	Guo	Wan	Jue	Ji	Ji	Gui	Dang	Lu	Lu	Tuan	Hui	Zhi	Hui	Hui	Yi	Yi	Yi	Yi	Yue	Yue	Shan	Xing	Wen	Tong	Yan	Yan	Yu	Chi	Cai	Biao	Diao	Bin	Peng	Yong	Piao	Zhang	Ying	Chi	Chi	Zhuo	Tuo	Ji	Fang	Zhong	Yi	Wang	Che	Bi	Di	Ling	Fu	Wang	Zheng	Cu	Wang	Jing	Dai	Xi	Xun	Hen	Yang	Huai	Lu	Hou	Wang	Cheng	Zhi	Xu	Jing	Tu	Cong	Zhi	Lai	Cong	De	Pai	Xi	Dong	Ji	Chang	Zhi	Cong	Zhou	Lai	Yu	Xie	Jie	Jian	Shi	Jia	Bian	Huang	Fu	Xun	Wei	Pang	Yao	Wei	Xi	Zheng	Piao	Ti	De	Zheng	Zheng	Bie	De	Chong	Che	Jiao	Hui	Jiao	Hui	Mei	Long	Xiang	Bao	Qu	Xin	Xin	Bi	Yi	Le	Ren	Dao	Ding	Gai	Ji	Ren	Ren	Chan	Tan	Te	Te	Gan	Qi	Shi	Cun	Zhi	Wang	Mang	Xi	Fan	Ying	Tian	Min	Wen	Zhong	Chong	Wu	Ji	Wu	Xi	Jia	You	Wan	Cong	Song	Kuai	Yu	Bian	Zhi	Qi	Cui	Chen	Tai	Tun	Qian	Nian	Hun	Xiong	Niu	Kuang	Xian	Xin	Kang	Hu	Kai	Fen";

    case 96:
      return "Huai	Tai	Song	Wu	Ou	Chang	Chuang	Ju	Yi	Bao	Chao	Min	Pei	Zuo	Zen	Yang	Ju	Ban	Nu	Nao	Zheng	Pa	Bu	Tie	Hu	Hu	Ju	Da	Lian	Si	Chou	Di	Dai	Yi	Tu	You	Fu	Ji	Peng	Xing	Yuan	Ni	Guai	Fu	Xi	Bi	You	Qie	Xuan	Cong	Bing	Huang	Xu	Chu	Bi	Shu	Xi	Tan	Yong	Zong	Dui	Mo	Zhi	Yi	Shi	Nen	Xun	Shi	Xi	Lao	Heng	Kuang	Mou	Zhi	Xie	Lian	Tiao	Huang	Die	Hao	Kong	Gui	Heng	Xi	Jiao	Shu	Si	Hu	Qiu	Yang	Hui	Hui	Chi	Jia	Yi	Xiong	Guai	Lin	Hui	Zi	Xu	Chi	Shang	Nu	Hen	En	Ke	Dong	Tian	Gong	Quan	Xi	Qia	Yue	Peng	Ken	De	Hui	E	Xiao	Tong	Yan	Kai	Ce	Nao	Yun	Mang	Yong	Yong	Yuan	Pi	Kun	Qiao	Yue	Yu	Tu	Jie	Xi	Zhe	Lin	Ti	Han	Hao	Qie	Ti	Bu	Yi	Qian	Hui	Xi	Bei	Man	Yi	Heng	Song	Quan	Cheng	Kui	Wu	Wu	You	Li	Liang	Huan	Cong	Yi	Yue	Li	Nin	Nao	E	Que	Xuan	Qian	Wu	Min	Cong	Fei	Bei	De	Cui	Chang	Men	Li	Ji	Guan	Guan	Xing	Dao	Qi	Kong	Tian	Lun	Xi	Kan	Gun	Ni	Qing	Chou	Dun	Guo	Zhan	Jing	Wan	Yuan	Jin	Ji	Lan	Yu	Huo	He	Quan	Tan	Ti	Ti	Nie	Wang	Chuo	Hu	Hun	Xi	Chang	Xin	Wei	Hui	E	Suo	Zong	Jian	Yong	Dian	Ju	Can	Cheng	De	Bei	Qie	Can	Dan	Guan	Duo	Nao	Yun	Xiang	Zhui	Die	Huang	Chun	Qiong	Re	Xing	Ce	Bian	Min	Zong	Ti";

    case 97:
      return "Qiao	Chou	Bei	Xuan	Wei	Ge	Qian	Wei	Yu	Yu	Bi	Xuan	Huan	Min	Bi	Yi	Mian	Yong	Kai	Dang	Yin	E	Chen	Mao	Qia	Ke	Yu	Ai	Qie	Yan	Nuo	Gan	Yun	Zong	Sai	Leng	Fen	Ying	Kui	Kui	Que	Gong	Yun	Su	Su	Qi	Yao	Song	Huang	Ji	Gu	Ju	Chuang	Ni	Xie	Kai	Zheng	Yong	Cao	Xun	Shen	Bo	Kai	Yuan	Xi	Hun	Yong	Yang	Li	Sao	Tao	Yin	Ci	Xu	Qian	Tai	Huang	Yun	Shen	Ming	Gong	She	Cong	Piao	Mu	Mu	Guo	Chi	Can	Can	Can	Cui	Min	Te	Zhang	Tong	Ao	Shuang	Man	Guan	Que	Zao	Jiu	Hui	Kai	Lian	Ou	Song	Qin	Yin	Lu	Shang	Wei	Tuan	Man	Qian	She	Yong	Qing	Kang	Di	Zhi	Lou	Juan	Qi	Qi	Yu	Ping	Liao	Cong	You	Chong	Zhi	Tong	Cheng	Qi	Qu	Peng	Bei	Bie	Qiong	Jiao	Zeng	Chi	Lian	Ping	Kui	Hui	Qiao	Cheng	Yin	Yin	Xi	Xi	Dan	Tan	Duo	Dui	Dui	Su	Jue	Ce	Xiao	Fan	Fen	Lao	Lao	Chong	Han	Qi	Xian	Min	Jing	Liao	Wu	Can	Jue	Cu	Xian	Tan	Sheng	Pi	Yi	Chu	Xian	Nao	Dan	Tan	Jing	Song	Han	Jiao	Wei	Xuan	Dong	Qin	Qin	Ju	Cao	Ken	Xie	Ying	Ao	Mao	Yi	Lin	Se	Jun	Huai	Men	Lan	Ai	Lin	Yan	Kuo	Xia	Chi	Yu	Yin	Dai	Meng	Ai	Meng	Dui	Qi	Mo	Lan	Men	Chou	Zhi	Nuo	Nuo	Yan	Yang	Bo	Zhi	Kuang	Kuang	You	Fu	Liu	Mie	Cheng	Hui	Chan	Meng	Lan	Huai	Xuan	Rang	Chan	Ji	Ju	Huan	She	Yi";

    case 98:
      return "Lian	Nan	Mi	Tang	Jue	Gang	Gang	Zhuang	Ge	Yue	Wu	Jian	Xu	Shu	Rong	Xi	Cheng	Wo	Jie	Ge	Jian	Qiang	Huo	Qiang	Zhan	Dong	Qi	Jia	Die	Zei	Jia	Ji	Zhi	Kan	Ji	Kui	Gai	Deng	Zhan	Qiang	Ge	Jian	Jie	Yu	Jian	Yan	Lu	Hu	Zhan	Xi	Xi	Chuo	Dai	Qu	Hu	Hu	Hu	E	Shi	Ti	Mao	Hu	Li	Fang	Suo	Bian	Dian	Jiong	Shang	Yi	Yi	Shan	Hu	Fei	Yan	Shou	Shou	Cai	Zha	Qiu	Le	Pu	Ba	Da	Reng	Fan	Ru	Zai	Tuo	Zhang	Diao	Kang	Yu	Ku	Gan	Shen	Cha	Tuo	Gu	Kou	Wu	Den	Qian	Zhi	Ren	Kuo	Men	Sao	Yang	Niu	Ban	Che	Rao	Xi	Qian	Ban	Jia	Yu	Fu	Ao	Xi	Pi	Zhi	Zhi	E	Den	Zhao	Cheng	Ji	Yan	Kuang	Bian	Chao	Ju	Wen	Hu	Yue	Jue	Ba	Qin	Dan	Zheng	Yun	Wan	Ne	Yi	Shu	Zhua	Pou	Tou	Dou	Kang	Zhe	Pou	Fu	Pao	Ba	Ao	Ze	Tuan	Kou	Lun	Qiang	Yun	Hu	Bao	Bing	Zhi	Peng	Nan	Bu	Pi	Tai	Yao	Zhen	Zha	Yang	Bao	He	Ni	Ye	Di	Chi	Pi	Jia	Mo	Mei	Chen	Ya	Chou	Qu	Min	Chu	Jia	Fu	Zha	Zhu	Dan	Chai	Mu	Nian	La	Fu	Pao	Ban	Pai	Lin	Na	Guai	Qian	Ju	Ta	Ba	Tuo	Tuo	Ao	Ju	Zhuo	Pan	Zhao	Bai	Bai	Di	Ni	Ju	Kuo	Long	Jian	Qia	Yong	Lan	Ning	Bo	Ze	Qian	Hen	Kuo	Shi	Jie	Zheng	Nin	Gong	Gong	Quan	Shuan	Cun	Za	Kao	Yi	Xie	Ce	Hui	Pin	Zhuai	Shi	Na";

    case 99:
      return "Bai	Chi	Gua	Zhi	Kuo	Duo	Duo	Zhi	Qie	An	Nong	Zhen	Ge	Jiao	Kua	Dong	Na	Tiao	Lie	Zha	Lu	Die	Wa	Jue	Lie	Ju	Zhi	Luan	Ya	Wo	Ta	Xie	Nao	Dang	Jiao	Zheng	Ji	Hui	Xian	Yu	Ai	Tuo	Nuo	Cuo	Bo	Geng	Ti	Zhen	Cheng	Sa	Sa	Keng	Mei	Nong	Ju	Peng	Jian	Yi	Ting	Shan	Rua	Wan	Xie	Cha	Feng	Jiao	Wu	Jun	Jiu	Tong	Kun	Huo	Tu	Zhuo	Pou	Lu	Ba	Han	Shao	Nie	Juan	Ze	Shu	Ye	Jue	Bu	Wan	Bu	Zun	Ye	Zhai	Lu	Sou	Tuo	Lao	Sun	Bang	Jian	Huan	Dao	Wei	Wan	Qin	Peng	She	Lie	Min	Men	Fu	Bai	Ju	Dao	Wo	Ai	Juan	Yue	Zong	Chen	Chui	Jie	Tu	Ben	Na	Nian	Ruo	Zuo	Wo	Qi	Xian	Cheng	Dian	Sao	Lun	Qing	Gang	Duo	Shou	Diao	Pou	Di	Zhang	Hun	Ji	Tao	Qia	Qi	Pai	Shu	Qian	Ling	Ye	Ya	Jue	Zheng	Liang	Gua	Yi	Huo	Shan	Zheng	Lue	Cai	Tan	Che	Bing	Jie	Ti	Kong	Tui	Yan	Cuo	Zhou	Ju	Tian	Qian	Ken	Bai	Pa	Jie	Lu	Guai	Ming	Jie	Zhi	Dan	Meng	Can	Sao	Guan	Peng	Yuan	Nuo	Jian	Zheng	Jiu	Jian	Yu	Yan	Kui	Nan	Hong	Rou	Pi	Wei	Sai	Zou	Xuan	Miao	Ti	Nie	Cha	Shi	Zong	Zhen	Yi	Xun	Yong	Bian	Yang	Huan	Yan	Zan	An	Xu	Ya	Wo	Ke	Chuai	Ji	Ti	La	La	Chen	Kai	Jiu	Jiu	Tu	Jie	Hui	Gen	Chong	Xiao	Die	Xie	Yuan	Qian	Ye	Cha	Zha	Bei	Yao	Wei	Beng	Lan	Wen	Qin";

    case 100:
      return "Chan	Ge	Lou	Zong	Gen	Jiao	Gou	Qin	Rong	Que	Chou	Chuai	Zhan	Sun	Sun	Bo	Chu	Rong	Bang	Cuo	Sao	Ke	Yao	Dao	Zhi	Nu	La	Jian	Sou	Qiu	Gao	Xian	Shuo	Sang	Jin	Mie	E	Chui	Nuo	Shan	Ta	Zha	Tang	Pan	Ban	Da	Li	Tao	Hu	Zhi	Wa	Hua	Qian	Wen	Qiang	Tian	Zhen	E	Xie	Nuo	Quan	Cha	Zha	Ge	Wu	En	She	Kang	She	Shu	Bai	Yao	Bin	Sou	Tan	Sa	Chan	Suo	Jiu	Chong	Chuang	Guai	Bing	Feng	Shuai	Di	Qi	Sou	Zhai	Lian	Cheng	Chi	Guan	Lu	Luo	Lou	Zong	Gai	Hu	Zha	Chuang	Tang	Hua	Cui	Nai	Mo	Jiang	Gui	Ying	Zhi	Ao	Zhi	Nie	Man	Chan	Kou	Chu	She	Tuan	Jiao	Mo	Mo	Zhe	Can	Keng	Biao	Jiang	Yao	Gou	Qian	Liao	Ji	Ying	Jue	Pie	Pie	Lao	Dun	Xian	Ruan	Gui	Zan	Yi	Xian	Cheng	Cheng	Sa	Nao	Hong	Si	Han	Guang	Da	Zun	Nian	Lin	Zheng	Hui	Zhuang	Jiao	Ji	Cao	Dan	Dan	Che	Bo	Che	Jue	Fu	Liao	Ben	Fu	Qiao	Bo	Cuo	Zhuo	Zhuan	Wei	Pu	Qin	Dun	Nian	Hua	Xie	Lu	Jiao	Cuan	Ta	Han	Qiao	Wo	Jian	Gan	Yong	Lei	Nang	Lu	Shan	Zhuo	Ze	Pu	Chuo	Ji	Dang	Se	Cao	Qing	Qing	Huan	Jie	Qin	Kuai	Dan	Xie	Ka	Pi	Bai	Ao	Ju	Ye	E	Meng	Sou	Mi	Ji	Tai	Zhuo	Dao	Xing	Lan	Ca	Ju	Ye	Ru	Ye	Ye	Ni	Wo	Jie	Bin	Ning	Ge	Zhi	Zhi	Kuo	Mo	Jian	Xie	Lie	Tan	Bai	Sou	Lu	Lue	Rao	Ti";

    case 101:
      return "Pan	Yang	Lei	Ca	Shu	Zan	Nian	Xian	Jun	Huo	Li	La	Huan	Ying	Lu	Long	Qian	Qian	Zan	Qian	Lan	Xian	Ying	Mei	Rang	Chan	Weng	Cuan	Xie	She	Luo	Jun	Mi	Chi	Zan	Luan	Tan	Zuan	Li	Dian	Wa	Dang	Jiao	Jue	Lan	Li	Nang	Zhi	Gui	Gui	Qi	Xun	Pu	Pu	Shou	Kao	You	Gai	Yi	Gong	Gan	Ban	Fang	Zheng	Po	Dian	Kou	Min	Wu	Gu	He	Ce	Xiao	Mi	Chu	Ge	Di	Xu	Jiao	Min	Chen	Jiu	Shen	Duo	Yu	Chi	Ao	Bai	Xu	Jiao	Duo	Lian	Nie	Bi	Chang	Dian	Duo	Yi	Gan	San	Ke	Yan	Dun	Ji	Tou	Xiao	Duo	Jiao	Jing	Yang	Xia	Min	Shu	Ai	Qiao	Ai	Zheng	Di	Zhen	Fu	Shu	Liao	Qu	Xiong	Yi	Jiao	Shan	Jiao	Zhuo	Yi	Lian	Bi	Li	Xiao	Xiao	Wen	Xue	Qi	Qi	Zhai	Bin	Jue	Zhai	Lang	Fei	Ban	Ban	Lan	Yu	Lan	Wei	Dou	Sheng	Liao	Jia	Hu	Xie	Jia	Yu	Zhen	Jiao	Wo	Tiao	Dou	Jin	Chi	Yin	Fu	Qiang	Zhan	Qu	Zhuo	Zhan	Duan	Cuo	Si	Xin	Zhuo	Zhuo	Qin	Lin	Zhuo	Chu	Duan	Zhu	Fang	Chan	Hang	Yu	Shi	Pei	You	Mei	Pang	Qi	Zhan	Mao	Lu	Pei	Pi	Liu	Fu	Fang	Xuan	Jing	Jing	Ni	Zu	Zhao	Yi	Liu	Shao	Jian	Yu	Yi	Qi	Zhi	Fan	Piao	Fan	Zhan	Kuai	Sui	Yu	Wu	Ji	Ji	Ji	Huo	Ri	Dan	Jiu	Zhi	Zao	Xie	Tiao	Xun	Xu	Ga	La	Gan	Han	Tai	Di	Xu	Chan	Shi	Kuang	Yang	Shi	Wang	Min	Min	Tun	Chun	Wu";

    case 102:
      return "Yun	Bei	Ang	Ze	Ban	Jie	Kun	Sheng	Hu	Fang	Hao	Gui	Chang	Xuan	Ming	Hun	Fen	Qin	Hu	Yi	Xi	Xin	Yan	Ze	Fang	Tan	Shen	Ju	Yang	Zan	Bing	Xing	Ying	Xuan	Po	Zhen	Ling	Chun	Hao	Mei	Zuo	Mo	Bian	Xu	Hun	Zhao	Zong	Shi	Shi	Yu	Fei	Die	Mao	Ni	Chang	Wen	Dong	Ai	Bing	Ang	Zhou	Long	Xian	Kuang	Tiao	Chao	Shi	Huang	Huang	Xuan	Kui	Xu	Jiao	Jin	Zhi	Jin	Shang	Tong	Hong	Yan	Gai	Xiang	Shai	Xiao	Ye	Yun	Hui	Han	Han	Jun	Wan	Xian	Kun	Zhou	Xi	Cheng	Sheng	Bu	Zhe	Zhe	Wu	Wan	Hui	Hao	Chen	Wan	Tian	Zhuo	Zui	Zhou	Pu	Jing	Xi	Shan	Ni	Xi	Qing	Qi	Jing	Gui	Zheng	Yi	Zhi	An	Wan	Lin	Liang	Chang	Wang	Xiao	Zan	Fei	Xuan	Geng	Yi	Xia	Yun	Hui	Xu	Min	Kui	Ye	Ying	Shu	Wei	Shu	Qing	Mao	Nan	Jian	Nuan	An	Yang	Chun	Yao	Suo	Pu	Ming	Jiao	Kai	Gao	Weng	Chang	Qi	Hao	Yan	Li	Ai	Ji	Ji	Men	Zan	Xie	Hao	Mu	Mo	Cong	Ni	Zhang	Hui	Bao	Han	Xuan	Chuan	Liao	Xian	Tan	Jing	Pie	Lin	Tun	Xi	Yi	Ji	Huang	Dai	Ye	Ye	Li	Tan	Tong	Xiao	Fei	Shen	Zhao	Hao	Yi	Xiang	Xing	Shen	Jiao	Bao	Jing	Yan	Ai	Ye	Ru	Shu	Meng	Xun	Yao	Pu	Li	Chen	Kuang	Die	Liao	Yan	Huo	Lu	Xi	Rong	Long	Nang	Luo	Luan	Shai	Tang	Yan	Zhu	Yue	Yue	Qu	Ye	Geng	Ye	Hu	He	Shu	Cao	Cao	Sheng	Man	Ceng	Ceng	Ti";

    case 103:
      return "Zui	Can	Xu	Hui	Yin	Qie	Fen	Pi	Yue	You	Ruan	Peng	Fen	Fu	Ling	Fei	Qu	Ti	Nu	Tiao	Shuo	Zhen	Lang	Lang	Zui	Ming	Huang	Wang	Tun	Chao	Ji	Qi	Ying	Zong	Wang	Tong	Lang	Lao	Meng	Long	Mu	Deng	Wei	Mo	Ben	Zha	Shu	Shu	Mu	Zhu	Ren	Ba	Pu	Duo	Duo	Dao	Li	Gui	Ji	Jiu	Bi	Xiu	Cheng	Ci	Sha	Ru	Za	Quan	Qian	Yu	Gan	Wu	Cha	Shan	Xun	Fan	Wu	Zi	Li	Xing	Cai	Cun	Ren	Biao	Tuo	Di	Zhang	Mang	Chi	Yi	Gai	Gong	Du	Li	Qi	Shu	Gang	Tiao	Jiang	Mian	Wan	Lai	Jiu	Mang	Yang	Ma	Miao	Si	Yuan	Hang	Fei	Bei	Jie	Dong	Gao	Yao	Xian	Chu	Chun	Pa	Shu	Hua	Xin	Chou	Zhu	Chou	Song	Ban	Song	Ji	Wo	Jin	Gou	Ji	Mao	Pi	Bi	Wang	Ang	Fang	Fen	Yi	Fu	Nan	Xi	Hu	Ya	Dou	Xin	Zhen	Yao	Lin	Rui	E	Mei	Zhao	Guo	Zhi	Cong	Yun	Zui	Sheng	Shu	Zao	Di	Li	Lu	Jian	Cheng	Song	Qiang	Feng	Zhan	Xiao	Xian	Ku	Ping	Tai	Xi	Zhi	Guai	Xiao	Jia	Jia	Gou	Bao	Mo	Yi	Ye	Ye	Shi	Nie	Bi	Duo	Yi	Ling	Bing	Ni	La	He	Ban	Fan	Zhong	Dai	Ci	Yang	Fu	Bai	Mou	Gan	Qi	Ran	Rou	Mao	Shao	Song	Zhe	Xia	You	Shen	Gui	Tuo	Zha	Nan	Ning	Yong	Di	Zhi	Zha	Cha	Dan	Gu	Bu	Jiu	Ao	Fu	Jian	Ba	Duo	Ke	Nai	Zhu	Bi	Liu	Chai	Shan	Si	Chu	Pei	Shi	Guai	Zha	Yao	Cheng	Jiu	Shi";

    case 104:
      return "Zhi	Liu	Mei	Li	Rong	Zha	Zao	Biao	Zhan	Zhi	Long	Dong	Lu	Sheng	Li	Lan	Yong	Shu	Xun	Shuan	Qi	Zhen	Qi	Li	Yi	Xiang	Zhen	Li	Se	Gua	Kan	Ben	Ren	Xiao	Bai	Ren	Bing	Zi	Chou	Yi	Ci	Xu	Zhu	Jian	Zui	Er	Er	You	Fa	Gong	Kao	Lao	Zhan	Lie	Yin	Yang	He	Gen	Yi	Shi	Ge	Zai	Luan	Fu	Jie	Heng	Gui	Tao	Guang	Wei	Kuang	Ru	An	An	Juan	Yi	Zhuo	Ku	Zhi	Qiong	Tong	Sang	Sang	Huan	Ju	Jiu	Xue	Duo	Zhui	Yu	Zan	Kasei	Ying	Jie	Liu	Zhan	Ya	Rao	Zhen	Dang	Qi	Qiao	Hua	Gui	Jiang	Zhuang	Xun	Suo	Sha	Zhen	Bei	Ting	Kuo	Jing	Po	Ben	Fu	Rui	Tong	Jue	Xi	Lang	Liu	Feng	Qi	Wen	Jun	Gan	Su	Liang	Qiu	Ting	You	Mei	Bang	Long	Peng	Zhuang	Di	Xuan	Tu	Zao	Ao	Gu	Bi	Di	Han	Zi	Zhi	Ren	Bei	Geng	Jian	Huan	Wan	Nuo	Jia	Tiao	Ji	Xiao	Lu	Hun	Shao	Cen	Fen	Song	Meng	Wu	Li	Li	Dou	Qin	Ying	Suo	Ju	Ti	Xie	Kun	Zhuo	Shu	Chan	Fan	Wei	Jing	Li	Bin	Xia	Fo	Tao	Zhi	Lai	Lian	Jian	Zhuo	Ling	Li	Qi	Bing	Lun	Cong	Qian	Mian	Qi	Qi	Cai	Gun	Chan	De	Fei	Pai	Bang	Bang	Hun	Zong	Cheng	Zao	Ji	Li	Peng	Yu	Yu	Gu	Jun	Dong	Tang	Gang	Wang	Di	Cuo	Fan	Cheng	Zhan	Qi	Yuan	Yan	Yu	Quan	Yi	Sen	Ren	Chui	Leng	Qi	Zhuo	Fu	Ke	Lai	Zou	Zou	Zhao	Guan	Fen	Fen	Shen	Qing	Ni";

    case 105:
      return "Wan	Guo	Lu	Hao	Jie	Yi	Chou	Ju	Ju	Cheng	Zuo	Liang	Qiang	Zhi	Chui	Ya	Ju	Bei	Jiao	Zhuo	Zi	Bin	Peng	Ding	Chu	Chang	Men	Hua	Jian	Gui	Xi	Du	Qian	Dao	Gui	Dian	Luo	Zhi	Quan	Ming	Fu	Geng	Peng	Shan	Yi	Tuo	Sen	Duo	Ye	Fu	Wei	Wei	Duan	Jia	Zong	Jian	Yi	Shen	Xi	Yan	Yan	Chuan	Jian	Chun	Yu	He	Zha	Wo	Pian	Bi	Yao	Huo	Xu	Ruo	Yang	La	Yan	Ben	Hui	Kui	Jie	Kui	Si	Feng	Xie	Tuo	Zhi	Jian	Mu	Mao	Chu	Hu	Hu	Lian	Leng	Ting	Nan	Yu	You	Mei	Song	Xuan	Xuan	Yang	Zhen	Pian	Ye	Ji	Jie	Ye	Chu	Dun	Yu	Zou	Wei	Mei	Ti	Ji	Jie	Kai	Qiu	Ying	Rou	Huang	Lou	Le	Quan	Xiang	Pin	Shi	Gai	Tan	Lan	Wen	Yu	Chen	Lu	Ju	Shen	Chu	Bi	Xie	Jia	Yi	Zhan	Fu	Nuo	Mi	Lang	Rong	Gu	Jian	Ju	Ta	Yao	Zhen	Bang	Sha	Yuan	Zi	Ming	Su	Jia	Yao	Jie	Huang	Gan	Fei	Zha	Qian	Ma	Sun	Yuan	Xie	Rong	Shi	Zhi	Cui	Wen	Ting	Liu	Rong	Tang	Que	Zhai	Si	Sheng	Ta	Ke	Xi	Gu	Qi	Gao	Gao	Sun	Pan	Tao	Ge	Chun	Dian	Nou	Ji	Shuo	Gou	Chui	Qiang	Cha	Qian	Huai	Mei	Xu	Gang	Gao	Zhuo	Tuo	Qiao	Yang	Dian	Jia	Kan	Zui	Dao	Long	Bin	Zhu	Sang	Xi	Ji	Lian	Hui	Yong	Qian	Guo	Gai	Gai	Tuan	Hua	Qi	Sen	Cui	Peng	You	Hu	Jiang	Hu	Huan	Gui	Nie	Yi	Gao	Kang	Gui	Gui	Cao	Man	Jin";

    case 106:
      return "Di	Zhuang	Le	Lang	Chen	Cong	Li	Xiu	Qing	Shuang	Fan	Tong	Guan	Ze	Su	Lei	Lu	Liang	Mi	Lou	Chao	Su	Ke	Chu	Tang	Biao	Lu	Jiu	Zhe	Zha	Shu	Zhang	Man	Mo	Niao	Yang	Tiao	Peng	Zhu	Sha	Xi	Quan	Heng	Jian	Cong	Ji	Yan	Qiang	Xue	Ying	Er	Xun	Zhi	Qiao	Zui	Cong	Pu	Shu	Hua	Kui	Zhen	Zun	Yue	Shan	Xi	Chun	Dian	Fa	Gan	Mo	Wu	Qiao	Rao	Lin	Liu	Qiao	Xian	Run	Fan	Zhan	Tuo	Lao	Yun	Shun	Dun	Cheng	Tang	Meng	Ju	Cheng	Su	Jue	Jue	Dian	Hui	Ji	Nuo	Xiang	Tuo	Ning	Rui	Zhu	Tong	Zeng	Fen	Qiong	Ran	Heng	Qian	Gu	Liu	Lao	Gao	Chu	Xi	Sheng	Zi	San	Ji	Dou	Jing	Lu	Jian	Chu	Yuan	Ta	Shu	Jiang	Tan	Lin	Nong	Yin	Xi	Hui	Shan	Zui	Xuan	Cheng	Gan	Ju	Zui	Yi	Qin	Pu	Yan	Lei	Feng	Hui	Dang	Ji	Sui	Bo	Ping	Cheng	Chu	Zhua	Gui	Ji	Jie	Jia	Qing	Zhai	Jian	Qiang	Dao	Yi	Biao	Song	She	Lin	Li	Cha	Meng	Yin	Tao	Tai	Mian	Qi	Tuan	Bin	Huo	Ji	Qian	Ni	Ning	Yi	Gao	Kan	Yin	Nou	Qing	Yan	Qi	Mi	Zhao	Gui	Chun	Ji	Kui	Po	Deng	Chu	Ge	Mian	You	Zhi	Huang	Qian	Lei	Lei	Sa	Lu	Li	Cuan	Lu	Mie	Hui	Ou	Lu	Zhi	Gao	Du	Yuan	Li	Fei	Zhuo	Sou	Lian	Jiang	Chu	Qing	Zhu	Lu	Yan	Li	Zhu	Chen	Jie	E	Su	Huai	Nie	Yu	Long	Lai	Jiao	Xian	Gui	Ju	Xiao	Ling	Ying	Jian	Yin	You	Ying";

    case 107:
      return "Xiang	Nong	Bo	Chan	Lan	Ju	Shuang	She	Wei	Cong	Quan	Qu	Cang	Jiu	Yu	Luo	Li	Cuan	Luan	Dang	Jue	Yan	Lan	Lan	Zhu	Lei	Li	Ba	Nang	Yu	Ling	Guang	Qian	Ci	Huan	Xin	Yu	Yi	Qian	Ou	Xu	Chao	Chu	Qi	Kai	Yi	Jue	Xi	Xu	He	Yu	Kui	Lang	Kuan	Shuo	Xi	Ai	Yi	Qi	Chua	Chi	Qin	Kuan	Kan	Kuan	Kan	Chuan	Sha	Gua	Yin	Xin	Xie	Yu	Qian	Xiao	Ye	Ge	Wu	Tan	Jin	Ou	Hu	Ti	Huan	Xu	Pen	Xi	Xiao	Chua	She	Shan	Han	Chu	Yi	E	Yu	Chuo	Huan	Zhi	Zheng	Ci	Bu	Wu	Qi	Bu	Bu	Wai	Ju	Qian	Chi	Se	Chi	Se	Zhong	Sui	Sui	Li	Ze	Yu	Li	Gui	Dai	E	Si	Jian	Zhe	Mo	Mo	Yao	Mo	Cu	Yang	Tian	Sheng	Dai	Shang	Xu	Xun	Shu	Can	Jue	Piao	Qia	Qiu	Su	Qing	Yun	Lian	Yi	Fou	Zhi	Ye	Can	Hun	Dan	Ji	Die	Zhen	Yun	Wen	Chou	Bin	Ti	Jin	Shang	Yin	Diao	Jiu	Hui	Cuan	Yi	Dan	Du	Jiang	Lian	Bin	Du	Jian	Jian	Shu	Ou	Duan	Zhu	Yin	Qing	Yi	Sha	Qiao	Ke	Xiao	Xun	Dian	Hui	Hui	Gu	Qiao	Ji	Yi	Ou	Hui	Duan	Yi	Xiao	Wu	Guan	Mu	Mei	Mei	Ai	Jie	Du	Yu	Bi	Bi	Bi	Pi	Pi	Bi	Chan	Mao	Hao	Cai	Pi	Lie	Jia	Zhan	Sai	Mu	Tuo	Xun	Er	Rong	Xian	Ju	Mu	Hao	Qiu	Dou	Sha	Tan	Pei	Ju	Duo	Cui	Bi	San	San	Mao	Sai	Shu	Shu	Tuo	He	Jian	Ta	San";

    case 108:
      return "Lu	Mu	Mao	Tong	Rong	Chang	Pu	Lu	Zhan	Sao	Zhan	Meng	Lu	Qu	Die	Shi	Di	Min	Jue	Mang	Qi	Pie	Nai	Qi	Dao	Xian	Chuan	Fen	Yang	Nei	Bin	Fu	Shen	Dong	Qing	Qi	Yin	Xi	Hai	Yang	An	Ya	Ke	Qing	Ya	Dong	Dan	Lu	Qing	Yang	Yun	Yun	Shui	Shui	Zheng	Bing	Yong	Dang	Shui	Le	Ni	Tun	Fan	Gui	Ting	Zhi	Qiu	Bin	Ze	Mian	Cuan	Hui	Diao	Han	Cha	Zhuo	Chuan	Wan	Fan	Da	Xi	Tuo	Mang	Qiu	Qi	Shan	Pin	Han	Qian	Wu	Wu	Xun	Si	Ru	Gong	Jiang	Chi	Wu	Tu	Jiu	Tang	Zhi	Zhi	Qian	Mi	Gu	Wang	Jing	Jing	Rui	Jun	Hong	Tai	Quan	Ji	Bian	Bian	Gan	Wen	Zhong	Fang	Xiong	Jue	Hu	Niu	Qi	Fen	Xu	Xu	Qin	Yi	Wo	Yun	Yuan	Hang	Yan	Chen	Chen	Dan	You	Dun	Hu	Huo	Qi	Mu	Nu	Mei	Da	Mian	Mi	Chong	Pang	Bi	Sha	Zhi	Pei	Pan	Zhui	Za	Gou	Liu	Mei	Ze	Feng	Ou	Li	Lun	Cang	Feng	Wei	Hu	Mo	Mei	Shu	Ju	Za	Tuo	Tuo	Tuo	He	Li	Mi	Yi	Fa	Fei	You	Tian	Zhi	Zhao	Gu	Zhan	Yan	Si	Kuang	Jiong	Ju	Xie	Qiu	Yi	Jia	Zhong	Quan	Po	Hui	Mi	Ben	Ze	Zhu	Le	You	Gu	Hong	Gan	Fa	Mao	Si	Hu	Ping	Ci	Fan	Zhi	Su	Ning	Cheng	Ling	Pao	Bo	Qi	Si	Ni	Ju	Sa	Zhu	Sheng	Lei	Xuan	Jue	Fu	Pan	Min	Tai	Yang	Ji	Yong	Guan	Beng	Xue	Long	Lu	Dan	Luo	Xie	Po	Ze	Jing	Yin";

    case 109:
      return "Pan	Jie	Ye	Hui	Hui	Zai	Cheng	Yin	Wei	Hou	Jian	Yang	Lie	Si	Ji	Er	Xing	Fu	Sa	Se	Zhi	Yin	Wu	Xi	Kao	Zhu	Jiang	Luo	Luo	An	Dong	Ti	Mou	Lei	Yi	Mi	Quan	Jin	Po	Wei	Xiao	Xie	Hong	Xu	Su	Kuang	Tao	Qie	Ju	Er	Zhou	Ru	Ping	Xun	Xiong	Zhi	Guang	Huan	Ming	Huo	Wa	Qia	Pai	Wu	Qu	Liu	Yi	Jia	Jing	Qian	Jiang	Jiao	Zhen	Shi	Zhuo	Ce	Fa	Hui	Ji	Liu	Chan	Hun	Hu	Nong	Xun	Jin	Lie	Qiu	Wei	Zhe	Jun	Han	Bang	Mang	Zhuo	You	Xi	Bo	Dou	Huan	Hong	Yi	Pu	Ying	Lan	Hao	Lang	Han	Li	Geng	Fu	Wu	Lian	Chun	Feng	Yi	Yu	Tong	Lao	Hai	Jin	Jia	Chong	Jiong	Mei	Sui	Cheng	Pei	Xian	Shen	Tu	Kun	Ping	Nie	Han	Jing	Xiao	She	Nian	Tu	Yong	Xiao	Xian	Ting	E	Su	Tun	Juan	Cen	Ti	Li	Shui	Si	Lei	Shui	Tao	Du	Lao	Lai	Lian	Wei	Wo	Yun	Huan	Di	Heng	Run	Jian	Zhang	Se	Fu	Guan	Xing	Shou	Shuan	Ya	Chuo	Zhang	Ye	Kong	Wo	Han	Tuo	Dong	He	Wo	Ju	She	Liang	Hun	Ta	Zhuo	Dian	Qie	De	Juan	Zi	Xi	Xiao	Qi	Gu	Guo	Yan	Lin	Tang	Zhou	Peng	Hao	Chang	Shu	Qi	Fang	Zhi	Lu	Nao	Ju	Tao	Cong	Lei	Zhe	Ping	Fei	Song	Tian	Pi	Dan	Yu	Ni	Yu	Lu	Gan	Mi	Jing	Ling	Lun	Yin	Cui	Qu	Huai	Yu	Nian	Shen	Biao	Chun	Hu	Yuan	Lai	Hun	Qing	Yan	Qian	Tian	Miao	Zhi	Yin	Bo";

    case 110:
      return "Ben	Yuan	Wen	Ruo	Fei	Qing	Yuan	Ke	Ji	She	Yuan	Se	Lu	Zi	Du	Yi	Jian	Mian	Pai	Xi	Yu	Yuan	Shen	Shen	Rou	Huan	Zhu	Jian	Nuan	Yu	Qiu	Ting	Qu	Du	Fan	Zha	Bo	Wo	Wo	Di	Wei	Wen	Ru	Xie	Ce	Wei	He	Gang	Yan	Hong	Xuan	Mi	Ke	Mao	Ying	Yan	You	Hong	Miao	Sheng	Mei	Zai	Hun	Nai	Gui	Chi	E	Pai	Mei	Lian	Qi	Qi	Mei	Tian	Cou	Wei	Can	Tuan	Mian	Hui	Mo	Xu	Ji	Pen	Jian	Jian	Hu	Feng	Xiang	Yi	Yin	Zhan	Shi	Jie	Cheng	Huang	Tan	Yu	Bi	Min	Shi	Tu	Sheng	Yong	Ju	Dong	Tuan	Jiao	Jiao	Qiu	Yan	Tang	Long	Huo	Yuan	Nan	Ban	You	Quan	Zhuang	Liang	Chan	Xian	Chun	Nie	Zi	Wan	Shi	Man	Ying	La	Kui	Feng	Jian	Xu	Lou	Wei	Gai	Bo	Ying	Po	Jin	Yan	Tang	Yuan	Suo	Yuan	Lian	Yao	Meng	Zhun	Cheng	Ke	Tai	Ta	Wa	Liu	Gou	Sao	Ming	Zha	Shi	Yi	Lun	Ma	Pu	Wei	Li	Zai	Wu	Xi	Wen	Qiang	Ze	Shi	Su	Ai	Qin	Sou	Yun	Xiu	Yin	Rong	Hun	Su	Suo	Ni	Ta	Shi	Ru	Ai	Pan	Chu	Chu	Pang	Weng	Cang	Mie	Ge	Dian	Hao	Huang	Xi	Zi	Di	Zhi	Xing	Fu	Jie	Hua	Ge	Zi	Tao	Teng	Sui	Bi	Jiao	Hui	Gun	Yin	Gao	Long	Zhi	Yan	She	Man	Ying	Chun	Lu	Lan	Luan	Yao	Bin	Tan	Yu	Xiu	Hu	Bi	Biao	Zhi	Jiang	Kou	Shen	Shang	Di	Mi	Ao	Lu	Hu	Hu	You	Chan	Fan	Yong	Gun	Man";

    case 111:
      return "Qing	Yu	Piao	Ji	Ya	Chao	Qi	Xi	Ji	Lu	Lou	Long	Jin	Guo	Cong	Lou	Zhi	Gai	Qiang	Li	Yan	Cao	Jiao	Cong	Chun	Tuan	Ou	Teng	Ye	Xi	Mi	Tang	Mo	Shang	Han	Lian	Lan	Wa	Chi	Gan	Feng	Xuan	Yi	Man	Zi	Mang	Kang	Luo	Peng	Shu	Zhang	Zhang	Zhuang	Xu	Huan	Huo	Jian	Yan	Shuang	Liao	Cui	Ti	Yang	Jiang	Cong	Ying	Hong	Xiu	Shu	Guan	Ying	Xiao	Zong	Kun	Xu	Lian	Zhi	Wei	Pi	Yu	Jiao	Po	Dang	Hui	Jie	Wu	Pa	Ji	Pan	Wei	Su	Qian	Qian	Xi	Lu	Xi	Xun	Dun	Huang	Min	Run	Su	Lao	Zhen	Cong	Yi	Zhe	Wan	Shan	Tan	Chao	Xun	Kui	Ye	Shao	Tu	Zhu	Sa	Hei	Bi	Shan	Chan	Chan	Shu	Tong	Pu	Lin	Wei	Se	Se	Cheng	Jiong	Cheng	Hua	Jiao	Lao	Che	Gan	Cun	Hong	Si	Shu	Peng	Han	Yun	Liu	Hong	Fu	Hao	He	Xian	Jian	Shan	Xi	Yu	Lu	Lan	Ning	Yu	Lin	Mian	Zao	Dang	Huan	Ze	Xie	Yu	Li	Shi	Xue	Ling	Wan	Zi	Yong	Hui	Can	Lian	Dian	Ye	Ao	Huan	Zhen	Chan	Man	Dan	Dan	Yi	Sui	Pi	Ju	Ta	Qin	Ji	Zhuo	Lian	Nong	Guo	Jin	Fen	Se	Ji	Sui	Hui	Chu	Ta	Song	Ding	Se	Zhu	Lai	Bin	Lian	Mi	Shi	Shu	Mi	Ning	Ying	Ying	Meng	Jin	Qi	Bi	Ji	Hao	Ru	Cui	Wo	Tao	Yin	Yin	Dui	Ci	Huo	Qing	Lan	Jun	Ai	Pu	Zhuo	Wei	Bin	Gu	Qian	Ying	Bin	Kuo	Fei	Cang	Me	Jian	Wei	Luo	Zan	Lu	Li";

    case 112:
      return "You	Yang	Lu	Si	Zhi	Ying	Du	Wang	Hui	Xie	Pan	Shen	Biao	Chan	Mo	Liu	Jian	Pu	Se	Cheng	Gu	Bin	Huo	Xian	Lu	Qin	Han	Ying	Rong	Li	Jing	Xiao	Ying	Sui	Wei	Xie	Huai	Xue	Zhu	Long	Lai	Dui	Fan	Hu	Lai	Shu	Ling	Ying	Mi	Ji	Lian	Jian	Ying	Fen	Lin	Yi	Jian	Yue	Chan	Dai	Rang	Jian	Lan	Fan	Shuang	Yuan	Zhuo	Feng	She	Lei	Lan	Cong	Qu	Yong	Qian	Fa	Guan	Jue	Yan	Hao	Ying	Sa	Zan	Luan	Yan	Li	Mi	Shan	Tan	Dang	Jiao	Chan	Ying	Hao	Ba	Zhu	Lan	Lan	Nang	Wan	Luan	Xun	Xian	Yan	Gan	Yan	Yu	Huo	Biao	Mie	Guang	Deng	Hui	Xiao	Xiao	Hui	Hong	Ling	Zao	Zhuan	Jiu	Zha	Xie	Chi	Zhuo	Zai	Zai	Can	Yang	Qi	Zhong	Fen	Niu	Jiong	Wen	Pu	Yi	Lu	Chui	Pi	Kai	Pan	Yan	Kai	Pang	Mu	Chao	Liao	Gui	Kang	Dun	Guang	Xin	Zhi	Guang	Guang	Wei	Qiang	Bian	Da	Xia	Zheng	Zhu	Ke	Zhao	Fu	Ba	Xie	Xie	Ling	Zhuo	Xuan	Ju	Tan	Pao	Jiong	Pao	Tai	Tai	Bing	Yang	Tong	Shan	Zhu	Zha	Dian	Wei	Shi	Lian	Chi	Huang	Zhou	Hu	Shuo	Lan	Ting	Jiao	Xu	Heng	Quan	Lie	Huan	Yang	Xiu	Xiu	Xian	Yin	Wu	Zhou	Yao	Shi	Wei	Tong	Mie	Zai	Kai	Hong	Lao	Xia	Zhu	Xuan	Zheng	Po	Yan	Hui	Guang	Che	Hui	Kao	Ju	Fan	Shao	Ye	Hui		Tang	Jin	Re	Lie	Xi	Fu	Jiong	Xie	Pu	Ting	Zhuo	Ting	Wan	Hai	Peng	Lang	Yan	Xu	Feng	Chi	Rong";

    case 113:
      return "Hu	Xi	Shu	He	Xun	Ku	Juan	Xiao	Xi	Yan	Han	Zhuang	Jun	Di	Xie	Ji	Wu	Yan	Lu	Han	Yan	Huan	Men	Ju	Dao	Bei	Fen	Lin	Kun	Hun	Tun	Xi	Cui	Wu	Hong	Chao	Fu	Wo	Jiao	Cong	Feng	Ping	Qiong	Ruo	Xi	Qiong	Xin	Chao	Yan	Yan	Yi	Jue	Yu	Gang	Ran	Pi	Xiong	Gang	Sheng	Chang	Shao	Xiong	Nian	Geng	Wei	Chen	He	Kui	Zhong	Duan	Xia	Hui	Feng	Lian	Xuan	Xing	Huang	Jiao	Jian	Bi	Ying	Zhu	Wei	Tuan	Shan	Xi	Nuan	Nuan	Chan	Yan	Jiong	Jiong	Yu	Mei	Sha	Wei	Zha	Jin	Qiong	Rou	Mei	Huan	Xu	Zhao	Wei	Fan	Qiu	Sui	Yang	Lie	Zhu	Jie	Zao	Gua	Bao	Hu	Yun	Nan	Shi	Liang	Bian	Gou	Tui	Tang	Chao	Shan	En	Bo	Huang	Xie	Xi	Wu	Xi	Yun	He	He	Xi	Yun	Xiong	Nai	Shan	Qiong	Yao	Xun	Mi	Lian	Ying	Wu	Rong	Gong	Yan	Qiang	Liu	Xi	Bi	Biao	Cong	Lu	Jian	Shu	Yi	Lou	Peng	Sui	Yi	Teng	Jue	Zong	Yun	Hu	Yi	Zhi	Ao	Wei	Liu	Han	Ou	Re	Jiong	Man	Kun	Shang	Cuan	Zeng	Jian	Xi	Xi	Xi	Yi	Xiao	Chi	Huang	Chan	Ye	Tan	Ran	Yan	Xun	Qiao	Jun	Deng	Dun	Shen	Jiao	Fen	Si	Liao	Yu	Lin	Tong	Shao	Fen	Fan	Yan	Xun	Lan	Mei	Tang	Yi	Jiong	Men	Jing	Jiao	Ying	Yu	Yi	Xue	Lan	Tai	Zao	Can	Sui	Xi	Que	Zong	Lian	Hui	Zhu	Xie	Ling	Wei	Yi	Xie	Zhao	Hui	Da	Nong	Lan	Ru	Xian	He	Xun	Jin	Chou	Dao	Yao";

    case 114:
      return "He	Lan	Biao	Rong	Li	Mo	Bao	Ruo	Lu	La	Ao	Xun	Kuang	Shuo	Liao	Li	Lu	Jue	Liao	Yan	Xi	Xie	Long	Ye	Can	Rang	Yue	Lan	Cong	Jue	Chong	Guan	Ju	Che	Mi	Tang	Lan	Zhu	Lan	Ling	Cuan	Yu	Zhao	Zhao	Pa	Zheng	Pao	Cheng	Yuan	Ai	Wei	Han	Jue	Jue	Fu	Ye	Ba	Die	Ye	Yao	Zu	Shuang	Er	Pan	Chuang	Ke	Zang	Die	Qiang	Yong	Qiang	Pian	Ban	Pan	Chao	Jian	Pai	Du	Chuang	Yu	Zha	Bian	Die	Bang	Bo	Chuang	You	You	Du	Ya	Cheng	Niu	Niu	Pin	Jiu	Mou	Ta	Mu	Lao	Ren	Mang	Fang	Mao	Mu	Gang	Wu	Yan	Ge	Bei	Si	Jian	Gu	You	Ge	Sheng	Mu	Di	Qian	Quan	Quan	Zi	Te	Xi	Mang	Keng	Qian	Wu	Gu	Xi	Li	Li	Pou	Ji	Gang	Zhi	Ben	Quan	Chun	Du	Ju	Jia	Jian	Feng	Pian	Ke	Ju	Kao	Chu	Xi	Bei	Luo	Jie	Ma	San	Wei	Mao	Dun	Tong	Qiao	Jiang	Xi	Li	Du	Lie	Pai	Piao	Bo	Xi	Chou	Wei	Kui	Chou	Quan	Quan	Ba	Fan	Qiu	Ji	Chai	Zhuo	An	Ge	Zhuang	Guang	Ma	You	Kang	Bo	Hou	Ya	Yin	Huan	Zhuang	Yun	Kuang	Niu	Di	Kuang	Zhong	Mu	Bei	Pi	Ju	Yi	Sheng	Pao	Xia	Tuo	Hu	Ling	Fei	Pi	Ni	Yao	You	Gou	Xue	Ju	Dan	Bo	Ku	Xian	Ning	Huan	Hen	Jiao	He	Zhao	Ji	Xun	Shan	Ta	Rong	Shou	Tong	Lao	Du	Xia	Shi	Kuai	Zheng	Yu	Sun	Yu	Bi	Mang	Xi	Juan	Li	Xia	Yin	Suan	Lang	Bei	Zhi	Yan";

    case 115:
      return "Sha	Li	Han	Xian	Jing	Pai	Fei	Xiao	Bai	Qi	Ni	Biao	Yin	Lai	Lie	Jian	Qiang	Kun	Yan	Guo	Zong	Mi	Chang	Yi	Zhi	Zheng	Ya	Meng	Cai	Cu	She	Lie	Dian	Luo	Hu	Zong	Gui	Wei	Feng	Wo	Yuan	Xing	Zhu	Mao	Wei	Chuan	Xian	Tuan	Ya	Nao	Xie	Jia	Hou	Bian	You	You	Mei	Cha	Yao	Sun	Bo	Ming	Hua	Yuan	Sou	Ma	Yuan	Dai	Yu	Shi	Hao	Qiang	Yi	Zhen	Cang	Hao	Man	Jing	Jiang	Mo	Zhang	Chan	Ao	Ao	Hao	Cui	Ben	Jue	Bi	Bi	Huang	Pu	Lin	Xu	Tong	Yao	Liao	Shuo	Xiao	Shou	Dun	Jiao	Ge	Juan	Du	Hui	Kuai	Xian	Xie	Ta	Xian	Xun	Ning	Bian	Huo	Nou	Meng	Lie	Nao	Guang	Shou	Lu	Ta	Xian	Mi	Rang	Huan	Nao	Luo	Xian	Qi	Jue	Xuan	Miao	Zi	Lu	Lu	Yu	Su	Wang	Qiu	Ga	Ding	Le	Ba	Ji	Hong	Di	Chuan	Gan	Jiu	Yu	Qi	Yu	Chang	Ma	Hong	Wu	Fu	Wen	Jie	Ya	Bin	Bian	Bang	Yue	Jue	Men	Jue	Wan	Jian	Mei	Dan	Pin	Wei	Huan	Xian	Qiang	Ling	Dai	Yi	An	Ping	Dian	Fu	Xuan	Xi	Bo	Ci	Gou	Jia	Shao	Po	Ci	Ke	Ran	Sheng	Shen	Yi	Zu	Jia	Min	Shan	Liu	Bi	Zhen	Zhen	Jue	Fa	Long	Jin	Jiao	Jian	Li	Guang	Xian	Zhou	Gong	Yan	Xiu	Yang	Xu	Luo	Su	Zhu	Qin	Yin	Xun	Bao	Er	Xiang	Yao	Xia	Hang	Gui	Chong	Xu	Ban	Pei	Lao	Dang	Ying	Hui	Wen	E	Cheng	Di	Wu	Wu	Cheng	Jun	Mei	Bei	Ting	Xian	Chu";

    case 116:
      return "Han	Xuan	Yan	Qiu	Xuan	Lang	Li	Xiu	Fu	Liu	Ya	Xi	Ling	Li	Jin	Lian	Suo	Suo	Feng	Wan	Dian	Pin	Zhan	Se	Min	Yu	Ju	Chen	Lai	Min	Sheng	Wei	Tian	Chu	Zuo	Beng	Cheng	Hu	Qi	E	Kun	Chang	Qi	Beng	Wan	Lu	Cong	Guan	Yan	Diao	Bei	Lin	Qin	Pi	Pa	Que	Zhuo	Qin	Fa	Jin	Qiong	Du	Jie	Hun	Yu	Mao	Mei	Chun	Xuan	Ti	Xing	Dai	Rou	Min	Jian	Wei	Ruan	Huan	Xie	Chuan	Jian	Zhuan	Chang	Lian	Quan	Xia	Duan	Yuan	Ya	Nao	Hu	Ying	Yu	Huang	Rui	Se	Liu	Shi	Rong	Suo	Yao	Wen	Wu	Zhen	Jin	Ying	Ma	Tao	Liu	Tang	Li	Lang	Gui	Zhen	Qiang	Cuo	Jue	Zhao	Yao	Ai	Bin	Shu	Chang	Kun	Zhuan	Cong	Jin	Yi	Cui	Cong	Qi	Li	Jing	Suo	Qiu	Xuan	Ao	Lian	Men	Zhang	Yin	Ye	Ying	Wei	Lu	Wu	Deng	Xiu	Zeng	Xun	Qu	Dang	Lin	Liao	Qiong	Su	Huang	Gui	Pu	Jing	Fan	Jin	Liu	Ji	Hui	Jing	Ai	Bi	Can	Qu	Zao	Dang	Jiao	Gun	Tan	Hui	Huan	Se	Sui	Tian	Chu	Yu	Jin	Lu	Bin	Shu	Wen	Zui	Lan	Xi	Zi	Xuan	Ruan	Wo	Gai	Lei	Du	Li	Zhi	Rou	Li	Zan	Qiong	Ti	Gui	Sui	La	Long	Lu	Li	Zan	Lan	Ying	Mi	Xiang	Qiong	Guan	Dao	Zan	Huan	Gua	Bo	Die	Bo	Hu	Zhi	Piao	Ban	Rang	Li	Wa	Ngaa	Xiang	Qian	Ban	Pen	Fang	Dan	Weng	Ou	Fan	Hou	Wa	Hu	Ling	Yi	Ping	Ci	Bai	Juan	Chang	Chi	Sarake	Dang	Meng	Bu";

    case 117:
      return "Zhui	Ping	Bian	Zhou	Zhen	Lei	Ci	Ying	Qi	Xian	Lou	Di	Ou	Meng	Zhuan	Beng	Lin	Zeng	Wu	Pi	Dan	Weng	Ying	Yan	Gan	Dai	Shen	Tian	Tian	Han	Chang	Sheng	Qing	Shen	Chan	Chan	Rui	Sheng	Su	Shen	Yong	Shuai	Lu	Fu	Yong	Beng	Feng	Ning	Tian	You	Jia	Shen	Zha	Dian	Fu	Nan	Dian	Ping	Ting	Hua	Ting	Zhen	Zai	Meng	Bi	Bi	Liu	Xun	Liu	Chang	Mu	Yun	Fan	Fu	Geng	Tian	Jie	Jie	Quan	Wei	Fu	Tian	Mu	Duo	Pan	Jiang	Wa	Da	Nan	Liu	Ben	Zhen	Chu	Mu	Mu	Ce	Tian	Gai	Bi	Da	Zhi	Lue	Qi	Lue	Pan	Yi	Fan	Hua	She	Yu	Mu	Jun	Yi	Liu	She	Die	Chou	Hua	Dang	Zhui	Ji	Wan	Jiang	Cheng	Chang	Tun	Lei	Ji	Cha	Liu	Die	Tuan	Lin	Jiang	Jiang	Chou	Pi	Die	Die	Pi	Jie	Dan	Shu	Shu	Zhi	Yi	Ne	Nai	Ding	Bi	Jie	Liao	Gang	Ge	Jiu	Zhou	Xia	Shan	Xu	Nue	Li	Yang	Chen	You	Ba	Jie	Jue	Qi	Xia	Cui	Bi	Yi	Li	Zong	Chuang	Feng	Zhu	Pao	Pi	Gan	Ke	Ci	Xue	Zhi	Dan	Zhen	Fa	Zhi	Teng	Ju	Ji	Fei	Ju	Shan	Jia	Xuan	Zha	Bing	Nie	Zheng	Yong	Jing	Quan	Teng	Tong	Yi	Jie	Wei	Hui	Tan	Yang	Chi	Zhi	Hen	Ya	Mei	Dou	Jing	Xiao	Tong	Tu	Mang	Pi	Xiao	Suan	Fu	Li	Zhi	Cuo	Duo	Wu	Sha	Lao	Shou	Huan	Xian	Yi	Beng	Zhang	Guan	Tan	Fei	Ma	Lin	Chi	Ji	Tian	An	Chi	Bi	Bi	Min	Gu	Dui	E	Wei";

    case 118:
      return "Yu	Cui	Ya	Zhu	Cu	Dan	Shen	Zhong	Chi	Yu	Hou	Feng	La	Yang	Chen	Tu	Yu	Guo	Wen	Huan	Ku	Jia	Yin	Yi	Lou	Sao	Jue	Chi	Xi	Guan	Yi	Wen	Ji	Chuang	Ban	Hui	Liu	Chai	Shou	Nue	Dian	Da	Bie	Tan	Zhang	Biao	Shen	Cu	Luo	Yi	Zong	Chou	Zhang	Zhai	Sou	Se	Que	Diao	Lou	Lou	Mo	Qin	Yin	Ying	Huang	Fu	Liao	Long	Qiao	Liu	Lao	Xian	Fei	Dan	Yin	He	Ai	Ban	Xian	Guan	Gui	Nong	Yu	Wei	Yi	Yong	Pi	Lei	Li	Shu	Dan	Lin	Dian	Lin	Lai	Bie	Ji	Chi	Yang	Xuan	Jie	Zheng	Me	Li	Huo	Lai	Ji	Dian	Xuan	Ying	Yin	Qu	Yong	Tan	Dian	Luo	Luan	Luan	Bo	Bo	Gui	Ba	Fa	Deng	Fa	Bai	Bai	Qie	Ji	Zao	Zao	Mao	De	Pa	Jie	Huang	Gui	Ci	Ling	Gao	Mo	Ji	Jiao	Peng	Gao	Ai	E	Hao	Han	Bi	Wan	Chou	Qian	Xi	Ai	Xiao	Hao	Huang	Hao	Ze	Cui	Hao	Xiao	Ye	Po	Hao	Jiao	Ai	Xing	Huang	Li	Piao	He	Jiao	Pi	Gan	Pao	Zhou	Jun	Qiu	Cun	Que	Zha	Gu	Jun	Jun	Zhou	Zha	Gu	Zhao	Du	Min	Qi	Ying	Yu	Bei	Zhao	Zhong	Pen	He	Ying	He	Yi	Bo	Wan	He	Ang	Zhan	Yan	Jian	He	Yu	Kui	Fan	Gai	Dao	Pan	Fu	Qiu	Sheng	Dao	Lu	Zhan	Meng	Li	Jin	Xu	Jian	Pan	Guan	An	Lu	Xu	Zhou	Dang	An	Gu	Li	Mu	Ding	Gan	Xu	Mang	Wang	Zhi	Qi	Yuan	Tian	Xiang	Dun	Xin	Xi	Pan	Feng	Dun	Min";

    case 119:
      return "Ming	Sheng	Shi	Yun	Mian	Pan	Fang	Miao	Dan	Mei	Mao	Kan	Xian	Kou	Shi	Yang	Zheng	Yao	Shen	Huo	Da	Zhen	Kuang	Ju	Shen	Yi	Sheng	Mei	Mo	Zhu	Zhen	Zhen	Mian	Shi	Yuan	Die	Ni	Zi	Zi	Chao	Zha	Xuan	Bing	Mi	Long	Sui	Tong	Mi	Die	Di	Ne	Ming	Xuan	Chi	Kuang	Juan	Mou	Zhen	Tiao	Yang	Yan	Mo	Zhong	Mo	Zhe	Zheng	Mei	Suo	Shao	Han	Huan	Di	Cheng	Cuo	Juan	E	Man	Xian	Xi	Kun	Lai	Jian	Shan	Tian	Gun	Wan	Leng	Shi	Qiong	Lie	Ya	Jing	Zheng	Li	Lai	Sui	Juan	Shui	Sui	Du	Bi	Pi	Mu	Hun	Ni	Lu	Yi	Jie	Cai	Zhou	Yu	Hun	Ma	Xia	Xing	Hui	Gun	Zai	Chun	Jian	Mei	Du	Hou	Xuan	Tian	Kui	Gao	Rui	Mao	Xu	Fa	Wo	Miao	Chou	Kui	Mi	Weng	Kou	Dang	Chen	Ke	Sou	Xia	Qiong	Mo	Ming	Man	Shui	Ze	Zhang	Yi	Diao	Kou	Mo	Shun	Cong	Lou	Chi	Man	Piao	Cheng	Gui	Meng	Wan	Run	Pie	Xi	Qiao	Pu	Zhu	Deng	Shen	Shun	Liao	Che	Xian	Kan	Ye	Xu	Tong	Mou	Lin	Gui	Jian	Ye	Ai	Hui	Zhan	Jian	Gu	Zhao	Qu	Mei	Chou	Sao	Ning	Xun	Yao	Huo	Meng	Mian	Pin	Mian	Lei	Kuang	Jue	Xuan	Mian	Huo	Lu	Meng	Long	Guan	Man	Xi	Chu	Tang	Kan	Zhu	Mao	Jin	Jin	Yu	Shuo	Ze	Jue	Shi	Yi	Shen	Zhi	Hou	Shen	Ying	Ju	Zhou	Jiao	Cuo	Duan	Ai	Jiao	Zeng	Yue	Ba	Shi	Ding	Qi	Ji	Zi	Gan	Wu	Zhe	Ku	Gang	Xi	Fan	Kuang";

    case 120:
      return "Dang	Ma	Sha	Dan	Jue	Li	Fu	Min	E	Huo	Kang	Zhi	Qi	Kan	Jie	Bin	E	Ya	Pi	Zhe	Yan	Sui	Zhuan	Che	Dun	Wa	Yan	Jin	Feng	Fa	Mo	Zha	Ju	Yu	Ke	Tuo	Tuo	Di	Zhai	Zhen	E	Fu	Mu	Zhu	La	Bian	Nu	Ping	Peng	Ling	Pao	Le	Po	Bo	Po	Shen	Za	Ai	Li	Long	Tong	Yong	Li	Kuang	Chu	Keng	Quan	Zhu	Kuang	Gui	E	Nao	Qia	Lu	Wei	Ai	Ge	Xian	Xing	Yan	Dong	Peng	Xi	Lao	Hong	Shuo	Xia	Qiao	Qing	Wei	Qiao	Yi	Keng	Xiao	Que	Chan	Lang	Hong	Yu	Xiao	Xia	Mang	Luo	Yong	Che	Che	Wo	Liu	Ying	Mang	Que	Yan	Sha	Kun	Yu	Chi	Hua	Lu	Chen	Jian	Nue	Song	Zhuo	Keng	Peng	Yan	Zhui	Kong	Cheng	Qi	Zong	Qing	Lin	Jun	Bo	Ding	Min	Diao	Jian	He	Lu	Ai	Sui	Que	Leng	Bei	Yin	Dui	Wu	Qi	Lun	Wan	Dian	Nao	Bei	Qi	Chen	Ruan	Yan	Die	Ding	Du	Tuo	Jie	Ying	Bian	Ke	Bi	Wei	Shuo	Zhen	Duan	Xia	Dang	Ti	Nao	Peng	Jian	Di	Tan	Cha	Tian	Qi	Dun	Feng	Xuan	Que	Que	Ma	Gong	Nian	Su	E	Ci	Liu	Si	Tang	Bang	Hua	Pi	Wei	Sang	Lei	Cuo	Tian	Xia	Xi	Lian	Pan	Wei	Yun	Dui	Zhe	Ke	La	Zhuan	Yao	Gun	Zhuan	Chan	Qi	Ao	Peng	Liu	Lu	Kan	Chuang	Chen	Yin	Lei	Biao	Qi	Mo	Qi	Cui	Zong	Qing	Chuo	Lun	Ji	Shan	Lao	Qu	Zeng	Deng	Jian	Xi	Lin	Ding	Tan	Huang	Pan	Za	Qiao	Di	Li";

    case 121:
      return "Jian	Jiao	Xi	Zhang	Qiao	Dun	Jian	Yu	Zhui	He	Ke	Ze	Lei	Jie	Chu	Ye	Que	Dang	Yi	Jiang	Pi	Pi	Yu	Pin	E	Ai	Ke	Jian	Yu	Ruan	Meng	Pao	Ci	Bo	Yang	Ma	Ca	Xian	Kuang	Lei	Lei	Zhi	Li	Li	Fan	Que	Pao	Ying	Li	Long	Long	Mo	Bo	Shuang	Guan	Lan	Ca	Yan	Shi	Shi	Li	Reng	She	Yue	Si	Qi	Ta	Ma	Xie	Yao	Xian	Qi	Qi	Zhi	Beng	Dui	Zhong	Ren	Yi	Shi	You	Zhi	Tiao	Fu	Fu	Mi	Zu	Zhi	Suan	Mei	Zuo	Qu	Hu	Zhu	Shen	Sui	Ci	Chai	Mi	Lu	Yu	Xiang	Wu	Tiao	Piao	Zhu	Gui	Xia	Zhi	Ji	Gao	Zhen	Gao	Shui	Jin	Shen	Gai	Kun	Di	Dao	Huo	Tao	Qi	Gu	Guan	Zui	Ling	Lu	Bing	Jin	Dao	Zhi	Lu	Chan	Bi	Zhe	Hui	You	Xi	Yin	Zi	Huo	Zhen	Fu	Yuan	Wu	Xian	Yang	Zhi	Yi	Mei	Si	Di	Bei	Zhuo	Zhen	Yong	Ji	Gao	Tang	Si	Ma	Ta	Fu	Xuan	Qi	Yu	Xi	Ji	Si	Chan	Dan	Gui	Sui	Li	Nong	Mi	Dao	Li	Rang	Yue	Ti	Zan	Lei	Rou	Yu	Yu	Li	Xie	Qin	He	Tu	Xiu	Si	Ren	Tu	Zi	Cha	Gan	Yi	Xian	Bing	Nian	Qiu	Qiu	Zhong	Fen	Hao	Yun	Ke	Miao	Zhi	Jing	Bi	Zhi	Yu	Mi	Ku	Ban	Pi	Ni	Li	You	Zu	Pi	Bo	Ling	Mo	Cheng	Nian	Qin	Yang	Zuo	Zhi	Zhi	Shu	Ju	Zi	Huo	Ji	Cheng	Tong	Zhi	Huo	He	Yin	Zi	Zhi	Jie	Ren	Du	Yi	Zhu	Hui	Nong	Fu";

    case 122:
      return "Xi	Gao	Lang	Fu	Xun	Shui	Lu	Kun	Gan	Jing	Ti	Cheng	Tu	Shao	Shui	Ya	Lun	Lu	Gu	Zuo	Ren	Zhun	Bang	Bai	Ji	Zhi	Zhi	Kun	Leng	Peng	Ke	Bing	Chou	Zui	Yu	Su	Lue	Xiang	Yi	Xi	Bian	Ji	Fu	Pi	Nuo	Jie	Zhong	Zong	Xu	Cheng	Dao	Wen	Xian	Zi	Yu	Ji	Xu	Zhen	Zhi	Dao	Jia	Ji	Gao	Gao	Gu	Rong	Sui	Rong	Ji	Kang	Mu	Can	Mei	Zhi	Ji	Lu	Su	Ji	Ying	Wen	Qiu	Se	He	Yi	Huang	Qie	Ji	Sui	Xiao	Pu	Jiao	Zhuo	Zhong	Zui	Lu	Sui	Nong	Se	Hui	Rang	Nuo	Yu	Pin	Ji	Tui	Wen	Cheng	Huo	Kuang	Lu	Biao	Se	Rang	Zhuo	Li	Cuan	Xue	Wa	Jiu	Qiong	Xi	Qiong	Kong	Yu	Shen	Jing	Yao	Chuan	Zhun	Tu	Lao	Qie	Zhai	Yao	Bian	Bao	Yao	Bing	Wa	Zhu	Jiao	Qiao	Diao	Wu	Gui	Yao	Zhi	Chuang	Yao	Tiao	Jiao	Chuang	Jiong	Xiao	Cheng	Kou	Cuan	Wo	Dan	Ku	Ke	Zhuo	Xu	Su	Guan	Kui	Dou	Zhuo	Xun	Wo	Wa	Ya	Yu	Ju	Qiong	Yao	Yao	Tiao	Chao	Yu	Tian	Diao	Ju	Liao	Xi	Wu	Kui	Chuang	Zhao	Kuan	Kuan	Long	Cheng	Cui	Liao	Zao	Cuan	Qiao	Qiong	Dou	Zao	Long	Qie	Li	Chu	Shi	Fu	Qian	Chu	Hong	Qi	Hao	Sheng	Fen	Shu	Miao	Qu	Zhan	Zhu	Ling	Long	Bing	Jing	Jing	Zhang	Bai	Si	Jun	Hong	Tong	Song	Jing	Diao	Yi	Shu	Jing	Qu	Jie	Ping	Duan	Li	Zhuan	Ceng	Deng	Cun	Wai	Jing	Kan	Jing	Zhu	Zhu	Le	Peng	Yu	Chi	Gan";

    case 123:
      return "Mang	Zhu	Wan	Du	Ji	Jiao	Ba	Suan	Ji	Qin	Zhao	Sun	Ya	Zhui	Yuan	Hu	Hang	Xiao	Cen	Bi	Bi	Jian	Yi	Dong	Shan	Sheng	Da	Di	Zhu	Na	Chi	Gu	Li	Qie	Min	Bao	Tiao	Si	Fu	Ce	Ben	Fa	Da	Zi	Di	Ling	Ze	Nu	Fu	Gou	Fan	Jia	Gan	Fan	Shi	Mao	Po	Ti	Jian	Qiong	Long	Min	Bian	Luo	Gui	Qu	Chi	Yin	Yao	Xian	Bi	Qiong	Kuo	Deng	Xiao	Jin	Quan	Sun	Ru	Fa	Kuang	Zhu	Tong	Ji	Da	Hang	Ce	Zhong	Kou	Lai	Bi	Shai	Dang	Zheng	Ce	Fu	Yun	Tu	Pa	Li	Lang	Ju	Guan	Jian	Han	Tong	Xia	Zhi	Cheng	Suan	Shi	Zhu	Zuo	Xiao	Shao	Ting	Ce	Yan	Gao	Kuai	Gan	Chou	Kuang	Gang	Yun	O	Qian	Xiao	Jian	Pou	Lai	Zou	Bi	Bi	Bi	Ge	Tai	Guai	Yu	Jian	Dao	Gu	Chi	Zheng	Qing	Sha	Zhou	Lu	Bo	Ji	Lin	Suan	Jun	Fu	Zha	Gu	Kong	Qian	Qian	Jun	Chui	Guan	Yuan	Ce	Zu	Bo	Ze	Qie	Tuo	Luo	Dan	Xiao	Ruo	Jian	Xuan	Bian	Sun	Xiang	Xian	Ping	Zhen	Xing	Hu	Yi	Zhu	Yue	Chun	Lu	Wu	Dong	Shuo	Ji	Jie	Huang	Xing	Mei	Fan	Chuan	Zhuan	Pian	Feng	Zhu	Huang	Qie	Hou	Qiu	Miao	Qian	Gu	Kui	Shi	Lou	Yun	He	Tang	Yue	Chou	Gao	Fei	Ruo	Zheng	Gou	Nie	Qian	Xiao	Cuan	Long	Peng	Du	Li	Bi	Zhuo	Chu	Shai	Chi	Zhu	Qiang	Long	Lan	Jian	Bu	Li	Hui	Bi	Di	Cong	Yan	Peng	Can	Zhuan	Pi	Piao	Dou	Yu	Mie	Tuan";

    case 124:
      return "Ze	Shai	Gui	Yi	Hu	Chan	Kou	Cu	Ping	Zao	Ji	Gui	Su	Lou	Ce	Lu	Nian	Suo	Cuan	Diao	Suo	Le	Duan	Liang	Xiao	Bo	Mi	Shai	Dang	Liao	Dan	Dian	Fu	Jian	Min	Kui	Dai	Jiao	Deng	Huang	Sun	Lao	Zan	Xiao	Lu	Shi	Zan	Qi	Pai	Qi	Pai	Gan	Ju	Lu	Lu	Yan	Bo	Dang	Sai	Zhua	Gou	Qian	Lian	Bu	Zhou	Lai	Shi	Lan	Kui	Yu	Yue	Hao	Zhen	Tai	Ti	Nie	Chou	Ji	Yi	Qi	Teng	Zhuan	Zhou	Fan	Sou	Zhou	Qian	Zhuo	Teng	Lu	Lu	Jian	Tuo	Ying	Yu	Lai	Long	Qie	Lian	Lan	Qian	Yue	Zhong	Qu	Lian	Bian	Duan	Zuan	Li	Si	Luo	Ying	Yue	Zhuo	Yu	Mi	Di	Fan	Shen	Zhe	Shen	Nu	He	Lei	Xian	Zi	Ni	Cun	Zhang	Qian	Zhai	Bi	Ban	Wu	Sha	Kang	Rou	Fen	Bi	Cui	Yin	Zhe	Mi	Tai	Hu	Ba	Li	Gan	Ju	Po	Mo	Cu	Zhan	Zhou	Chi	Su	Tiao	Li	Xi	Su	Hong	Tong	Zi	Ce	Yue	Zhou	Lin	Zhuang	Bai	Lao	Fen	Er	Qu	He	Liang	Xian	Fu	Liang	Can	Jing	Li	Yue	Lu	Ju	Qi	Cui	Bai	Zhang	Lin	Zong	Jing	Guo	Hua	San	San	Tang	Bian	Rou	Mian	Hou	Xu	Zong	Hu	Jian	Zan	Ci	Li	Xie	Fu	Nuo	Bei	Gu	Xiu	Gao	Tang	Qiu	Jia	Cao	Zhuang	Tang	Mi	San	Fen	Zao	Kang	Jiang	Mo	San	San	Nuo	Xi	Liang	Jiang	Kuai	Bo	Huan	Shu	Zong	Xian	Nuo	Tuan	Nie	Li	Zuo	Di	Nie	Tiao	Lan	Mi	Si	Jiu	Xi	Gong	Zheng	Jiu	You";

    case 125:
      return "Ji	Cha	Zhou	Xun	Yue	Hong	Yu	He	Wan	Ren	Wen	Wen	Qiu	Na	Zi	Tou	Niu	Fou	Ji	Shu	Chun	Pi	Zhen	Sha	Hong	Zhi	Ji	Fen	Yun	Ren	Dan	Jin	Su	Fang	Suo	Cui	Jiu	Za	Ba	Jin	Fu	Zhi	Qi	Zi	Chou	Hong	Za	Lei	Xi	Fu	Xie	Shen	Bo	Zhu	Qu	Ling	Zhu	Shao	Gan	Yang	Fu	Tuo	Zhen	Dai	Chu	Shi	Zhong	Xian	Zu	Jiong	Ban	Qu	Mo	Shu	Zui	Kuang	Jing	Ren	Hang	Xie	Jie	Zhu	Chou	Gua	Bai	Jue	Kuang	Hu	Ci	Huan	Geng	Tao	Jie	Ku	Jiao	Quan	Gai	Luo	Xuan	Beng	Xian	Fu	Gei	Dong	Rong	Tiao	Yin	Lei	Xie	Juan	Xu	Gai	Die	Tong	Si	Jiang	Xiang	Hui	Jue	Zhi	Jian	Juan	Chi	Mian	Zhen	Lu	Cheng	Qiu	Shu	Bang	Tong	Xiao	Huan	Qin	Geng	Xiu	Ti	Tou	Xie	Hong	Xi	Fu	Ting	Sui	Dui	Kun	Fu	Jing	Hu	Zhi	Yan	Jiong	Feng	Ji	Xu	Ren	Zong	Chen	Duo	Li	Lu	Liang	Chou	Quan	Shao	Qi	Qi	Zhun	Qi	Wan	Qian	Xian	Shou	Wei	Qi	Tao	Wan	Gang	Wang	Beng	Zhui	Cai	Guo	Cui	Lun	Liu	Qi	Zhan	Bi	Chuo	Ling	Mian	Qi	Qie	Tian	Zong	Gun	Zou	Xi	Zi	Xing	Liang	Jin	Fei	Rui	Min	Yu	Zong	Fan	Lu	Xu	Ying	Shang	Qi	Xu	Xiang	Jian	Ke	Xian	Ruan	Mian	Ji	Duan	Chong	Di	Min	Miao	Yuan	Xie	Bao	Si	Qiu	Bian	Huan	Geng	Cong	Mian	Wei	Fu	Wei	Tou	Gou	Miao	Xie	Lian	Zong	Bian	Yun	Yin	Ti	Gua	Zhi	Yun	Cheng	Chan	Dai";

    case 126:
      return "Xia	Yuan	Zong	Xu	Sheng	Wei	Geng	Xuan	Ying	Jin	Yi	Zhui	Ni	Bang	Gu	Pan	Zhou	Jian	Ci	Quan	Shuang	Yun	Xia	Cui	Xi	Rong	Tao	Fu	Yun	Chen	Gao	Ru	Hu	Zai	Teng	Xian	Su	Zhen	Zong	Tao	Huang	Cai	Bi	Feng	Cu	Li	Suo	Yan	Xi	Zong	Lei	Juan	Qian	Man	Zhi	Lu	Mu	Piao	Lian	Mi	Xuan	Zong	Ji	Shan	Sui	Fan	Lu	Beng	Yi	Sao	Mou	Yao	Qiang	Hun	Xian	Ji	Sha	Xiu	Ran	Xuan	Sui	Qiao	Zeng	Zuo	Zhi	Shan	San	Lin	Yu	Fan	Liao	Chuo	Zun	Jian	Rao	Chan	Rui	Xiu	Hui	Hua	Zuan	Xi	Qiang	Yun	Da	Sheng	Hui	Xi	Se	Jian	Jiang	Huan	Zao	Cong	Xie	Jiao	Bi	Dan	Yi	Nong	Sui	Yi	Shai	Xu	Ji	Bin	Qian	Lan	Pu	Xun	Zuan	Qi	Peng	Yao	Mo	Lei	Xie	Zuan	Kuang	You	Xu	Lei	Xian	Chan	Jiao	Lu	Chan	Ying	Cai	Rang	Xian	Zui	Zuan	Luo	Li	Dao	Lan	Lei	Lian	Si	Jiu	Yu	Hong	Zhou	Xian	Ge	Yue	Ji	Wan	Kuang	Ji	Ren	Wei	Yun	Hong	Chun	Pi	Sha	Gang	Na	Ren	Zong	Lun	Fen	Zhi	Wen	Fang	Zhu	Zhen	Niu	Shu	Xian	Gan	Xie	Fu	Lian	Zu	Shen	Xi	Zhi	Zhong	Zhou	Ban	Fu	Chu	Shao	Yi	Jing	Dai	Bang	Rong	Jie	Ku	Rao	Die	Hang	Hui	Gei	Xuan	Jiang	Luo	Jue	Jiao	Tong	Geng	Xiao	Juan	Xiu	Xi	Sui	Tao	Ji	Ti	Ji	Xu	Ling	Ying	Xu	Qi	Fei	Chuo	Shang	Gun	Sheng	Wei	Mian	Shou	Beng	Chou	Tao	Liu	Quan	Zong	Zhan	Wan	Lu";

    case 127:
      return "Zhui	Zi	Ke	Xiang	Jian	Mian	Lan	Ti	Miao	Ji	Yun	Hui	Si	Duo	Duan	Bian	Xian	Gou	Zhui	Huan	Di	Lu	Bian	Min	Yuan	Jin	Fu	Ru	Zhen	Feng	Cui	Gao	Chan	Li	Yi	Jian	Bin	Piao	Man	Lei	Ying	Suo	Mou	Sao	Xie	Liao	Shan	Zeng	Jiang	Qian	Qiao	Huan	Jiao	Zuan	Fou	Xie	Gang	Fou	Que	Fou	Qi	Bo	Ping	Xiang	Zhao	Gang	Ying	Ying	Qing	Xia	Guan	Zun	Tan	Cheng	Qi	Weng	Ying	Lei	Tan	Lu	Guan	Wang	Wang	Gang	Wang	Han	Luo	Luo	Fu	Shen	Fa	Gu	Zhu	Ju	Mao	Gu	Min	Gang	Ba	Gua	Ti	Juan	Fu	Shen	Yan	Zhao	Zui	Gua	Zhuo	Yu	Zhi	An	Fa	Lan	Shu	Si	Pi	Ma	Liu	Ba	Fa	Li	Chao	Wei	Bi	Ji	Zeng	Chong	Liu	Ji	Juan	Mi	Zhao	Luo	Pi	Ji	Ji	Luan	Yang	Mi	Qiang	Da	Mei	Yang	You	You	Fen	Ba	Gao	Yang	Gu	Qiang	Zang	Gao	Ling	Yi	Zhu	Di	Xiu	Qiang	Yi	Xian	Rong	Qun	Qun	Qiang	Huan	Suo	Xian	Yi	Yang	Qiang	Qian	Yu	Geng	Jie	Tang	Yuan	Xi	Fan	Shan	Fen	Shan	Lian	Lei	Geng	Nou	Qiang	Chan	Yu	Gong	Yi	Chong	Weng	Fen	Hong	Chi	Chi	Cui	Fu	Xia	Ben	Yi	La	Yi	Pi	Ling	Liu	Zhi	Qu	Xi	Xie	Xiang	Xi	Xi	Ke	Qiao	Hui	Hui	Xiao	Sha	Hong	Jiang	Di	Cui	Fei	Dao	Sha	Chi	Zhu	Jian	Xuan	Chi	Pian	Zong	Wan	Hui	Hou	He	He	Han	Ao	Piao	Yi	Lian	Hou	Ao	Lin	Pen	Qiao	Ao	Fan	Yi	Hui	Xuan	Dao";

    case 128:
      return "Yao	Lao	Lao	Kao	Mao	Zhe	Qi	Gou	Gou	Gou	Die	Die	Er	Shua	Ruan	Nai	Nai	Duan	Lei	Ting	Zi	Geng	Chao	Hao	Yun	Ba	Pi	Yi	Si	Qu	Jia	Ju	Huo	Chu	Lao	Lun	Ji	Tang	Ou	Lou	Nou	Jiang	Pang	Zha	Lou	Ji	Lao	Huo	You	Mo	Huai	Er	Yi	Ding	Ye	Da	Song	Qin	Yun	Chi	Dan	Dan	Hong	Geng	Zhi	Pan	Nie	Dan	Zhen	Che	Ling	Zheng	You	Wa	Liao	Long	Zhi	Ning	Tiao	Er	Ya	Tie	Gua	Xu	Lian	Hao	Sheng	Lie	Pin	Jing	Ju	Bi	Di	Guo	Wen	Xu	Ping	Cong	Ding	Ni	Ting	Ju	Cong	Kui	Lian	Kui	Cong	Lian	Weng	Kui	Lian	Lian	Cong	Ao	Sheng	Song	Ting	Kui	Nie	Zhi	Dan	Ning	Qie	Ni	Ting	Ting	Long	Yu	Yu	Zhao	Si	Su	Yi	Su	Si	Zhao	Zhao	Rou	Yi	Le	Ji	Qiu	Ken	Cao	Ge	Bo	Huan	Huang	Chi	Ren	Xiao	Ru	Zhou	Yuan	Du	Gang	Rong	Gan	Cha	Wo	Chang	Gu	Zhi	Han	Fu	Fei	Fen	Pei	Pang	Jian	Fang	Zhun	You	Na	Ang	Ken	Ran	Gong	Yu	Wen	Yao	Qi	Pi	Qian	Xi	Xi	Fei	Ken	Jing	Tai	Shen	Zhong	Zhang	Xie	Shen	Wei	Zhou	Die	Dan	Fei	Ba	Bo	Qu	Tian	Bei	Gua	Tai	Zi	Fei	Zhi	Ni	Ping	Zi	Fu	Pang	Zhen	Xian	Zuo	Pei	Jia	Sheng	Zhi	Bao	Mu	Qu	Hu	Ke	Chi	Yin	Xu	Yang	Long	Dong	Ka	Lu	Jing	Nu	Yan	Pang	Kua	Yi	Guang	Hai	Ge	Dong	Chi	Jiao	Xiong	Xiong	Er	An	Heng	Pian	Neng	Zi	Gui";

    case 129:
      return "Cheng	Tiao	Zhi	Cui	Mei	Xie	Cui	Xie	Mai	Mai	Ji	Xie	Nin	Kuai	Sa	Zang	Qi	Nao	Mi	Nong	Luan	Wan	Bo	Wen	Wan	Xiu	Jiao	Jing	You	Heng	Cuo	Lie	Shan	Ting	Mei	Chun	Shen	Qian	De	Juan	Cu	Xiu	Xin	Tuo	Pao	Cheng	Nei	Pu	Dou	Tuo	Niao	Nao	Pi	Gu	Luo	Li	Lian	Zhang	Cui	Jie	Liang	Shui	Pi	Biao	Lun	Pian	Lei	Kui	Chui	Dan	Tian	Nei	Jing	Nai	La	Ye	Yan	Ren	Shen	Chuo	Fu	Fu	Ju	Fei	Qiang	Wan	Dong	Pi	Guo	Zong	Ding	Wo	Mei	Ni	Zhuan	Chi	Cou	Luo	Ou	Di	An	Xing	Nao	Shu	Shuan	Nan	Yun	Zhong	Rou	E	Sai	Tu	Yao	Jian	Wei	Jiao	Yu	Jia	Duan	Bi	Chang	Fu	Xian	Ni	Mian	Wa	Teng	Tui	Bang	Qian	Lu	Wa	Shou	Tang	Su	Zhui	Ge	Yi	Bo	Liao	Ji	Pi	Xie	Gao	Lu	Bin	Ou	Chang	Lu	Guo	Pang	Chuai	Biao	Jiang	Fu	Tang	Mo	Xi	Zhuan	Lu	Jiao	Ying	Lu	Zhi	Xue	Cun	Lin	Tong	Peng	Ni	Chuai	Liao	Cui	Gui	Xiao	Teng	Fan	Zhi	Jiao	Shan	Hu	Cui	Run	Xiang	Sui	Fen	Ying	Shan	Zhua	Dan	Kuai	Nong	Tun	Lian	Bi	Yong	Jue	Chu	Yi	Juan	La	Lian	Sao	Tun	Gu	Qi	Cui	Bin	Xun	Nao	Wo	Zang	Xian	Biao	Xing	Kuan	La	Yan	Lu	Huo	Za	Luo	Qu	Zang	Luan	Ni	Za	Chen	Qian	Wo	Guang	Zang	Lin	Guang	Zi	Jiao	Nie	Chou	Ji	Gao	Chou	Mian	Nie	Zhi	Zhi	Ge	Jian	Die	Zhi	Xiu	Tai	Zhen	Jiu	Xian	Yu	Cha";

    case 130:
      return "Yao	Yu	Chong	Xi	Xi	Jiu	Yu	Yu	Xing	Ju	Jiu	Xin	She	She	She	Jiu	Shi	Tan	Shu	Shi	Tian	Tan	Pu	Pu	Guan	Hua	Tian	Chuan	Shun	Xia	Wu	Zhou	Dao	Chuan	Shan	Yi	Fan	Pa	Tai	Fan	Ban	Chuan	Hang	Fang	Ban	Bi	Lu	Zhong	Jian	Cang	Ling	Zhu	Ze	Duo	Bo	Xian	Ge	Chuan	Xia	Lu	Qiong	Pang	Xi	Kua	Fu	Zao	Feng	Li	Shao	Yu	Lang	Ting	Yu	Wei	Bo	Meng	Nian	Ju	Huang	Shou	Ke	Bian	Mu	Die	Dao	Bang	Cha	Yi	Sou	Cang	Cao	Lou	Dai	Xue	Yao	Chong	Deng	Dang	Qiang	Lu	Yi	Ji	Jian	Huo	Meng	Qi	Lu	Lu	Chan	Shuang	Gen	Liang	Jian	Jian	Se	Yan	Fu	Ping	Yan	Yan	Cao	Cao	Yi	Le	Ting	Jiao	Ai	Nai	Tiao	Jiao	Jie	Peng	Wan	Yi	Chai	Mian	Mi	Gan	Qian	Yu	Yu	Shao	Qiong	Du	Hu	Qi	Mang	Zi	Hui	Sui	Zhi	Xiang	Pi	Fu	Tun	Wei	Wu	Zhi	Qi	Shan	Wen	Qian	Ren	Fu	Kou	Jie	Lu	Xu	Ji	Qin	Qi	Yan	Fen	Ba	Rui	Xin	Ji	Hua	Hua	Fang	Wu	Jue	Gou	Zhi	Yun	Qin	Ao	Chu	Mao	Ya	Fei	Reng	Hang	Cong	Yin	You	Bian	Yi	Qie	Wei	Li	Pi	E	Xian	Chang	Cang	Zhu	Su	Ti	Yuan	Ran	Ling	Tai	Shao	Di	Miao	Qing	Li	Yong	Ke	Mu	Bei	Bao	Gou	Min	Yi	Yi	Ju	Pie	Ruo	Ku	Ning	Ni	Bo	Bing	Shan	Xiu	Yao	Xian	Ben	Hong	Ying	Zha	Dong	Ju	Die	Nie	Gan	Hu	Ping	Mei	Fu	Sheng	Gu	Bi	Wei";

    case 131:
      return "Fu	Zhuo	Mao	Fan	Jia	Mao	Mao	Ba	Ci	Mo	Zi	Zhi	Chi	Ji	Jing	Long	Cong	Niao	Yuan	Xue	Ying	Qiong	Ge	Ming	Li	Rong	Yin	Gen	Qian	Chai	Chen	Yu	Hao	Zi	Lie	Wu	Ji	Gui	Ci	Jian	Ci	Gou	Guang	Mang	Cha	Jiao	Jiao	Fu	Yu	Zhu	Zi	Jiang	Hui	Yin	Cha	Fa	Rong	Ru	Chong	Mang	Tong	Zhong	Qian	Zhu	Xun	Huan	Fu	Quan	Gai	Da	Jing	Xing	Chuan	Cao	Jing	Er	An	Qiao	Chi	Ren	Jian	Ti	Huang	Ping	Li	Jin	Lao	Shu	Zhuang	Da	Jia	Rao	Bi	Ce	Qiao	Hui	Ji	Dang	Zi	Rong	Hun	Xing	Luo	Ying	Xun	Jin	Sun	Yin	Mai	Hong	Zhou	Yao	Du	Wei	Li	Dou	Fu	Ren	Yin	He	Bi	Bu	Yun	Di	Tu	Sui	Sui	Cheng	Chen	Wu	Bie	Xi	Geng	Li	Pu	Zhu	Mo	Li	Zhuang	Zuo	Tuo	Qiu	Sha	Suo	Chen	Peng	Ju	Mei	Meng	Xing	Jing	Che	Shen	Jun	Yan	Ting	You	Cuo	Guan	Han	You	Cuo	Jia	Wang	Su	Niu	Shao	Xian	Lang	Fu	E	Mo	Wen	Jie	Nan	Mu	Kan	Lai	Lian	Shi	Wo	Tu	Xian	Huo	You	Ying	Ying	Gong	Chun	Mang	Mang	Ci	Wan	Jing	Di	Qu	Dong	Jian	Zou	Gu	La	Lu	Ju	Wei	Jun	Nie	Kun	He	Pu	Zai	Gao	Guo	Fu	Lun	Chang	Chou	Song	Chui	Zhan	Men	Cai	Ba	Li	Tu	Bo	Han	Bao	Qin	Juan	Xi	Qin	Di	Jie	Pu	Dang	Jin	Qiao	Tai	Geng	Hua	Gu	Ling	Fei	Qin	An	Wang	Beng	Zhou	Yan	Ju	Jian	Lin	Tan	Shu	Tian	Dao";

    case 132:
      return "Hu	Qi	He	Cui	Tao	Chun	Bi	Chang	Huan	Fei	Lai	Qi	Meng	Ping	Wei	Dan	Sha	Huan	Yan	Yi	Tiao	Qi	Wan	Ce	Nai	Zhen	Tuo	Jiu	Tie	Luo	Bi	Yi	Pan	Bo	Pao	Ding	Ying	Ying	Ying	Xiao	Sa	Qiu	Ke	Xiang	Wan	Yu	Yu	Fu	Lian	Xuan	Xuan	Nan	Ce	Wo	Chun	Xiao	Yu	Bian	Mao	An	E	Luo	Ying	Kuo	Kuo	Jiang	Mian	Zuo	Zuo	Zu	Bao	Rou	Xi	Ye	An	Qu	Jian	Fu	Lu	Jing	Pen	Feng	Hong	Hong	Hou	Yan	Tu	Zhe	Zi	Xiang	Ren	Ge	Qia	Qing	Mi	Huang	Shen	Pu	Gai	Dong	Zhou	Jian	Wei	Bo	Wei	Pa	Ji	Hu	Zang	Jia	Duan	Yao	Sui	Cong	Quan	Wei	Zhen	Kui	Ting	Hun	Xi	Shi	Qi	Lan	Zong	Yao	Yuan	Mei	Yun	Shu	Di	Zhuan	Guan	Ran	Xue	Chan	Kai	Kui	Hua	Jiang	Lou	Wei	Pai	You	Sou	Yin	Shi	Chun	Shi	Yun	Zhen	Lang	Ru	Meng	Li	Que	Suan	Yuan	Li	Ju	Xi	Bang	Chu	Xu	Tu	Liu	Huo	Dian	Qian	Zu	Po	Cuo	Yuan	Chu	Yu	Kuai	Pan	Pu	Pu	Na	Shuo	Xi	Fen	Yun	Zheng	Jian	Ji	Ruo	Cang	En	Mi	Hao	Sun	Zhen	Ming	Sou	Xu	Liu	Xi	Gu	Lang	Rong	Weng	Gai	Cuo	Shi	Tang	Luo	Ru	Suo	Xuan	Bei	Yao	Gui	Bi	Zong	Gun	Zuo	Tiao	Ce	Pei	Lan	Dan	Ji	Li	Shen	Lang	Yu	Ling	Ying	Mo	Diao	Tiao	Mao	Tong	Chu	Peng	An	Lian	Cong	Xi	Ping	Qiu	Jin	Chun	Jie	Wei	Tui	Cao	Yu	Yi	Zi	Liao	Bi	Lu	Xu";

    case 133:
      return "Bu	Zhang	Lei	Qiang	Man	Yan	Ling	Ji	Biao	Gun	Han	Di	Su	Lu	She	Shang	Di	Mie	Xun	Man	Bo	Di	Cuo	Zhe	Shen	Xuan	Wei	Hu	Ao	Mi	Lou	Cu	Zhong	Cai	Po	Jiang	Mi	Cong	Niao	Hui	Juan	Yin	Jian	Nian	Shu	Yin	Guo	Chen	Hu	Sha	Kou	Qian	Ma	Zang	Ze	Qiang	Dou	Lian	Lin	Kou	Ai	Bi	Li	Wei	Ji	Qian	Sheng	Fan	Meng	Ou	Chan	Dian	Xun	Jiao	Rui	Rui	Lei	Yu	Qiao	Chu	Hua	Jian	Mai	Yun	Bao	You	Qu	Lu	Rao	Hui	E	Ti	Fei	Jue	Zui	Fa	Ru	Fen	Kui	Shun	Rui	Ya	Xu	Fu	Jue	Dang	Wu	Dong	Si	Xiao	Xi	Long	Wen	Shao	Qi	Jian	Yun	Sun	Ling	Yu	Xia	Weng	Ji	Hong	Si	Nong	Lei	Xuan	Yun	Yu	Xi	Hao	Bao	Hao	Ai	Wei	Hui	Hui	Ji	Ci	Xiang	Wan	Mie	Yi	Leng	Jiang	Can	Shen	Qiang	Lian	Ke	Yuan	Da	Ti	Tang	Xue	Bi	Zhan	Sun	Xian	Fan	Ding	Xie	Gu	Xie	Shu	Jian	Hao	Hong	Sa	Xin	Xun	Yao	Bai	Sou	Shu	Xun	Dui	Pin	Wei	Ning	Chou	Mai	Ru	Piao	Tai	Ji	Zao	Chen	Zhen	Er	Ni	Ying	Gao	Cong	Xiao	Qi	Fa	Jian	Xu	Kui	Ji	Bian	Diao	Mi	Lan	Jin	Cang	Miao	Qiong	Qie	Xian	Liao	Ou	Xian	Su	Lu	Yi	Xu	Xie	Li	Yi	La	Lei	Jiao	Di	Zhi	Bei	Teng	Yao	Mo	Huan	Biao	Fan	Sou	Tan	Tui	Qiong	Qiao	Wei	Liu	Hui	Ou	Gao	Yun	Bao	Li	Shu	Chu	Ai	Lin	Zao	Xuan	Qin	Lai	Huo";

    case 134:
      return "Tuo	Wu	Rui	Rui	Qi	Heng	Lu	Su	Tui	Meng	Yun	Ping	Yu	Xun	Ji	Jiong	Xuan	Mo	Qiu	Su	Jiong	Peng	Nie	Bo	Rang	Yi	Xian	Yu	Ju	Lian	Lian	Yin	Qiang	Ying	Long	Tou	Hua	Yue	Ling	Qu	Yao	Fan	Mei	Han	Kui	Lan	Ji	Dang	Man	Lei	Lei	Hui	Feng	Zhi	Wei	Kui	Zhan	Huai	Li	Ji	Mi	Lei	Huai	Luo	Ji	Kui	Lu	Jian	Sa	Teng	Lei	Quan	Xiao	Yi	Luan	Men	Bie	Hu	Hu	Lu	Nue	Lu	Si	Xiao	Qian	Chu	Hu	Xu	Cuo	Fu	Xu	Xu	Lu	Hu	Yu	Hao	Jiao	Ju	Guo	Bao	Yan	Zhan	Zhan	Kui	Bin	Xi	Shu	Chong	Qiu	Diao	Ji	Qiu	Ding	Shi	Xia	Jue	Zhe	She	Yu	Han	Zi	Hong	Hui	Meng	Ge	Sui	Xia	Chai	Shi	Yi	Ma	Xiang	Fang	E	Ba	Chi	Qian	Wen	Wen	Rui	Bang	Pi	Yue	Yue	Jun	Qi	Tong	Yin	Qi	Can	Yuan	Jue	Hui	Qin	Qi	Zhong	Ya	Hao	Mu	Wang	Fen	Fen	Hang	Gong	Zao	Fu	Ran	Jie	Fu	Chi	Dou	Bao	Xian	Ni	Dai	Qiu	You	Zha	Ping	Chi	You	He	Han	Ju	Li	Fu	Ran	Zha	Gou	Pi	Pi	Xian	Zhu	Diao	Bie	Bing	Gu	Zhan	Qu	She	Tie	Ling	Gu	Dan	Gu	Ying	Li	Cheng	Qu	Mou	Ge	Ci	Hui	Hui	Mang	Fu	Yang	Wa	Lie	Zhu	Yi	Xian	Kuo	Jiao	Li	Yi	Ping	Qi	Ha	She	Yi	Wang	Mo	Qiong	Qie	Gui	Qiong	Zhi	Man	Lao	Zhe	Jia	Nao	Si	Qi	Xing	Jie	Qiu	Shao	Yong	Jia	Tui	Che	Bei	E	Han";

    case 135:
      return "Shu	Xuan	Feng	Shen	Shen	Fu	Xian	Zhe	Wu	Fu	Li	Lang	Bi	Chu	Yuan	You	Jie	Dan	Yan	Ting	Dian	Tui	Hui	Wo	Zhi	Song	Fei	Ju	Mi	Qi	Qi	Yu	Jun	La	Meng	Qiang	Si	Xi	Lun	Li	Die	Tiao	Tao	Kun	Han	Han	Yu	Bang	Fei	Pi	Wei	Dun	Yi	Yuan	Suo	Quan	Qian	Rui	Ni	Qing	Wei	Liang	Guo	Wan	Dong	E	Ban	Di	Wang	Can	Yang	Ying	Guo	Chan	Ding	La	Ke	Jie	Xie	Ting	Mao	Xu	Mian	Yu	Jie	Shi	Xuan	Huang	Yan	Bian	Rou	Wei	Fu	Yuan	Mei	Wei	Fu	Ru	Xie	You	Qiu	Mao	Xia	Ying	Shi	Chong	Tang	Zhu	Zong	Ti	Fu	Yuan	Kui	Meng	La	Du	Hu	Qiu	Die	Li	Wo	Yun	Qu	Nan	Lou	Chun	Rong	Ying	Jiang	Ban	Lang	Pang	Si	Xi	Ci	Xi	Yuan	Weng	Lian	Sou	Ban	Rong	Rong	Ji	Wu	Xiu	Han	Qin	Yi	Bi	Hua	Tang	Yi	Du	Nai	He	Hu	Gui	Ma	Ming	Yi	Wen	Ying	Te	Zhong	Cang	Sao	Qi	Man	Tiao	Shang	Shi	Cao	Chi	Di	Ao	Lu	Wei	Zhi	Tang	Chen	Piao	Qu	Pi	Yu	Jian	Luo	Lou	Qin	Zhong	Yin	Jiang	Shuai	Wen	Xiao	Wan	Zhe	Zhe	Ma	Ma	Guo	Liu	Mao	Xi	Cong	Li	Man	Xiao	Chang	Zhang	Mang	Xiang	Mo	Zui	Si	Qiu	Te	Zhi	Peng	Peng	Jiao	Qu	Bie	Liao	Pan	Gui	Xi	Ji	Zhuan	Huang	Fei	Lao	Jue	Jue	Hui	Yin	Chan	Jiao	Shan	Nao	Xiao	Wu	Chong	Xun	Si	Chu	Cheng	Dang	Li	Xie	Shan	Yi	Jing	Da	Chan	Qi";

    case 136:
      return "Ci	Xiang	She	Luo	Qin	Ying	Chai	Li	Zei	Xuan	Lian	Zhu	Ze	Xie	Mang	Xie	Qi	Rong	Jian	Meng	Hao	Ru	Huo	Zhuo	Jie	Pin	He	Mie	Fan	Lei	Jie	La	Min	Li	Chun	Li	Qiu	Nie	Lu	Du	Xiao	Zhu	Long	Li	Long	Feng	Ye	Pi	Nang	Gu	Juan	Ying	Shu	Xi	Can	Qu	Quan	Du	Can	Man	Qu	Jie	Zhu	Zhuo	Xue	Huang	Nu	Pei	Nu	Xin	Zhong	Mai	Er	Ka	Mie	Xi	Xing	Yan	Kan	Yuan	Qu	Ling	Xuan	Shu	Xian	Tong	Xiang	Jie	Xian	Ya	Hu	Wei	Dao	Chong	Wei	Dao	Zhun	Heng	Qu	Yi	Yi	Bu	Gan	Yu	Biao	Cha	Yi	Shan	Chen	Fu	Gun	Fen	Shuai	Jie	Na	Zhong	Dan	Yi	Zhong	Zhong	Jie	Zhi	Xie	Ran	Zhi	Ren	Qin	Jin	Jun	Yuan	Mei	Chai	Ao	Niao	Hui	Ran	Jia	Tuo	Ling	Dai	Bao	Pao	Yao	Zuo	Bi	Shao	Tan	Ju	He	Xue	Xiu	Zhen	Yi	Pa	Bo	Di	Wa	Fu	Gun	Zhi	Zhi	Ran	Pan	Yi	Mao	Tuo	Na	Gou	Xuan	Zhe	Qu	Bei	Yu	Xi	Mi	Bo	Bo	Fu	Chi	Chi	Ku	Ren	Jiang	Jia	Jian	Bo	Jie	Er	Ge	Ru	Zhu	Gui	Yin	Cai	Lie	Ka	Xing	Zhuang	Dang	Xu	Kun	Ken	Niao	Shu	Jia	Kun	Cheng	Li	Juan	Shen	Pou	Ge	Yi	Yu	Zhen	Liu	Qiu	Qun	Ji	Yi	Bu	Zhuang	Shui	Sha	Qun	Li	Lian	Lian	Ku	Jian	Fou	Chan	Bi	Kun	Tao	Yuan	Ling	Chi	Chang	Chou	Duo	Biao	Liang	Shang	Pei	Pei	Fei	Yuan	Luo	Guo	Yan	Du	Ti	Zhi	Ju	Yi";

    case 137:
      return "Qi	Guo	Gua	Ken	Qi	Ti	Ti	Fu	Chong	Xie	Bian	Die	Kun	Duan	Xiu	Xiu	He	Yuan	Bao	Bao	Fu	Yu	Tuan	Yan	Hui	Bei	Chu	Lu	Pao	Dan	Yun	Ta	Gou	Da	Huai	Rong	Yuan	Ru	Nai	Jiong	Suo	Ban	Tui	Chi	Sang	Niao	Ying	Jie	Qian	Huai	Ku	Lian	Lan	Li	Zhe	Shi	Lu	Yi	Die	Xie	Xian	Wei	Biao	Cao	Ji	Qiang	Sen	Bao	Xiang	Bi	Fu	Jian	Zhuan	Jian	Cui	Ji	Dan	Za	Fan	Bo	Xiang	Xin	Bie	Rao	Man	Lan	Ao	Ze	Gui	Cao	Sui	Nong	Chan	Lian	Bi	Jin	Dang	Shu	Tan	Bi	Lan	Fu	Ru	Zhi	Dui	Shu	Wa	Shi	Bai	Xie	Bo	Chen	Lai	Long	Xi	Xian	Lan	Zhe	Dai	Ju	Zan	Shi	Jian	Pan	Yi	Lan	Ya	Xi	Xi	Yao	Feng	Tan	Fu	Fiao	Fu	Ba	He	Ji	Ji	Jian	Guan	Bian	Yan	Gui	Jue	Pian	Mao	Mi	Mi	Mie	Shi	Si	Chan	Luo	Jue	Mi	Tiao	Lian	Yao	Zhi	Jun	Xi	Shan	Wei	Xi	Tian	Yu	Lan	E	Du	Qin	Pang	Ji	Ming	Ying	Gou	Qu	Zhan	Jin	Guan	Deng	Jian	Luo	Qu	Jian	Wei	Jue	Qu	Luo	Lan	Shen	Di	Guan	Jian	Guan	Yan	Gui	Mi	Shi	Chan	Lan	Jue	Ji	Xi	Di	Tian	Yu	Gou	Jin	Qu	Jiao	Qiu	Jin	Cu	Jue	Zhi	Chao	Ji	Gu	Dan	Zi	Di	Shang	Hua	Quan	Ge	Shi	Jie	Gui	Gong	Chu	Jie	Hun	Qiu	Xing	Su	Ni	Ji	Lu	Zhi	Zha	Bi	Xing	Hu	Shang	Gong	Zhi	Xue	Chu	Xi	Yi	Li	Jue	Xi	Yan	Xi";

    case 138:
      return "Yan	Yan	Ding	Fu	Qiu	Qiu	Jiao	Hong	Ji	Fan	Xun	Diao	Hong	Chai	Tao	Xu	Jie	Yi	Ren	Xun	Yin	Shan	Qi	Tuo	Ji	Xun	Yin	E	Fen	Ya	Yao	Song	Shen	Yin	Xin	Jue	Xiao	Ne	Chen	You	Zhi	Xiong	Fang	Xin	Chao	She	Yan	Sa	Zhun	Xu	Yi	Yi	Su	Chi	He	Shen	He	Xu	Zhen	Zhu	Zheng	Gou	Zi	Zi	Zhan	Gu	Fu	Jian	Die	Ling	Di	Yang	Li	Nao	Pan	Zhou	Gan	Yi	Ju	Yao	Zha	Yi	Yi	Qu	Zhao	Ping	Bi	Xiong	Qu	Ba	Da	Zu	Tao	Zhu	Ci	Zhe	Yong	Xu	Xun	Yi	Huang	He	Shi	Cha	Xiao	Shi	Hen	Cha	Gou	Gui	Quan	Hui	Jie	Hua	Gai	Xiang	Wei	Shen	Zhou	Tong	Mi	Zhan	Ming	E	Hui	Yan	Xiong	Gua	Er	Bing	Tiao	Yi	Lei	Zhu	Kuang	Kua	Wu	Yu	Teng	Ji	Zhi	Ren	Cu	Lang	E	Kuang	Ei	Shi	Ting	Dan	Bei	Chan	You	Keng	Qiao	Qin	Shua	An	Yu	Xiao	Cheng	Jie	Xian	Wu	Wu	Gao	Song	Bu	Hui	Jing	Shuo	Zhen	Shuo	Du	Hua	Chang	Shui	Jie	Ke	Qu	Cong	Xiao	Sui	Wang	Xian	Fei	Chi	Ta	Yi	Ni	Yin	Diao	Pi	Zhuo	Chan	Chen	Zhun	Ji	Qi	Tan	Zhui	Wei	Ju	Qing	Dong	Zheng	Ze	Zou	Qian	Zhuo	Liang	Jian	Chu	Hao	Lun	Shen	Biao	Hua	Pian	Yu	Die	Xu	Pian	Shi	Xuan	Shi	Hun	Hua	E	Zhong	Di	Xie	Fu	Pu	Ting	Jian	Qi	Yu	Zi	Zhuan	Xi	Hui	Yin	An	Xian	Nan	Chen	Feng	Zhu	Yang	Yan	Huang	Xuan	Ge	Nuo	Qi";

    case 139:
      return "Mou	Ye	Wei	Xing	Teng	Zhou	Shan	Jian	Po	Kui	Huang	Huo	Ge	Ying	Mi	Xiao	Mi	Xi	Qiang	Chen	Xue	Ti	Su	Bang	Chi	Qian	Shi	Jiang	Yuan	Xie	He	Tao	Yao	Yao	Lu	Yu	Biao	Cong	Qing	Li	Mo	Mo	Shang	Zhe	Miu	Jian	Ze	Jie	Lian	Lou	Can	Ou	Gun	Xi	Zhuo	Ao	Ao	Jin	Zhe	Yi	Hu	Jiang	Man	Chao	Han	Hua	Chan	Xu	Zeng	Se	Xi	Zha	Dui	Zheng	Nao	Lan	E	Ying	Jue	Ji	Zun	Jiao	Bo	Hui	Zhuan	Wu	Zen	Zha	Shi	Qiao	Tan	Zen	Pu	Sheng	Xuan	Zao	Tan	Dang	Sui	Xian	Ji	Jiao	Jing	Zhan	Nang	Yi	Ai	Zhan	Pi	Hui	Hua	Yi	Yi	Shan	Rang	Nou	Qian	Dui	Ta	Hu	Zhou	Hao	Ai	Ying	Jian	Yu	Jian	Hui	Du	Zhe	Xuan	Zan	Lei	Shen	Wei	Chan	Li	Yi	Bian	Zhe	Yan	E	Chou	Wei	Chou	Yao	Chan	Rang	Yin	Lan	Chen	Xie	Nie	Huan	Zan	Yi	Dang	Zhan	Yan	Du	Yan	Ji	Ding	Fu	Ren	Ji	Jie	Hong	Tao	Rang	Shan	Qi	Tuo	Xun	Yi	Xun	Ji	Ren	Jiang	Hui	Ou	Ju	Ya	Ne	Xu	E	Lun	Xiong	Song	Feng	She	Fang	Jue	Zheng	Gu	He	Ping	Zu	Shi	Xiong	Zha	Su	Zhen	Di	Zhou	Ci	Qu	Zhao	Bi	Yi	Yi	Kuang	Lei	Shi	Gua	Shi	Ji	Hui	Cheng	Zhu	Shen	Hua	Dan	Gou	Quan	Gui	Xun	Yi	Zheng	Gai	Xiang	Cha	Hun	Xu	Zhou	Jie	Wu	Yu	Qiao	Wu	Gao	You	Hui	Kuang	Shuo	Song	Ei	Qing	Zhu	Zou	Nuo	Du	Zhuo	Fei	Ke	Wei";

    case 140:
      return "Yu	Shei	Shen	Diao	Chan	Liang	Zhun	Sui	Tan	Shen	Yi	Mou	Chen	Die	Huang	Jian	Xie	Xue	Ye	Wei	E	Yu	Xuan	Chan	Zi	An	Yan	Di	Mi	Pian	Xu	Mo	Dang	Su	Xie	Yao	Bang	Shi	Qian	Mi	Jin	Man	Zhe	Jian	Miu	Tan	Zen	Qiao	Lan	Pu	Jue	Yan	Qian	Zhan	Chen	Gu	Qian	Hong	Xia	Ji	Hong	Han	Hong	Xi	Xi	Huo	Liao	Han	Du	Long	Dou	Jiang	Qi	Shi	Li	Deng	Wan	Bi	Shu	Xian	Feng	Zhi	Zhi	Yan	Yan	Shi	Chu	Hui	Tun	Yi	Tun	Yi	Jian	Ba	Hou	E	Chu	Xiang	Huan	Jian	Ken	Gai	Ju	Fu	Xi	Bin	Hao	Yu	Zhu	Jia	Fen	Xi	Bo	Wen	Huan	Bin	Di	Zong	Fen	Yi	Zhi	Bao	Chai	An	Pi	Na	Pi	Gou	Na	You	Diao	Mo	Si	Xiu	Huan	Kun	He	Hao	Mo	An	Mao	Li	Ni	Bi	Yu	Jia	Tuan	Mao	Pi	Xi	Yi	Ju	Mo	Chu	Tan	Huan	Jue	Bei	Zhen	Yuan	Fu	Cai	Gong	Te	Yi	Hang	Wan	Pin	Huo	Fan	Tan	Guan	Ze	Zhi	Er	Zhu	Shi	Bi	Zi	Er	Gui	Pian	Bian	Mai	Dai	Sheng	Kuang	Fei	Tie	Yi	Chi	Mao	He	Bi	Lu	Lin	Hui	Gai	Pian	Zi	Jia	Xu	Zei	Jiao	Gai	Zang	Jian	Ying	Xun	Zhen	She	Bin	Bin	Qiu	She	Chuan	Zang	Zhou	Lai	Zan	Ci	Chen	Shang	Tian	Pei	Geng	Xian	Mai	Jian	Sui	Fu	Tan	Cong	Cong	Zhi	Ji	Zhang	Du	Jin	Xiong	Chun	Yun	Bao	Zai	Lai	Feng	Cang	Ji	Sheng	Yi	Zhuan	Fu	Gou	Sai	Ze	Liao";

    case 141:
      return "Yi	Bai	Chen	Wan	Zhi	Zhui	Biao	Yun	Zeng	Dan	Zan	Yan	Pu	Shan	Wan	Ying	Jin	Gan	Xian	Zang	Bi	Du	Shu	Yan	Shang	Xuan	Long	Gan	Zang	Bei	Zhen	Fu	Yuan	Gong	Cai	Ze	Xian	Bai	Zhang	Huo	Zhi	Fan	Tan	Pin	Bian	Gou	Zhu	Guan	Er	Jian	Ben	Shi	Tie	Gui	Kuang	Dai	Mao	Fei	He	Yi	Zei	Zhi	Jia	Hui	Zi	Lin	Lu	Zang	Zi	Gai	Jin	Qiu	Zhen	Lai	She	Fu	Du	Ji	Shu	Shang	Ci	Bi	Zhou	Geng	Pei	Dan	Lai	Feng	Zhui	Fu	Zhuan	Sai	Ze	Yan	Zan	Yun	Zeng	Shan	Ying	Gan	Chi	Xi	She	Nan	Tong	Xi	Cheng	He	Cheng	Zhe	Xia	Tang	Zou	Zou	Li	Jiu	Fu	Zhao	Gan	Qi	Shan	Qiong	Yin	Xian	Zi	Jue	Qin	Chi	Ci	Chen	Chen	Die	Ju	Chao	Di	Xi	Zhan	Jue	Yue	Qu	Ji	Chi	Chu	Gua	Xue	Zi	Tiao	Duo	Lie	Gan	Suo	Cu	Xi	Zhao	Su	Yin	Ju	Jian	Que	Tang	Chuo	Cui	Lu	Qu	Dang	Qiu	Zi	Ti	Qu	Chi	Huang	Qiao	Qiao	Jiao	Zao	Ti	Er	Zan	Zan	Zu	Pa	Bao	Ku	Ke	Dun	Jue	Fu	Chen	Jian	Fang	Zhi	Ta	Yue	Ba	Qi	Yue	Qiang	Tuo	Tai	Yi	Nian	Ling	Mei	Ba	Die	Ku	Tuo	Jia	Ci	Pao	Qia	Zhu	Ju	Dian	Zhi	Fu	Pan	Ju	Shan	Bo	Ni	Ju	Li	Gen	Yi	Ji	Duo	Xian	Jiao	Duo	Zhu	Quan	Kua	Zhuai	Gui	Qiong	Kui	Xiang	Chi	Lu	Pian	Zhi	Jia	Tiao	Cai	Jian	Da	Qiao	Bi	Xian	Duo	Ji	Ju	Ji	Shu	Tu";

    case 142:
      return "Chu	Jing	Nie	Xiao	Bu	Xue	Cun	Mu	Shu	Liang	Yong	Jiao	Chou	Qiao	Mou	Ta	Jian	Qi	Wo	Wei	Chuo	Jie	Ji	Nie	Ju	Nie	Lun	Lu	Leng	Huai	Ju	Chi	Wan	Quan	Ti	Bo	Zu	Qie	Yi	Cu	Zong	Cai	Zong	Peng	Zhi	Zheng	Dian	Zhi	Yu	Duo	Dun	Chuan	Yong	Zhong	Di	Zha	Chen	Chuai	Jian	Gua	Tang	Ju	Fu	Zu	Die	Pian	Rou	Nuo	Ti	Cha	Tui	Jian	Dao	Cuo	Qi	Ta	Qiang	Nian	Dian	Ti	Ji	Nie	Man	Liu	Zan	Bi	Chong	Lu	Liao	Cu	Tang	Dai	Su	Xi	Kui	Ji	Zhi	Qiang	Di	Pan	Zong	Lian	Beng	Zao	Nian	Bie	Tui	Ju	Deng	Ceng	Xian	Fan	Chu	Zhong	Dun	Bo	Cu	Cu	Jue	Jue	Lin	Ta	Qiao	Jue	Pu	Liao	Dun	Cuan	Guan	Zao	Da	Bi	Bi	Zhu	Ju	Chu	Qiao	Dun	Chou	Ji	Wu	Yue	Nian	Lin	Lie	Zhi	Li	Zhi	Chan	Chu	Duan	Wei	Long	Lin	Xian	Wei	Zuan	Lan	Xie	Rang	Sa	Nie	Ta	Qu	Ji	Cuan	Cuo	Xi	Kui	Jue	Lin	Shen	Gong	Dan	Fen	Qu	Ti	Duo	Duo	Gong	Lang	Ren	Luo	Ai	Ji	Ju	Tang	Kong	Lao	Yan	Mei	Kang	Qu	Lou	Lao	Duo	Zhi	Yan	Ti	Dao	Ying	Yu	Che	Ya	Gui	Jun	Wei	Yue	Xin	Dai	Xuan	Fan	Ren	Shan	Kuang	Shu	Tun	Chen	Dai	E	Na	Qi	Mao	Ruan	Kuang	Qian	Zhuan	Hong	Hu	Qu	Kuang	Di	Ling	Dai	Ao	Zhen	Fan	Kuang	Yang	Peng	Bei	Gu	Gu	Pao	Zhu	Rong	E	Ba	Zhou	Zhi	Yao	Ke	Yi	Zhi	Shi	Ping";

    case 143:
      return "Er	Gong	Ju	Jiao	Guang	He	Kai	Quan	Zhou	Zai	Zhi	She	Liang	Yu	Shao	You	Wan	Yin	Zhe	Wan	Fu	Qing	Zhou	Ni	Leng	Zhe	Zhan	Liang	Zi	Hui	Wang	Chuo	Guo	Kan	Yi	Peng	Qian	Gun	Nian	Ping	Guan	Bei	Lun	Pai	Liang	Ruan	Rou	Ji	Yang	Xian	Chuan	Cou	Chun	Ge	You	Hong	Shu	Fu	Zi	Fu	Wen	Ben	Zhan	Yu	Wen	Tao	Gu	Zhen	Xia	Yuan	Lu	Jiao	Chao	Zhuan	Wei	Hun	Xue	Zhe	Jiao	Zhan	Bu	Lao	Fen	Fan	Lin	Ge	Se	Kan	Huan	Yi	Ji	Zhui	Er	Yu	Jian	Hong	Lei	Pei	Li	Li	Lu	Lin	Che	Ya	Gui	Xuan	Dai	Ren	Zhuan	E	Lun	Ruan	Hong	Gu	Ke	Lu	Zhou	Zhi	Yi	Hu	Zhen	Li	Yao	Qing	Shi	Zai	Zhi	Jiao	Zhou	Quan	Lu	Jiao	Zhe	Fu	Liang	Nian	Bei	Hui	Gun	Wang	Liang	Chuo	Zi	Cou	Fu	Ji	Wen	Shu	Pei	Yuan	Xia	Nian	Lu	Zhe	Lin	Xin	Gu	Ci	Ci	Pi	Zui	Bian	La	La	Ci	Xue	Ban	Bian	Bian	Bian	Xue	Bian	Ban	Ci	Bian	Bian	Chen	Ru	Nong	Nong	Chan	Chuo	Chuo	Yi	Reng	Bian	Bian	Shi	Yu	Liao	Da	Chan	Gan	Qian	Yu	Yu	Qi	Xun	Yi	Guo	Mai	Qi	Za	Wang	Tu	Zhun	Ying	Da	Yun	Jin	Hang	Ya	Fan	Wu	Da	E	Hai	Zhe	Da	Jin	Yuan	Wei	Lian	Chi	Che	Ni	Tiao	Zhi	Yi	Jiong	Jia	Chen	Dai	Er	Di	Po	Zhu	Die	Ze	Tao	Shu	Tuo	Qu	Jing	Hui	Dong	You	Mi	Beng	Ji	Nai	Yi	Jie	Zhui	Lie	Xun";

    case 144:
      return "Tui	Song	Shi	Tao	Pang	Hou	Ni	Dun	Jiong	Xuan	Xun	Bu	You	Xiao	Qiu	Tou	Zhu	Qiu	Di	Di	Tu	Jing	Ti	Dou	Yi	Zhe	Tong	Guang	Wu	Shi	Cheng	Su	Zao	Qun	Feng	Lian	Suo	Hui	Li	Gu	Lai	Ben	Cuo	Jue	Beng	Huan	Dai	Lu	You	Zhou	Jin	Yu	Chuo	Kui	Wei	Ti	Yi	Da	Yuan	Luo	Bi	Nuo	Yu	Dang	Sui	Dun	Sui	Yan	Chuan	Chi	Ti	Yu	Shi	Zhen	You	Yun	E	Bian	Guo	E	Xia	Huang	Qiu	Dao	Da	Wei	Nan	Yi	Gou	Yao	Chou	Liu	Xun	Ta	Di	Chi	Yuan	Su	Ta	Qian	Ma	Yao	Guan	Zhang	Ao	Shi	Ca	Chi	Su	Zao	Zhe	Dun	Di	Lou	Chi	Cuo	Lin	Zun	Rao	Qian	Xuan	Yu	Yi	E	Liao	Ju	Shi	Bi	Yao	Mai	Xie	Sui	Hai	Zhan	Teng	Er	Miao	Bian	Bian	La	Li	Yuan	Yao	Luo	Li	Yi	Ting	Deng	Qi	Yong	Shan	Han	Yu	Mang	Ru	Qiong	Xi	Kuang	Fu	Kang	Bin	Fang	Xing	Na	Xin	Shen	Bang	Yuan	Cun	Huo	Xie	Bang	Wu	Ju	You	Han	Tai	Qiu	Bi	Pi	Bing	Shao	Bei	Wa	Di	Zou	Ye	Lin	Kuang	Gui	Zhu	Shi	Ku	Yu	Gai	He	Qie	Zhi	Ji	Huan	Hou	Xing	Jiao	Xi	Gui	Nuo	Lang	Jia	Kuai	Zheng	Lang	Yun	Yan	Cheng	Dou	Xi	Lu	Fu	Wu	Fu	Gao	Hao	Lang	Jia	Geng	Jun	Ying	Bo	Xi	Bei	Li	Yun	Bu	Xiao	Qi	Pi	Qing	Guo	Zhou	Tan	Zou	Ping	Lai	Ni	Chen	You	Bu	Xiang	Dan	Ju	Yong	Qiao	Yi	Dou	Yan	Mei";

    case 145:
      return "Ruo	Bei	E	Shu	Juan	Yu	Yun	Hou	Kui	Xiang	Xiang	Sou	Tang	Ming	Xi	Ru	Chu	Zi	Zou	Ye	Wu	Xiang	Yun	Hao	Yong	Bi	Mao	Chao	Fu	Liao	Yin	Zhuan	Hu	Qiao	Yan	Zhang	Man	Qiao	Xu	Deng	Bi	Xun	Bi	Zeng	Wei	Zheng	Mao	Shan	Lin	Po	Dan	Meng	Ye	Cao	Kuai	Feng	Meng	Zou	Kuang	Lian	Zan	Chan	You	Ji	Yan	Chan	Cuo	Ling	Huan	Xi	Feng	Zan	Li	You	Ding	Qiu	Zhuo	Pei	Zhou	Yi	Gan	Yu	Jiu	Yan	Zui	Mao	Zhen	Xu	Dou	Zhen	Fen	Yuan	Fu	Yun	Tai	Tian	Qia	Tuo	Cu	Han	Gu	Su	Po	Chou	Zai	Ming	Lao	Chuo	Chou	You	Tong	Zhi	Xian	Jiang	Cheng	Yin	Tu	Jiao	Mei	Ku	Suan	Lei	Pu	Zui	Hai	Yan	Shai	Niang	Wei	Lu	Lan	Yan	Tao	Pei	Zhan	Chun	Tan	Zui	Zhui	Cu	Kun	Ti	Xian	Du	Hu	Xu	Xing	Tan	Qiu	Chun	Yun	Po	Ke	Sou	Mi	Quan	Chou	Cuo	Yun	Yong	Ang	Zha	Hai	Tang	Jiang	Piao	Chen	Yu	Li	Zao	Lao	Yi	Jiang	Bu	Jiao	Xi	Tan	Fa	Nong	Yi	Li	Ju	Yan	Yi	Niang	Ru	Xun	Chou	Yan	Ling	Mi	Mi	Niang	Xin	Jiao	Shai	Mi	Yan	Bian	Cai	Shi	You	Shi	Shi	Li	Zhong	Ye	Liang	Li	Jin	Jin	Qiu	Yi	Liao	Dao	Zhao	Ding	Po	Qiu	Ba	Fu	Zhen	Zhi	Ba	Luan	Fu	Nai	Diao	Shan	Qiao	Kou	Chuan	Zi	Fan	Hua	Hua	Han	Gang	Qi	Mang	Ri	Di	Si	Xi	Yi	Chai	Shi	Tu	Xi	Nu	Qian	Qiu	Jian	Pi	Ye	Jin";

    case 146:
      return "Ba	Fang	Chen	Xing	Dou	Yue	Qian	Fu	Pi	Na	Xin	E	Jue	Dun	Gou	Yin	Qian	Ban	Sa	Ren	Chao	Niu	Fen	Yun	Yi	Qin	Pi	Guo	Hong	Yin	Jun	Diao	Yi	Zhong	Xi	Gai	Ri	Huo	Tai	Kang	Yuan	Lu	E	Qin	Duo	Zi	Ni	Tu	Shi	Min	Gu	Ke	Ling	Bing	Si	Gu	Bo	Pi	Yu	Si	Zuo	Bu	You	Tian	Jia	Zhen	Shi	Shi	Zhi	Ju	Chan	Shi	Shi	Xuan	Zhao	Bao	He	Bi	Sheng	Chu	Shi	Bo	Zhu	Chi	Za	Po	Tong	Qian	Fu	Zhai	Liu	Qian	Fu	Li	Yue	Pi	Yang	Ban	Bo	Jie	Gou	Shu	Zheng	Mu	Xi	Xi	Di	Jia	Mu	Tan	Huan	Yi	Si	Kuang	Ka	Bei	Jian	Tong	Xing	Hong	Jiao	Chi	Er	Luo	Bing	Shi	Mou	Jia	Yin	Jun	Zhou	Chong	Xiang	Tong	Mo	Lei	Ji	Yu	Xu	Ren	Zun	Zhi	Qiong	Shan	Chi	Xian	Xing	Quan	Pi	Tie	Zhu	Xiang	Ming	Kua	Yao	Xian	Xian	Xiu	Jun	Cha	Lao	Ji	Pi	Ru	Mi	Yi	Yin	Guang	An	Diu	You	Se	Kao	Qian	Luan	Si	Ai	Diao	Han	Rui	Shi	Keng	Qiu	Xiao	Zhe	Xiu	Zang	Ti	Cuo	Gua	Hong	Zhong	Tou	Lu	Mei	Lang	Wan	Xin	Yun	Bei	Wu	Su	Yu	Chan	Ding	Bo	Han	Jia	Hong	Cuan	Feng	Chan	Wan	Zhi	Si	Xuan	Hua	Yu	Tiao	Kuang	Zhuo	Lue	Xing	Qin	Shen	Han	Lue	Ye	Chu	Zeng	Ju	Xian	Tie	Mang	Pu	Li	Pan	Rui	Cheng	Gao	Li	Te	Bing	Zhu	Zhen	Tu	Liu	Zui	Ju	Chang	Yuan	Jian	Gang	Diao	Tao	Chang";

    case 147:
      return "Lun	Guo	Ling	Pi	Lu	Li	Qiang	Pou	Juan	Min	Zui	Peng	An	Pi	Xian	Ya	Zhui	Lei	Ke	Kong	Ta	Kun	Du	Nei	Chui	Zi	Zheng	Ben	Nie	Zong	Chun	Tan	Ding	Qi	Qian	Zhui	Ji	Yu	Jin	Guan	Mao	Chang	Tian	Xi	Lian	Tao	Gu	Cuo	Shu	Zhen	Lu	Meng	Lu	Hua	Biao	Ga	Lai	Ken	Fang	Wu	Nai	Wan	Zan	Hu	De	Xian	Pian	Huo	Liang	Fa	Men	Kai	Ying	Di	Lian	Guo	Xian	Du	Tu	Wei	Zong	Fu	Rou	Ji	E	Jun	Chen	Ti	Zha	Hu	Yang	Duan	Xia	Yu	Keng	Sheng	Huang	Wei	Fu	Zhao	Cha	Qie	Shi	Hong	Kui	Tian	Mou	Qiao	Qiao	Hou	Tou	Cong	Huan	Ye	Min	Jian	Duan	Jian	Song	Kui	Hu	Xuan	Duo	Jie	Zhen	Bian	Zhong	Zi	Xiu	Ye	Mei	Pai	Ai	Jie	Qian	Mei	Suo	Da	Bang	Xia	Lian	Suo	Kai	Liu	Yao	Ye	Nou	Weng	Rong	Tang	Suo	Qiang	Li	Shuo	Chui	Bo	Pan	Da	Bi	Sang	Gang	Zi	Wu	Ying	Huang	Tiao	Liu	Kai	Sun	Sha	Sou	Wan	Hao	Zhen	Zhen	Lang	Yi	Yuan	Tang	Nie	Xi	Jia	Ge	Ma	Juan	Song	Zu	Suo	Xia	Feng	Wen	Na	Lu	Suo	Ou	Zu	Tuan	Xiu	Guan	Xuan	Lian	Shou	Ao	Man	Mo	Luo	Bi	Wei	Liu	Di	San	Zong	Yi	Lu	Ao	Keng	Qiang	Cui	Qi	Chang	Tang	Man	Yong	Chan	Feng	Jing	Biao	Shu	Lou	Xiu	Cong	Long	Zan	Jian	Cao	Li	Xia	Xi	Kang	Shuang	Beng	Zhang	Qian	Cheng	Lu	Hua	Ji	Pu	Hui	Qiang	Po	Lin	Se	Xiu	San	Cheng";

    case 148:
      return "Kui	Si	Liu	Nao	Huang	Pie	Sui	Fan	Qiao	Quan	Yang	Tang	Xiang	Jue	Jiao	Zun	Liao	Qie	Lao	Dui	Xin	Zan	Ji	Jian	Zhong	Deng	Ya	Ying	Dui	Jue	Nou	Zan	Pu	Tie	Fan	Cheng	Ding	Shan	Kai	Jian	Fei	Sui	Lu	Juan	Hui	Yu	Lian	Zhuo	Qiao	Jian	Zhuo	Lei	Bi	Tie	Huan	Ye	Duo	Guo	Dang	Ju	Fen	Da	Bei	Yi	Ai	Zong	Xun	Diao	Zhu	Heng	Zhui	Ji	Nie	He	Huo	Qing	Bin	Ying	Kui	Ning	Xu	Jian	Jian	Qian	Cha	Zhi	Mie	Li	Lei	Ji	Zuan	Kuang	Shang	Peng	La	Du	Shuo	Chuo	Lu	Biao	Bao	Lu	Xian	Kuan	Long	E	Lu	Xin	Jian	Lan	Bo	Jian	Yao	Chan	Xiang	Jian	Xi	Guan	Cang	Nie	Lei	Cuan	Qu	Pan	Luo	Zuan	Luan	Zao	Nie	Jue	Tang	Zhu	Lan	Jin	Ga	Yi	Zhen	Ding	Zhao	Po	Liao	Tu	Qian	Chuan	Shan	Sa	Fan	Diao	Men	Nu	Yang	Chai	Xing	Gai	Bu	Tai	Ju	Dun	Chao	Zhong	Na	Bei	Gang	Ban	Qian	Yao	Qin	Jun	Wu	Gou	Kang	Fang	Huo	Tou	Niu	Ba	Yu	Qian	Zheng	Qian	Gu	Bo	Ke	Po	Bu	Bo	Yue	Zuan	Mu	Tan	Jia	Dian	You	Tie	Bo	Ling	Shuo	Qian	Mao	Bao	Shi	Xuan	Ta	Bi	Ni	Pi	Duo	Xing	Kao	Lao	Er	Mang	Ya	You	Cheng	Jia	Ye	Nao	Zhi	Dang	Tong	Lu	Diao	Yin	Kai	Zha	Zhu	Xi	Ding	Diu	Xian	Hua	Quan	Sha	Ha	Diao	Ge	Ming	Zheng	Se	Jiao	Yi	Chan	Chong	Tang	An	Yin	Ru	Zhu	Lao	Pu	Wu	Lai	Te	Lian	Keng";

    case 149:
      return "Xiao	Suo	Li	Zeng	Chu	Guo	Gao	E	Xiu	Cuo	Lue	Feng	Xin	Liu	Kai	Jian	Rui	Ti	Lang	Qin	Ju	A	Qiang	Zhe	Nuo	Cuo	Mao	Ben	Qi	De	Ke	Kun	Chang	Xi	Gu	Luo	Chui	Zhui	Jin	Zhi	Xian	Juan	Huo	Pei	Tan	Ding	Jian	Ju	Meng	Zi	Qie	Ying	Kai	Qiang	Si	E	Cha	Qiao	Zhong	Duan	Sou	Huang	Huan	Ai	Du	Mei	Lou	Zi	Fei	Mei	Mo	Zhen	Bo	Ge	Nie	Tang	Juan	Nie	Na	Liu	Gao	Bang	Yi	Jia	Bin	Rong	Biao	Tang	Man	Luo	Beng	Yong	Jing	Di	Zu	Xuan	Liu	Chan	Jue	Liao	Pu	Lu	Dui	Lan	Pu	Cuan	Qiang	Deng	Huo	Lei	Huan	Zhuo	Lian	Yi	Cha	Biao	La	Chan	Xiang	Zhang	Chang	Jiu	Ao	Die	Qu	Liao	Mi	Zhang	Men	Ma	Shuan	Shan	Huo	Men	Yan	Bi	Han	Bi	Shan	Kai	Kang	Beng	Hong	Run	San	Xian	Xian	Jian	Min	Xia	Shui	Dou	Zha	Nao	Zhan	Peng	Xia	Ling	Bian	Bi	Run	Ai	Guan	Ge	Ge	Fa	Chu	Hong	Gui	Min	Se	Kun	Lang	Lu	Ting	Sha	Ju	Yue	Yue	Chan	Qu	Lin	Chang	Shai	Kun	Yan	Wen	Yan	E	Hun	Yu	Wen	Hong	Bao	Hong	Qu	Yao	Wen	Ban	An	Wei	Yin	Kuo	Que	Lan	Du	Quan	Feng	Tian	Nie	Ta	Kai	He	Que	Chuang	Guan	Dou	Qi	Kui	Tang	Guan	Piao	Kan	Xi	Hui	Chan	Pi	Dang	Huan	Ta	Wen	Ta	Men	Shuan	Shan	Yan	Han	Bi	Wen	Chuang	Run	Wei	Xian	Hong	Jian	Min	Kang	Men	Zha	Nao	Gui	Wen	Ta	Min	Lu	Kai";

    case 150:
      return "Fa	Ge	He	Kun	Jiu	Yue	Lang	Du	Yu	Yan	Chang	Xi	Wen	Hun	Yan	E	Chan	Lan	Qu	Hui	Kuo	Que	He	Tian	Da	Que	Han	Huan	Fu	Fu	Le	Dui	Xin	Qian	Wu	Gai	Zhi	Yin	Yang	Dou	E	Sheng	Ban	Pei	Keng	Yun	Ruan	Zhi	Pi	Jing	Fang	Yang	Yin	Zhen	Jie	Cheng	E	Qu	Di	Zu	Zuo	Dian	Ling	A	Tuo	Tuo	Bei	Bing	Fu	Ji	Lu	Long	Chen	Xing	Duo	Lou	Mo	Jiang	Shu	Duo	Xian	Er	Gui	Yu	Gai	Shan	Jun	Qiao	Xing	Chun	Fu	Bi	Xia	Shan	Sheng	Zhi	Pu	Dou	Yuan	Zhen	Chu	Xian	Dao	Nie	Yun	Xian	Pei	Fei	Zou	Yi	Dui	Lun	Yin	Ju	Chui	Chen	Pi	Ling	Tao	Xian	Lu	Sheng	Xian	Yin	Zhu	Yang	Reng	Xia	Chong	Yan	Yin	Shu	Di	Yu	Long	Wei	Wei	Nie	Dui	Sui	An	Huang	Jie	Sui	Yin	Gai	Yan	Hui	Ge	Yun	Wu	Kui	Ai	Xi	Tang	Ji	Zhang	Dao	Ao	Xi	Yin	Sa	Rao	Lin	Tui	Deng	Jiao	Sui	Sui	Ao	Xian	Fen	Ni	Er	Ji	Dao	Xi	Yin	Zhi	Hui	Long	Xi	Li	Li	Li	Zhui	Hu	Zhi	Sun	Juan	Nan	Yi	Que	Yan	Qin	Qian	Xiong	Ya	Ji	Gu	Huan	Zhi	Gou	Juan	Ci	Yong	Ju	Chu	Hu	Za	Luo	Yu	Chou	Diao	Sui	Han	Wo	Shuang	Guan	Chu	Za	Yong	Ji	Xi	Chou	Liu	Li	Nan	Xue	Za	Ji	Ji	Yu	Yu	Xue	Na	Fou	Se	Mu	Wen	Fen	Pang	Yun	Li	Chi	Yang	Ling	Lei	An	Bao	Wu	Dian	Dang	Hu	Wu	Diao";

    case 151:
      return "Xu	Ji	Mu	Chen	Xiao	Zha	Ting	Zhen	Pei	Mei	Ling	Qi	Zhou	Huo	Sha	Fei	Hong	Zhan	Yin	Ni	Zhu	Tun	Lin	Ling	Dong	Ying	Wu	Ling	Shuang	Ling	Xia	Hong	Yin	Mai	Mai	Yun	Liu	Meng	Bin	Wu	Wei	Kuo	Yin	Xi	Yi	Ai	Dan	Teng	San	Yu	Lu	Long	Dai	Ji	Pang	Yang	Ba	Pi	Wei	Feng	Xi	Ji	Mai	Meng	Meng	Lei	Li	Huo	Ai	Fei	Dai	Long	Ling	Ai	Feng	Li	Bao	He	He	He	Bing	Qing	Qing	Jing	Tian	Zhen	Jing	Cheng	Qing	Jing	Jing	Dian	Jing	Tian	Fei	Fei	Kao	Mi	Mian	Mian	Bao	Ye	Tian	Hui	Ye	Ge	Ding	Cha	Qian	Ren	Di	Du	Wu	Ren	Qin	Jin	Xue	Niu	Ba	Yin	Sa	Na	Mo	Zu	Da	Ban	Yi	Yao	Tao	Bei	Jie	Hong	Pao	Yang	Bing	Yin	Ge	Tao	Jie	Xie	An	An	Hen	Gong	Qia	Da	Qiao	Ting	Man	Ying	Sui	Tiao	Qiao	Xuan	Kong	Beng	Ta	Shang	Bing	Kuo	Ju	La	Xie	Rou	Bang	Eng	Qiu	Qiu	He	Qiao	Mu	Ju	Jian	Bian	Di	Jian	Wen	Tao	Gou	Ta	Bei	Xie	Pan	Ge	Bi	Kuo	Tang	Lou	Gui	Qiao	Xue	Ji	Jian	Jiang	Chan	Da	Hu	Xian	Qian	Du	Wa	Jian	Lan	Wei	Ren	Fu	Mei	Quan	Ge	Wei	Qiao	Han	Chang	Kuo	Rou	Yun	She	Wei	Ge	Bai	Tao	Gou	Yun	Gao	Bi	Wei	Sui	Du	Wa	Du	Wei	Ren	Fu	Han	Wei	Yun	Tao	Jiu	Jiu	Xian	Xie	Xian	Ji	Yin	Za	Yun	Shao	Le	Peng	Huang	Ying	Yun	Peng	An	Yin	Xiang";

    case 152:
      return "Hu	Ye	Ding	Qing	Kui	Xiang	Shun	Han	Xu	Yi	Xu	E	Song	Kui	Qi	Hang	Yu	Wan	Ban	Dun	Di	Dan	Pan	Po	Ling	Che	Jing	Lei	He	Qiao	E	E	Wei	Xie	Kuo	Shen	Yi	Yi	Hai	Dui	Yu	Ping	Lei	Fu	Jia	Tou	Hui	Kui	Jia	Luo	Ting	Cheng	Ying	Yun	Hu	Han	Jing	Tui	Tui	Pin	Lai	Tui	Zi	Zi	Chui	Ding	Lai	Tan	Han	Qian	Ke	Cui	Xuan	Qin	Yi	Sai	Ti	E	E	Yan	Wen	Kan	Yong	Zhuan	Yan	Xian	Xin	Yi	Yuan	Sang	Dian	Dian	Jiang	Kui	Lei	Lao	Piao	Wai	Man	Cu	Yao	Hao	Qiao	Gu	Xun	Yan	Hui	Chan	Ru	Meng	Bin	Xian	Pin	Lu	Lan	Nie	Quan	Ye	Ding	Qing	Han	Xiang	Shun	Xu	Xu	Wan	Gu	Dun	Qi	Ban	Song	Hang	Yu	Lu	Ling	Po	Jing	Jie	Jia	Ting	He	Ying	Jiong	Ke	Yi	Pin	Hui	Tui	Han	Ying	Ying	Ke	Ti	Yong	E	Zhuan	Yan	E	Nie	Man	Dian	Sang	Hao	Lei	Chan	Ru	Pin	Quan	Feng	Biao	Gua	Fu	Xia	Zhan	Biao	Sa	Ba	Tai	Lie	Gua	Xuan	Shao	Ju	Biao	Si	Wei	Yang	Yao	Sou	Kai	Sou	Fan	Liu	Xi	Liu	Piao	Piao	Liu	Biao	Biao	Biao	Liao	Biao	Se	Feng	Xiu	Feng	Yang	Zhan	Biao	Sa	Ju	Si	Sou	Yao	Liu	Piao	Biao	Biao	Fei	Fan	Fei	Fei	Shi	Shi	Can	Ji	Ding	Si	Tuo	Zhan	Sun	Xiang	Tun	Ren	Yu	Juan	Chi	Yin	Fan	Fan	Sun	Yin	Tou	Yi	Zuo	Bi	Jie	Tao	Bao	Ci	Tie	Si	Bao	Shi	Duo";

    case 153:
      return "Hai	Ren	Tian	Jiao	Jia	Bing	Yao	Tong	Ci	Xiang	Yang	Juan	Er	Yan	Le	Xi	Can	Bo	Nei	E	Bu	Jun	Dou	Su	Yu	Shi	Yao	Hun	Guo	Shi	Jian	Zhui	Bing	Xian	Bu	Ye	Tan	Fei	Zhang	Wei	Guan	E	Nuan	Yun	Hu	Huang	Tie	Hui	Jian	Hou	Ai	Tang	Fen	Wei	Gu	Cha	Song	Tang	Bo	Gao	Xi	Kui	Liu	Sou	Tao	Ye	Wen	Mo	Tang	Man	Bi	Yu	Xiu	Jin	San	Kui	Zhuan	Shan	Chi	Dan	Yi	Ji	Rao	Cheng	Yong	Tao	Wei	Xiang	Zhan	Fen	Hai	Meng	Yan	Mo	Chan	Xiang	Luo	Zan	Nang	Shi	Ding	Ji	Tuo	Tang	Tun	Xi	Ren	Yu	Chi	Fan	Yin	Jian	Shi	Bao	Si	Duo	Yi	Er	Rao	Xiang	He	Le	Jiao	Xi	Bing	Bo	Dou	E	Yu	Nei	Jun	Guo	Hun	Xian	Guan	Cha	Kui	Gu	Sou	Chan	Ye	Mo	Bo	Liu	Xiu	Jin	Man	San	Zhuan	Nang	Shou	Kui	Guo	Xiang	Fen	Bo	Ni	Bi	Bo	Tu	Han	Fei	Jian	An	Ai	Fu	Xian	Yun	Xin	Fen	Pin	Xin	Ma	Yu	Feng	Han	Di	Tuo	Zhe	Chi	Xun	Zhu	Zhi	Pei	Xin	Ri	Sa	Yun	Wen	Zhi	Dan	Lu	You	Bo	Bao	Jue	Tuo	Yi	Qu	Wen	Qu	Jiong	Po	Zhao	Yuan	Pei	Zhou	Ju	Zhu	Nu	Ju	Pi	Zang	Jia	Ling	Zhen	Tai	Fu	Yang	Shi	Bi	Tuo	Tuo	Si	Liu	Ma	Pian	Tao	Zhi	Rong	Teng	Dong	Xun	Quan	Shen	Jiong	Er	Hai	Bo	Zhu	Yin	Luo	Zhou	Dan	Hai	Liu	Ju	Song	Qin	Mang	Lang	Han	Tu	Xuan	Tui	Jun";

    case 154:
      return "E	Cheng	Xing	Ai	Lu	Zhui	Zhou	She	Pian	Kun	Tao	Lai	Zong	Ke	Qi	Qi	Yan	Fei	Sao	Yan	Ge	Yao	Wu	Pian	Cong	Pian	Qian	Fei	Huang	Qian	Huo	Yu	Ti	Quan	Xia	Zong	Kui	Rou	Si	Gua	Tuo	Gui	Sou	Qian	Cheng	Zhi	Liu	Peng	Teng	Xi	Cao	Du	Yan	Yuan	Zou	Sao	Shan	Qi	Zhi	Shuang	Lu	Xi	Luo	Zhang	Mo	Ao	Can	Biao	Cong	Qu	Bi	Zhi	Yu	Xu	Hua	Bo	Su	Xiao	Lin	Zhan	Dun	Liu	Tuo	Ceng	Dian	Jiao	Tie	Yan	Luo	Zhan	Jing	Yi	Ye	Tuo	Pin	Zhou	Yan	Long	Lu	Teng	Xiang	Ji	Shuang	Ju	Xi	Huan	Li	Biao	Ma	Yu	Tuo	Xun	Chi	Qu	Ri	Bo	Lu	Zang	Shi	Si	Fu	Ju	Zou	Zhu	Tuo	Nu	Jia	Yi	Dai	Xiao	Ma	Yin	Jiao	Hua	Luo	Hai	Pian	Biao	Li	Cheng	Yan	Xing	Qin	Jun	Qi	Qi	Ke	Zhui	Zong	Su	Can	Pian	Zhi	Kui	Sao	Wu	Ao	Liu	Qian	Shan	Biao	Luo	Cong	Chan	Zhou	Ji	Shuang	Xiang	Gu	Wei	Wei	Wei	Yu	Gan	Yi	Ang	Tou	Jie	Bao	Bei	Ci	Ti	Di	Ku	Hai	Qiao	Hou	Kua	Ge	Tui	Geng	Pian	Bi	Ke	Qia	Yu	Sui	Lou	Bo	Xiao	Bang	Bo	Ci	Kuan	Bin	Mo	Liao	Lou	Xiao	Du	Zang	Sui	Ti	Bin	Kuan	Lu	Gao	Gao	Qiao	Kao	Qiao	Lao	Sao	Biao	Kun	Kun	Di	Fang	Xiu	Ran	Mao	Dan	Kun	Bin	Fa	Tiao	Pi	Zi	Fa	Ran	Ti	Bao	Bi	Mao	Fu	Er	Rong	Qu	Gong	Xiu	Kuo	Ji	Peng	Zhua	Shao	Suo";

    case 155:
      return "Ti	Li	Bin	Zong	Di	Peng	Song	Zheng	Quan	Zong	Shun	Jian	Tuo	Hu	La	Jiu	Qi	Lian	Zhen	Bin	Peng	Ma	San	Man	Man	Seng	Xu	Lie	Qian	Qian	Nang	Huan	Kuo	Ning	Bin	Lie	Rang	Dou	Dou	Nao	Hong	Xi	Dou	Han	Dou	Dou	Jiu	Chang	Yu	Yu	Ge	Yan	Fu	Qin	Gui	Zong	Liu	Gui	Shang	Yu	Gui	Mei	Ji	Qi	Ga	Kui	Hun	Ba	Po	Mei	Xu	Yan	Xiao	Liang	Yu	Tui	Qi	Wang	Liang	Wei	Gan	Chi	Piao	Bi	Mo	Ji	Xu	Chou	Yan	Zhan	Yu	Dao	Ren	Jie	Ba	Hong	Tuo	Diao	Ji	Xu	E	E	Sha	Hang	Tun	Mo	Jie	Shen	Ban	Yuan	Pi	Lu	Wen	Hu	Lu	Za	Fang	Fen	Na	You	Pian	Mo	He	Xia	Qu	Han	Pi	Ling	Tuo	Bo	Qiu	Ping	Fu	Bi	Ci	Wei	Ju	Diao	Ba	You	Gun	Pi	Nian	Xing	Tai	Bao	Fu	Zha	Ju	Gu	Shi	Dong	Dai	Ta	Jie	Shu	Hou	Xiang	Er	An	Wei	Zhao	Zhu	Yin	Lie	Luo	Tong	Ti	Yi	Bing	Wei	Jiao	Ku	Gui	Xian	Ge	Hui	Lao	Fu	Kao	Xiu	Duo	Jun	Ti	Mian	Shao	Zha	Suo	Qin	Yu	Nei	Zhe	Gun	Geng	Su	Wu	Qiu	Shan	Pu	Huan	Tiao	Li	Sha	Sha	Kao	Meng	Cheng	Li	Zou	Xi	Yong	Shen	Zi	Qi	Zheng	Xiang	Nei	Chun	Ji	Diao	Qie	Gu	Zhou	Dong	Lai	Fei	Ni	Yi	Kun	Lu	Jiu	Chang	Jing	Lun	Ling	Zou	Li	Meng	Zong	Zhi	Nian	Hu	Yu	Di	Shi	Shen	Huan	Ti	Hou	Xing	Zhu	La	Zong	Zei	Bian	Bian";

    case 156:
      return "Huan	Quan	Zei	Wei	Wei	Yu	Chun	Rou	Die	Huang	Lian	Yan	Qiu	Qiu	Jian	Bi	E	Yang	Fu	Sai	Gan	Xia	Tuo	Hu	Shi	Ruo	Xuan	Wen	Qian	Hao	Wu	Fang	Sao	Liu	Ma	Shi	Shi	Guan	Zi	Teng	Ta	Yao	E	Yong	Qian	Qi	Wen	Ruo	Shen	Lian	Ao	Le	Hui	Min	Ji	Tiao	Qu	Jian	Shen	Man	Xi	Qiu	Biao	Ji	Ji	Zhu	Jiang	Xiu	Zhuan	Yong	Zhang	Kang	Xue	Bie	Yu	Qu	Xiang	Bo	Jiao	Xun	Su	Huang	Zun	Shan	Shan	Fan	Gui	Lin	Xun	Miao	Xi	Zeng	Xiang	Fen	Guan	Hou	Kuai	Zei	Sao	Zhan	Gan	Gui	Ying	Li	Chang	Lei	Shu	Ai	Ru	Ji	Xu	Hu	Shu	Li	Lie	Li	Mie	Zhen	Xiang	E	Lu	Guan	Li	Xian	Yu	Dao	Ji	You	Tun	Lu	Fang	Ba	He	Ba	Ping	Nian	Lu	You	Zha	Fu	Ba	Bao	Hou	Pi	Tai	Gui	Jie	Kao	Wei	Er	Tong	Zei	Hou	Kuai	Ji	Jiao	Xian	Zha	Xiang	Xun	Geng	Li	Lian	Jian	Li	Shi	Tiao	Gun	Sha	Huan	Jun	Ji	Yong	Qing	Ling	Qi	Zou	Fei	Kun	Chang	Gu	Ni	Nian	Diao	Jing	Shen	Shi	Zi	Fen	Die	Bi	Chang	Ti	Wen	Wei	Sai	E	Qiu	Fu	Huang	Quan	Jiang	Bian	Sao	Ao	Qi	Ta	Guan	Yao	Pang	Jian	Le	Biao	Xue	Bie	Man	Min	Yong	Wei	Xi	Gui	Shan	Lin	Zun	Hu	Gan	Li	Zhan	Guan	Niao	Yi	Fu	Li	Jiu	Bu	Yan	Fu	Diao	Ji	Feng	Ru	Gan	Shi	Feng	Ming	Bao	Yuan	Zhi	Hu	Qin	Fu	Ban	Wen	Jian	Shi	Yu";

    case 157:
      return "Fou	Yao	Jue	Jue	Pi	Huan	Zhen	Bao	Yan	Ya	Zheng	Fang	Feng	Wen	Ou	Dai	Ge	Ru	Ling	Mie	Fu	Tuo	Min	Li	Bian	Zhi	Ge	Yuan	Ci	Qu	Xiao	Chi	Dan	Ju	Yao	Gu	Zhong	Yu	Yang	Yu	Ya	Tie	Yu	Tian	Ying	Dui	Wu	Er	Gua	Ai	Zhi	Yan	Heng	Xiao	Jia	Lie	Zhu	Yang	Ti	Hong	Luo	Ru	Mou	Ge	Ren	Jiao	Xiu	Zhou	Chi	Luo	Heng	Nian	E	Luan	Jia	Ji	Tu	Huan	Tuo	Bu	Wu	Juan	Yu	Bo	Jun	Jun	Bi	Xi	Jun	Ju	Tu	Jing	Ti	E	E	Kuang	Hu	Wu	Shen	Lai	Jiao	Pan	Lu	Pi	Shu	Fu	An	Zhuo	Peng	Qin	Qian	Bei	Diao	Lu	Que	Jian	Ju	Tu	Ya	Yuan	Qi	Li	Ye	Zhui	Kong	Duo	Kun	Sheng	Qi	Jing	Yi	Yi	Jing	Zi	Lai	Dong	Qi	Chun	Geng	Ju	Jue	Yi	Zun	Ji	Shu	Ying	Chi	Miao	Rou	An	Qiu	Ti	Hu	Ti	E	Jie	Mao	Fu	Chun	Tu	Yan	He	Yuan	Pian	Kun	Mei	Hu	Ying	Chuan	Wu	Ju	Dong	Cang	Fang	He	Ying	Yuan	Xian	Weng	Shi	He	Chu	Tang	Xia	Ruo	Liu	Ji	Gu	Jian	Sun	Han	Ci	Ci	Yi	Yao	Yan	Ji	Li	Tian	Kou	Ti	Ti	Yi	Tu	Ma	Xiao	Gao	Tian	Chen	Ji	Tuan	Zhe	Ao	Yao	Yi	Ou	Chi	Zhi	Liu	Yong	Lu	Bi	Shuang	Zhuo	Yu	Wu	Jue	Yin	Ti	Si	Jiao	Yi	Hua	Bi	Ying	Su	Huang	Fan	Jiao	Liao	Yan	Gao	Jiu	Xian	Xian	Tu	Mai	Zun	Yu	Ying	Lu	Tuan	Xian	Xue	Yi	Pi";

    case 158:
      return "Shu	Luo	Xi	Yi	Ji	Ze	Yu	Zhan	Ye	Yang	Pi	Ning	Hu	Mi	Ying	Meng	Di	Yue	Yu	Lei	Bu	Lu	He	Long	Shuang	Yue	Ying	Guan	Qu	Li	Luan	Niao	Jiu	Ji	Yuan	Ming	Shi	Ou	Ya	Cang	Bao	Zhen	Gu	Dong	Lu	Ya	Xiao	Yang	Ling	Chi	Qu	Yuan	Xue	Tuo	Si	Zhi	Er	Gua	Xiu	Heng	Zhou	Ge	Luan	Hong	Wu	Bo	Li	Juan	Gu	E	Yu	Xian	Ti	Wu	Que	Miao	An	Kun	Bei	Peng	Qian	Chun	Geng	Yuan	Su	Hu	He	E	Gu	Qiu	Ci	Mei	Wu	Yi	Yao	Weng	Liu	Ji	Yi	Jian	He	Yi	Ying	Zhe	Liu	Liao	Jiao	Jiu	Yu	Lu	Huan	Zhan	Ying	Hu	Meng	Guan	Shuang	Lu	Jin	Ling	Jian	Xian	Cuo	Jian	Jian	Yan	Cuo	Lu	You	Cu	Ji	Pao	Cu	Pao	Zhu	Jun	Zhu	Jian	Mi	Mi	Yu	Liu	Chen	Jun	Lin	Ni	Qi	Lu	Jiu	Jun	Jing	Li	Xiang	Xian	Jia	Mi	Li	She	Zhang	Lin	Jing	Qi	Ling	Yan	Cu	Mai	Mai	He	Chao	Fu	Mian	Mian	Fu	Pao	Qu	Qu	Mou	Fu	Xian	Lai	Qu	Mian	Chi	Feng	Fu	Qu	Mian	Ma	Me	Mo	Hui	Mo	Zou	Nun	Fen	Huang	Huang	Jin	Guang	Tian	Tou	Hong	Hua	Kuang	Hong	Shu	Li	Nian	Chi	Hei	Hei	Yi	Qian	Dan	Xi	Tun	Mo	Mo	Qian	Dai	Chu	You	Dian	Yi	Xia	Yan	Qu	Mei	Yan	Qing	Yue	Li	Dang	Du	Can	Yan	Yan	Yan	Dan	An	Zhen	Dai	Can	Yi	Mei	Zhan	Yan	Du	Lu	Zhi	Fen	Fu	Fu	Mian	Mian	Yuan";

    case 159:
      return "Cu	Qu	Chao	Wa	Zhu	Zhi	Meng	Ao	Bie	Tuo	Bi	Yuan	Chao	Tuo	Ding	Mi	Nai	Ding	Zi	Gu	Gu	Dong	Fen	Tao	Yuan	Pi	Chang	Gao	Qi	Yuan	Tang	Teng	Shu	Shu	Fen	Fei	Wen	Ba	Diao	Tuo	Zhong	Qu	Sheng	Shi	You	Shi	Ting	Wu	Ju	Jing	Hun	Ju	Yan	Tu	Si	Xi	Xian	Yan	Lei	Bi	Yao	Qiu	Han	Wu	Wu	Hou	Xie	E	Zha	Xiu	Weng	Zha	Nong	Nang	Qi	Zhai	Ji	Zi	Ji	Ji	Qi	Ji	Chi	Chen	Chen	He	Ya	Yin	Xie	Bao	Ze	Xie	Chai	Chi	Yan	Ju	Tiao	Ling	Ling	Chu	Quan	Xie	Ken	Nie	Jiu	Yao	Chuo	Yun	Yu	Chu	Yi	Ni	Ze	Zou	Qu	Yun	Yan	Ou	E	Wo	Yi	Ci	Zou	Dian	Chu	Jin	Ya	Chi	Chen	He	Yin	Ju	Ling	Bao	Tiao	Zi	Ken	Yu	Chuo	Qu	Wo	Long	Pang	Gong	Pang	Yan	Long	Long	Gong	Kan	Da	Ling	Da	Long	Gong	Kan	Gui	Qiu	Bie	Gui	Yue	Chui	He	Jue	Xie	Yu	Soeng	Syu	Zeoi	Gan	Jan	Gon	Mong	Ji	Jik	Mou		Sei	Fu	Cam																Shan				Zang	Ce	Wu	Zi	Hei	Liang	Gang	Ta	Mai	Zau				Ge	Dan																						Ao	Tian	Ni";

    case 160:
      return "it	ix	i	ip	iet	iex	ie	iep	at	ax	a	ap	uox	uo	uop	ot	ox	o	op	ex	e	w	bit	bix	bi	bip	biet	biex	bie	biep	bat	bax	ba	bap	buox	buo	buop	bot	box	bo	bop	bex	be	bep	but	bux	bu	bup	burx	bur	byt	byx	by	byp	byrx	byr	pit	pix	pi	pip	piex	pie	piep	pat	pax	pa	pap	puox	puo	puop	pot	pox	po	pop	put	pux	pu	pup	purx	pur	pyt	pyx	py	pyp	pyrx	pyr	bbit	bbix	bbi	bbip	bbiet	bbiex	bbie	bbiep	bbat	bbax	bba	bbap	bbuox	bbuo	bbuop	bbot	bbox	bbo	bbop	bbex	bbe	bbep	bbut	bbux	bbu	bbup	bburx	bbur	bbyt	bbyx	bby	bbyp	nbit	nbix	nbi	nbip	nbiex	nbie	nbiep	nbat	nbax	nba	nbap	nbot	nbox	nbo	nbop	nbut	nbux	nbu	nbup	nburx	nbur	nbyt	nbyx	nby	nbyp	nbyrx	nbyr	hmit	hmix	hmi	hmip	hmiex	hmie	hmiep	hmat	hmax	hma	hmap	hmuox	hmuo	hmuop	hmot	hmox	hmo	hmop	hmut	hmux	hmu	hmup	hmurx	hmur	hmyx	hmy	hmyp	hmyrx	hmyr	mit	mix	mi	mip	miex	mie	miep	mat	max	ma	map	muot	muox	muo	muop	mot	mox	mo	mop	mex	me	mut	mux	mu	mup	murx	mur	myt	myx	my	myp	fit	fix	fi	fip	fat	fax	fa	fap	fox	fo	fop	fut	fux	fu	fup	furx	fur	fyt	fyx	fy	fyp	vit	vix	vi	vip	viet	viex	vie	viep	vat	vax	va	vap	vot	vox	vo	vop	vex	vep	vut	vux	vu	vup	vurx	vur	vyt	vyx	vy	vyp	vyrx	vyr";

    case 161:
      return "dit	dix	di	dip	diex	die	diep	dat	dax	da	dap	duox	duo	dot	dox	do	dop	dex	de	dep	dut	dux	du	dup	durx	dur	tit	tix	ti	tip	tiex	tie	tiep	tat	tax	ta	tap	tuot	tuox	tuo	tuop	tot	tox	to	top	tex	te	tep	tut	tux	tu	tup	turx	tur	ddit	ddix	ddi	ddip	ddiex	ddie	ddiep	ddat	ddax	dda	ddap	dduox	dduo	dduop	ddot	ddox	ddo	ddop	ddex	dde	ddep	ddut	ddux	ddu	ddup	ddurx	ddur	ndit	ndix	ndi	ndip	ndiex	ndie	ndat	ndax	nda	ndap	ndot	ndox	ndo	ndop	ndex	nde	ndep	ndut	ndux	ndu	ndup	ndurx	ndur	hnit	hnix	hni	hnip	hniet	hniex	hnie	hniep	hnat	hnax	hna	hnap	hnuox	hnuo	hnot	hnox	hnop	hnex	hne	hnep	hnut	nit	nix	ni	nip	niex	nie	niep	nax	na	nap	nuox	nuo	nuop	not	nox	no	nop	nex	ne	nep	nut	nux	nu	nup	nurx	nur	hlit	hlix	hli	hlip	hliex	hlie	hliep	hlat	hlax	hla	hlap	hluox	hluo	hluop	hlox	hlo	hlop	hlex	hle	hlep	hlut	hlux	hlu	hlup	hlurx	hlur	hlyt	hlyx	hly	hlyp	hlyrx	hlyr	lit	lix	li	lip	liet	liex	lie	liep	lat	lax	la	lap	luot	luox	luo	luop	lot	lox	lo	lop	lex	le	lep	lut	lux	lu	lup	lurx	lur	lyt	lyx	ly	lyp	lyrx	lyr	git	gix	gi	gip	giet	giex	gie	giep	gat	gax	ga	gap	guot	guox	guo	guop	got	gox	go	gop	get	gex	ge	gep	gut	gux	gu	gup	gurx	gur	kit	kix	ki	kip	kiex	kie	kiep	kat";

    case 162:
      return "kax	ka	kap	kuox	kuo	kuop	kot	kox	ko	kop	ket	kex	ke	kep	kut	kux	ku	kup	kurx	kur	ggit	ggix	ggi	ggiex	ggie	ggiep	ggat	ggax	gga	ggap	gguot	gguox	gguo	gguop	ggot	ggox	ggo	ggop	gget	ggex	gge	ggep	ggut	ggux	ggu	ggup	ggurx	ggur	mgiex	mgie	mgat	mgax	mga	mgap	mguox	mguo	mguop	mgot	mgox	mgo	mgop	mgex	mge	mgep	mgut	mgux	mgu	mgup	mgurx	mgur	hxit	hxix	hxi	hxip	hxiet	hxiex	hxie	hxiep	hxat	hxax	hxa	hxap	hxuot	hxuox	hxuo	hxuop	hxot	hxox	hxo	hxop	hxex	hxe	hxep	ngiex	ngie	ngiep	ngat	ngax	nga	ngap	nguot	nguox	nguo	ngot	ngox	ngo	ngop	ngex	nge	ngep	hit	hiex	hie	hat	hax	ha	hap	huot	huox	huo	huop	hot	hox	ho	hop	hex	he	hep	wat	wax	wa	wap	wuox	wuo	wuop	wox	wo	wop	wex	we	wep	zit	zix	zi	zip	ziex	zie	ziep	zat	zax	za	zap	zuox	zuo	zuop	zot	zox	zo	zop	zex	ze	zep	zut	zux	zu	zup	zurx	zur	zyt	zyx	zy	zyp	zyrx	zyr	cit	cix	ci	cip	ciet	ciex	cie	ciep	cat	cax	ca	cap	cuox	cuo	cuop	cot	cox	co	cop	cex	ce	cep	cut	cux	cu	cup	curx	cur	cyt	cyx	cy	cyp	cyrx	cyr	zzit	zzix	zzi	zzip	zziet	zziex	zzie	zziep	zzat	zzax	zza	zzap	zzox	zzo	zzop	zzex	zze	zzep	zzux	zzu	zzup	zzurx	zzur	zzyt	zzyx	zzy	zzyp	zzyrx	zzyr	nzit	nzix	nzi	nzip	nziex	nzie	nziep	nzat	nzax	nza	nzap	nzuox	nzuo	nzox	nzop	nzex	nze	nzux	nzu";

    case 163:
      return "nzup	nzurx	nzur	nzyt	nzyx	nzy	nzyp	nzyrx	nzyr	sit	six	si	sip	siex	sie	siep	sat	sax	sa	sap	suox	suo	suop	sot	sox	so	sop	sex	se	sep	sut	sux	su	sup	surx	sur	syt	syx	sy	syp	syrx	syr	ssit	ssix	ssi	ssip	ssiex	ssie	ssiep	ssat	ssax	ssa	ssap	ssot	ssox	sso	ssop	ssex	sse	ssep	ssut	ssux	ssu	ssup	ssyt	ssyx	ssy	ssyp	ssyrx	ssyr	zhat	zhax	zha	zhap	zhuox	zhuo	zhuop	zhot	zhox	zho	zhop	zhet	zhex	zhe	zhep	zhut	zhux	zhu	zhup	zhurx	zhur	zhyt	zhyx	zhy	zhyp	zhyrx	zhyr	chat	chax	cha	chap	chuot	chuox	chuo	chuop	chot	chox	cho	chop	chet	chex	che	chep	chux	chu	chup	churx	chur	chyt	chyx	chy	chyp	chyrx	chyr	rrax	rra	rruox	rruo	rrot	rrox	rro	rrop	rret	rrex	rre	rrep	rrut	rrux	rru	rrup	rrurx	rrur	rryt	rryx	rry	rryp	rryrx	rryr	nrat	nrax	nra	nrap	nrox	nro	nrop	nret	nrex	nre	nrep	nrut	nrux	nru	nrup	nrurx	nrur	nryt	nryx	nry	nryp	nryrx	nryr	shat	shax	sha	shap	shuox	shuo	shuop	shot	shox	sho	shop	shet	shex	she	shep	shut	shux	shu	shup	shurx	shur	shyt	shyx	shy	shyp	shyrx	shyr	rat	rax	ra	rap	ruox	ruo	ruop	rot	rox	ro	rop	rex	re	rep	rut	rux	ru	rup	rurx	rur	ryt	ryx	ry	ryp	ryrx	ryr	jit	jix	ji	jip	jiet	jiex	jie	jiep	juot	juox	juo	juop	jot	jox	jo	jop	jut	jux	ju	jup	jurx	jur	jyt	jyx	jy	jyp	jyrx	jyr	qit	qix	qi	qip";

    case 164:
      return "qiet	qiex	qie	qiep	quot	quox	quo	quop	qot	qox	qo	qop	qut	qux	qu	qup	qurx	qur	qyt	qyx	qy	qyp	qyrx	qyr	jjit	jjix	jji	jjip	jjiet	jjiex	jjie	jjiep	jjuox	jjuo	jjuop	jjot	jjox	jjo	jjop	jjut	jjux	jju	jjup	jjurx	jjur	jjyt	jjyx	jjy	jjyp	njit	njix	nji	njip	njiet	njiex	njie	njiep	njuox	njuo	njot	njox	njo	njop	njux	nju	njup	njurx	njur	njyt	njyx	njy	njyp	njyrx	njyr	nyit	nyix	nyi	nyip	nyiet	nyiex	nyie	nyiep	nyuox	nyuo	nyuop	nyot	nyox	nyo	nyop	nyut	nyux	nyu	nyup	xit	xix	xi	xip	xiet	xiex	xie	xiep	xuox	xuo	xot	xox	xo	xop	xyt	xyx	xy	xyp	xyrx	xyr	yit	yix	yi	yip	yiet	yiex	yie	yiep	yuot	yuox	yuo	yuop	yot	yox	yo	yop	yut	yux	yu	yup	yurx	yur	yyt	yyx	yy	yyp	yyrx	yyr				QOT	LI	KIT	NYIP	CYP	SSI	GGOP	GEP	MI	HXIT	LYR	BBUT	MOP	YO	PUT	HXUO	TAT	GA	ZUP	CYT	DDUR	BUR	GGUO	NYOP	TU	OP	JJUT	ZOT	PYT	HMO	YIT	VUR	SHY	VEP	ZA	JO	NZUP	JJY	GOT	JJIE	WO	DU	SHUR	LIE	CY	CUOP	CIP	HXOP	SHAT	ZUR	SHOP	CHE	ZZIET	NBIE	KE										b	p	ph	d	t	th	g	k	kh	j	c	ch	z	tz	ts	m	n	l	s	r	zh	ng	v	h	q	f	w	x	y	gh	a	ae	e	ew	i	o	u	uh	eu	oe	t	c	s	r	q	p	,	.";

    case 165:
      return "ee	een	hee	wee	ween	pee	bhee	bee	mbee	kpee	mgbee	gbee	fee	vee	tee	thee	dhee	dhhee	lee	ree	dee	ndee	see	shee	zee	zhee	cee	jee	njee	yee	kee	nggee	gee	mee	nee	nyee	i	in	hi	hin	wi	win	pi	bhi	bi	mbi	kpi	mgbi	gbi	fi	vi	ti	thi	dhi	dhhi	li	ri	di	ndi	si	shi	zi	zhi	ci	ji	nji	yi	ki	nggi	gi	mi	ni	nyi	a	an	ngan	ha	han	wa	wan	pa	bha	ba	mba	kpa	kpan	mgba	gba	fa	va	ta	tha	dha	dhha	la	ra	da	nda	sa	sha	za	zha	ca	ja	nja	ya	ka	kan	ngga	ga	ma	na	nya	oo	oon	hoo	woo	woon	poo	bhoo	boo	mboo	kpoo	mgboo	gboo	foo	voo	too	thoo	dhoo	dhhoo	loo	roo	doo	ndoo	soo	shoo	zoo	zhoo	coo	joo	njoo	yoo	koo	nggoo	goo	moo	noo	nyoo	u	un	hu	hun	wu	wun	pu	bhu	bu	mbu	kpu	mgbu	gbu	fu	vu	tu	thu	dhu	dhhu	lu	ru	du	ndu	su	shu	zu	zhu	cu	ju	nju	yu	ku	nggu	gu	mu	nu	nyu	o	on	ngon	ho	hon	wo	won	po	bho	bo	mbo	kpo	mgbo	gbo	gbon	fo	vo	to	tho	dho	dhho	lo	ro	do	ndo	so	sho	zo	zho	co	jo	njo	yo	ko	nggo	go	mo	no	nyo	e	en	ngen	he	hen	we	wen	pe	bhe	be	mbe	kpe	kpen	mgbe	gbe	gben	fe	ve	te	the	dhe	dhhe	le	re	de	nde	se	she	ze	zhe	ce";

    case 166:
      return "je	nje	ye	ke	ngge	nggen	ge	gen	me	ne	nye	ng	=	,	.	?	fa	ka	soo	feeng	keeng	ting	nii	bang	faa	taa	dang	doong	kung	tong	do-o	jong	0	1	2	3	4	5	6	7	8	9	ma	do																					Z	z	Dz	dz	Dz	dz	I	i	Dj	dj	U	u	O	o	'	'	Y	y	Ie	ie	Oi	oi	Ia	ia	E	e	O	o	Ie	ie	In	in	Ts	ts	Dg	dg	Lg	lg	Mg	mg	O	o	Oo	oo	Oo	oo	O	.	10000000	100000000	1000000000	*	ie	i	i	u	'	y	'	o	'	'	'	'	Dw	dw	Dzw	dzw	Zhw	zhw	Cch	cch	Dz	dz	T	t	Tw	tw	Tsw	tsw	Ts	ts	Tch	tch	Hw	hw	Shw	shw	Oo	oo	O	o	'	'	f	ie	A	Ka	U	Ku	E	Re	Te	O	Nyi	I	La	Pa	Rii	Rie	Lee	Mee	Taa	Ndaa	Njem	M	Suu	Mu	Shii	Si	Shux	Sux	Kye	Ket	Nue	Nu	Njue	Yoq	Shu	Yuq	Ya	Nsha	Kux	Pux	Nje	Nte	Pu	Wu	Pe	Fe	Ru	Lu	Mi	Ni	Rux	Re	Ken	Ngkwen	Ngga	Nga	Sho	Pue	Fu	Fom	Wa	Na	Li	Pi	Loq	Ko	Mben	Ren	Men	Ma	Ti	Ki	1	2	3	4	5	6	7	8	9	0	'	`	*	.	:	,	;	?";

    case 167:
      return "1	2	3	4	5	6	7	8	5	4	3	2	1	5	4	3	2	1	5	4	3	2	1	1	2	3	4	^	v	!	^	^	-	_	'	'	`	`	H	h	Tz	tz	3	3	4	4	4,	4,	F	S	Aa	aa	Ao	ao	Au	au	Av	av	Av	av	Ay	ay	C.	c.	K.	k.	K.	k.	K.	k.	L	l	L.	l.	O.	o.	O	o	Oo	oo	P.	p.	P.	p.	P.	p.	Q.	q.	Q.	q.	R	r	R.	r.	V.	v.	Vy	vy	Z	z	Th.	th.	Th.	th.	V	v	&	&	S.	s.	'	'	'	d.	l.	m.	n.	r.	R.	t.	s.	D	d	F	f	G	Ng	ng	Ll	ll	R	r	S	s	T	t	^	:	=	'	'	H	l	-	N	n	C	c	c	h	B	b	F	f	Ae	ae	Oe	oe	Ue	ue	G	g	K	k	N	n	R	r	S	s	H	E	G	L	I	Q	K	T	J	X	B	b	O	o	U	u	A	a	I	i	U	u			W	w	C	S	Z	D	d	S	s																																											H	h	I	H	oe	W	F	P	M	I	M'";

    case 168:
      return "a	i	i	u	e	o		k	kh	g	gh	ng	c	ch	j	jh	t	th	d	dh	t	th	d	dh	n	p	ph	b	bh	m	r	l	r	s	h	a	i	u	e	o	1	2	3	4					1/4	1/2	3/4	1/16	1/8	3/16	/4	-	Rs	'							k	kh	g	ng	c	ch	j	ny	t	th	d	n	p	ph	b	m	ts	tsh	dz	w	zh	z	-	y	r	l	sh	s	h	'	i	u	e	o	q	x	f	gg	ee	w	y	tt	tth	dd	nn	y''	sh'	h'	f''	r	r	^	@	@@	/	//									m	h	a	a	i	i	u	u	r	r	l	l	e	e	ai	o	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	l	h	a	i	i	u	u	r	r	l	l	e	e	ai	o	o	au		m									,	.	0	1	2	3	4	5	6	7	8	9							0	1	2	3	4	5	6	7	8	9	a	u	k	n	p	r	v	'	m	m	mm	m2	m3	m'	-	-	^	~	*	Om	a	a";

    case 169:
      return "0	1	2	3	4	5	6	7	8	9	k	kh	g	ng	s	sh	z	ny	t	ht	n	p	ph	m	d	b	r	y	l	w	th	h	v	c	a	o	i	o	u	e	u	e	o				'	,	k	g	ng	t	d	n	p	b	m	c	j	ny	s	r	l	y	w	h	mb	ngg	nd	nyj	'	i	u	e	ai	o	au	eu	ea	ng	n	r	h													*	dm	db	ds	dj	lg	lkk	ld	ltt	lm	lb	lpp	lv	ls	lj	lk	mg	md	ms	bst	bk	bh	ssb	l	h	jjh	tt	ph	hs	qq				m	ng	r	h	a	i	i	i	u	re	le	lo	e	ai	o	k	q	kh	g	gh	ng	c	ch	j	jny	jh	ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	r	l	w	s	s	s	h	'	a	o	i	i	u	u	e	ai	e	re	y	r		<	>	@	@@	@@@	*	:	,	.	|	||	{	}		-	0	1	2	3	4	5	6	7	8	9					^	~	gh	ch	jh	n	bh		-	n	f	g	gh	j	jh	d	dh	n	0	1	2	3	4	5	6	7	8	9	l	d	dh	b	bh";

    case 170:
      return "a	i	u	e	ai	o	k	kh	g	gh	ng	ng	c	ch	j	jh	ny	ny	nj	t	th	d	dh	n	n	nd	p	pp	ph	b	bh	m	m	mb	y	r	l	w	x	s	h	a	i	i	ei	u	e	o	ai	au	u	y	r	l	w										k	g	ng	ng	c	t	n	p	y	r	l	x	m	h			0	1	2	3	4	5	6	7	8	9			*	,	;	.	g	c	ch	j	jh	n	t	th	d	dh	dh	n	s	h	h	f	-	x	z	r	oay	'n	hm	!	1	2	r				ch	sh	k	k	kh	kh	x	x	g	g	ng	ng	ch	ch	chh	chh	s	s	ny	ny	d	d	t	t	th	th	n	n	b	b	p	p	ph	ph	f	f	m	m	y	y	r	r	l	l	v	v	h	h			a	aa	i	ue	u	ae	o	oa	ia	uea	ua	aue	ai	an	am																													Kon	Nueng	-	<	>	e	o	ch	n	t	th	d	dh	n	s	s	i	u	ai	au	au	,	?	*	-	-	h";

    case 171:
      return "	thu	thi	tha	thie	th	tho			dhu	dhi	dha	dhie	dh	dho			dzu	dzi	dza	dzie	dz	dzo										ch'e	ch'u	ch'i	ch'a	ch'ie	ch'	ch'o		b'e	b'u	b'i	b'a	b'ie	b'	b'o		a	ae	e	e	e	f	g	l	l	l	m	n	ng	o	o	o	oe	oe	oe	oo	oo	r	R	r	rr	r	rr	r	r	sh	u	u	ui	ui	u	x	x	x	x	x	x	x	y	^	h	l	l	u	ia	ie	oe	uo	a	O	dz	ts	r	w	<	>					a	e	i	o	u	v	ga	ka	ge	gi	go	gu	gv	ha	he	hi	ho	hu	hv	la	le	li	lo	lu	lv	ma	me	mi	mo	mu	na	hna	nah	ne	ni	no	nu	nv	qua	que	qui	quo	quu	quv	sa	s	se	si	so	su	sv	da	ta	de	te	di	ti	do	du	dv	dla	tla	tle	tli	tlo	tlu	tlv	tsa	tse	tsi	tso	tsu	tsv	wa	we	wi	wo	wu	wv	ya	k	s	l	m	p	n	c	t	kh	n	th	w	y	h	u	i	ph	a	g	jh	r	b	j	d	gh	dh	bh	k	l	m	p	n	t	n	i	o	i	a	e	ou	u	ei	m	.					0	1	2	3	4	5	6	7	8	9";

    case 172:
      return "Ga	Gag	Gakk	Gags	Gan	Ganj	Ganh	Gad	Gal	Galg	Galm	Galb	Gals	Galt	Galp	Galh	Gam	Gab	Gabs	Gas	Gass	Gang	Gaj	Gach	Gak	Gat	Gap	Gah	Gae	Gaeg	Gaekk	Gaegs	Gaen	Gaenj	Gaenh	Gaed	Gael	Gaelg	Gaelm	Gaelb	Gaels	Gaelt	Gaelp	Gaelh	Gaem	Gaeb	Gaebs	Gaes	Gaess	Gaeng	Gaej	Gaech	Gaek	Gaet	Gaep	Gaeh	Gya	Gyag	Gyakk	Gyags	Gyan	Gyanj	Gyanh	Gyad	Gyal	Gyalg	Gyalm	Gyalb	Gyals	Gyalt	Gyalp	Gyalh	Gyam	Gyab	Gyabs	Gyas	Gyass	Gyang	Gyaj	Gyach	Gyak	Gyat	Gyap	Gyah	Gyae	Gyaeg	Gyaekk	Gyaegs	Gyaen	Gyaenj	Gyaenh	Gyaed	Gyael	Gyaelg	Gyaelm	Gyaelb	Gyaels	Gyaelt	Gyaelp	Gyaelh	Gyaem	Gyaeb	Gyaebs	Gyaes	Gyaess	Gyaeng	Gyaej	Gyaech	Gyaek	Gyaet	Gyaep	Gyaeh	Geo	Geog	Geokk	Geogs	Geon	Geonj	Geonh	Geod	Geol	Geolg	Geolm	Geolb	Geols	Geolt	Geolp	Geolh	Geom	Geob	Geobs	Geos	Geoss	Geong	Geoj	Geoch	Geok	Geot	Geop	Geoh	Ge	Geg	Gekk	Gegs	Gen	Genj	Genh	Ged	Gel	Gelg	Gelm	Gelb	Gels	Gelt	Gelp	Gelh	Gem	Geb	Gebs	Ges	Gess	Geng	Gej	Gech	Gek	Get	Gep	Geh	Gyeo	Gyeog	Gyeokk	Gyeogs	Gyeon	Gyeonj	Gyeonh	Gyeod	Gyeol	Gyeolg	Gyeolm	Gyeolb	Gyeols	Gyeolt	Gyeolp	Gyeolh	Gyeom	Gyeob	Gyeobs	Gyeos	Gyeoss	Gyeong	Gyeoj	Gyeoch	Gyeok	Gyeot	Gyeop	Gyeoh	Gye	Gyeg	Gyekk	Gyegs	Gyen	Gyenj	Gyenh	Gyed	Gyel	Gyelg	Gyelm	Gyelb	Gyels	Gyelt	Gyelp	Gyelh	Gyem	Gyeb	Gyebs	Gyes	Gyess	Gyeng	Gyej	Gyech	Gyek	Gyet	Gyep	Gyeh	Go	Gog	Gokk	Gogs	Gon	Gonj	Gonh	God	Gol	Golg	Golm	Golb	Gols	Golt	Golp	Golh	Gom	Gob	Gobs	Gos	Goss	Gong	Goj	Goch	Gok	Got	Gop	Goh	Gwa	Gwag	Gwakk	Gwags";

    case 173:
      return "Gwan	Gwanj	Gwanh	Gwad	Gwal	Gwalg	Gwalm	Gwalb	Gwals	Gwalt	Gwalp	Gwalh	Gwam	Gwab	Gwabs	Gwas	Gwass	Gwang	Gwaj	Gwach	Gwak	Gwat	Gwap	Gwah	Gwae	Gwaeg	Gwaekk	Gwaegs	Gwaen	Gwaenj	Gwaenh	Gwaed	Gwael	Gwaelg	Gwaelm	Gwaelb	Gwaels	Gwaelt	Gwaelp	Gwaelh	Gwaem	Gwaeb	Gwaebs	Gwaes	Gwaess	Gwaeng	Gwaej	Gwaech	Gwaek	Gwaet	Gwaep	Gwaeh	Goe	Goeg	Goekk	Goegs	Goen	Goenj	Goenh	Goed	Goel	Goelg	Goelm	Goelb	Goels	Goelt	Goelp	Goelh	Goem	Goeb	Goebs	Goes	Goess	Goeng	Goej	Goech	Goek	Goet	Goep	Goeh	Gyo	Gyog	Gyokk	Gyogs	Gyon	Gyonj	Gyonh	Gyod	Gyol	Gyolg	Gyolm	Gyolb	Gyols	Gyolt	Gyolp	Gyolh	Gyom	Gyob	Gyobs	Gyos	Gyoss	Gyong	Gyoj	Gyoch	Gyok	Gyot	Gyop	Gyoh	Gu	Gug	Gukk	Gugs	Gun	Gunj	Gunh	Gud	Gul	Gulg	Gulm	Gulb	Guls	Gult	Gulp	Gulh	Gum	Gub	Gubs	Gus	Guss	Gung	Guj	Guch	Guk	Gut	Gup	Guh	Gwo	Gwog	Gwokk	Gwogs	Gwon	Gwonj	Gwonh	Gwod	Gwol	Gwolg	Gwolm	Gwolb	Gwols	Gwolt	Gwolp	Gwolh	Gwom	Gwob	Gwobs	Gwos	Gwoss	Gwong	Gwoj	Gwoch	Gwok	Gwot	Gwop	Gwoh	Gwe	Gweg	Gwekk	Gwegs	Gwen	Gwenj	Gwenh	Gwed	Gwel	Gwelg	Gwelm	Gwelb	Gwels	Gwelt	Gwelp	Gwelh	Gwem	Gweb	Gwebs	Gwes	Gwess	Gweng	Gwej	Gwech	Gwek	Gwet	Gwep	Gweh	Gwi	Gwig	Gwikk	Gwigs	Gwin	Gwinj	Gwinh	Gwid	Gwil	Gwilg	Gwilm	Gwilb	Gwils	Gwilt	Gwilp	Gwilh	Gwim	Gwib	Gwibs	Gwis	Gwiss	Gwing	Gwij	Gwich	Gwik	Gwit	Gwip	Gwih	Gyu	Gyug	Gyukk	Gyugs	Gyun	Gyunj	Gyunh	Gyud	Gyul	Gyulg	Gyulm	Gyulb	Gyuls	Gyult	Gyulp	Gyulh	Gyum	Gyub	Gyubs	Gyus	Gyuss	Gyung	Gyuj	Gyuch	Gyuk	Gyut	Gyup	Gyuh	Geu	Geug	Geukk	Geugs	Geun	Geunj	Geunh	Geud";

    case 174:
      return "Geul	Geulg	Geulm	Geulb	Geuls	Geult	Geulp	Geulh	Geum	Geub	Geubs	Geus	Geuss	Geung	Geuj	Geuch	Geuk	Geut	Geup	Geuh	Gui	Guig	Guikk	Guigs	Guin	Guinj	Guinh	Guid	Guil	Guilg	Guilm	Guilb	Guils	Guilt	Guilp	Guilh	Guim	Guib	Guibs	Guis	Guiss	Guing	Guij	Guich	Guik	Guit	Guip	Guih	Gi	Gig	Gikk	Gigs	Gin	Ginj	Ginh	Gid	Gil	Gilg	Gilm	Gilb	Gils	Gilt	Gilp	Gilh	Gim	Gib	Gibs	Gis	Giss	Ging	Gij	Gich	Gik	Git	Gip	Gih	Kka	Kkag	Kkakk	Kkags	Kkan	Kkanj	Kkanh	Kkad	Kkal	Kkalg	Kkalm	Kkalb	Kkals	Kkalt	Kkalp	Kkalh	Kkam	Kkab	Kkabs	Kkas	Kkass	Kkang	Kkaj	Kkach	Kkak	Kkat	Kkap	Kkah	Kkae	Kkaeg	Kkaekk	Kkaegs	Kkaen	Kkaenj	Kkaenh	Kkaed	Kkael	Kkaelg	Kkaelm	Kkaelb	Kkaels	Kkaelt	Kkaelp	Kkaelh	Kkaem	Kkaeb	Kkaebs	Kkaes	Kkaess	Kkaeng	Kkaej	Kkaech	Kkaek	Kkaet	Kkaep	Kkaeh	Kkya	Kkyag	Kkyakk	Kkyags	Kkyan	Kkyanj	Kkyanh	Kkyad	Kkyal	Kkyalg	Kkyalm	Kkyalb	Kkyals	Kkyalt	Kkyalp	Kkyalh	Kkyam	Kkyab	Kkyabs	Kkyas	Kkyass	Kkyang	Kkyaj	Kkyach	Kkyak	Kkyat	Kkyap	Kkyah	Kkyae	Kkyaeg	Kkyaekk	Kkyaegs	Kkyaen	Kkyaenj	Kkyaenh	Kkyaed	Kkyael	Kkyaelg	Kkyaelm	Kkyaelb	Kkyaels	Kkyaelt	Kkyaelp	Kkyaelh	Kkyaem	Kkyaeb	Kkyaebs	Kkyaes	Kkyaess	Kkyaeng	Kkyaej	Kkyaech	Kkyaek	Kkyaet	Kkyaep	Kkyaeh	Kkeo	Kkeog	Kkeokk	Kkeogs	Kkeon	Kkeonj	Kkeonh	Kkeod	Kkeol	Kkeolg	Kkeolm	Kkeolb	Kkeols	Kkeolt	Kkeolp	Kkeolh	Kkeom	Kkeob	Kkeobs	Kkeos	Kkeoss	Kkeong	Kkeoj	Kkeoch	Kkeok	Kkeot	Kkeop	Kkeoh	Kke	Kkeg	Kkekk	Kkegs	Kken	Kkenj	Kkenh	Kked	Kkel	Kkelg	Kkelm	Kkelb	Kkels	Kkelt	Kkelp	Kkelh	Kkem	Kkeb	Kkebs	Kkes	Kkess	Kkeng	Kkej	Kkech	Kkek	Kket	Kkep	Kkeh	Kkyeo	Kkyeog	Kkyeokk	Kkyeogs	Kkyeon	Kkyeonj	Kkyeonh	Kkyeod	Kkyeol	Kkyeolg	Kkyeolm	Kkyeolb";

    case 175:
      return "Kkyeols	Kkyeolt	Kkyeolp	Kkyeolh	Kkyeom	Kkyeob	Kkyeobs	Kkyeos	Kkyeoss	Kkyeong	Kkyeoj	Kkyeoch	Kkyeok	Kkyeot	Kkyeop	Kkyeoh	Kkye	Kkyeg	Kkyekk	Kkyegs	Kkyen	Kkyenj	Kkyenh	Kkyed	Kkyel	Kkyelg	Kkyelm	Kkyelb	Kkyels	Kkyelt	Kkyelp	Kkyelh	Kkyem	Kkyeb	Kkyebs	Kkyes	Kkyess	Kkyeng	Kkyej	Kkyech	Kkyek	Kkyet	Kkyep	Kkyeh	Kko	Kkog	Kkokk	Kkogs	Kkon	Kkonj	Kkonh	Kkod	Kkol	Kkolg	Kkolm	Kkolb	Kkols	Kkolt	Kkolp	Kkolh	Kkom	Kkob	Kkobs	Kkos	Kkoss	Kkong	Kkoj	Kkoch	Kkok	Kkot	Kkop	Kkoh	Kkwa	Kkwag	Kkwakk	Kkwags	Kkwan	Kkwanj	Kkwanh	Kkwad	Kkwal	Kkwalg	Kkwalm	Kkwalb	Kkwals	Kkwalt	Kkwalp	Kkwalh	Kkwam	Kkwab	Kkwabs	Kkwas	Kkwass	Kkwang	Kkwaj	Kkwach	Kkwak	Kkwat	Kkwap	Kkwah	Kkwae	Kkwaeg	Kkwaekk	Kkwaegs	Kkwaen	Kkwaenj	Kkwaenh	Kkwaed	Kkwael	Kkwaelg	Kkwaelm	Kkwaelb	Kkwaels	Kkwaelt	Kkwaelp	Kkwaelh	Kkwaem	Kkwaeb	Kkwaebs	Kkwaes	Kkwaess	Kkwaeng	Kkwaej	Kkwaech	Kkwaek	Kkwaet	Kkwaep	Kkwaeh	Kkoe	Kkoeg	Kkoekk	Kkoegs	Kkoen	Kkoenj	Kkoenh	Kkoed	Kkoel	Kkoelg	Kkoelm	Kkoelb	Kkoels	Kkoelt	Kkoelp	Kkoelh	Kkoem	Kkoeb	Kkoebs	Kkoes	Kkoess	Kkoeng	Kkoej	Kkoech	Kkoek	Kkoet	Kkoep	Kkoeh	Kkyo	Kkyog	Kkyokk	Kkyogs	Kkyon	Kkyonj	Kkyonh	Kkyod	Kkyol	Kkyolg	Kkyolm	Kkyolb	Kkyols	Kkyolt	Kkyolp	Kkyolh	Kkyom	Kkyob	Kkyobs	Kkyos	Kkyoss	Kkyong	Kkyoj	Kkyoch	Kkyok	Kkyot	Kkyop	Kkyoh	Kku	Kkug	Kkukk	Kkugs	Kkun	Kkunj	Kkunh	Kkud	Kkul	Kkulg	Kkulm	Kkulb	Kkuls	Kkult	Kkulp	Kkulh	Kkum	Kkub	Kkubs	Kkus	Kkuss	Kkung	Kkuj	Kkuch	Kkuk	Kkut	Kkup	Kkuh	Kkwo	Kkwog	Kkwokk	Kkwogs	Kkwon	Kkwonj	Kkwonh	Kkwod	Kkwol	Kkwolg	Kkwolm	Kkwolb	Kkwols	Kkwolt	Kkwolp	Kkwolh	Kkwom	Kkwob	Kkwobs	Kkwos	Kkwoss	Kkwong	Kkwoj	Kkwoch	Kkwok	Kkwot	Kkwop	Kkwoh	Kkwe	Kkweg	Kkwekk	Kkwegs	Kkwen	Kkwenj	Kkwenh	Kkwed	Kkwel	Kkwelg	Kkwelm	Kkwelb	Kkwels	Kkwelt	Kkwelp	Kkwelh";

    case 176:
      return "Kkwem	Kkweb	Kkwebs	Kkwes	Kkwess	Kkweng	Kkwej	Kkwech	Kkwek	Kkwet	Kkwep	Kkweh	Kkwi	Kkwig	Kkwikk	Kkwigs	Kkwin	Kkwinj	Kkwinh	Kkwid	Kkwil	Kkwilg	Kkwilm	Kkwilb	Kkwils	Kkwilt	Kkwilp	Kkwilh	Kkwim	Kkwib	Kkwibs	Kkwis	Kkwiss	Kkwing	Kkwij	Kkwich	Kkwik	Kkwit	Kkwip	Kkwih	Kkyu	Kkyug	Kkyukk	Kkyugs	Kkyun	Kkyunj	Kkyunh	Kkyud	Kkyul	Kkyulg	Kkyulm	Kkyulb	Kkyuls	Kkyult	Kkyulp	Kkyulh	Kkyum	Kkyub	Kkyubs	Kkyus	Kkyuss	Kkyung	Kkyuj	Kkyuch	Kkyuk	Kkyut	Kkyup	Kkyuh	Kkeu	Kkeug	Kkeukk	Kkeugs	Kkeun	Kkeunj	Kkeunh	Kkeud	Kkeul	Kkeulg	Kkeulm	Kkeulb	Kkeuls	Kkeult	Kkeulp	Kkeulh	Kkeum	Kkeub	Kkeubs	Kkeus	Kkeuss	Kkeung	Kkeuj	Kkeuch	Kkeuk	Kkeut	Kkeup	Kkeuh	Kkui	Kkuig	Kkuikk	Kkuigs	Kkuin	Kkuinj	Kkuinh	Kkuid	Kkuil	Kkuilg	Kkuilm	Kkuilb	Kkuils	Kkuilt	Kkuilp	Kkuilh	Kkuim	Kkuib	Kkuibs	Kkuis	Kkuiss	Kkuing	Kkuij	Kkuich	Kkuik	Kkuit	Kkuip	Kkuih	Kki	Kkig	Kkikk	Kkigs	Kkin	Kkinj	Kkinh	Kkid	Kkil	Kkilg	Kkilm	Kkilb	Kkils	Kkilt	Kkilp	Kkilh	Kkim	Kkib	Kkibs	Kkis	Kkiss	Kking	Kkij	Kkich	Kkik	Kkit	Kkip	Kkih	Na	Nag	Nakk	Nags	Nan	Nanj	Nanh	Nad	Nal	Nalg	Nalm	Nalb	Nals	Nalt	Nalp	Nalh	Nam	Nab	Nabs	Nas	Nass	Nang	Naj	Nach	Nak	Nat	Nap	Nah	Nae	Naeg	Naekk	Naegs	Naen	Naenj	Naenh	Naed	Nael	Naelg	Naelm	Naelb	Naels	Naelt	Naelp	Naelh	Naem	Naeb	Naebs	Naes	Naess	Naeng	Naej	Naech	Naek	Naet	Naep	Naeh	Nya	Nyag	Nyakk	Nyags	Nyan	Nyanj	Nyanh	Nyad	Nyal	Nyalg	Nyalm	Nyalb	Nyals	Nyalt	Nyalp	Nyalh	Nyam	Nyab	Nyabs	Nyas	Nyass	Nyang	Nyaj	Nyach	Nyak	Nyat	Nyap	Nyah	Nyae	Nyaeg	Nyaekk	Nyaegs	Nyaen	Nyaenj	Nyaenh	Nyaed	Nyael	Nyaelg	Nyaelm	Nyaelb	Nyaels	Nyaelt	Nyaelp	Nyaelh	Nyaem	Nyaeb	Nyaebs	Nyaes";

    case 177:
      return "Nyaess	Nyaeng	Nyaej	Nyaech	Nyaek	Nyaet	Nyaep	Nyaeh	Neo	Neog	Neokk	Neogs	Neon	Neonj	Neonh	Neod	Neol	Neolg	Neolm	Neolb	Neols	Neolt	Neolp	Neolh	Neom	Neob	Neobs	Neos	Neoss	Neong	Neoj	Neoch	Neok	Neot	Neop	Neoh	Ne	Neg	Nekk	Negs	Nen	Nenj	Nenh	Ned	Nel	Nelg	Nelm	Nelb	Nels	Nelt	Nelp	Nelh	Nem	Neb	Nebs	Nes	Ness	Neng	Nej	Nech	Nek	Net	Nep	Neh	Nyeo	Nyeog	Nyeokk	Nyeogs	Nyeon	Nyeonj	Nyeonh	Nyeod	Nyeol	Nyeolg	Nyeolm	Nyeolb	Nyeols	Nyeolt	Nyeolp	Nyeolh	Nyeom	Nyeob	Nyeobs	Nyeos	Nyeoss	Nyeong	Nyeoj	Nyeoch	Nyeok	Nyeot	Nyeop	Nyeoh	Nye	Nyeg	Nyekk	Nyegs	Nyen	Nyenj	Nyenh	Nyed	Nyel	Nyelg	Nyelm	Nyelb	Nyels	Nyelt	Nyelp	Nyelh	Nyem	Nyeb	Nyebs	Nyes	Nyess	Nyeng	Nyej	Nyech	Nyek	Nyet	Nyep	Nyeh	No	Nog	Nokk	Nogs	Non	Nonj	Nonh	Nod	Nol	Nolg	Nolm	Nolb	Nols	Nolt	Nolp	Nolh	Nom	Nob	Nobs	Nos	Noss	Nong	Noj	Noch	Nok	Not	Nop	Noh	Nwa	Nwag	Nwakk	Nwags	Nwan	Nwanj	Nwanh	Nwad	Nwal	Nwalg	Nwalm	Nwalb	Nwals	Nwalt	Nwalp	Nwalh	Nwam	Nwab	Nwabs	Nwas	Nwass	Nwang	Nwaj	Nwach	Nwak	Nwat	Nwap	Nwah	Nwae	Nwaeg	Nwaekk	Nwaegs	Nwaen	Nwaenj	Nwaenh	Nwaed	Nwael	Nwaelg	Nwaelm	Nwaelb	Nwaels	Nwaelt	Nwaelp	Nwaelh	Nwaem	Nwaeb	Nwaebs	Nwaes	Nwaess	Nwaeng	Nwaej	Nwaech	Nwaek	Nwaet	Nwaep	Nwaeh	Noe	Noeg	Noekk	Noegs	Noen	Noenj	Noenh	Noed	Noel	Noelg	Noelm	Noelb	Noels	Noelt	Noelp	Noelh	Noem	Noeb	Noebs	Noes	Noess	Noeng	Noej	Noech	Noek	Noet	Noep	Noeh	Nyo	Nyog	Nyokk	Nyogs	Nyon	Nyonj	Nyonh	Nyod	Nyol	Nyolg	Nyolm	Nyolb	Nyols	Nyolt	Nyolp	Nyolh	Nyom	Nyob	Nyobs	Nyos	Nyoss	Nyong	Nyoj	Nyoch";

    case 178:
      return "Nyok	Nyot	Nyop	Nyoh	Nu	Nug	Nukk	Nugs	Nun	Nunj	Nunh	Nud	Nul	Nulg	Nulm	Nulb	Nuls	Nult	Nulp	Nulh	Num	Nub	Nubs	Nus	Nuss	Nung	Nuj	Nuch	Nuk	Nut	Nup	Nuh	Nwo	Nwog	Nwokk	Nwogs	Nwon	Nwonj	Nwonh	Nwod	Nwol	Nwolg	Nwolm	Nwolb	Nwols	Nwolt	Nwolp	Nwolh	Nwom	Nwob	Nwobs	Nwos	Nwoss	Nwong	Nwoj	Nwoch	Nwok	Nwot	Nwop	Nwoh	Nwe	Nweg	Nwekk	Nwegs	Nwen	Nwenj	Nwenh	Nwed	Nwel	Nwelg	Nwelm	Nwelb	Nwels	Nwelt	Nwelp	Nwelh	Nwem	Nweb	Nwebs	Nwes	Nwess	Nweng	Nwej	Nwech	Nwek	Nwet	Nwep	Nweh	Nwi	Nwig	Nwikk	Nwigs	Nwin	Nwinj	Nwinh	Nwid	Nwil	Nwilg	Nwilm	Nwilb	Nwils	Nwilt	Nwilp	Nwilh	Nwim	Nwib	Nwibs	Nwis	Nwiss	Nwing	Nwij	Nwich	Nwik	Nwit	Nwip	Nwih	Nyu	Nyug	Nyukk	Nyugs	Nyun	Nyunj	Nyunh	Nyud	Nyul	Nyulg	Nyulm	Nyulb	Nyuls	Nyult	Nyulp	Nyulh	Nyum	Nyub	Nyubs	Nyus	Nyuss	Nyung	Nyuj	Nyuch	Nyuk	Nyut	Nyup	Nyuh	Neu	Neug	Neukk	Neugs	Neun	Neunj	Neunh	Neud	Neul	Neulg	Neulm	Neulb	Neuls	Neult	Neulp	Neulh	Neum	Neub	Neubs	Neus	Neuss	Neung	Neuj	Neuch	Neuk	Neut	Neup	Neuh	Nui	Nuig	Nuikk	Nuigs	Nuin	Nuinj	Nuinh	Nuid	Nuil	Nuilg	Nuilm	Nuilb	Nuils	Nuilt	Nuilp	Nuilh	Nuim	Nuib	Nuibs	Nuis	Nuiss	Nuing	Nuij	Nuich	Nuik	Nuit	Nuip	Nuih	Ni	Nig	Nikk	Nigs	Nin	Ninj	Ninh	Nid	Nil	Nilg	Nilm	Nilb	Nils	Nilt	Nilp	Nilh	Nim	Nib	Nibs	Nis	Niss	Ning	Nij	Nich	Nik	Nit	Nip	Nih	Da	Dag	Dakk	Dags	Dan	Danj	Danh	Dad	Dal	Dalg	Dalm	Dalb	Dals	Dalt	Dalp	Dalh	Dam	Dab	Dabs	Das	Dass	Dang	Daj	Dach	Dak	Dat	Dap	Dah";

    case 179:
      return "Dae	Daeg	Daekk	Daegs	Daen	Daenj	Daenh	Daed	Dael	Daelg	Daelm	Daelb	Daels	Daelt	Daelp	Daelh	Daem	Daeb	Daebs	Daes	Daess	Daeng	Daej	Daech	Daek	Daet	Daep	Daeh	Dya	Dyag	Dyakk	Dyags	Dyan	Dyanj	Dyanh	Dyad	Dyal	Dyalg	Dyalm	Dyalb	Dyals	Dyalt	Dyalp	Dyalh	Dyam	Dyab	Dyabs	Dyas	Dyass	Dyang	Dyaj	Dyach	Dyak	Dyat	Dyap	Dyah	Dyae	Dyaeg	Dyaekk	Dyaegs	Dyaen	Dyaenj	Dyaenh	Dyaed	Dyael	Dyaelg	Dyaelm	Dyaelb	Dyaels	Dyaelt	Dyaelp	Dyaelh	Dyaem	Dyaeb	Dyaebs	Dyaes	Dyaess	Dyaeng	Dyaej	Dyaech	Dyaek	Dyaet	Dyaep	Dyaeh	Deo	Deog	Deokk	Deogs	Deon	Deonj	Deonh	Deod	Deol	Deolg	Deolm	Deolb	Deols	Deolt	Deolp	Deolh	Deom	Deob	Deobs	Deos	Deoss	Deong	Deoj	Deoch	Deok	Deot	Deop	Deoh	De	Deg	Dekk	Degs	Den	Denj	Denh	Ded	Del	Delg	Delm	Delb	Dels	Delt	Delp	Delh	Dem	Deb	Debs	Des	Dess	Deng	Dej	Dech	Dek	Det	Dep	Deh	Dyeo	Dyeog	Dyeokk	Dyeogs	Dyeon	Dyeonj	Dyeonh	Dyeod	Dyeol	Dyeolg	Dyeolm	Dyeolb	Dyeols	Dyeolt	Dyeolp	Dyeolh	Dyeom	Dyeob	Dyeobs	Dyeos	Dyeoss	Dyeong	Dyeoj	Dyeoch	Dyeok	Dyeot	Dyeop	Dyeoh	Dye	Dyeg	Dyekk	Dyegs	Dyen	Dyenj	Dyenh	Dyed	Dyel	Dyelg	Dyelm	Dyelb	Dyels	Dyelt	Dyelp	Dyelh	Dyem	Dyeb	Dyebs	Dyes	Dyess	Dyeng	Dyej	Dyech	Dyek	Dyet	Dyep	Dyeh	Do	Dog	Dokk	Dogs	Don	Donj	Donh	Dod	Dol	Dolg	Dolm	Dolb	Dols	Dolt	Dolp	Dolh	Dom	Dob	Dobs	Dos	Doss	Dong	Doj	Doch	Dok	Dot	Dop	Doh	Dwa	Dwag	Dwakk	Dwags	Dwan	Dwanj	Dwanh	Dwad	Dwal	Dwalg	Dwalm	Dwalb	Dwals	Dwalt	Dwalp	Dwalh	Dwam	Dwab	Dwabs	Dwas	Dwass	Dwang	Dwaj	Dwach	Dwak	Dwat	Dwap	Dwah	Dwae	Dwaeg	Dwaekk	Dwaegs";

    case 180:
      return "Dwaen	Dwaenj	Dwaenh	Dwaed	Dwael	Dwaelg	Dwaelm	Dwaelb	Dwaels	Dwaelt	Dwaelp	Dwaelh	Dwaem	Dwaeb	Dwaebs	Dwaes	Dwaess	Dwaeng	Dwaej	Dwaech	Dwaek	Dwaet	Dwaep	Dwaeh	Doe	Doeg	Doekk	Doegs	Doen	Doenj	Doenh	Doed	Doel	Doelg	Doelm	Doelb	Doels	Doelt	Doelp	Doelh	Doem	Doeb	Doebs	Does	Doess	Doeng	Doej	Doech	Doek	Doet	Doep	Doeh	Dyo	Dyog	Dyokk	Dyogs	Dyon	Dyonj	Dyonh	Dyod	Dyol	Dyolg	Dyolm	Dyolb	Dyols	Dyolt	Dyolp	Dyolh	Dyom	Dyob	Dyobs	Dyos	Dyoss	Dyong	Dyoj	Dyoch	Dyok	Dyot	Dyop	Dyoh	Du	Dug	Dukk	Dugs	Dun	Dunj	Dunh	Dud	Dul	Dulg	Dulm	Dulb	Duls	Dult	Dulp	Dulh	Dum	Dub	Dubs	Dus	Duss	Dung	Duj	Duch	Duk	Dut	Dup	Duh	Dwo	Dwog	Dwokk	Dwogs	Dwon	Dwonj	Dwonh	Dwod	Dwol	Dwolg	Dwolm	Dwolb	Dwols	Dwolt	Dwolp	Dwolh	Dwom	Dwob	Dwobs	Dwos	Dwoss	Dwong	Dwoj	Dwoch	Dwok	Dwot	Dwop	Dwoh	Dwe	Dweg	Dwekk	Dwegs	Dwen	Dwenj	Dwenh	Dwed	Dwel	Dwelg	Dwelm	Dwelb	Dwels	Dwelt	Dwelp	Dwelh	Dwem	Dweb	Dwebs	Dwes	Dwess	Dweng	Dwej	Dwech	Dwek	Dwet	Dwep	Dweh	Dwi	Dwig	Dwikk	Dwigs	Dwin	Dwinj	Dwinh	Dwid	Dwil	Dwilg	Dwilm	Dwilb	Dwils	Dwilt	Dwilp	Dwilh	Dwim	Dwib	Dwibs	Dwis	Dwiss	Dwing	Dwij	Dwich	Dwik	Dwit	Dwip	Dwih	Dyu	Dyug	Dyukk	Dyugs	Dyun	Dyunj	Dyunh	Dyud	Dyul	Dyulg	Dyulm	Dyulb	Dyuls	Dyult	Dyulp	Dyulh	Dyum	Dyub	Dyubs	Dyus	Dyuss	Dyung	Dyuj	Dyuch	Dyuk	Dyut	Dyup	Dyuh	Deu	Deug	Deukk	Deugs	Deun	Deunj	Deunh	Deud	Deul	Deulg	Deulm	Deulb	Deuls	Deult	Deulp	Deulh	Deum	Deub	Deubs	Deus	Deuss	Deung	Deuj	Deuch	Deuk	Deut	Deup	Deuh	Dui	Duig	Duikk	Duigs	Duin	Duinj	Duinh	Duid";

    case 181:
      return "Duil	Duilg	Duilm	Duilb	Duils	Duilt	Duilp	Duilh	Duim	Duib	Duibs	Duis	Duiss	Duing	Duij	Duich	Duik	Duit	Duip	Duih	Di	Dig	Dikk	Digs	Din	Dinj	Dinh	Did	Dil	Dilg	Dilm	Dilb	Dils	Dilt	Dilp	Dilh	Dim	Dib	Dibs	Dis	Diss	Ding	Dij	Dich	Dik	Dit	Dip	Dih	Tta	Ttag	Ttakk	Ttags	Ttan	Ttanj	Ttanh	Ttad	Ttal	Ttalg	Ttalm	Ttalb	Ttals	Ttalt	Ttalp	Ttalh	Ttam	Ttab	Ttabs	Ttas	Ttass	Ttang	Ttaj	Ttach	Ttak	Ttat	Ttap	Ttah	Ttae	Ttaeg	Ttaekk	Ttaegs	Ttaen	Ttaenj	Ttaenh	Ttaed	Ttael	Ttaelg	Ttaelm	Ttaelb	Ttaels	Ttaelt	Ttaelp	Ttaelh	Ttaem	Ttaeb	Ttaebs	Ttaes	Ttaess	Ttaeng	Ttaej	Ttaech	Ttaek	Ttaet	Ttaep	Ttaeh	Ttya	Ttyag	Ttyakk	Ttyags	Ttyan	Ttyanj	Ttyanh	Ttyad	Ttyal	Ttyalg	Ttyalm	Ttyalb	Ttyals	Ttyalt	Ttyalp	Ttyalh	Ttyam	Ttyab	Ttyabs	Ttyas	Ttyass	Ttyang	Ttyaj	Ttyach	Ttyak	Ttyat	Ttyap	Ttyah	Ttyae	Ttyaeg	Ttyaekk	Ttyaegs	Ttyaen	Ttyaenj	Ttyaenh	Ttyaed	Ttyael	Ttyaelg	Ttyaelm	Ttyaelb	Ttyaels	Ttyaelt	Ttyaelp	Ttyaelh	Ttyaem	Ttyaeb	Ttyaebs	Ttyaes	Ttyaess	Ttyaeng	Ttyaej	Ttyaech	Ttyaek	Ttyaet	Ttyaep	Ttyaeh	Tteo	Tteog	Tteokk	Tteogs	Tteon	Tteonj	Tteonh	Tteod	Tteol	Tteolg	Tteolm	Tteolb	Tteols	Tteolt	Tteolp	Tteolh	Tteom	Tteob	Tteobs	Tteos	Tteoss	Tteong	Tteoj	Tteoch	Tteok	Tteot	Tteop	Tteoh	Tte	Tteg	Ttekk	Ttegs	Tten	Ttenj	Ttenh	Tted	Ttel	Ttelg	Ttelm	Ttelb	Ttels	Ttelt	Ttelp	Ttelh	Ttem	Tteb	Ttebs	Ttes	Ttess	Tteng	Ttej	Ttech	Ttek	Ttet	Ttep	Tteh	Ttyeo	Ttyeog	Ttyeokk	Ttyeogs	Ttyeon	Ttyeonj	Ttyeonh	Ttyeod	Ttyeol	Ttyeolg	Ttyeolm	Ttyeolb	Ttyeols	Ttyeolt	Ttyeolp	Ttyeolh	Ttyeom	Ttyeob	Ttyeobs	Ttyeos	Ttyeoss	Ttyeong	Ttyeoj	Ttyeoch	Ttyeok	Ttyeot	Ttyeop	Ttyeoh	Ttye	Ttyeg	Ttyekk	Ttyegs	Ttyen	Ttyenj	Ttyenh	Ttyed	Ttyel	Ttyelg	Ttyelm	Ttyelb";

    case 182:
      return "Ttyels	Ttyelt	Ttyelp	Ttyelh	Ttyem	Ttyeb	Ttyebs	Ttyes	Ttyess	Ttyeng	Ttyej	Ttyech	Ttyek	Ttyet	Ttyep	Ttyeh	Tto	Ttog	Ttokk	Ttogs	Tton	Ttonj	Ttonh	Ttod	Ttol	Ttolg	Ttolm	Ttolb	Ttols	Ttolt	Ttolp	Ttolh	Ttom	Ttob	Ttobs	Ttos	Ttoss	Ttong	Ttoj	Ttoch	Ttok	Ttot	Ttop	Ttoh	Ttwa	Ttwag	Ttwakk	Ttwags	Ttwan	Ttwanj	Ttwanh	Ttwad	Ttwal	Ttwalg	Ttwalm	Ttwalb	Ttwals	Ttwalt	Ttwalp	Ttwalh	Ttwam	Ttwab	Ttwabs	Ttwas	Ttwass	Ttwang	Ttwaj	Ttwach	Ttwak	Ttwat	Ttwap	Ttwah	Ttwae	Ttwaeg	Ttwaekk	Ttwaegs	Ttwaen	Ttwaenj	Ttwaenh	Ttwaed	Ttwael	Ttwaelg	Ttwaelm	Ttwaelb	Ttwaels	Ttwaelt	Ttwaelp	Ttwaelh	Ttwaem	Ttwaeb	Ttwaebs	Ttwaes	Ttwaess	Ttwaeng	Ttwaej	Ttwaech	Ttwaek	Ttwaet	Ttwaep	Ttwaeh	Ttoe	Ttoeg	Ttoekk	Ttoegs	Ttoen	Ttoenj	Ttoenh	Ttoed	Ttoel	Ttoelg	Ttoelm	Ttoelb	Ttoels	Ttoelt	Ttoelp	Ttoelh	Ttoem	Ttoeb	Ttoebs	Ttoes	Ttoess	Ttoeng	Ttoej	Ttoech	Ttoek	Ttoet	Ttoep	Ttoeh	Ttyo	Ttyog	Ttyokk	Ttyogs	Ttyon	Ttyonj	Ttyonh	Ttyod	Ttyol	Ttyolg	Ttyolm	Ttyolb	Ttyols	Ttyolt	Ttyolp	Ttyolh	Ttyom	Ttyob	Ttyobs	Ttyos	Ttyoss	Ttyong	Ttyoj	Ttyoch	Ttyok	Ttyot	Ttyop	Ttyoh	Ttu	Ttug	Ttukk	Ttugs	Ttun	Ttunj	Ttunh	Ttud	Ttul	Ttulg	Ttulm	Ttulb	Ttuls	Ttult	Ttulp	Ttulh	Ttum	Ttub	Ttubs	Ttus	Ttuss	Ttung	Ttuj	Ttuch	Ttuk	Ttut	Ttup	Ttuh	Ttwo	Ttwog	Ttwokk	Ttwogs	Ttwon	Ttwonj	Ttwonh	Ttwod	Ttwol	Ttwolg	Ttwolm	Ttwolb	Ttwols	Ttwolt	Ttwolp	Ttwolh	Ttwom	Ttwob	Ttwobs	Ttwos	Ttwoss	Ttwong	Ttwoj	Ttwoch	Ttwok	Ttwot	Ttwop	Ttwoh	Ttwe	Ttweg	Ttwekk	Ttwegs	Ttwen	Ttwenj	Ttwenh	Ttwed	Ttwel	Ttwelg	Ttwelm	Ttwelb	Ttwels	Ttwelt	Ttwelp	Ttwelh	Ttwem	Ttweb	Ttwebs	Ttwes	Ttwess	Ttweng	Ttwej	Ttwech	Ttwek	Ttwet	Ttwep	Ttweh	Ttwi	Ttwig	Ttwikk	Ttwigs	Ttwin	Ttwinj	Ttwinh	Ttwid	Ttwil	Ttwilg	Ttwilm	Ttwilb	Ttwils	Ttwilt	Ttwilp	Ttwilh";

    case 183:
      return "Ttwim	Ttwib	Ttwibs	Ttwis	Ttwiss	Ttwing	Ttwij	Ttwich	Ttwik	Ttwit	Ttwip	Ttwih	Ttyu	Ttyug	Ttyukk	Ttyugs	Ttyun	Ttyunj	Ttyunh	Ttyud	Ttyul	Ttyulg	Ttyulm	Ttyulb	Ttyuls	Ttyult	Ttyulp	Ttyulh	Ttyum	Ttyub	Ttyubs	Ttyus	Ttyuss	Ttyung	Ttyuj	Ttyuch	Ttyuk	Ttyut	Ttyup	Ttyuh	Tteu	Tteug	Tteukk	Tteugs	Tteun	Tteunj	Tteunh	Tteud	Tteul	Tteulg	Tteulm	Tteulb	Tteuls	Tteult	Tteulp	Tteulh	Tteum	Tteub	Tteubs	Tteus	Tteuss	Tteung	Tteuj	Tteuch	Tteuk	Tteut	Tteup	Tteuh	Ttui	Ttuig	Ttuikk	Ttuigs	Ttuin	Ttuinj	Ttuinh	Ttuid	Ttuil	Ttuilg	Ttuilm	Ttuilb	Ttuils	Ttuilt	Ttuilp	Ttuilh	Ttuim	Ttuib	Ttuibs	Ttuis	Ttuiss	Ttuing	Ttuij	Ttuich	Ttuik	Ttuit	Ttuip	Ttuih	Tti	Ttig	Ttikk	Ttigs	Ttin	Ttinj	Ttinh	Ttid	Ttil	Ttilg	Ttilm	Ttilb	Ttils	Ttilt	Ttilp	Ttilh	Ttim	Ttib	Ttibs	Ttis	Ttiss	Tting	Ttij	Ttich	Ttik	Ttit	Ttip	Ttih	La	Lag	Lakk	Lags	Lan	Lanj	Lanh	Lad	Lal	Lalg	Lalm	Lalb	Lals	Lalt	Lalp	Lalh	Lam	Lab	Labs	Las	Lass	Lang	Laj	Lach	Lak	Lat	Lap	Lah	Lae	Laeg	Laekk	Laegs	Laen	Laenj	Laenh	Laed	Lael	Laelg	Laelm	Laelb	Laels	Laelt	Laelp	Laelh	Laem	Laeb	Laebs	Laes	Laess	Laeng	Laej	Laech	Laek	Laet	Laep	Laeh	Lya	Lyag	Lyakk	Lyags	Lyan	Lyanj	Lyanh	Lyad	Lyal	Lyalg	Lyalm	Lyalb	Lyals	Lyalt	Lyalp	Lyalh	Lyam	Lyab	Lyabs	Lyas	Lyass	Lyang	Lyaj	Lyach	Lyak	Lyat	Lyap	Lyah	Lyae	Lyaeg	Lyaekk	Lyaegs	Lyaen	Lyaenj	Lyaenh	Lyaed	Lyael	Lyaelg	Lyaelm	Lyaelb	Lyaels	Lyaelt	Lyaelp	Lyaelh	Lyaem	Lyaeb	Lyaebs	Lyaes	Lyaess	Lyaeng	Lyaej	Lyaech	Lyaek	Lyaet	Lyaep	Lyaeh	Leo	Leog	Leokk	Leogs	Leon	Leonj	Leonh	Leod	Leol	Leolg	Leolm	Leolb	Leols	Leolt	Leolp	Leolh	Leom	Leob	Leobs	Leos";

    case 184:
      return "Leoss	Leong	Leoj	Leoch	Leok	Leot	Leop	Leoh	Le	Leg	Lekk	Legs	Len	Lenj	Lenh	Led	Lel	Lelg	Lelm	Lelb	Lels	Lelt	Lelp	Lelh	Lem	Leb	Lebs	Les	Less	Leng	Lej	Lech	Lek	Let	Lep	Leh	Lyeo	Lyeog	Lyeokk	Lyeogs	Lyeon	Lyeonj	Lyeonh	Lyeod	Lyeol	Lyeolg	Lyeolm	Lyeolb	Lyeols	Lyeolt	Lyeolp	Lyeolh	Lyeom	Lyeob	Lyeobs	Lyeos	Lyeoss	Lyeong	Lyeoj	Lyeoch	Lyeok	Lyeot	Lyeop	Lyeoh	Lye	Lyeg	Lyekk	Lyegs	Lyen	Lyenj	Lyenh	Lyed	Lyel	Lyelg	Lyelm	Lyelb	Lyels	Lyelt	Lyelp	Lyelh	Lyem	Lyeb	Lyebs	Lyes	Lyess	Lyeng	Lyej	Lyech	Lyek	Lyet	Lyep	Lyeh	Lo	Log	Lokk	Logs	Lon	Lonj	Lonh	Lod	Lol	Lolg	Lolm	Lolb	Lols	Lolt	Lolp	Lolh	Lom	Lob	Lobs	Los	Loss	Long	Loj	Loch	Lok	Lot	Lop	Loh	Lwa	Lwag	Lwakk	Lwags	Lwan	Lwanj	Lwanh	Lwad	Lwal	Lwalg	Lwalm	Lwalb	Lwals	Lwalt	Lwalp	Lwalh	Lwam	Lwab	Lwabs	Lwas	Lwass	Lwang	Lwaj	Lwach	Lwak	Lwat	Lwap	Lwah	Lwae	Lwaeg	Lwaekk	Lwaegs	Lwaen	Lwaenj	Lwaenh	Lwaed	Lwael	Lwaelg	Lwaelm	Lwaelb	Lwaels	Lwaelt	Lwaelp	Lwaelh	Lwaem	Lwaeb	Lwaebs	Lwaes	Lwaess	Lwaeng	Lwaej	Lwaech	Lwaek	Lwaet	Lwaep	Lwaeh	Loe	Loeg	Loekk	Loegs	Loen	Loenj	Loenh	Loed	Loel	Loelg	Loelm	Loelb	Loels	Loelt	Loelp	Loelh	Loem	Loeb	Loebs	Loes	Loess	Loeng	Loej	Loech	Loek	Loet	Loep	Loeh	Lyo	Lyog	Lyokk	Lyogs	Lyon	Lyonj	Lyonh	Lyod	Lyol	Lyolg	Lyolm	Lyolb	Lyols	Lyolt	Lyolp	Lyolh	Lyom	Lyob	Lyobs	Lyos	Lyoss	Lyong	Lyoj	Lyoch	Lyok	Lyot	Lyop	Lyoh	Lu	Lug	Lukk	Lugs	Lun	Lunj	Lunh	Lud	Lul	Lulg	Lulm	Lulb	Luls	Lult	Lulp	Lulh	Lum	Lub	Lubs	Lus	Luss	Lung	Luj	Luch";

    case 185:
      return "Luk	Lut	Lup	Luh	Lwo	Lwog	Lwokk	Lwogs	Lwon	Lwonj	Lwonh	Lwod	Lwol	Lwolg	Lwolm	Lwolb	Lwols	Lwolt	Lwolp	Lwolh	Lwom	Lwob	Lwobs	Lwos	Lwoss	Lwong	Lwoj	Lwoch	Lwok	Lwot	Lwop	Lwoh	Lwe	Lweg	Lwekk	Lwegs	Lwen	Lwenj	Lwenh	Lwed	Lwel	Lwelg	Lwelm	Lwelb	Lwels	Lwelt	Lwelp	Lwelh	Lwem	Lweb	Lwebs	Lwes	Lwess	Lweng	Lwej	Lwech	Lwek	Lwet	Lwep	Lweh	Lwi	Lwig	Lwikk	Lwigs	Lwin	Lwinj	Lwinh	Lwid	Lwil	Lwilg	Lwilm	Lwilb	Lwils	Lwilt	Lwilp	Lwilh	Lwim	Lwib	Lwibs	Lwis	Lwiss	Lwing	Lwij	Lwich	Lwik	Lwit	Lwip	Lwih	Lyu	Lyug	Lyukk	Lyugs	Lyun	Lyunj	Lyunh	Lyud	Lyul	Lyulg	Lyulm	Lyulb	Lyuls	Lyult	Lyulp	Lyulh	Lyum	Lyub	Lyubs	Lyus	Lyuss	Lyung	Lyuj	Lyuch	Lyuk	Lyut	Lyup	Lyuh	Leu	Leug	Leukk	Leugs	Leun	Leunj	Leunh	Leud	Leul	Leulg	Leulm	Leulb	Leuls	Leult	Leulp	Leulh	Leum	Leub	Leubs	Leus	Leuss	Leung	Leuj	Leuch	Leuk	Leut	Leup	Leuh	Lui	Luig	Luikk	Luigs	Luin	Luinj	Luinh	Luid	Luil	Luilg	Luilm	Luilb	Luils	Luilt	Luilp	Luilh	Luim	Luib	Luibs	Luis	Luiss	Luing	Luij	Luich	Luik	Luit	Luip	Luih	Li	Lig	Likk	Ligs	Lin	Linj	Linh	Lid	Lil	Lilg	Lilm	Lilb	Lils	Lilt	Lilp	Lilh	Lim	Lib	Libs	Lis	Liss	Ling	Lij	Lich	Lik	Lit	Lip	Lih	Ma	Mag	Makk	Mags	Man	Manj	Manh	Mad	Mal	Malg	Malm	Malb	Mals	Malt	Malp	Malh	Mam	Mab	Mabs	Mas	Mass	Mang	Maj	Mach	Mak	Mat	Map	Mah	Mae	Maeg	Maekk	Maegs	Maen	Maenj	Maenh	Maed	Mael	Maelg	Maelm	Maelb	Maels	Maelt	Maelp	Maelh	Maem	Maeb	Maebs	Maes	Maess	Maeng	Maej	Maech	Maek	Maet	Maep	Maeh";

    case 186:
      return "Mya	Myag	Myakk	Myags	Myan	Myanj	Myanh	Myad	Myal	Myalg	Myalm	Myalb	Myals	Myalt	Myalp	Myalh	Myam	Myab	Myabs	Myas	Myass	Myang	Myaj	Myach	Myak	Myat	Myap	Myah	Myae	Myaeg	Myaekk	Myaegs	Myaen	Myaenj	Myaenh	Myaed	Myael	Myaelg	Myaelm	Myaelb	Myaels	Myaelt	Myaelp	Myaelh	Myaem	Myaeb	Myaebs	Myaes	Myaess	Myaeng	Myaej	Myaech	Myaek	Myaet	Myaep	Myaeh	Meo	Meog	Meokk	Meogs	Meon	Meonj	Meonh	Meod	Meol	Meolg	Meolm	Meolb	Meols	Meolt	Meolp	Meolh	Meom	Meob	Meobs	Meos	Meoss	Meong	Meoj	Meoch	Meok	Meot	Meop	Meoh	Me	Meg	Mekk	Megs	Men	Menj	Menh	Med	Mel	Melg	Melm	Melb	Mels	Melt	Melp	Melh	Mem	Meb	Mebs	Mes	Mess	Meng	Mej	Mech	Mek	Met	Mep	Meh	Myeo	Myeog	Myeokk	Myeogs	Myeon	Myeonj	Myeonh	Myeod	Myeol	Myeolg	Myeolm	Myeolb	Myeols	Myeolt	Myeolp	Myeolh	Myeom	Myeob	Myeobs	Myeos	Myeoss	Myeong	Myeoj	Myeoch	Myeok	Myeot	Myeop	Myeoh	Mye	Myeg	Myekk	Myegs	Myen	Myenj	Myenh	Myed	Myel	Myelg	Myelm	Myelb	Myels	Myelt	Myelp	Myelh	Myem	Myeb	Myebs	Myes	Myess	Myeng	Myej	Myech	Myek	Myet	Myep	Myeh	Mo	Mog	Mokk	Mogs	Mon	Monj	Monh	Mod	Mol	Molg	Molm	Molb	Mols	Molt	Molp	Molh	Mom	Mob	Mobs	Mos	Moss	Mong	Moj	Moch	Mok	Mot	Mop	Moh	Mwa	Mwag	Mwakk	Mwags	Mwan	Mwanj	Mwanh	Mwad	Mwal	Mwalg	Mwalm	Mwalb	Mwals	Mwalt	Mwalp	Mwalh	Mwam	Mwab	Mwabs	Mwas	Mwass	Mwang	Mwaj	Mwach	Mwak	Mwat	Mwap	Mwah	Mwae	Mwaeg	Mwaekk	Mwaegs	Mwaen	Mwaenj	Mwaenh	Mwaed	Mwael	Mwaelg	Mwaelm	Mwaelb	Mwaels	Mwaelt	Mwaelp	Mwaelh	Mwaem	Mwaeb	Mwaebs	Mwaes	Mwaess	Mwaeng	Mwaej	Mwaech	Mwaek	Mwaet	Mwaep	Mwaeh	Moe	Moeg	Moekk	Moegs";

    case 187:
      return "Moen	Moenj	Moenh	Moed	Moel	Moelg	Moelm	Moelb	Moels	Moelt	Moelp	Moelh	Moem	Moeb	Moebs	Moes	Moess	Moeng	Moej	Moech	Moek	Moet	Moep	Moeh	Myo	Myog	Myokk	Myogs	Myon	Myonj	Myonh	Myod	Myol	Myolg	Myolm	Myolb	Myols	Myolt	Myolp	Myolh	Myom	Myob	Myobs	Myos	Myoss	Myong	Myoj	Myoch	Myok	Myot	Myop	Myoh	Mu	Mug	Mukk	Mugs	Mun	Munj	Munh	Mud	Mul	Mulg	Mulm	Mulb	Muls	Mult	Mulp	Mulh	Mum	Mub	Mubs	Mus	Muss	Mung	Muj	Much	Muk	Mut	Mup	Muh	Mwo	Mwog	Mwokk	Mwogs	Mwon	Mwonj	Mwonh	Mwod	Mwol	Mwolg	Mwolm	Mwolb	Mwols	Mwolt	Mwolp	Mwolh	Mwom	Mwob	Mwobs	Mwos	Mwoss	Mwong	Mwoj	Mwoch	Mwok	Mwot	Mwop	Mwoh	Mwe	Mweg	Mwekk	Mwegs	Mwen	Mwenj	Mwenh	Mwed	Mwel	Mwelg	Mwelm	Mwelb	Mwels	Mwelt	Mwelp	Mwelh	Mwem	Mweb	Mwebs	Mwes	Mwess	Mweng	Mwej	Mwech	Mwek	Mwet	Mwep	Mweh	Mwi	Mwig	Mwikk	Mwigs	Mwin	Mwinj	Mwinh	Mwid	Mwil	Mwilg	Mwilm	Mwilb	Mwils	Mwilt	Mwilp	Mwilh	Mwim	Mwib	Mwibs	Mwis	Mwiss	Mwing	Mwij	Mwich	Mwik	Mwit	Mwip	Mwih	Myu	Myug	Myukk	Myugs	Myun	Myunj	Myunh	Myud	Myul	Myulg	Myulm	Myulb	Myuls	Myult	Myulp	Myulh	Myum	Myub	Myubs	Myus	Myuss	Myung	Myuj	Myuch	Myuk	Myut	Myup	Myuh	Meu	Meug	Meukk	Meugs	Meun	Meunj	Meunh	Meud	Meul	Meulg	Meulm	Meulb	Meuls	Meult	Meulp	Meulh	Meum	Meub	Meubs	Meus	Meuss	Meung	Meuj	Meuch	Meuk	Meut	Meup	Meuh	Mui	Muig	Muikk	Muigs	Muin	Muinj	Muinh	Muid	Muil	Muilg	Muilm	Muilb	Muils	Muilt	Muilp	Muilh	Muim	Muib	Muibs	Muis	Muiss	Muing	Muij	Muich	Muik	Muit	Muip	Muih	Mi	Mig	Mikk	Migs	Min	Minj	Minh	Mid";

    case 188:
      return "Mil	Milg	Milm	Milb	Mils	Milt	Milp	Milh	Mim	Mib	Mibs	Mis	Miss	Ming	Mij	Mich	Mik	Mit	Mip	Mih	Ba	Bag	Bakk	Bags	Ban	Banj	Banh	Bad	Bal	Balg	Balm	Balb	Bals	Balt	Balp	Balh	Bam	Bab	Babs	Bas	Bass	Bang	Baj	Bach	Bak	Bat	Bap	Bah	Bae	Baeg	Baekk	Baegs	Baen	Baenj	Baenh	Baed	Bael	Baelg	Baelm	Baelb	Baels	Baelt	Baelp	Baelh	Baem	Baeb	Baebs	Baes	Baess	Baeng	Baej	Baech	Baek	Baet	Baep	Baeh	Bya	Byag	Byakk	Byags	Byan	Byanj	Byanh	Byad	Byal	Byalg	Byalm	Byalb	Byals	Byalt	Byalp	Byalh	Byam	Byab	Byabs	Byas	Byass	Byang	Byaj	Byach	Byak	Byat	Byap	Byah	Byae	Byaeg	Byaekk	Byaegs	Byaen	Byaenj	Byaenh	Byaed	Byael	Byaelg	Byaelm	Byaelb	Byaels	Byaelt	Byaelp	Byaelh	Byaem	Byaeb	Byaebs	Byaes	Byaess	Byaeng	Byaej	Byaech	Byaek	Byaet	Byaep	Byaeh	Beo	Beog	Beokk	Beogs	Beon	Beonj	Beonh	Beod	Beol	Beolg	Beolm	Beolb	Beols	Beolt	Beolp	Beolh	Beom	Beob	Beobs	Beos	Beoss	Beong	Beoj	Beoch	Beok	Beot	Beop	Beoh	Be	Beg	Bekk	Begs	Ben	Benj	Benh	Bed	Bel	Belg	Belm	Belb	Bels	Belt	Belp	Belh	Bem	Beb	Bebs	Bes	Bess	Beng	Bej	Bech	Bek	Bet	Bep	Beh	Byeo	Byeog	Byeokk	Byeogs	Byeon	Byeonj	Byeonh	Byeod	Byeol	Byeolg	Byeolm	Byeolb	Byeols	Byeolt	Byeolp	Byeolh	Byeom	Byeob	Byeobs	Byeos	Byeoss	Byeong	Byeoj	Byeoch	Byeok	Byeot	Byeop	Byeoh	Bye	Byeg	Byekk	Byegs	Byen	Byenj	Byenh	Byed	Byel	Byelg	Byelm	Byelb	Byels	Byelt	Byelp	Byelh	Byem	Byeb	Byebs	Byes	Byess	Byeng	Byej	Byech	Byek	Byet	Byep	Byeh	Bo	Bog	Bokk	Bogs	Bon	Bonj	Bonh	Bod	Bol	Bolg	Bolm	Bolb";

    case 189:
      return "Bols	Bolt	Bolp	Bolh	Bom	Bob	Bobs	Bos	Boss	Bong	Boj	Boch	Bok	Bot	Bop	Boh	Bwa	Bwag	Bwakk	Bwags	Bwan	Bwanj	Bwanh	Bwad	Bwal	Bwalg	Bwalm	Bwalb	Bwals	Bwalt	Bwalp	Bwalh	Bwam	Bwab	Bwabs	Bwas	Bwass	Bwang	Bwaj	Bwach	Bwak	Bwat	Bwap	Bwah	Bwae	Bwaeg	Bwaekk	Bwaegs	Bwaen	Bwaenj	Bwaenh	Bwaed	Bwael	Bwaelg	Bwaelm	Bwaelb	Bwaels	Bwaelt	Bwaelp	Bwaelh	Bwaem	Bwaeb	Bwaebs	Bwaes	Bwaess	Bwaeng	Bwaej	Bwaech	Bwaek	Bwaet	Bwaep	Bwaeh	Boe	Boeg	Boekk	Boegs	Boen	Boenj	Boenh	Boed	Boel	Boelg	Boelm	Boelb	Boels	Boelt	Boelp	Boelh	Boem	Boeb	Boebs	Boes	Boess	Boeng	Boej	Boech	Boek	Boet	Boep	Boeh	Byo	Byog	Byokk	Byogs	Byon	Byonj	Byonh	Byod	Byol	Byolg	Byolm	Byolb	Byols	Byolt	Byolp	Byolh	Byom	Byob	Byobs	Byos	Byoss	Byong	Byoj	Byoch	Byok	Byot	Byop	Byoh	Bu	Bug	Bukk	Bugs	Bun	Bunj	Bunh	Bud	Bul	Bulg	Bulm	Bulb	Buls	Bult	Bulp	Bulh	Bum	Bub	Bubs	Bus	Buss	Bung	Buj	Buch	Buk	But	Bup	Buh	Bwo	Bwog	Bwokk	Bwogs	Bwon	Bwonj	Bwonh	Bwod	Bwol	Bwolg	Bwolm	Bwolb	Bwols	Bwolt	Bwolp	Bwolh	Bwom	Bwob	Bwobs	Bwos	Bwoss	Bwong	Bwoj	Bwoch	Bwok	Bwot	Bwop	Bwoh	Bwe	Bweg	Bwekk	Bwegs	Bwen	Bwenj	Bwenh	Bwed	Bwel	Bwelg	Bwelm	Bwelb	Bwels	Bwelt	Bwelp	Bwelh	Bwem	Bweb	Bwebs	Bwes	Bwess	Bweng	Bwej	Bwech	Bwek	Bwet	Bwep	Bweh	Bwi	Bwig	Bwikk	Bwigs	Bwin	Bwinj	Bwinh	Bwid	Bwil	Bwilg	Bwilm	Bwilb	Bwils	Bwilt	Bwilp	Bwilh	Bwim	Bwib	Bwibs	Bwis	Bwiss	Bwing	Bwij	Bwich	Bwik	Bwit	Bwip	Bwih	Byu	Byug	Byukk	Byugs	Byun	Byunj	Byunh	Byud	Byul	Byulg	Byulm	Byulb	Byuls	Byult	Byulp	Byulh";

    case 190:
      return "Byum	Byub	Byubs	Byus	Byuss	Byung	Byuj	Byuch	Byuk	Byut	Byup	Byuh	Beu	Beug	Beukk	Beugs	Beun	Beunj	Beunh	Beud	Beul	Beulg	Beulm	Beulb	Beuls	Beult	Beulp	Beulh	Beum	Beub	Beubs	Beus	Beuss	Beung	Beuj	Beuch	Beuk	Beut	Beup	Beuh	Bui	Buig	Buikk	Buigs	Buin	Buinj	Buinh	Buid	Buil	Builg	Builm	Builb	Buils	Built	Builp	Builh	Buim	Buib	Buibs	Buis	Buiss	Buing	Buij	Buich	Buik	Buit	Buip	Buih	Bi	Big	Bikk	Bigs	Bin	Binj	Binh	Bid	Bil	Bilg	Bilm	Bilb	Bils	Bilt	Bilp	Bilh	Bim	Bib	Bibs	Bis	Biss	Bing	Bij	Bich	Bik	Bit	Bip	Bih	Ppa	Ppag	Ppakk	Ppags	Ppan	Ppanj	Ppanh	Ppad	Ppal	Ppalg	Ppalm	Ppalb	Ppals	Ppalt	Ppalp	Ppalh	Ppam	Ppab	Ppabs	Ppas	Ppass	Ppang	Ppaj	Ppach	Ppak	Ppat	Ppap	Ppah	Ppae	Ppaeg	Ppaekk	Ppaegs	Ppaen	Ppaenj	Ppaenh	Ppaed	Ppael	Ppaelg	Ppaelm	Ppaelb	Ppaels	Ppaelt	Ppaelp	Ppaelh	Ppaem	Ppaeb	Ppaebs	Ppaes	Ppaess	Ppaeng	Ppaej	Ppaech	Ppaek	Ppaet	Ppaep	Ppaeh	Ppya	Ppyag	Ppyakk	Ppyags	Ppyan	Ppyanj	Ppyanh	Ppyad	Ppyal	Ppyalg	Ppyalm	Ppyalb	Ppyals	Ppyalt	Ppyalp	Ppyalh	Ppyam	Ppyab	Ppyabs	Ppyas	Ppyass	Ppyang	Ppyaj	Ppyach	Ppyak	Ppyat	Ppyap	Ppyah	Ppyae	Ppyaeg	Ppyaekk	Ppyaegs	Ppyaen	Ppyaenj	Ppyaenh	Ppyaed	Ppyael	Ppyaelg	Ppyaelm	Ppyaelb	Ppyaels	Ppyaelt	Ppyaelp	Ppyaelh	Ppyaem	Ppyaeb	Ppyaebs	Ppyaes	Ppyaess	Ppyaeng	Ppyaej	Ppyaech	Ppyaek	Ppyaet	Ppyaep	Ppyaeh	Ppeo	Ppeog	Ppeokk	Ppeogs	Ppeon	Ppeonj	Ppeonh	Ppeod	Ppeol	Ppeolg	Ppeolm	Ppeolb	Ppeols	Ppeolt	Ppeolp	Ppeolh	Ppeom	Ppeob	Ppeobs	Ppeos	Ppeoss	Ppeong	Ppeoj	Ppeoch	Ppeok	Ppeot	Ppeop	Ppeoh	Ppe	Ppeg	Ppekk	Ppegs	Ppen	Ppenj	Ppenh	Pped	Ppel	Ppelg	Ppelm	Ppelb	Ppels	Ppelt	Ppelp	Ppelh	Ppem	Ppeb	Ppebs	Ppes";

    case 191:
      return "Ppess	Ppeng	Ppej	Ppech	Ppek	Ppet	Ppep	Ppeh	Ppyeo	Ppyeog	Ppyeokk	Ppyeogs	Ppyeon	Ppyeonj	Ppyeonh	Ppyeod	Ppyeol	Ppyeolg	Ppyeolm	Ppyeolb	Ppyeols	Ppyeolt	Ppyeolp	Ppyeolh	Ppyeom	Ppyeob	Ppyeobs	Ppyeos	Ppyeoss	Ppyeong	Ppyeoj	Ppyeoch	Ppyeok	Ppyeot	Ppyeop	Ppyeoh	Ppye	Ppyeg	Ppyekk	Ppyegs	Ppyen	Ppyenj	Ppyenh	Ppyed	Ppyel	Ppyelg	Ppyelm	Ppyelb	Ppyels	Ppyelt	Ppyelp	Ppyelh	Ppyem	Ppyeb	Ppyebs	Ppyes	Ppyess	Ppyeng	Ppyej	Ppyech	Ppyek	Ppyet	Ppyep	Ppyeh	Ppo	Ppog	Ppokk	Ppogs	Ppon	Pponj	Pponh	Ppod	Ppol	Ppolg	Ppolm	Ppolb	Ppols	Ppolt	Ppolp	Ppolh	Ppom	Ppob	Ppobs	Ppos	Pposs	Ppong	Ppoj	Ppoch	Ppok	Ppot	Ppop	Ppoh	Ppwa	Ppwag	Ppwakk	Ppwags	Ppwan	Ppwanj	Ppwanh	Ppwad	Ppwal	Ppwalg	Ppwalm	Ppwalb	Ppwals	Ppwalt	Ppwalp	Ppwalh	Ppwam	Ppwab	Ppwabs	Ppwas	Ppwass	Ppwang	Ppwaj	Ppwach	Ppwak	Ppwat	Ppwap	Ppwah	Ppwae	Ppwaeg	Ppwaekk	Ppwaegs	Ppwaen	Ppwaenj	Ppwaenh	Ppwaed	Ppwael	Ppwaelg	Ppwaelm	Ppwaelb	Ppwaels	Ppwaelt	Ppwaelp	Ppwaelh	Ppwaem	Ppwaeb	Ppwaebs	Ppwaes	Ppwaess	Ppwaeng	Ppwaej	Ppwaech	Ppwaek	Ppwaet	Ppwaep	Ppwaeh	Ppoe	Ppoeg	Ppoekk	Ppoegs	Ppoen	Ppoenj	Ppoenh	Ppoed	Ppoel	Ppoelg	Ppoelm	Ppoelb	Ppoels	Ppoelt	Ppoelp	Ppoelh	Ppoem	Ppoeb	Ppoebs	Ppoes	Ppoess	Ppoeng	Ppoej	Ppoech	Ppoek	Ppoet	Ppoep	Ppoeh	Ppyo	Ppyog	Ppyokk	Ppyogs	Ppyon	Ppyonj	Ppyonh	Ppyod	Ppyol	Ppyolg	Ppyolm	Ppyolb	Ppyols	Ppyolt	Ppyolp	Ppyolh	Ppyom	Ppyob	Ppyobs	Ppyos	Ppyoss	Ppyong	Ppyoj	Ppyoch	Ppyok	Ppyot	Ppyop	Ppyoh	Ppu	Ppug	Ppukk	Ppugs	Ppun	Ppunj	Ppunh	Ppud	Ppul	Ppulg	Ppulm	Ppulb	Ppuls	Ppult	Ppulp	Ppulh	Ppum	Ppub	Ppubs	Ppus	Ppuss	Ppung	Ppuj	Ppuch	Ppuk	Pput	Ppup	Ppuh	Ppwo	Ppwog	Ppwokk	Ppwogs	Ppwon	Ppwonj	Ppwonh	Ppwod	Ppwol	Ppwolg	Ppwolm	Ppwolb	Ppwols	Ppwolt	Ppwolp	Ppwolh	Ppwom	Ppwob	Ppwobs	Ppwos	Ppwoss	Ppwong	Ppwoj	Ppwoch";

    case 192:
      return "Ppwok	Ppwot	Ppwop	Ppwoh	Ppwe	Ppweg	Ppwekk	Ppwegs	Ppwen	Ppwenj	Ppwenh	Ppwed	Ppwel	Ppwelg	Ppwelm	Ppwelb	Ppwels	Ppwelt	Ppwelp	Ppwelh	Ppwem	Ppweb	Ppwebs	Ppwes	Ppwess	Ppweng	Ppwej	Ppwech	Ppwek	Ppwet	Ppwep	Ppweh	Ppwi	Ppwig	Ppwikk	Ppwigs	Ppwin	Ppwinj	Ppwinh	Ppwid	Ppwil	Ppwilg	Ppwilm	Ppwilb	Ppwils	Ppwilt	Ppwilp	Ppwilh	Ppwim	Ppwib	Ppwibs	Ppwis	Ppwiss	Ppwing	Ppwij	Ppwich	Ppwik	Ppwit	Ppwip	Ppwih	Ppyu	Ppyug	Ppyukk	Ppyugs	Ppyun	Ppyunj	Ppyunh	Ppyud	Ppyul	Ppyulg	Ppyulm	Ppyulb	Ppyuls	Ppyult	Ppyulp	Ppyulh	Ppyum	Ppyub	Ppyubs	Ppyus	Ppyuss	Ppyung	Ppyuj	Ppyuch	Ppyuk	Ppyut	Ppyup	Ppyuh	Ppeu	Ppeug	Ppeukk	Ppeugs	Ppeun	Ppeunj	Ppeunh	Ppeud	Ppeul	Ppeulg	Ppeulm	Ppeulb	Ppeuls	Ppeult	Ppeulp	Ppeulh	Ppeum	Ppeub	Ppeubs	Ppeus	Ppeuss	Ppeung	Ppeuj	Ppeuch	Ppeuk	Ppeut	Ppeup	Ppeuh	Ppui	Ppuig	Ppuikk	Ppuigs	Ppuin	Ppuinj	Ppuinh	Ppuid	Ppuil	Ppuilg	Ppuilm	Ppuilb	Ppuils	Ppuilt	Ppuilp	Ppuilh	Ppuim	Ppuib	Ppuibs	Ppuis	Ppuiss	Ppuing	Ppuij	Ppuich	Ppuik	Ppuit	Ppuip	Ppuih	Ppi	Ppig	Ppikk	Ppigs	Ppin	Ppinj	Ppinh	Ppid	Ppil	Ppilg	Ppilm	Ppilb	Ppils	Ppilt	Ppilp	Ppilh	Ppim	Ppib	Ppibs	Ppis	Ppiss	Pping	Ppij	Ppich	Ppik	Ppit	Ppip	Ppih	Sa	Sag	Sakk	Sags	San	Sanj	Sanh	Sad	Sal	Salg	Salm	Salb	Sals	Salt	Salp	Salh	Sam	Sab	Sabs	Sas	Sass	Sang	Saj	Sach	Sak	Sat	Sap	Sah	Sae	Saeg	Saekk	Saegs	Saen	Saenj	Saenh	Saed	Sael	Saelg	Saelm	Saelb	Saels	Saelt	Saelp	Saelh	Saem	Saeb	Saebs	Saes	Saess	Saeng	Saej	Saech	Saek	Saet	Saep	Saeh	Sya	Syag	Syakk	Syags	Syan	Syanj	Syanh	Syad	Syal	Syalg	Syalm	Syalb	Syals	Syalt	Syalp	Syalh	Syam	Syab	Syabs	Syas	Syass	Syang	Syaj	Syach	Syak	Syat	Syap	Syah";

    case 193:
      return "Syae	Syaeg	Syaekk	Syaegs	Syaen	Syaenj	Syaenh	Syaed	Syael	Syaelg	Syaelm	Syaelb	Syaels	Syaelt	Syaelp	Syaelh	Syaem	Syaeb	Syaebs	Syaes	Syaess	Syaeng	Syaej	Syaech	Syaek	Syaet	Syaep	Syaeh	Seo	Seog	Seokk	Seogs	Seon	Seonj	Seonh	Seod	Seol	Seolg	Seolm	Seolb	Seols	Seolt	Seolp	Seolh	Seom	Seob	Seobs	Seos	Seoss	Seong	Seoj	Seoch	Seok	Seot	Seop	Seoh	Se	Seg	Sekk	Segs	Sen	Senj	Senh	Sed	Sel	Selg	Selm	Selb	Sels	Selt	Selp	Selh	Sem	Seb	Sebs	Ses	Sess	Seng	Sej	Sech	Sek	Set	Sep	Seh	Syeo	Syeog	Syeokk	Syeogs	Syeon	Syeonj	Syeonh	Syeod	Syeol	Syeolg	Syeolm	Syeolb	Syeols	Syeolt	Syeolp	Syeolh	Syeom	Syeob	Syeobs	Syeos	Syeoss	Syeong	Syeoj	Syeoch	Syeok	Syeot	Syeop	Syeoh	Sye	Syeg	Syekk	Syegs	Syen	Syenj	Syenh	Syed	Syel	Syelg	Syelm	Syelb	Syels	Syelt	Syelp	Syelh	Syem	Syeb	Syebs	Syes	Syess	Syeng	Syej	Syech	Syek	Syet	Syep	Syeh	So	Sog	Sokk	Sogs	Son	Sonj	Sonh	Sod	Sol	Solg	Solm	Solb	Sols	Solt	Solp	Solh	Som	Sob	Sobs	Sos	Soss	Song	Soj	Soch	Sok	Sot	Sop	Soh	Swa	Swag	Swakk	Swags	Swan	Swanj	Swanh	Swad	Swal	Swalg	Swalm	Swalb	Swals	Swalt	Swalp	Swalh	Swam	Swab	Swabs	Swas	Swass	Swang	Swaj	Swach	Swak	Swat	Swap	Swah	Swae	Swaeg	Swaekk	Swaegs	Swaen	Swaenj	Swaenh	Swaed	Swael	Swaelg	Swaelm	Swaelb	Swaels	Swaelt	Swaelp	Swaelh	Swaem	Swaeb	Swaebs	Swaes	Swaess	Swaeng	Swaej	Swaech	Swaek	Swaet	Swaep	Swaeh	Soe	Soeg	Soekk	Soegs	Soen	Soenj	Soenh	Soed	Soel	Soelg	Soelm	Soelb	Soels	Soelt	Soelp	Soelh	Soem	Soeb	Soebs	Soes	Soess	Soeng	Soej	Soech	Soek	Soet	Soep	Soeh	Syo	Syog	Syokk	Syogs";

    case 194:
      return "Syon	Syonj	Syonh	Syod	Syol	Syolg	Syolm	Syolb	Syols	Syolt	Syolp	Syolh	Syom	Syob	Syobs	Syos	Syoss	Syong	Syoj	Syoch	Syok	Syot	Syop	Syoh	Su	Sug	Sukk	Sugs	Sun	Sunj	Sunh	Sud	Sul	Sulg	Sulm	Sulb	Suls	Sult	Sulp	Sulh	Sum	Sub	Subs	Sus	Suss	Sung	Suj	Such	Suk	Sut	Sup	Suh	Swo	Swog	Swokk	Swogs	Swon	Swonj	Swonh	Swod	Swol	Swolg	Swolm	Swolb	Swols	Swolt	Swolp	Swolh	Swom	Swob	Swobs	Swos	Swoss	Swong	Swoj	Swoch	Swok	Swot	Swop	Swoh	Swe	Sweg	Swekk	Swegs	Swen	Swenj	Swenh	Swed	Swel	Swelg	Swelm	Swelb	Swels	Swelt	Swelp	Swelh	Swem	Sweb	Swebs	Swes	Swess	Sweng	Swej	Swech	Swek	Swet	Swep	Sweh	Swi	Swig	Swikk	Swigs	Swin	Swinj	Swinh	Swid	Swil	Swilg	Swilm	Swilb	Swils	Swilt	Swilp	Swilh	Swim	Swib	Swibs	Swis	Swiss	Swing	Swij	Swich	Swik	Swit	Swip	Swih	Syu	Syug	Syukk	Syugs	Syun	Syunj	Syunh	Syud	Syul	Syulg	Syulm	Syulb	Syuls	Syult	Syulp	Syulh	Syum	Syub	Syubs	Syus	Syuss	Syung	Syuj	Syuch	Syuk	Syut	Syup	Syuh	Seu	Seug	Seukk	Seugs	Seun	Seunj	Seunh	Seud	Seul	Seulg	Seulm	Seulb	Seuls	Seult	Seulp	Seulh	Seum	Seub	Seubs	Seus	Seuss	Seung	Seuj	Seuch	Seuk	Seut	Seup	Seuh	Sui	Suig	Suikk	Suigs	Suin	Suinj	Suinh	Suid	Suil	Suilg	Suilm	Suilb	Suils	Suilt	Suilp	Suilh	Suim	Suib	Suibs	Suis	Suiss	Suing	Suij	Suich	Suik	Suit	Suip	Suih	Si	Sig	Sikk	Sigs	Sin	Sinj	Sinh	Sid	Sil	Silg	Silm	Silb	Sils	Silt	Silp	Silh	Sim	Sib	Sibs	Sis	Siss	Sing	Sij	Sich	Sik	Sit	Sip	Sih	Ssa	Ssag	Ssakk	Ssags	Ssan	Ssanj	Ssanh	Ssad";

    case 195:
      return "Ssal	Ssalg	Ssalm	Ssalb	Ssals	Ssalt	Ssalp	Ssalh	Ssam	Ssab	Ssabs	Ssas	Ssass	Ssang	Ssaj	Ssach	Ssak	Ssat	Ssap	Ssah	Ssae	Ssaeg	Ssaekk	Ssaegs	Ssaen	Ssaenj	Ssaenh	Ssaed	Ssael	Ssaelg	Ssaelm	Ssaelb	Ssaels	Ssaelt	Ssaelp	Ssaelh	Ssaem	Ssaeb	Ssaebs	Ssaes	Ssaess	Ssaeng	Ssaej	Ssaech	Ssaek	Ssaet	Ssaep	Ssaeh	Ssya	Ssyag	Ssyakk	Ssyags	Ssyan	Ssyanj	Ssyanh	Ssyad	Ssyal	Ssyalg	Ssyalm	Ssyalb	Ssyals	Ssyalt	Ssyalp	Ssyalh	Ssyam	Ssyab	Ssyabs	Ssyas	Ssyass	Ssyang	Ssyaj	Ssyach	Ssyak	Ssyat	Ssyap	Ssyah	Ssyae	Ssyaeg	Ssyaekk	Ssyaegs	Ssyaen	Ssyaenj	Ssyaenh	Ssyaed	Ssyael	Ssyaelg	Ssyaelm	Ssyaelb	Ssyaels	Ssyaelt	Ssyaelp	Ssyaelh	Ssyaem	Ssyaeb	Ssyaebs	Ssyaes	Ssyaess	Ssyaeng	Ssyaej	Ssyaech	Ssyaek	Ssyaet	Ssyaep	Ssyaeh	Sseo	Sseog	Sseokk	Sseogs	Sseon	Sseonj	Sseonh	Sseod	Sseol	Sseolg	Sseolm	Sseolb	Sseols	Sseolt	Sseolp	Sseolh	Sseom	Sseob	Sseobs	Sseos	Sseoss	Sseong	Sseoj	Sseoch	Sseok	Sseot	Sseop	Sseoh	Sse	Sseg	Ssekk	Ssegs	Ssen	Ssenj	Ssenh	Ssed	Ssel	Sselg	Sselm	Sselb	Ssels	Sselt	Sselp	Sselh	Ssem	Sseb	Ssebs	Sses	Ssess	Sseng	Ssej	Ssech	Ssek	Sset	Ssep	Sseh	Ssyeo	Ssyeog	Ssyeokk	Ssyeogs	Ssyeon	Ssyeonj	Ssyeonh	Ssyeod	Ssyeol	Ssyeolg	Ssyeolm	Ssyeolb	Ssyeols	Ssyeolt	Ssyeolp	Ssyeolh	Ssyeom	Ssyeob	Ssyeobs	Ssyeos	Ssyeoss	Ssyeong	Ssyeoj	Ssyeoch	Ssyeok	Ssyeot	Ssyeop	Ssyeoh	Ssye	Ssyeg	Ssyekk	Ssyegs	Ssyen	Ssyenj	Ssyenh	Ssyed	Ssyel	Ssyelg	Ssyelm	Ssyelb	Ssyels	Ssyelt	Ssyelp	Ssyelh	Ssyem	Ssyeb	Ssyebs	Ssyes	Ssyess	Ssyeng	Ssyej	Ssyech	Ssyek	Ssyet	Ssyep	Ssyeh	Sso	Ssog	Ssokk	Ssogs	Sson	Ssonj	Ssonh	Ssod	Ssol	Ssolg	Ssolm	Ssolb	Ssols	Ssolt	Ssolp	Ssolh	Ssom	Ssob	Ssobs	Ssos	Ssoss	Ssong	Ssoj	Ssoch	Ssok	Ssot	Ssop	Ssoh	Sswa	Sswag	Sswakk	Sswags	Sswan	Sswanj	Sswanh	Sswad	Sswal	Sswalg	Sswalm	Sswalb";

    case 196:
      return "Sswals	Sswalt	Sswalp	Sswalh	Sswam	Sswab	Sswabs	Sswas	Sswass	Sswang	Sswaj	Sswach	Sswak	Sswat	Sswap	Sswah	Sswae	Sswaeg	Sswaekk	Sswaegs	Sswaen	Sswaenj	Sswaenh	Sswaed	Sswael	Sswaelg	Sswaelm	Sswaelb	Sswaels	Sswaelt	Sswaelp	Sswaelh	Sswaem	Sswaeb	Sswaebs	Sswaes	Sswaess	Sswaeng	Sswaej	Sswaech	Sswaek	Sswaet	Sswaep	Sswaeh	Ssoe	Ssoeg	Ssoekk	Ssoegs	Ssoen	Ssoenj	Ssoenh	Ssoed	Ssoel	Ssoelg	Ssoelm	Ssoelb	Ssoels	Ssoelt	Ssoelp	Ssoelh	Ssoem	Ssoeb	Ssoebs	Ssoes	Ssoess	Ssoeng	Ssoej	Ssoech	Ssoek	Ssoet	Ssoep	Ssoeh	Ssyo	Ssyog	Ssyokk	Ssyogs	Ssyon	Ssyonj	Ssyonh	Ssyod	Ssyol	Ssyolg	Ssyolm	Ssyolb	Ssyols	Ssyolt	Ssyolp	Ssyolh	Ssyom	Ssyob	Ssyobs	Ssyos	Ssyoss	Ssyong	Ssyoj	Ssyoch	Ssyok	Ssyot	Ssyop	Ssyoh	Ssu	Ssug	Ssukk	Ssugs	Ssun	Ssunj	Ssunh	Ssud	Ssul	Ssulg	Ssulm	Ssulb	Ssuls	Ssult	Ssulp	Ssulh	Ssum	Ssub	Ssubs	Ssus	Ssuss	Ssung	Ssuj	Ssuch	Ssuk	Ssut	Ssup	Ssuh	Sswo	Sswog	Sswokk	Sswogs	Sswon	Sswonj	Sswonh	Sswod	Sswol	Sswolg	Sswolm	Sswolb	Sswols	Sswolt	Sswolp	Sswolh	Sswom	Sswob	Sswobs	Sswos	Sswoss	Sswong	Sswoj	Sswoch	Sswok	Sswot	Sswop	Sswoh	Sswe	Ssweg	Sswekk	Sswegs	Sswen	Sswenj	Sswenh	Sswed	Sswel	Sswelg	Sswelm	Sswelb	Sswels	Sswelt	Sswelp	Sswelh	Sswem	Ssweb	Sswebs	Sswes	Sswess	Ssweng	Sswej	Sswech	Sswek	Sswet	Sswep	Ssweh	Sswi	Sswig	Sswikk	Sswigs	Sswin	Sswinj	Sswinh	Sswid	Sswil	Sswilg	Sswilm	Sswilb	Sswils	Sswilt	Sswilp	Sswilh	Sswim	Sswib	Sswibs	Sswis	Sswiss	Sswing	Sswij	Sswich	Sswik	Sswit	Sswip	Sswih	Ssyu	Ssyug	Ssyukk	Ssyugs	Ssyun	Ssyunj	Ssyunh	Ssyud	Ssyul	Ssyulg	Ssyulm	Ssyulb	Ssyuls	Ssyult	Ssyulp	Ssyulh	Ssyum	Ssyub	Ssyubs	Ssyus	Ssyuss	Ssyung	Ssyuj	Ssyuch	Ssyuk	Ssyut	Ssyup	Ssyuh	Sseu	Sseug	Sseukk	Sseugs	Sseun	Sseunj	Sseunh	Sseud	Sseul	Sseulg	Sseulm	Sseulb	Sseuls	Sseult	Sseulp	Sseulh";

    case 197:
      return "Sseum	Sseub	Sseubs	Sseus	Sseuss	Sseung	Sseuj	Sseuch	Sseuk	Sseut	Sseup	Sseuh	Ssui	Ssuig	Ssuikk	Ssuigs	Ssuin	Ssuinj	Ssuinh	Ssuid	Ssuil	Ssuilg	Ssuilm	Ssuilb	Ssuils	Ssuilt	Ssuilp	Ssuilh	Ssuim	Ssuib	Ssuibs	Ssuis	Ssuiss	Ssuing	Ssuij	Ssuich	Ssuik	Ssuit	Ssuip	Ssuih	Ssi	Ssig	Ssikk	Ssigs	Ssin	Ssinj	Ssinh	Ssid	Ssil	Ssilg	Ssilm	Ssilb	Ssils	Ssilt	Ssilp	Ssilh	Ssim	Ssib	Ssibs	Ssis	Ssiss	Ssing	Ssij	Ssich	Ssik	Ssit	Ssip	Ssih	A	Ag	Akk	Ags	An	Anj	Anh	Ad	Al	Alg	Alm	Alb	Als	Alt	Alp	Alh	Am	Ab	Abs	As	Ass	Ang	Aj	Ach	Ak	At	Ap	Ah	Ae	Aeg	Aekk	Aegs	Aen	Aenj	Aenh	Aed	Ael	Aelg	Aelm	Aelb	Aels	Aelt	Aelp	Aelh	Aem	Aeb	Aebs	Aes	Aess	Aeng	Aej	Aech	Aek	Aet	Aep	Aeh	Ya	Yag	Yakk	Yags	Yan	Yanj	Yanh	Yad	Yal	Yalg	Yalm	Yalb	Yals	Yalt	Yalp	Yalh	Yam	Yab	Yabs	Yas	Yass	Yang	Yaj	Yach	Yak	Yat	Yap	Yah	Yae	Yaeg	Yaekk	Yaegs	Yaen	Yaenj	Yaenh	Yaed	Yael	Yaelg	Yaelm	Yaelb	Yaels	Yaelt	Yaelp	Yaelh	Yaem	Yaeb	Yaebs	Yaes	Yaess	Yaeng	Yaej	Yaech	Yaek	Yaet	Yaep	Yaeh	Eo	Eog	Eokk	Eogs	Eon	Eonj	Eonh	Eod	Eol	Eolg	Eolm	Eolb	Eols	Eolt	Eolp	Eolh	Eom	Eob	Eobs	Eos	Eoss	Eong	Eoj	Eoch	Eok	Eot	Eop	Eoh	E	Eg	Ekk	Egs	En	Enj	Enh	Ed	El	Elg	Elm	Elb	Els	Elt	Elp	Elh	Em	Eb	Ebs	Es	Ess	Eng	Ej	Ech	Ek	Et	Ep	Eh	Yeo	Yeog	Yeokk	Yeogs	Yeon	Yeonj	Yeonh	Yeod	Yeol	Yeolg	Yeolm	Yeolb	Yeols	Yeolt	Yeolp	Yeolh	Yeom	Yeob	Yeobs	Yeos";

    case 198:
      return "Yeoss	Yeong	Yeoj	Yeoch	Yeok	Yeot	Yeop	Yeoh	Ye	Yeg	Yekk	Yegs	Yen	Yenj	Yenh	Yed	Yel	Yelg	Yelm	Yelb	Yels	Yelt	Yelp	Yelh	Yem	Yeb	Yebs	Yes	Yess	Yeng	Yej	Yech	Yek	Yet	Yep	Yeh	O	Og	Okk	Ogs	On	Onj	Onh	Od	Ol	Olg	Olm	Olb	Ols	Olt	Olp	Olh	Om	Ob	Obs	Os	Oss	Ong	Oj	Och	Ok	Ot	Op	Oh	Wa	Wag	Wakk	Wags	Wan	Wanj	Wanh	Wad	Wal	Walg	Walm	Walb	Wals	Walt	Walp	Walh	Wam	Wab	Wabs	Was	Wass	Wang	Waj	Wach	Wak	Wat	Wap	Wah	Wae	Waeg	Waekk	Waegs	Waen	Waenj	Waenh	Waed	Wael	Waelg	Waelm	Waelb	Waels	Waelt	Waelp	Waelh	Waem	Waeb	Waebs	Waes	Waess	Waeng	Waej	Waech	Waek	Waet	Waep	Waeh	Oe	Oeg	Oekk	Oegs	Oen	Oenj	Oenh	Oed	Oel	Oelg	Oelm	Oelb	Oels	Oelt	Oelp	Oelh	Oem	Oeb	Oebs	Oes	Oess	Oeng	Oej	Oech	Oek	Oet	Oep	Oeh	Yo	Yog	Yokk	Yogs	Yon	Yonj	Yonh	Yod	Yol	Yolg	Yolm	Yolb	Yols	Yolt	Yolp	Yolh	Yom	Yob	Yobs	Yos	Yoss	Yong	Yoj	Yoch	Yok	Yot	Yop	Yoh	U	Ug	Ukk	Ugs	Un	Unj	Unh	Ud	Ul	Ulg	Ulm	Ulb	Uls	Ult	Ulp	Ulh	Um	Ub	Ubs	Us	Uss	Ung	Uj	Uch	Uk	Ut	Up	Uh	Wo	Wog	Wokk	Wogs	Won	Wonj	Wonh	Wod	Wol	Wolg	Wolm	Wolb	Wols	Wolt	Wolp	Wolh	Wom	Wob	Wobs	Wos	Woss	Wong	Woj	Woch	Wok	Wot	Wop	Woh	We	Weg	Wekk	Wegs	Wen	Wenj	Wenh	Wed	Wel	Welg	Welm	Welb	Wels	Welt	Welp	Welh	Wem	Web	Webs	Wes	Wess	Weng	Wej	Wech";

    case 199:
      return "Wek	Wet	Wep	Weh	Wi	Wig	Wikk	Wigs	Win	Winj	Winh	Wid	Wil	Wilg	Wilm	Wilb	Wils	Wilt	Wilp	Wilh	Wim	Wib	Wibs	Wis	Wiss	Wing	Wij	Wich	Wik	Wit	Wip	Wih	Yu	Yug	Yukk	Yugs	Yun	Yunj	Yunh	Yud	Yul	Yulg	Yulm	Yulb	Yuls	Yult	Yulp	Yulh	Yum	Yub	Yubs	Yus	Yuss	Yung	Yuj	Yuch	Yuk	Yut	Yup	Yuh	Eu	Eug	Eukk	Eugs	Eun	Eunj	Eunh	Eud	Eul	Eulg	Eulm	Eulb	Euls	Eult	Eulp	Eulh	Eum	Eub	Eubs	Eus	Euss	Eung	Euj	Euch	Euk	Eut	Eup	Euh	Ui	Uig	Uikk	Uigs	Uin	Uinj	Uinh	Uid	Uil	Uilg	Uilm	Uilb	Uils	Uilt	Uilp	Uilh	Uim	Uib	Uibs	Uis	Uiss	Uing	Uij	Uich	Uik	Uit	Uip	Uih	I	Ig	Ikk	Igs	In	Inj	Inh	Id	Il	Ilg	Ilm	Ilb	Ils	Ilt	Ilp	Ilh	Im	Ib	Ibs	Is	Iss	Ing	Ij	Ich	Ik	It	Ip	Ih	Ja	Jag	Jakk	Jags	Jan	Janj	Janh	Jad	Jal	Jalg	Jalm	Jalb	Jals	Jalt	Jalp	Jalh	Jam	Jab	Jabs	Jas	Jass	Jang	Jaj	Jach	Jak	Jat	Jap	Jah	Jae	Jaeg	Jaekk	Jaegs	Jaen	Jaenj	Jaenh	Jaed	Jael	Jaelg	Jaelm	Jaelb	Jaels	Jaelt	Jaelp	Jaelh	Jaem	Jaeb	Jaebs	Jaes	Jaess	Jaeng	Jaej	Jaech	Jaek	Jaet	Jaep	Jaeh	Jya	Jyag	Jyakk	Jyags	Jyan	Jyanj	Jyanh	Jyad	Jyal	Jyalg	Jyalm	Jyalb	Jyals	Jyalt	Jyalp	Jyalh	Jyam	Jyab	Jyabs	Jyas	Jyass	Jyang	Jyaj	Jyach	Jyak	Jyat	Jyap	Jyah	Jyae	Jyaeg	Jyaekk	Jyaegs	Jyaen	Jyaenj	Jyaenh	Jyaed	Jyael	Jyaelg	Jyaelm	Jyaelb	Jyaels	Jyaelt	Jyaelp	Jyaelh	Jyaem	Jyaeb	Jyaebs	Jyaes	Jyaess	Jyaeng	Jyaej	Jyaech	Jyaek	Jyaet	Jyaep	Jyaeh";

    case 200:
      return "Jeo	Jeog	Jeokk	Jeogs	Jeon	Jeonj	Jeonh	Jeod	Jeol	Jeolg	Jeolm	Jeolb	Jeols	Jeolt	Jeolp	Jeolh	Jeom	Jeob	Jeobs	Jeos	Jeoss	Jeong	Jeoj	Jeoch	Jeok	Jeot	Jeop	Jeoh	Je	Jeg	Jekk	Jegs	Jen	Jenj	Jenh	Jed	Jel	Jelg	Jelm	Jelb	Jels	Jelt	Jelp	Jelh	Jem	Jeb	Jebs	Jes	Jess	Jeng	Jej	Jech	Jek	Jet	Jep	Jeh	Jyeo	Jyeog	Jyeokk	Jyeogs	Jyeon	Jyeonj	Jyeonh	Jyeod	Jyeol	Jyeolg	Jyeolm	Jyeolb	Jyeols	Jyeolt	Jyeolp	Jyeolh	Jyeom	Jyeob	Jyeobs	Jyeos	Jyeoss	Jyeong	Jyeoj	Jyeoch	Jyeok	Jyeot	Jyeop	Jyeoh	Jye	Jyeg	Jyekk	Jyegs	Jyen	Jyenj	Jyenh	Jyed	Jyel	Jyelg	Jyelm	Jyelb	Jyels	Jyelt	Jyelp	Jyelh	Jyem	Jyeb	Jyebs	Jyes	Jyess	Jyeng	Jyej	Jyech	Jyek	Jyet	Jyep	Jyeh	Jo	Jog	Jokk	Jogs	Jon	Jonj	Jonh	Jod	Jol	Jolg	Jolm	Jolb	Jols	Jolt	Jolp	Jolh	Jom	Job	Jobs	Jos	Joss	Jong	Joj	Joch	Jok	Jot	Jop	Joh	Jwa	Jwag	Jwakk	Jwags	Jwan	Jwanj	Jwanh	Jwad	Jwal	Jwalg	Jwalm	Jwalb	Jwals	Jwalt	Jwalp	Jwalh	Jwam	Jwab	Jwabs	Jwas	Jwass	Jwang	Jwaj	Jwach	Jwak	Jwat	Jwap	Jwah	Jwae	Jwaeg	Jwaekk	Jwaegs	Jwaen	Jwaenj	Jwaenh	Jwaed	Jwael	Jwaelg	Jwaelm	Jwaelb	Jwaels	Jwaelt	Jwaelp	Jwaelh	Jwaem	Jwaeb	Jwaebs	Jwaes	Jwaess	Jwaeng	Jwaej	Jwaech	Jwaek	Jwaet	Jwaep	Jwaeh	Joe	Joeg	Joekk	Joegs	Joen	Joenj	Joenh	Joed	Joel	Joelg	Joelm	Joelb	Joels	Joelt	Joelp	Joelh	Joem	Joeb	Joebs	Joes	Joess	Joeng	Joej	Joech	Joek	Joet	Joep	Joeh	Jyo	Jyog	Jyokk	Jyogs	Jyon	Jyonj	Jyonh	Jyod	Jyol	Jyolg	Jyolm	Jyolb	Jyols	Jyolt	Jyolp	Jyolh	Jyom	Jyob	Jyobs	Jyos	Jyoss	Jyong	Jyoj	Jyoch	Jyok	Jyot	Jyop	Jyoh	Ju	Jug	Jukk	Jugs";

    case 201:
      return "Jun	Junj	Junh	Jud	Jul	Julg	Julm	Julb	Juls	Jult	Julp	Julh	Jum	Jub	Jubs	Jus	Juss	Jung	Juj	Juch	Juk	Jut	Jup	Juh	Jwo	Jwog	Jwokk	Jwogs	Jwon	Jwonj	Jwonh	Jwod	Jwol	Jwolg	Jwolm	Jwolb	Jwols	Jwolt	Jwolp	Jwolh	Jwom	Jwob	Jwobs	Jwos	Jwoss	Jwong	Jwoj	Jwoch	Jwok	Jwot	Jwop	Jwoh	Jwe	Jweg	Jwekk	Jwegs	Jwen	Jwenj	Jwenh	Jwed	Jwel	Jwelg	Jwelm	Jwelb	Jwels	Jwelt	Jwelp	Jwelh	Jwem	Jweb	Jwebs	Jwes	Jwess	Jweng	Jwej	Jwech	Jwek	Jwet	Jwep	Jweh	Jwi	Jwig	Jwikk	Jwigs	Jwin	Jwinj	Jwinh	Jwid	Jwil	Jwilg	Jwilm	Jwilb	Jwils	Jwilt	Jwilp	Jwilh	Jwim	Jwib	Jwibs	Jwis	Jwiss	Jwing	Jwij	Jwich	Jwik	Jwit	Jwip	Jwih	Jyu	Jyug	Jyukk	Jyugs	Jyun	Jyunj	Jyunh	Jyud	Jyul	Jyulg	Jyulm	Jyulb	Jyuls	Jyult	Jyulp	Jyulh	Jyum	Jyub	Jyubs	Jyus	Jyuss	Jyung	Jyuj	Jyuch	Jyuk	Jyut	Jyup	Jyuh	Jeu	Jeug	Jeukk	Jeugs	Jeun	Jeunj	Jeunh	Jeud	Jeul	Jeulg	Jeulm	Jeulb	Jeuls	Jeult	Jeulp	Jeulh	Jeum	Jeub	Jeubs	Jeus	Jeuss	Jeung	Jeuj	Jeuch	Jeuk	Jeut	Jeup	Jeuh	Jui	Juig	Juikk	Juigs	Juin	Juinj	Juinh	Juid	Juil	Juilg	Juilm	Juilb	Juils	Juilt	Juilp	Juilh	Juim	Juib	Juibs	Juis	Juiss	Juing	Juij	Juich	Juik	Juit	Juip	Juih	Ji	Jig	Jikk	Jigs	Jin	Jinj	Jinh	Jid	Jil	Jilg	Jilm	Jilb	Jils	Jilt	Jilp	Jilh	Jim	Jib	Jibs	Jis	Jiss	Jing	Jij	Jich	Jik	Jit	Jip	Jih	Jja	Jjag	Jjakk	Jjags	Jjan	Jjanj	Jjanh	Jjad	Jjal	Jjalg	Jjalm	Jjalb	Jjals	Jjalt	Jjalp	Jjalh	Jjam	Jjab	Jjabs	Jjas	Jjass	Jjang	Jjaj	Jjach	Jjak	Jjat	Jjap	Jjah	Jjae	Jjaeg	Jjaekk	Jjaegs	Jjaen	Jjaenj	Jjaenh	Jjaed";

    case 202:
      return "Jjael	Jjaelg	Jjaelm	Jjaelb	Jjaels	Jjaelt	Jjaelp	Jjaelh	Jjaem	Jjaeb	Jjaebs	Jjaes	Jjaess	Jjaeng	Jjaej	Jjaech	Jjaek	Jjaet	Jjaep	Jjaeh	Jjya	Jjyag	Jjyakk	Jjyags	Jjyan	Jjyanj	Jjyanh	Jjyad	Jjyal	Jjyalg	Jjyalm	Jjyalb	Jjyals	Jjyalt	Jjyalp	Jjyalh	Jjyam	Jjyab	Jjyabs	Jjyas	Jjyass	Jjyang	Jjyaj	Jjyach	Jjyak	Jjyat	Jjyap	Jjyah	Jjyae	Jjyaeg	Jjyaekk	Jjyaegs	Jjyaen	Jjyaenj	Jjyaenh	Jjyaed	Jjyael	Jjyaelg	Jjyaelm	Jjyaelb	Jjyaels	Jjyaelt	Jjyaelp	Jjyaelh	Jjyaem	Jjyaeb	Jjyaebs	Jjyaes	Jjyaess	Jjyaeng	Jjyaej	Jjyaech	Jjyaek	Jjyaet	Jjyaep	Jjyaeh	Jjeo	Jjeog	Jjeokk	Jjeogs	Jjeon	Jjeonj	Jjeonh	Jjeod	Jjeol	Jjeolg	Jjeolm	Jjeolb	Jjeols	Jjeolt	Jjeolp	Jjeolh	Jjeom	Jjeob	Jjeobs	Jjeos	Jjeoss	Jjeong	Jjeoj	Jjeoch	Jjeok	Jjeot	Jjeop	Jjeoh	Jje	Jjeg	Jjekk	Jjegs	Jjen	Jjenj	Jjenh	Jjed	Jjel	Jjelg	Jjelm	Jjelb	Jjels	Jjelt	Jjelp	Jjelh	Jjem	Jjeb	Jjebs	Jjes	Jjess	Jjeng	Jjej	Jjech	Jjek	Jjet	Jjep	Jjeh	Jjyeo	Jjyeog	Jjyeokk	Jjyeogs	Jjyeon	Jjyeonj	Jjyeonh	Jjyeod	Jjyeol	Jjyeolg	Jjyeolm	Jjyeolb	Jjyeols	Jjyeolt	Jjyeolp	Jjyeolh	Jjyeom	Jjyeob	Jjyeobs	Jjyeos	Jjyeoss	Jjyeong	Jjyeoj	Jjyeoch	Jjyeok	Jjyeot	Jjyeop	Jjyeoh	Jjye	Jjyeg	Jjyekk	Jjyegs	Jjyen	Jjyenj	Jjyenh	Jjyed	Jjyel	Jjyelg	Jjyelm	Jjyelb	Jjyels	Jjyelt	Jjyelp	Jjyelh	Jjyem	Jjyeb	Jjyebs	Jjyes	Jjyess	Jjyeng	Jjyej	Jjyech	Jjyek	Jjyet	Jjyep	Jjyeh	Jjo	Jjog	Jjokk	Jjogs	Jjon	Jjonj	Jjonh	Jjod	Jjol	Jjolg	Jjolm	Jjolb	Jjols	Jjolt	Jjolp	Jjolh	Jjom	Jjob	Jjobs	Jjos	Jjoss	Jjong	Jjoj	Jjoch	Jjok	Jjot	Jjop	Jjoh	Jjwa	Jjwag	Jjwakk	Jjwags	Jjwan	Jjwanj	Jjwanh	Jjwad	Jjwal	Jjwalg	Jjwalm	Jjwalb	Jjwals	Jjwalt	Jjwalp	Jjwalh	Jjwam	Jjwab	Jjwabs	Jjwas	Jjwass	Jjwang	Jjwaj	Jjwach	Jjwak	Jjwat	Jjwap	Jjwah	Jjwae	Jjwaeg	Jjwaekk	Jjwaegs	Jjwaen	Jjwaenj	Jjwaenh	Jjwaed	Jjwael	Jjwaelg	Jjwaelm	Jjwaelb";

    case 203:
      return "Jjwaels	Jjwaelt	Jjwaelp	Jjwaelh	Jjwaem	Jjwaeb	Jjwaebs	Jjwaes	Jjwaess	Jjwaeng	Jjwaej	Jjwaech	Jjwaek	Jjwaet	Jjwaep	Jjwaeh	Jjoe	Jjoeg	Jjoekk	Jjoegs	Jjoen	Jjoenj	Jjoenh	Jjoed	Jjoel	Jjoelg	Jjoelm	Jjoelb	Jjoels	Jjoelt	Jjoelp	Jjoelh	Jjoem	Jjoeb	Jjoebs	Jjoes	Jjoess	Jjoeng	Jjoej	Jjoech	Jjoek	Jjoet	Jjoep	Jjoeh	Jjyo	Jjyog	Jjyokk	Jjyogs	Jjyon	Jjyonj	Jjyonh	Jjyod	Jjyol	Jjyolg	Jjyolm	Jjyolb	Jjyols	Jjyolt	Jjyolp	Jjyolh	Jjyom	Jjyob	Jjyobs	Jjyos	Jjyoss	Jjyong	Jjyoj	Jjyoch	Jjyok	Jjyot	Jjyop	Jjyoh	Jju	Jjug	Jjukk	Jjugs	Jjun	Jjunj	Jjunh	Jjud	Jjul	Jjulg	Jjulm	Jjulb	Jjuls	Jjult	Jjulp	Jjulh	Jjum	Jjub	Jjubs	Jjus	Jjuss	Jjung	Jjuj	Jjuch	Jjuk	Jjut	Jjup	Jjuh	Jjwo	Jjwog	Jjwokk	Jjwogs	Jjwon	Jjwonj	Jjwonh	Jjwod	Jjwol	Jjwolg	Jjwolm	Jjwolb	Jjwols	Jjwolt	Jjwolp	Jjwolh	Jjwom	Jjwob	Jjwobs	Jjwos	Jjwoss	Jjwong	Jjwoj	Jjwoch	Jjwok	Jjwot	Jjwop	Jjwoh	Jjwe	Jjweg	Jjwekk	Jjwegs	Jjwen	Jjwenj	Jjwenh	Jjwed	Jjwel	Jjwelg	Jjwelm	Jjwelb	Jjwels	Jjwelt	Jjwelp	Jjwelh	Jjwem	Jjweb	Jjwebs	Jjwes	Jjwess	Jjweng	Jjwej	Jjwech	Jjwek	Jjwet	Jjwep	Jjweh	Jjwi	Jjwig	Jjwikk	Jjwigs	Jjwin	Jjwinj	Jjwinh	Jjwid	Jjwil	Jjwilg	Jjwilm	Jjwilb	Jjwils	Jjwilt	Jjwilp	Jjwilh	Jjwim	Jjwib	Jjwibs	Jjwis	Jjwiss	Jjwing	Jjwij	Jjwich	Jjwik	Jjwit	Jjwip	Jjwih	Jjyu	Jjyug	Jjyukk	Jjyugs	Jjyun	Jjyunj	Jjyunh	Jjyud	Jjyul	Jjyulg	Jjyulm	Jjyulb	Jjyuls	Jjyult	Jjyulp	Jjyulh	Jjyum	Jjyub	Jjyubs	Jjyus	Jjyuss	Jjyung	Jjyuj	Jjyuch	Jjyuk	Jjyut	Jjyup	Jjyuh	Jjeu	Jjeug	Jjeukk	Jjeugs	Jjeun	Jjeunj	Jjeunh	Jjeud	Jjeul	Jjeulg	Jjeulm	Jjeulb	Jjeuls	Jjeult	Jjeulp	Jjeulh	Jjeum	Jjeub	Jjeubs	Jjeus	Jjeuss	Jjeung	Jjeuj	Jjeuch	Jjeuk	Jjeut	Jjeup	Jjeuh	Jjui	Jjuig	Jjuikk	Jjuigs	Jjuin	Jjuinj	Jjuinh	Jjuid	Jjuil	Jjuilg	Jjuilm	Jjuilb	Jjuils	Jjuilt	Jjuilp	Jjuilh";

    case 204:
      return "Jjuim	Jjuib	Jjuibs	Jjuis	Jjuiss	Jjuing	Jjuij	Jjuich	Jjuik	Jjuit	Jjuip	Jjuih	Jji	Jjig	Jjikk	Jjigs	Jjin	Jjinj	Jjinh	Jjid	Jjil	Jjilg	Jjilm	Jjilb	Jjils	Jjilt	Jjilp	Jjilh	Jjim	Jjib	Jjibs	Jjis	Jjiss	Jjing	Jjij	Jjich	Jjik	Jjit	Jjip	Jjih	Cha	Chag	Chakk	Chags	Chan	Chanj	Chanh	Chad	Chal	Chalg	Chalm	Chalb	Chals	Chalt	Chalp	Chalh	Cham	Chab	Chabs	Chas	Chass	Chang	Chaj	Chach	Chak	Chat	Chap	Chah	Chae	Chaeg	Chaekk	Chaegs	Chaen	Chaenj	Chaenh	Chaed	Chael	Chaelg	Chaelm	Chaelb	Chaels	Chaelt	Chaelp	Chaelh	Chaem	Chaeb	Chaebs	Chaes	Chaess	Chaeng	Chaej	Chaech	Chaek	Chaet	Chaep	Chaeh	Chya	Chyag	Chyakk	Chyags	Chyan	Chyanj	Chyanh	Chyad	Chyal	Chyalg	Chyalm	Chyalb	Chyals	Chyalt	Chyalp	Chyalh	Chyam	Chyab	Chyabs	Chyas	Chyass	Chyang	Chyaj	Chyach	Chyak	Chyat	Chyap	Chyah	Chyae	Chyaeg	Chyaekk	Chyaegs	Chyaen	Chyaenj	Chyaenh	Chyaed	Chyael	Chyaelg	Chyaelm	Chyaelb	Chyaels	Chyaelt	Chyaelp	Chyaelh	Chyaem	Chyaeb	Chyaebs	Chyaes	Chyaess	Chyaeng	Chyaej	Chyaech	Chyaek	Chyaet	Chyaep	Chyaeh	Cheo	Cheog	Cheokk	Cheogs	Cheon	Cheonj	Cheonh	Cheod	Cheol	Cheolg	Cheolm	Cheolb	Cheols	Cheolt	Cheolp	Cheolh	Cheom	Cheob	Cheobs	Cheos	Cheoss	Cheong	Cheoj	Cheoch	Cheok	Cheot	Cheop	Cheoh	Che	Cheg	Chekk	Chegs	Chen	Chenj	Chenh	Ched	Chel	Chelg	Chelm	Chelb	Chels	Chelt	Chelp	Chelh	Chem	Cheb	Chebs	Ches	Chess	Cheng	Chej	Chech	Chek	Chet	Chep	Cheh	Chyeo	Chyeog	Chyeokk	Chyeogs	Chyeon	Chyeonj	Chyeonh	Chyeod	Chyeol	Chyeolg	Chyeolm	Chyeolb	Chyeols	Chyeolt	Chyeolp	Chyeolh	Chyeom	Chyeob	Chyeobs	Chyeos	Chyeoss	Chyeong	Chyeoj	Chyeoch	Chyeok	Chyeot	Chyeop	Chyeoh	Chye	Chyeg	Chyekk	Chyegs	Chyen	Chyenj	Chyenh	Chyed	Chyel	Chyelg	Chyelm	Chyelb	Chyels	Chyelt	Chyelp	Chyelh	Chyem	Chyeb	Chyebs	Chyes";

    case 205:
      return "Chyess	Chyeng	Chyej	Chyech	Chyek	Chyet	Chyep	Chyeh	Cho	Chog	Chokk	Chogs	Chon	Chonj	Chonh	Chod	Chol	Cholg	Cholm	Cholb	Chols	Cholt	Cholp	Cholh	Chom	Chob	Chobs	Chos	Choss	Chong	Choj	Choch	Chok	Chot	Chop	Choh	Chwa	Chwag	Chwakk	Chwags	Chwan	Chwanj	Chwanh	Chwad	Chwal	Chwalg	Chwalm	Chwalb	Chwals	Chwalt	Chwalp	Chwalh	Chwam	Chwab	Chwabs	Chwas	Chwass	Chwang	Chwaj	Chwach	Chwak	Chwat	Chwap	Chwah	Chwae	Chwaeg	Chwaekk	Chwaegs	Chwaen	Chwaenj	Chwaenh	Chwaed	Chwael	Chwaelg	Chwaelm	Chwaelb	Chwaels	Chwaelt	Chwaelp	Chwaelh	Chwaem	Chwaeb	Chwaebs	Chwaes	Chwaess	Chwaeng	Chwaej	Chwaech	Chwaek	Chwaet	Chwaep	Chwaeh	Choe	Choeg	Choekk	Choegs	Choen	Choenj	Choenh	Choed	Choel	Choelg	Choelm	Choelb	Choels	Choelt	Choelp	Choelh	Choem	Choeb	Choebs	Choes	Choess	Choeng	Choej	Choech	Choek	Choet	Choep	Choeh	Chyo	Chyog	Chyokk	Chyogs	Chyon	Chyonj	Chyonh	Chyod	Chyol	Chyolg	Chyolm	Chyolb	Chyols	Chyolt	Chyolp	Chyolh	Chyom	Chyob	Chyobs	Chyos	Chyoss	Chyong	Chyoj	Chyoch	Chyok	Chyot	Chyop	Chyoh	Chu	Chug	Chukk	Chugs	Chun	Chunj	Chunh	Chud	Chul	Chulg	Chulm	Chulb	Chuls	Chult	Chulp	Chulh	Chum	Chub	Chubs	Chus	Chuss	Chung	Chuj	Chuch	Chuk	Chut	Chup	Chuh	Chwo	Chwog	Chwokk	Chwogs	Chwon	Chwonj	Chwonh	Chwod	Chwol	Chwolg	Chwolm	Chwolb	Chwols	Chwolt	Chwolp	Chwolh	Chwom	Chwob	Chwobs	Chwos	Chwoss	Chwong	Chwoj	Chwoch	Chwok	Chwot	Chwop	Chwoh	Chwe	Chweg	Chwekk	Chwegs	Chwen	Chwenj	Chwenh	Chwed	Chwel	Chwelg	Chwelm	Chwelb	Chwels	Chwelt	Chwelp	Chwelh	Chwem	Chweb	Chwebs	Chwes	Chwess	Chweng	Chwej	Chwech	Chwek	Chwet	Chwep	Chweh	Chwi	Chwig	Chwikk	Chwigs	Chwin	Chwinj	Chwinh	Chwid	Chwil	Chwilg	Chwilm	Chwilb	Chwils	Chwilt	Chwilp	Chwilh	Chwim	Chwib	Chwibs	Chwis	Chwiss	Chwing	Chwij	Chwich";

    case 206:
      return "Chwik	Chwit	Chwip	Chwih	Chyu	Chyug	Chyukk	Chyugs	Chyun	Chyunj	Chyunh	Chyud	Chyul	Chyulg	Chyulm	Chyulb	Chyuls	Chyult	Chyulp	Chyulh	Chyum	Chyub	Chyubs	Chyus	Chyuss	Chyung	Chyuj	Chyuch	Chyuk	Chyut	Chyup	Chyuh	Cheu	Cheug	Cheukk	Cheugs	Cheun	Cheunj	Cheunh	Cheud	Cheul	Cheulg	Cheulm	Cheulb	Cheuls	Cheult	Cheulp	Cheulh	Cheum	Cheub	Cheubs	Cheus	Cheuss	Cheung	Cheuj	Cheuch	Cheuk	Cheut	Cheup	Cheuh	Chui	Chuig	Chuikk	Chuigs	Chuin	Chuinj	Chuinh	Chuid	Chuil	Chuilg	Chuilm	Chuilb	Chuils	Chuilt	Chuilp	Chuilh	Chuim	Chuib	Chuibs	Chuis	Chuiss	Chuing	Chuij	Chuich	Chuik	Chuit	Chuip	Chuih	Chi	Chig	Chikk	Chigs	Chin	Chinj	Chinh	Chid	Chil	Chilg	Chilm	Chilb	Chils	Chilt	Chilp	Chilh	Chim	Chib	Chibs	Chis	Chiss	Ching	Chij	Chich	Chik	Chit	Chip	Chih	Ka	Kag	Kakk	Kags	Kan	Kanj	Kanh	Kad	Kal	Kalg	Kalm	Kalb	Kals	Kalt	Kalp	Kalh	Kam	Kab	Kabs	Kas	Kass	Kang	Kaj	Kach	Kak	Kat	Kap	Kah	Kae	Kaeg	Kaekk	Kaegs	Kaen	Kaenj	Kaenh	Kaed	Kael	Kaelg	Kaelm	Kaelb	Kaels	Kaelt	Kaelp	Kaelh	Kaem	Kaeb	Kaebs	Kaes	Kaess	Kaeng	Kaej	Kaech	Kaek	Kaet	Kaep	Kaeh	Kya	Kyag	Kyakk	Kyags	Kyan	Kyanj	Kyanh	Kyad	Kyal	Kyalg	Kyalm	Kyalb	Kyals	Kyalt	Kyalp	Kyalh	Kyam	Kyab	Kyabs	Kyas	Kyass	Kyang	Kyaj	Kyach	Kyak	Kyat	Kyap	Kyah	Kyae	Kyaeg	Kyaekk	Kyaegs	Kyaen	Kyaenj	Kyaenh	Kyaed	Kyael	Kyaelg	Kyaelm	Kyaelb	Kyaels	Kyaelt	Kyaelp	Kyaelh	Kyaem	Kyaeb	Kyaebs	Kyaes	Kyaess	Kyaeng	Kyaej	Kyaech	Kyaek	Kyaet	Kyaep	Kyaeh	Keo	Keog	Keokk	Keogs	Keon	Keonj	Keonh	Keod	Keol	Keolg	Keolm	Keolb	Keols	Keolt	Keolp	Keolh	Keom	Keob	Keobs	Keos	Keoss	Keong	Keoj	Keoch	Keok	Keot	Keop	Keoh";

    case 207:
      return "Ke	Keg	Kekk	Kegs	Ken	Kenj	Kenh	Ked	Kel	Kelg	Kelm	Kelb	Kels	Kelt	Kelp	Kelh	Kem	Keb	Kebs	Kes	Kess	Keng	Kej	Kech	Kek	Ket	Kep	Keh	Kyeo	Kyeog	Kyeokk	Kyeogs	Kyeon	Kyeonj	Kyeonh	Kyeod	Kyeol	Kyeolg	Kyeolm	Kyeolb	Kyeols	Kyeolt	Kyeolp	Kyeolh	Kyeom	Kyeob	Kyeobs	Kyeos	Kyeoss	Kyeong	Kyeoj	Kyeoch	Kyeok	Kyeot	Kyeop	Kyeoh	Kye	Kyeg	Kyekk	Kyegs	Kyen	Kyenj	Kyenh	Kyed	Kyel	Kyelg	Kyelm	Kyelb	Kyels	Kyelt	Kyelp	Kyelh	Kyem	Kyeb	Kyebs	Kyes	Kyess	Kyeng	Kyej	Kyech	Kyek	Kyet	Kyep	Kyeh	Ko	Kog	Kokk	Kogs	Kon	Konj	Konh	Kod	Kol	Kolg	Kolm	Kolb	Kols	Kolt	Kolp	Kolh	Kom	Kob	Kobs	Kos	Koss	Kong	Koj	Koch	Kok	Kot	Kop	Koh	Kwa	Kwag	Kwakk	Kwags	Kwan	Kwanj	Kwanh	Kwad	Kwal	Kwalg	Kwalm	Kwalb	Kwals	Kwalt	Kwalp	Kwalh	Kwam	Kwab	Kwabs	Kwas	Kwass	Kwang	Kwaj	Kwach	Kwak	Kwat	Kwap	Kwah	Kwae	Kwaeg	Kwaekk	Kwaegs	Kwaen	Kwaenj	Kwaenh	Kwaed	Kwael	Kwaelg	Kwaelm	Kwaelb	Kwaels	Kwaelt	Kwaelp	Kwaelh	Kwaem	Kwaeb	Kwaebs	Kwaes	Kwaess	Kwaeng	Kwaej	Kwaech	Kwaek	Kwaet	Kwaep	Kwaeh	Koe	Koeg	Koekk	Koegs	Koen	Koenj	Koenh	Koed	Koel	Koelg	Koelm	Koelb	Koels	Koelt	Koelp	Koelh	Koem	Koeb	Koebs	Koes	Koess	Koeng	Koej	Koech	Koek	Koet	Koep	Koeh	Kyo	Kyog	Kyokk	Kyogs	Kyon	Kyonj	Kyonh	Kyod	Kyol	Kyolg	Kyolm	Kyolb	Kyols	Kyolt	Kyolp	Kyolh	Kyom	Kyob	Kyobs	Kyos	Kyoss	Kyong	Kyoj	Kyoch	Kyok	Kyot	Kyop	Kyoh	Ku	Kug	Kukk	Kugs	Kun	Kunj	Kunh	Kud	Kul	Kulg	Kulm	Kulb	Kuls	Kult	Kulp	Kulh	Kum	Kub	Kubs	Kus	Kuss	Kung	Kuj	Kuch	Kuk	Kut	Kup	Kuh	Kwo	Kwog	Kwokk	Kwogs";

    case 208:
      return "Kwon	Kwonj	Kwonh	Kwod	Kwol	Kwolg	Kwolm	Kwolb	Kwols	Kwolt	Kwolp	Kwolh	Kwom	Kwob	Kwobs	Kwos	Kwoss	Kwong	Kwoj	Kwoch	Kwok	Kwot	Kwop	Kwoh	Kwe	Kweg	Kwekk	Kwegs	Kwen	Kwenj	Kwenh	Kwed	Kwel	Kwelg	Kwelm	Kwelb	Kwels	Kwelt	Kwelp	Kwelh	Kwem	Kweb	Kwebs	Kwes	Kwess	Kweng	Kwej	Kwech	Kwek	Kwet	Kwep	Kweh	Kwi	Kwig	Kwikk	Kwigs	Kwin	Kwinj	Kwinh	Kwid	Kwil	Kwilg	Kwilm	Kwilb	Kwils	Kwilt	Kwilp	Kwilh	Kwim	Kwib	Kwibs	Kwis	Kwiss	Kwing	Kwij	Kwich	Kwik	Kwit	Kwip	Kwih	Kyu	Kyug	Kyukk	Kyugs	Kyun	Kyunj	Kyunh	Kyud	Kyul	Kyulg	Kyulm	Kyulb	Kyuls	Kyult	Kyulp	Kyulh	Kyum	Kyub	Kyubs	Kyus	Kyuss	Kyung	Kyuj	Kyuch	Kyuk	Kyut	Kyup	Kyuh	Keu	Keug	Keukk	Keugs	Keun	Keunj	Keunh	Keud	Keul	Keulg	Keulm	Keulb	Keuls	Keult	Keulp	Keulh	Keum	Keub	Keubs	Keus	Keuss	Keung	Keuj	Keuch	Keuk	Keut	Keup	Keuh	Kui	Kuig	Kuikk	Kuigs	Kuin	Kuinj	Kuinh	Kuid	Kuil	Kuilg	Kuilm	Kuilb	Kuils	Kuilt	Kuilp	Kuilh	Kuim	Kuib	Kuibs	Kuis	Kuiss	Kuing	Kuij	Kuich	Kuik	Kuit	Kuip	Kuih	Ki	Kig	Kikk	Kigs	Kin	Kinj	Kinh	Kid	Kil	Kilg	Kilm	Kilb	Kils	Kilt	Kilp	Kilh	Kim	Kib	Kibs	Kis	Kiss	King	Kij	Kich	Kik	Kit	Kip	Kih	Ta	Tag	Takk	Tags	Tan	Tanj	Tanh	Tad	Tal	Talg	Talm	Talb	Tals	Talt	Talp	Talh	Tam	Tab	Tabs	Tas	Tass	Tang	Taj	Tach	Tak	Tat	Tap	Tah	Tae	Taeg	Taekk	Taegs	Taen	Taenj	Taenh	Taed	Tael	Taelg	Taelm	Taelb	Taels	Taelt	Taelp	Taelh	Taem	Taeb	Taebs	Taes	Taess	Taeng	Taej	Taech	Taek	Taet	Taep	Taeh	Tya	Tyag	Tyakk	Tyags	Tyan	Tyanj	Tyanh	Tyad";

    case 209:
      return "Tyal	Tyalg	Tyalm	Tyalb	Tyals	Tyalt	Tyalp	Tyalh	Tyam	Tyab	Tyabs	Tyas	Tyass	Tyang	Tyaj	Tyach	Tyak	Tyat	Tyap	Tyah	Tyae	Tyaeg	Tyaekk	Tyaegs	Tyaen	Tyaenj	Tyaenh	Tyaed	Tyael	Tyaelg	Tyaelm	Tyaelb	Tyaels	Tyaelt	Tyaelp	Tyaelh	Tyaem	Tyaeb	Tyaebs	Tyaes	Tyaess	Tyaeng	Tyaej	Tyaech	Tyaek	Tyaet	Tyaep	Tyaeh	Teo	Teog	Teokk	Teogs	Teon	Teonj	Teonh	Teod	Teol	Teolg	Teolm	Teolb	Teols	Teolt	Teolp	Teolh	Teom	Teob	Teobs	Teos	Teoss	Teong	Teoj	Teoch	Teok	Teot	Teop	Teoh	Te	Teg	Tekk	Tegs	Ten	Tenj	Tenh	Ted	Tel	Telg	Telm	Telb	Tels	Telt	Telp	Telh	Tem	Teb	Tebs	Tes	Tess	Teng	Tej	Tech	Tek	Tet	Tep	Teh	Tyeo	Tyeog	Tyeokk	Tyeogs	Tyeon	Tyeonj	Tyeonh	Tyeod	Tyeol	Tyeolg	Tyeolm	Tyeolb	Tyeols	Tyeolt	Tyeolp	Tyeolh	Tyeom	Tyeob	Tyeobs	Tyeos	Tyeoss	Tyeong	Tyeoj	Tyeoch	Tyeok	Tyeot	Tyeop	Tyeoh	Tye	Tyeg	Tyekk	Tyegs	Tyen	Tyenj	Tyenh	Tyed	Tyel	Tyelg	Tyelm	Tyelb	Tyels	Tyelt	Tyelp	Tyelh	Tyem	Tyeb	Tyebs	Tyes	Tyess	Tyeng	Tyej	Tyech	Tyek	Tyet	Tyep	Tyeh	To	Tog	Tokk	Togs	Ton	Tonj	Tonh	Tod	Tol	Tolg	Tolm	Tolb	Tols	Tolt	Tolp	Tolh	Tom	Tob	Tobs	Tos	Toss	Tong	Toj	Toch	Tok	Tot	Top	Toh	Twa	Twag	Twakk	Twags	Twan	Twanj	Twanh	Twad	Twal	Twalg	Twalm	Twalb	Twals	Twalt	Twalp	Twalh	Twam	Twab	Twabs	Twas	Twass	Twang	Twaj	Twach	Twak	Twat	Twap	Twah	Twae	Twaeg	Twaekk	Twaegs	Twaen	Twaenj	Twaenh	Twaed	Twael	Twaelg	Twaelm	Twaelb	Twaels	Twaelt	Twaelp	Twaelh	Twaem	Twaeb	Twaebs	Twaes	Twaess	Twaeng	Twaej	Twaech	Twaek	Twaet	Twaep	Twaeh	Toe	Toeg	Toekk	Toegs	Toen	Toenj	Toenh	Toed	Toel	Toelg	Toelm	Toelb";

    case 210:
      return "Toels	Toelt	Toelp	Toelh	Toem	Toeb	Toebs	Toes	Toess	Toeng	Toej	Toech	Toek	Toet	Toep	Toeh	Tyo	Tyog	Tyokk	Tyogs	Tyon	Tyonj	Tyonh	Tyod	Tyol	Tyolg	Tyolm	Tyolb	Tyols	Tyolt	Tyolp	Tyolh	Tyom	Tyob	Tyobs	Tyos	Tyoss	Tyong	Tyoj	Tyoch	Tyok	Tyot	Tyop	Tyoh	Tu	Tug	Tukk	Tugs	Tun	Tunj	Tunh	Tud	Tul	Tulg	Tulm	Tulb	Tuls	Tult	Tulp	Tulh	Tum	Tub	Tubs	Tus	Tuss	Tung	Tuj	Tuch	Tuk	Tut	Tup	Tuh	Two	Twog	Twokk	Twogs	Twon	Twonj	Twonh	Twod	Twol	Twolg	Twolm	Twolb	Twols	Twolt	Twolp	Twolh	Twom	Twob	Twobs	Twos	Twoss	Twong	Twoj	Twoch	Twok	Twot	Twop	Twoh	Twe	Tweg	Twekk	Twegs	Twen	Twenj	Twenh	Twed	Twel	Twelg	Twelm	Twelb	Twels	Twelt	Twelp	Twelh	Twem	Tweb	Twebs	Twes	Twess	Tweng	Twej	Twech	Twek	Twet	Twep	Tweh	Twi	Twig	Twikk	Twigs	Twin	Twinj	Twinh	Twid	Twil	Twilg	Twilm	Twilb	Twils	Twilt	Twilp	Twilh	Twim	Twib	Twibs	Twis	Twiss	Twing	Twij	Twich	Twik	Twit	Twip	Twih	Tyu	Tyug	Tyukk	Tyugs	Tyun	Tyunj	Tyunh	Tyud	Tyul	Tyulg	Tyulm	Tyulb	Tyuls	Tyult	Tyulp	Tyulh	Tyum	Tyub	Tyubs	Tyus	Tyuss	Tyung	Tyuj	Tyuch	Tyuk	Tyut	Tyup	Tyuh	Teu	Teug	Teukk	Teugs	Teun	Teunj	Teunh	Teud	Teul	Teulg	Teulm	Teulb	Teuls	Teult	Teulp	Teulh	Teum	Teub	Teubs	Teus	Teuss	Teung	Teuj	Teuch	Teuk	Teut	Teup	Teuh	Tui	Tuig	Tuikk	Tuigs	Tuin	Tuinj	Tuinh	Tuid	Tuil	Tuilg	Tuilm	Tuilb	Tuils	Tuilt	Tuilp	Tuilh	Tuim	Tuib	Tuibs	Tuis	Tuiss	Tuing	Tuij	Tuich	Tuik	Tuit	Tuip	Tuih	Ti	Tig	Tikk	Tigs	Tin	Tinj	Tinh	Tid	Til	Tilg	Tilm	Tilb	Tils	Tilt	Tilp	Tilh";

    case 211:
      return "Tim	Tib	Tibs	Tis	Tiss	Ting	Tij	Tich	Tik	Tit	Tip	Tih	Pa	Pag	Pakk	Pags	Pan	Panj	Panh	Pad	Pal	Palg	Palm	Palb	Pals	Palt	Palp	Palh	Pam	Pab	Pabs	Pas	Pass	Pang	Paj	Pach	Pak	Pat	Pap	Pah	Pae	Paeg	Paekk	Paegs	Paen	Paenj	Paenh	Paed	Pael	Paelg	Paelm	Paelb	Paels	Paelt	Paelp	Paelh	Paem	Paeb	Paebs	Paes	Paess	Paeng	Paej	Paech	Paek	Paet	Paep	Paeh	Pya	Pyag	Pyakk	Pyags	Pyan	Pyanj	Pyanh	Pyad	Pyal	Pyalg	Pyalm	Pyalb	Pyals	Pyalt	Pyalp	Pyalh	Pyam	Pyab	Pyabs	Pyas	Pyass	Pyang	Pyaj	Pyach	Pyak	Pyat	Pyap	Pyah	Pyae	Pyaeg	Pyaekk	Pyaegs	Pyaen	Pyaenj	Pyaenh	Pyaed	Pyael	Pyaelg	Pyaelm	Pyaelb	Pyaels	Pyaelt	Pyaelp	Pyaelh	Pyaem	Pyaeb	Pyaebs	Pyaes	Pyaess	Pyaeng	Pyaej	Pyaech	Pyaek	Pyaet	Pyaep	Pyaeh	Peo	Peog	Peokk	Peogs	Peon	Peonj	Peonh	Peod	Peol	Peolg	Peolm	Peolb	Peols	Peolt	Peolp	Peolh	Peom	Peob	Peobs	Peos	Peoss	Peong	Peoj	Peoch	Peok	Peot	Peop	Peoh	Pe	Peg	Pekk	Pegs	Pen	Penj	Penh	Ped	Pel	Pelg	Pelm	Pelb	Pels	Pelt	Pelp	Pelh	Pem	Peb	Pebs	Pes	Pess	Peng	Pej	Pech	Pek	Pet	Pep	Peh	Pyeo	Pyeog	Pyeokk	Pyeogs	Pyeon	Pyeonj	Pyeonh	Pyeod	Pyeol	Pyeolg	Pyeolm	Pyeolb	Pyeols	Pyeolt	Pyeolp	Pyeolh	Pyeom	Pyeob	Pyeobs	Pyeos	Pyeoss	Pyeong	Pyeoj	Pyeoch	Pyeok	Pyeot	Pyeop	Pyeoh	Pye	Pyeg	Pyekk	Pyegs	Pyen	Pyenj	Pyenh	Pyed	Pyel	Pyelg	Pyelm	Pyelb	Pyels	Pyelt	Pyelp	Pyelh	Pyem	Pyeb	Pyebs	Pyes	Pyess	Pyeng	Pyej	Pyech	Pyek	Pyet	Pyep	Pyeh	Po	Pog	Pokk	Pogs	Pon	Ponj	Ponh	Pod	Pol	Polg	Polm	Polb	Pols	Polt	Polp	Polh	Pom	Pob	Pobs	Pos";

    case 212:
      return "Poss	Pong	Poj	Poch	Pok	Pot	Pop	Poh	Pwa	Pwag	Pwakk	Pwags	Pwan	Pwanj	Pwanh	Pwad	Pwal	Pwalg	Pwalm	Pwalb	Pwals	Pwalt	Pwalp	Pwalh	Pwam	Pwab	Pwabs	Pwas	Pwass	Pwang	Pwaj	Pwach	Pwak	Pwat	Pwap	Pwah	Pwae	Pwaeg	Pwaekk	Pwaegs	Pwaen	Pwaenj	Pwaenh	Pwaed	Pwael	Pwaelg	Pwaelm	Pwaelb	Pwaels	Pwaelt	Pwaelp	Pwaelh	Pwaem	Pwaeb	Pwaebs	Pwaes	Pwaess	Pwaeng	Pwaej	Pwaech	Pwaek	Pwaet	Pwaep	Pwaeh	Poe	Poeg	Poekk	Poegs	Poen	Poenj	Poenh	Poed	Poel	Poelg	Poelm	Poelb	Poels	Poelt	Poelp	Poelh	Poem	Poeb	Poebs	Poes	Poess	Poeng	Poej	Poech	Poek	Poet	Poep	Poeh	Pyo	Pyog	Pyokk	Pyogs	Pyon	Pyonj	Pyonh	Pyod	Pyol	Pyolg	Pyolm	Pyolb	Pyols	Pyolt	Pyolp	Pyolh	Pyom	Pyob	Pyobs	Pyos	Pyoss	Pyong	Pyoj	Pyoch	Pyok	Pyot	Pyop	Pyoh	Pu	Pug	Pukk	Pugs	Pun	Punj	Punh	Pud	Pul	Pulg	Pulm	Pulb	Puls	Pult	Pulp	Pulh	Pum	Pub	Pubs	Pus	Puss	Pung	Puj	Puch	Puk	Put	Pup	Puh	Pwo	Pwog	Pwokk	Pwogs	Pwon	Pwonj	Pwonh	Pwod	Pwol	Pwolg	Pwolm	Pwolb	Pwols	Pwolt	Pwolp	Pwolh	Pwom	Pwob	Pwobs	Pwos	Pwoss	Pwong	Pwoj	Pwoch	Pwok	Pwot	Pwop	Pwoh	Pwe	Pweg	Pwekk	Pwegs	Pwen	Pwenj	Pwenh	Pwed	Pwel	Pwelg	Pwelm	Pwelb	Pwels	Pwelt	Pwelp	Pwelh	Pwem	Pweb	Pwebs	Pwes	Pwess	Pweng	Pwej	Pwech	Pwek	Pwet	Pwep	Pweh	Pwi	Pwig	Pwikk	Pwigs	Pwin	Pwinj	Pwinh	Pwid	Pwil	Pwilg	Pwilm	Pwilb	Pwils	Pwilt	Pwilp	Pwilh	Pwim	Pwib	Pwibs	Pwis	Pwiss	Pwing	Pwij	Pwich	Pwik	Pwit	Pwip	Pwih	Pyu	Pyug	Pyukk	Pyugs	Pyun	Pyunj	Pyunh	Pyud	Pyul	Pyulg	Pyulm	Pyulb	Pyuls	Pyult	Pyulp	Pyulh	Pyum	Pyub	Pyubs	Pyus	Pyuss	Pyung	Pyuj	Pyuch";

    case 213:
      return "Pyuk	Pyut	Pyup	Pyuh	Peu	Peug	Peukk	Peugs	Peun	Peunj	Peunh	Peud	Peul	Peulg	Peulm	Peulb	Peuls	Peult	Peulp	Peulh	Peum	Peub	Peubs	Peus	Peuss	Peung	Peuj	Peuch	Peuk	Peut	Peup	Peuh	Pui	Puig	Puikk	Puigs	Puin	Puinj	Puinh	Puid	Puil	Puilg	Puilm	Puilb	Puils	Puilt	Puilp	Puilh	Puim	Puib	Puibs	Puis	Puiss	Puing	Puij	Puich	Puik	Puit	Puip	Puih	Pi	Pig	Pikk	Pigs	Pin	Pinj	Pinh	Pid	Pil	Pilg	Pilm	Pilb	Pils	Pilt	Pilp	Pilh	Pim	Pib	Pibs	Pis	Piss	Ping	Pij	Pich	Pik	Pit	Pip	Pih	Ha	Hag	Hakk	Hags	Han	Hanj	Hanh	Had	Hal	Halg	Halm	Halb	Hals	Halt	Halp	Halh	Ham	Hab	Habs	Has	Hass	Hang	Haj	Hach	Hak	Hat	Hap	Hah	Hae	Haeg	Haekk	Haegs	Haen	Haenj	Haenh	Haed	Hael	Haelg	Haelm	Haelb	Haels	Haelt	Haelp	Haelh	Haem	Haeb	Haebs	Haes	Haess	Haeng	Haej	Haech	Haek	Haet	Haep	Haeh	Hya	Hyag	Hyakk	Hyags	Hyan	Hyanj	Hyanh	Hyad	Hyal	Hyalg	Hyalm	Hyalb	Hyals	Hyalt	Hyalp	Hyalh	Hyam	Hyab	Hyabs	Hyas	Hyass	Hyang	Hyaj	Hyach	Hyak	Hyat	Hyap	Hyah	Hyae	Hyaeg	Hyaekk	Hyaegs	Hyaen	Hyaenj	Hyaenh	Hyaed	Hyael	Hyaelg	Hyaelm	Hyaelb	Hyaels	Hyaelt	Hyaelp	Hyaelh	Hyaem	Hyaeb	Hyaebs	Hyaes	Hyaess	Hyaeng	Hyaej	Hyaech	Hyaek	Hyaet	Hyaep	Hyaeh	Heo	Heog	Heokk	Heogs	Heon	Heonj	Heonh	Heod	Heol	Heolg	Heolm	Heolb	Heols	Heolt	Heolp	Heolh	Heom	Heob	Heobs	Heos	Heoss	Heong	Heoj	Heoch	Heok	Heot	Heop	Heoh	He	Heg	Hekk	Hegs	Hen	Henj	Henh	Hed	Hel	Helg	Helm	Helb	Hels	Helt	Help	Helh	Hem	Heb	Hebs	Hes	Hess	Heng	Hej	Hech	Hek	Het	Hep	Heh";

    case 214:
      return "Hyeo	Hyeog	Hyeokk	Hyeogs	Hyeon	Hyeonj	Hyeonh	Hyeod	Hyeol	Hyeolg	Hyeolm	Hyeolb	Hyeols	Hyeolt	Hyeolp	Hyeolh	Hyeom	Hyeob	Hyeobs	Hyeos	Hyeoss	Hyeong	Hyeoj	Hyeoch	Hyeok	Hyeot	Hyeop	Hyeoh	Hye	Hyeg	Hyekk	Hyegs	Hyen	Hyenj	Hyenh	Hyed	Hyel	Hyelg	Hyelm	Hyelb	Hyels	Hyelt	Hyelp	Hyelh	Hyem	Hyeb	Hyebs	Hyes	Hyess	Hyeng	Hyej	Hyech	Hyek	Hyet	Hyep	Hyeh	Ho	Hog	Hokk	Hogs	Hon	Honj	Honh	Hod	Hol	Holg	Holm	Holb	Hols	Holt	Holp	Holh	Hom	Hob	Hobs	Hos	Hoss	Hong	Hoj	Hoch	Hok	Hot	Hop	Hoh	Hwa	Hwag	Hwakk	Hwags	Hwan	Hwanj	Hwanh	Hwad	Hwal	Hwalg	Hwalm	Hwalb	Hwals	Hwalt	Hwalp	Hwalh	Hwam	Hwab	Hwabs	Hwas	Hwass	Hwang	Hwaj	Hwach	Hwak	Hwat	Hwap	Hwah	Hwae	Hwaeg	Hwaekk	Hwaegs	Hwaen	Hwaenj	Hwaenh	Hwaed	Hwael	Hwaelg	Hwaelm	Hwaelb	Hwaels	Hwaelt	Hwaelp	Hwaelh	Hwaem	Hwaeb	Hwaebs	Hwaes	Hwaess	Hwaeng	Hwaej	Hwaech	Hwaek	Hwaet	Hwaep	Hwaeh	Hoe	Hoeg	Hoekk	Hoegs	Hoen	Hoenj	Hoenh	Hoed	Hoel	Hoelg	Hoelm	Hoelb	Hoels	Hoelt	Hoelp	Hoelh	Hoem	Hoeb	Hoebs	Hoes	Hoess	Hoeng	Hoej	Hoech	Hoek	Hoet	Hoep	Hoeh	Hyo	Hyog	Hyokk	Hyogs	Hyon	Hyonj	Hyonh	Hyod	Hyol	Hyolg	Hyolm	Hyolb	Hyols	Hyolt	Hyolp	Hyolh	Hyom	Hyob	Hyobs	Hyos	Hyoss	Hyong	Hyoj	Hyoch	Hyok	Hyot	Hyop	Hyoh	Hu	Hug	Hukk	Hugs	Hun	Hunj	Hunh	Hud	Hul	Hulg	Hulm	Hulb	Huls	Hult	Hulp	Hulh	Hum	Hub	Hubs	Hus	Huss	Hung	Huj	Huch	Huk	Hut	Hup	Huh	Hwo	Hwog	Hwokk	Hwogs	Hwon	Hwonj	Hwonh	Hwod	Hwol	Hwolg	Hwolm	Hwolb	Hwols	Hwolt	Hwolp	Hwolh	Hwom	Hwob	Hwobs	Hwos	Hwoss	Hwong	Hwoj	Hwoch	Hwok	Hwot	Hwop	Hwoh	Hwe	Hweg	Hwekk	Hwegs";

    case 215:
      return "Hwen	Hwenj	Hwenh	Hwed	Hwel	Hwelg	Hwelm	Hwelb	Hwels	Hwelt	Hwelp	Hwelh	Hwem	Hweb	Hwebs	Hwes	Hwess	Hweng	Hwej	Hwech	Hwek	Hwet	Hwep	Hweh	Hwi	Hwig	Hwikk	Hwigs	Hwin	Hwinj	Hwinh	Hwid	Hwil	Hwilg	Hwilm	Hwilb	Hwils	Hwilt	Hwilp	Hwilh	Hwim	Hwib	Hwibs	Hwis	Hwiss	Hwing	Hwij	Hwich	Hwik	Hwit	Hwip	Hwih	Hyu	Hyug	Hyukk	Hyugs	Hyun	Hyunj	Hyunh	Hyud	Hyul	Hyulg	Hyulm	Hyulb	Hyuls	Hyult	Hyulp	Hyulh	Hyum	Hyub	Hyubs	Hyus	Hyuss	Hyung	Hyuj	Hyuch	Hyuk	Hyut	Hyup	Hyuh	Heu	Heug	Heukk	Heugs	Heun	Heunj	Heunh	Heud	Heul	Heulg	Heulm	Heulb	Heuls	Heult	Heulp	Heulh	Heum	Heub	Heubs	Heus	Heuss	Heung	Heuj	Heuch	Heuk	Heut	Heup	Heuh	Hui	Huig	Huikk	Huigs	Huin	Huinj	Huinh	Huid	Huil	Huilg	Huilm	Huilb	Huils	Huilt	Huilp	Huilh	Huim	Huib	Huibs	Huis	Huiss	Huing	Huij	Huich	Huik	Huit	Huip	Huih	Hi	Hig	Hikk	Higs	Hin	Hinj	Hinh	Hid	Hil	Hilg	Hilm	Hilb	Hils	Hilt	Hilp	Hilh	Him	Hib	Hibs	His	Hiss	Hing	Hij	Hich	Hik	Hit	Hip	Hih													oyeo	ooi	yoa	yoae	yoeo	uyeo	uii	yuae	yuo	eua	eueo	eue	euo	iyao	iyae	iyeo	iye	ioi	iyo	iyu	ii	oa	oe					nl	nch	tt	ttb	db	ds	dsg	dj	dch	dt	lkk	lgh	llk	lmh	lbd	lbp	lng	lqh	lh	mn	mnn	mm	mbs	mj	bd	blp	bm	pp	bsd	bj	bch	sm	sv	ssg	ssd	sz	sj	sch	st	sh	zb	zv	ngm	ngh	jb	jpp	jj	ps	pt";

    case 249:
      return "Gae	Gaeng	Geo	Go	Gol	Gwan	Gwi	Gau	Gyun	Geul	Geum	Na	Na	Na	Na	Na	Na	Na	Na	Na	Nag	Nag	Nag	Nag	Nag	Nag	Nag	Nan	Nan	Nan	Nan	Nan	Nan	Nam	Nam	Nam	Nam	Nab	Nab	Nab	Long	Nang	Nang	Nang	Nang	Nae	Naeng	No	No	No	No	No	No	No	Lou	No	No	No	No	Nog	Nog	Nog	Nog	Nog	Nog	Non	Nong	Nong	Nong	Nong	Noe	Noe	Noe	Noe	Nu	Nu	Nu	Nu	Nu	Nu	Nu	Nu	Neug	Neug	Neum	Neung	Neung	Neung	Neung	Neung	Du	La	Lag	Lag	Lan	Lyeong	Lo	Lyul	Li	Bae	Beon	Byeon	Bu	Bul	Bi	Sag	Sag	Sam	Saeg	Saeng	Seob	Se	Swae	Sin	Sim	Sib	Ya	Yag	Yag	Yang	Yang	Yang	Yang	Yang	Yang	Yang	Yang	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeo	Yeog	Yeog	Yeog	Yeog	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeon	Yeol	Yeol	Yeol	Yeol	Yeol	Yeol	Yeom	Yeom	Yeom	Yeom	Yeom	Yeob	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Yeong	Ye	Ye	Ye	Ye	O	Yo	Yo	Yo	Yo	Yo	Yo	Yo	Yo	Yo	Yo	Yong	Un	Won	Yu	Yu	Yu	Yu	Yu	Yu	Yu	Yu	Yu	Yu	Yug	Yug	Yug	Yun	Yun	Yun	Yun	Yul	Yul	Yul	Yul	Yung	I	I	I	I	I	I	I	I	I	I	I	I	I	I	Ig	Ig	In	In	In	In	In	In	In	Im	Im	Im	Ib	Ib	Ib	Jang	Jeog	Ji	Jib	Cha	Cheog";

    case 250:
      return "Che	Tag	Tag	Tang	Taeg	Tong	Po	Pog	Hang	Hang	Hyeon	Hwag	Kotsu	Kaku		Coc	Chou		Sei			Ki	Cho	Jik	Rei	Shin	Shou	Fuku	Sei	Sei	U		Hagi	Sen	Sho		Gap	Itsu	To				Han	Shi	Kan	Kaku	Nang	Ye	Wu	Seng	Mian	Mian	Qin	Bei	He	Tan	Qi	Ping	Mo	Ceng	Che	Hui	Kai	Zeng	Cheng	Min	Ji	Shu	Mei	Hai	Zhu	Han	Zhu	Zhao	Zuo	Bei	She	Zhi	Qi	You	Zu	Zhu	Huo	Zhen	Gu	Tu	Jie	Lian	Jin	Fan	Shu	Zhe	Chou	Cao	Cao	Zhe	He	Shi	Ye	Jin	Bin	Zeng	Chuo	Yi	Nan	Xiang	Pin	Hui	Hei	Guan			Bing	Kuang	Quan	Xing	Chong	Ji	Yong	Shao	He	Tao	Hui	Wa	Zhong	Fen	Yan	Ben	Bi	Ci	Ao	Yi	Cai	Yao	Wang	Shen	Yu	Zeng	Ao	Cheng	Dai	Yu	Sou	Bing	Ao	Qing	Lang	Wang	Zhang	Dai	Sha	Liu	Yin	Zi	Han	Jing	Zhu	Qiao	Jue	Fan	Zhu	Zhen	Ci	Hua	Guan	Wen	Yi	Sheng	Zhi	Juan	Zhe	Tian	Tiao	Jie	Lei	Tao	Lian	Ping	Zhe	Huang	Hua	Yun	Qiang	Fu	Shi	Diao	Zhu	Qing	Ye	Nuo	Yu	Jin	Bian	Zeng	Shu	Chi	Sou	Xing	Zhu	Nan	Jing	Bai	Xiang	E	Pin	Zhen	Gui				He	Xie	Jie		Qian	Beng	E	Pang";

    case 251:
      return "ff	fi	fl	ffi	ffl	st	st													mn	me	mi	vn	mkh						i		ay	'	'	d	h	kh	l	m	r	t	+	sh	s	sh	ss	a	o	'	b	g	d	h	u	zz		tt	yy	k	k	ll		mm		nn	ss		p	p		ts	kk	rr	ss	t	o	v	kh	f	'l	'	'	b	b	b	b	p	p	p	p	bh	bh	bh	bh	th	th	th	th	th	th	th	th	t	t	t	t	v	v	v	v	ph	ph	ph	ph	j	j	j	j	n	n	n	n	ch	ch	ch	ch	ch	ch	ch	ch	dh	dh	dh	dh	dh	dh	d	d	zh	zh	r	r	k	k	k	k	g	g	g	g	g	g	g	g	n	n	n	n	n	n	n	n	n	n	e	e	h	h	h	h	h	h	h	h	e	e	e'	e'	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.																		g	g	g	g	u	u	o	o	u	u	u'	v	v	o	o	u	u	e	e	e	e	y	y	i'a	i'a	i'e	i'e	i'w	i'w	i'u	i'u	i'o	i'o	i'u	i'u	i'e	i'e	i'e	i'y	i'y	i'y	i	i	i	i";

    case 252:
      return "i'j	i'h	i'm	i'y	i'y	bj	bh	bkh	bm	by	by	tj	th	tkh	tm	ty	ty	thj	thm	thy	thy	jh	jm	hj	hm	khj	khh	khm	sj	sh	skh	sm	sh	sm	dj	dh	dkh	dm	th	tm	dhm	`j	`m	ghj	ghm	fj	fh	fkh	fm	fy	fy	qh	qm	qy	qy	ka	kj	kh	kkh	kl	km	ky	ky	lj	lh	lkh	lm	ly	ly	mj	mh	mkh	mm	my	my	nj	nh	nkh	nm	ny	ny	hj	hm	hy	hy	yj	yh	ykh	ym	yy	yy	dha	ra	ya	un-	in-	a-	u-	i-	-a	i'r	i'z	i'm	i'n	i'y	i'y	br	bz	bm	bn	by	by	tr	tz	tm	tn	ty	ty	thr	thz	thm	thn	thy	thy	fy	fy	qy	qy	ka	kl	km	ky	ky	lm	ly	ly	ma	mm	nr	nz	nm	nn	ny	ny	ya	yr	yz	ym	yn	yy	yy	i'j	i'h	i'kh	i'm	i'h	bj	bh	bkh	bm	bh	tj	th	tkh	tm	th	thm	jh	jm	hj	hm	khj	khm	sj	sh	skh	sm	sh	skh	sm	dj	dh	dkh	dm	th	dhm	`j	`m	ghj	ghm	fj	fh	fkh	fm	qh	qm	kj	kh	kkh	kl	km	lj	lh	lkh	lm	lh	mj	mh	mkh	mm	nj	nh	nkh	nm	nh	hj	hm	ha	yj	yh	ykh	ym	yh	i'm	i'h	bm	bh	tm	th	thm	thh	sm	sh	shm	shh	kl	km	lm	nm	nh	ym	yh	a-	u-	i-	ty	ty	`y	`y	ghy	ghy	sy	sy	shy	shy	hy";

    case 253:
      return "hy	jy	jy	khy	khy	sy	sy	dy	dy	shj	shh	shkh	shm	shr	sr	sr	dr	ty	ty	`y	`y	ghy	ghy	sy	sy	shy	shy	hy	hy	jy	jy	khy	khy	sy	sy	dy	dy	shj	shh	shkh	shm	shr	sr	sr	dr	shj	shh	shkh	shm	sh	shh	tm	sj	sh	skh	shj	shh	shkh	tm	dhm	aan	aan	(	)																	tjm	thj	thj	thm	tkhm	tmj	tmh	tmkh	jmh	jmh	hmy	hmy	shj	sjh	sjy	smh	smh	smj	smm	smm	shh	shh	smm	shhm	shhm	shjy	shmkh	shmkh	shmm	shmm	dhy	dkhm	dkhm	tmh	tmh	tmm	tmy	`jm	`mm	`mm	`my	ghmm	ghmy	ghmy	fkhm	fkhm	qmh	qmm	lhm	lhy	lhy	ljj	ljj	lkhm	lkhm	lmh	lmh	mhj	mhm	mhy	mjh	mjm	mkhj	mkhm			mjkh	hmj	hmm	nhm	nhy	njm	njm	njy	nmy	nmy	ymm	ymm	bkhy	tjy	tjy	tkhy	tkhy	tmy	tmy	jmy	jhy	jmy	skhy	shy	shhy	dhy	ljy	lmy	yhy	yjy	ymy	mmy	qmy	nhy	qmh	lhm	`my	kmy	njh	mkhy	ljm	kmm	ljm	njh	jhy	hjy	mjy	fmy	bhy	kmm	`jm	smm	skhy	njy																																									Salla	Qala	Allah	Akbar	Muhammad	Salam	Rasul	`Alayhi	Wa-Sallam	Salla	Salla Allah `Alayhi Wa-Sallam	Jalla Jalalahu	Rial	Bismillah Ar-Rahman Ar-Rahim";

    case 254:
      return "																,	,	.	:	;	!	?	[(	)]	...																							..	-	-	_	_	(	)	{	}	[	]	[(	)]	<<	>>	<	>	[	]	[	]	'	'	[	]	-	-	-	-	_	_	_	,	,	.		;	:	?	!	-	(	)	{	}	[	]	#	&	*	+	-	<	>	=		\\	$	%	@					an	an	un	_	in		a	a	u	u	i	i	-	-	.	.	'	a	a	'	'	u'	u'	'	'	i'	i'	i'	i'	a	a	b	b	b	b	h	h	t	t	t	t	th	th	th	th	j	j	j	j	h	h	h	h	kh	kh	kh	kh	d	d	dh	dh	r	r	z	z	s	s	s	s	sh	sh	sh	sh	s	s	s	s	d	d	d	d	t	t	t	t	dh	dh	dh	dh	`	`	`	`	gh	gh	gh	gh	f	f	f	f	q	q	q	q	k	k	k	k	l	l	l	l	m	m	m	m	n	n	n	n	h	h	h	h	w	w	y	y	y	y	y	y	la	la	l'	l'	l'	l'	la	la";

    case 255:
      return "	!	\"	#	$	%	&	'	(	)	*	+	,	-	.	/	0	1	2	3	4	5	6	7	8	9	:	;	<	=	>	?	@	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	[	\\	]	^	_	`	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	{	|	}	~	(	)	.	[	]	,	-	o	a	i	u	e	o	ya	yu	yo	tsu		a	i	u	e	o	ka	ki	ku	ke	ko	sa	shi	su	se	so	ta	chi	tsu	te	to	na	ni	nu	ne	no	ha	hi	fu	he	ho	ma	mi	mu	me	mo	ya	yu	yo	ra	ri	ru	re	ro	wa	n	'	`		g	kk	gs	n	nj	nh	d	tt	l	lg	lm	lb	ls	lt	lp	lh	m	b	pp	bs	s	ss		j	jj	ch	k	t	p	h				a	ae	ya	yae	eo	e			yeo	ye	o	wa	wae	oe			yo	u	wo	we	wi	yu			eu	ui	i				c	L	!	-	|	Y	Won		|	<	^	>	v	#	*											{	|	}	?	?";

    case 256:
      return "a	e	i	o	u	da	de	di	do	du	ja	je		jo	ju	ka	ke	ki	ko	ku	ma	me	mi	mo	mu	na	ne	ni	no	nu	pa	pe	pi	po	pu	qa	qe	qi	qo		ra	re	ri	ro	ru	sa	se	si	so	su	ta	te	ti	to	tu	wa	we	wi	wo		za	ze		zo	B25	B43	B85	B71	B90	B48	B29	B62	B76	B33	B68	B66	B87	B91			B18	B19	B22	B34	B47	B49	B56	B63	B64	B79	B82	B83	B86	B89																																			B100	B102	B104	B105	B105f	B105m	B106f	B106m	B107f	B107m	B108f	B108m	B109f	B109m	B120	B121	B122	B123	B125	B127	B128	B130	B131	B132	B133	B135	B140	B141	B142	B145	B146	B150	B151	B152	B153	B154	B156	B157	B158	B159	B160	B161	B162	B163	B164	B165	B166	B167	B168	B169	B170	B171	B172	B173	B174	B176	B177	B178	B179	B180	B181	B182	B183	B184	B185	B189	B190	B191	B220	B225	B230	B231	B232	B233	B234	B236	B240	B241	B242	B243	B245	B246	B247	B248	B249	B251	B252	B253	B254	B255	B256	B257	B258	B259	B155	B200	B201	B202	B203	B204	B205	B206	B207	B208	B209	B210	B211	B212	B213	B214	B215	B216	B217	B218	B219	B221	B222	B226	B227	B228	B229	B250	B305";

    case 257:
      return ",	.	*					1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	200	300	400	500	600	700	800	900	1000	2000	3000	4000	5000	6000	7000	8000	9000	10000	20000	30000	40000	50000	60000	70000	80000	90000				*	*	#	*	*	*	*	*	*	1/4	1/2	1	5	50	500	5000	50000	5	10	50	100	500	1000	5000	5	10	50	100	500	1000	10000	50000	10	1	1	1	2	2	2	2	5	10	10	10	10	10	30	50	50	50	50	100	300	500	500	500	500	500	1000	5000	5	50	1/2	1/2	2/3	3/4	y	t	<	1	2	3	4	5	m	K	l	Go	x	a	a	Gr	t	0	1/4	y	I	No		=	-	S	S	S	))	X	V	IIS	II	|	>	*				TR.																																																01	02	03	04	05	06	07	08	09	10	11	12	13	14	15	16	17	18	19	20	21	22	23	24	25	26	27	28	29	30	31	32	33	34	35	36	37	38	39	40	41	42	43	44	45	,";

    case 258:
      return "																																																																																																																																a	e	b	B	g	d	i	w	z	th	y	k	q	l	m	n	M	N	u	p	K	r	s	t	T	A	E	h	x				a	B	d	l	y	r	L	a	q	b	m	o	d	t	sh	sh	s	?	u	N	K	n	T	p	S	i	e	Y	k	k	D	w	G	G	z	z	ng	j	?	T	y	R	B	B	B	B	L	e	y																k	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	200	300	400	500	600	700	800	900";

    case 259:
      return "a	b	c	d	e	v	z	h	th	i	k	l	m	n	sh	o	p	s	q	r	s	t	u	x	ph	kh	f	r	c	i	u	*	I	V	X	L										j	th	th	a	b	g	d	e	q	z	h	th	i	k	l	m	n	j	u	p	90	r	s	t	w	f	x	hw	o	900						a	b	g	d	e	zh	dzh	z	dz	i	k	l	m	n	o	p	r	s	t	u	ch	sh	shch	y	y	o	o	f	h	c	v	\"	'	e	ie	ju	ja	ia	A	D	Z	N	S						a	b	g	h	d	h	w	z	h	t	y	k	sh	l	m	d	n	z	s	`	p	s	q	r	t	g	t	i	u	s		|	a	i	u	ka	ku	ga	gu	xa	ca	ja	ji	ta	tu	da	di	du	tha	pa	ba	fa	na	nu	ma	mi	mu	ya	va	vi	ra	ru	la	sa	za	sha	sra	ha					AM1	AM2	AMHA	XS	DH1	DH2	BG	BU	:	1	2	10	20	100";

    case 260:
      return "E	A	A	O	O	U	I	E	A	O	U	U	I	Aw	W	Y	H	P	B	T	D	Ch	J	K	G	F	V	Th	Dh	S	Z	Sh	Zh	R	L	M	N	Ng	Oy	Yu	e	a	a	o	o	u	i	e	a	o	u	u	i	aw	w	y	h	p	b	t	d	ch	j	k	g	f	v	th	dh	s	z	sh	zh	r	l	m	n	ng	oy	yu	p	t	k	f	th	s	sh	ch	y	ng	b	d	g	v	th	z	zh	j	w	h	l	m	i	e	a	a	o	u	au	a	r	n	i	ei	ai	u	ou	u	oi	o	ar	or	er	er	ar	iar	ia	yu	'	b	t	j	x	kh	d	r	s	sh	dh	c	g	f	q	k	l	m	n	w	h	y	a	e	i	o	u	aa	ee	oo			0	1	2	3	4	5	6	7	8	9							A	Ai	Ai	E	Br	Ch	Hch	E	Ei	H	Hy	I	K	Hk	Ky	L	M	N	O	Oi	P	Hp	S	Sh	T	Ht	C	Hc	Ch	D	U	W	X	G	Z	Zh					a	ai	ai	e	br	ch	hch	e	ei	h	hy	i	k	hk	ky	l	m	n	o	oi	p	hp	s	sh	t	ht	c	hc	ch	d	u	w	x	g	z	zh";

    case 261:
      return "a	b	c	C	d	nd	dh	e	E	f	g	gj	h	i	j	k	l	ll	m	n	n	nj	o	p	q	r	rr	s	sh	t	th	u	v	x	y	z	zh	G	G	X									a	b	g	d	e	z	e	z	t	c	y	z	i	?	l	n'	x	d'	c	j	k	l'	h	x	a	c	c	c'	m	q	n	j'	s	j	o	t'	f	j	c	p	g	r	s	v	t	s	u	c'	c	w	p	k												*";

    case 262:
      return "AB1	AB2	AB3	AB4	AB5	AB6	AB7	AB8	AB9	AB10	AB11	AB13	AB16	AB17	AB20	AB21	AB21f	AB21m	AB22	AB22f	AB22m	AB23	AB23m	AB24	AB26	AB27	AB28	A28b	AB29	AB30	AB31	AB34	AB37	AB38	AB39	AB40	AB41	AB44	AB45	AB46	AB47	AB48	AB49	AB50	AB51	AB53	AB54	AB55	AB56	AB57	AB58	AB59	AB60	AB61	AB65	AB66	AB67	AB69	AB70	AB73	AB74	AB76	AB77	AB78	AB79	AB80	AB81	AB82	AB85	AB86	AB87	A100/102	AB118	AB120	A120b	AB122	AB123	AB131a	AB131b	A131c	AB164	AB171	AB180	AB188	AB191	A301	A302	A303	A304	A305	A306	A307	A308	A309a	A309b	A309c	A310	A311	A312	A313a	A313b	A313c	A314	A315	A316	A317	A318	A319	A320	A321	A322	A323	A324	A325	A326	A327	A328	A329	A330	A331	A332	A333	A334	A335	A336	A337	A338	A339	A340	A341	A342	A343	A344	A345	A346	A347	A348	A349	A350	A351	A352	A353	A354	A355	A356	A357	A358	A359	A360	A361	A362	A363	A364	A365	A366	A367	A368	A369	A370	A371	A400	A401	A402	A403	A404	A405	A406	A407	A408	A409	A410	A411	A412	A413	A414	A415	A416	A417	A418	A501	A502	A503	A504	A505	A506	A508	A509	A510	A511	A512	A513	A515	A516	A520	A521	A523	A524	A525	A526	A527	A528	A529	A530	A531	A532	A534	A535	A536	A537	A538	A539	A540	A541	A542	A545	A547	A548	A549	A550	A551	A552	A553	A554	A555	A556	A557	A559	A563	A564	A565	A566	A568	A569	A570	A571	A572	A573	A574	A575	A576	A577	A578	A579	A580	A581	A582	A583	A584	A585	A586	A587	A588	A589	A591	A592	A594";

    case 263:
      return "A595	A596	A598	A600	A601	A602	A603	A604	A606	A608	A609	A610	A611	A612	A613	A614	A615	A616	A617	A618	A619	A620	A621	A622	A623	A624	A626	A627	A628	A629	A634	A637	A638	A640	A642	A643	A644	A645	A646	A648	A649	A651	A652	A653	A654	A655	A656	A657	A658	A659	A660	A661	A662	A663	A664										A701	A702	A703	A704	A705	A706	A707	A708	A709	A709-2	A709-3	A709-4	A709-6	A710	A711	A712	A713	A714	A715	A717	A726	A732											A800	A801	A802	A803	A804	A805	A806	A807";

    case 264:
      return "a	e	i	o	u	ja			jo		ka	ke	ki	ko	ku	la	le	li	lo	lu	ma	me	mi	mo	mu	na	ne	ni	no	nu	pa	pe	pi	po	pu	ra	re	ri	ro	ru	sa	se	si	so	su	ta	te	ti	to	tu	wa	we	wi	wo		xa	xe				za			zo	'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	p	s	q	r	sh	t		+	1	2	3	10	20	100	1000	10000	'	b	g	d	h	w	z	h	t	y	k	l	m	n	n	s	`	p	s	q	r	sh	t	<	>	1	2	3	4	5	10	20	'	'	b	b	g	d	h	h	w	z	h	t	y	y	k	k	l	l	m	m	n	n	s	`	p	s	q	r	sh	sh	t									1	2	3	4	4	5	10	20	100																																																	'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	p	s	q		sh	t						1	5	10	20	100";

    case 265:
      return "'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	p	s	q	r	sh	t	1	10	20	100	2	3				 	a	b	g	d	e	v	i	y	k	l	m	n	o	r	S	t	u	f	q	s	T	A	E	L	N	c						^																																																																	a	e	i	o	y	w	b	b	p	m	n	n	ne	ne	r	r	l	x	h	s	s	se	k	q	t	t	te	te	to	d	*	+	a	e	i	o	y	w	b	p	m	n	ne	r	l	x	h	s	s	se	k	q	t	te	to	d					11	.5	RMT	IMN	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70			100	200	300	400	500	600	700	800	900	1000	2000	3000	4000	5000	6000	7000	8000	9000	10000	20000	30000	40000	50000	60000	70000	80000	90000	100000	200000	300000	400000	500000	600000	700000	800000	900000	1	2	3	4	5	6	7	8	9	10";

    case 266:
      return "a	i	u	r		e	o								m	h	k	kh	g	gh		c	ch	j		n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	z	h	k	th	t	vh			'	'							1	2	3	4	10	20	100	1000	.5								,	.	*	#	+	@	,	.	~								h	l	h	m	q	w	s	r	b	t	s	k	n	h	s	s	f	'	`	d	g	d	g	t	z	d	y	t	z	|	50	#	h	l	h	m	q	w	s	r	b	t	s	k	n	h	s	s	f	'	`	d	g	d	g	t	z	d	y	t	z	|	10	20																																	'	b	bh	g	gh	d	h	w	&	z	zh	j	jh	h	t	y	k	x	kh	l	dh	th	m	n	s	`	`	p	f	c	q	q	qh	r	sh	sh	t							1	5	10	20	100	+	#	**	*	.	:	,";

    case 267:
      return "a	a	a	a	a	a	e	e	e	e	o	o	i	i	u	u	k	x	x	xv	g	g	gh	c	j	t	th	d	dh	t	p	f	b	bh	ng	ng	ngv	n	n	n	m	m	y	y	v	r	l	s	z	sh	zh	sh	sh	h				.	:	;	.	.	*	*	'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	p	s	q	r	sh	t			1	2	3	4	10	20	100	1000	'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	p	s	sh	t						1	2	3	4	10	20	100	1000	'	b	g	d	h	w	z	h	y	k	l	m	n	s	p	s	sh	t								*	*	+	+													1	2	3	4	10	20	100";

    case 268:
      return "a	a	a	i	i	e	o	o	o	b	b	b	b	g	g	g	g	d	d	d	z	z	y	y	y	y	k	k	k	k	l	l	l	lt	m	n	n	n	nt	nt	nc	nc	ny	ny	ng	ng	ng	p	p	c	c	c	q	q	q	q	q	q	r	r	r	s	s	sh	sh	sh	sh	t	t	t	t	ot	bash																																																								A	A	B	Mb	C	Nc	Cs	D	Nd	E	E	E	F	G	Gy	H	I	I	J	K	K	Nk	L	Ly	M	N	Ny	O	O	O	O	O	P	Mp	R	R	S	Sz	T	Nt	Ty	Ch	U	U	U	U	V	Z	Zs	Tprus	S														a	a	b	mb	c	nc	cs	d	nd	e	e	e	f	g	gy	h	i	i	j	k	k	nk	l	ly	m	n	ny	o	o	o	o	o	p	mp	r	r	s	sz	t	nt	ty	ch	u	u	u	u	v	z	zs	tprus	s								1	5	10	50	100	1000";

    case 269:
      return "	b	p	t	t	j	ch	h	kh	f	d	d	r	r	z	s	sh	k	g	l	m	n	w	u	y	i	ng	ny	v	a	i	u	e	o		m													0	1	2	3	4	5	6	7	8	9";

    case 270:
      return "																																																																																																1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	200	300	400	500	600	700	800	900	1/2	1/4	1/3	2/3		a	b	p	p'	t'	s	c	ch	ch'	h'	x	d	z	r	r'	z	j	s	sh	s	d	t	z'	'	x'	f	v	v	q	k	k'	g	l	m	n	u	w	o	e	h	y	e				-			ll	e";

    case 271:
      return "'	'	b	b	g	h	h	w	z	h	y	k	l	m	n	n	n	s	`	`	p	s	s	s	r	sh	t	t	t	1	2	3	4	5	10	20	30	100	.5	`d									'	b	g	h	w	z	h	y	k	l	m	n	s	`	p	s	r	sh	t	f	l	sh												1	10	20	100	,	.	*	**	<																																																																																							'	'	b	g	d	h	w	w	z	h	y	k	l	m	n	s	`	p	r	sh	t	1	2	3	4	10	20	100																					'	b	g	d	h	w	z	h	t	y	k	l	m	n	s	`	p	s	q	r	sh	t	zy";

    case 272:
      return "m	m	h	h	h	a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	l	l	r	n	a	a	i	i	u	u	r	r	l	l	e	ai	o	au		,	.	.	:	-	+	*					1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	1000	0	1	2	3	4	5	6	7	8	9																-	m	m	h	a	a	i	i	u	u	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	r	dh	rh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	a	i	i	u	u	e	ai	o	au		'	.	#	#	,	.	,	.												#			s	t	b	c	d	g	m	n	l	n	v	p	y	r	h	k	j	n	a	e	i	u	o	e	x								0	1	2	3	4	5	6	7	8	9";

    case 273:
      return "m	m	h	a	i	u	e	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	y	r	l	w	s	h	a	i	i	u	u	e	ai	o	au	oi	o	au				0	1	2	3	4	5	6	7	8	9	*	,	.	?	lh	a	ei	v									a	i	u	e	o	k	kh	g	gh	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	r	l	v	s	h	r	'	.	*	Sri										m	m	h	a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	l	v	s	s	s	h	a	i	i	u	u	r	r	l	l	e	ai	o	au		'	h	h	Om	,	.	.	 		'			*	e	m	0	1	2	3	4	5	6	7	8	9	1	*	-	-	~	^		1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	1000";

    case 274:
      return "a	a	i	u	e	ai	o	au	k	kh	g	g	gh	n	c	ch	j	j		n	t	th	d	dh	n	t	th	d	d	dh	n	p	ph	b	b	bh	m	y	r	l	v	s	h	r	a	i	i	u	e	ai	o	au	m		'		,	.	 	,	.	.																																																																			a	i	u	e	k	kh	g		gh		c	ch	j	j		n	t	th	d	d	dh	n	t	th	d	dh	n	p	ph	b		bh	m	y	r	l	v	s	h	r	rh	.							a	a	i	i	u	u	e	ai	o	au	k	kh	g	g	gh	n	c	ch	j	j	jh	n	t	th	d	d	r	dh	n	t	th	d	dh	n	p	ph	b	b	bh	m	y	r	l	v	s	s	h	m	a	i	i	u	u	e	ai	o	au	'							0	1	2	3	4	5	6	7	8	9";

    case 275:
      return "m	m	m	h		a	a	i	i	u	u	r	l			e	ai			o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n		p	ph	b	bh	m	y	r		l	l		v	d	d	d	h		'	'	'	a	i	i	u	u	r	r			e	ai			o	au				Om							u						`	m	m	r	l	l	l			0	1	2	3	4	5	6				a	k	n	v	p";

    case 276:
      return "a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	hn	c	ch	j	jh	n	hn	t	th	d	dh	n	t	th	d	dh	n	hn	p	ph	b	bh	m	hm	y	r	hr	l	hl	v	s	s	s	h	a	i	i	u	u	r	r	l	l	e	ai	o	au		m	m	h	'	'	m	Om	*	,	.	,	-	.	0	1	2	3	4	5	6	7	8	9	.	-		^	'	m	h	h																															*	a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	a	i	i	u	u	r	r	l	l	e	e	ai	o	o	au	m	m	h		'	'	m	.	Om									0	1	2	3	4	5	6	7	8	9";

    case 277:
      return "																																																																																																																																a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	a	i	i	u	u	r	r			e	ai	o	au	m	m	h		'	*	,	.	,	,	-	-	-	#	*	*	*	*	*	*	*	*	*	*	*	*	*	*	i	i	i	u	u	u";

    case 278:
      return "a	a	i	i	u	u	r	r	l	l	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	l	a	i	i	u	u	r	r	l	l	e	ai	o	au	m	h		'	,	.	.	*												0	1	2	3	4	5	6	7	8	9							@	@	@	@	@	@	@	@	@	@	@	@	@																				a	a	i	i	u	u	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	h	r	m	h	a	i	i	u	u	e	ai	o	au		'	kh								0	1	2	3	4	5	6	7	8	9";

    case 279:
      return "k	kh	ng	n	t	t	p	ph	b	m	j	ch	th	r	l	s	ny	h		d	dh	g	g	gh	bh	jh	b			l	r	r	a	a	i	i	u	u	e	av	o	ai	m						0	1	2	3	4	5	6	7	8	9	10	20	,	.	*	!";

    case 280:
      return "a	a	i	i	u	u	e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	r	a	i	i	u	u	r	r	e	ai	o	au	m	h		'	.																																																																																																					M	A	I	U	'	Y	I	U	E	O	N	G	K	N	J	C	N	D	T	N	D	T	M	B	P	H	L	R	R	S	S	V	m	a	i	u	'	y	i	u	e	o	n	g	k	n	j	c	n	d	t	n	d	t	m	b	p	h	l	r	r	s	s	v	0	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90													Om";

    case 281:
      return "a	a	i	i	u	u	e			o			k	kh	g	gh	n	c	ch	j		n	t		d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	'	y	r	l	v	s	s	s	h	l	z	a	i	i	u	u	e		ai	o			m	m			n	y	r	r	'	.	-	*										0	1	2	3	4	5	6	7	8	9																																																																							a	a	i	i	u	u	r	r			e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	l	r	a	i	i	u	u	r	r			e	ai	o	au	m	h		'	*	~	e";

    case 282:
      return "	i	u	u	e	o	o	ai	au	i		k	kh	g	gh	ng	c	ch	j	ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	ts	tsh	dz	dzh	zh	z	'	y	r	l	v	sh	s	s	h	ks			m	m	m	m	h	r	y	r	l	v	@	#	-	,	.	:	@	#											i	u	u	e	o	o	ai	au	r	l		k	kh	g	gh	ng	c	ch	j	jh	ny	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	ts	tsh	dz	zh	z	'	y	r	l	v	sh	s	s	h	ks	h	h	r	l	sh	s	g	k	ng	d	n	b	m	r	l	sh	s	'	m	h			-	,	.	`	@	@	@	#	#																														p	k	l	m	d	z	v	ng	h	g	kh	s	b	c	t	th	n	ph	r	f	ch	a	e	i	o	u	ua	ia	p	k	t	m	n	l	w	ng	y			'			'						'					'			'";

    case 284:
      return "a	a	i	i	u	u	r	r	l		e	ai	o	au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	a	i	i	u	u	r	r	l		e	ai	o	au	m	m	h		'	,	.	 	-	^											0	1	2	3	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	*				@	,	k	kh	g	ng	c	ch	j	ny	t	th	d	n	p	ph	b	m	ts	tsh	dz	w	zh	z	'	y	r	l	sh	s	h				k	kh	g	ng	c	ch	j	ny	t	th	d	n	p	ph	b	m	ts	tsh	dz	w	zh	z		y	r	l	sh	s	h		a	i	u	e	o	m	m";

    case 285:
      return "a	a	i	i	u	u	e		ai	o		au	k	kh	g	gh	n	c	ch	j	jh	n	t	th	d	dh	n	t	th	d	dh	n	p	ph	b	bh	m	y	r	l	v	s	s	s	h	l	ks	jn	tr	a	i	i	u	u	r				e		ai	o		au	m	h	'	'			r	r									0	1	2	3	4	5	6	7	8	9							a	a	i	i	u	u		e	ai		o	au	y	v	b	bh	m	k	kh	t	th	l	g	gh	d	dh	n	c	ch	t	th	l	j	jh	d	dh	n	p	ph	h	r	s	a	i	i	u	u		e	ai		o	au	m	h		Om								0	1	2	3	4	5	6	7	8	9";

    case 286:
      return "																																																																																																																																																																																																																																k	g	ng	p	b	m	t	d	n	c	j	ny	y	r	l	w	s		-	i	u	e	o	,	.";

    case 287:
      return "																																																																																																																																																																																yh																1	2	4	5	8	10	12	15	16	20	20	32	40	48	60	64	80	160	160	240	/	N	C	A	U	M	K	P	M	K	P	P	V	P	K	V	N	P	N	U	V	#	N	S	P	A	V	M	M	V														~";

    case 292:
      return "2	3	4	5	6	7	8	9	3	4	5	6	7	8	9	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	1	2	3	4	5	2	3	3	4	5	6	7	8	9	1	2	3	3	4	5	216000	432000	1	2	3	3	4	5	3	3	4	4	4	4	6	7	7	7	8	8	9	9	9	9	2	3	4	5	6	1	2	3	4	4	5	5	2	3	1	2	1/3	2/3	5/6	1/3	2/3	1/8	1/4	1/6	1/4	1/4	1/2	1/3	2/3	40	50	4	5	6	7	8	9		|	:	\\	\\	\\";

    case 304:
      return "A1	A2	A3	A4	A5	A5a	A6	A6a	A6b	A7	A8	A9	A10	A11	mSa	A13	A14	A14a	xr	A16	Xrd	A17a	A18	A19	A20	sr	A22	A23	A24	A25	A26	A27	A28	A29	A30	A31	A32	A32a	mniw	A34	A35	A36	A37	qiz	A39	A40	A40a	A41	A42	A42a	A43	A43a	A44	A45	A45a	A46	iry	A48	A49	Sps	Spsi	A52	A53	A54	A55	A56	A57	A58	A59	A60	A61	A62	A63	A64	A65	A66	A67	A68	A69	A70	B1	B2	msi	B4	B5	B5a	B6	B7	B8	B9	C1	C2	C2a	C2b	C2c	DHwty	Xnmw	C5	inpw	stX	mnw	C9	mAat	C10a	HH	C12	C13	C14	C15	C16	C17	C18	C19	C20	C21	C22	C23	C24	tp	Hr	Sny	ir	D5	D6	D7	D8	D8a	rmi	wDAt	D11	D12	D13	D14	D15	D16	D17	D18	fnD	D20	r	D22	D23	spt	spty	D26	mnD	D27a	kA	D29	D30	D31	D31a	D32	D33	aHA	D34a	D35	a	D37	D38	D39	D40	D41	D42	D43	D44	Dsr	d	D46a	D47	D48	D48a	D49	Dba	D50a	D50b	D50c	D50d	D50e	D50f	D50g	D50h	D50i	D51	mt	D52a	D53	D54	D54a	D55	sbq	D57	b	ab	wab	sAH	D62	D63	D64	D65	D66	D67	D67a	D67b	D67c	D67d	D67e	D67f	D67g	D67h	E1	E2	E3	E4	E5	zzmt	E7	E8	E8a	E9	E9a	E10	E11	E12	E13	E14	E15	E16	E16a	zAb	E17a	E18	E19	E20	E20a	E21	mAi	rw	Aby	E25	E26	E27	E28	E28a	E29	E30	E31	E32	E33	wn	E34a	E36	E37	E38	F1	F1a";

    case 305:
      return "F2	F3	HAt	SsA	F6	F7	F8	F9	F10	F11	wsr	wp	F13a	F14	F15	db	F17	bH	F19	ns	sDm	F21a	pH	xpS	F24	wHm	Xn	F27	F28	sti	Sd	ms	F31a	X	sd	ib	nfr	zmA	F37	F37a	F38	F38a	imAx	Aw	F41	spr	F43	iwa	F45	F45a	qAb	F46a	F47	F47a	F48	F49	F50	F51	F51a	F51b	F51c	F52	F53	A	AA	G3	tyw	G5	G6	G6a	G7	G7a	G7b	G8	G9	G10	G11	G11a	G12	G13	mwt	G15	nbty	m	mm	G19	G20	G20a	nH	Db	rxyt	G24	Ax	G26	G26a	dSr	gm	bA	G30	G31	baHi	G33	G34	aq	wr	G36a	nDs	G37a	gb	zA	pA	xn	wSA	w	G43a	ww	G45	G45a	mAw	TA	G48	G49	G50	G51	G52	G53	snD	H1	wSm	pAq	nr	H5	Sw	H6a	H7	H8	aSA	Styw	mzH	sbk	sAq	I5a	km	I7	Hfn	f	I9a	D	I10a	DD	I11a	I12	I13	I14	I15	in	K2	ad	XA	bz	nSmt	K7	K8	xpr	bit	L2a	L3	L4	L5	L6	L6a	srqt	L8	iAm	M1a	M1b	Hn	xt	M3a	rnp	M5	tr	M7	SA	zSn	M10	M10a	wdn	M12	M12a	M12b	M12c	M12d	M12e	M12f	M12g	M12h	wAD	M14	M15	M15a	HA	M16a	i	Y	ii	M19	sxt	sm	M22	nn	sw	rsw	M24a	M25	Sma	M27	M28	M28a	nDm	bnr	M31	M31a	M32	M33	M33a	M33b	bdt	M35	Dr	M37	M38	M39	iz	M40a	M41	M42	M43	M44	pt	N2	N3	idt	zw	N6	N7	Hnmmt	pzD	N10	iaH	N12	N13	sbA	dwAt	tA	N17";

    case 306:
      return "iw	N18a	N18b	N19	wDb	N21	N22	N23	spAt	xAst	N25a	Dw	Axt	xa	q	iAt	N31	N32	N33	N33a	N34	N34a	n	mw	N36	S	N37a	N38	N39	Sm	id	N42	NL1	NL2	NL3	NL4	NL5	NL5a	NL6	NL7	NL8	NL9	NL10	NL11	NL12	NL13	NL14	NL15	NL16	NL17	NL17a	NL18	NL19	NL20	NU1	NU2	NU3	NU4	NU5	NU6	NU7	NU8	NU9	NU10	NU10a	NU11	NU11a	NU12	NU13	NU14	NU15	NU16	NU17	NU18	NU18a	NU19	NU20	NU21	NU22	NU22a	pr	O1a	O2	O3	h	O5	O5a	Hwt	O6a	O6b	O6c	O6d	O6e	O6f	O7	O8	O9	O10	O10a	O10b	O10c	aH	O12	O13	O14	wsxt	O16	O17	kAr	O19	O19a	O20	O20a	O21	zH	O23	O24	O24a	txn	O25a	O26	O27	iwn	aA	O29a	zxnt	O30a	O31	O32	O33	O33a	z	zb	inb	O36a	O36b	O36c	O36d	O37	qnbt	O39	O40	O41	Szp	O43	O44	ipt	O46	nxn	O48	niwt	zp	O50a	O50b	Snwt	P1	P1a	P2	P3	P3a	wHa	nfw	aHa	P7	xrw	P9	P10	P11	st	wz	p	Q4	Q5	qrsw	Q7	xAwt	R2	R2a	R3	R3a	R3b	Htp	kp	R6	snTr	nTr	bd	R10	R10a	dd	R12	R13	imnt	iAb	wx	R16a	R17	R18	R19	R20	R21	xm	R23	R24	R25	R26	R27	R28	R29	HDt	S2	S2a	dSrt	S4	S5	sxmty	S6a	xprS	Atf	Swty	mDH	wsx	nbw	S13	S14	S14a	S14b	tHn	S16	S17	S17a	mnit	sDAw	xtm	S21	sT	dmD	Tz	S25	Sndyt	S26a	S26b	mnxt	S28	s	sf	S31	siA	Tb	anx	Swt	S35a	S36	xw	HqA	awt";

    case 307:
      return "wAs	Dam	xrp	md	Ams	nxxw	S46	T1	T2	HD	T3a	T4	T5	HDD	T7	T7a	T8	T8a	pd	T9a	pD	zwn	T11a	rwd	rs	qmA	T15	T16	T16a	wrrt	Sms	qs	T20	wa	sn	T23	iH	DbA	T26	T27	Xr	nmt	T30	sSm	T32	T32a	T33	T33a	nm	T35	T36	mA	U2	U3	U4	U5	mr	U6a	U6b	U7	U8	U9	it	HqAt	U12	hb	U14	tm	biA	grg	U18	U19	U20	stp	mnx	Ab	U23a	Hmt	U25	wbA	U27	DA	U29	U29a	U30	rtH	zmn	U32a	ti	xsf	U35	Hm	U37	mxAt	U39	U40	U41	U42	V1	V1a	V1b	V1c	V1d	V1e	V1f	V1g	V1h	V1i	sTA	V2a	sTAw	wA	snT	Ss	Sn	V7a	V7b	V8	V9	V10	V11	V11a	V11b	V11c	arq	V12a	V12b	T	V14	iTi	V16	V17	V18	mDt	mD	V20a	V20b	V20c	V20d	V20e	V20f	V20g	V20h	V20i	V20j	V20k	V20l	V21	mH	V23	V23a	wD	V25	aD	V27	H	V28a	wAH	V29a	nb	V30a	k	V31a	msn	sSr	V33a	V34	V35	V36	idr	V37a	V38	V39	V40	V40a	W1	bAs	Hb	W3a	W4	W5	W6	W7	W8	Xnm	W9a	iab	W10a	g	W12	W13	Hz	W14a	W15	W16	xnt	W17a	W18	W18a	mi	W20	W21	Hnqt	W23	nw	W24a	ini	t	X2	X3	X4	X4a	X4b	X5	X6	X6a	X7	rdi	X8a	mDAt	Y1a	Y2	zS	Y4	mn	ibA	Y7	zSSt	Z1	Z2	Z2a	Z2b	Z2c	Z2d	Z3	Z3a	Z3b	y	Z4a	Z5	Z5a	Z6	W	Z8	Z9	Z10	imi	Z12	Z13	Z14	Z15	Z15a	Z15b	Z15c	Z15d	Z15e";

    case 308:
      return "Z15f	Z15g	Z15h	Z15i	Z16	Z16a	Z16b	Z16c	Z16d	Z16e	Z16f	Z16g	Z16h	x	AA2	AA3	AA4	Hp	AA6	AA7	AA7a	AA7b	qn	AA9	AA10	mAa	AA12	im	AA14	M	AA16	sA	AA18	AA19	apr	wDa	AA22	AA23	AA24	AA25	AA26	nD	qd	AA29	Xkr	AA31	AA32		:	*					+	(	)";

    case 324:
      return "1	2	3	4	5	6	7	8	9	10	10a	11	12	13	14	15	16	17	18	19	20	21	22	23	24	25	26	26a	27	28	29	30	31	32	33	34	35	36	37	38	39	39a	40	41	41a	42	43	44	45	45a	46	46a	46b	47	48	49	50	51	52	53	54	55	56	57	58	59	60	61	62	63	64	65	66	66a	66b	66c	67	68	69	70	71	72	73	74	75	76	77	78	79	80	81	82	83	84	85	86	87	88	89	90	91	92	93	94	95	96	97	97a	98	98a	99	100	100a	101	101a	102	102a	103	104	104a	104b	104c	105	105a	105b	106	107	107a	107b	107c	108	109	110	110a	110b	111	112	113	114	115	115a	116	117	118	119	120	121	122	123	124	125	125a	126	127	128	129	130	131	132	133	134	135	135a	136	137	138	139	140	141	142	143	144	145	146	147	148	149	150	151	152	153	154	155	156	157	158	159	160	161	162	163	164	165	166	167	168	169	170	171	172	173	174	175	176	177	178	179	180	181	182	183	184	185	186	187	188	189	190	191	192	193	194	195	196	197	198	199	200	201	202	202a	202b	203	204	205	206	207	207a	208	209	209a	210	211	212	213	214	215	215a	216	216a	217	218	219	220	221	222";

    case 325:
      return "223	224	225	226	227	227a	228	229	230	231	232	233	234	235	236	237	238	239	240	241	242	243	244	245	246	247	248	249	250	251	252	253	254	255	256	257	258	259	260	261	262	263	264	265	266	267	267a	268	269	270	271	272	273	274	275	276	277	278	279	280	281	282	283	284	285	286	287	288	289	289a	290	291	292	293	294	294a	295	296	297	298	299	299a	300	301	302	303	304	305	306	307	308	309	309a	310	311	312	313	314	315	316	317	318	319	320	321	322	323	324	325	326	327	328	329	329a	330	331	332a	332b	332c	333	334	335	336	336a	336b	336c	337	338	339	340	341	342	343	344	345	346	347	348	349	350	351	352	353	354	355	356	357	358	359	359a	360	361	362	363	364	364a	365	366	367	368	368a	369	370	371	371a	372	373	374	375	376	377	378	379	380	381	381a	382	383	383a	384	385	386	386a	387	388	389	390	391	392	393	394	395	396	397	398	399	400	401	402	403	404	405	406	407	408	409	410	410a	411	412	413	414	415	416	417	418	419	420	421	422	423	424	425	426	427	428	429	430	431	432	433	434	435	436	437	438	439	440	441	442	443	444	445	446	447	448	449	450	450a	451	452	453	454	455	456	457";

    case 326:
      return "457a	458	459	460	461	462	463	464	465	466	467	468	469	470	471	472	473	474	475	476	477	478	479	480	481	482	483	484	485	486	487	488	489	490	491	492	493	494	495	496	497	501	502	503	504	505	506	507	508	509	510	511	512	513	514	515	516	517	518	519	520	521	522	523	524	525	526	527	528	529	530";

    case 362:
      return "																																																																t	ng	y	m	b	d	a	ph	kh	h	i	c	k	l	m	n	p	o	o	r	sh	th	e	w	e	k	l	l	hai	o	tek		0	1	2	3	4	5	6	7	8	9					,	.																																																																																																	n	k	s	f	mb	ny	g	d	kp	j	xw	w	z	gb	nd	c	hw	t	b	v	h	p	l	a	o	o	u	e	e	i								.";

    case 363:
      return "eeb	eev	ib	iv	aub	auv	ub	uv	eb	ev	aib	aiv	oob	oov	awb	awv	uab	uav	ob	ov	iab	iav	ab	av	wb	wv	aab	aav	v	nts	l	h	nl	r	nk	qh	y	hl	m	ch	nch	hn	plh	nth	n	'	x	c	m	d	j	v		s	g	?	!	,	&	%	+	-	*	/	~	`	-	-	^	@											0	1	2	3	4	5	6	7	8	9		Caum	Pua	Vam	Roob	Neev	Ruav	Tas		'	Xyoo	Hli	Hli	ZT	Hnub	Nqig	Xiab	Ntuj	Av	TC	MT	Tau	Los	Mus	CHLNN	CCT	CT	CTC	CPD	CNT						Cheng	Yeng	Lee	Lor	Xiong	Kong	Her	Moua	Thao	Chang	Pha	Khang	Hang	Vang	Fang	Yang	Chue	Kw	Vue";

    case 366:
      return "																																																																M	S	V	W	Atiu	Z	Kp	P	T	G	F	I	K	A	J	E	B	C	U	Yu	L	Q	H	Ng	X	D	O	N	R	O	Ai	Y	m	s	v	w	atiu	z	kp	p	t	g	f	i	k	a	j	e	b	c	u	yu	l	q	h	ng	x	d	o	n	r	o	ai	y	0	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	1	2	3	,	.	Aiva	!";

    case 367:
      return "b	b	b	bl	m	m	m	f	v	v	d	d	dr	d	dr	dr	n	n	nr	n	nr	nr	l	l	hl	hl	dl	dl	dl	dl	g	g	g	gh	gh	ngg	ngg	ngg	h	hx	hx	hx	j	j	n	n	zh	zh	zh	zh	zh	sh	x	r	r	z	z	z	s	r	r	y	y	y	y	y	w	'	hh	bl	sh	zh	d	z	dr					`	n	h	`	h	a	aa	ahh	an	ang	o	oo	wo	w	e	en	en	eu	i	ia	ian	iang	io	ie	ii	iu	ing	u	ua	uan	uang	uu	uei	ung	yu	yi	e	aee	yu	err	i	er	ai	ai	au	ou	n	ng	uog	yui	og	oer	vw	ig	ea	iong	ui								x	t	d	f	x	b	l	t	s	k	f																																																																							-	-	,	-";

    case 368:
      return "do	sa	chha	sho	ngwu	zar	gwyr	gon	tson	ke	chha	pho	chha	khi	rer	par	je	le	shon	she	chha	zar	lo	tsew	thwy	phy	sho	khi	ngwu	vor	to	ni	phy	chha	sho	har	ngwu	tew		de	thwu	de	li	pho	thew	thwu	thew	thwy	lhy	pho	chhew	chyr	?	me	thon	khu	te	zi	nyr	tshwin	ka	tew	tsewr	li	ko	ve	dzew	ku	mo	la	be	ly	twa	phe	ba	ta	dir	bu	ji	ko	mo	ly	ly	ty	ta	ta	do	me	rer	kyr		la	vor	gew	chha	ku	von	phi	lha	dzy	dzy	cho	be	tew	bi	tin	thew	sy	thon	jwo	chhi	khy		e	me	a	ly	e	phe	kha	si	tha	kir	lhe	be	tshe	ta	ta	ko	khy	shu	chhwa	ghwa	mer	ze	kwe	zhy	vi	jwa	nar	or	lhi	tshen	u	tshwa	kwar	kwar	tew	sa	me	born	khy	kir	pha	e	by	tshi	ji	me	var	hon	pyr	di	vi	ba	ne	ir	lhe	cho	rur	ngyr	gu	ar	pha	kyr	gar	li	ly	dzen	chyr	chyr	pha	ryr	twi	bi	lhy	lhy	dwe	e	e	mo	tu	twan	pha	khy	lir	lwy	vir	ar	la	swy	ge	pho	ver	ver	nga	er	ko	?	tew	ly	tew	tsewr	zhi	mu	bu	o	jen	ne	lon	li	bu	ky	ky	ne	pu	shi	rir	mi	ky	dy	le	o	ge	rir	pew	li	u	jon	dy	he	bu	jen	myr	khu	pu	mi	khy	hy	sa	ly	ny	ky	var	ny	zhi";

    case 369:
      return "?	thwo	chwe	chwon	di	chwo	char		shwo	zi	zi	zhi	chwy	chwo	li	chwen	chi	ngorn	shwo	gy	shwon	she	ji	che	chwen	chwa	chwy	bir	ve	kin	vy	ngwu	ngwu	ky	ly	ko	ror	lhe	je	ly	lu	bi	nu	lew	dzen	dzy	ga	me	phy	pe		ma	twi	ghwen	chhew	my	chha	pe	bu	nwy	la	shan	se	lu	rur	u	rar	lwu	la	ew	den	ten	ten	non	lhi	mi	ghor	lwen	khwy	la	la	me	dzwa	ne	na	li	zi	me	ji	me	be	len	khew	be	lhy	rewr	gur	khwy	sew	rur	mar	tu	u	gu	me	lwon	kwe	kewr	dzew	ngewr	du	ky	lwen	ten	ten	ge	le	me	twy	j?	kwy	a	tshy	tshy	to	tew	no	dze	u	san	phe	pu	pu	?	kwen	ngwyr	gi	ko	ka	shwy	bu	lew	tshe	chu	le	ga	lon	me	ka	di	rar	ke	khy	lhi	dzu	sa	tsar	ryr	me	mi	bu	u	khwy	e	khan	khwa	di	siw	me	phy	e	lyr	vir	jew	lhwo	tshy	la	tha	dzi	e	la	la	rar	la	bu	e	lwon	a	ew	chhy	ge	phar	phy	shan	sar	hwa	mi	chhy	shar	hwa	khwa	khwa	the	mer	lu	lhew	ve	le	di	ha	sha	sha	ly	la	chyr	zir	lhew	lwyr	shy	te	wya	wya	khon	khy	bi	ren	ka	ko	tswa	?	la	khy	ma	lon	di	di	lwan	ka	ryr	da	ma	nga	lu	kho	dzon	lhwi	che	ka	zy	khan	lu	nen	gwan	dzu	don	de";

    case 370:
      return "ly	vu	ka	su	ny	le	tshe	la	jan	ni		tsur	de	tsa	?	de	my	dzi	kewr	le	ka	zhi	?	di	hwin	chu	gu	gu	ka	tsin	dzar	te	dzi	zorn	tshu	kewr	shu	je	lha	she	lo	o	a	lwe	a	khwa	ghir	ghir	nar	rar	khwa	o	ror	jy	sy	ngewr	chhon	si	na	chew	pu	pi	lhwa	tsha	tshwa	i	ghi	te	ja	tsa	pi	tsa	tsa	je	jwe	chon	pu	shwa	be	kwon	chon	dzwy		phi	chew	chyr	tshen	mi	chhy	di	thu	zhi	dze	shi	ghu	a	chu	kew	shwa	phi	chhy	gwe		tshen	chyr	go	chhen	khe	gwe	chen	chhy	ka	chhy	shwu	chhew	kwa	chhy	vi	my	chhu	hon	bu	sha	tshe	gha	sy	shar	ror	ghu	na	dzwy	mur	ten	di	no	sa	hwi	no	lo	tsi	nu	kwi	don	ni	zyr	dzwan	pa	my	ba	shy	o	lhe	ghe	hwin	ni	tshew	zhu	ja	gi	so	ge	ha	ly	ku	cha	my	dy	chhwan	ty	hon	lon	na	ku	se	la	kha	lu	dzo		chwen	se	chhu	lhu	ren	no	lwo	ha	sho	da	by	kyr	shin	chy	de	shwo	si	su	lwu	khwar	ghu	ngwu	ja	rer	chor	ne	tswu	chhyr	thwu	chhu	den	ke	zyr	thwi	tha	ka	swi	khwar	vy	vy	nwy	tsa	lwu	ner	ker	ja	na	kwy	khar	zyr	vir	lhu		lir	vir	wo	tew	pho	di	shwi	ngwyr	ge	di	li	kwan	?	su	tswen	tsi	ma	no	kwi	dzon	chhy	zyr	zhu	ur";

    case 371:
      return "ha	di	chwi	tun	lon	san	shwe	ky	mur	ner	nwy	ha	na	hwar	di	ur	tswa	chwan	chor	?	thwan	?ar		gu	nwy	lhu	nen	hwar	nor	se	na	chiw	na	than	gu	gu	?	pa	pho	ur	jwon	pen	lwy	chwu	dar	ku	mor	vi	pu	ben	va	va	vi	kon	ner	po	ne	ner	vi	ar	ly	dy	thwy	pen	ghu	vi	nwe	ew	ne	kyr	kyr	shon	kon	hy	su	khy	jwe	tsir	pa	su	khin	khy	va	rewr	kir	kyr	kyr	vi	pa	vwi	zar	ky	pa	on	ngwy	dy	khin	su	po	ba	da	ghy	lhu	li	zur	hy	tshen	ny	lu	lon	dewr	?	po	zy	la	ni	dir	chwa	dzen	dzen	par	tsewr	cha	ja	ve	tshwu	ve	lew	cha	rir	cha	ki	vyr	ghor	vi	vyr	wo	ky	rer	vyr	jon	khi	kwi	me	ky	mur	da	kewr	je	ku	khi	ku	bu	pha	mir	ku	ku	pha	my	thar	ir	ku	then	pon	me	mi	kha	kha	vu	ka		tsir	jyr	mi	vu	vu	chy	tsir	jwe	kha	ti	vu	kon	cha	cha	bu	va	kon	swew	mi	mi	po	mi	ngwy	mi	e	ngwy	wy	hwan	di	ngwu	ghur	ghar	si			ba	shy	tshe	no	du	li	cho	rir	rer	j?	ghar	dzwyr	be	win	pe	zo	u	lo	ghar	ku	ghur	ler	tha	lu	ba		ghur	by	vi	lu	kor	ma	tshe	pen	te	li	phe	kar	ju	ma	pho	gy	ma	u	ko	jyr	nwy	rer	la	la";

    case 372:
      return "rer	ti	ti	sha	pen	be	cho	lho	be	mar	pen	gha	va	ke	py	lhu	hon	shi	gha	swy	ghar	pe	chi	lhu	kho	du	ror	var	gha	ghew	chy	chi	chy	chy	chy	lu	ve	kwy	lu	ne	shi	shi	khon	ve	ky	shwa	len	ke	phy	ni	by	che	nu	li	la	sy	se	an	min	y	jwa	tshon	swin	ngwi	ji	on	vyr	chin	chu	gy	ty	ma	dzy	me	nga	khon	ke	la	sy	tha	lew	mor	shwa	di	my	ji	ngwir	se	swe	ghan	gar	zyr	gu	tsewr	khew	vi	rir	rir		ghwa	ghwa	che	shwyr	to	ngon	gi	kwin	by	dzu	nwy	dy	gur	tshe	ka	chhew	na	lwan	tsy	zew	to	ghwe	an	nu	gha	ne	kha	ngwu	la	tshwew	dzu	na	la	la	shyr	hwa	nwew	jen	la	?	shon	ly	dzwy	on	go	ghwe	y	mi	chha	ngon	lwe	jy	khe	ghe	ghe	by	u	jwa	min	na	nwo	ke	dzwy	she	bi	gur	on	na	gha	ba	nu	va	gew	ly	khy	kha	khi	rir	shwi	chi	khu	chhwy	kwa	jwa	rar	ly	sha	tshew	kur	khwe	thu	mi	lu	lu	mi	sy	gu	ngwe	ka	le	ky	lhwu	ky	khon	ghe	?	sha	lwu	ji	ghy	wer	dzu	chhe	tshe	von	ga	ju	hen	py	ma	nwy	khor	ve	chu	ngwyr	de	rir	vy	je	je	shon	dwu	gha	mi	ben	swin	phu	ver	lwe	ma	?	na	te	bo	na	phy	er	lo	khwan	na	lwe	vy	khar	ngwi	lo	tshew	rir";

    case 373:
      return "va	si	tsi	chi	ba	kew	so	u	chan	chhon	kwon	bon	zi	ngon	ghe	lwu	nu	ka	vy	?	lhu	nir	tsewr	sha	mo	chhi	phy	gwi	lwen	kew	myr	n?	su	ly	ti	ren	kwi	dzi	mer	su	chy	ghe	kwe	du	vi	ngewr	ngon	dzi	nu	ly	tshew	zar	ur	ku	korn	chon	ba	er	li	ar	ghwe	khwy	khy	lwyr	o	chi	gu	tson	rir	me	lu	lu	nu	shon		lir	zhin	lir	new	chyr	ky	khy	ni	di	the	phy	ko	rer	ngy	phy	ma	te	va	phy	dzo	ty	kho	zor	khy	tsha	shwa	bi	thy	dwu	lo	lwu	me	rur	shy	chhwyr	chhi	lo	lhi	ghi	chhwyr	shy	tsen	jwa	gha	ngwe	chhon	ta	ngwu	kho	lu	da	ku	ne	dzen	dzu	chhwo	?	nwi	swi	ge	kha	pha	tho	shy	swy	gy	la	ke	nwo	bu	lu	da	lho	ha	na	ny	sin	nwo	sa	sa	ghi	ta	ne	che	ka	ngwe	ta	ne	zhir	tu	chhwi	shwon	i	rir	li	lhorn	na	kewr	nu	chhon	a	lwyr	wu	lhu	la	kewr	bu	swy	du	ngwu	ka	ku	pu	le	e	thy	thy	shy	shy	mo	wu	lu	shwe	sin	gu	do	ngwe	ku	te	go	le	pwyr	pwyr	ew	ku	ku	ngon	e	len	len	e	len	e	ngon	lha	thorn	e	le	e	lha	len	the	lwy	lwy	zhi	phy	ka	zhi	pha	ki	tsir	lwu	chon	lwu	che	khwy	jy	khi	khwy	tshwy	khi	ny	ni	va	shwa	ly	na	na	jy	va	ta";

    case 374:
      return "kew	rir	khwy	na	ta	gu	kew	chu	ngwir	ngon	tshwu	ka	shwon	ngwyr	ngwyr	shwen	kwe	by	kwe	hu	tshwu	ngwyr	hu	tshwu	ngwyr	ngon	tshwu	tshwu	ga	lu	lha	lu	rer	chhen	chhen	wyr	lhew	lhew	je	jir	je	nyr	lhew	lu	swa	tha	nyr	ve	ba	ngwu	ren	du	mu	khi	gy	horn	khan	khan	me	do	gu	thwy	kwy	po	bu	my	dewr	lin	shyr	hyr	ha	zew	va	ghar	jan	dzon	ky	khwy	sew	ghi	si	ghi	la	lwin	hwan	ha	phan	da	ghi	kin	phin	ly	shwe	kha	khwy	ge	ja	kwar	van	ha	pin	de	jin	mer	er	hew	kan	a	shon	rar	chhwy	zir	ky	ky	rir	ky	rar	cha	tsen	rir	rir	lhon	u	cho	u	ny	kwen	u	cho	du	so	ky	do	lu	lu	le	gha	u	ngur	chi	si	dzwan	hon	sha	le	do	khu	tu	dzwy	li	lhor	da	tsir	thwo	zew	mu	pu	dzi	my	kwan	khu	ny	pha	pha	tshe	zyr	tu	my	dzew	rer	bi	ven	ghor	jar	tshon	le	le	lha	tsyr	ku	jy	by	zhu	chhy	chhwi	shwan	tsi	shy	tshan	du	khi	lew	kwo	bi	shwu	ly	lwu	du	var	tshwa	shwi	khe	sha	ka	ngwi	da	dzo	rar	she	lhorn	zon	lon	zhu	bu	ky	ba	khu	ren	dze	ku	ren	rer	dy	vi	ghu	ky	lu	lon	par	dza	khi	lu	nar	vor	gew	ghor	du	tu	vy	vu	rer	shin	lon		ne	la	dzi	pha	vu	tshon	o	da	twyr		khe	ko";

    case 375:
      return "tsew	jo	o	to	o	vu	lhe	gu	zon	y	cha	ngon	?	sa	ror	my	my	pa	kha	sha	ja	ke	cho	lon	be	che	jo	?	o	ge	chho	gew	khwi	tshon	twi	lu	kew	ke	lwi	me	my	la	lew	si	lo	da	lu	ly	tsun	sho	dzi	jan	khu	le	vi	bo	gu	lhi	?	dwu	len	ryr	i	tshe	tshe	lo	ryr	pen	swan		tho	zon	zew	va	swi	ga	sha	da	khu	du	gha	ja	ghy	ky	rur	lu	khe	no	nwy	tsorn	sy	nir	dyr	ngwyr	de	gu	si	la	lan	da	rir	mur	si	tsha	to	dzon	kan	khew	rir	ve	se	pa	mar	ver	my	na	tur	ghe	cha	kew	ge	vu	na	kwy	di	pho	ten	chhe	rer	dzi	lu	dy	rur	chwan	gu	chho	bi	si	pu	lhor	zhiw	ka	vi	nwu	tsi	lwe	zhwy	nwy	sha	phe	hwin	shew	ryr	twe	ge	jy	ur	ge	da	ko	hen	po	ban	ghy	ngwir	le	kur	da	ky	ni	er	chi	ren	vi	di	hu	ne	li	do	shwu	mer	rur	ne	kwan	tsy		lhon	ky	nu	ba	kwon	tshwe	rar	thwo	ge	ghew	ly	khy	lhon	tsy	my	zhwy	ren	vi	thwo	ur	dzwy	len	ku	i	pi	tan	ko	cha	kon	phi	po	thwyr	lor	ba	dzyr	ghe	li	po	ju	lwu	gi	ly	chew	te	man	rir	lhwi	ra	gi	nir	lwe	vo	kir	chho	lhwi	py	ngwu	ngwu	khy	a	ir	py	ka	ne	py	phi	di	mor	ka	phi";

    case 376:
      return "dzwy	bu	rir	tu	ka	gy	po	ti	dzo	myr	jan	chha	va	tu	khy	ko	du	kar	by	ba	pho	tha	ghar	pi	ky	byr	the	lhu	bi	a	nwi	sho	do	by	phy	bo	dzi	do	ti	ky	jwu	mi	bi	jwew	ror	ki	a	tshar	thi	the	do	shi	a	pa	zhy	pho	dy	dzi	li	thar	le	ka	tsu	mo	lo	nga	thwo	tshe	dzi	dzi	phyr	?	ar	bi	?	dzi		pi	li	mi	ka	mi	phy	tha	ngwu	nu	?	ar	dy	on	tsew	li	ke	ka	tu	bi	bi	vy	to	dzi	ma	yr	yr	dzi	jo	hwi	tsew	sho	len	khy	lu	ji	la	se		le	shwa	de	she	non	si	korn	be	ly	be	chwen	no	swa	swa	hy	hy	gwyr	shwan	ni	shwy	kew	tsa	tsa	vu	je	pin	ni	ghar	si	u	rir	dzu	nga	rir	lhyr	tshwen	chhwew	swu	nar	zo	u	?	u	le	chwi	my	vi	dzi	lhi	la	da	gi	mir	dzwo	tsa	pi	lhy	dzew	gy	gwi	lhwa	na	tshon	ga	tha	rer	vor	jon	khy	la	y	rir	mi	ze	de	kwen	tshwin	rer	lhy	lhy	gwi	thwo	ngwu	tsha	ngon	lho	la	mi	khan	mi	my	rar	lu	ty	du	lon	gi	tu	vi	shon	ze	chon	thew	no	kew	thu	me	tswyr	ver	de	thy	dzew	tshi	py	ngon	shwew	pho	the	tha	bi	tsen	vo	tshin	e	de	kwi	dzi	bo	se	vin	be	gy	lhy	ne	tsi	rar	lhy	chha	li	gy	lhwe";

    case 377:
      return "she	chhiw	di	na	yr	me	ly	dew	gi	nga	su	me	tu	be	sar	kyr	ka	phe	kew	tho	mu	tsan	te		den	da	mi	chon	lon	chi	pen	tsir	var	gi	bi	ma	thu	nga	shy	chu	ju	ghwan	ngewr	kyr	ni	win	nwy	dzi	chhwyr	ren	tshon	my	be	chyr	ne	ka	chi	ghu	lhwy	va	na	sin	lo	lhy	li	shon	khe	lyr	ty	ty	mer	ty	thy	de	ge	my	ne	gu	gu	o	nor	hu	ngo	ngo	lhew	zu	twy	phy	li	tshan	zi	ryr	kwy	du	gu	la	me	lu	ji	tsu	tse	rir	ghu	khar	jwo	lwu	ren	e	e	le	kur	gwi	la	dze	pin	li	khon	khy	lu	la	ngwu	lo	ngwy	phi	a	chyr	gy	pa	ho	ghi	dzi	hwe	dir	khe	tsin	lew	thew	be	lhwe	ne	swan	?	rar	ghyr	lhy	hu	ngwyr	dy	so	chhan	mer	so	khy	si	tshon	dzyr	so	je	kwy	my	vy	on	dza	nwi	le	dzen	na	mer	?	to	thy	ew	gu	zu	phe	ghu	shar	hwa	rir	dzu	mi	py	zhiw	li	ni	vi	phan	me	zhiw	na	u	pen	lew	rer		gi		ghyr	ta	lwyr	swy	vi	to	rer	no	kon	ke	chho	bi	pha	lhy	nga	lu	lu	chon	chhwen	vo	ly	den	ge	lhu	mo	tsi	zhy	ke	tse	dy	na	pha	zir	gy	li	rer	bo	pe	pho	tho	ghyr	di	e	khe	swy	lew	kha	thu	sar	ni	lwu	ze	ngir	thon	jy	dzu	tsorn	thy	mi";

    case 378:
      return "j?	phu	en	la	ew	lhy	shen	chon	bir	ni	kyr	ghwy	nwy	hwa	ngewr	jon	pe	cha	rir	sa	new	bo	pa	dzu	ba	lhe	kar	ryr	dzi	shin	lhe	j?	lhy	de		gu	dzo	twan	by	kwy	ror	pa	ky	ghu	rur	zhe	ka	chyr	la	nu	ti	ti	lon	kwy	to	lhy	ghy	ghy	le	vi	jwe	par	he	twar	kwyr	bi	mer	?	do	lhor	gwi	vin	bu	si	tsor	my	lhu	vy	tew	tshi	gu	ku	kwar	ew	mi	dza	dzu	dzen	no	phu	du	no	tsir	pen	bi	che	ba	ve	shwa	shu	bi	bo	ko	mi	tsy	van	lho	my	shi	chon	ke	swe	kwa	nwi	vi	jwi	new	by	chhwen	i	khar	i		chwo	la	chor	zi	si	khu	gi	ko	thu	thu	cho	van	bu	my	zwi	bi	khy	kwyr	my	ni	si	ke	khwar	ku	tsha	lon	bi	lon	dzwyr	shi	mur	du	jwon	nor	ghwe	u	ghu	ghu	gwo	dza	phon	chi	chi	pa	shu	me	pen	shwu	li	kon	dy	mi	gi	gi	by	ghiw	vi	dew	che	pir	dy	rar	dzo	ghi	mar	ten	bur	ku	la	nor	wi	ta	phon	dzwy	new		shu	se	be	by	chhon	ni	shi	my	thwi	su	nu	ba	shor	i	tho	win	gwyr		ly	khwi	li	ew		dzi	phon	gwyr	ny	by	pa	nu	jy	ghew	nwy	dwewr	jyr		hon	cha	lhu	dan	lhi	par	khan	khe	kir	ma	kir	de	de	i	ghwy	tshwin	je	ly	khe	ly	kwi";

    case 379:
      return "lwu	den	var	si	tswa	ma	phi	la	vi	si	ghwy	ghwe	zin	gu	shon	ren	sy	chy	da	tshwu	lha	mer	vi	vi	lo	chhu	ny	rir	ko	rir	be	zir	ba	bin	gwy	py	shu	de	hew	vy	py	ki	lho	dyr	de	ja	dyr	kwy	ji	zhu	da	pe	len	jwon	kwa	norn	na	ren	rar	kor	yr		lu	nir	ren	bur	so	hon	ten	jy	ta	ge	bi	chy	e	chy	don	je	shi	ge	lu	shu	khy	ghe	le	le	khy	py	tsa	?	sy	swen	ja	thwo	bi	le	khan	tswyr	chhwew	thwo	pu	par	chhwew	dy	swi	vi	si	pi	pi	dy	zhon	on		ga	thu	thu	on	rer	go	nir	pe	bar	pyr	le	swew	di	bu	zwe	bu	zwe	pho	tswi	phon	rer	li	dir	na	li	pho	kew	i	dzi	jyr	ge	thu		my	ly	swew	my	shwi	by	shwi	shwi	bi	chon	?	lhon	shwya	tshwi	li	by	lhon	bu	thu	my	chi	lhi	khi	li	su	chhy	ly	li	ni	shwa	si	sa	ge	gur	ma	ghu	pwyr	zwy	py	so	tsy	bu	pe	rer	nir	kwy	shew	shew	ven	rur	ka	swu	my	le	vi	ly	khan	be	tshi	khan	twy	by	ghor	tsho	tsha	dzo	le	le	khwu	le	lo	gwy	gu	kwy	lhe	lhe	be	ngwu	khwu	le	gwy	gu	ky	lhe	len	khy	rur	twu	tu	lo	ver	ve	thwu	te	thi	ghwy	lu	nwy	khu	chy	ma	kwen	pan	lu	dwar	ja	ja	mar	lu	ver";

    case 380:
      return "thwu	jon	hwo	tshy	gwe	ge	lha	lhon	jwa	lhon	tsar	tsar	tsar	jew	u	me	me	tyr	bon	lo	ew	?	sho	gha	u	khwi	ly	dze	myr	pi	na	wi	shi	ka	ga	ze	la	khwa	lwo	lhor	ew	wo	lhew	to	to	sha	vyr	lhy	kir	gu		lhy	gu	gu		zwyr	khwy	tson	dzwy	lhi	o	dzwy	ni	wi	o	thy	si	thy	thy	lhi	ngwi	li	li	lhe	thy	thy	thu	thu	cha	pu	tho	chew	ge	jy	han	rur	zhwu	che	ghyr	kur	dzu	my	lu	jwi	an	?	je	zhwu	na	vi	che	lhi	ky	me	lu	nwe	i	su	py	shew	ten	dew	lan	tsha	du	rer	vi	li	du	ky	lu	zewr	me	na	khwa	dzy	dew	ghwy	lo	cha	ngur	len	chhon	chhwen	ghyr	vy	ghew	jo	thy	lu	ma	lor	ver	na	be	dew	en	bo	ngur	tsi	tshew	syr	rur	jwi	kwe	kwe	ky	ky	rar	py	nga	hin	lu	e	thy	tse	vi	me	zir	khwa	jan	by	ka	vy	zher	tswe	kwe	chhon	lwu	jwyr	lu	li	chew	ngwu	ty	lu	shu	tha	twan	er	swin	me	me	me	rur	bi	kyr	vi	lho	dzu	rar	the	chon	ge	te	so	si	then	rar	bi	ngwu	shar	jwa	pe	ngwu		ngwi	ka	ka	ka	lhi	o	lha	ven	bi	shwi	je	mer	lhwy	ju	ka	mi	ja	o	zir	lhyr	dwu	er	u	u		tha	lhen	shy	chhy	dzwy	chhi	chhu	tha	chhu	tha	cha	gew	lon	chha	ka";

    case 381:
      return "so	ka	phon	phon	yr	ki	jwy	lwe	don	phe	lhi	kwan	zon	ton	ton	tsa	ghar	khen	ka	rir	la	pa	ve	pe	ngwy	zew	pe	chwon	kwu	zew	rir	pa	ten	ga	bu	vyr	ew	mew	zha	vi	sy	sy	myr	ki	chu	swu	de	gwan	gwan	ror	jwe	lher	rer	lu		la	tswa	no	ma	me	khew	lo	ve	ku	von	khu	ly	vi	lu	lwu	shen	tshi	rir	don	mu	jon	wer	lu	shen	bu	ne	o	ki	lon	thar	by	tswin	ror	cha	bo	bu	lu	lwyr	lon	shon	tshwan	chho	che	u	chew	se	thu	to	de	shy	lon	jwe	ge	ve	ko	di	chy	ti	kir	ror	no	dza	tsu	he	she	he	my	va	sha	ghy	shwo	ba	bi	lu	mi	tsi	chi	my	chu	ghwa	di	di	zyr	ne	tsir		bi	jwy	lu	mi	chwo		bi	ba	an	cha	cho	cho	jwy	ne	swy	jy	lu	ngwu	bu	dzu	hu	ner	mi	lu	kew	ka	jwi	dar	thi	to	lew		ghu	ga	sha	ne	cho	ta	kho	ha	shi	shy	shy	zo	shi	hu	shwy	shy	shy	e	lhon	tshwew	dza	shi	je	zho	shy	phi	phi	ty	she	ta		ti	je	kar	bu	hwi	phi		twe	twu	?	tshwew	two	ke	lwi	li	ke	di	me	li	ghan	chwe	kir	chon	jwu	du	du	by	du	en	en	du	ny	chhwor	kin	von	kir	t?	jen	gin	du	dwyr	ty	by	lhi	ew	dzur	ma	te	ni		le	ma";

    case 382:
      return "u	lwo	shwe	vi	ni	chhwin	khon	de	dwu	jen	lu	tsewr	vo	tsu	kwy	lwi	yr	jyr	su	dwyr	yr	khwy	ga	dzyr	ha	tshyr	ga	khwy	khwy	ghon	ne	ga	hwa	dzen	jwew	ty	tin	tu	jwu	?	ngwyr	le	ar	le	lhen	vy	vy	jwu	ton	no	zur	lan	nwy	shon	lhwe	lhwe	thu	sy	swy	byr	lhi	chon	di	u	chen	mar	gon	swo	sy	khew	ki	swy	o	gon	ku	hwin	sy	morn	twan	don	twu	chen	?	chen	lhwe	don	lu	go	don	tsir	ner	che	jwy	ne	my	my	rer	kir	do	ngwu	she	rer	my	my	en	ki	le	te	se	be	dy	ror	chy	hen	ba	je	my	lan	du	ngorn	lhon	phe	ghan	dew	khwa	che	phe	de	lin	hen	ve	ror	ma	sa	lha	de	the	chhi	gi	chhi	rewr	jwy	chhy	en	lhon	ba	?	twi	tsha	ki	tsa	ja	ew	zur	swa	?	dzu	ton	tu	ghor	tu	ja	po	shi	py	be	rur	phon	nir	sha	rur	by	dzwy	jon	vi	ghu	lon	shwy	li	va	tho	so	ew	zur	zwy	hew	si	ha	pa	rar	var	pa	bi	de	de	kwa	kwin	lan	sha	sha	pu	lu	do	lhew	tshy	bu	lew	ka	bu	rur	jwan	on	ju	sha	rir	shu	tsha	jon	no	kew	phe	zin	gu	hin	i	lho	tshew	khwa	shwy	?	zin	she	rir	zin	new	vor	zhyr	a	le	zur	tshew	tsewr	tswy	pen	tho	ku	ho	thu	gha	bu	va	cha	shen	ba	vu	swy";

    case 383:
      return "gwi	vu	ba	shen	chir	nwy	shon	mi	na	swe	sew	dzwy	ka	sa	my	po	kwan	lhi	khu	zy	chho	lo	lo	den	phon	ghu	on	chir	ghi	lo	kon	shwu	khwy	pe	zyr	ghyr	von	ka	dzu	kew	ngwi	gha	di	su	ban	dzu	dzu	ta	li	dzew	bu	var	le	hon	ngur	gha	lwi	jwo	dzu	ly	khu	sew	nin	ne	lhy	ghy	ghew	bu	ly	chy	lwu	chha	li	ti	me	dzon	en	dwy		di	dzy	de	phon	rewr	by	kon	tshi	ly	gy	rewr	kew	pa	vi	kwa	then	ghwe	lu	ver	kew	lon	chhe	gur	hon	khwa	ta	ti	ghwe	nwe	tshi	khew	na	phen	bu	dan	ge	dzen	dan	phy	?u	ar	ly	shi	kur	kon	kyr	ku	sar	dzu	dzu	ke	ku	khar	ly	rar	jew	bi	mi	sew	ve	ti	ver	gwi	kwi	vir	lhwi	mo	no	ly	bi	rir	gor	ha	ve	lew	ne	nu	chwew	zhew	ny	va	rur	born	so	dzi	ghu	sa	cho	na	myr	hwan	na	se	ghew	ne	zy	bo		ne	tshy	?	bu	khu	hu	ji	bi	tshwu	be	tsu	bo	bo	rir	rir	tsir	phy	ke	dy	khu	y	she	kewr	khe	ghu	lon	bo	che	sha	lew	tshwu	chwew	hwyr	khwe	lhy	ngwi	wu	nga	me	tshy	khu	ha	ban	chhi	dzi	di	mu	chwew	vin	zur	mer	jwon	vy	ma	tsy	kwen	che	sa	kwy	kwy	my	py	di	ke	me	sho	dzen	born	gha	le	je	vi	on	nu	ku	jwon	ma	vi	de";

    case 384:
      return "dwyr	tho	khu	gu	gu	gu	ne	zhiw	phu	zhiw	ly	ge	tsir	na	mur	pu	zhiw	pu	jan	tse	phu	tsir	ge	tshwu	phe	bo	chho	ly	tshwu	wy	zer	o	kwi	dy	tha	len	dy	lu	me	me	?	gwar	rar	zy	gha	kwe	lhy	ma	tsha		kha	kha	zwan	ku	la	ryr	zwan	kha	kha	ghew	ni	tshi	tshon	no	kir	dze	a	a	my	phu	khan	y	shy	ngwo	lhi	?	lwy	lwy	thy	by	bu	bo	ror	bu	rer	bu	by	za	kwy	jwa	kwy	zy	dzu	ne	ghwy	do	a	za	thew	ghen	chhew	te	te	chhe	bu	korn	zy	ne	te	ghwy	zy	dzi	lwi	ka	za	dew	ghwy	tse	dzy	dzar	thy	dzar	lhen	shwi	shwi	shwi	ngwo	kwi	se	shew	nwy	li	on	ew	tsy	pen	lo	di	?	zi	ngwy	ghy	la	be	be	tsha	shi	dan	lo	ta	tsy	pyr	shon	pa	lo	tshi	zar	dzen	le	dew	lon	tswo	tsha	li	kha	shon	han	kha	be	shi	dze	vy	o	lwe	nwo	bo	sho	bo	su	zha	me	?	vi	khin	ken	ne	chi	lew	da	ne	ka	vy	zewr	ren	vy	zewr	dzwy	vi	vi	rer	lin	ngwy	y	dzu	ti	no	pa	pa	tshe	mi	dzew	na	dy	da	zar	dy	ke	ly	dzwy	rar	rar	vi	ly	wan	du	vi	lew	vi	vo	du	ly	go	ghyr	chhwo	jwa	kwy	o	kho	ly	go	dzwew	dzwew	ve	kew	le	ryr	swo	nu	le	vy	my	in	la	o	lhy	la";

    case 385:
      return "chu	ky	gi	li	zi	lhi	pho	mi	o	ren	li	ghy	te	ba	gi	ju		ba	pa	pen	pen	sy	du	dzwy	ghon	che	du	lwa	no	shwa	u	tsha	chha	se	a	khu	phy	se	ten	a	tsu	tsu	rer	tsu	len	tsu	khy	lhwe	chwa	then	ly	ly	tshi	o	bwe	ma	ner	twin	ba	lwa	khe	nga	norn	te	ta	rir	la	nga	sa	du	swe	ti		te	le	ngwir	bu	ze	len	tsur	phu	bon	la	zorn	chwi	zon	by	zi	ner	rar	den	ja	di	lwu	ner	tshi	twu	se	tshu	da	rar	tsur		kwi	nga	che	ta	chu	thy	ta	tsorn	dzy	ghu	twa	tshi	tshi	lwa	lwa	tewr	ner	li	ner	den	ghan	twon		o	bu	ver	lwen	le	by	ny	ka	le	le	lu		ghon	wo	tshen	ka	rir	ly	?	gi	ghu	lha	bar	ga	tshy	jy	tshy	ge	ge	na	tshy	rer	khi	zewr	tshe	tshe	ta	ka	shon	?	dze	tshe	ti	mi	ta	ten	she	li	chi	dzi	kwe	kwe	tshwu	bi	so	ni	su	tar	phi	myr	bi	tshew	kwe	ge	dzi	she	chho	she	gu	wu	lwu	rer	tsor	bu	ta	li	le	she	dzwi	wu	na	phe	shon	ghu	vir	vor	dza	dzew	lu	lu	ren	van	mi	pen	bi	bi	bi	khy	bar	thu	thu	lo	ge	pho	kwen	on	shwi	ni	bo	ny	tswar	swi	da	ni	chhin	pa	vi	ma	vi	chhy	vi	khwu	chu	shy	jo	mu	ge	no	ji	ni";

    case 386:
      return "var	shy	lu	rar	chy	no	ghor	rar	mi	tshwu	vi	phe	vo	no	to	rar	ar	myr	dze	rar	bi	shwo	vi	kan	shwy	de	gy	thwo	thwo	shwo	me	ly	ke	khon	len	khi	har	sa	lhu	de	nur	lew	ta	u	de	u	jen	by	jen	me	by	mo	ga	ni	ryr	gi	ror	on	ly	vyr	ma	swen	du		tsir	mi	dzen	dzu	lwu	dza	tsha	dzew	dzew	ba	ba	ar	zyr	bi	dwa	tsho	on	my	mo	ba	dwa	ren	pwyr	on	zyr	the	dwa	dwan	tsho	na	na	pu	tshi	pu	dwe	pu	vir	ja	ja	ja	dzwy	lew	nwo	gi	rar	hon	phe	tsir	nga	shew	gew	lhi	dzi	rer	tsyr	kwyr	dyr	tsu	tsyr	lhi	tho	dzi	ve	tsu	zhy	khew	ni	se	non	po	bo	shon	norn	ke	sew	po	jew	po	phar	ke	ke	no	kon	la	j?n	j?	pa	kewr	pen	my	vi	dzo	khi	ir	lu	ngwo	ze	lu	to	so	thu	j?	thu	jew	thew	thu	shy	pha	sa	tswyr	tar	twi	pha	pha	pha	bo	thu	thu	ny	nu	ba	ka	nwy	ny	thwe	thin	ka	ba	gur	jwi	phu	chhwi	phu	san	hwa	hwi	no	jon	jon	dwu	chy	u	kwan	ne	gha	kwa	gy	gy	le	ho	khe	dzu	ko	rir	dzu	ben	rar	rewr	zar	rewr	my	phi	tshy	my	jan	dew	zha	lo	dzwy	do	tyr	cha	tshy	chha	ar	en	bo	to	lu	gwi	en	bo	gwi	?	bo	gwi	shon	zhu	kur	gha	shon	ne";

    case 387:
      return "er	ghorn	u	rir	ghon	ze	ka	no	u	kwo	gew	lhi	shen	nga	shi	khur	khi	so	kon	khon	rir	jon	zhwyr	kewr	ghon	dwu	ly	lwi	pi	pu	tsy	pe	phen	lwi	zu	zu	dy	be	zur	ti	la	chhwi	yr	rar	vy	chwo	kha	chhen	phy	dzi	zhew	vi	hwen	shi	tshi	lu	to	lhy	phi	phi	ly	thy	bar	phi	la	chyr	mo	char	ki	gwar	la	gwar	zir	kha	tew	rar	phi	phi	o	tsi	rer	len	dzwe	khwy	chi	chu	war	gu	ben	gu	pu	chu	py	o	o	tsy	dewr	e	e	chon	bi	dewr	e	ma	hi	han	hu	khwi	ha	swi	har	swi	chha	chha	chha	ge	li	vi	ghwyr	te	phi	vi	vi	la	vi	vi	gi	?	shy	phi		vi	vir		jwy	pon	jy	lho	dzi	jy	chhwew	chhwew	swu	chhew	che	zha	chhwew	lu	khew	khew	dzew	lhy	li	khew	ve	shi	ta	si	na	sha	si	no	ta	khwy	ty	tshy	vyr	va	lhi	swe	tshe	ki	kwi	nwy	pi	kar	do	chwe	lhu	vi	ka	ze	kwy	nwy	ta	du	di	shy	thy	khew	khen	ky	de	swe	kwe	ky	ti		so	rir	va	chhwo	kur	sy	ka	gha	dzu	ty	ghwi	phu	phi	se	phyr	vir	ten	chi	rur	sha	ti	be	tew	phon	po	a	tse	khe	kwen	lwi	lyr	du	ten	a	ly	hwen	ne	ha	kar	chy	ne	shi	vy	sew	tsir	sha	ghor	?a	twew	di	shy	tsy	tar	rur	chhew	swi	tse	ka";

    case 388:
      return "phy	lu	nwy		lhwa	gi	la	la	kwa	va	tshu	vu	la	chhwi	pi	ti	ma	rer	ir	ta	tshwew	chew	lu	ty	ku	dzwy	shwy	ly	pir	shen	ngwi	na	ngwo	chy	gi	phy	tshwe	vu	vu	pi	la	phy	chy	khi	bo	go	gar	rir	kwy	dew	lho	?	ngyr	phy	jwo	kar	zyr	phi	lo	rer	chir	chwe	ka	ky	ty	ror	lho		du	ky	phy	i	ka	khu	khu	tewr	je	lhi	te	ta	rer	rewr	ky	chhar	cha	rar	la	ngyr	shi	ma	?	khwy	se	me	zon	my	vor	vor	khwy	se	e	chhu	sew	sew	wu	lo	khwy	kan	dwewr	zi	dwu	u	dwewr	shwe	chon	lhorn	lhorn	thy	tse	?a	rorn	zi	di	di	ror	zi	du	lon	du	du	ha	lu	chho	zhy	twe	tshi	ghu	lo	zhy	tshe	bo	twi	lhor	ga	lo	jwe	lo	par	twe	to	lo	pan	pan	twi	be	ba	the	chhew	zhu	zhon		me	me	da	li	phy	thu	dwu	phe	dzu	du	zew	ne	zew	zew	zew	zew	ta	tyr	to	ta	to	hwy	wy	vy	lhu	nar	lwe	nar	khwar	shwy	lwi	lwi	ly	ly	ly	rur	khy	ly	ly	ju	lhew	zyr	lon	lhew	si	swi	rur	dzwo	ghwan	chyr	vy	my	rur	kon	dzy	gu	rur	rur	dzwi	dzi	chy	ti	je	gha	rur	dze	ba	va	u	le	?	ror	mu	be	che	gu	di	rur	khon	ghyr	ngwy	ngwyr	ngorn		ghyr	gu	kwyr	ghyr	va	ngwyr	gha	py	lo	an	vi";

    case 389:
      return "vu	bi	jy	tswu	lo	zur		lha	dwyr	dwyr	py	thwu	je	u	dan	bi	nga	ne	ne	chwi	nu	ne	ne	nin	hun	ne	ne	jy	chhin	ne	hon	dzy	ne	ne	khwa	tha	ku	ku	rir	gu	ne	dwyr	dzen	lu	bi	dzen	var	khu	o	pa	me	lwew	du	kwy	khwu	se	o	by	khi	kho	non	non	lhon	lhorn	dzi	zyr	je	je	tan	tan	tan	ghew	chy	vi	khy	jar	twu	chhew	ne	gewr	ly	u	ku	no	ly	so	ve	ku	tsy	tsy	ne	ke	ga	be	dzi	zewr	chor	zewr	by	va	u	la		da	si	si	ghew	ngewr	bi	bi	hy	hi	phu	shu	ku	ku	dzen	shew	phu	porn	ta	chhew	gu	gu	gu	gu	ner	gha	si	tsha	ngewr	va	khy	vi	len	len	len	khe	my	ngy	my	gi	ve	my	my	my	my	li	shwa	tso	my	jy	jy	no	no	shon	kwi	?	kyr	bi	kyr		gi	kyr	khe	tswar	ta	gha	lon	ko	kyr	by	nu	kha	khu	ryr	tshwa	zhu		gi	tswan	khwu	ngyr	ma	tshu	lhy	nu	chhwa	van	?	ngur	gwi	nwy	ja	tshon	vi	dzon	tshi	tshu	chhwa	ren	ran	ryr	ge	zir	lhu	tswu	dzwy	de	v?	bu	gwi	da	zher	khe	po	dar	bu	de	bu	ngon	lu	vor	ne	gha	kur	gha	du	tsyr	jy		zwi	my	chu	lwu	la	ju	ju	ju	lor	dew	dew	no	chwen	kir	rar	rar	ny	vi	vi	vi	khon	khen	zo	lhe	lhe";

    case 390:
      return "shi	sho	cho	gi	shwi	ke	la	shwi	chir	ke	shwi	me	shu	di	tswyr	wu	she	vir	vir	khwe	ja	vur	li	li	sa	je	dze	kew	she	dze	ka	za	po	za	gi	y	jy	y	chhwo	ka	zy	ky	ton	bi	jy	vi	mo	gha	ke	shar	so	gi	gwon	son	vo	vir	gi	ky	ky	yr	lhwi	me	dwar	mur	tar	se	bi	y	ghwen	ku	vy	ryr	myr	ken	lwi	rir	ky	lhu	lhi	tso	va	lho	pi	pi	tew	ky	ky	zi	ky		zwew	dzew	ny	lhy	zhyr	lho	kon	zwi	ba	shi	my	lhi	se	gwi	son	chhi	sy	sho	ton	lew	lew	be	lew	be	jo	ve	kor	dzu	rir	lu	lo	e	e	lhew	mu	chhew	hon	le	sa	vi	lhan	du	ky	lhan	tu	vo	tu	yr	yr	don	rer	khy	jon	swo	son	son	son	va	me	lon	lwo	lon	lhi	py	py	lhi	lhwe	lu		lhi	ly	ly	je	ge	thwyr	lu	ba	?	on	khe	dzi	ly	ghin	vo	ko	ly	ly	ly	ly	shan	ly	ko	ly	ly	dzi	swy	khen	di	lwy	lwy	dy	me	be	be	be	lu	?	dzy	swen	gu	ka	twan	ka	kha	rewr	nwu	new	na	twu	chhew	ngewr	be	nwy	shwy	zhyr	zhyr	shy	li	ne	ten	zi	tsu	mo	ve	?	ji	mer	sha	rur	rur	se	len	kwa	ky	bi	lew	vir	se	khe	gu	khe	gan	gu	la	gu	to	chyr	ryr	jwu	rewr	be	di		lu	lu	ge";

    case 391:
      return "myr	tsa	dzen	dzi	ngwir	li	on	chho	jo	phi	phar	phan	phon	ar	le	nar	dza	pa	shu	chhi	ngewr	kir	du	ma	rir	chu	ko	ghwe	be	tsir	tse	by	shar	shar	kwar	dzyr	ha	kwar	yr	kwu	chhwe	tho	er	ke	ke	ngur	ngur	i	ge	thy	shu	tha	ma	shu	tha	bi	tshy	dzon	ryr	pha	pho	khu	ke	?	phi	thy	jar	tsi	vir	chhy	la	shwi	jar	?	mir	dzwy	len	chu	vir	ju	ghe	tswi	shwu	shwu	shwu	ne	ew	ew	ew	dzon	kwyr	chhon	kur		wyr	shwy	thy	lor	chhy	nen	non	tshe	jy	bo	zo		jon	?	le	zyr	lwu	bo	gin	kho	dwu	my	ga	e	the	la	kha	vir	vu	kwo	kwo	kwo	li	li	na	li	dzy	jon	ly	la	bi	bi	tan	le	khy	tsen	zhyr	tewr	ka	lu	shu	kin	shy	ve	phar	van	sew	swy	ew	ge	be	swy	thwan	dzwy	chha	dzwy	pho	dzon	dzon	dzon	lon	lon	lon	lhew	zhe	lu	te	gewr	ghwin	twar	gi	ji	li	vi	thwe	wa	va	dza	phu	khe	pen	dy	dy	dy	si	zy	by	ve	le	bi	ngwu	no	ghy	chhe	chhe	lo	shy	chhew	dziw	zar	tsar	zhi	tshwu	bi	hyr	han	hwi	tsen	lhi	lhen	ki	korn	ghiw	ne	dy	zhyr	dzon	o	byr	khe	dzu	lhy	vi	du	swu	by	by	norn	norn	ten	shon	gha	vi";

    case 392:
      return "1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21	22	23	24	25	26	27	28	29	30	31	32	33	34	35	36	37	38	39	40	41	42	43	44	45	46	47	48	49	50	51	52	53	54	55	56	57	58	59	60	61	62	63	64	65	66	67	68	69	70	71	72	73	74	75	76	77	78	79	80	81	82	83	84	85	86	87	88	89	90	91	92	93	94	95	96	97	98	99	100	101	102	103	104	105	106	107	108	109	110	111	112	113	114	115	116	117	118	119	120	121	122	123	124	125	126	127	128	129	130	131	132	133	134	135	136	137	138	139	140	141	142	143	144	145	146	147	148	149	150	151	152	153	154	155	156	157	158	159	160	161	162	163	164	165	166	167	168	169	170	171	172	173	174	175	176	177	178	179	180	181	182	183	184	185	186	187	188	189	190	191	192	193	194	195	196	197	198	199	200	201	202	203	204	205	206	207	208	209	210	211	212	213	214	215	216	217	218	219	220	221	222	223	224	225	226	227	228	229	230	231	232	233	234	235	236	237	238	239	240	241	242	243	244	245	246	247	248	249	250	251	252	253	254	255	256";

    case 393:
      return "257	258	259	260	261	262	263	264	265	266	267	268	269	270	271	272	273	274	275	276	277	278	279	280	281	282	283	284	285	286	287	288	289	290	291	292	293	294	295	296	297	298	299	300	301	302	303	304	305	306	307	308	309	310	311	312	313	314	315	316	317	318	319	320	321	322	323	324	325	326	327	328	329	330	331	332	333	334	335	336	337	338	339	340	341	342	343	344	345	346	347	348	349	350	351	352	353	354	355	356	357	358	359	360	361	362	363	364	365	366	367	368	369	370	371	372	373	374	375	376	377	378	379	380	381	382	383	384	385	386	387	388	389	390	391	392	393	394	395	396	397	398	399	400	401	402	403	404	405	406	407	408	409	410	411	412	413	414	415	416	417	418	419	420	421	422	423	424	425	426	427	428	429	430	431	432	433	434	435	436	437	438	439	440	441	442	443	444	445	446	447	448	449	450	451	452	453	454	455	456	457	458	459	460	461	462	463	464	465	466	467	468	469	470	471	472	473	474	475	476	477	478	479	480	481	482	483	484	485	486	487	488	489	490	491	492	493	494	495	496	497	498	499	500	501	502	503	504	505	506	507	508	509	510	511	512";

    case 394:
      return "513	514	515	516	517	518	519	520	521	522	523	524	525	526	527	528	529	530	531	532	533	534	535	536	537	538	539	540	541	542	543	544	545	546	547	548	549	550	551	552	553	554	555	556	557	558	559	560	561	562	563	564	565	566	567	568	569	570	571	572	573	574	575	576	577	578	579	580	581	582	583	584	585	586	587	588	589	590	591	592	593	594	595	596	597	598	599	600	601	602	603	604	605	606	607	608	609	610	611	612	613	614	615	616	617	618	619	620	621	622	623	624	625	626	627	628	629	630	631	632	633	634	635	636	637	638	639	640	641	642	643	644	645	646	647	648	649	650	651	652	653	654	655	656	657	658	659	660	661	662	663	664	665	666	667	668	669	670	671	672	673	674	675	676	677	678	679	680	681	682	683	684	685	686	687	688	689	690	691	692	693	694	695	696	697	698	699	700	701	702	703	704	705	706	707	708	709	710	711	712	713	714	715	716	717	718	719	720	721	722	723	724	725	726	727	728	729	730	731	732	733	734	735	736	737	738	739	740	741	742	743	744	745	746	747	748	749	750	751	752	753	754	755	756	757	758	759	760	761	762	763	764	765	766	767	768";

    case 395:
      return "-		20				ts						8	8			an			hur		jau		od	so		in	iu	ei	mo	cau		iu	er	xi	1	1	s	5	5	ts	ten	9	9		xu	di		kai	zai						ka							hor	nen		li	ha			qa	mu				xo	mi	uni	ke	ke	iang		lu			tu	eu	us	ri	w	ong	deu	en	tir	hong	ho				ii						y	ss	ra		6	6		tz		zu	o		yu	ge	ud	ung	oi		e			ge	i	i	da				qu	al		ad	en	deu	cu	us				tz			ur					po	ang		fei	k					bun	iu	an				sio	p			pu	co		80		il	ing	go	ro				ho							b	10000			iang					go						yo	yo	on	qi	uan	den					au	gu		3	3	qo	qo	bai	da	uh		eng	as	bu	ra	ku			ud	sh							iung		car		am	am	o		10000	zo	a	a		mu	si";

    case 396:
      return "	u	bu		ae		ang				tu			de	li		lu		au	mu		n		mu	bi	u			lo	ta	jin			ku	reng	ri		ur	du		ba	pu	fu	u	heu	n	o	10		cen			d	mu		s		qu	t	du	o	or			em	z	hur	dur	l		ui	ui			ng		60			xi		em		ie	ong	un	z	neu	nai	qatun	g	ia			j				i'i		i	x	er				ud	ung		oi	e	ge			i	i	dz	ordu	ung	pong	en	iau						qid	ul	zung	4	4			u		tai	ca		oh	dau				ai	ar		io		an			xa		u		m	2	2			do	ren	iu	na		en				xua	un	40	giu	ju	ju	ju	ja	hu	ji	ji	on	50					gio	au	c	ki		30			to	da			do	doro		da			ia							bu	un";

    case 397:
      return "ga	ta	ghu	bu	shi	le	kwe	mi	le";

    case 432:
      return "e	e	a	a	a	a	i	i	i	i	u	u	u	u	u	e	e	e	e	e	o	o	o	ka	ka	ka	ka	ka	ka	ka	ka	ka	ka	ka	ka	ki	ki	ki	ki	ki	ki	ki	ki	ku	ku	ku	ku	ku	ku	ku	ke	ke	ke	ke	ke	ke	ko	ko	ko	ko	sa	sa	sa	sa	sa	sa	sa	sa	si	si	si	si	si	si	su	su	su	su	su	su	su	su	se	se	se	se	se	so	so	so	so	so	so	so	ta	ta	ta	ta	ti	ti	ti	ti	ti	ti	ti	tu	tu	tu	tu	tu	te	te	te	te	te	te	te	te	te	to	to	to	to	to	to	to	na	na	na	na	na	na	na	na	na	ni	ni	ni	ni	ni	ni	ni	ni	nu	nu	nu	ne	ne	ne	ne	ne	ne	ne	no	no	no	no	no	ha	ha	ha	ha	ha	ha	ha	ha	ha	ha	ha	hi	hi	hi	hi	hi	hi	hi	hu	hu	hu	he	he	he	he	he	he	he	ho	ho	ho	ho	ho	ho	ho	ho	ma	ma	ma	ma	ma	ma	ma	mi	mi	mi	mi	mi	mi	mi	mu	mu	mu	mu	me	me	me	mo	mo	mo	mo	mo	mo	ya	ya	ya	ya	ya	ya	yu	yu	yu	yu	yo	yo	yo	yo	yo	yo	ra	ra	ra	ra	ri	ri	ri	ri	ri	ri	ri	ru	ru	ru	ru	ru	ru	re	re";

    case 433:
      return "re	re	ro	ro	ro	ro	ro	ro	wa	wa	wa	wa	wa	wi	wi	wi	wi	wi	we	we	we	we	wo	wo	wo	wo	wo	wo	wo	n	n																																																		i	e	o																		i	e	o	n									i	na	tsha	ie	poe	swe	phiu	u	cya	tie	njie	toe	tchye	fwe	liu	siu	thu	njyu	vai	kai	khau	kou	tciou	liang	ciang	tsheng	song	ma	fa	la	thoe	tsoe	fwe	tswe	ti	ci	fu	fu	fu	tcyu	tcyu	fai	hau	lou	liou	tciou	ciou	tchyn	fang	vang	sang	khang	theng	neng	piong	iong	va	khua	tchya	nie	lie	tcie	tchie	njie	njie	ie	ie	mwe	vwe	vwe	twe	tswe	swe	swe	tci	ci	i	liu	njiu	ciu	mu	yu	tchy	njy	y	pai	pai	lai	ai	hau	tou	liou	iou	tsew	tsew	suow	huow	huow	nguw	mang	thang	kang	liang	tciang	njiang	peng	seng	piong	tshiong	tcing	pa	la	sie	tcie	ie	poe	loe	tsoe	soe	koe	khuoe	ye	pwe	pwe	tchi	tsiu	fu	vu	khu	hu	pw	fw	sw	kw	hw	mai	thai	sai	sai	thau	lau	lau	nou	kou";

    case 434:
      return "ciou	lew	sew	thuow	uow	kuw	tcyn	yn	vang	tsang	sang	khang	tciang	iang	teng	neng	piong	miong	ciong	ciong	njing	ng	tsa	sa	kua	kua	cya	cie	phoe	foe	loe	tshoe	tshoe	oe	tchye	fwe	tswe	ni	tshi	tshi	si	fu	ngu	tchyu	cyu	phw	fai	tsai	lou	tsou	piou	miou	tchiou	njiou	iou	nuow	kuow	huow	pang	ang	tsiang	tsiang	ciang	iang	liong	tshiong	ciong	cing	la	cya	poe	thoe	noe	tshoe	kue	kue	kue	ye	pwe	vwe	thi	tsi	tsi	tci	tci	tshiu	pu	tsu	ku	tcyu	njyu	tchy	pw	hw	phai	mai	lai	sai	hai	mau	tshau	hau	kou	ou	tsiou	tshiou	siou	tciou	ciou	thuow	fang	vang	lang	tshang	khang	khang	liang	siang	ciang	ciang	neng	leng	nong	long	liong	tsiong	siong	tcing	tcing	cing	ing	ng	va	sa	lie	tshie	sie	ie	moe	loe	tchye	cye	pi	ti	tci	tsiu	pu	fu	thu	hu	tcy	cy	pw	khw	lai	sai	sau	tsou	ngou	tsiou	njiou	ciou	iou	yn	tang	lang	kang	hang	hang	siang	tciang	iang	meng	tsiong	siong	tchiong	pa	tshie	sie	tsoe	koe	tcye	tcye	pwe	swe	ti	i	tciu	ciu	tsu	tshu	ku	lw	mai	kau	thou	hou	pang	fang	tang	lang	meng	teng	tseng	cing	ing	tsa	tsie	cie	moe	li	tsi	tci	i	mu	lu	hu	cyu	hw	tau	siou	lew	tshew	yn	tong	ie	voe	tswe	i	tu	lu	lou	tsou	tsuow	mang	tciant	tschiang	tciong	tsie	moe	ku	cyu	pw	tsiang	tshai	nguow	nong	fu	ku	fang	tcye	fi";

    case 444:
      return "h	x	p	t	f	k	l	b	d	v	g	r	pn	ds	fn	km	rs	th	dh	dh	kk	j	hl	lh	rh	m	n	j	s	mn	nm	jm	sj	m	ng	zh	j	z	s	ms	ns	js	ss	mns	nms	jms	sjs	ch	jn	jns	st	str	sp	spr	ts	trs	w	wh	wr	sn	sm	krs	grs	sk	skr	a	ow	oa	o	aou	i	e	ie	i	ui	ee	eh	i	ee	i	ye	u	eu	xw	un	u	u	uh	u	ooh	ow	ou	wa	wo	wi	wei	wow	u	o	i	a	an	am	en	an	on	m						'	'	'	'	'	'	'	'	'	'	'	'	'				'	'	`	`	'	'	'	'	'								'	'	`	`	'	'	'	'	'	'			+	r	-	.";

    case 464:
      return "-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-	-";

    case 465:
      return "|	|	|	|	|	|	|:	:|	:	D.S.	D.C.	S	*	/	%	%%	^	^	'	//	{	[	#	#	#	#	#	#	#	#	G	8G	G8	C	F	8F	F8	N	N			-	##	bb	b	b	#	#	#	#	#	b	44	22	8va	8vb	15ma	15mb	-	-	-	-	-	-	-	-	-	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	.	#	#	#	#	#	#	#	#	#						/	//	///																							~	~								r	s	z	p	m	f	<	>	*	*	tr	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	HT	NT	T	*					Ped.	*	^	/	\\	*	*	*	#	#	#	#	#	#	#	#	#	#	#	-	-	-	-	-	-	*	*	*	*	*	*	*	*	*	C	F	b	#	#	#	#	#	#	#	#	#	#	#	C	&	#	#	#	#	#	#	#	#	b";

    case 466:
      return "1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21	22	23	24	50	51	52	53	54	1	2	4	5	7	8	11	12	13	14	17	18	19	23	24	25	26	27	29	30	32	36	37	38	39	40	42	43	45	47	48	49	50	51	52	53	54	3	4	5	-																																																																																																																																																											0	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19";

    case 467:
      return "Ren	TianRen	DiRen	RenTian	RenDi	RenRen	Zhong	Zhou	Xian	Xian	Shao	Li	Shang	Gan	Shu	Xian	Cha	Tong	Zeng	Rui	Da	Jiao	Ruan	Xi	Cong	Jin	Shi	Ge	Yi	Le	Zheng	Wu	Shi	Geng	Duan	Yi	Zhuang	Zhong	Mi	Qin	Lian	Qiang	Sui	Sheng	Ju	Fa	Ying	Ying	Yu	Zao	Da	Kuo	Wen	Li	Tao	Tang	Chang	Du	Yong	Kun	Jian	Jin	Shou	Xi	Ju	Ji	Shi	Yi	Shi	Chen	Nei	Qu	Hui	Meng	Qiong	Ge	Zhi	Jian	Cheng	Zhi	Shi	Ju	Xun	Jiang	Nan	Qin	Yang										1	2	3	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	1	2	3	4	5	1	5";

    case 468:
      return "A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g		i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A		C	D			G			J	K			N	O	P	Q		S	T	U	V	W	X	Y	Z	a	b	c	d		f		h	i	j	k	l	m	n		p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v";

    case 469:
      return "w	x	y	z	A	B		D	E	F	G			J	K	L	M	N	O	P	Q		S	T	U	V	W	X	Y		a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B		D	E	F	G		I	J	K	L	M		O				S	T	U	V	W	X	Y		a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r";

    case 470:
      return "s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	i	j			A	B	G	D	E	Z	E	Th	I	K	L	M	N	X	O	P	R	Th	S	T	Y	Ph	Ch	Ps	O	D	a	b	g	d	e	z	e	th	i	k	l	m	n	x	o	p	r	s	s	t	y	ph	ch	ps	o	d	e	th	k	ph	r	p	A	B	G	D	E	Z	E	Th	I	K	L	M	N	X	O	P	R	Th	S	T	Y	Ph	Ch	Ps	O	D	a	b	g	d";

    case 471:
      return "e	z	e	th	i	k	l	m	n	x	o	p	r	s	s	t	y	ph	ch	ps	o	d	e	th	k	ph	r	p	A	B	G	D	E	Z	E	Th	I	K	L	M	N	X	O	P	R	Th	S	T	Y	Ph	Ch	Ps	O	D	a	b	g	d	e	z	e	th	i	k	l	m	n	x	o	p	r	s	s	t	y	ph	ch	ps	o	d	e	th	k	ph	r	p	A	B	G	D	E	Z	E	Th	I	K	L	M	N	X	O	P	R	Th	S	T	Y	Ph	Ch	Ps	O	D	a	b	g	d	e	z	e	th	i	k	l	m	n	x	o	p	r	s	s	t	y	ph	ch	ps	o	d	e	th	k	ph	r	p	A	B	G	D	E	Z	E	Th	I	K	L	M	N	X	O	P	R	Th	S	T	Y	Ph	Ch	Ps	O	D	a	b	g	d	e	z	e	th	i	k	l	m	n	x	o	p	r	s	s	t	y	ph	ch	ps	o	d	e	th	k	ph	r	p	W	w			0	1	2	3	4	5	6	7	8	9	0	1	2	3	4	5	6	7	8	9	0	1	2	3	4	5	6	7	8	9	0	1	2	3	4	5	6	7	8	9	0	1	2	3	4	5	6	7	8	9";

    case 480:
      return "a	b	v	g	d	e	zh		z	i	j	i	g	k	l	m	n	o	p	r	s	t	u	f	h			sht	c	ch	sh	u	i	e		ju	e		jo	je	o	jo	th";

    case 481:
      return "m	ts	nt	t	h	n	x	nk	c	l	s	z	nc	nts	k	d	ny	nr	v	ntx	tx	f	r	q	y	nq	p	xy	np	dl	npl	'	ml	pl	g	r	a	aa	i	u	o	oo	e	ee	w				b	m	j	v	s	g	d						-				0	1	2	3	4	5	6	7	8	9					$	@";

    case 482:
      return "																																																																																																																																																																																																aa	a	b	c	d	g	y	ph	l	n	p	t	th	f	s	sh	j	z	w	v	k	o	au	r	m	kh	h	e	i	ng	u	lh	ts	tr	ong	aang	ang	ing	on	en	aan	ny	uen	x					0	1	2	3	4	5	6	7	8	9						Rs";

    case 488:
      return "ki	ka	ku	ke	ke	ko	ko	kua	wi	wa	wu	we	we	wo	wo	wui	wei	wvi	wva	wve	min	man	mun	men	mon	muan	muen	bi	ba	bu	be	be	bo	bo	i	a	u	e	e	o	o	ei	in	in	an	en	si	sa	su	se	se	so	so	sia	li	la	lu	le	le	lo	lo	le	di	da	du	de	do	do	ti	ta	tu	te	te	to	to	ji	ja	ju	je	je	jo	jo	jo	yi	ya	yu	ye	ye	yo	yo	fi	fa	fu	fe	fe	fo	fo	fua	fan	nin	nan	nun	nen	non	hi	ha	hu	he	he	ho	ho	hei	hou	hin	han	hun	hen	hon	huan	nggi	ngga	nggu	ngge	ngge	nggo	nggo	nggaa	nggua	ngge	nggo	nggo	gi	ga	gu	ge	guei	guan	ngen	ngon	nguan	pi	pa	pu	pe	pe	po	po	mbi	mba	mbu	mbe	mbe	mbe	mbo	mbo	mbuu	mbe	mbo	mbo	kpi	kpa	kpu	kpe	kpe	kpo	kpo	gbi	gba	gbu	gbe	gbe	gbo	gbo	ra	ndi	nda	ndu	nde	nde	ndo	ndo	nja	nju	nje	njo	vi	va	vu	ve	ve	vo	vo	nyin	nyan	nyun	nyen	nyon			1	2	3	4	5	6	7	8	9";

    case 489:
      return "A	D	L	M	B	S	P	Bh	R	E	F	I	O	Dh	Yh	W	N	K	Y	U	J	C	H	Q	G	Ny	T	Nh	V	X	Gb	Z	Kp	Sh	a	d	l	m	b	s	p	bh	r	e	f	i	o	dh	yh	w	n	k	y	u	j	c	h	q	g	ny	t	nh	v	x	gb	z	kp	sh				'				'					0	1	2	3	4	5	6	7	8	9					!	?";

    case 492:
      return "																																																																																																																	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	200	300	400	500	600	700	800	900	1000	2000	3000	4000	5000	6000	7000	8000	9000	10000	20000	30000	40000	50000	60000	70000	80000	90000	1L	2L	L	cr	2cr	1	2	3	4	5	6	7	8	9	-	1/4	1/2	3/4	Rs	1	2	10000	L";

    case 493:
      return "	1	2	3	4	5	6	7	8	9	10	20	30	40	50	60	70	80	90	100	200	300	400	500	600	700	800	900	1000	2000	3000	4000	5000	6000	7000	8000	9000	10000	20000	30000	40000	50000	60000	70000	80000	90000	*	2	3	4	5	6	7	8	9	10	400	600	2000	10000	1/2	1/6";

    case 494:
      return "a	b	j	d		w	z	h	t	y	k	l	m	n	s	`	f	s	q	r	sh	t	th	kh	dh	d	dh	gh	b	n	f	q		b	j		h			h		y	k	l	m	n	s	`	f	s	q		sh	t	th	kh		d		gh							j					h		y		l		n	s	`		s	q		sh			kh		d		gh		n		q		b	j		h			h	t	y	k		m	n	s	`	f	s	q		sh	t	th	kh		d	dh	gh	b		f		a	b	j	d	h	w	z	h	t	y		l	m	n	s	`	f	s	q	r	sh	t	th	kh	dh	d	dh	gh						b	j	d		w	z	h	t	y		l	m	n	s	`	f	s	q	r	sh	t	th	kh	dh	d	dh	gh																																																					mh	hd";

    case 496:
      return "1z	2z	3z	4z	:mahjong:	6z	5z	1m	2m	3m	4m	5m	6m	7m	8m	9m	1s	2s	3s	4s	5s	6s	7s	8s	9s	1p	2p	3p	4p	5p	6p	7p	8p	9p	1b	2b	4b	3b	5b	6b	7b	8b	j	-					-	00	01	02	03	04	05	06	10	11	12	13	14	15	16	20	21	22	23	24	25	26	30	31	32	33	34	35	36	40	41	42	43	44	45	46	50	51	52	53	54	55	56	60	61	62	63	64	65	66	-	00	01	02	03	04	05	06	10	11	12	13	14	15	16	20	21	22	23	24	25	26	30	31	32	33	34	35	36	40	41	42	43	44	45	46	50	51	52	53	54	55	56	60	61	62	63	64	65	66													-	As	2s	3s	4s	5s	6s	7s	8s	9s	Ts	Js	Ns	Qs	Ks			Ah	2h	3h	4h	5h	6h	7h	8h	9h	Th	Jh	Nh	Qh	Kh	0		Ad	2d	3d	4d	5d	6d	7d	8d	9d	Td	Jd	Nd	Qd	Kd	:black_joker:		Ac	2c	3c	4c	5c	6c	7c	8c	9c	Tc	Jc	Nc	Qc	Kc	0	0	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21";

    case 497:
      return "0.	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0	0	CC0	ShareAlike	NonCommercial	(A)	(B)	(C)	(D)	(E)	(F)	(G)	(H)	(I)	(J)	(K)	(L)	(M)	(N)	(O)	(P)	(Q)	(R)	(S)	(T)	(U)	(V)	(W)	(X)	(Y)	(Z)	[S]	C	R	CD	WZ	Copyleft	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	HV	MV	SD	SS	PPV	WC	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	MC	MD	MR	CreativeCommons	PublicDomain	Attribution	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	PX	IC	PA	SA	AB	WC	DJ	CL	COOL	FREE	ID	NEW	NG	OK	SOS	UP!	VS	3D	2ndScr	2K	4K	8K	5.1	7.1	22.2	60P	120P	d	HC	HDR	Hi-Res	Lossless	SHV	UHD	VOD	*M*																																																									A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z";

    case 498:
      return "hoka	koko	sa														Shou	Zi	Shuang	de	Er	Duo	Jie	Tian	Jiao	Ying	Wu	Liao	Qian	Hou	Zai	Xin	Chu	Zhong	Sheng	Fan	Sheng	Chui	Yan	Tou	Bu	Yi	San	You	Zuo	Zhong	You	Zhi	Zou	Da	Jin	Kong	He	Man	You	Yue	Shen	Ge	Ying	Pei					[Ben]	[San]	[Er]	[An]	[Dian]	[Da]	[Dao]	[Sheng]	[Bai]								De	Ke															Fu	Lu	Shou	Xi	Shuangxi	Cai";

    case 499:
      return ":cyclone:	:foggy:	:closed_umbrella:	:night_with_stars:	:sunrise_over_mountains:	:sunrise:	:city_dusk:	:city_sunset:	:rainbow:	:bridge_at_night:	:ocean:	:volcano:	:milky_way:	:earth_africa:	:earth_americas:	:earth_asia:	:globe_with_meridians:	:new_moon:	:waxing_crescent_moon:	:first_quarter_moon:	:waxing_gibbous_moon:	:full_moon:	:waning_gibbous_moon:	:last_quarter_moon:	:waning_crescent_moon:	:crescent_moon:	:new_moon_with_face:	:first_quarter_moon_with_face:	:last_quarter_moon_with_face:	:full_moon_with_face:	:sun_with_face:	:star2:	:stars:	:thermometer:	*	*	:white_sun_small_cloud:	:white_sun_cloud:	:white_sun_rain_cloud:	:cloud_rain:	:cloud_snow:	:cloud_lightning:	:cloud_tornado:	:fog:	:wind_blowing_face:	:hotdog:	:taco:	:burrito:	:chestnut:	:seedling:	:evergreen_tree:	:deciduous_tree:	:palm_tree:	:cactus:	:hot_pepper:	:tulip:	:cherry_blossom:	:rose:	:hibiscus:	:sunflower:	:blossom:	:corn:	:ear_of_rice:	:herb:	:four_leaf_clover:	:maple_leaf:	:fallen_leaf:	:leaves:	:mushroom:	:tomato:	:eggplant:	:grapes:	:melon:	:watermelon:	:tangerine:	:lemon:	:banana:	:pineapple:	:apple:	:green_apple:	:pear:	:peach:	:cherries:	:strawberry:	:hamburger:	:pizza:	:meat_on_bone:	:poultry_leg:	:rice_cracker:	:rice_ball:	:rice:	:curry:	:ramen:	:spaghetti:	:bread:	:fries:	:sweet_potato:	:dango:	:oden:	:sushi:	:fried_shrimp:	:fish_cake:	:icecream:	:shaved_ice:	:ice_cream:	:doughnut:	:cookie:	:chocolate_bar:	:candy:	:lollipop:	:custard:	:honey_pot:	:cake:	:bento:	:stew:	:cooking:	:fork_and_knife:	:tea:	:sake:	:wine_glass:	:cocktail:	:tropical_drink:	:beer:	:beers:	:baby_bottle:	:fork_knife_plate:	:champagne:	:popcorn:	:ribbon:	:gift:	:birthday:	:jack_o_lantern:	:christmas_tree:	:santa:	:fireworks:	:sparkler:	:balloon:	:tada:	:confetti_ball:	:tanabata_tree:	:crossed_flags:	:bamboo:	:dolls:	:flags:	:wind_chime:	:rice_scene:	:school_satchel:	:mortar_board:	*	*	:military_medal:	:reminder_ribbon:	*	:microphone2:	:level_slider:	:control_knobs:	#	#	:film_frames:	:tickets:	:carousel_horse:	:ferris_wheel:	:roller_coaster:	:fishing_pole_and_fish:	:microphone:	:movie_camera:	:cinema:	:headphones:	:art:	:tophat:	:circus_tent:	:ticket:	:clapper:	:performing_arts:	:video_game:	:dart:	:slot_machine:	:8ball:	:game_die:	:bowling:	:flower_playing_cards:	:musical_note:	:notes:	:saxophone:	:guitar:	:musical_keyboard:	:trumpet:	:violin:	:musical_score:	:running_shirt_with_sash:	:tennis:	:ski:	:basketball:	:checkered_flag:	:snowboarder:	:person_running:	:person_surfing:	:medal:	:trophy:	:horse_racing:	:football:	:rugby_football:	:person_swimming:	:person_lifting_weights:	:person_golfing:	:motorcycle:	:race_car:	:cricket_game:	:volleyball:	:field_hockey:	:hockey:	:ping_pong:	:mountain_snow:	:camping:	:beach:	:construction_site:	:homes:	:cityscape:	:house_abandoned:	:classical_building:	:desert:	:island:	:park:	:stadium:	:house:	:house_with_garden:	:office:	:post_office:	:european_post_office:	:hospital:	:bank:	:atm:	:hotel:	:love_hotel:	:convenience_store:	:school:	:department_store:	:factory:	:izakaya_lantern:	:japanese_castle:	:european_castle:	*	*	:flag_white:	:flag_black:	:rosette:	*	:label:	:badminton:	:bow_and_arrow:	:amphora:";

    case 500:
      return ":rat:	:mouse2:	:ox:	:water_buffalo:	:cow2:	:tiger2:	:leopard:	:rabbit2:	:cat2:	:dragon:	:crocodile:	:whale2:	:snail:	:snake:	:racehorse:	:ram:	:goat:	:sheep:	:monkey:	:rooster:	:chicken:	:dog2:	:pig2:	:boar:	:elephant:	:octopus:	:shell:	:bug:	:ant:	:bee:	:beetle:	:fish:	:tropical_fish:	:blowfish:	:turtle:	:hatching_chick:	:baby_chick:	:hatched_chick:	:bird:	:penguin:	:koala:	:poodle:	:dromedary_camel:	:camel:	:dolphin:	:mouse:	:cow:	:tiger:	:rabbit:	:cat:	:dragon_face:	:whale:	:horse:	:monkey_face:	:dog:	:pig:	:frog:	:hamster:	:wolf:	:bear:	:panda_face:	:pig_nose:	:feet:	:chipmunk:	:eyes:	:eye:	:ear:	:nose:	:lips:	:tongue:	:point_up_2:	:point_down:	:point_left:	:point_right:	:punch:	:wave:	:ok_hand:	:thumbsup:	:thumbsdown:	:clap:	:open_hands:	:crown:	:womans_hat:	:eyeglasses:	:necktie:	:shirt:	:jeans:	:dress:	:kimono:	:bikini:	:womans_clothes:	:purse:	:handbag:	:pouch:	:mans_shoe:	:athletic_shoe:	:high_heel:	:sandal:	:boot:	:footprints:	:bust_in_silhouette:	:busts_in_silhouette:	:boy:	:girl:	:man:	:woman:	:family:	:couple:	:two_men_holding_hands:	:two_women_holding_hands:	:police_officer:	:people_with_bunny_ears_partying:	:bride_with_veil:	:blond_haired_person:	:man_with_chinese_cap:	:person_wearing_turban:	:older_man:	:older_woman:	:baby:	:construction_worker:	:princess:	:japanese_ogre:	:japanese_goblin:	:ghost:	:angel:	:alien:	:space_invader:	:imp:	:skull:	:person_tipping_hand:	:guard:	:dancer:	:lipstick:	:nail_care:	:person_getting_massage:	:person_getting_haircut:	:barber:	:syringe:	:pill:	:kiss:	:love_letter:	:ring:	:gem:	:couplekiss:	:bouquet:	:couple_with_heart:	:wedding:	:heartbeat:	:broken_heart:	:two_hearts:	:sparkling_heart:	:heartpulse:	:cupid:	:blue_heart:	:green_heart:	:yellow_heart:	:purple_heart:	:gift_heart:	:revolving_hearts:	:heart_decoration:	:diamond_shape_with_a_dot_inside:	:bulb:	:anger:	:bomb:	:zzz:	:boom:	:sweat_drops:	:droplet:	:dash:	:poop:	:muscle:	:dizzy:	:speech_balloon:	:thought_balloon:	:white_flower:	:100:	:moneybag:	:currency_exchange:	:heavy_dollar_sign:	:credit_card:	:yen:	:dollar:	:euro:	:pound:	:money_with_wings:	:chart:	:seat:	:computer:	:briefcase:	:minidisc:	:floppy_disk:	:cd:	:dvd:	:file_folder:	:open_file_folder:	:page_with_curl:	:page_facing_up:	:date:	:calendar:	:card_index:	:chart_with_upwards_trend:	:chart_with_downwards_trend:	:bar_chart:	:clipboard:	:pushpin:	:round_pushpin:	:paperclip:	:straight_ruler:	:triangular_ruler:	:bookmark_tabs:	:ledger:	:notebook:	:notebook_with_decorative_cover:	:closed_book:	:book:	:green_book:	:blue_book:	:orange_book:	:books:	:name_badge:	:scroll:	:pencil:	:telephone_receiver:	:pager:	:fax:	:satellite:	:loudspeaker:	:mega:	:outbox_tray:	:inbox_tray:	:package:	:e_mail:	:incoming_envelope:	:envelope_with_arrow:	:mailbox_closed:	:mailbox:	:mailbox_with_mail:	:mailbox_with_no_mail:	:postbox:	:postal_horn:	:newspaper:	:iphone:	:calling:	:vibration_mode:	:mobile_phone_off:	:no_mobile_phones:	:signal_strength:	:camera:	:camera_with_flash:	:video_camera:	:tv:	:radio:	:vhs:	:projector:	*	:prayer_beads:";

    case 501:
      return ":twisted_rightwards_arrows:	:repeat:	:repeat_one:	:arrows_clockwise:	:arrows_counterclockwise:	:low_brightness:	:high_brightness:	:mute:	:speaker:	:sound:	:loud_sound:	:battery:	:electric_plug:	:mag:	:mag_right:	:lock_with_ink_pen:	:closed_lock_with_key:	:key:	:lock:	:unlock:	:bell:	:no_bell:	:bookmark:	:link:	:radio_button:	:back:	:end:	:on:	:soon:	:top:	:underage:	:keycap_ten:	:capital_abcd:	:abcd:	:1234:	:symbols:	:abc:	:fire:	:flashlight:	:wrench:	:hammer:	:nut_and_bolt:	:knife:	:gun:	:microscope:	:telescope:	:crystal_ball:	:six_pointed_star:	:beginner:	:trident:	:black_square_button:	:white_square_button:	:red_circle:	:blue_circle:	:large_orange_diamond:	:large_blue_diamond:	:small_orange_diamond:	:small_blue_diamond:	:small_red_triangle:	:small_red_triangle_down:	:arrow_up_small:	:arrow_down_small:	*	*	+	+	+	*	*	M	+	+	+	:om_symbol:	:dove:	:kaaba:	:mosque:	:synagogue:	:menorah:	*	:clock1:	:clock2:	:clock3:	:clock4:	:clock5:	:clock6:	:clock7:	:clock8:	:clock9:	:clock10:	:clock11:	:clock12:	:clock130:	:clock230:	:clock330:	:clock430:	:clock530:	:clock630:	:clock730:	:clock830:	:clock930:	:clock1030:	:clock1130:	:clock1230:	*	*	*	@	@	*	*	:candle:	:clock:	*	*	:hole:	:levitate:	:detective:	:dark_sunglasses:	:spider:	:spider_web:	:joystick:	:man_dancing:	@	@	@	@	@	@	@	@	@	@	@	@	:paperclips:	*	*	:pen_ballpoint:	:pen_fountain:	:paintbrush:	:crayon:	*	*	:hand_splayed:	*	^	v	V	:middle_finger:	:vulcan:	v	<	>	<	>	<	>	^	v	^	v	^	v	:black_heart:	:desktop:	*	*	:printer:	*	*	*	*	*	*	*	*	:mouse_three_button:	:trackball:	*	*	*	*	*	*	#	#	#	:frame_photo:	#	#	#	#	#	:dividers:	:card_box:	:file_cabinet:	#	#	#	#	#	#	#	#	#	#	#	#	:wastebasket:	:notepad_spiral:	:calendar_spiral:	*	*	*	*	*	X	aA	Aa	:compression:	:key2:	:newspaper2:	#	#	:dagger:	*	:speaking_head:	v	^	>	<	:speech_left:	@	@	@	@	@	@	:anger_right:	*	*	*	:ballot_box:	x	x	x	x	v	v	:map:	:mount_fuji:	:tokyo_tower:	:statue_of_liberty:	:japan:	:moyai:";

    case 502:
      return ":grinning:	:grin:	:joy:	:smiley:	:smile:	:sweat_smile:	:laughing:	:innocent:	:smiling_imp:	:wink:	:blush:	:yum:	:relieved:	:heart_eyes:	:sunglasses:	:smirk:	:neutral_face:	:expressionless:	:unamused:	:sweat:	:pensive:	:confused:	:confounded:	:kissing:	:kissing_heart:	:kissing_smiling_eyes:	:kissing_closed_eyes:	:stuck_out_tongue:	:stuck_out_tongue_winking_eye:	:stuck_out_tongue_closed_eyes:	:disappointed:	:worried:	:angry:	:rage:	:cry:	:persevere:	:triumph:	:disappointed_relieved:	:frowning:	:anguished:	:fearful:	:weary:	:sleepy:	:tired_face:	:grimacing:	:sob:	:open_mouth:	:hushed:	:cold_sweat:	:scream:	:astonished:	:flushed:	:sleeping:	:dizzy_face:	:no_mouth:	:mask:	:smile_cat:	:joy_cat:	:smiley_cat:	:heart_eyes_cat:	:smirk_cat:	:kissing_cat:	:pouting_cat:	:crying_cat_face:	:scream_cat:	:slight_frown:	:slight_smile:	:upside_down:	:rolling_eyes:	:person_gesturing_no:	:person_gesturing_ok:	:person_bowing:	:see_no_evil:	:hear_no_evil:	:speak_no_evil:	:person_raising_hand:	:raised_hands:	:person_frowning:	:person_pouting:	:pray:	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	#	#	#	#	-	|	-	|	&	&	&	&	&	&	\"	\"	\"	!?	!?	!?	/	\\	/	\\	:rocket:	:helicopter:	:steam_locomotive:	:railway_car:	:bullettrain_side:	:bullettrain_front:	:train2:	:metro:	:light_rail:	:station:	:tram:	:train:	:bus:	:oncoming_bus:	:trolleybus:	:busstop:	:minibus:	:ambulance:	:fire_engine:	:police_car:	:oncoming_police_car:	:taxi:	:oncoming_taxi:	:red_car:	:oncoming_automobile:	:blue_car:	:truck:	:articulated_lorry:	:tractor:	:monorail:	:mountain_railway:	:suspension_railway:	:mountain_cableway:	:aerial_tramway:	:ship:	:person_rowing_boat:	:speedboat:	:traffic_light:	:vertical_traffic_light:	:construction:	:rotating_light:	:triangular_flag_on_post:	:door:	:no_entry_sign:	:smoking:	:no_smoking:	:put_litter_in_its_place:	:do_not_litter:	:potable_water:	:non_potable_water:	:bike:	:no_bicycles:	:person_biking:	:person_mountain_biking:	:person_walking:	:no_pedestrians:	:children_crossing:	:mens:	:womens:	:restroom:	:baby_symbol:	:toilet:	:wc:	:shower:	:bath:	:bathtub:	:passport_control:	:customs:	:baggage_claim:	:left_luggage:	^	X	i	m	f	:couch:	:sleeping_accommodation:	:shopping_bags:	:bellhop:	:bed:	:place_of_worship:	:octagonal_sign:	:shopping_cart:	^	^	:hindu_temple:	:hut:	:elevator:									:tools:	:shield:	:oil:	:motorway:	:railway_track:	:motorboat:	^	^	^	:airplane_small:	^	:airplane_departure:	:airplane_arriving:				:satellite_orbital:	#	#	:cruise_ship:	:scooter:	:motor_scooter:	:canoe:	:sled:	:flying_saucer:	:skateboard:	:auto_rickshaw:	:pickup_truck:	:roller_skate:";

    case 503:
      return "QE	A	F	E	W	AF	AR	AR	SV	SV	+	+	+	*	*	*	*	*	*	*	s	n	n	v	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	T	T	T	T	T	A	MB	VB	R	h	n	dn	m	drss	ozss													<	^	>	v	*	*	*	*	*	*	*	*	*	*	#	#	#	#	#	#	#	#	#	*	*	*	*	*	*	*	*	*	*	+	+	+	+	+	+	+	x	x	x	x	x	x	x	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	+	+	+	+	+	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*								:orange_circle:	:yellow_circle:	:green_circle:	:purple_circle:	:brown_circle:	:red_square:	:blue_square:	:orange_square:	:yellow_square:	:green_square:	:purple_square:	:brown_square:";

    case 504:
      return "<	^	>	v	<	^	>	v	<	^	>	v					<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v	<	^	>	v									<	^	>	v	\\	/	\\	/	-	|							<	^	>	v	\\	/	\\	/	<	^	>	v	\\	/	\\	/	<	^	>	v	\\	/	\\	/	<	^	>	v	\\	/	\\	/	<	^	>	v	\\	/	\\	/									<	^	>	v	<	^	>	v	<	^	>	v	-	-	-	-	<	>	<	>	<	>	<	>	<	>	<	>	-	-			\\	/";

    case 505:
      return "+	+	+	*	*	*	*	*	^	^	^	^	:pinched_fingers:	:white_heart:	:brown_heart:	:pinching_hand:	:zipper_mouth:	:money_mouth:	:thermometer_face:	:nerd:	:thinking:	:head_bandage:	:robot:	:hugging:	:metal:	:call_me:	:raised_back_of_hand:	:left_facing_fist:	:right_facing_fist:	:handshake:	:fingers_crossed:	:love_you_gesture:	:cowboy:	:clown:	:nauseated_face:	:rofl:	:drooling_face:	:lying_face:	:person_facepalming:	:sneezing_face:	:face_with_raised_eyebrow:	:star_struck:	:zany_face:	:shushing_face:	:face_with_symbols_over_mouth:	:face_with_hand_over_mouth:	:face_vomiting:	:exploding_head:	:pregnant_woman:	:breast_feeding:	:palms_up_together:	:selfie:	:prince:	:man_in_tuxedo:	:mrs_claus:	:person_shrugging:	:person_doing_cartwheel:	:person_juggling:	:person_fencing:	+	:people_wrestling:	:person_playing_water_polo:	:person_playing_handball:	:diving_mask:	:wilted_rose:	:drum:	:champagne_glass:	:tumbler_glass:	:spoon:	:goal:	+	:first_place:	:second_place:	:third_place:	:boxing_glove:	:martial_arts_uniform:	:curling_stone:	:lacrosse:	:softball:	:flying_disc:	:croissant:	:avocado:	:cucumber:	:bacon:	:potato:	:carrot:	:french_bread:	:salad:	:shallow_pan_of_food:	:stuffed_flatbread:	:egg:	:milk:	:peanuts:	:kiwi:	:pancakes:	:dumpling:	:fortune_cookie:	:takeout_box:	:chopsticks:	:bowl_with_spoon:	:cup_with_straw:	:coconut:	:broccoli:	:pie:	:pretzel:	:cut_of_meat:	:sandwich:	:canned_food:	:leafy_green:	:mango:	:moon_cake:	:bagel:	:smiling_face_with_3_hearts:	:yawning_face:	:smiling_face_with_tear:	:partying_face:	:woozy_face:	:hot_face:	:cold_face:	:ninja:	:disguised_face:		:pleading_face:	:sari:	:lab_coat:	:goggles:	:hiking_boot:	:womans_flat_shoe:	:crab:	:lion_face:	:scorpion:	:turkey:	:unicorn:	:eagle:	:duck:	:bat:	:shark:	:owl:	:fox:	:butterfly:	:deer:	:gorilla:	:lizard:	:rhino:	:shrimp:	:squid:	:giraffe:	:zebra:	:hedgehog:	:sauropod:	:t_rex:	:cricket:	:kangaroo:	:llama:	:peacock:	:hippopotamus:	:parrot:	:raccoon:	:lobster:	:mosquito:	:microbe:	:badger:	:swan:	:mammoth:	:dodo:	:sloth:	:otter:	:orangutan:	:skunk:	:flamingo:	:oyster:	:beaver:	:bison:	:seal:	:guide_dog:	:probing_cane:					:bone:	:leg:	:foot:	:tooth:	:superhero:	:supervillain:	:safety_vest:	:ear_with_hearing_aid:	:motorized_wheelchair:	:manual_wheelchair:	:mechanical_arm:	:mechanical_leg:	:cheese:	:cupcake:	:salt:	:beverage_box:	:garlic:	:onion:	:falafel:	:waffle:	:butter:	:mate:	:ice_cube:	:bubble_tea:		:person_standing:	:person_kneeling:	:deaf_person:	:face_with_monocle:	:adult:	:child:	:older_adult:	:bearded_person:	:woman_with_headscarf:	:person_in_steamy_room:	:person_climbing:	:person_in_lotus_position:	:mage:	:fairy:	:vampire:	:merperson:	:elf:	:genie:	:zombie:	:brain:	:orange_heart:	:billed_cap:	:scarf:	:gloves:	:coat:	:socks:	:red_envelope:	:firecracker:	:jigsaw:	:test_tube:	:petri_dish:	:dna:	:compass:	:abacus:	:fire_extinguisher:	:toolbox:	:bricks:	:magnet:	:luggage:	:squeeze_bottle:	:thread:	:yarn:	:safety_pin:	:teddy_bear:	:broom:	:basket:	:roll_of_paper:	:soap:	:sponge:	:receipt:	:nazar_amulet:";

    case 506:
      return "K	Q	R	B	N	P	N	n	N	K	Q	R	B	N	P	k	q	r	b	n	p	K	Q	R	B	N	P	N	n	N	K	Q	R	B	N	P	k	q	r	b	n	p	K	Q	R	B	N	P	N	n	N	K	Q	R	B	N	P	k	q	r	b	n	p	K	Q	R	B	N	P	N	n	N	E	e	E	E	e	E	NQ	NR	NB	nq	nr	nb													G	A	E	H	R	C	S	g	a	e	h	r	c	s			:ballet_shoes:	:one_piece_swimsuit:	:briefs:	:shorts:	:thong_sandal:				:drop_of_blood:	:adhesive_bandage:	:stethoscope:						:yo_yo:	:kite:	:parachute:	:boomerang:	:magic_wand:	:pinata:	:nesting_dolls:										:ringed_planet:	:chair:	:razor:	:axe:	:diya_lamp:	:banjo:	:military_helmet:	:accordion:	:long_drum:	:coin:	:carpentry_saw:	:screwdriver:	:ladder:	:hook:	:mirror:	:window:	:plunger:	:sewing_needle:	:knot:	:bucket:	:mouse_trap:	:toothbrush:	:headstone:	:placard:	:rock:								:fly:	:worm:	:beetle:	:cockroach:	:potted_plant:	:wood:	:feather:										:anatomical_heart:	:lungs:	:people_hugging:														:blueberries:	:bell_pepper:	:olive:	:flatbread:	:tamale:	:fondue:	:teapot:";

    case 507:
      return "#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	|	|	|	|	|	|	-	-	-	-	-	-	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#	#		#	#	#	#	#	#	X	X	/	\\	/	\\	X	X	X	X	X	X	X	X	X	X	X	X	X	X	X	-	^	v	>	<	<	<	>	v	^	[	]	#	]	#	#	#	X	>	>	>	?	+	+	+	+	+	^																																						0	1	2	3	4	5	6	7	8	9";

    case 512:
      return "He	Qi		Qie		Hai				Qiu	Cao			Shi						Si	Jue		Khang	Khenh				Yu		Kong				Tin	Zi				Xing	Ba	Cup		Kha	Khe						Mou	Dua	Re	Trut			Ji	Ye	Jun			Qian	Lu	Bui	Xuoi	Doi		Dua		Luon		Bik			Chu					Lin			Duoi			Sanh			Shi		Cha	Cui			Gom	Bui	Gom	Qie				4	Ga			Cung		Nham			Qi								Giua		Chan	Suot	Giua	Xuyen	Chuoi									Huan		Yi	Zuo	Jie		Jan				Ay			Zou			Zi									Zaap		Jin			Pai		Dui	Cong		Shen			Ben	Ben													Huang													Mai					Yin		Gun							Yang			Jiu	Ul						Ut					4	It						Chin		Shen			Tam	Ut								Ut			Jiu";

    case 513:
      return "Vu					Ye				Dong			Jue	Jie		Diao		Jue	Chui				Ling		Sing		Ting		Tho					5		Gen			Gop	Vai		Hai			Jo		Ya	Ban		Yi		Kep			Nham				Gieng	Lam	Nam	Vai		Wei			Jie										Yi	Mat	Mat		Mat		Mat					Die			Qi		Le								Xi								Bao					Xie		Quen						Zhang		Quen	Mat																Yong	Son			Xu									Die		Dan				Wei				Gua	Ding					Fan		Coi			Mo			Xi	Yan	Trum		Ni	Dan									Wu		Jan										Dan		Voi		Tao	Yu		Gong		Mou	Va	Bom	Kua	Chu																							Qu		Mo	Jau	Shi		Gan		Sheng		Jing			Hua	Top";

    case 514:
      return "	Tuo			Waan	Shou					Nie	Nhong	Jyu								Lap																Yun	Gua							Xiao	Lao			Dan	Suo				Mang	Yi		Te	Jau	Bi								Ta																					Luo				Sing	Vai	Nghi	Nay	Xien	Tray		Xi	Hun	Da			Ju		Du			An					Phuong			Jyu	Ding																				Mei			Ran		Ai	Yu			Jian		Qi					Ji	Ngai	Nguoi	Nho	Thay	Zung	Min	Fan	Vung		Zhou	Zhi	Zhong	Nao	Bing		Zhuan	Shu	Xun	Jue	Qian			Gua		Tu				Ying	Zhi							Kui	Syun	Jung						Chen																Lian	Ya					Guo	Miao	She	Yu		Si	Sou		Zhi	Mei	Mu	Qie		Fu			Ju	Bei		Bi			Suo			Qian	Ming	Chan			Sao	Ji";

    case 515:
      return "										Paa											Gong	Qiong				Rong				Sou	Sou	Yao					Wu	Nap	Na	Phia		Chou			Shuai	Zhe	Li	Gai	Sui	Zhan		Zhuang									Fu				Man		Ji	Dou	Mak	Lei	Caan																Hui			Jian	Yan	Zhi							Bay	But	Bom	Hen		Mei	Yao	Di	Yi		Gap		Bie			Qu	Yi		Yang				Zha				Sha	Jin	Gun	Git										Xum															Lai							Ging							Git	Cap	Bay	Lu	Chau	Dang		Jue		Qi			Yu	Vai	Ai	Zai	Sa	Se			Dun				Jie	Ke			Yue				Jian	Yao	Gon		Jyu								Xian		Xiao	Qiao				Yu	Qu				Bam	Ga	Xian	Luo		Guang	Ngai	Dung	Cheng	Chuang	Yi		Zheng		Zong	Dui		Zhai		Tho	Giong		Fung							Gaa			Fei";

    case 516:
      return "Yi	Meng				Nghe			Bian	Jie	Shu	Liao	Bi	Su				Di		Jing	Lou										Troi	Liu		Bei	Wen					Meng		Chan			Doi									Dao			Doi		Pin	Jian	Lin	Gui	Qi	Hong				Ji	Xie	Zheng	Chan		Trom	Thoi		Long					Yao	Chan				Ngua	Ngoi		Dian	Chong	Nei	Nei			Zhai	Bian		Chan	Nghe			Cau					Xiao		Nhau			Cu	Xin	Jing	Qian		Qing					Gu											Wu			Maau							Fu			Jyun	Jan										Yuan	Bing					Wan	Hang		Rang	Ro						Vac			Nhoc	Niao					Lian		Tin	Rao						Fan	Di	Truoc	Rang				Vang		Sang			Hui	Yi	Xian				Quanh	Ro			Mong		Lan	Fu		Xiong			Liang	Tao	Ji				Jie	Zha	Shi				Vao	Nhui	Qi	Bian	Lan	Lan	Lin								Zhi	Bi	Sheng	Lon	Vo	Tron	Sip	Sheng	Cyun	Qin";

    case 517:
      return "		Biao	Xi						Juan		Ji		Xi	Qin			Hai				Lun											Yue						Linh		Lian					Tam	Gom	Ban			Heng				Qi				Qian	Zheng	Mao					Cong			Na			Mou			Ting		Zong									Jiong	Zhao									Nian	Cheng			Qia			Yu	Jiao						Zhao						Di	Jiu				Sui			Yao				Wang			Liao		Tong		Meng		Xuong			You			Zeot					Si					Nap			Lou		Lieng		Yin					Bay	Chong			Mong			Gan	Jiu	Leo		Ngat	Day			Mat			Qin	Jiong		Xie					Mat	Rong			He	Jan			Tao		Qiu	Xie	Jing	Nian	Jing			Ji	M					Zeon			Tian		Cui	Die		Qing		Mui	Maang			Lun	Vang	Ping	Ping	Ce	Die	Lou		Wun				Quan	Tron			Lian	Han	Pang	Tang		Cong	Ret	Yi	Xuan	Suo	Liu	Shuang	Shen";

    case 518:
      return "	Bu	Sou	Dong		Qin	Shen		Chan	Hong	Nong	Ting	Jiang		Hui		Chan	Hei				Xi	Zhi			Lok	Mo			Lai	Li	Li	Huai		He	Jiao		Yan		Shu			Shi						Fung	Zhen		You							Suo	Wu						Chang	Cong			Sap	Ju								Shu						Jiu	Wei	Pang								Huo					Bay	Jie								Zao										Ou						Gua							Hao	Li	Zhi	Xian			Bu	Chang						Moc			Yun	He								Tao				Biao		Ra			Diao		Er	Jiu					Di	Yi	Kun		Zhe		Kuo	Zhou	Ju				Shan	Sha	Diao	Ban	Ji			Zhong			Yi		Kou	Wu				Ge	Ba	Cham		Gou			Xian	Gua	Liu	Chi	Guai	Chuan		Li	Cu	Shua							Bi		Dut	Chem	Bing	Li			Jiu	Tiao	Duo	Heng	Yan	Quan			Lie		Ke		Gen	Zhen		Fen";

    case 519:
      return "	Yi		Jiu	Xu	Jiao			Lu	Jiu		Chou			Xian	Deo	Kuai	Dui					Luo	Xi	Qin	Bu											Qia								Dan	Dam	Hui	Cao		Pi	Ya	Beng	Guo	Gua				Ju			Qia		Jue						Li			Bao									Hua	Jiao		Xe	Thai	Cun	Tach	Dut	Qia		Zha	Qia		Zhe	Cha	Ying			Yan		Chong				Chi		Wan	Me	Sou	Peng					Kan	Yuan						Gaai	Mo	Cham	Mo	Chou		Suo	Tu			Zhe	Ti		Wu		Da	Li	Cha											Rong	Gong	Que		Li		Thien			Tao	Cao	Chat	Got	Bam		Li			Mi		Chi			Gun	Lou	Chuang	Suo	Jiao	Jin				Fa	Zhai		Deo	Dut	Lan				Jin	Cui	Deo		Ceng	Zun		Zhao			Pie	Zhan	Xi	Yao	Fu	Chong						Cui				Gua												Ji	Thien	Hoat	Se	Zhan	Ling	Se	Ye						Ju		Vac				Tu		Gat	Rua	Ru	Ze	Huan";

    case 520:
      return "	Xian		Qian	Zhao					Bua	Cung	Can		Le	Kuo	Li	Rou	Tet			Du			Lie		Riu	Xe		Ying	Li			Du		Ling							Truoc	Wan		Cim	Chom		Die				Jiu		Li	Ku	Keng		Zhen							He		Bi		Pi						Hang				Ran	Sieng		Zhuo	Dui		Yi						Gang	Nhan	Ke	Yi	Mo		Chi	Can		Geng	Ke	Shi		Ran						Ling	Beng			Duan		Min			Juan	Nao	Zi		Khuot	Zong								Tang			Xia	Han					Lue	Qian				Nhoc		Mo	Ou	Hao				Zha	Juan	Cong		Vam	Giup	Giup	Li	Zha	You	Dian	Jue	Bei				Yao	Pie		Lu					Jin	Kai	Se	Yang	Jin				Ke									Ruon		Chan			Nian		Wan	Lu						Yun	Yao	Bao			Jun	Xuan		Zhou			Moc					Kui										Qu	Shao	Sun				Du		Kuai	Pao			Bit				Bao				Fu	Jiu";

    case 521:
      return "Ran				Ju		Cho				Qiong		Cho	Zhou	Hua	Bao						Yi	Me	Yi	Yi					Mao						Ci			Ruan	Thia		Bay	1	Ci			Han		Cong				Xi					Quan	Tiao		Diao		Han									Ye	Kham					E	Wei		Cang	Diao			Wui	E	Di		Suan	Quan			E	Ou	Xuan				Wu		Giau		Yi		Mou								Hu				Han					Au						Shi				Sa	Hwe				Bi		Han	Jing	Xi		Qin	Cuo	Ci		Ban					Dui					Xi											Zhi	Luan	Muoi	Hu	Ji	Guai			Gan			Pang	Nghin						Chuc	Ruoi	Lung				Xung	Zhu					Bi	Tron	Yu					Nhay	Nhu					Qi			He	Chu			Shao	Chi	Bo				Reng	You				Nai			Sai		Hui	Tiao	Ban					Xu				You	Chi										Heng";

    case 522:
      return "			Wai			Xie				Jue		Sui	Qing	Zhuan			Mong				Ji			Bi		Xi						Ji	Trung	Jun			Liao	You				Ngheo			Ju					Yue			Bang			Pi			Ze			Yi	Di			Qie		Suo		Ci		Zhu	Yue						Jiao	San				Shi	Me		Yi	Xia								Yuan					Guo		Ke			Cui	Yi				Cyun						Li		Dian			Xi					Bi			Bian	Mei	Li			Sou			Lim						Liu	Gui	Ke					Yi		Xi	Yin					Ke				She				Wo							Pi						Co		Yue	Hong	Rap		Li	Fu							Lou	Jue	Xian	Day	Day			Dian			Li	Ai		Rot				Tu					Jian			Bai	Di	Zhang						Yu					Dui		6			Can	Tu								Tan	Ji	Qi	Shan	Nian			3	Di";

    case 523:
      return "			Bo			Guan		Bi	Tranh		Xing		Zeon					Cut	Zhen		Bo	Bo			Sa		Mo		Fu			Mot		Tao	Bang	Yi						Biao		Xi		Jie								Jin								Qian										Si	Jing		Chi												Jing													Tro	Sui										Zha	Li				Zhuo					Bian						Tun				Bi			Fei				De		Zhu			Jeoi		Ju								Yi			Ya			Chi	Gua	Zhi							Reng	Aa		You		Bo		Ji	Pin			Ying	Yang	Mang	Ge	Ji						Long	N	Sa	Chuan		Ci	Wu	Ren	Duc	Jyu	Ri	Dai	Ji		Yi		Ran			Huo	Gua		Zhe	Pi			Za	Ban	Jie			Hou			Xian	Hui		Aa				Cai			Zha	Dai	Ge		Pi	Hin	Pian	Shi	Liang	Yue	Hu	Bian			Reng		Reng		Waan	Danh	Zi	Tuou	Luk";

    case 524:
      return "Dieu	Gay	Ngoen	Nham	Yi	Zhi		Jin	Weng	Chao		Qiu	Mut	Zhu		Zha	Po	An		He		Chu	Yan			Khen	Shi	Hu	E				Keoi													Meo					Eot	Phinh	Shi			Lo		Tuo	Dai	Wai	Po	Rong	Ju		Bo	Tam	Dat	Nip	Mieng	Quai	Dang	Hoet	The	Rin	Se	Ro	Nhai	Phom			Yu	Dou		Gui	Shou			Suo	Ni	Zhou	Long	Bing	Zun	Ye	Ran		Ling	Sa			Lei	E		Zhong	Ji			E				Zuo			Na	Yun			Vo	Ming	San				Haau														Xie	Zui	Shu	Diu	Fa	Ren		Bang	Han	Hong	Yi		Yi			Ke	Yi	Hui	Zheng			Gan	Thau	Hao	Dau	Huyt	Nho	Le	Nhung	Thuc	Tre						Jing			Ge			Nou	Qie		Die	Laam	Ji	Yi	Yi		Fu	Shuo	Shuo	Yong	Ken	Hua	Hong				He			He	Qian	Qia		Si	Ce	Bang	Uc	Loi	Bei	Keoi	Caau	Dap	Xac	Nhu	Thay	Cai			Fau	Jue										Hoi				Jing	Ke						Ai	Lou		Tu			Chuang	Lan		Song	Cheng		Wei";

    case 525:
      return "		Nu		Jiu			Bin		Ngoen	Ro	Phao	Nhanh	Nhan	Oc	Mang	Nuc	No	Renh	Day	Chieng	Miu	Voi	Do	Thon	Bo	Toac	Gung	Ke	Uong	Ban		Bieng	Xiao	Sheng	Hou	Vum	Ngoam	Zhu		Guan	Ji		Ji		Xi		She	Ou	Hu	Ta	Xiao		Zao			Bo	Qi	Wa	Tuo	Dao		Na								Daam	Keu	Mui	Hong		Net	Ji	Zaat	Gu	Xap	Mep								Mun		Ngan						Zhai			Ya			Wu	Zhen	De	He		Ang	Pi	Se	Fen	Gua		Ji		Po	Ming			Xuan	Han	Gang	Ba	Zong	Meng	Faat	Huo	Pe	Tham	Nhu	Sua	Ngoam	Ga	Treu	Moi	Vieng	Se	Bang	Pha	Ria	Can	Chum	Be	Phinh	Nghenh	U	Dat	Beo	Quai	Nhau	Wong	Suc	Sat	Bop	A	Kieng	Zai	Sua	Nhinh	Ep	Tre	Troi	Du	Mai	Suong	Kung	Meo	Dian	Xi			Da	Nang			Chut	Diao	Luo	Ke					Yi	Jue	He		Ji			He	Nie	Run	Qian	Dai	Shao	Ke	Zhu		Shi	Lu	Jia	Pian	Hou	Ji	Ta	Chou	Wo	Jing	Po	Zhai	Xin			Bian			Xu					Gu	Jie			Xian		Phao	Danh	Mieng																		E		Bo	Piao				Za";

    case 526:
      return "	Pai	Tu		Ying					Kak	Tap			Mei	Naa	Ge	Kam	Soek	Bou	Quat	Niu	Dan	Ling	Xua	Tuc	Song	Cau	Ten	Ten	Saap	Dum	Bai	Bi	Huc	Phuc	Hong	Giai	Ke	Khan	Khac	Lay	Ren	Vac	Tau	Xam		Xiang			Nuo	Ge	Bo	Xie				Zhen	Yu	Ni		Moi	Chia	Map		Xun	Wa		Ang	Han	Hong	Dan		Nuo		Cao	Ji	Neng	Yong	Xiao		Chua	Yao		Ge	Tang	Bao	Chan	Chat	Xu			Hai		Chou		Jian	Zuo				Wei	Da	Pi							Ko		Be	Bem	Khu	Chu	Git	Quan	Aan	Bing	Ngo	Kam	Lan	Maai	Zam	Ria	Cay	Chiu														Gwe				Huan		Xi		Pen	Liu	Mu	Mie	Lang	Tui	Ban			Ge		Ku	Lung		Jia	Bo		Chiu	Choi	Dieu	Ri	Trou	He	Leu	He	Bong	The	Vong	Xang	Hung	Chan	Ghe	Hat	Chac	Laap	Choac	Tim	Ri	Que	Cop	Xui	Suot	Chau	Ngoan	Do	Guong	Ngon	Han	Oang	Bep	Gian	Dai	On	Quat	Tuech	Bua		Huan		Zu	Luo		Ngoam	Thoi				Li	Zeot	He	Mo		Shui	Shen	Kang	Chi	Ling	Luo			Yan	Zhao	Chua	Gu	Qin		Tan	Fen	Tu					Ling			Lang	Mang		Hen	Zi	Tim	Aa	Bai	Dau	Moi";

    case 527:
      return "																					Paai	Lan	Zan	Wu					Li	A	Lue	Zhi	Chou	Jiang		Jian		Maan			Lun	Yi		Shang	But	Ngai	Ho	Kang	Loe	Nhoi	Can	Khoach	Danh	Nin	Thay	En	Gan	Dan	Ji	Biu	Mach	Song	Ran	Ngau	Xo	Dan	Zap	Tham	Thung	Nuot	Nat	Thin	Tham	Mon	Nac	Syut	Ram	Nhai	Ham	Ngo	Xia	Neng	Ngon	Thua	Thep	Giuc	Nhan	Hang	Nha	Chong	Oam	Yi	Nin	Hon			Hui		Zha	Kik		Han		Yin	Bi	An	Xia	Ni		De		Di	Jian	Pan			Yu	Chuai	Za		Cha		Zhe	Se		Pen	Gu	Zhe						Li	Dou		Chou		Zui	Po	He		She	Long		Nha	Treu	Thue	Doi	Qi					Ngoang							Shu	Rum	Jin	Ling	Bai		Kang	La		Xu	Jin	We	Chuan				Yue		Baang	Zaa	Ging	Vao	Seu	Nuot	Then	Giam	Cyut	Nhun	Nhap	Hang	Sao	Si	Xep	Moi	Ngau		Mai	Xie	Jiu	Ji		Yue				Jian		Han	Het	Sa	Hui	Qiao		Se	Zui		Nhip	Lu	Hua	Chu	Shan	Wo	Ji	Zhuo	Xian	Yi	Guo	Kui					Gaa	Saau	Soe	Wet	Am	Ngui	Sut	Nhao	Dat	Lem	Ngay	Khan	Choan	Nhao	Ngat	Nham						Ngoi";

    case 528:
      return "		Loi					Dong										Zhou			Lu		Bo	Shi	Ying	Ku				Nam	Zip		Bei	Nich	Tuong	Can	Du	Phao	On	Oai	Bo	Lok	Voi	Bam	Tui	Cau	Neu	Chuyen	Thoi	Hao	Goi	Quan	Ua	Khoac	Ngon	Ron		Zhi	Xie			Ye	E	Lu	Han	Ye					Luo	Chuo	Fan	Zhi	Ying	Wen	Wa	Ai	Yu	Am		Hua		Lie	Jing	Za				Khay	Hon	Non	Wo	Hang	Xao						Cac			Zang	Dui		Ji				Wo	Dyut	Ji	Xi		Zhan	Tuan	Gan	Zit	Doeng	Kwaat	Do	Ngon	Ziu	Pheu	Cha	Thot	So	Khao	Xong	Ngo	Hun	Pho	Mom	Reu	Mom	Buk	The	Yu		Xin	Eng	Loc	Lie		Ban	Zhi	Shi		Lao	Lai	Wei	Pao	Chi	Ying	Dou		Dou		Bao	Qie	Shu		Zhi						Lie	Ze	Peng		Zhe	Ngau	Rang	Ran	Dang	Ray	Troi	Lin	Nhanh		Khoan		Thom						Ou	E	Leng	Xie	Ji	Lai	Ying	Ceng	Bai	Kwaak	Gaa	Khe	Tron	Nhang	Chem	Phan	Doe	Dan	Thanh	Boc	Bo	Treu	Gung	Le	Mua	Nhom	Mut	Ren	Ngoi	Xac	Lun				Long	Xi		Laai		Lin			Gui										Xing	Ceoi	Ngung	Sek	Li	Ci	Chen	Gheo	Dang	Theo	Nho	Phac	Thot";

    case 529:
      return "La	Lum						Qing						Ruc	Gam	Ham	Ung	Jian	Dao	Jian	Qing	Xie	Ying									Ha		Zhe	She	Mi	Huan	Liem	Lom	Dang	Non	Khan	Toe	Khem	Hun	Thung	Ren	Jik	Tot	Cu	Ru	Sa	Huo	Yi		Di		Luan		Yi		Soe	Can				Bo	Pang	Tan	E	Zang	Cong	Laa	Dang	Bun	Hum	Gion	Nheo	Trom	Lai	Lanh	Ngong	Nhau	Zhai		Xi	Mang		La	Yun							Xang	E	Gam			Die		Nan	Them	Dem	Nguyen	Gheo	Hoai	Guan		On		Huan		Khuyen		Shi	Jian	Ngay		Zhan	Ji	Huan					Gwang	Nhau	Xon		Nhep	Wan	Luo	Wok	Sac				Keu	Sac		Dou		Nham				Lian	Trom	La	Hen	Giem	Gu				Giau					Nie	Nan	Jiu	Yue			Yao	Chuang				Can	Li	Dun	Nan	Nan						Ri					Yue			You		Yin		Guo				Dang									Zhen	Mi	Die			Zhen			Doe	Kua		Han	Song	He	Ji	Zhe				Bing		Wei	Tou		Tu			Gang	Lou	Quan	Hun	Zhuan	Que		Hong		Dang	He	Tai	Guai		Yu	Nhot	Ya			Wan";

    case 530:
      return "Qun					Jue	Ou		Chuong	Quan	Zhi			Ling	Wu	Xin	Da		Yuan	Yuan				Mo		You		Wan			Wu		Zhang	Chuong		Xuan			Rao	Gun	Yu	Chuong					Xia	Bian	You		Yin		Xuan	You	Lei				Tron		Ting			Zhen					Zai	Ga	La			Que					Ju	Ji	Chun	Da	Tun	Ai		Hon	Cong	Zi			Huang	Yi				Zhuang							Ngo			Bao	Chi			Ri							Lu			Jie	Shi		Zuan		Sing	Loc	Tum	Moc		Yi			Fen	Fen				Mo				Shu				Xi										Ao		Pi	Ping	Po	Jia	Zhou		Qiu				You	Tan	Juk		Rong		Mi			Tin	Chau	Cho	Sanh			Yi		Rong			Lie	Qiong				Ray	Nieu	Nen	Loi																				Coi		Hui	Ji					Gao				Kwai	Jin	Cat	Vach	You	Cha	De	Yin		Yu	Bei		Bo															Bit	Lo";

    case 531:
      return "Bet		Fan	Kok	Ce	Fat															Qiao						Cha		Xin		Chi		Day	Dia	Ham	Zao	Kui		Fei			Ta	Guai			Duo					Gui		Zhi		Baan				Mang			Dam		Genh													Chan	Nao			Hu		Tao						Che	Vung	Lam	Dum	Mun	Nui	Them	Xui		Yi	Go	Ben	Nie	Zhai	Huan		Du		Qi	Ce			Chui				Da			Zeon	Zhi	Geng				Weng														Du				Chi	Sai			An	Kuo		Wo				Ying		Pian	Bun	Laam	Coi	Trieng	Hang	Gieng	Mo	Ngoi	Chau	Me	Ngoi	Ngoi					Zha	Zhua	Thong	Su					Ni	Gung						Zhu	Chan			Beng	Ni	Zhi	Hui				Long	Joeng																		Xia		Zhi	Xi			Jiang	Dum	Hong	Luong	Ma	Xo	Ngach	Tret	Xay	Bui		Dui	Fu			Jiao	Chao	Bai						Lie							Ao	Dap	Gei";

    case 532:
      return "											Zao	Chu			Tuo			Hao	Kang	Yin		Xian	Hoc	Nut	Dat	Ngua			Fu	Bie		Kui				Qie	Sa									Ve	He																Da	Ye				Zhang		Liang		Dui					Lao	Xun				Gam	Chum	Kwan	Sam	Doi	Thoai	Zhi		Ku			Lan	Sui	Wo				Ku						Neo	Cat			Coi		Jian	Vuon	Con	Gom	Con	Den	Vong	Jiang					Zhui		Shuang	Yu			Sa		Yu	Lan						Yu		Qian	Ju		Lie			Shu	Xian			Gai	Mun	Dao										Tai					Tian			Ech	Cau	Ghe	Nieu	Suong	Meng		Di		Mian			Joeng					Chat			Hui			Bai	Dung	Loi	Vung	Am	Xep	Cho	Ghe	Duo		Duoi		Lie	Vai	San			Lai	Yin	Lan		Jiao		Huo						Doc	Chinh	Tho	Ranh	Chem	Guo		Chen	Zhan		Wan					Mi	Ngoi	Chum	Kui							Duo						Fan	Ray	Yin";

    case 533:
      return "			Nan				Lei						Chau				Lom	Nen		Lan	Gong	Ben					Ting	Yao		Wang					Jie					Xiu		Shu							Wei			Yu											Trau		Zhan								Ang						Sang	Chou		Kua				Ju	Hai											Mian					Hang			Chou				Ling		Zong					He		Hing											Kwai							Kun			Zhong		Zhao		Die	Gou	Yun	Dan	Nuo		Hing					Bing		Ran	Chan			Nhom	Rong	Yin	Chan			Zhi			Guai	Nuo	Shen			Su		Bon	Wo	Chi		Dem					Mie	Zhi	Sanh		Qi			Gou	Sai		Gom	Ve	Lou		Zi	Nhieu	Nhieu	Lam		Dang	Tum	Xian	Muong	Rou						Peng							Xi				Kua		Gui	Chun	Jie												Jie	Xi		Ku	Gioi	Gu	Zha	Fan			Xie";

    case 534:
      return "										Fan			Huan		Niao	Xi			Hau						Taai		Cu		Gun				Xi						Qia			Mang			Zhe	Mat	Lon	Juan				Bie										Zong		Bie					Quan						Xi			Jiao		Quan	Zhi	Tian	Kai					San			Zi						Gang		Jie			So	Muong			Bie		Dou	Zui							Canh	Nhon	Yan											Bi		Xon	Kech	Kuai		Yan	Wei		Huan		Hao		La			Gong	Fan		Meng			Lei		Di	Lon	Bing	Huan	Co		Wa	Jue	To	To				Hai		Chi					Ba	Jiu									Di	Maa	Zhang	Jyun	Da	Shi	Hao			Tong	Mat	Ji										Ye							Daan	Gai	Taai		Bi	Pi	Yao			Di	Can	Pin	Yue	Qie	Pi			Nua		Bing	Lai	Kaa													Tuo	Xie				Jau	Wing	Juk	Ye	Laai";

    case 535:
      return "Fan	Gua	Hu	Ru						Ran	Fou	Huang		Zat			Syu										Ru								Mao		Di	Dui	Hui	Xi	Xiu			Ran	Yi			Zhe		Ji	Gao	You		Pu					Hang	Saam	Wui							Bua					Chu	Cu	Zhe	Niao		Qie			Cha		Niao	Sui	Kep	Va	No	Kwan		Cha	Cheng	Yao	Du	Wang		Nian	Mi						Nou	Xi		Yao		Chan	Bou	Mou	Ji	Dai	Laai	Fan		Zi	Jyun																							Can										Vo	Di	Bong	Xie	Mie	Keng		Cu		Sheng	Pan	Hu		Ke	Xian		Hou	Qiong	Zong			Fu	Nai		Ni		Ku	Ci	Leoi	Ping	Gwai	Ping	Wun									Nen					Jyun				Fui						Ge				Hou		Ai		Shi				Sing	Jing	Bing	Goeng		Xiu	Cong	Jiao		Zha	Xiao	Lian	Qu			Shan	Xie		Gong	Mie	Chai		En				Dou		Go	Ngo		Ngong	Zi	Haa	Jan	Fui";

    case 536:
      return "						Kou				Tiao	Shi				Sang			Guan				Hao	Zhi	Yang	Tong	Bi		Mo		Fu	Zhu	Tong			Cuoi		Qiang			Tai	Gin	Mun			Syut												Zhi	Wing	Zou	Sou			Niao	Juan		Yang		Huang	Liu	Min	Cai	Beng	Mo	Chao				Lu	Shao	Bu	Zeng	Si		Zui	Yue	Zan	Luan							Seon			Ging	Cong	Guk	Gei	Qu	Doi	Di																Ling			Miao	Mei					Zhuan			Haan	Man	Wan			Dang		Yuan						Sau		Ju			Hui	Qi		Yun		Man		Mo		Jing	Co	Wo	Kwan	Jyu															Piao		Jin						Yao		No	Vo	Sui	Gam	Lung	Chi	Ni	Sou		Niu				Shu			Piao						Ban			Han	Ban	Soeng	Gaa	Mung	Caai							Yao		Nei					Mai	Cuoi		Shi		Yuan		Cai	Jie										Xie	Wai	Sen		Yan	Xiao";

    case 537:
      return "			Gaan	Haan	Can					Chua	Xie	Li		Fan		Coi	Coeng	Geoi	Moi	Moi	Haa		Zhu		Na		Zhuan	Ji		Kui	Gioi	Re		Luo					Bou				Qia											Wan					Lyun		Shu		Cheng		Yi			Zi		Hao		Jiao			Hui	Nhat	Xiao	Ci										Hou	Chau	Ga				Ji						Noi	Dua	Ni	Lai	Ni	Ti	Seon										Nit	Con	Ju		Ming				Me	Li		Zhong	Long	Xu	Chu	Qiong	Fu	So	Bin		Gu		Ji			Qi	Xi						Deng	Er	Mun					Shu	Tong	Xiao		Pi								Rot	Dan		Ji	Chat			Nhang					Xiao			Coi	Cong				Bin	Rong																	Mian					Mian		Shu	Xiao	Bao	Wa		Pao		Fu								Gai		Hu	Heng		Zhu	Guai				Gui					Giua	Coi						Dai			Bin	Huang";

    case 538:
      return "Cha				Xia	Ju		Yao					Giua										Fen	Zao				Feng							Ju	Yu				Tot		Hun				Cung					Jie	Xiong	Ning	Nai			Chu	Giu	Tru	Nou		Sheng		Yu			Huan	Geng	Wan	Gaa	Tuo	Qiao				Ling													Yin		Jia							Suo		Jie	Xi	Weng				Mang													Yang		Yao					Mang	Ou			An				Lou		Chua										E	Zi					E		An			Xum		Huo		Ceng						Cho										Xiong	Ji		Zuo		Qi					Zheng	Co					Ji	Qi	Juan	Ning													Rem															Se		Sao				He	Rong	Qin	Kin			Lan	Ju			Li						Shi	Lung		Ni	Xian	Fu			Ru";

    case 539:
      return "	Xiong	Gui		Ji		Meng	Fu	Xuong	Sai	Yu	Jiao	Meng	Long	Qiang		Mi			Yi		Long	Han	Ni	Lao	Seng			Lin		Yu							Nuo						Wu				Bian			Bian	Xuan		Jian		Tac	Bian				Gang						De		Cyun			Zhuan		Ban		Rong					Shuan					Cut			Jia			Hui	Mon		Zhan				Bai	Lie		Xie	Bun	Chut					Be	Jian	Shou		Xiu	Chut	Trut	Kao				Guan	Luan		Nhi	Nhon			Nou	Chang					Hoen	Nhe	Mon	Chut	Nho	Mon	Dep	May	Be	Chut	Liang				Ot	Choai	May			Hoan	Mo	Nai	Ru	Nit	Xiu		Zhi		May			Be	Be	Be	Cao		May	Be	Khi	Nhen	Mon	Nhon	Mon	Teo	Li		Tho	May		Chuong	Chuong	Hen	Nhon	Mong	Hen	Lan		Nhon	Nheo	Chan	Oat	Wang	Wong		Li			Wu	Pao	You		Gan				An	Xiu	Shui	Rui						Ban	You									Huo			Hui			Zuo	Xiao		Mian					Ga	Yuan		Bo	Chao	Tui		Bo						Ga		Tiao";

    case 540:
      return "Na					Hu	Nie					Hui	Lou		Ti	Ghenh	Qiao	Qiao	Zhong				Di				Lin			Quan	Zhuan		Lei		Xie			Ren			Dang		Du	Nian				Shi			Xian							Zhi				Ai	Ci	Pu		Shi				Qu	Shu	Dian		Xiao	Shui		Huan				Yi	Juan			Zhi		Tsubi						Zhao							Xu						Thuoc						Long	Tyun	Zhu		Suo			Go	Die	Gang		Qu		Ke	Hu	Ju		Qing								Ve					Bing								Ti		Jue			Qiu								Ke	Jiang	Va	Sang					Yun	Vai	Gwat	Mei	Pi		Qu												Mi			Ti	Ngoe	Xai	Kai	Cuoi	Bi		Qu								Va	Tiao		Chu	Ve						Ju		Xi	Cut	Cuoi	Rot	Lin				Do	Do	Do	Toi				Vo	Duoi			Chi	Ji		Cu			Cuoi	Lu	Cu	Cu		Li	Voi	Via			Noc	Jue";

    case 541:
      return "					Zhu	Lu			Vom					Nie						Quan														Nhon											Ya		E		Hu															Mang						Zi			Wu			Cha					Qin	Jie	Hong		Dan	En	Ze	Hu	Ang	Jie	Fu	Yong	Zong	Feng														Mu										Se	Cong			Cu	Kang					Nui	Dun	Yao	Ai	Bao		Po		Shi	Fan		Ju	Pi		Wei	Ku	Qie	Gan																	Kuang	Sui	Beng	Jia	Ya		Ngan		Kan	Nie		Xing		Xi		Lin	Duo		Chan		Gong				Pui														Shi		Dou	Dui		Jiang	Yu	Lu	En	Ci		Gu		Wei	Che	Huan	Bie			Han	Tui	Na	Qi		Tou	Yuan	Wang		Wu	Gao			Keng		Yi	Sing													Xiao	Jin	Gui	Ya	Sui	Song		Zhuo";

    case 542:
      return "		Tu	Xian				Deo	Ze	Li			Zhu		Jie	Voi		Ti			Xie	Qiong		Ya	Ju			Yin	Zhi		Kan	Zi		Ke		Nie	Qiang	Wan	Ze		Ju		Zi													Kei						Zik							Ya			Lin		Qi					Hui					Qi		Yang	Sui		Qi	Gui					Ghenh	Chom	Nghi	Ghenh	Qin	E		Zuo			Ze	Qi	Ji		Tuo	Die		Hui	Mao		Xu			Hou	Yan	Xiang	Cong	Hu			An		Bing					Qiang				Duo		Lei							Zhu	Die	You	Qi	Shi	Xun	You	Kan	Qiao			Qiang	Pen			Quan		Ying			Laam	Ngong	Din	Sha	Wai			Tao		Hong	Pi	Yao					Tu	Chai		Xia	Qi		Qiong			Jin											Zhen				Zhu		Xi		Weng	Zhong		Voi	Rang	Sui	Von	Chon	Ke	Kuo	Kang			Chao	Bi	Mo	Zhu	Han	Yu	Yi	Ma			Qi	Gun	Man	Liao	Lin	Zu	Lei	Hu	Chuang	Qi	Lei";

    case 543:
      return "	Chi		Po	Die			Mom	Chop		Lei				Yi	Gaan				Dian		Zeon	Dun	Gao	Hu		Xiao	Ga	Peng																Shen					Wei							Vot	Rung		Dui	Chao	Yin	Kuai	Ku		Zui	Gu			Yun	Zhi			Ji	Cheng												Xie	Xian				Zui	An	Hao			Po		Di	Ye				Nao			Fai	Non						Jie	Bang	Lan	Cang		Bi					Zhan	Qi		Lom				Nao			Lu		Kuang		Mo		Lei	Pao						Li	Ceng		Dang	Lei			E		Beng	Jue		Hei			Zam				Xuan	Nie		Hai			Doi	Doc	Lom	Xian		Jian	Mi	Nie			Ngoi						Cang	Song	Zeng	Yi				Chong		Cang	Ngong				Lei	Nuo	Li			Li	Luo				Tang			Nie	Nie		Ji		Lei		Nang			Lin	Ling			Xian	Yu		Zai	Quan	Lie						Yu	Huang										Nao		Xun		Ju	Huo";

    case 544:
      return "	Yi									Xi	Se	Jiao	Yong								Shi	Jing	Wan	Ye	Jiu			Gong					Hui				Vang	Sua	Tron	Sang		Er	Bang	Lon	Giau	Sam			To	Lon			Han							Fu				Fu	Zhuo	Ji			Seon				Seon	Xuc	Trang		Va		Bang		Trai	Qi	Shi		Diao	Pei	Xian	San					Chang	Yue		Gong		Wu		Fen			Chan		Nei	Jue		Zhao		Qian			Ao					Wang	Zhong	Phuon	Huang		Bu	Zhu	Bi	Chao	Zheng	Fu	Kou		Zuo	Xuan		Fu				Yao		Day	Bo	Du	Bei	Xie	Shi	Yi		Hong	Cui		Yi	Zhuan		Coek		Vua	Chi							Po				Yin								Tranh	Yuan					Jiong			Mao	Qian		Yi				Wu							Lei	Long	Bit	Vua			Bei	Huo	Cong	Kong					Ta		Han	Qian				Zhi						Se			Qian	Guo			Gun			Jian	Zhong	Mian	Gui	Shi	Mou	E	Ba	La				Zhou		Ji		Mei";

    case 545:
      return "Zao		Cho	Phoi	Zha	Yi		Gou			Gui	Ying	Shai	He	Bang	Mo	Meng			Wu	Dai			Jiong					Han	Bau		Tong	Kou	Li	Zhi	Hui	Zan		Diao	Cu		Dai	Lau					Man		Zhi		Kua		Xiang	Hua	Liao	Cui	Qiao	Jiao		Xu	Er		Tuo	Tan	Zhi			Vai	Quat	Manh		Nao	Mao	Di	Ceng			Jiao	Lian		Sha	Dan			Sui	Lian	Guo			Biao	Lung	Ci	Dian	Lu	Ni	Yan	Lan			Gai	Chu		Men		Bi	Zu	Hui	Chan	Lai	Xian	Fen	He			Lim						Yao	Zhan		Nei		Luo		Yuan	Rem	Neng							Ren												Phang			Nen				Ge		Jian	Ping	Lai	Nin		Bie		Nam	Jian	May	May	Bing	May	Tuoi		Nen		Mi	Hu				Diao		You	Yao	Beng		Chen	Ji		Yao				Si		Si				Guan	Yan	Doi												Chi		Sha	Yan	Yi	Yi	Che			Han	Huang		Khuya	Sen		Shui	Sui	Ren	Tan	Zhi		Fan	Feng					Tan	He	Mi	Pi	Bu	Na	Tian	Ba	Yi";

    case 546:
      return "		Yan		Tiao		Yao	Shen	Ke	Tong		Xuan								You		Bai	Chai		Roku	Xia	Lu	Kun	Zang	Qiu			Cu	Zui	Lou		Xia											Shen		Loi	Pu		Jing	Qiang	Yi		Nie	Dui		Jie	Sui	Zhan	Cou			Beng	Guan	She		Jin	Di											Dan		Nai		Nou		Ji	Yan		Nou		Du	Wei	Pian				Hu		Jia	Ye	Jun	Lan	La	Yin				Tui								Nao					Zu		Ngou	Kho	U	Ma	Si	Zhi			Hui	Zhui		Hui						Chu		Che		Vua	Xiu	Lan		Cong	Shen	Mo	Yi	Yao	Xi	Zui	Bing											Yu		Lu		Vom			Tui	Wei		Fen	Shen									Liao							Shu	Dan	Juan	Yu	Xin	Yao	Su										Huo		Qian						Ma			Kai			Day	Lu		You									Choi		Xian						Day					Wu		Yin	Xi			Zhai";

    case 547:
      return "Xie				Qu				Li		Rong		Rong	Qian	Nghit						Ling	Luan					Chan							Gwing				Cing	Zheng		Yan										Yin	Kui				Qu		Fu		Yu						Qi					Qi	Ji	Yuan						Gao	Juan		Qi		Gai		Quan					Wei													Zhi				Jian		Si			Yi	Qian									Yi		Li			Zang	Yi		Cai	Yi	Ge		Die		Zhi	Yi		Zai	Dai		Su		2				Jie	Chen	Qu		Han	Xian							Quan	Jie				Juan					Dan			Jin							Bing	Hu				Jue		Yu		Kap						Li	Qiang	Shui	Ku		Zhen					Fu	Shen		Wang	Ban	Chui			Tong		Yi		Yang			Tuo	Zhou	Ji		Giang	Ten	Cong	Cong	Xun		Shen	Xuan						Liu	Yuan	Hu	Zheng			Peng				Jue			Bat					Von";

    case 548:
      return "		Zhi	Pian	Yuan		Jian				Pang				Zhuan		Xian		Beng		Cong		Mo				Guo				Cheng	Qiao							Bi	King		Qiang		Zhou							Fan	Bie											Bo	Rong						Ding	Quan	Jiu	Yao											Xia			Zao							Dan		Wu	Tuo		Hu			Wai		Xi					Lai		Fei			Ji								Hu													Xian			Shan		Wing		Fei	Bay		Cuo	Coeng	Fu		Chu									Diu	Lan											Xi						Biao	Yu	Sui	Xi					Pou		Shan			Ji		Jiao		Yi	Gung		Wan	Ji		Wan	Tui		Faan		Ang	Liu	Tian	Chi				Ran		Sa	Yin	Pi	Ci	Tong	Yin			Ge	Tiao	Zheng	Zhou		Yi	Kua	Song				Di					Xie	Seon	Xiao	Guang	Tuo	Feng	Wu			Xiu										You";

    case 549:
      return "	Ling	Yan			Dong	Qi	Tao	Han		Chi	Song						Quan		Fung	Han							Hang				Rou	Qi	Kai	Yu	Cha	Cheng	Yu		Bing		Cong	Zhu		Yu				Mei	Jue	Liu	Sao	Yu																	Shuai						Yuan			Zhang		Hong	Shuai		Chu	Zhang	San	Xian		Cui	Meng	Di				Zhi	Ao							Xiu		Pian		Jiao	Kuan	Sa	Xian	Zha	Dian								Yi	San		Hui	Shan					Suot				Chong	Yi	Xie	Zhi	Tiao		Ping	Xian		Hang	Xian	Su		Cuan				Sau	Sau	Song				Hei		Xian		You		Yu			Tai		Jue	Nang		Dian		Yi	Bi		At	Gei		Nai		Xu	Yi	Ru		Gong			Yi			Zhi	Faan	Zhi	Xin		Ji		Xia		Ruon		Zhao	Ne	Xie				Yi					Yu			Nham				Tech						Thit											Fu		She		Yuan	Fan		Fu	Wu	Xi	Hong		Thoai	Sau	Ji	Chang		Lo	Te	Nguong	Mo";

    case 550:
      return "Pei			Mu	Qiu	Mao		Da		Xia	Shen	Te	Hong	Bi												Long		Cik	Si	Ni		Qiao								Ruan				Zing	Sa	Rung	Rap										Jiang	Cha	Mi			Yi		Suo		Wu	Xuan			Xi		Yi									Nao	Mai	Xiao	Wei	Lay	Ghiec													Hung						Cyun	Rui	Doi	Nhon	E	Tim	Kan			Long	Lu	Zhuang		De					Zhi		Xing	Mui	Geng	Jin	Xian	Ji	Cuo		Lao	Fen	Ju					Miao	Xia					Su					Ti		Ji																Zhi		Hu	Kou		Suo	Ni				Cay	Xon	Dan	Dai	Thoa	Gian	Long	Khuay	Teng	Zhu	Ngop	Men				Da		Qiu	Ya		Xian			Nei				Zhi	Bie				Chong	Lan	Dong	Qun	Xiang		Xiao	Wan	Ru	Wang	Ni		Bai	Ya						Si	Yin		Yu						Li	Huo					Mang	Zang	Ngo";

    case 551:
      return "															Mung			Leon		Zi			Bang				Jan	Ho	Suc	Luoi	Gong	Mung	Thiep	Be	Xi		Jiu			Xie	Qian	Nuo	Xing	Duo	Ji	Wu	Mu	Yan	Qi	Na	Chi	Hou		Sao		Nao			Cheng	Cheng	Kui		Jia	Tu	Hong	Du			Xia	Zhong	Huo	Chong	Da			Mao	Yao						Juan					Net	Vui	Ray	Khit	Danh																Shi			Yin				Gu	Wu	Fit			Guo	Ti		Hong						Fung	Buon	Hong	Cau	Eo	Ngan	Re		Yi		Tun				Qiong	Hai		Qi			Huo	Ti	Pi			Geng		Xie		Mi	Gao	Ta	Xiang		Shu			Fu						Zhuan	Liu							Jan	Fit																You					Cheng	Dui		Lik	Dua	Set	Chua	Hen	Nan	Te	Thoi	Nep	Tom	Net	Chac	Cham	Quen	Rieu			Nhong	Dat			Li	Yang	Li			Lu	Mu	Sui	Ai			Kou		Zhe	Ai	Teng		Lu	Tui	Bi				Nhuoc			Meng		Hui	Huan";

    case 552:
      return "			Geng	Sung	Thung	Thuong	Ho	Ban	Ngau							Ngo											Kuo		Xin				Sao		Gian	Dan	Gan	Hon	Mam	Man	Mo	Ngoay	Shu	Que	Ba	Tui	Lang			Fu	Bie		Tang		Xiang		Si	Bo		Mai	Dang		Gui	Hei	Xi	Dang	Yi		Bi		Gu	Cui	Se				Ge	Yu	Na		Li	Zhi													Mau	Ci																Zhao	Kok			Ji	Ruan				Chong						Nhon		Son	Jie		Ngung	Chieu	Then	Tui	Han	Nuc	Doi	Nhang	Chang	Zhe					Su	Yong			Qi	Zhuo			Kai		Ye		Qi														Gom	Jyu		Nguoi			Dep							Xiong				Khan			Ngay	Gung	Nghi	Tui	Quo	Nhac	Tuong	Ham	Nao	Yi	Chou				Tuan	Ai	Pin			Lie	Mian	Ai		Mo	Wei	Ying	Ni				Bo		Liu							Khuay												Rui		Chu		Dik	Ngo	Hung		Lu	Cha			Chu";

    case 553:
      return "	Sao	Li		Song		Li					Xi		Yan	Cuo		Liu								Meng		Zhan	Bo	Chanh	Cham	Hon	Chan	Len	Doi	Nhit	Ten	Zhuang		Dung	Miao		Li		Ju				Xie	Xie	Long	Long							Goe									Teng	Zhu		Cam	Lung	Chan	Lo	Nhang		Chan	Xian			Ying	Pei						Trai		Xie		Jiao				Chong		Sung		Ngan	Gion				Jyun			Nan	Wan								He			Ngung	Ngoi						Tun			Zong		Laan		Tho	Hong			Man		Jin		Qu	Dou	Qiu	Zai		Sheng	Zai	Ngo		Yi			3		Hua					Kan																	Yue	Ni	Si		Wo				Can		Jian		Mie	Shao		Rong	Gan					Qiang		Shu	Zhuo							Shi	Zhan	Ti					Zha	Zhan			Nen			Fen	Mie		Ze				Zhi	Qian	Han	Ge							Can		Guo	Jiao	Ta	Yong	Ao							Zha		Xi";

    case 554:
      return "	Xu	Wu	Mac												Jue	Ji		Chi		Wan		Mie	Zei					Jie	Shi		Xi		E				Hu	Hu		Li			Chu			Yi	Mao	Xu	Zhong		Yi		Ngo					Liao					Jian	Jian	Ju			Zhu				Wu	Cong	Quanh					Ke	Ke	Li	Bi	Ge		Xu	Sha	Ling	Ke			Cong	Ho		Bo	Bian	Shuan	Qi	Shan	Buong	Muon		Ji	Hat	Qiao		Triu			Thuon	Yi	Jue	Zhang		Xin					Tuo	Hai	Xia		Tuo	Yi	Day	Chop	Se	Nghi			Cu				Jiang	Nan			Peng		Jie	Xue	Hu				Ju				Vuc														You	Nu	Ye			Yin		Kong	Giam	Moc	Thay	Ngat	Vat	Nang	Vap			Xiao	Xiang					Nao		Zhang					Keo	Giat	That	Vun		Go		Deoi		Tha			Kam	Jie	Ngoay		Nu	Shan	Wing	Trot	Phach	So	Day	Xao	Ngoac	Trum	Rung	Quay	Say	Oan	Dung	Jia	Bac			Paak	Zhou	Rong			Lu	Sa	Nu	Wun	Bo	Zhe		Qin		Ci	Zu		Wo	Wu			Nie				Xian";

    case 555:
      return "Hong				Bung	Tem		Giu						Ye	Wun		Muc							Chui											Diu	Tay	Khuong	Giang	Lay	Nem	Nhu	Phiet		Ting	Jin	Doi	Vot			Jie	He	Tu	Zhe	Pin	Jin	Nan		Cay			Dun		Xi	Xie		Xi	Lao	Duan	Ji	Cha	Chou		Gang						Xiang	Dao		Thuoc						Lang					Xac	Nhan								Bian	Xiao	Xin			Hak	Ngon	Gan	Quao	Cay	Quet	Tro	Dan	Voi	Giau	Khuay	Nho	Vay	Vom	Tua	Lan	Dui	Xoi	Diu	Cham	Buong	Phay	So	Yu	Xian	Li	Qian			Mei		Qiao	Ya		Qia	Qiong		Bang	Zheng	Luk									Ze	Shuan			Sao											Co	Ron	Nho	Chut	Co																		Quay						Lu				Xie	Dik	Fu	Zhai		Ngaau	Be	Co	Quai	Bop	Va	Quat	Ngoi	Khep	Quay	Huo	Che	Nho	Sap	Buoc	Ven	Vo	Dut	Va	Roc	Sua		Ngang	Ngon	Lay	Xo	Niu	Ze		Duan		Deng	Yu		Lu	Sau	Wan	Xue	Jiao	Yue	Zhi	Wei		Ge	Ju		Yan	Cuo	Mao";

    case 556:
      return "						Fu	Ai			Xuan		Gang	An					Ji						Pi	Zhi			Nuo									Day	Ceon	Jau												Eo					Wo		Phu			Gap	Zung	Pan		Yi			Jie		Zi		Jia	Wai			Jia		Boi	Danh	Gieo	Waa	Me	Ray	Bon	Dap	Mo	Go	Ngan	Cai	Phung	Xoi	Day	Nhot	Dot	Chan		Suo	Suo	Ji	Song		Ti	Pi	Po						Mi	Lam					Ye		Qin	Jin			Jue			Yuan	Ruan										Kek												Ban							Tou		Run		Tia	Dom	Laa	Ro	Rung	Cau	Cham	Xuc	Gay	Hai	Kap	Mai	Mo	Tho	Phui	Sai	Thiep	Bin	Cau	Long		Wei	Zao	Qie	Sou	Lu				Die	Chuai	Bi	Zhu	Ma	Fei	Pie	Yin	Xuan		Ao	Zhuo	Zu	Keoi		Bi						Lang		Ti						Tiao	Jian		Saai		Dom	Tong	Muong					Dao														Luon										Duo	Dong";

    case 557:
      return "		Bian					Zap	Daat	Dua	Chop	Chong	Van	Dan	Thoat	Giam	Day	Dut	Paang	Mop	Phen	Ning	Khay	Dam	Xay	Lay	Nuc	Gay	Xau	Ngon	Nhung		Zhi		Fen				Kang	Zhi	Zhai	Bi	Kuan		Ban	Jue	Qu		Qi	Lei	Xie	Tang									Sou		Bei						Cou			Yang	Jian	Bam		Dua	Deoi							Paang	Suon																	Zao		Gaan	Vao	Doi	Phay	Nen	Don	Roi	Quet	May	Gop	Khoi	Ngang	Sum	Quay	Quo	Don	Cat	Xap	Moi	Cham	Chua	Vot	Ro			Zhuai		Van	Fan		She		Qiong		Po		Tie	Sha	Za			Niu	Niao	Guai	Cui		Zin							Ngung			Cui	Saau	Qiao	Chong	Die	Loe	Choang						Quay				Maan				Pin	Ci		Bang	Co	Bum	Mam	Dom	Bung	Ngoi	Am	Chia	Don	Giu	Nem	Xan	Niu	Giet	Tro	Chen							Yin		Vuc		Xian			Yi	Miao	Duan	Zhou		Kong									Zhang	Do	Ban										Deoi	Xo	Khenh	Ru	Hang	Khuynh	Quay	Vo	Liu		Zhi	Chan	Du	Yuan			Suo	Jie";

    case 558:
      return "Li	Gong											Bang	Zan										Guo	Liao	Shen	Bong	Deo	Lan	Dim	Dung	Kem	Khoac	Xia	Chen	Niao		Cuan	Wei		Tuo			Su		Long						Xiao	Yan	Bich	Cyut												Kwai	Qing		Choc	Gai	Mac	Rung	Nhoi	Xe		Chia	Xi		Yu		Zheng	Xie	Chai	Fen		Guo		Jing	Lan	Xian			Ling						Keo	Xau	Ep	Luom	Xo	Tum	Suong	Tom	Khit			Lei				Jun	Xiao					Cung				Za	Giam	Que	Lay	Mo	Phoc			Guan	Qie	Luo	Yao	Luan	Ta		Naan		Rap	Rap			Luo	Bung	Dim	Bau							Son	Trac	Uon	Ba	Chan		Zhuo			Luon							Tiao				Wan	Ling			Maan	Yu	Qi		Qi		Chia	Chia		Ji	Bo		Shi	Fu		Gui			Dian		Hao		Gai		Qi								Cheng	Hui			Xia	Shi	Zhi	Qi		Hai			Jiao	Li		Liao		Qiao				Sa		Qi	Shi			Jie	Hok						Bei	Bian	Ba	Jun	Pi			Dan			Tang";

    case 559:
      return "Kui	Ku		Kou						Shi	Shi	Ji	Bao				Ke	Kuang					Min			Liao	E	Ge				Wang	Duo			Qia	Hua		Hong			Peng		Jiao					Qu	Zi	Zhou	Kuang		Sha		Ji	Wei	Pu	Xue		Shao						Lang	Zhi	Ting			Da														Yang	Jin	Zhi		Ve	Zhuo		Za	Chan					Mao				Kong	Zhou	Hu	Peng				Jiu							Duk				Chuo	Min			Va		Xiao		Du	Wei		Can	Yu	Du	Kai	Pi			Cheng				Chun		Shao	Yan	Kuai		Yue																		Qi	Zheng		Ke	Qi	Zhi	Lu					Pi	Nuo	Pao							Fei					Wen			Meng						Shan				Xiong		Duo	Biao											You		Man		Liao			Xie	Luan	Qiao	Deng		Cheng	Cheng						Chuo											Ce				Tuom";

    case 560:
      return "Lei	Zhan	Li	Lian	Qun									Chen		Cheng	Gu		Zong	Chou	Chuan								Lei	Shuo	Lu	Va				Fu		Li		San				San				Sa				Nie			Zuan	Li				Shu			Fu						Geoi					Bi		Mei		Dao					Shi		Lon		Gan	Tan			Li		Man			Li			Bi				Pan		You					Jiu		Guo	Liao		Dong	Wo	Qia	Dou		Lie		Jiao		Lie		Fui	Dau			Tiao		Gia	Guo		Pang	Qiao		Di	Yun	Gao			Mun				Le				Si	Xin					Xin	Xiang	Luo						Beng	Tiao							Xiao		Dou					Dang	Ting	Zhuan		Kan				Ou	Kan	Wo				Zhu			Xin	Ruan			Zhuo	Dang				Cui				Zhuo						Cong	Chan		Hong			Yang						Vua	Vua			Yan										Khuong	Vuong	Yan		Zhen					Goc			Nuo	Yan";

    case 561:
      return "			Kei		Fang		Vuong	Hui	Yan	Yu			Ti	Fu	Ben		Yan	O	Hui			Vuong			Huang			Gui	Yan		Hu	Biao					Chech		Sui					Lech		Zi	Ji	E	Ji	Kui		Liang				Huo		Wei	Zhuo		Doek		Ting				Zai	You	Nay				Ren				Mian										Kia	Khuya	Khuya	Na			Tu		Dan		Jue			Xu	Di											Xiang					Tam	Luc	Xiong			You	Gua		Pui	Xi				Jyun						He					Ding		Phoi	Lu		Xu		Zhou	Xian	Huang	Cha	Shi	Gan	Nuo	An				Xie					Fong	Fong		Hao							Chang	Hang	Giay	Don	Qin	Geng	Shan	Fu								Ze			Bu							Dan	Hiu	Gwan	Bua												Dian	Shen		Zu			Buoi	Ranh	Gio	Sao	Kia	Kia	Bie				Chui	Zhe	Dai		Jiu	Wo	Qiong				Lin		Hun	Ji				Fong	Ceon	Man";

    case 562:
      return "					Cao					Mu			Die	Wei	Sik			Kia	Phoi	Dem	Mai	Bong	Ngay	Dem	Ray	Chang	Quat	Ngay	Cu	Hong		Bian	Ti	Tia	Ying		Tu										Jyu	Nau	Coeng	Mei	Min	Miu		Geng														Chi	Cou	Ti							Ui	Trua	Linh	Thoat		Huo	Qi	Sao	Sang	Xuan	Ang	Nai		Yang	Shu	Sha		Gou			Ting	Mai							Ya	Huang				Bin				Chech	Buoi	Choi	Rua	Hao	De	Kia	Gio			Ai		Ou	Cao		Ao		Mao						Gei	Hou	Se	Noi	Mo	Chop						Meng		Tian		Ngu					Sang	Xu	Kan								Lang				Luk	Seon	Luk									Bie	Cong			Xian				Bay	Chieu	Sao	Toi	Chieu	Rang	Tun		Nhoang	Doi		Yu	Dan	Ying		Zhao		Pu		Dip	Kwai						Hui		Hom	Lat	Com	Rao	Ai	Mo	Cai	Mung	Jing	Lan					Xom	Lat							Bao	Hang	Lie	Piao		Bo	Qiong			Bi		Mit	Gio	Som	Thua	Yong";

    case 563:
      return "Hei	Trua	Trua			Li	Trua			Khuya	Haa	Som	Rua	Nie		De			Doi	Huan	Tran			Yue			Chun	Tran	Li	Nang	Zhang	Ling	Chun							Ce	Xun				Ju	Hui							Ngoat	Quap	Cong			Vay	Xeo				Tong		Nguc	Vay	Goc	In		Veo	Ning	Ju			Het	Cui		Oam		Cha						Ngoeo	Zao	Cong				Yu				Ken							Kuang	Fei	Ji							Yun	Qian				Quan			Liang	Po		Pei						Dem			Thang	Geng	Yi	Luo				Me					Co		Kuan		Xuan	Nian		Chap				Hu	Ju			Trang	Xun			Chieu	Khuyu			Rang			Ye					Xi			Yue	Tang	Pin	Dun	Bei		Ot	Liao								Yong												Zi		Ya			Jiao	Hon		Kun		Zhen	Shu			Shi				You	Pai	Xiao	Ji	Tuan				Muk														Jan	Laam	Qi	He		Zoi	Kong				Dak	Then";

    case 564:
      return "Man		Ye	Chi	Truong	Nhum	Thot				Kao	Yue			Wa	Nian		Ci		Yi		Jing								Xop							Jiu							Yang	Li		Dai	Chong			Queo	Su	Say	Yi					Han					Yi		Chong	Hu	Zhua									Trat		Roi		Diu													Tuan									Qiong	Duo								Tou			Pui	Choi	Gian	Nhot	Re	Sim	Tong	Xian	Trong	Nen				Fu			Dian	Xi	Xie	Zhen	Qiao	Tu					Huo											He									Vay			Mang														Xoai	Sao	Cong	Tau	Cai		Han	Kuang	Suo		Shou	Tiao		Vong		Zhen			Nei		Qian	Yin		Liang	Sha	Zi	Pi	Gao			Jin	You		Shan		Mi	Ou		Hu				You		Meng								Jau	Phim																									Lau";

    case 565:
      return "																Zhi			Bi				Shen	Qi	Xian	Pan	Kang		Don	Cui	Bap	Can	Pha	Xoi	Ngoc	Su	Chanh	Nhai	Do	Kang	Bo		Shuan	Pi		Zai	Zhu	Zi	Sou	Jiong			Chan	Fan	Xiao	Yin	Hou	Mao	Tu	Gon	Ji				Yi		Yu	Jiong	Pao		Xiao		Gou			Gou	Sun	Xian	Zhuan		Co							Hay		Mau													Gaa					Noc						Gen												Chou						Qiao	Ti	Yun			Shan	Lie		Zhi				Pai					Peng	Chay	Chay	Hong	Mei	Ca	Chot	Wai	Se	Bi	Ghe	Suot	Trac	Trot	Ju	Lai			Soi	Zi		Qu	Gu	Jue	Zhi	Ang	Qin	Pi	Zui		Qian		Cuo		Ji	Ti	Ru		Hai	Xun		Bei	Zhi		Dun									Man	Dang	Me	Kei	Cyun	Fung	Reng	Chan	Cham	Chua																							Cha							Le	Gan	Syu		Gang	Ta		Tuo	Yang	Ku	Zhi	Ven		Son	Tu";

    case 566:
      return "Sau	Ca	Uoi	Cay	Thot		Nep		Son	Cum	Do		Choac				Li			Bay			Jian	Ni	Shen	Bang	Shuai	Dou		Qian	Han	Qia	Gan			Chun	Cha	Bi	Yi	Fu	E		Lao	Hao	Li					Te	Shen		Yin			Jian				Cha	Kai	Nau	Vai		Zap																							Nie	Cou	Cuk		Yi				Tang			Juan				Tri	Nhan	Be	Song	Mo	Sop	Lat	Giau	Chay	Rui	Chi	Gou			Jie	Zhe	Hu	Mang	Sot	Con	Mam	Zou	Si			Fei	Zi	Zi		Jie	Si		Chun	Pao				Ye	Di		Lei	Xu	Ru		Pa	Juan	Xi	Ye	An		Yi	Jian	Zhu		Song	Wo	Jam	Se	Zhi	Bi	Zhuan				Jiang	Hao		Chi	Dun			Guk	Trom												Hong																									Bo	Ji	Chua		Luo			Rui					Zoeng	May	Gu	Va	Khay	Trai	Be	Du	Chuom	Cheo	Then	Tu	Hu		Du	Sing	Rao		Dan			Han	Que	Sha	Zhan	Ze	Chuan	Qi	Die		Zha	Tou";

    case 567:
      return "	Ci	Sa	Jau	Luo			Ji				Mo											Dip										Hei		Luo	Qin				Qiong	Juan				Ai	Jian		Hyun	Lim	Son	Dun	Vong	Do	Heo	Ot	Sau	Vung	Ti	Wen	Nhu		Qiao	Chua	Jip	Can	Pai	Hun			Ai		Shuo	Lian	Dui		Ta	Jin	Bi	Yan	Gao	Piao	Yu	She			Jian		Hu			Lie		Bian	Su	Jiao								Ceoi																		Zhui					Han				Wing	Gioi	Khu	Cuoi	Chum		Dun			Son			Tho	Tram		Xie	Meng	Fu	Lu	Tan			Liu	Xian	Sang			Cou	Zhuang		Chen			Ze								Muc						Lian				Li		Sen					Buoi	Joeng	Dang	Trau		Peng	Tuo	Fun	Mong	Tuo		Liao	Xiao	Chui	Huai	Niao	Qian	Li			Pao	Tiao	Liu	Wu			San	Mo	Ji													Ying		Zha			Dui	Noc	Nhan	Ran	Ma	Mem		Yu	Kyo	Xian	Xuan	Shuan	Xi			Mei	Sen	Lian		Jiu	Lao";

    case 568:
      return "														Xiao	Zou		Bong	Tham	Pheo		Chua	Chua	Que	Gau		Liu		Zhao		Zhe		Lei									Tram				Duan			Gian	Tram	Re	Mem			Do	Jian	Shuan	Zuo	Qie		Lao	Ha												Yu	Yi	Ni			Cen					Tram		Yan		Ruan		Trai	Trai			Vui	Yan	Die	Mian				Nen			Lei		Wan						Bay	Na						Yan			Sieng	Lei			Sha	Hu			Xi	Xi		You	Han		Hai		Wa	Xu	Pi	Tan	Xi	Xi	Bin	Qin	Xi	Yu	Xi		Ci	Qian	Xia			Wa	E	You	Xing	Ni	Han	Bi	Sheng			Zhan	Dian	Yu		Ou		Gui	Wang	Qian	Yi			Zu		Qian	Ding	Keng		Chu	Yi		Loi	Han	Kuan													Dian	Xi	Zi	Ling	Zi		Yu	Hun		Si	Kan								An		You	Ji	Hun	Qia	Hou	Hou		Dian						Xie				She	Sha				Xie	Yao	Da		Xie	Chi	You	He	Sha					Tai";

    case 569:
      return "	Zhu		Ai				Que	Ze		La	Lou	Chuai		You								Ti		Shi									Xiao	Xi						Huo	Chi	Yi					Shu	Yue	Chan	E	Xi	Xi	Ying	Zu	Za			Za								Ta	Wan				Xin			Wang	Fu					Lu														Jian			Yan		Bi	Ken	Guan			Zi						Kui	Zhou	Zhi	Trai		Tu				Ta		Chu	Cheng	Cheng	Zhu		Da								Trai	Bi		Jia			Yi	Ngay	Thang	Yue	Gang			Gieng			Gan					Thang	Qiao				Chu	Chu	Bi				Gui			Gu	Bing	Yin	Zhui	Gu	Tuoi	Li	Trai					E	Dai						Can						Ti	Du	Yi				Die		Niu		Xue	Ne	Gui	Kao			Chuan				Zha	You		Bai	Shi	Dian	Pa	Qiu				Xue		Mo	Ke	You	Jiao	Bo					Xiu						Mi	Luo		Xue		Duo		Er	Shan		Kui	Nao	Mian	Li";

    case 570:
      return "Luan		Die		Qia	Lei		Mao		Heng	Che	Zhi		Gu	Cuo					Wu	Tao	Gia		Xi	Yao	Wei		Zu	Ma	Yu	Peng	Yi	Qin	Yue	Jue	Jiang	Xu	Beng		Giuoc			Luo	Zhui		Quan	Giam		Thac		Du	Xiang			Hui				Gu	Kao	Ti		Xing	Hun	Bian	Chet	Chet		Ke	Kao			Cuo							Lu		Zui	Zao	Jiao	Guan					Yan	Er		Qing			Deng	Si	Sui	Liao				Ngoeo	Shan		Bi	Wei	Ye		Zhai		Ye	Diao	Ai			Jiang			Su	Toi	Huai	Yu			Rang			Dian	Zuan	Ban		Qin			Jia		Pi			Tou				Chou					Gui											Ji							Jan	Xue		Dian			Bian	Zai	Tong							Shan		Gu	Que							Gu								Hu	Kuai			Gou		Su		Chou		Keng		Du	Den				Yi		Ai	Dao	Qiang						Long		Li		Li	Qing		Wei		Mou		Hou			Qi	Dung	Jiang	Xie			Van		Dai	Juk	Lou";

    case 571:
      return "		Guan				Pei			Pi		Juan		Bei	Jue	Juan	Shi					Xie			Rui	Jing	Po	San					Ji									Fen	Bei	Jie	Sa		Pi						Di	Mao	Ba	Ba	Tiao	Ling	Sheng	Zhen	Pi	Wu		Ze	Bao			Su				Lu															Hao	Dou	Fu	Ni	Bou	Bom		Ge			Ru	Xian			Bi										Mao	Ria	Mao		Rong	Qiu				Bo		Hao	Nao	Yan								Pao	Sui		Tuo	Ngu	Qu	Li	De		Jie	Jie	Gun	Jian	Bi																San	Bang	Chun				Nai	Bang			Rong	Jia	Sou				De														Xian	Zhan	Mao			Zi		Ji	Qi					Ru	Suo	Rong	Wu	Rong	Rong										Ta		Sou					Long		Men	Li			Cui	Zong	Men	Xi		Mang	Nie		Sui		Pei			Bi	Di	San		Qu	Qiao		Fen	Su";

    case 572:
      return "			Xu				Rong	Ji			Qu	Lie			Ngoi						Sao			Kun	Quam	Cui	Ye	Bing		Jie		Qu	Qu				Meng	Ran		Bin	Chao			Du							Long	Long	Long	Rang	Xian			Tao	Qu	Nie			Shu	Lu		Kun				Ho		Min	Min				Dan			Yin			Xiao				Ji					Yin	Dong						Kwan			Fen	Zhong				Gu	Hoi	Bum			Ram	Cha		Liu			Bu				Pa	Si	Dao	Zhen	Leo	Nhop	Shan		Chuai		Jiu						Ke	Chi		Ngut				Hu	Li	Sha			Pai	Wei	Wu	Zeoi	Jan	Sing	Ying				Ngot	Sha	Di			Dan	Seu											Tu	He	Po		Zhi	Niu	Ni		Nhem				Rong	Guai		Zhi			Ji			Ping	Zo	Sin	Si											Dong								Fan			Jie	Hai	Mo	Ngoi		Zhan		Xi		Deoi	Zi	Luoi		Xi	Piao	La		Ben		Jian										Doe	Pui	Taai	Jyu";

    case 573:
      return "																			Jian			Za			Du	Hup	Nhung	Thac		Ben	Mao			Zao	Zhuang		Kuang			Bi		Pai																		Mao	Tan			Lit																											Sau			Tun	Luo			Tan												Bung	Xoi	Lan	An	Bon		Ngam	Ngap	Xuoi	Han	Zhu		Duo	Duo	Gan		Gwai								Qiong		Wang		Mo	Zhe	Wen	Zhuang		Jie	Pao								Su					Ju			Qi	Can		Tuan	Sha		Tuo			Hua		Yi											Coi	Daam	Bing	Jin	Ji	Dik	Fan	Wan																																			Min	Zhong		Gong		Shuo				Yi	Wang	Ao		Be	Loi	Can	Nhom	Sua	Sua	Day	Veo		Su	Bien	Zi						Gui	Tuo";

    case 574:
      return "Hui			Xu	Zan		Zi	Bian		Da	Yin	Quan			Huai	Na	Za	Loeng	Ti						Yi	Tan	She	Shuo		Xing			You			Fen									Ciu	Juk	Jam	Jau	Jim	Jyun								Ping														Ke				Fu							Min	Day	Hoanh	Lut	To	Tran	Dai	O	Pi		Ji	Qiao	Zhong	Gan	Yuan	Chi				Qian		Zuo		Xie	Mao		Hu		Pi	Xun		Xia	Ti			Na	Chua										Wu								Ji	Lam	Gaa	Sin																																	Huang	Xue	Tao		Qiao			Jiao						Zin	Do	Dam	Dang	Bai	Nhua	Fung	Nuot	Cham	Set	Bui	So	Cat	Tuon	Xoi	Bong	Duoi				Dang	Kou		Ju	Sha	Jing			Mo	Nou	Ji	Shuo		Shu	Zhuang	Fu			Zang	Xie	Lang	Tong							Zhe			Can		Yue			Zhou						Wai	Soeng	Gin	Gei	Gun	Hou	Kenh	Nit";

    case 575:
      return "													Son													Tan				Yan	Lu	Yan						Ze	Shuai		Am	Bot	Cha	Denh	Doi	Thia	Vui	Lung	Ngau	Doi	Xop	Nhang	Lei	Van	Lot	Nhot	Don	Mem		Tran	Lang	Leo		Ngau	Zung				Guo	Zhu		Ru	Ru	Zeon		Kan	Ji	Gao				Xie			Ou	Jian				Zhi	Zha		Hong		Kuan		Bo			Se	An	Jian		Teng			Song		Meng	Yin	Tan	Guo			Ruan	Wei			Si								Cing	Wui	Kei	Gaai	Ngot										Lian		Kei																					Qi		Zhang														Buk	Choet	Doi	Kiu	Dia	Giat	Khoi	Cha	Vuot	Xoi	Bui	Oi	Pou			Ngau		Dong	Fu	Shen	Su	Yi	Lian		He		Zhen		Ze		Cui	Cui										Feng	Li	Kou				Xiao	You							Dip	Wui	Ji	Kwai	Sam	Zeon";

    case 576:
      return "			Hao						Han	Ken					Thia	Day	Ling	Nho	Loc	Am	Ray	Ngoi	Rua	Vung	O	Luon	Lay	Tanh	Yu	Chua					Huan	Suo		La		Dou	Jian	Po	Bian					Xue		Bian					Wei		Zeon	Gaa	Sam	Luk	Ji																						Dao	Khoi	Lat	Loa	Min	Trong	Bot		Chua					Dao	Dan	Jie	Bai		Nian	Xian	Se		Giot	Hua	Chua			Ou	Lie	Di	Cai		Zha		Lu				Huo			Li	Ying		Wei	Bi	Guo		Pi		Zing	Biao					Ziu	Kit	Lin				Lung															Yan				Zhuan			Bong	Mo	Rua	Dan	Phun	Loi	Toe				Re	Hong				Lin	E		Yin	Lan		Yao			Xuan	Li									Lik																		Beu	Leo	Rach	Muong	Ung	Noi	Wing	Lom		Nhao	Rem		Thuot	Lan	Ling	Xi	Hong	Wun	Jiao	Zhuo				Zhi			Bo	Teng	An			Xun	Lei	Zang	Hui";

    case 577:
      return "				Gau							Tong	Giet	Ruou	Xi	Hong		Fan	Jian	Cong	Za		Ca		You	Siu		Dui	Pan									Ta		Pan				Fan	Xi	Re	Nhieu	Trong	Nhan	Dan	Can				Yao	Luo			Bian		Jin	Li		Lik	Jing				Lim					Rang	Yan	Dou			Man		Gong	Rang	Can			Cau	Pan	Jing					Piu			Lou		Hou		Men				Xon										Gu	Shuan				Bien	Ling	Yan	Bi	Jam						Biao	Cheng	Kui		Huo				Nay					Chi		Wo		Cou	Zhi							Shui			Gua	Pu	Xu	Si		Wu	Lun	Saap	Jung	Wan							Mou		Fu		Shi			Hui	Huang	Pa		Loa	Tom	Nha	Hong	Thep	Zhu		Yi					Li	Shan						Bung		Kho	Seot															Min		Ge		Hu		Baak	Xen	Xao	Lap	Mo	Say	Phoi	Tat	Chin			Long	Bep	En	Fa		Nhum	Xu	Yi								Ngon		Ying";

    case 578:
      return "																				Chi					Yi		Gong	Chay	Nghe	Lui	Nhu	Sot	Ngut			Hong	Di	Hui	He		Zha	Cho												Yun	Xian																				Zing	Xian	Lao	Shao	Shi	Zhuo		Giai	Tro	Tac	Tro	Ce	Heo	Ngun	Fan	Soi	Toa	Rang				Chuom				Bie	Jiu	Wo	Jiao	Fu		Xiang	Kai											Aau	Jin	Geoi												Kei														Luk	Ai		Coi											Roi	Bong	Ngoi	Tro	Nhem	Ling	Phong	Ruc	Vac	Rom	Ro	Phoi	Phoi	Lom			Ben		Nao		Huo	Ji	La					Fou	Shan	Liao	Mie	Che		Joeng	Mo							Jyun	Ping					Lou																									Duo			Nao		Ji	Hei		Zhu	Hun				Dai	Ranh	Nau	Khet	Kho	Zing	Phoi	Kho	Choi	Um	Dot";

    case 579:
      return "Kip		Su	Duo	Cha	Nhang		Jiong			Zai	Hui	Ying	Hu	Lin	Weng	Han				Nan						Wui									Rat																	Git			Xi		Gan					He	Ji	Xiang	Sha		Hay	To	Ret	Ngot	Nau	Hei	Ngun	To	Huc	Thieng				Tui	Chong	Zhao	Shu		You	Jian						Zao				Jit		Jim	Kwan	Zhang	Heoi																	Loa							Ruo							Yan							Cui	Tong	Quac	Mo	Nong	Nuc	Mom	Phap	Thieng	Rang	Tat	Hong	Ji	Shang			Ram	Long	An						E	Lao	Tan		Zhu						Lin		Zeng		Juan	Hu								Zaan	Xiao		Gun				Hei																						Shen	Huo				Kui						Nhoi	To	Ho	Thui	Khet	Thap	Se	Fan	Lou	Buot	Rang					Chu	Zhou				Ao		Zhuo					Xing		Mie";

    case 580:
      return "Hu				Zin															Khe	Tan					Bi	Ham	Nau	Ngoi	Soi			Luoc	Khoi		Ding						Kai		Biao					Huo	Lie	Cuan			Gaa	Hou													Xian	Re				Chang	Ro				Hung						Yue		Xun		Liao			Jing	Fan				Ro				Sha			Shi				Xie	Bung	Loe	Loi	Mo	Sem				Xiao				Ye	Lan	Yi						Lian								San	Jin												Bo	Cao			Duoc	Chin	Nung	Nau		Yao		Nhui	Do		Lom				Lian												Chon		Thap					Bat		Ta	Fong										Ram	Quang							Zaan			Ji		Lo	Xi	Zhi	Lyun				Xi	Diu		Yue					Nen		Xian		Zhuo			Ben						Zhang						Zu		Na			Vau				Dao	Lie";

    case 581:
      return "Na					Dit				Pao		Ju											Luo			Shua	Shang	Su		Luo		Fen		Wai		Bao					Li			Xiong				Vuot							Dang	Danh				Mong		Mong	Mong		Cheng				Zhang			Sou			Shen								Ge		Cha				Yu		Hui	Che		Jiao	Zhu	Shu			Xiao				Ning				Pan			Jiang		Jiang								Diao	Zong					Qiang	Qiu		Feng						Zhan	Ke											Die	Ze			Guang	Se	Fen			Jiang		Yan	Zhi			Riu	Li				Ling				Yi		Qu	Pan	Gou		Jia	He		Peng		Ju	Banh	Che	Chua	Lop	Lie	Shi	Po	Xiang		Pi	Luo	Cu		Yu			Mui	Kong	Xie					Wan	Yan	Pei				Cheng			Manh		Ti	Che	Bi	Lian	Jia		Ting				Ti		Cong				Die		Shu	Li	Lu	Xia		Cui			Tam	Bo	Tui	Pu		Lin	Fen	Phuon	Bo	Chan			Dang	Tai";

    case 582:
      return "Dao	Mong	Mong	Li		Ya	Ya	Zhan			Yi	Nga	Qi							Nanh	Hu		Ting		Kou			Chun	You	Fen		Nuo	Tian	Jin	Pi	Chen	Pi		Jie	Gui			Daan								Zhuang			Hu	Chou	Shu	Tao	Pi	Rong	Rong		Hou	Peng							Bai		Xia				Qin	Ni		Tao	Qu			Xie		Zhao	Hua	Xin		Shou			Tu		Liang	Bi	Chu		Xing		Xin	Fu	Hak				Jie				Fu	Ngau	Lao	Te	She			Chao	Chui							Ran	Hou	Beng		Cai					Mu	Be	Nghe		Xu	Die			Chan	Yu	Zhong				Li	Shou			Syun			Du		Mao	Huang		Tao		Du	Ti	Sheng	Mei		Co	Sao	Zhen	Qin	Pi	Tang	Cang	Yao		Xiu	Bang	Gu				Bu							Gou	Bo				Wen			Ji			Chan			La			Cui	Min	Cu	Ou	Yong			Maan		Mao	Ke	Mang	Ding	Huan	Duo	Jiang	Su	Nghe		Trau		Ceng	Ta		Huang	Jue	Xun			Xiong		Mi	Qun	Lao			Zhi	Wei					Se				Zang";

    case 583:
      return "	An	Wei		Huai		Lung	Zhan		Ying	Ge	Hui		Quan						Lie	Ju	Ba	Lei		Man	Ling			Li	Ji			Nai	Hui	Xin	Shi	Zhe	Ji		Bo				Cha	San	Tu		Cha	Jing	Ba	Bei			Yan		Hu		Yu		Bi	Chuan		Ji				Mu		Mao	Zhong		Ye	Dou	Ye		Van		Ri	Yin		Hao	Muop	Na	Tie	Fu	Mu	Zai		Hu		Chen	Tuo			Chu	Fu			Ze					Bao				Nhim	Di	Cai	Lu	Po	Da	Ye		Yi				Xiang	Bi	Zhu		Yi		Lu		Kuang			Zhi	Hui				Wa	Di	Shu	Lie	Zao	Zhi	Nao		Si	Chon	Hoi	Ngong	San	Thac	Tay	Loi	Chai	Se		Xiao	Zang			Yu	Dou	Cha	Xie	Yang		Xian	Bao	Moi	Khon	Bo	Ro	Ro	Rai			Zhai		Qiu		Hu	Zai	Jue		Han				Cao	Hum	Lon	Muong		An	Zao		Doc	Sha		Xian	Chi	Yan		An				Zhe	Jue			Li		Le			Cai		Lu		Jia	Tho		Xia	Xiao	Yan	Xu		Dun	Ying	Hui	Ti	Nou	Xi			Tu													Wai	Chen				Hong		Ti	Xuan";

    case 584:
      return "Za		Duoi	Kenh	Ga	Voi	Uoi	Ge				Lou	Chai	Pan	Ji		Ta	Lau	Si	Xi			Xiao		Sao	Jia	Su	Huang		Cuo		Ta	Shuai			Hau	Hoang						Fu	Li		She		Tang	Gau	Uoi	Khai	Khi	Vuon		Dian	Se		Rai	Bi		Gou	Cu		Qian		Man	Lei	Su			Zong	Hao					Muong			Chi	Cao			Wo	Xiao	Lie	Yan				Khai	Nanh		Bi		Huan		Xi	Chi	Xu	Nao	Yan		Xie	Zha		Sui		Xi	Beng	Ran	Shuo	Ban	Gui	Kai	Chen			Xu								E	Li	Xi	Huan	Su		Chang			Vuot	San		Lu	Yan			Dang	Dan	Yang		Zhai	Ju	Nhen	Duo	Sao	Lai	Su							Ze				Bi	Bam	Vuon	Yin		Hao		Lie	Ngao	Duoi	Hao	Yang						Shuo	Ai	Qiong			Lei	Xie		Shi	Nhat	Nhim	Soi				Lu	Beo	Que	Lian						Xiao		Ying			Xie							Ling	You	Nhim				Dang	Lan	Xiao	Doc							Yi	Juk			Wu		Yi	Tuo	Bu	Ji	Xin	Cin		Si	Jin		Ba	Fa		Mo	Ruo			Hoi";

    case 585:
      return "Tyun	Fong									Da	Ji	Jung				Su	Qiong	Ba				Fat	Lei		Jai													Tian	You		Tuo		Wai	You		Dong	Wing	Vua	Xi	Kong	Ji	Gok		Qiong	Dui	Duo		Yi				Jin	Baak	Do	Ming	Jik	Ngon														Vong	Xi	Qin	Su			Liu		Wan									Kok	Hak										Che	Zhu		Mao				Zi	Gaap	Laa	Quan				Jin		Yu		Yi	Mi		Gok	Lai	Zhi				Fan	Hyun	Daap	Bing	Ji	Pui	Leon	Cung					Gyun																Ni		Ban	Zi		Ngok	Dong	Ling	Lim	Cing	Zhi									Jin	Bou	Zing	Kei	Loeng										Ping											Cau					Yi			Ling	Yu	Cong	Di	Zhi		Mei	Ting	Ruan			Jian		Paak				Wan		Jin	Wun	Pang									Haa	Zin	Hei	Ci		Ting";

    case 586:
      return "	Jin												Lu	Qu		Xi	Da	Jan	Caa		Lak	Hu	Luo		Le								Long	Taan	Gau	Zan	Gei	Ji	Piu	Man	Sau	Caan												Gong					Ling			Kwan				Lao		Zhuan	Syun					Jiu				Gaan	Cing	Si	Hoi												Kiu								Seon	Git	Daan	Zao	Hao	Xiang			Hao	Li			Dian	Ge					Syun	Kwai	Bik	Ji			Huan							E		Xia				Cuom	Jian	Qi	Xia	You					Syun	Gun	Mou	Fai											Zheng			Wing	Ling	Ji	Fung			Zhuan				Chan			Sau	Lai	Wai							Sam	Syun	Lin				Syun							Jin		Xie	Ling							Haa				Nao								Ji	Tian	Lai			Lou	Yan				Hao	Xin	Ling		Ban	Beng					Gou	Ling			Kuo	Qia	Jiao		En	Yao	Du				Dua";

    case 587:
      return "Dua	Huo	Du	Pei					Hau				Yuan			Lou	Xing			Lian	Yao	Xi	Yao		Xi			Lu		Yan			Quan					Rang	Wa	Zu	Fan	Yi	Du	Sui		Pi		Han		Xu	Ngoi	Gong		Di		Na	Sanh						Duo	Wa			Nie						Diao	Huang			Ti	Fan				Wu	Ang		Ping					Han	Gao	Gang	Li		Dun	Fu	Na		Cei					Jie		Qing		Ying	Xiang		Cung			Hu			Su	Am	Hong	Chau	Binh			Ge	E	Xu						Ang	Gach		Xi				Kang	Guo	Jie	Chuan	Lei	Heng	Zun	Be	Hu			Pie		Lo	Deng	Xi	Lei		Shan		Ngoi	Ngoi	Muong					Au		Lu	Lung	Dui	Jun			Chan		Xie	Wa	Zhe		Zhuan				Liu	Lei				Dai	Gan	Ngot	Ngot					Shi		Ngon	Yan			Che		Gan				Yan	Lam					Sui				Zhong		Shi					Sheng				Chan			Song	Song				Sanh			De	Ga				Jing	Cu	Huang	Yin		Sieng	Meng				De";

    case 588:
      return "	Cu	Rang			Xiang			Bei	Jung			Chuan					Pu								Ke	La			Quan		Hang	Chi	Mang					Zha				Fen		Chao							Jing																Lie		Na	Na	Tong				Ran	Zu	Pi	You		Shu											Lie	Shou	Tuan		Gao	Shao	Tuo		Nan				Tuo	Gong	Diao											Meng	Bang		Xie	Si	Ting	Gui			Fu	Gui				Duoi							Gui			Ruong					Zhu		Lai		Lun	Tian	Ran			Dong				Jyu	Cing									Juan	Yan			Ruan	Dan			Mao						Luan		Xu		Xi		Dai						Ma	Qi	Boi	Cha	Trai	Trai	Shang	Han	Ping				Ji					Li		Yu	Ban		Teng	Jyun				Chou			Chou		Trong		Qi	Xi	Bei	La	Roc		Ye			Guang		Zhu	Ve	Ruong		Lei	Lei	Cha		Boi	Boi					Ruong";

    case 589:
      return "Guang						Cau							Die		La				Ya					Nie	Shu		Zhi				Zhi			Zhi	Pi		Jiu	Jiu	Yi	You		Jiu		Dau	Bot		Huan		Du				Nhuc	Soi					Tao	Qie	Qin	Xin	Chan	Ji		Qin								Du	Zhi			Ou		Wu		Wen			Kho	Vet		Bi		To	Bei		Mu	Jin	Tao	Liao					Cao	Zha				Seo		Chi	Ya	Kui	Yin				Bon	Say		Si		Long	Qia	Dai	Hang	Shang	Hai	Cha		Jiao	Lao			Nham				Xi		Guai	Bo			Chau	Choang	Chon	Nhan	Ben	Zhi		Tun	Fu		Hu		Nie	Yi	Zhuang				Cha				Suan			Yun							Du		Xi	Chuan	Xing	Jiao	Shen				Naa	Guoc	Xoai	Nghen	Mang	Mut	Lan	Hau	Wang	Bei	Fei	Jian	Quan	Yi	Dong	Xu	Na	Ji			Zhen	Qi	Dui	Yin		Jiu	Pi	Xin	Lun	Cai	Ling	Bie	Dao	De						La		Xi	Ju		Xiao		Jing				Mang	Cek		Diec	Vang	Loet	Bung	Mon	San	Nhom	E	Pho	Buou			Wai		Nao	Xiang	Que	Qie	Tu";

    case 590:
      return "Xu	Hui				Min	Wei		You	Tui	Dai				Ke	Na		Fu	Yu	Zhi		Han	Ai	Fu										Yang			Shi		Chan	Hoen	Xiu		Chi	Yun	Shuai	Ro	Su	Sang		E	Zheng	Ai	Suo	Bu		Qun	Yi	Yan		Na	Wu											Li	Li		Xi	Jue	Shi		Ya		Lit	Rom	Khu	Quan	Bang	Uon	Hen	Ong	Nhoc	Choc	Nhuc	Chen	Ying	Bi	Che			Zha	Tuo	Hu	Teng	Ying	Bi	Ning	Lian	Xin	Yu								Bei		Mo	Dui		Dao	Qi		Kai		Buou	Not	Hui	Ngo	Shuai			Xiao	Zhong	Zhui		Bian		Wei	Xi		Deng		Xie	Pan	Nie			Bie	She	Fei	Min	Qi														Daap		Zang			Shan	Suo		Buot	Gua	Mun	Khom	Nhen	Son	Te	Buou	Om	Ngua	Ji			Dan	Juan	Lu		Ao				Yi	Shu	Sui	Wei	Wan	Chu			Tui		Wo		Cum	Hui	Hom	Rem	Toi	Gay	Ngua		Bi		Yin	Huo			Kai	Ning					Ai		Li		Zhai				Nho	Nhoi	Thuot	Ngua				Lu		Luoi			Bian	Pan				Met	Ro	Xai	Ran	Gui";

    case 591:
      return "Su	Meng	Xian	Long		Qi						Chan	Yi	Hang	Mak	Lian	Guan		Wei	Rom	Ngom	Nhuc		Jue	Lei	Luan	Li		Pi		Gay				Huan												Gui					Ju			Deng		Dang		Fei						Treo	Zhi		Mei		Huan				Pa	Bi		Po							Er		Huan		Nguoi					Mui							Chang		Luo	Fou									Chou		Zu	Nan	Xiao	Heu	Phau	Via		Trang	Bai	Lu		Luo			Nian	Ze		Jyun		Zhu	Hu	Dau		Hui	Tang	Chou							Huang	Dou	Tram	Vang			Wong			Jit	Miao		Bo		Ho	Di		Deng	Pu		Song	Chou			Bik		Yao	Meng	Long		Mon	Nguoi	Nhenh	Lian			Bie		Phech	Faa		Lu					Se	Zuo		Saai		Cun	Ling	Zheng	Pi	Bao			Que		Vo	Pi	Nan	Pi	Bo	Bei	Fa		Min	Mo	Wa	Zhao	Zhi	Cu					Xun	Ji	Gui		Cheng	Be		Da	Han	Xiao	Que	Zaap	Chuo		Fu			Trong	Bit	Fu	Qin	Lu	Que	Dian	Qian					Chang	Ta	Bei";

    case 592:
      return "	Du	Beng	Hou					Zha	Zha			Giay		Que	Ma	Han			Liu	Lu		Zi		Pi	Zhou		Zao		Niu			Hui			Xue		La					Ung	Nou	Yan	Ran	Nao		La	Guang	Du	Mo		Lu				Jian	Xie	Qi			Xiang			Guo	Jie	Mang			Xia	Kui							Yong		Hai	Mi	Yao			Wen										Li	Juan	Wu	Qiao												Diao	Chu			Suo			Chong		Vim	Quan	She								Jim	Meng	Ju						Trom		Tu							Nong	Mo						Fen				Am					Ao	Guo	Hu	Can	Dun	Hai	Jiao								Gu					Jin			Yang								Cha												Hui					Mam			Qu	Ke					Mam	Mam			Het	Qing	Yi			Kai	Jiao			Chou	Bu	Gen	Jiao	Zhi			Wen		Bin	Nhap			Xiong	Fan			Yi	Chuan	Yao			Yang	Du	Yan";

    case 593:
      return "	Meng						Chi	Mu	Jiao		Nu		Guo	Xue			Fu	Xue	Fu	Pei	Mo	Xi	Wo	Shan			Xi	Qi	Mian									Dan		Chou			Gap	Ngu	Ngo	Nham	Ngom	Nhon	Fei	Mie		Xue	Xu	Si	Ju	Mao	Bao		Yi	Gua	Ni		Yi		Zuo		Nhon	Nu				Laap									Dian	Fan	Yi	Shi			Cu	Zhen						Shi	Jiao	Hou	Er					Lei	Xue	Geng		Shou		Juan						Chau		Jie	Wei		Shou	Jing		Xu	Chong		Daap	Zong	Chop	Giuong	Liec	Nham	Nho	Quang	Jiang	Mou			Yu			Jue					Ting			Xiao		Dou		Guo	Mang	Wang	Xu	Wang	Suo	Juan	Yue		Han		Shen		Xie	Liu	Run								Bi			Nao				Wan	Jiu	Que	Ngop	Dau	Ru	Le	Ngom	Nhin	Quau	Mang	Tro	Bet		Ni		Mi	Suo	Nhon	Qiang			Han	Zhuo	Mi	Xu		Lang	Jie	Ding	Chang	Zhi	Fei	Jia	Jun	Huo	Qi	Ju	Zhun		Dian	Jiao	Ya		Zhan	Gwat			Sik	Loi						Zhi		Mai	Hu	Xie	Shi	Gui			Him	Nhom	Nhac	Ngai	Tron	Tro	Nhoi	Nho		Xu";

    case 594:
      return "	Nghenh	Ji		Chuang		Mao	Ruan	Xu	Huan	Sha	Ju				Kuang		Hou	Guan	Gua		Mi	Die	Bi	Liang	La	Shan	Lu	Xi			Sou	Jeoi	Loi	Mi										Ou	Ngac	Leng	Lay	Hong	Nhin	Kip	Chot	Nguoc	Nhon	Nam	Ku	Gui	Nhom	Dom	Xi	Pan	Se	Jue	Hong	Guan	Ju		Nai	Hua	Ge	Li	Gou	Ti		Ma	Teng	Da				Qi	Yu	Jiao	Mie	Geng	Meng	Wei		Ti	Qi			Chen	Dou		Pan										Trong	Hay	Trong	Let	Trit	Soc	Khoe	Han		Tron		Mi	Ma	Lu	Qi	Keng		Die	Qi	Jiao	Kang	Qiao	Mi	Shan							Jian	Li	Ke	Xu		Caau					Man	Feng	Chan	Hui		Dui	Guom	Ghe	Zong	Mo	Trong	Nguyt	Chop	Quac	Nhan	Song	Nhon	Thang	Thang	Nguoi	Dom	Mu	Kou			Wei	Guan	Ji	Zun	Huo	Xie					Sui		Ruan		Te				Zheng	Kun	Xiang	Mian		Xi						Caang					Sa						Tre	Ngoanh	Trung	Trom			Saau	E	Mie	Zhu	Zou	Meng		Xi		Tang		Jia	Chang	Ji									Zhuo				Lem	Coi	Ngam	Him	Lam	Liec	Soi	Ngay	Dom		Guom	Trao		He";

    case 595:
      return "Cha	Qi	Mian	Zhen	Ku	Ye	Zhou		Jian		Pan			Hui	Seon	Ming	Liu	Jeoi		Cyu					Shui	Nho	Mai	Li			Shuo	Yi					Li	Khoe	Len	Lo	Xie	Te	Xiu	Tron	Nhin	Xuan	Li	Meng	Wei	Meng						Hieng	Dim	Ngam	Yao	Lan	Ling	Ying	Ying	Li	Jian	Gui				Guan	Xie			She		Zui		Lom	Ngong			Gheo	Cham	Kan	Lei		Trom		Nheo		Bian	Ngom		Shu	Nu	Xu				Hao					Gui		Zhai	Lang	Cuan	Zhi	Feng	Qin		Ze	Na	Niu	Yi			Cong	Shi	Jian	Zong	Yan	Ying				Ruan	Mem	Rong	Xi		Guan	Kai		Wu		Qin	Cong		Ze	Xie		Yu	Zan	Chuang	Li	Li	Xu	Mi	Xu	Ruan			Gui	Rong	Zuan		Mao		Qin	Cuan	Cuan	Cuan										Wu		Fa	Ba				Ji			Qia	Zhi	Tiao										Zhi	Zhi		Huan	Chou		Zhi	Ten	Ten	Ten	Ying				Wu	Bei		Hong	Shen		Jue	Kui			Yi	Ya			Bi				Kua	Qian			Zhao		Kai	Shang			An	Zhe	Zhi							Zhi		Jiao					Ji	Van";

    case 596:
      return "Si	Pu	Ou				Van	Ngan	So	Ngan	Zhuo	Ngui		Ngan		Coc	Ngun	Ying	Cut	Huan	Van	Ya			Shi	Pa	Pu				Mang	Chai						Faan	Dia	Loi	Dia	Yun			Gu			Taan	Keoi									Dan		Nao		Zhe		Hu			Chai	Ben		Keng	Gaa	Die	Ting			Guai			Qiong	Shi	Jia	Ao	Na	Pin	Jia				Mo								Cuom	Zhe	Bu	Wo		Cha					Nao	Kan	Caak	Xach	Gu	Du	Guai	Qiong	Ran	Rong	Yi	Dui	Lei		Zhou	Kua	E	Xian	Dian	Nuo	E	Yong	Wu	Keng		Dia		Gai														Zhi				Zhi	Xun		Laau	Zheng			Yang		Huo	Ji	Nao			Da	Dia	Ya	Lu			Fu	San	Chu	Wei		Fu	Keng	Si	Kang		Yi	Hua								Yu					Li	Mai	Vo	Lin	Du	E	Sanh			Qiang	Du			Jie	Chuo	Xian				Gao																						Dao				Hong			Be	Mai	Dia	Vo	Canh	Som	Loi		Zong			Qi	Tuo";

    case 597:
      return "Hong	Pi	Geng		Nie			Kong			Zhi							Xiao																She	Yu	Jiang			Voi	Chong		Qi	Chen	Sang		Suo	Qian	Hui		Shan	E			Ci						Qiu		Ke		Ham	Weng	Zi	Ji		Mai			Da		Cuo	Manh		Chom	Lou	Kang	Kuo	Di	Qie		Mo			Guo	Hong	Chao	Hei		Gei	Gun	Zaat	Zoeng				Cao	Zhe	Ke	Keoi	Gun										Xu	Peng	Jue			Gan	Si		Sui	Que		Wu	Yan	Peng	Xiao	Pan		Zyun			Sin	Taan								La		Gun	Doi	Vo	Quanh	Vo	San	Lo	Vo	Beng	Zhen	Ji			Jin	Lian	Ken		Zhou								Zao	Cuoi	Le	Qi	Bing									Yin	Pin		Oe	Tung	Me	Sou	Lu		Di	Du	Liao	Zhuo									Chang		Gach	Re	Ghe	Quanh	Soi		Chen	Ta		Jin				Que	Dao	Cin	Chen	Rang		Po	Lai						Zhong	Xie	Nen	Gach	Jiang	Qu	Lei	Ca	Que					Gach		Xiang	Lei			To	Lan			Lom		La";

    case 598:
      return "Nang	La	Ben		Yu	Si					Jiao	Qin	Ji			Gan		Va	Yi														Yi	Zhi			Biao	Sheng	Jiu				Ngo	He	Fu		Ju	Mei						Taan	Tre	Tre									Zuo	Yi					Xian	Yi		Si		Chui			Mo			Gong	Tray	Rung														Zhan		Xun			Ru	Nhe	Huo	Lay	Ruoi		Shao				Shou														You	Yu			Jun	Leoi	Lay	Nhe	Nhin	Luoi		Zi	Lu											Coeng					Chi	Kun					Zhun				Tho	Lai	Hou			Xu						De															Zong	Ying			Zhu			Liu				Lay								Nu						Nhom	Bi		Chi		Zu	Feng	Lu	Pu				Daai		Zhuan		Zhe	Shi	Yu	Lu	Liang		Le		Jue	Liao	Beng					Sin";

    case 599:
      return "Vai			Yi	Guan		Lau						Ao			Gui	Min		Yan	Lan			Bo			Zan	You			Kit				Nhe			Re	Yi	Ni						Ni	Guo	Jun		Shi		Xian		Qian	Que	Kui							Sit			She		Huo		Wan						Fei	Fei	Ji	Yu	Gat			Zhi	Gua		Jie	Mang	He		You							Du	Si		Li			Jie	Niu	Ba	Yu						Zhi				Wan						He	Ke				Cay	Du	Jia		Chen		Chui	He	Zhai					Mei			He	Zi	Zhu			Tuo				Giong		Zun		Ru	Duo	Jiang										Jia	Heng		Beng	Mo					Zu			Bie		Ku	Jia					Zhuo		Xiu						Lai	He		Qiao		Kau	Thoc	Thoc	Ngo		Bong	Fei	Sheng				Zhui	Kuan	Ze	Xian		Bi	Yi		Chang					Muk	Gaai	Zung									Mao												Wan			Lui			Bap	Wu	Ku	Wo";

    case 600:
      return "Xing	Ke		Jiu	Duan	Huan			Zhi	Ce	Rou	Ji		Ye														Jing	Yang					Zong								Can			Trau	Giong	Rom	Rom		Si	Li	Gu	Chang		Fei	Liu		Jie	Yun			Zhi			Chou	Bie																	Ji					Maa	Vua				Luo	Jian		Chuang	Shuang		Lu	Jun	Jiao		Ti	Zha			Yi		Cong	Nei	Jia				Jung		Ji									Ai					Ma	Nanh	Mam	Rieng	Rieng	Jian		Thoc	Ben		Fan	Sui	Zun	Dian	Gao	Gao	Lao		Zhuo														Tui				Bi	Ju				Gat	Ve		Hua				Cheng	Chua			Kuai	Dang	Ge	Xie		Jie		Can									Zu		Pu			Shu	Bu				Vung	Trong	Gio					Ning	Yan	Zhou		Meng		Bian	Dek	Xiang		Leon			Lu	Li				Ji		Mie	Lei		Zhi	You	Bian								Mu		Ran			Chuoi";

    case 601:
      return "		Niao	Jau							Quan	Zhe					Lei							Dang	Jue				Ling		Ling	Yan				Yao	Zhen	Qi	Ai		Nu	Mang								Kan		Jiu	Yan	Mian		Yin	Wan	Yao	Wa	Pi	Sui									Kong	Miu		Hong		Ming	Ling	Yi	Shen		Zuo							Gu					Tu		Yong		Wa	Gui	Hong				Shi		Xiong		A								Cheng		Keng	Yi	Yang	Ting	Dou	Cha	Liu				Qiu	Xuan	Shen	Kuan	Tong		Qian		Chou					Wen		Long	An							Kan		Yao		Fu				Beng	Lan	Qia	Dian			Jiao	Gui		Xiong			Ke				Coeng										Xian	Wong											Gong				Ou	Ke				Ku	Mei		Hang			Tian	Gou	Ma		Liu				Wei	Wen							Gong		Tu	Ning			Mi		Nup	Rong	Lang	Qian	Man	Zhe		Hua	Yong	Jin		Mei			Fu		Tam		Qu";

    case 602:
      return "											Lung	Liu	Fu	Dan		Gong		Cui			Xing							Tu	Shou										Xo	Trong		Qiong									Rong								Li				Ji	Tuo							Hoam		Chui			Tong	Xo					Tan		Ling		Yi	Ruan		Pa				Ca				Yue	Que	Zhu	Hai											Dung	Sap	Fa	Hai								Lie						Bu	Ping	Lie			Xoi					Kui	Fu	Tian	Wo		Ju						Bing			Zhen		Fu		Ting	Trong	Trong				Long				Xi	Tian				Ji			Zoeng	Yao		Cu			Pang	Qie			Dung			Long	Ji						Tong	Yi		Chang						Gong	Troi		Dong								Xiang			Ting		Zhuan	Yi	Yi	Zi	Qi			Cha	Yu						Zoek			Dun	Nua		Chong	Lu	Dun		Fang	Shi	Ti	Ji	Qiu	Shui	Chen			Huang	Shi";

    case 603:
      return "Yun						Long		Man	Gou	Can	Se		Xian	Mo		Shen		Po	Yao	Qu	Ran				Ju			Yin	Bai	Nie		Chou							Chom	Khau	Nia	Rong	Chuan	Nie	Li	Jiang	Kao	Ce	Chong	Zhua	Zi	Yang								Wen															Ji	Ji	Dam	Mang	Mau	Lu	Qiu	Dun	Bao	Chan		Bo		Chi	Zhe	Mang		Ji	Miao	Yuan		Wu	Zhi	Ping			Chong						Mi	Fei	Cuo	Meng						San	Na	Mang																	Buong	Hum	Pou	Dua	The		Yin	Mang	Dian	Diao		Qian			Hang	Zhi	Ju	Nian				Mi	Gu						Zhua	Nie	Zhuo		Ye	Cong		Xu		Xi			Bo				Aa	Dung										Can					Yan			Sung	Ro	Van	Do	Ra	Manh	Tre	Mui	Xom	Cong		Jin	Toi	Trum	Ju	Dang	Du		Ye	Jing	Ke	Luo	Wei	Tu	You	Pai		Pi	Ding		Wei	Che	Jian		Si	Zhuo	Sou		Ruan		Yu					E			Ku		Zhu						Xia";

    case 604:
      return "	Zing			Cau		Dai	Ke	Sieng		Thap																	Fu	Tao	Xi	Chou	Yuan	Lu	Ce	Shan	Liu		Xi	Ji	Yi	Tan		Hu			Cuo	Ge		Shi	Sao	Hong	Xian			Xia					Mu	Suo		Zhai		Fu	Se	Nu	Yi							Zik										Zaan																	Ceoi		Qin	Qing		Cot	Sao	Ghi	Gianh	Noi	Thoi	Gio	Chom	Ken		Vo	Hui	Shuang	Dan	Ou	Mo	Qian	Chi	Pai	Juan			Chao	Lie	Bing	Kou	Dan	Chou	Tong	Dan	Man	Hu	Liao	Xian		Cao	Lu	Chuan	Wu	Man				Zi		Du			Shuang	Fu	Ju	Zhou		Diao	Wang	Chuang	Qian	Tui	Geoi	Lian	Biao	Li			Li																						Wai	Geoi	Luoc	Khai	Gian	Ra	Bi	Fu	Cui	Du		Zan	Long	Xun	Qiong	Ji	Qian		Jian	Shao	Duo	Shu	Bu	Xu	Dong		Ran		Yang	Rui	Lin	Jian	Di	Fen	Dian	Zui		Ning					Suan	Tian	An			Ce	Ding	Shen	Du	Ti	Jiao	Zui	Zhang	Jian	Dan	Dan	Song				Gwan";

    case 605:
      return "																Zhan	Ting	Zhi			You	Pai	Thung	Mui	Dau	Gau	Choi	Chieu				Zyun	Li	Tri		Qian		Sui	Ju	Ai	Ge	Ju	Tun	Bi	Qia	Bo	Hui	Zing	Jian			Gou	Suan					Ci	Qiang				Yan				Zaan												Dian			Mie			Chieu	Toi	Hom	Ray	Giau	Lak	Nong	Po	Ling	Jie	Zhu	Gu			Duan	Zhao		Shao	Qin	Mi		Ping	Cong	Chou			Sa							Tian								Chong	Mung	Thung	Lat	Gay	Mung	Non	Liu	Lu	Lu	Zou				Lu	Huan		Tiao	Tui	Qiang	Lin	Bei	Pao	Zhan		Li		Seoi		Ti	Hu						Lie												Toi	Coi	Nung	Phach	Choi	Dam		Hui	Qu	Xuan		Jing	Die	Sui		Wei		Yan	Yan	Ban		Jiang	Ni	Li	Hu	Qi	Zhong									Bi	Lach	Noi	Yu	Die	Lin	Li	Zhuo	Ji	Ju		Feng		Yu									Trac	Lie	Za	Qian	Jie	Guan		Zhuo			Fu								Se	Mo	May	Cu";

    case 606:
      return "	Nan		Hui	Giam		Liep		Dang	Long	Yi			Sieng	Tang				Nan	Nip				Sa	Yue		Di			Trum			The	Gan	Zan	Shan	Yu	Bo		Ding	Fan		Yu		Shen						Gong		Mie	Tun		Xoi	Lie							Ba	Tam	Zha	Pei		Mi		Ming	Fan		Na	Si	Yi	Jia	Zhu						Ban	Yu		Po		Banh	Chao	Huan	Can	Jiao		Dai		Tan									Zhi		Mi	Kao			Doi	Lau	Yao	Dui	Quan	Bu	Chu	Qiao	Liu	Bo		Kang	Fen						Zong	Gwing	Zi		Dao	Sen			Dou	Ge				Boi	Xoi	Thinh	Tam	Thinh	Lo	Xoi	Ba	Ba			Ling	Xi		Ni	Zhou	Zhou					Chou			Dim														Nian	Ji		Qu		Oan	Xep	Com	Aa	Suong	Khan	Ia					Kai			Xian		He		Lin		Zi				Ou	Cu					Cha	Leon	Me	Nam			Zhong	Bu	No	Deo	May	Thinh	Day	Chou	Xi	Sa	Xian	Se	Mian		Fan	Zhi		Cui						Xia				Bun	Che	Khe	Nep	U	Cut	Nuo	Li";

    case 607:
      return "Zu		Cui	Ze		Li																Lep	Man		Qi		Zhuo	Cui	Pu		Fan	Tan										Zi	Zu	Zhou	Rong	Lin	Tan			Keo	Ham	U			Shi				Cui	Zi	Fu					Xiao			Thung			Cam	Feng			Cim	Gao	Com	Hem	Xian	Jian		Fen		Men			Li	Mo							You		Phan	Phen		Xia	Huo		Qu		Xay	Duc		Niang				Mi			Qi		Nhao	He		Lian							Zuo			Ling	Men		Zhu		Niao			Ji	Reng	Jie	Gan			Yi			Zhou		Wu		Diu	Soi		Geng	Cu		Mie				Xun		Zhi	Xiao			Fu	Hu				Di		Jue	Diao						Phang				Shou			Wang	Ben	Buoc	Ngo	Vit	Vuong	Tim	Na	Di	Shi	Ci	Shu		Wa	Che	Fan		Gu	Yuan			Guan						Giay			Qie		Zhan	Dai	She		Bua	Lei	Wang	Chao	Khau	Soi	Zhou	Xiang	Ming	Zi	Huang	Mi		Xi	Zhi	Pai	Duo				Ci	Mou		Chao		Yi	Gou";

    case 608:
      return "					Nien		Jing			Dai	Buong	Nho	Rach	Riet	Thua	Chang	Troi		Zeng	Ping	Ye	Jie	Xich	Pi		Gieng	Sha	Zhuang	Jiong			Liu	Yu		Ju					Nuo	Dyun	Va	Yem									Mang	Chuoi			Mao	Thun	Xe	Cui	Noi	Keo	Rang	Vai	Boi	Nuoc	Ban		Chen	So	Zhuan	Nian	Kong	Jie	Hua			Xin	Zuo	Yan	Jue					Hu	Zhou	She		Yan		Xie	Die			Chen			Chang	Go	Lim														Jian	Ji			Chuo	Hong	Mang	Ro	Mon	Nit	May	Vuong	Ung	Go	Da	Doi		Ting	Kai	Xing	Hui	Jian	Zhou	Zha	Fu	Chi	Beng	Nuo				Ji	Qian		Wan	Ou	Bi	Shuo				The					Jing	Ye			Ping	Dam														Jin							Uom	Luot	Giam	Dot	Det	Buoc	Chai				Fei			Li			Li	Pi					Tao		Sui	Liu	He	Hun	Tan	Shuo	Zhi	Bo				Xi				Po	Qun		Mu										Gai	Toi														Yong	Luot	Vai";

    case 609:
      return "Ma	Thun	Dai	Chit	Quan	Det	May	Nit	Xuyen		Qi	Diao	Nie	Shuang		Shao	Kun	Sui		Dou	Die								Gong		Van		Nut	Maan		Cuon												Zhuan	Guo				Chai	Dut	Ria	Thong	Xung	Chao	Rang	Quan	Xu	Qu	Voc		Xun			Jiao	Zhe		Dian	Sang	Beng		Suo	Qian				Xu		Xun			Mo					Man	Jau	Cam	Cyu																	Dui	Tan	Nhang	Dum	Thua	Vot		Vo	Sui	La	Zhu	Zhou		Li		Dan	Ju		Yun	Chan	Luo			Se		Lian		Zuan			Lai	Shuang	Qie											Dou	Soi	Neo				Wu	Meng		Ji			Chi		Ni							Cyu	Fai	Ban			Liu						Yao	Dui	Linh	La			Lu		Sui	Fu			Lei	Wei		Nhao							Cong				Roi		Li		Pin		Jun	Ju		La		Jing										Ji			Mie		Yao	Bian	Chung			Cong	Si			Si			He";

    case 610:
      return "		Nhau	Nang		Die			Che	Yun		Xiu	Shu		Chan	Min	Lian	Yin	Xing	Wei	Gu	Tou	Ta	Fei	Da	Nie	Cu	Zuo	Jie	Xuan	Bo	Jin	Yin	Xu		Yu	Xiong		Qi	Bei	Xing	Gong			Zui				Jie		Kai			Xing	Bei	Shu	Yu		Zhou	Zhan		Chau					Zhong				Cha		Chui	Liu					Sui		Zhu								Caang	Bian				Xin		Ya		Taam	Ling					Ya			Sei	Ming	Ting	4				Bay								Di								Pi	Hu	Cen							Tian	Mou	Juan		Mou		Ju	Liu		Ling				Liu	Hu		Bon	Tu											Fu	Hu			E	Gong	Gu					Gua								Lue		Fan	Lu	Meng	Fu	Liu						Xie	Gu		Xian	Bo		Ji					Coek			Quan	Lu	Bay									Shuo			Mou	Yu	Han			Ra			Yue	Dan					Yu	Jian			Gang												Cao";

    case 611:
      return "Shen	Liu					Jiao			Su	Su	Zhong							Liao		Xuan	Lu		Ji			Yan					Lu		Min	Ti				Huan			Yi	Tan		Wu				Ji					Leoi		Du	Kun		Jun					Shi	Nan	Po			Shu	Quan				La		Me	Ren			Fen		Goeng	Ta	Tun		Yang						Dang					Li						Duo	Ci		Gu	Fen			Rou				Gao	Xiang		Xiang	Hou		Tao	Shan	Yang	Zi		Yuan								Su			Chuan	Xiang		Ban		Man	Gion	Fu	La	Li		Jie	You					Yu		Chi	Guong	Chuan	Yi	Shan			Xinh	Ji	Yan			Wu	Chun	Mang				Tanh	Fu	Jia	Gou	Gu	Jia				Xian		Jin	Zi	Lou			Gou		Sai		Ren		Shan		Dom	Jue	Tong	You											Mieu	Bon	Jian	Du		Hu				Sao	Yu						Mai		Zhi	Yan	Gao		Huai						Quan			Yang		Zui		Jik		Xiao	Yi	Yan	Hong	Yu				Chi";

    case 612:
      return "	Chi	Jik		Hang	Se	Pa	Ta	Fen	Chi			Hong	Xue			Man	Ci	Ai				Zhi					Qu					Xi	Fu		Shu	Hai		Po		Ci								Chai			Hong					Pao	Shen	Xiao			Xuan	Ci	Ting	Po			Canh		Luon		Ta	Cha		Zing	Zu	Huo	Xu	Yan	Chai		Tuo						Quat	Xian	Xuan	Hou	Huan	Ge	Chong	Bi	Hong	Hong	Chi		Cha						Fai						Zha		Zhai	Ta			Po	Ta		You	Fu	Ci	Da	Ta		Liu			Ci		Hong	Wai	Han	La		Shi	Jap				Tong	Hui	He	Pie	Yu							Cin				Xian	Han		Po							La	Huo							Long		Tai				Lao	Khu	Shu	Bou		Sau	Dao	Dian										Gia		Khu	Xiong	Lu	Coi	Wang		Che	Nai		Jue			Er	Er	Nu	Nu						Lau	Zhuan				Ma	Nuo		Lie	Lei		Ba					Cheng			Gui	Quan	Ge		Gong	Shao					Lai	Zheng	Yi	Gun	Wei	Lun	Cay";

    case 613:
      return "		Shi	Ying	Sheng	Tu	Bi		Ze	Zhong		Rong	Qi	Fu	Ce				Zi	Li	Man		Lian	Biao		Cay		Chuang	Yi				Pai					Yi	Kuai			Biao		Chi	Qu	Mo	Zhe	Sha	Sha							Yao	Gong	Nai			Xie			Tian							Ye			Sha						Sao			Dian	Xu						Qu						Venh	Hong	Sheng	Ting														Duo		Gaap	Lau		Liao		Hong	Li		Xiang			Shen			Fu							Bit	Yan	Wang	Qi	Duo		Hua	Qian		Xie	Nghe												Ci	Sheng		Sim	Diec	Er		Xing		Tui	Yan		Lie			Mi	Jyu											Zong		Zi	Tai	Hu	Ying	Lian	Da	Tian	Tian										Rong		Ai		Lang	Ai	Zhe	Guo	Lu	Zhao	Mi	Liao	Zhe				Qu	Cong	Lom	Ghe	Ting		Tan	Zhan	Hu		Pie		Da	Rong						Nao					Nang	Dang	Jiao						Ju	Er	Diec";

    case 614:
      return "										Li		Guo	Wai					Nie		Jin																		Siu	Ve		Pi	Chi							Voc	Pi	Yi	Du	Wa	Xun		Qi	Shan			Xu			He	Pan		Pei		Xiong		Chi	Tan	Zui	Zuan	Qi	Du				Nguc										Shui			Na	Xi						Moc	Mao	Hong	Tim	Chao	Yi			Zheng			Ju	Dai		San			Zhu	Wan	Gu		San	Ban	Jia	Mai	Ci												Tuo		Qi					Zhuang	Tuo			Ping	Chao	Cam	Zaap	Top						Peng	Kuang	Yi		Xie	Yue	Hen		Hou	Zheng	Chun	Shi	Wa		Xie		Truong		Jan		Lou				Sai			Geng	Geng												E				Deo	Chon	Gat	Ruot	Tai		Ku	Na			Ju	Xuan	Qu	Che	Lu	He	Sheng	Nan		He	Cha	Yan	Geng	Nie		Guo	Yan	Guan			Zhi	Lao							Du	Qi	Qu	Jue								Bet	Thon	Bing	Ngom	Nuc	Mang";

    case 615:
      return "Phi	Feng		Xu	Tui		Han	Ku			Shen	Zhi		Pang	Zheng	Li	Wan		Fan	Xin			Ya		Vu			Ju	Shen		Ron															Mang		Tun	Zhuo	Xi	Yin	Jing	Tun			Geng	Ji									Kei	Dit	Rom	Rang	Phen	San	Dit	Ngac	De	Tron	Mun	Mep	San	Phop	Zhuan			Tie		Zhi		Ji				Ying	Wei		Huan	Ting	Chan		Jim	Kui	Qia	Ban	Cha	Tuo	Nan	Jie		Yan		Tu		Wen		Cong			Xu	Yin			Beng		Luon	May		Lu					Zai	Da				Nie	Ju	Hou				Geng	Cay	Nghen	Oi	Nguc	Voi	Day	Phay	Hoan	Hou	Kan	Gong		Hui	Xie			Xi	Han	Mi		Weng	Hun	Sao	Xin	Zhe	Huo		Gong			Sai	Jin	Wa				Dui	Chi	Jung	Jim									Xi					Mi	Zang	Sang					Com	Phoi	Bo	Zin	Gay	Suoi	Khu	Ma	Ia	Gion	Tun	Zhi	Wen	Mo	Nem	Yin	Tun		Chong	Ze		Xiao	Mo	Cu			Bian	Xiu			Yi			Luon				Huang		Zha	Suo	Hun	Ju		Beu	Nem	Boi	Nach	Lon	Ngoai	Nac	Be	Mat	Khu	Dui";

    case 616:
      return "	Cu			Ji	Xun	Sun	Ceng		Yi					Biao				Jue	Li			Pao		Vai			Za	Ye		Bi	Zhe	Zhe		Jiu	Zhe			Shu				Xi					Nhon	Vac	Phet	U	Suon	Cam	Roi	Seo	Xu	Nai	Xian	Gun	Wei		Voi	Ji	Sa			Dong	Nuo	Du	Zheng	Ku			Ming		Ron										Bao	Hui			Zong					Gam	Lung	Song	Ngay	Rau	Bam	Chun	Nach	Dong		San		Teng	Yi	Cam	Yu	Pou	Dit		Yao	Ning		Chou	Hun	Lom	Dui		Qi	Ying	Bing	Ning	Huang							Buoi		Ying		Ji	Mat	Bao		Duk		Guang	Lei	Zun			Mak						Chan					Cho	Phich	Rang	Noc	Noc	Jian				Meng		Xiao						Xin		Li		Vai	Lot	Rom	Dui	Ma			Qiao				Gay	Wei	Na		Pang		Lei			Luo				Luan		Geng	Nan	Luan			Qu			Pheo	Luo	Nhau	Nang	Nang		Luo	Yue						Shui			Mi	Wang	Ce	Jian	Wang						Jia	Nam	Zak			Huan				Lian	Zi	Bai	Shou			Wan";

    case 617:
      return "		Shu					Gui	Xi		Ru	Yao			Gao			Gou				Yue			Yong	Wa	Bo					Xin	Hoi		Pi	Bo			Hai	Zhai	Wo		Ye	Bi	Hai	Let	Thoi	Kham	Thum	Khan							Chi	Zi		Zhi		Ni	Den			Wu	Ai	Den					Ai	Yu	Chi			Jing	Zhi	Zhi	Zhi	Ju					Han				Ping			Yao						You	Ping		Mo						Zuo	Po		Xue	Kuang	Yi	Po									Zhui								Ni	Qiu	Cou							Yao					Fen				Xia		Jiang	Cha	Kyo		Xiao	Cha						Cheng	Cui				Qiong	Jim	Yu		Yu				Wen		Cha	Yu			Cung				Zuo	Dao			Juan	Dao	Ying		Feng		Lau		Weng			Jin	Qi		Qin		Kuo		Tan	Xian		Tian		Kuo		Tian		Hu	Zhu	Zhan	Ta	Luoi	Tian	Ta	Ta	Hua	Yan	Tie		Tie	Ta							Huai		Jia	Qi		Ta	Loe		Tan	Hua		Liem	Zhuan	Hua	Laai		Lan	Luoi";

    case 618:
      return "		Mua				Zun	Yi	Fu	Wu		Fu		Ding	Ta			Chai					Chao			Ri	Quan		Ge					Fu	Di	Diao	Yong		Jia			Long			Yong	Pi	Doi	Huo	Qiong		Fan	Wu	Tong	Hang			Tan			Khoang			Heng				Syun		Tiao				Zhou			Bai	Xie	Dao		Jin		Loi	Aa			Hu	Bei		Ding		Mui	Gu	Nuo	Wei	Yu		Xing	Fu	Xian	Qi	Tu			Ji		Ying		Deng	Wei	Xi		Pai	Xuong	Sheng	You	Gia	Ai	Jian		Gou	Ruo				Gong			Sha	Tang		Do	Song				Lu	Ao		Qi	Xiu		Dai		Thong	Song	Fa	Wei		Dun	Liao	Fan	Huang	Jue	Ta	Zun	Rao	Can	Teng			Hua	Xu		Zhan			Xuong	Gan	Tray		Peng	Can	Xie	Da				Ji				Ghe	Li			Pan		Khoang	Ghe	Long	Li	Xi	Teng			Ling					Li	Ran	Ling				Gun						Po	Mo	Pai		Bot	Ba								Qi			Yan						Wa	Ang		Ming	Min	Xun	Meng			Guai			Jiao					Gai";

    case 619:
      return "	Cai	Wu	Zhe	Ren	Kou					Zi							No		Jau	Zhao	Zhong	Qiu	Guo	Gong	Pu	Hu	Mian			Tian					Wang					Cek														Ngo		Zhu	Da	Xiong	Na			Juan			Nian							Hu	Sha							Cik	Ting	Zing	Sai								Cin	Zhi			Ta		Si				Yi	Tro	Tup			Hung			Qiong	Zhi	Lu	Ru		Qi	Yu	Zhou	Yang	Xian	Mou	Chou	Hui	Jiu	Jiu	Piao					Jiao	Si	Guai		Mo											Xi	Pu					Jau	Laam						Mong																		Ji			Re	Kei	Nen		Wen	Bei	Yi	Fu	Si	Juan	Ji		Ni		Ben					Xu			Qin	Bo			Wang	Zhe		Wo	Shao	Zao	Yang			Song	Nie					Bi								Cu	Qiang						Xiao	Zhi	She			Zhi	Peng							Miu";

    case 620:
      return "															Diao							Wo		Zhi	Bi		Fen				Ngon	Ong	Na	Nua	Day	Lau	Bang	Cai				Qiu	Ni	Bo	Dun		Shi	Xu	Chang	Xu	Ye	Mi				Xin	Zhuo	Fu			Pi	Xue		Yu	Xian	Yu	Yu	Gu	Ju	Ta	Kong			Zheng	Meng	Gang						Mu	Xi	Bi		Fu						Xiao				Jiu			Gou													Chi	Jiu	Jiu			Sha		Fei							Ping	Diu	Ji	Lei	Geoi																Nhai																		Ji							Fu				Wan	Xu	Bo				Chenh		Lei	Jyu	Ra	Sa	Rom	Ngo	Jan	Muop	La	Mui	Hao		Xie	Pian	Yu		Tian	Pi		Shi	Kuai	Ji			Zha	Nai	Mou		Fu	Du			Sheng	Cha	Tre	Chi	Gui	Min	Tang	Bai	Qiang		Zhuo	Wei	Xun		Miao	Zai	You		You		Shan	He	Lu	Zhi				Jing	Zhen			Meng	You		Wo	Ba			Juan	Ru	Cou";

    case 621:
      return "Zhi							Qiong		Hu	Yang	Mong	Jun	She	Kou			Qian			Meng						Tiao								Ci	Ji	Jing	Seon	Haak	Fei	Kwan	Seon	Lei																																						Nie	Geoi						Ke	Sa	Nhua	Nu	Dot	Ray			Chi	He	Xiong		Hun			Di	Lang		Zao	Ce	Suo	Zu	Sui		Xia		Xie			Jie	You		Gou	Geng				Jun	Huang	Ji	Pou	Wu		Yi			Nai		Rong	Nan		Ping	Shan	Diao	Ji	Hua	Dui	Kong	Ta		Hong		Shu				Heng	Fen						Gan	Hou	Hong	Lit	Jyun	Ngo	Lo	Gwan							Wan				Kou																																							Nian			Haa	Chu									Qiang		Che	Bom	Seoi	Hoi	Bi	Coi	Ngo	Mai	Fau		Xi	Hu	Song	Wo		Hai	Ru	Meng		San		Wu	Day	You";

    case 622:
      return "Kei	Tan	Shen			Kau	Qi	Seot	Guo	Qia	Xian					Sui	Lu		Ji	Qi	Diao			Qi	Jia	You	Xi	Chao						Mi	Lou	Bi							Pei				Zhen	Shen	Chan	Fu					Qu	Si			Zui								Bou	Fau	Siu	Jyun																																						Zhao			Coi	Co	Mam	Gung	Wan	Thom	Bim	Co	Voi	Pui	Den	Nhai	Rac	Dam		Pi			Cou				Hing		Gao	Du	Syun	Fu	Guan	Sao	Sou	Jian	Pou		Can	Beng	Mou	Zhao	Xiao		Ju	Shu	Jian	Li		Chuan	Lao		He	Hu	Gu	Zhang	Jie	Xiang		Du	Han	Jia	Xiang	Ji	Shu	Lang	Ji	Shan			Tao	Zi	Shuan		Ji	Chu	Ji	Shen	Lin	Liao		San		An	Ruan		Ti	Dan		Huan		Sa											Zaau	Wing	Mou	Cing	Fei	Jan	Hyun	Zeon";

    case 623:
      return "			Sang			Rui	Wu	Ju	Huan	Leng	Lu			Tan	Zeng				Qian	Leu			Xi			Lum	San	San	Nau	Dua	Khay	Sung	Ci	She			Dua	Sing	Sa	Cu		Mao	Qu		Bo	Gan	Zuk	Qie	Juan	Dang	Chang	Yang	He		Ji		Bing		Mei				Dun	Ao	Jing	Lu	Mian	Dian	He		Jian			Hua	Gou			Lu	Fu	Hui		Zei		Jin	Si	Qun						Dan		Wan	Bian					Jia							Dan	Jiu	Xian	Bo		Tranh			Jyu	Zing																											Xia		Biao				Po			Sao	Bei	Sha	Wei		Cang	Lu	Zaan	Dua	Mei	Ram	Choi	Do	Vung				Dan		Gu	Za	Bang	Gan			Chao	Ji	Lie		Qiong	Jian	Lu	Duan	Suan	Yao	Yin		Ta	Yao	Jing	Chu	Fu	Yuan	Shao		Bing	Dang	Shi			Lu	Qie	Luo	Po		Meng	Jie			Ji			Lu								Cung	Ji";

    case 624:
      return "				Chang	Mie	Meng	Jian			Cai		Su		Gou	Sung	Goi	Giong	Non	Ru	He	Sa		Zi	Keng	Geng	Si		Sam		Trai	Day	Ti	Zhan	Xie	Shui	Chi	You	Lu	Meng	Lie	Si			Xi	Fan	Fu	Shen	Ti	Chai	Yue		Fu	Jian	Di			Zhe	Xie	Dan				Zhi				Xu					Nie	Fan	Meng	Min							Joeng	Lung																																	Ghem	Vo	Gien	Kho	Vung	Kho	Ruom				Lou	Du		Zhan	Jian	Han	Dan	Sen	Jian	Tan	Jiao	Po		Ping		Zhuan		Liao	Zi		Zhuo		Hu					Xi		Meng	Ju	Mie	Xian		Kui	Meng	Jian				Nou		Di	Sao				Lau	Zing	Wan																												Dua	Rap	Kwai		Chu	Zhi	Qian	Lu		Zhuo				Zuo	Han	Sui	Gou		Chou	Ji	Yi	Yu								Nou	Ni	Ruo				Lin			Ning				Dang	Muong	Khoai	Fai					Ung";

    case 625:
      return "								Reu	Zung	Han		Dan	Qiao	Yao	Fu	Shuang	Kui	Qu	Dong	Shu						Li	Ju	Rui				Zha				Xiao		Fuk	Wan											Mo	Kieu	Ngong	Rap			Men	Shi	Dian	Li	Deng	Zan		Luo	Can			Ao	Gi		Jian		Diao			Ying										Rap	Yi	Dang	Nou		Yue										Bou	Hing						Rac	Men	Muong	Li	Li	Hu		You			Pan					Nang								Chen		Thuoc					Feng	Bie					Man	Gan	Huo		Cu		You			You				Xu					Xu	Hu	Lu		Xia	Yi								Hu	Hu	Zi							Gong	Tui	Wu	Ling	Gu	Zhong								Lu				Zu				Tong	Xia	He					Yue						Nan	Bo	Hu	Qi	Shu	Qiang	Zhou	Yao	Gu				Ban	Kan								He	Ji	Hu	Yan					Chun	Ding	Qiu	Hou			Hao			Zu";

    case 626:
      return "	Xian			Xia	Xi			Se				Ge	Xi				Ge			Lu		Ge	Ke		Shou	Zhu	Si	Teng	Ya	Ni					Nai			Luo	Sui			Chan			Wu		Yu										Zao		Yi	Xi	Hong	Quan	Wang	Chi	Xi	Tian	Yun		Yi	Ji	Hui	Fou		Fu			Ji	Xuan		Shuang	Tai		Du				Yuan		Trun	Vat	Di		Cay	Zhu	Tai		Rong	Xue	Yu	Fan	Bei		Qu		Bu	Jia	Zha		Nu	She				Li									Bang					Gaa				Gui	Guai		Dai		Buom	Nhong	San	Chao		Vat	Gai	Trut		Ci		Yan	Song	Shi		Ku	Zhi	Tong	Qu	E		Xing	Ru	Yu			Yi	Yi	Xu	Fou	Ge					He	Yin		Hong		Duo	Cyun			Gong	Doe							Xing	Fan		Chau	Nhai	Vo	Chuon	Cong	Ran	Doi	Chach		Qi	Sha		Du	Di	Li	Yi	Xi	Geng	Tong	Kao	Hong	Kun	Nie	Chi	Ti		Tong					Moi	Li	Na					Mei											Zhan	Bei			Cuong	Mot	Ghe	Tranh	Gioi	Chay	Lan	Nhong	Mang	Op	Khoai";

    case 627:
      return "Than	Tiao	Bo	Za	E	Shou	Kong	Peng	Fu	Lu	Xie	Xie	Xiu	Lu	Tian	Ta	Ci	Qu		Fu	Zhi		Xie	Zou	Fei	Min	Xing			Tong	Qi		Piao		Sui	Er				Hu																				Song		Bie	Ding	Ban	Shi	Xie	Xiao	Fei		Sua	Cua	Sua	Dom	Dia	Gioi	Ngai	Chau	Ray	Hon	Cua	Ray		Chuan	Shuai	Yao	Jue	Sheng		You	Fan			Kui	Di		Mao	Jie		Yan			Wei			Sang	Jie	Yu	Wei	E	Quan	Jiong	Feng	Long	Die	Pian		Lian	Hu	Lu									Dian				Cui	Mou																	Wang	Juan	Ke	Yan	Jiao	Haa	Dot	Oc	Chau			Ran	Gong		Rong	Sun	Shan			Chi		Qi	Suo		Ye	Zao	Que	Zhan	Ba	Zu	Suo	Zhe	Xi		Chu	Jiao	Zui	Ge	Wu			Lue	Ji			Xie	Xie			Dou					Qiu						Ping		Liu			Bin	Ci														Jie		Hui				Sha				Nhuc	Sam	Dom	Ret	Bo	Choi	Rong	Ran	Nhuc	Zhi	Ai	Xu	Bi		Ye	Ni	Zhu";

    case 628:
      return "	Su		Xie	Yu	Qu			Zu	Zhi	Zhang	Lue	Wei	Chong	Mi		Ji		Su	Ye	Xi	Tuan	Lian	Xuan		Wu						Mao			Hou										Hong			Lue	Du	Cong	Chan	Lu	Su				Diu	Doi	Thuong	Nhoi	Chau	Rom	Bo	Sung	Lue	Sam	Cay	Ngao		Vet	Zhong	Li	Fei		Jing	Kui	Yi	Hua	Cui	Zhu	Yu	Beng	Tun	Shu	Dai	Wu	Ci	Ning	Dang	Zu	Han		Pi	Chuan			Du	Pa			Zhu		Xie	Zhe	Qie	Xuan		Sao																					Bi		Fu		Gaan	Buom	Zyun	Sau	Li	Rua	Ray	Rom	Rua	Rua	E		Ye	Shu		Se		Qi	Guo	Se		Fu	Mao		Lei	Zhan											Chai					Wei																Lei		Zei	Ying	Ai	Xie		Bi	Nong	Chuon	Rien				Chan		Ban	Pi	Cong	Lie	Qi		Ji	Jing	Dong	Fei	Yi	Tuan																Meng	Can	Ya			Men	Vich	Ngoe	Sam		Yang		Ting				Zhi		Xie	Lu		Li		Mao";

    case 629:
      return "		Xia			Sou																	Su	Xue		Bau	Cong	Nhang	Ram	Li	Yuan			Zhan		Ta	Xuan	Wei	Ye	Pang	Mao	Ti	Pin		Du	Qiu	Yi					Tuo	Chai			Jin					E		Gioi	Diu	Vich			Chan	Ying	Ling		Xian		Qi		Yue	Lue	Ying	Qu				Fei	Zi						Qing	Trai			Ning	Wei	Shuang		Fu			Mo	Mo	Tuo	Chai	Zang				Re	Ram	Li	Li		Xia	Juan		Nan	Mi			Huang		Shuang		Xu			Fei		Xie		Hen			Ta	Yong		Zhan							Rom	Qiang	Nang		Lin				Luan	Xian	Fu		Ling				Sao		Hui	Maan			Moi		Ting		Qing		Huang		An		Mau	Mau				Man		Ni				Guo	Ou			Xiang		Jin				Mu	Zheng		N			San	Hu		Zu	Hui			Ji				Ye	Jiku									Jin				Hon		Xing			La	Yu	Jue						Shu	Zheng		Yong		Ge	Jutsu	Jian	Xin			Hui	Hang	Hang	Shuai";

    case 630:
      return "		Chong	Hang				Ay	Liao				Jing	Jiang		Gong		Zhuo						Qi					Qian		Dou	Po			Hu			Niu		Qi	Diao	Diao		Li			Xiong				Zi						Xon	Taai				Na		Zheng	La	Zhi		E	Bo	Po	Xu	Yong	Ci	Li			Pao			Xiu						Mei	Wu	Jau				Pu		Che	Qi			Yi		Ti	Duo	Long		Jian						Zhan	Yuan								Yu		Geng		Hou	Lot	Rach	Truong	Qi		Mu	Huan	Long	Xi	E	Lang	Fei	Wan		Cun		Peng				Cuo	Weng				Tung											Vay	Song	Gao	Xong			Cui			Qi	Li	Qie	Qian	Kong	Beng		Shou								Wei													Shan		Dup	Trang	Lun	May	Rach	Nem	Vat			Zi			Ti	Qian	Du			Tu			Wei				Hu	Xing		Shan	Zhi					Chi															Day	Toi	Zhou	Weng	Chi	Suo	Xie		Ke";

    case 631:
      return "	Shai	Shi	Shou		Jie				Gao	Lu					Pui	Tre				Xie		Chan	Mo	Vien	Xong	Zhi				Man		Shuai	Ke		Diao	Yi		Su	Chuang						Du				Cui	Tuo			Xie	Gin			Xuoi	Bau	Dung		Xuan				Hyun	He	Jue			Ti	Fei		Zhi	Shi	Tui			Chong		Ti	Zhan	Heng		Qu	Wei		Dun	Bao				Liao	Lai	Gei						Si		Rach	Chen	Cheo	Toang	Biao	Xie	Bie		Cong				Ju	He				Kui	Yong								Shu				Jyut	Daat					Dai	Rem		Nie		Yu	Zhuo	Meng	Hu		Ke	Lie								Jie	Xiong					Yan	Toac	Noi				Jie	La	Shu	Jie	Lei			Zu		Shi		Diu				Wei	Du	Su				Mac	Rach	Chen	Vien		Xie	Rang								Luo					Qian							Nang	Ling			Ji	Vat			Ming			Gu					Xuan				Xu					Bo											Wei";

    case 632:
      return "		Ku			Up	Wan		Cha		Mao	Ke			Ci				Xian	Mo							Hun	Chan	Shi	Zhen	E	Mi		Shi	Qu	Shu		Ci	Yan			Hu	Qi	Zhi	Huang								Zhi		You						Gao	Yao	Pou									Yi	Cheng	Ji	Thay	Ai		Dong		Sui		Jiu							Qi	Lian	Xuan		Liao					Yun	Xuan	Cou	Pian		Kui		Ti	Huan	Dan	Gui	Chen		Shang	Ji	Tai				Lian	Kan	Sheng		Dou	You	Qi		Xiao						Yi	Lou			Chuang					Lao	Gao				Zeng	Don	Wei				Jian					Ying	Fan	Li	Qian	Nghien			Yao				Kui	Wei		Que			Xiao	Que			Hu		Gok			Duo	Chu			Shen			Zhuo	E	Ji			Tan		Pa					Caau			Jie	Qiao					Qian	Ju			Qiu	Tuo				Nuo	Si				Yi	Chanh	Gu	Hun	Pa	Zi		Jiao	Dia		Xi	Shao		Yi	Zhi					Canh	Goc	Jren	Lun		Zhou	Jue	Tan	Nuo	Ju	Hu		Zhi";

    case 633:
      return "	Sung	Sung	Bi										Chi	Xuan	Ji	Gua	Ju	Wo	Tuo		Qiu	Wei	Duan		Shou		Zhen	Ne			Xi	Zhe	Zhi		Na	Kwai	Ken			Jian					Ba	Yao	Guo			Di		Huo	Jing			Mam	Thoi			Jue	Yue						Choi	Ji	Xi	Su	Coi	Jian		Kun	Wo	Kuang	Biao	Jue			Bi		Chan	Va	Zi	Li				Fo	Qian	Yan		Tan	Mo				Kou	Xi			Jiu							Hu	Hu		Fu			Yang	Guo		Ren	Yin	Feng	Jun		Yun			Xun		Xi													Xia			Hang			Ghe	Ke	Don				Hu			Hu	Pu	Fan	Ngaak				Jia			Yi						Tuo	Na										Yin	Yin						Beng	Ngoa			Ji	Wang	Shi	Dui	Duo		Tuo	Wa	Li				Re			Ci	Xu	Zhou	Zi							Wang	Ya		Ji	Chao									Ji						Khoang						Shan	Tu		Bie	Xi	Pi	Zha		Fung	Hui";

    case 634:
      return "Suo		He		Yue		Wu		Ling		Zha	Hua			Jyun									Chan								E		Chen						Sui		Tian							Zhi	Ti	Ao	Zhuo	Zi	Ke		Se	Tian	Lu					Shan	Zha				Chong		Yan												Seo	Mu	Hu						Daan	Chi			Su						Nao			Ji	Duo	Hou		Cong	Zha	Yin		Xiao		Bian	Beng	La		Chi		Qia		An	Shi			Chi								Gei	Nu		Ji												Ou		Xia			Chai		Ai			Sheng	He		Ji	Chi	Xi	Zheng			Ta		Ma			Pi			Xu	Qian										Xia				Zeon	Syun												Yu							Jie	Xia	Lu		Qie		Cha				Yang	Ji	Sha	Lou		Ji	Zhi	Wang		Bi	An	Yi	An					Li								Gan					Xian			Mo		Jiu	Tan";

    case 635:
      return "	Hao	He			Zha	Zhan	Yi	Xi		Xi	Fa	Yan			Mu						Gu			Gaan						Yun						Zhong		Chan	Chuang	Hui	Za	Gun	Jian	Ya				Xiang	He							Tang	Lai	Dai									Dan				Mian	Ning		Meng		Lie	Zhou	Pu	Tai				Ying	Teng	Guo					Qiang		Lu	Sa	Lie	Chi	Xie			Guo	Bao	Luo	Juan				E									He		Mei			Xie	Pin		Han	Chen	Shan	Hui								Ying		Jian					An				Ta	Yi	Tui				Liu		Zuo		Li		Pin	Xue		Nen	Dou			Lan						Zhan	Jue	Zhen	Ji	Qian		Han	Fen		Han	Hong	He	Hou				Zhan	Chou	Tai	Qian		She	Ying			Qin	Hang	Hang	Huo		Xi	He	Xi	Xia	Hao	Lao		Li			Cheng				Jun	Xi	Han						Dou		Dou	Wan			Dou	Zai	Juan		Lou	Chu		Zheng				Qi	Kan	Huo	Lai		Lam	Phong	Ha				Gai		Shou		Dong";

    case 636:
      return "			Lou	Tuan			Yu	Wu		Tian								Guo					Nanh	Tan	Qi			Chong				Lie	Li		Xun			Ut	Shuu	Geng	Ting	Han	Chu		Tun		Xiong	You	Mo	Chi		Hu	Du		Mu		Na		Ling				Ai	Xian				Kan	Si	San				Yi					Yi	Xiao		Zhi	Dou					Mai				Lun	Jue				Qiang	Ling							Pian	Cou	Duo	Yu				Zhuo		Xi	Huai	Ming	Tang				Pu	Y	Mi	Man		Guai		Qian		Lin	Min	Wei	Ceng		Hu	Sui			Ju	Sha	Meng										Wei	Xi	Ling			Bi	Wei				Li	Zhe		Yong	Hu	Wan	Ba	Jian			Cop		Zuo	Zhan	Bo	Qiu	Yang			Dong	Qu					Pi	Zhai	Beo		Shan	Gou	Biao	Yi	Fu		Xin	Shi	Tong	Cop		Ding			Tu	Xiao	Wu	Pei	Hui					Lai			Hum	Si	Cui	Sha	Zhou	Zhao	Wei	Lai	Bi			Dong			Nao	Xie	Rao	Tuan	Wei	You	Mei	Yuan	Zhong	Jeo							Sou		Gu	Shao		Zhao	Pi			Tong";

    case 637:
      return "	Chi	Peng	Chan	Yong	Shuang		Wu		Pi	Huan	Beo	Fu		Biao					Nao		Biao	Wei	Yong		Nao	Guai						Li		Xin	Yan	Po	Pei					Suo		Ren	Shan		Me		No	Suo						Dan		Men									Shou			Gan		Gou		Han	Shi	Yang		Gu					Ziu	Bui							Ke			Ju	Qua	Pai	Ce	Bao	Xiong	Cai		Fong	Lin	Ai				Mi	Lai				Xiao		She								Huo	Ni								Zheng		Lin	Zha			Yun			Xu		Fau					Cheng	Wo	Xi		Loi	Bei			Shang				Yu	Mi										Bieu	Dat	Buon	Cua	Cong			Duan			Cha	Faan	Ze	Cheng		Ting			Ci								Yi						Yao			Ku		Fen	Xie	Cheng									Kui	Jung	Xoe		Bin		Lou				Yi	Mi	Xie										Gui		Luo			Shan		Mua	Tau	Tron				Ju	Du";

    case 638:
      return "		Xian			Zhi			Bin										Vui	Chua		Zhi	Zhuan	Xue	Lian	Sui				Ban									Lan	Ju	Mian	Xun	Zhan	Gun					Khenh		Zhi								Cong	Bui		Wei	Quan	Chai						Ngheo			Reng		Yue	Vay	Zi	Zaan		Zaan	Luo	Gui	Mai	Cheng	Zhang	Ju	Tian	Wan				Zhi			Nan	Da				Han		Do	Do		Xi	Lin	Son	Lom	Yan	Xu			Huong	Tham	Hu	Gan	Xu		Xi				Cui	Do	Do	Xi	Hu	Tim	Tham	Tham	Do	Do		Yan									Yi	Chi	Jue		Zu			Ruot							Jiao	Yi		Tan	Chi	Ba	Tou	Zong	Qiu			Chi	Xi								Ni		Cu		Wu		Chu	Su	Yong	Ju	Ba		Ci	Di	Pan	Chi		Qiu		Yan										Zhai			Duoi		Xian	Beng	Kuang	Qi	Zhou	Ju	Qie	Mo	Yuan		Gui	Zui										Qie		Rao	Nhong			Day			Hu	Qiu	Hai	Fu	Lang	Sha	Xi	Bu	Shi	Yong	Guang		Nie			Hou";

    case 639:
      return "										Mi	Chay	Chay	Lanh	E	Xian	Yun	Xu	Qin	Dong	Leng	Qi	Lan	Fu	Qi	Chong		Lae	Cu			Mo	Bei				Dao				Jie	Chong	Chi	Yu	Cui	Su	Ti	Shu	Zha	Fu		Che	Fo	Hou	Zha														Jie	Zha	Zhan	Day	Day	Yan	Hai	Wu	Hua	Dian	Yao	Sou	Qian	Ji	Xiong	Qi	Jun		Hai								Yan	Jie	Cui		Tuan	Zhang	Piao	Lu	Zhi	Chu	Mi	Qiang		Lian							Li			Zong	E	Su	Jue			Ju	Tan	Liao	San	Dong		Za	Zhi				Xuan	Ling			Deng		Tron	Zhan	Xuan	Qin	Jiao	Pi			Han						Yu	Guo		Xun			Xun	Chan	Jie	Ju	Yan	Du		Hong	Xian	Xun					Ling	Jie	Yi	Qu	Gan	Feng		Jue	Qu					Jiu		Ji	Ji	Treo						Xi	Pang		Kuang	Ku		Ku	Zha			Ba	Chen	Nhac	Chen	Hu	Nu	E	Xiong	Dun	Sheng	Wan	Fen	Zong		Xi	Zi		Hu					Bie		Tuo	Ban	Ge		Ke	Nhon	Vet					Zhui	Fu	Mo	Jia	Tuo	Yu		Mu	Jue	Ju	Gua	Po";

    case 640:
      return "Ni	Long	Cuk		Wa	Yan			Buoc	Cyu	Dang	Say	Lanh	Dung	Lop	Den	Rong	Ngoay	Vo		Chou	Kuang	Hai		Xiang	Xi		Cun	Tong	Ruo	Leot	Duo	Che			Kei	Lei	Zi		Zheng	Zuo			Kang	Zai		Yuan	Qiong	Bang			Fa	Xun		Ji		Cha	Giang	Let	Nhong	Rao	Riu	Nho	Cang	Shu	Xuan	Xie	Ti	Han	Xian	Shan	Tun	Hang	Kun	Cen	Dou	Nuo	Yan	Cheng	Pu	Qi	Yue	Fu					Ting	Choai					Buot		Wo	Sheng	Tuo				Du	Long	Noi	Cuong	Ba	Dau	Lia	Duoi	Rao	Lan	Xech	Xui	Va	Ap		Tan		Ya	Zhi	Lu	Yan	Ju		Bon	De		Chu	Zu	E	Zhi	Peng		Bie		Di									Lai		Ye		Doc	Lom	Khap	Co	Ram	Ghenh	Ron		Hao	Pan	Tan	Kang	Xu	Zou	Ji	Wu			Chuan			Po	Yan	Tuo		Du		Pian	Chi	Hun	Ping		Cong	Zha					Wan		Re	Dam	Naam	Wai				E	Wei	Bai		Jiang	Cang	Giay	Nhom	Riu	Giay	Tot	Lom	Xam	Giay	Khoeo		Cha		Chu	Kua	Teng	Zou	Li	Ta	Sa			Pan	Pan				Sao	Qiao				Lin	Sin		Nhao		Zu		Zhi	Yan		Jie	Neng	Gwat	Chom	Ghech	Chuc	Xong	Lang	Nap	Let	To	Nhuc	Xung";

    case 641:
      return "	Dam	Lung		Luan	Qu		Deng	Liang	Chan	Qie	Lou	Die	Cui			Ji	Bac		Chao	Shuan	Zu		Kang			Qiang	Li			Chong	Dui	Tat														Shuai	Yu	Zhang	Lei		Bo	Sup	Sao	Dang	Sung	Dinh	Dao	Chui	Dan	Doi	Hom	Ghe	Giong	Lep	Sup	Mop	Xong	Nhon	Po		Toi		Lung	Zhe	Xiao		Tan	Cui	Lan	Que	Xu	Shu	Zha	Can			Bi	Peng			Zhu		Cheng	Nhap					Qiao	Ji	Bay					Zhai		Lan		Dua	Waa	Chung							Doi	Dung	Treo	Chom	Kheo	Lay	Lon	Sum	Vuot		Tian	Sa	Jin	Zhu	Duo		Cha	Juan	Tang	Beng		Fan	Lie	Zei	Sui			Choang	Cam						Se				Cui	Long	Dung	Quay	Dep	Loi	Von	Quan	Tuon		Zhi	Tui		Qing		Chuo			Buk	Ta	Bing	Wen			Po	Bo	Duoi	Ngoen	Giat	Veu		Cyu	Mo	Ca	Gac	Khieng	Kuang		Cuo	Rao	Bao	Lai			Leo				Nian	Li			Bai	Lui	Guom		Jiao	Lu	Li	Long	Gui		Du	Du	Chan						Lom	Xian		Chan		Xie	Zhan			Som			Shuang						Nhao	Khuy	Ngoeo	Chom	Ong		Mi	Luan	Luo";

    case 642:
      return "Dian							Laam	Die		Wan	Yue	Luan		Luan				Voc	Leng		Wai	Din	Nen	Shao	Xie	Pi											Mao		Yin		Bo		Zhu			Chong								Mu	Tuo		Tong	Ye							Huang		Ren		Ye				Pei		Tuo						Rinh		Minh			Zuan	Yu			A		Zhou	Wan	Lung	Minh	Ban	Duo	Zhong	Ha	Huang	Mian				Chun	Qie	Gong	Ting	Mei				Tang			Rong			Rong	Qi	Guo			Wu	Xiang	Tian							Xiao			Zhan	Cui		May	Lan								Lan				Shen		Lei	Li		Chan	Nie	Luan		Ting	Hui					Gong									Qi	Yu		Xin					Yue	Ba	Dai	Ji	Xuan			Jue	Niu								Du	Ji				Wan			Pa	Gong	Ben		Keng	Yang	Liu	Ni	Zha	Yin	Nian	Pao		Gong	Bu	He	Rong	Gui	Lip	Banh	So	Bi	Xi	Ju	Hun	Bi		Tiao	Zheng		Hong	Yi	Ci		Bing					Gong			Fa			Yang	Xu";

    case 643:
      return "Nhe	Hong			Zang	Chai	Hong		Tian				Zhi	Xing	Xu			Zhen			Wan				Jun					Wo			Lu		Zheng	Rong	Cheng	Fu		E	Tao	Tang		Juan	Chao	Ta	Di	Juk	Zong			Keng	Tui		Keng				Hon										Co	Rong	Yun	He	Zong	Cong	Qiu				Mu	Duo	Xu	Keng	Xian									Du	Kan		Ying				Zi			Jyun	Sau	Huang		Peng		Li		Bo	Ge	Ju	Ke		Hu	Yao	Tang		Qiong	Rong	Liu	Hui	Ji			Gwan									So			Zhi	Gwan	Tang	Zhi	Kang							Yang		Tang	Hong				Liang		Cao	Ngao	Truoc	Truoc	Nai	Zong		Deng		Jiao	Peng		Guang	Er	Jian	Jiao	Nuo	Zao					Peng	Dang		Qu	Lian	Mu	Lan					Fen				Hun		Nhe		Kuang		Yin	Shuan	Jian								Luo		Lu						Ge	Rang			Pin		Long				Zhen	Xian		So	Lin	Lian	Shan	Bo	Li							Xie	Ge	Min	Lian			Jue	Zhou					Ke";

    case 644:
      return "	Die		Zhe		Shu	Ji	Long	Guang	Zao	Xian	Qian		Shen			Yin	Jie	Ci		Shen	Shen	Sa					Xi						Ku		Qu		Ge	Ban		Bi	Qian					Cay		Bin	Ban		Zuo	Pi		Huo	Chat	Dang		Nong				Ban	Chat											Nong		Chen		Peng			Fu	Tu					Tren					Pi	Po			Chi			Xue	Qi	Wu			Zhi	Di	Cong	You	Lai		Muoi					Ting						Cong		Dem	Di	Zhuo		Zou	Cong		Jin	Pan	Yan	Qi	Rong	Jia		Zhi	Qiu	Yue		Shi				Hao	Muoi							Tuo			Bie		Kan	Dong			Chuo		Ci		Yin	Shi	Hai	Ruan		Yang	Chi		Ci			Gong	Mi		Ji				Chuon	Bach	Quanh	Duoi	Gen	Zao				Beng						Xin	Kuo		Die			Ting			La	Nghenh									Shui		Il		Dai			Lung	Ngot				Li		Yong	Jiao			Ta	Qu	Yin	Yuan	Jie		Qian	Yao	Ya			Qing								Pei";

    case 645:
      return "	Jau							Choi	Go	Suot		Co	La										Jia		Tou		Ti						Dun	Chan	Jia	Chi	Jian	Shu									Ta													Jau	Ke	Cho	Chuc	Dit																					Zhi		Yuan			Hu		Lie				Ze		Chu				Qiu	Beng					Ngok	Tren												Huan	Kua	Sheng		Jie		Wang				Hu		Sang					Ze	Zan	Yang		Chi	Jiu											Liao	Yu					Bian		Kuang					Mau	Roi	Quynh			Chou	Ya	Zhuo		Qie	Xian	Len	Yuan	Wu	Jiao	Xiang	Sha		Zhi			Chong		Bian	Wei											Do									Dao								Chau	Nhanh	Yu	Tui			Chao				Hui	Qian		Wei						Man		You				Cim	Dit							Di		Da";

    case 646:
      return "Juk	You	Jiu	Tui	Zan			Hui		Sha		Jiu	Huo								Yao			Duoi	Va	Xian					Xian							Zou							Di		Jiu			Nhanh	Hui		Kao	You			Li			Jyun	Chuan		Chi		Huo		You		Yue								Tit	Keo	Ta	Zan				Nie	Zhu		Suot					Chong		Lui				Xian				Xoang				Shi		Kou	Qi	Tu	Fan	Cun			Tun	Cha	Cai	Xiang	Pei	Jing	Qi	Shao	Niu	Na		Qin																Bi						Bi	Bao	Bian	Zi	Na	Wei	Hao								Jin		Zheng				Qie			Lap	Koek			Hao	Tong	Zao	Sheng	Cun	Huang	Ru	Zai	Nian						Juk		Xian										Quan	Ji	Yin	Li	Mang	Shao	Han	Cuo	Jun	Ji	Bu	Long	Fou	You	Kuai		Sing				Xiang					Yun		Qin	Hui	Pu	Gwan					Li	Pei	Shu	Ju	Yi	Zheng	Chong		Xi		Hu	Rou";

    case 647:
      return "												Huan	Qiao	Zhi	Ying	Xi	Qiao	Ji	Zheng	Huang		Yu	Zou	Mei				Sheng													Quan							Jiang	He		Tong	He	Wen	Yi	Pang			Weng	Qian	Li	Yi	Chuang	Xu	Wei						Ge		Yu			Zhai	Gan	Qian	Kang	Li	Shen	Guan		Piao		Gai	Li		Hu			Tu	Shun		Hu	Li			Lou				Dang		Zuo	Shan		She		Feng	Ju	Tong	Jiao	Qiao	Gao	Zi	Huang	Shan			Tan																				Tuo		Ling		Cheng	Weng	Zuo	Yu		Zhu		Qun	Xi	Qu		Ge							Qi	Xu					Gai	Que	Chou	Meng							Shen				Qiao	Can			Li		Wan	Lei	Xing	Lang			Shi	Zheng	Fan						Zhi					Yin		Li					Mo	Wei		Ying	Rang						Quan					Luo													Dai		Yin	Bi	Ge		Wen	Yan	Mian		Gang	Qiu	Zhi";

    case 648:
      return "				Jau					Tam		Gu	Tong		Ling	Ti	Ci	Yi	Fan	Po	Bi		Bao									Peng		Suan		Chuenh	Song	Wei	Xiao		Ji			Jau	Hao	Yan					Giam	Gay	Sua	Xoang	Yi	Zao	Ying	Nan						Za		Tian	Xi	Jiao	Yan				Choang	Dam	Miet		Nei	Tan	Yan	Tian	Zhi	Chou	Tao					Zha		Dan					Mian			Wu	Yin	Yan	Lao			Choang	Gay	Po		Hun	Hai	Mu	Cong			Ku	Chou		You				Zhuo		Kui	Sou	Giam						Yin			Zui	Sang	Liu	Han	Wei	Meng	Hu	Li		Mi		Bang	Jian											Que			Cay	Meng		Mu	Hong	Hu	Mi	Shai			Shang	Chao		Zhuo		Zhi	Nian						Ji			Ke	Zheng		Mien	Men			Dan	Liao	Zhan	Gong	Lao	Hua	Chuai		Jian	Kui					She							Chen	Tan		Hu	Meng	Pao	Zhan	Chang		Gan			Yi		Sui		Giam	Dau	Xu	Ji	Lan				Yi			Mi		Mie				Cuan			Lan			Yan			Mi";

    case 649:
      return "		Yong	Cang	Jian			Sou						Ling	Yan			Juan			Ve	E			Fen		Fen							Guang	Mai		Lie			Le		Chong		Li			Dam	Chong	Nhe	Zhi		Lei	Xie	Dam		Chou		Ji		Nhe	Nang	Pi					Jie					Zhou	Gei	Saan				Xiong				Kuang					Jam			Jing		Hu			Qian					Cen	Syu		Qi	Wan	Mao		Dou		Lou	Pik							Kou		Dai		Nao		Hong				Ping	Chao	Keo	Sa	Lai	Duo	Qian		Yin			Ci													Lou	Hui		Le		Fu	Mao		Zhou			Yong				Chi	Vo	Nen	Pui	Vong	Joeng	Jyu		Lao	Ji	Yi	Liu	Cong		Nan					Zan				Jin	Rang			Dou						Bua										Tun	Xiang				Bian	Chuang	Wu		Ju			Bong	Dan	Jing	Nhan	Gang	Gwan	Bit	Hok	Hang	Xie	Pi	Zhuo	Rui		Sao	Zi		Zheng	Mi		Zu	Qu		Chi		Zhi				Ming	Bing	Jin	Fan";

    case 650:
      return "					Hoat										Bo							Kam	Quan	Qian	Ya	Chao	He	Ru				Ju	Wu			Khep	Sam	Mai	Thep	Chieng	Zung	Che	Hai	Chi	Kuang		Cou	Ruan	Kuo	Chi	Zu	Jiao		Yu	Tu	Meng	Da	Shuo										Juk	Hung	Wai	Laam	Bui	Wun	Jau	Wai											Linh			Jing	Bou						Tin					Feng	Gou	Dong	Cha	Mao	Chan	Bian	Yu			Wan	Zu		Zi		Chuan	Wan	Wa		Quan			Wan		Xia			Mo	Jiu	Seoi	Ting	Ying	Jian			Wei	Ti	Sao		Qi	Sha	Yu	Ji	Dou	Chan	Tuan			Liu		Zhui			Hin	Jyun	Jan	Ken	Thuong																					Ruan			Yan	Gu		Li	Cha				Di	Liu	Zhan	Po			Bam	Lon	Ting	Chum	Choc	Thia	Sat	Gung	Zeon		Zan				Lou		Zhi										Ci	Loeng	Zoek	Gin	Soeng	Kau		Coeng					Hon											Cuoc							Ngou";

    case 651:
      return "	Lian				Luo			Ma	Dui	Giao	Mieng	Kwan	Duo			Jue	Li	Lan	Jyut	Ruan	Gu	Chan	Xu			Zhi							Keoi	Sin									Hoi	Fu	Zok		Sai																		Xue	Bo	Cheng		Zhu	Hei			Ban			Baang	Bay	Hei	Choang	Daan	Thuong	Choang	Die			Zhan	Guo			Biao	La						Thau		Co	Ngou	Jip	Jyun						Maan														Jin								Gai					Bung	Hom	Cun	Dam	Giua	Rua	Vam	Lap	Caan	Nhon	Thoi	Meng		Yu				Ban	Hou			Zim	Deoi													Xi		Piao	Si							Deng	Muong	Veu		Chuo	Di	Ji	Chan				Zhuo			Zan	So		Lai														Cai	Leoi			Jing	Kem	Hing	Wai	Am			Jiang									Jin	Hei	Zaam	Hon	Ngok	Jyun						Tou			Hing		Dang	Dui	Duc				Li		Gaam";

    case 652:
      return "		Qian	Jing			Chuo	Kem	Kieng	Zaap						Ta		Diao		Jian								Zhi	Jue	Gaan	Mo		Luo			Lai			Bao	Sung			Thiec	Jim		Zuan			Bou		Lom		Nen	Zhe			Yu	Gaam	Ben	Bao			Ma	Xi	Hu	Yi	E	Gu	Tu	Zhen	Mou	Qiu	Su	Liang	Qu	Ling	Guan	Lang	Tou	Da	Lou	Huang	Shou	Jiao	Zun	Gai	Wei			Kun	Duan	Song	Qi	Yang				Shi		Gai			Dao	Yao			Duon	Qian		Shao	Chang	Miu		Mo				Nao			Cong		Nie	Zhao	Cen	Dai	Dai	Song	Nie	Ci			Jun	Nhang	Shao		Zhu	Duo	An	Bi			Ti		Pi	Xia	Qiu	Sheng			Ngong	Tang				Man	Pian		Ti	Rong								Cong			Ji	Feng	Wu	Jiao	Lao	Zeng	Peng	Can		Nong		Chan		Duon							Man	Gui	Niao	Chong	Chan				Nang			Xia	Jiu	Ji	Zhen	Cat				Ting	Diu		Men	Yue		Zhong	Tun	Rui	Xie	Xi		Ting	Niu		Wang	Jian		Fen			Suong											Ngo	Bian					Yi			Die	Ji	Gan			Jian";

    case 653:
      return "Jiong						Kai				Que		Nan	Mou	Xu	Song	Shen	Kuang	Que	Wei				Die	Nan		Ruo	Gong	Dou		Nian			Chao	He	Yan			Cua			Tu	Bu		Hu	Yong		Shi	Chu				Bing					Xiao	Men	Li	Ti		Jian				Zhi	Gua	Guan		Qi		Fei	Yu	Zhe	Wei	E	Chan	Xi		Gu							Que	Hui		Xie	Ying		Ta	Wai	Fu	Jie	Pi		Cua		Sheng	Yu	Kua		Pi	Xie	Nue	Xian	Jian	Xu		Bi				Nan		Liang		Pian				Jing				Ta	Yan	Ai			Xiao	Qiang	Wu	Tang		Jun						Kuo							Lang		Neng		Cong	Dou	Shu		Jiao	Nie	Eun	Yu						Ce		Jiao		Hua	Wen	Ye	E	Guang	Hua	Jiao							Gwaan	Lei		Shang	Yong		Deng	Guan	Niu		Sui	Xiang		Sa	Chang	Muon						Run		Yun	Mo	Fen	Jian	Xu				Xi	Shu												Xie	Li			Tou			Mi	Chan	Huo	Cua		Zhuan	Yue				Cua					Lan		Yan	Dang	Xiang";

    case 654:
      return "Yue	Ting	Beng	San	Xian	Die	Pi	Pian	Mo	Ta		Jiao	Ye	Cup	Yue	Fau	Reng	Qiao	Qi	Diao	Qi			Han	Yuan	You	Ji	Gai	Hai	Shi		Qu										Wen			Zhen	Po	Yan	Gu	Ju	Tian					Ping	E		Pei	Ya	Lin	Bi		Bac		Zi	Hong		Duo		Dui	Xuan		Shan		Shan	Yao	Ran								Tuo			Bing	Xu	Tun	Cheng		Dou	Yi				Che				Dai	Ngoi						Lo									Juan	Ji		Zhao	Beng		Tian					Peng					Fu																	Tuo	Dau	Xian	Ni	Long			Zhuo		Zheng	Shun	Zong	Feng	Duan	Pi	Yan	Sou	Qiu	E	Qian		Qian	Gaai	Ca	Xun				Jyu	Jung		Zhui			Mao	Jiao						Zhan	Pi	Xi	Yan	Fei	Nie		Zhi		Suo		Yi		Lei	Xu		Yi			Wei			Ji	Chen	Die		Fong										Yuan		Xi		Liu	Suo			Luong	Xo		Ven			Beng	Xia	Yan		Cui	Geki	Kang			Qing	Lou	Bi";

    case 655:
      return "								Zhan	Cuan	Wu	Xu	Chen	Hao	Jue		Chen	Cha	Chan	Zhi	Xun						Be									Ge	Chen	Ye					Chu	Qu	Xie		Zhan	Ken		Jue											Nho	Qu		Meng	Ye	Zou	Pu		Shi					Shu	Chan			Du		Guo	Lu	Yan					Niao	Bin								Tui							Ni	Huan	Qian							Xia			Ling					Lian		Yi		Li	Si			Dai			Wei			Ci				Jiu	Hong		Yu		Kui				Hang	Ge	Fang			Kui			Gui	Chi			Jiu			Sui			Die								Sui				Qin				Gui							Zhui			Tiao			Yue				Lok		Zui								Wu	Cui											Zhi					Shui		Dong											Wei																		Chong";

    case 656:
      return "											Run											Ji						Diao		Cang		Kou			Wei				Can			Ma	Ou							San	Song			Wei						San			Jin													Wei																		Cai	Li							Loi									Yue		Nhom			Yun		Ngat	Cheng		Jyu	Shan						Con	Ngut	Hu	Shai	Tun		Fou		Qin	Xu		Gan		Chuan	Fu	Che	Ram	Bung	Yi	Dong	Fu	Fu	Ze	Pu		Ling				Shai	Pao	Mu	Day		Yin	Luo	Hua	Yin	Beng	Yu	She		Xie	Chu				Jau	Dou	Ji		Rei	She	Dian	Set			Yi		Che	Geng	Long	Ping	Yun	Yan	Mo		Sui								Jing		Song	Pang		Ya	Se	Duo			Chuang	Xie		Tuan	Gong	Xuan		La		Ling		Dai	Zha			Kei	Pui							Yin	Song		Yu	Tuo	Tuo		Bong	Ba	Ran	Bo	Dai		Zha	Hou				Hui";

    case 657:
      return "					Lu					Ling	Ru		Cau	Mua	Bung	Gong	Nom	Um	Rop	Xang	Dan	Meng	Xia	Weng	Han	Zi	Zhen	Se	Cuo	Li		Dian	Lian	Gou				Peng		Guot		Ying		Hou		Dui	Wu	Set	Dong	May	Tanh	Bong	Nap	Xoi	Piao	He		Long	Mo	Fei	Lu	Ze	Bo	Dian	Mang		Zhuang	Lu	Pang	Dui	Bu					Chen	Man									Xi		Toc	Sam	Doi	Fung	Rang	An	Zhong		Nan	Tuo	He			Dui	Wan	Zhong	Cen	Li	Shuang				Cen		Si		Dui		Hun					May	Rau	Zyu	Jian	Nong	Dan	Fu	Huo	Hui	Ci		Yong	Sa	Ting					Rao		Rao	Liu	Rop	Sam	Suan	Ling	Man	Dian				Pao		Ling		Ling	Li		Nou	Mong	Rao	Am	Lie	Shan		Fei		Fung		Mit	Shan	Mong		Ling	Zhan		Bin	Li		Lo	Si	Rang	Jian	Zhuo			Ling	Ling	Meng	Khuya	Shuang					Ling	Mu	Sam	Hun						Loa	Ling	Jian	Qu				Nong	Jing	Chen						Zhen	Qing		Qing	E		Xanh	Se						Bei		Fei			Fei	Fei					Fang	Ku					Za	Hui		Fei";

    case 658:
      return "	Dui	Bay				Pa	Niu	Pang	Dan	Dan	Ai		Tian	Chao	Ao	Mei	Nan			Bo	Yu	Xian	Mai	Mat		Ping		Dui		Dao			Xing	Ni	Han	Chu	Shua	Man			Na	Tran		Wan	Yi	Diao	Yan		Wo	Suan		An	Lan	Nan		Qiu	Mian	Nuo	Can	Can				Lan	Tian	Ye		Nian		Shua					Ci		Jian			Gan				Jian	Guo		Zhan		Luo			Ji	Gui				Jia	Ji			Xuan		Feng				Bi	Qi			Yuan	Ang	Di			E	Fen			Ju	Ni	Tuo		Shen	Fu	Xia	Qu	Po	Wan	Ling	Ma	Zhou	Bao		Yu					Beng	Mai		Jia		Yang		Kua	Jiao		Bing				Luo	Gui	Duo	Zhi				Zhen	E	Zhu	Ba				Zhen	Feng	Dou	Nian	Bu	Dui	Sha	Se	Bi				Zhi	Zhe	Bu				Jue	Xun		Hia	Don	Xi		Zhuo	Bai	Yao	Chou	Ta	Qian		Nao	Yu	E	Jian	Yi	Xiao		Nie			Bing					Guo	Xie	Diao			Ju	Suo	Die	Fu	Mian	Shi	Xuan	Ti	Yu			Xie	Fu	Zhi	Ni	Xuan	Yang		Feng	Zong	Zhou	Xuan				Zhu		La		Ying	Gao	Kuo		E	Wei	Mei";

    case 659:
      return "		Giay	Huai	Chou		Suo	Ta	Suo	Ta	Xue		Gong	Jia		Bo	Ta	Yuan							Ta					Chui			Xiong	He	Suo					Mo	Chong	Sui	Ze	Lu	Zhang	Luo	Xu	Jian	Shan		Xu												Jiang				Bao	Mai		Tong	Xi			Rong		Sheng	Zhou		Jian	Fu	Deng			Yong	Ju		Yi	Bang		Se	Sui		Duo	Xie				Huan	Roi	Dep		Ru	Ni	Zhou	Gui		Luo								Zhi	Xu		Zhi		Jue	Ju			Yuan	Lu			Bo			Rong	Xie						Xi	Luo				Ge			Zuan	Han		Jiao	Sa	Qin	Qun	Pao	Yue	Che	Fu	Pei			Mei			Tao		Ken	Xi						Duo		Yi			Sui		Xia	Juan		Wei		Yi		Yu		Bai	Tuo	Ta	Pao				Bing			Yun	Yun	Duan	Ruan	Wei						Wei	Gui		Da	Xia			Hun	Juan	Sui		Sui			Lou	Bai	Yu	Zheng	Gui		Kui	Gao	Dan				Xian	Zhai	Se		Ke	Bu	Bo			Sui	Via	Yu	Bu	Jiu	Jiu		Juan	Jue		Na	Zhai	Tao	Wei";

    case 660:
      return "Xia	Xie				Sa	Ji			Xie			Dui	Zi											Yuan	Qin	Fu	Peng	Pao	Wan	Yin		Hong	Zu		Gong	Dong	He	Wo		Pang			Su	Kan	Nie	Hao	Feng	E	Ye		Wan	Ting	Dong	Zhe	Sang				Mo	Su		Le	Hoeng	Pu	E	Zhuo	Ye				Xiang	Guang	Ren	Ling			Ao			Chai		Duo	Qiong	Ku	Xu	Huan	Yao	Zhen	Ting	Beng			Ang		Kan		Ku	Pei	You	Ao	Men	Mo						Fu	Qing	La	Dou	Tan			Qian	Yao	Wei	Hu	Mo	He	Xuan		Bi	Po		Di		Zhen		Shi	Kan	Ce			Xu	Zhen		Zhu					Hui	Chi			Hong	Nou	Nie	Yan		Chong	Fu	Guang	Qi		Gen	Ting				Tan	Qian			Jiu	Xu	Qi		Zhen				Qiu		E			Hui	Hong	Qing		Che			Fu		Hong	Xi	Wu	Mang			Ti			Hong											Bo		Qin	Gen			Fu	Kui		Wing	Kwai	Ngup	Mang	Bie	Jing	Kan	Gui		Gao	Xu	An	Yue	Wu	Yi	Jing		Lu	Quan	Tui		Ji												Jiong	Jue	Pie	Kun";

    case 661:
      return "Wai	Hui	Dun	Yuan	Jie		Gui	Gao	Po	Men	Zhuan	Hang									Yong	Qiu	Lei	Lei	Ang	Pi	Weng			Qin		Qin	Mie	Dou	Mi	Zhan		Qing	Yi								Ban			Juan		Ze	Xu	Lan	Ma	Ma	Ou	Bei		Pou	Xu				Ao						Hong			Hong	Zhan		Sen	Gao		Po	Liao					Wai	Xuan						Kui			E	Han	Se			Dan						Xuan		E	Gai		Dao		Meng	Yi	Ning		Pin				Cang					Yuan		E	Nie			Yin	So		Qiao		Hong	Ling		Chan	Ying					Guan		Niao	Xu	Tan	Jin				Peng		Liao	Laam		Bei			Xin	Tun	Chao	Gan		Hu	Wang		Vuong	Fu	Pei		Nao	Xun	Xue			Liu	Ling	Xue	Qu	Hao	Yi	Han		Fu	Ba	Yi		Bo		Mat	To	Hong	Li				Sa	Xi				Shi	Piao	Hua	Yi	Bo	Bo	Nei	Qiu		Geoi	Wei	Che	You		Wei	Hui	Sa			Tao	Hong	Sou	Han	Pao		Fang		Liu	Zhou	Pi		Li			Chui	Xi	Zheng		Beng	Zheng	Sui	Yan					Qing	Wu	Liang";

    case 662:
      return "Zhao	Liang			May	Jie		Hong	You		La	Hou		Yuan	Hong	Ye		Ying	Xuan	You					Quan				Tang	Suo		Li	Sou	Li		To	Yu			Yi	Dong	Thoi	Giong	Hay	Thoi	Xiu	Ao	Tuan	Su	Shuai		Yu		Feng				Su	Tui	Yu	Zheng	Zheng		Tao					Liu		Cheng	Sui	Sao			Gio	Gio	Gio		Gu	Feng	Lie	Piao			Bao	Li		Long	Chu	Xiao	Hong	Xie	She			Long	Hou	Xuan	Feng		Ba	Bo	Tao	Su	Zhao	Biao	Sou	Tui	Suo	Xiao	Heng	Sao		Fei	Lieng				Niu	Mang	Bong		Bay		Huan	Zhi				Yi		Yu			Yi	Yue	Chi											Nhu	Yin	Niu	Rong				Na								Tian		Ba	Thet	Qua		Co	Er	Zheng	E	Pou	Ji	Ni		Jiong	Jia			Gan				Ling		Zui			Bei				No	Qua	Banh	Shu	Yi	Pai				Nao	Shi		Man	Shi		Ti							Gong				Doi	Lei	Bao	Yuan	Zuo	Lang	Xiu			Zai	Cheng	Jian	Mao	Jia	Yu			Yu	Yi				Mang	Zai		Zhui	Ti	Bua	Moi	Xi	Ju	Zan	Lu	Tao";

    case 663:
      return "Zhui	Ling		Ju			Ji	Juan			Zi		Yue	Dong					Nang				Chong									Ang	Mam			Geng		Bo	Ding	Wei			Nhay	Moi	Quan	Ke			Pi	Kan	Fu	Yong		Tuan	Tou	You	Yao		Ye			Yan										Moi	Xian		Ti		Sui				Ci				Xu	Wu	Can	Yu			Chan	Xia		Kao	Cang	Cha	Qiu			Da		Su			Hua															Wu	Yuan		Nuoi	Chan		Jiang	Xiang	Zhai	San	Mo		Shang	Cao	Sui	Chuang	Mi	Zhu	Chong	Ji	Chong														Lian				Mem	Hai						Dun	Xiang	Cheng	Shang	Li	Huang			Deng			Liang							Za				Huo	Lin			Du	Han	Yong	Yuan	Guo	Ling		Lian		Ao	Dang	Yi	Nong	Shan		Xin			Da	Yu	Can	Wo	Cha	Bo		Jian							Meng	Wei	Mo	Doi	Bo			Shui	Jie	Shuo	Huo			Chuo	Soi	Long	Huai		Tuo			Yu		Duc	Chan	Yong	Huo		Lan	Nang	Nuoi			Na";

    case 664:
      return "Ba	Gan	Yi	Jia		Da	Ding	Xun	Ren	Juan	Tuan	Xu	Song		Cao	Cheng	Sau	Ding		Gat	Mao				Ngoai		Hai					Wu	Cui						Qi	Guc	Ji	So				Oc	Kui	Wei		Chui		Chui	Cui	Choi	Shou	Fu	Noc	Tuan		Bie		Tan	Hang	Pie				Yu	Tan							Thom	Xiang		Xiu					Weng	Hai	Peng	Yi	Cau					Lung	Tan		Bie	Xiang			Yi			Piao	Huan	Mu	Ba		Fan				Ding								Fen			Jie				Suo						Wan	Ge			Fen		Tuo		Wen	Gua	Duo		Zhe	Ci	Yao		Ban	Bu	Mo		Po			Ge			Liu			Ran			Juk		Giong		Gan		Hu	Mou	Lua		Xiu	Huang	Fu	Hui	Sai	Qu	Jie	Tuo	Yu	Mo	Zhou	Jiu		Shu	Kuang	Qiong	Lie	Fu											Xu							Ngon					Lin		Nie		Pi		Fu	Bu	Yi			Bo		E						Zhe	Hang	Li			Tu	Da		Lu	Yan	Dong	Qie	Wan	Ming	Zui	Fu	Qu	Ben	Ao	Qiang";

    case 665:
      return "	Qun		Aa		Geoi			Que	Hua	Xian	Kun				Cui			Yi			Biu	Chi	Zong	Nao	Cheng	Duan	Yong	Zhe		Tan	Yang	Xie	Xuan		Duan	Shua	Xian	Xian			E						Jing			La						Wei	You	Yu			Ti		Jin		Tang	Qi		Dian	Tao	Lu	Zhan	Wen	Ji	Ao	Ou	Qia				Shi	Ta			Mo				You					Zi			Zha			Yao							Fung	Chong	Li	Yu	Chan	Yi			Chi		Li									Tu		Zu			Xian					Xi		Bie	Han	Qi	Sang		Fei		Shan			Mo					Huan					Sing			Bang	Yu	Yu		Ji													Kuai	Zong							Xian	Meng									Li	Zhi	Fan	Lie	Cai	Du	Guang	Xiong	Li	Qi	Ruoi		Jue	Tuo		Ju	Xiao					Qu				Zhuan					Jue					Jie		Zhou	Xian	Long	Yang	Ran	Yi	Lie	Bo	Hun	Ji	Dong	Zhou	Quan	Jie			Li		Ju	Wan	Ben			Bi";

    case 666:
      return "Ge	Chun		Qian	Sou	Wei	Cheng	Lou	Yu	La	Qian	Dian	Ta	Zhan	Ji	Fan	Lie	Ting	Ji	Qian	Hu			Yu	Qi	Yu	Wa		Ba	Qi	Sa	Qiao	Ya	Xian							Ci	Fan		Kun	Gun	Que	E	Qiong			Ma	Ku	Yao			Que	Chu	Jia		Zhu	Kheo	Dui	Wa		Nao				Yan	Tong		Song	Kuai			Xing	Gun	Ping				Yu	He		Zhuo		Song	She	Yu			Ji		Qiang	Shui	Chuo	Zu	Leng	Ni		Wa	Zha		Dan		Veu	Xuong	Xuong	Xac		Du	Bian	Jie	Qia	He	Chong	Yan		Yan				Song	Teng	Yao		Kao	Hom	Zhui	Gui	Ai	Hai					Suo	Xu	Biao		Feng	Qu	Mang		Guo						Bi	Jue	Chuang			Pu			Sun	Yi			Qian	Yi	E	Ling		Bi						Huo	Mo			Xun			Yan	So			Li		Tan			Cut	Luan		Kai	Mao	Xiao					Ai			Ta			Mei		Guo				Gao	Nao	Hao						Chot					Que					Cao	Sao					Pi							Xie	Xiao	Ju					Cheng	Nao";

    case 667:
      return "Nei					Jim	Gay							Mu	Jam	Shao		Dian			Ling		Zhen	Yao		Fu	Qian	Qiong	Ju	Bing	Mao	Zha	Tai				Chong						Bop	Zhai		Shi	Yong		Qiong	Dao	Ti	Zhui		Yin		Nao	Bo	Kuang	Zhi	Duo	Cong	Bao	Ya								Cop	Li			Ju	Wen	Lie			Wo	Shi	Niao	Mang	Jiu					Xiu				Xui	Wo		Dao		Xi	An	Da	Zong	Han	Chui	Bi		Dong		Zhang				Ya			Di	Huo		Quan	Rau	Min		San	Fu		Bao	Ke	Mao	Re	Zong	Qia	Xia	Sou	Xiu	Na				Man					Zha	Chan	She	Wo			Quan	Xom	Ai	Bang	Hao		Sao	Suo	Ti	Ya		Bing	Rong											Sha	Weng	Ria		Ao		Zhuang		Piao	Sui	Yi	Sou	Dou	Sou	Luo						Chop	Toc	Rau	Gay	Fei	Zun		Nao	Deng	Zhi	Cuo	Liao	Ji	Bo	Cong	Cheng	Bu		San	Zan			So			Jiao			Yao	Lu		Can										Ni					Ban	Mon	Xoam	Jie	Pu	Zhuang	Zan						Soi	Li			La";

    case 668:
      return "Chong			Zhan					Nheo					Bian	Weng					Hong				Pin		Se					Ni	Fen	Xu		Shi		Ju				Jue		Yu		Guo	Guo		Hu	Jing		Li	Xie	Er	Yuan	Hai			Jing		Ke		Zong	Fei		Peng	Geng		Jian	Ni		Xian	Li	Chao		Er	Geng	Yu	Hu	Fei	Ao				Er					Ke	Ku	Bo			Ye	Jiao								Chao	Geng	Ru		Yue		Lin					Yu	Yue	Zhai	Xiao			Mie				Gui	Jiu		Tuo			Xi	Wei	Zhuo	Wei	Kui			Mei		Hao	Hang	Fang	Niu	You	Hua			Lang														Zhu	Gui	Bi	Jia	Tiao	Troi	Lu	Kong	Zui	Ling	Qi		Zhu	Jung				Gu	Zu		Yang	Su		Kui		Chang		Yao			Yu							Shu	Lai	Yi	Dou		Ranh		Wu	Ying	Fu	Zhuan	Fu		Su	Li	Yao	Tui								Gui				Lu	Yan	Qi	Lang	Zhu		Gui	Hu							Jing			Chi	Troi	Que	Ju	Zha		Miao";

    case 669:
      return "Zhu	Gan	Xiong	Ji		Via		Shai	Mei	Yun			Gan	Shou			Lu	You	Jiang	Nuo					Ju	You	Troi		Yi	Teng	Wei	Che	Lin	Gu		Li	Liao			Jiao	Yang	Biao	Qi		Via		Yi			Bin	Meng	Cha		Gan				Qu	Di	Lei			Mit		Ling			Troi	Huan	Qu		Luo		Kui		Gyo		Qiu	Yu	Hua				Lei		Ren	Xiao	Si			Du	Bie	Ca	Chai	Thien		Niu		He	Pei		Fei	Mu			Fu			Hu	Wang	Sha		Jiao	Wu								Fu			Jau	Tom	Tre	Ngu		Bing	Zhu		Zhu	Chi		Shen	Hu	Bu					Ran								Mu		Li			Jia		Chinh	Ma	Buop		Meng	Mou	Zhou	Xian	Hui	Guai	Jiu		Mu	Chay	Ru	Si	Wu		Ru		Zha																Nuo	Xie		Jiang		Goi	Hung	Liet	Giec	Thu	Li	Shu	Yi	Di	Qing	Ju			Zhi		Lang	Bu	Kuang	Yi		Bo	Giec												Chi						Jiang		Wo	Xun			Vay		Tun	Mang		Fang	Zhuo		Qia		Ta	Qi";

    case 670:
      return "Peng	Bie	Fen	Tu	Hua		Jip	E				E			Ding		Ru						E		Quan						Yan	Si						Ying	Ni	Ni	Yi					Leoi	Bong	Chuoi	Go	Ghim	Sua	Moi	Tre	Chinh	Nham	Roi	Thia	Mi					Ye	Po	Cou		Wei		Hai	Ying		Ting	Zhi	Fei	You			Kui	An	Ba		Han													Nan	Nai			Jing		Thu	Wei			Dyun	Nau	Me	Tep	Kho	Chay	Mu	Tuoi	Tranh	Chu		Suo	Tao	Qi	Tang	Wei	Gan	Giec	Ge		Han		Na	Ge					Zheng							Ngo	Giai											Ta				Si		Ni	Sang			Bon	Chach	Trau	Sat	So	Thon	Chay	Bong	Vay	Bon	Xie	Zeoi			Zu	Yu	Ni	Qi			Shen					Gay		Bu							Sung								Kun	Li		Gua		Mam	Lep	Sop	Dua	The	Tram	Yan	Bu	Jian		Wu	Cen	Lin	Zhuan		Hui		Tong	Zha		Hei			Guo										Jing				Die		Ying	Dai	Cheo	Vay	Leo	Zhi";

    case 671:
      return "Vay	Ro	Wei		Ji	Rong			Ao	Dang	Luo	Ye	Wei						Qiang							Ge	Ji								Vich	Go	Tram		Zou		Yi			Zha		Lie			Ci				Ye			Duoi	Duoi				Zhan				Chou	Biao					Xu	You		Sau	Lui	Su		Xie	Wei	Li							Ruoc	Quynh				Bo	Jian	Chan	Kun			Qing			Sau	Luon		Shuang	Xi	Qu							Luo			Dang	Nian	Li		Ba	Nheo	E	Fu	Fu	Hun	Zha	An			Qiu	Chou	Mian	Xun	Tu	Ni	Hu	Shu		Xu	Zhong	Kang		You				Xiao	Xiao	Ci	Chi		Diao	Yi		Ding			Han	Wan		Yi	Bao	Yi					Xun					Xiang				Tri			Bi			Jie	Ge	Ze		Zhen	Hu	Xi	Xin	Xiao	Fu	Zhong		Mao	Xin	Qiang				Fen	Ban	Huan							Jiao		Bao	Ya	Yao			Mao	Qua	Khuou	Xi		Ju	Caa	Qu	Yue	Tai	Tou	Mo	Zha	Qu		Fu	Khuou	Qu	Chi		You						Mo					Ti			Wa			Tuo		Chu";

    case 672:
      return "	Ge			Chim	Qua	Se			Ge	Qu				Sa	Ju	Bip		Die	Yi	Shi	Yi		Gui	Jiang		Song	Qiong		E	Huang	Hui	Xun			Ju		Zhai	Chi	Lao		Qi	Xiu		Hui	Tong													Fu			Xun	Jie	Mi	Yu		Diec	Chien	Ket	Sac	Hau	Song	Zhuang	Jiao	Zhi	Cheng		Jie	Xiao	Chen	Li	Yue		Zhi	Lao	Wo	Qu		Wang		Yi	Yi	Lang		Tou	An	Jue	Yan				Ju		Zhen		Zhi	Mang				Xiu			Chuang	Chu	Tra	Coc	Coc	Qua		Qiang	Fei	Chang		Mian	Su	Ao		Fu				Wei	Zhi	Min	Chang	Yan	Yu		Fu	Ta	Ji		Fei			Hu	Ju		Yu						Qi	Mei			Bie	Guo				Ming		Wan	Wan							Co	Go	Gie	Vac	Co	Cun	Jing	Yu	Xian			Chun	Ji		Xiang	Pen	Fu				Liu		Sai	Xue	Zou		Jie			Zhan		Yu	Yu	Mei	Miao	Mao	Duo	Fu						Cha		Jian						Hung					Miao		Ao					Ke				Hau	Cha	Jing	Ga	Tra	Hou		Jip		Gou		Xi		Rong	Ge";

    case 673:
      return "Pan	Yuan	Xia			Sha	Pi	Fu	Qing	Yong	Qu		Gong		Ge	Xian		Su				Ban	Qi	Hou				Xi		Wu	So					Huk	Sao	Cut	Choe	Hich	Sao					Qi	Hu	Gui		Di	Shang	Mai	Min	Ji	Xi	Xian	Ji	Chang	Kou	Chong							Zhang	Piao	Su	Lue	Li	Meng	Chong	Tian		Ling		Chi			Mok						Chong			Chi				Niao		Yong					Ken	Vac	Cuoc	Choi	Ri	Sam	Quach	Vac	Yeng	Tu	Mi		Shu		Xi		E	Zi			Jie	Ji	Hou	Sheng	Li		Qi		Zhou	Si	Qu									Xie							Aan	Si				Si				Xu					Fu			Yeng	Dui	Khuou	Tu	Vet				Keoi				Nong	Ya	Liu	Jia	Gui	Kui	Chi	Can	Chu		Guo		Dan	Loi			Jian		Dang	Hou		Kou		Chu	Qian	Ai		Pi	Cui	Nong	Qua	Quam	Cuong	Sao	Xun	Jing	Meng		Bin	Lan	Gu	Chou			Yong	Gua	Yu	Zhou	Juk									Bo	Ngan	Chich	Cui		Cai		Liu	Bu	Luo	Jie	Zhen	Mie	Guang		Jia		La";

    case 674:
      return "Shou			Guo			Meng	Qian	Lai		He	Tuan						Hui							Hong				Lu			Jia	Jing					Gui			Yi	Huan							Luo			Lei	Jue				Guan			Quan	Niao		Nhan	Man			Yun	Wen	Chi	Chi	Zhi		Ci	Zhuang	Hua	Jie	Qu	Tu	Min	Mei	Yu	Ao	Ban		Pi	Zhen	Lu	Chi	Tou		Jie		Zhan						Jin	Lu		Muoi	Jian	Tan	Chang	En	Ci			Wai	Cou	Kan		Bian			Muoi				Wen			Qian		Man	Man	Gan			Hui		Gan	Mam	Ji	Gan		Huai				Si			Fu			Leon		Pi		Ca					Ben			Sang			Shi			Huan		Gui			Ou			Lin					Leon	Pao	Syun	Ying	Ting	Xiao		Zhu	Leon	Yu		Gwan				Jian			Qu	Wan	Kun	Zhui		Yu	Guo	Ping	Zui	Zu		Zhu	Nuan	Zhu					Piao	Mi					Bi	Su		Zoeng		Pu	Mi									Ye	Yu		Yu		Zhu			Ling							Nou				Ling	Buk";

    case 675:
      return "Liao		Tuo		Bi	Na	Qu		Pi	Dou	Nie	Tun		Ji		Ling				Ku	Su				Tou						Nai	Ze			Tong	Ge	Dui			Jie		Tian	Tiao	Chi	Qu		Sha		Bo	Li		Luo		Liao	Shu	Deng		Chi	Mie		Tao	Hun		Nie		Jun	Hu		Lu	Ye		Mo	Chao				Suo		Ke	Fu		Chao			Suo			Qiu				Su		Yun		Suo	Ku	Bo		Lou	Mo		Lian	Xuan	Suo	Man	Bi								Ti		Lian	Tan	Shan		Qu	Du	Huan	Sao				Kuang				Nie		Nie	Luo	Zuo	Yi	Xian	Chao	Tie	Lai						Shuo		Mi			Mi				Wan		Ben	Qiang		Mo			Liu	Wo		Mei		Tou	Waa		Mu		Mei					Zuo		Tun	Kang	Tun				Che	Zheng		Chong	Tian		Zhi	Chan	Chan			Qing	Tun	Hui	Que	Zhan	Jian	Chan		Huang		Hui	Chi		Huang	Heng	Yun		Tuan	Bian		Huang	Yun					Mo	Gong		Gong		Gui		Chan		Que	Rui	Kuang	Piao			Ru				Niu	Hu	Jin	Ni	Bao		Ni		Bi	Hu	Li			Zhu";

    case 676:
      return "Na		Quan	Feng	Bi	Li	Bie	Nian	Dong			Lian	Ni	Lian	Ma	Zhe				Jia	Yi		Long		Yi					Dai	Du				Si	Yi		Tai	Hang	Shu					Wan		Su	Yao	Er		Zhen		Zyu						Dou	Jian			Si	Pang	Hui		Cha	Shan	Lu	Wei	Yu		Yan	Wan	Qiao	Luo	Yu			Tu	Wei	Ngam	Tun			Hun	Ben	Qie		Jin	Lai	Mei	Zhi	Yu		Ci							Ye	Die	Cha	Dian	Man		Deng	Wei	Nian	Lei	Bing	Wu		Zhen			Rou	Wai	Mi	Jie		Hou		Zhai	Ru	Zi	Pan		Mo		Mi		Qi	Mo			Zhi	Ban		Mie		Lu		Qi	Chong		Li	Yi		Tham	Deng	Cuo		Dui	Ma	Yan		Zeng	Yan	Dui	Pu			Yue				Huo	Mai	Jian	Nong	Qin		Qin			Ye	Ngon	Tai			Ngom		Jian			Cha	Trui	Dan	Teng	Li			Niang	Chan	Zang		Den	Nghit		Yu		Zui	Bian			Chu								Ran		Ran	Yang	Bo					Cu									Tranh	Sam	Mi		Ke		Cu							Xi		Ma		Shi	Dian			Shi";

    case 677:
      return "		Ding	Jiong		Yuan	Gan				Hui	Ji		Peng		Deng		Beng			Pang	Ta		Yuan	Gao	Yuan	Dung					Jia	Trong	Boi		Kong			Dong			Xian	Qi		Sang				Yin			Long			Teng	Long			Ren			Yin	Ping	Pu	Yuan	Rong		Fang				Hang	Mi	Hu	Zi		Ling	Jiong	Rong				Ping	Guang	Er									Cu	Jun								Xiu		Er	Ti		Yang		Ai	Hu	Xi		Hu		Si	Li		Yi	Gu		Tang							Que	Zong	Li		Jiao			Fan	Pu	Si		Jie	Lu	Li	Chan		Yao					Hui				Hou	Dian	Qiu	Jue		Pi		Seo		Kui			Xi	Ti			Xu		Mui	Mui	Ngui		Bian			He	Lian			Su	Liao			Ngay		Jin				Hit	Li	Chan			Qi	Qi			Zi		Zi		Qi		Qi	Zi		Zhai	Zhai	Pa		Ju			Yan			Hang	Na							Yan		Zhan	Shi	Zhi					Zha							Rong	Zha		Yi	Ming	Ya		Zhi		Kuo	Xia";

    case 678:
      return "Pian	Ta		Yi			Xiu	Zhai		Duo	E		Loi		Yin		E	Suan	An	Cuo		Tuo		Tuo	Xia			Chuo		Suan								Ji	Qian	Zu	Zhai	Yun	Zhan		Yi						Ya	Yue		Rang				He	Qia				Cha					Ou					Hu		Yan		Qie	Bo	Qiang	Jie												Ni			Chan	Qin		Zao			Yin	Xie		Qi	Jian			Xu		Zeng		E				Zu	Yi					Zhi	Li			Li	Yin			Lian		Chan		Jue		Za							Zhai	Pian		Long		Long					Long		Trong			Long			Long		Mang		Trong	Zhe				Gwi			Gan	Gou	Ran	Cu	Jiao							Bo		Zhu	Qiu	Yang					Xiao		Hui	Qu		Rua		Rua	Ling		Yin				Pi				Lian";

    case 679:
      return "														Qiao																																																																																																																																															Duo																																																	Jian															Ji";

    case 680:
      return "Ku															Yan																Zhen		Sa																		Che		Lun			Hu					Dang			Qiao			Mai					Bai			Yan				Zhan												He			Kui																												Lai														Sau				Lan				Laai		Shu			Chuo											Lan														Luan																								Dong												Hun																																									Lou";

    case 681:
      return "				Bai																			Liao			Lin																																																																						Reng											Shuang					Ning															Du																																																																	Ying																								Ju";

    case 682:
      return "							Tui			Song													Jue																Lun		Ya							Qu						She	Yan		Tuo														Lou							Ying										Yan			Nie																													Fen																									Qiao												Yong	Qiang																						Yi																								Long																					Li																						Chou	Ji		Xian";

    case 683:
      return "																										Pin																																																																			Wei					Chuang					Mi								Guai						Liang									Xian					Can								Xiao											Jue																													Maan			La																					Shan";

    case 684:
      return "																																																						Fei																																															Fen																		Bei																							Ji						Li							Ji																			Fei																															She";

    case 685:
      return "																									Cuan																						E																																		Xiao																		Xi														Li																			Shi														Luo																																																											Qing																																																Zan		Wing";

    case 686:
      return "																					Xi																				Hui																							Yi																																																			Zhu						Ta																																										Dao							Lung			Qiao										Cang		Nu		Nong		Yin																			Cong																								Du										Kun								Gui";

    case 687:
      return "											Bi																																																																																		Boi													Zhang			Jian	Lu						She			Yi																													Xu														Xian				Lu																		Pin																		Ya																																	Pao";

    case 688:
      return "												Shi							Min																					Jian				Chu		Dang																				Ba																													Zhuan		Li																	Wu	Wei				Shuang												Min			Gui		Fei														Ai			Su																																						Sa																								Jiu					Kou";

    case 689:
      return "																									Jiu	Hu	Jin	Mao	Diao	Bi	Shi	Huan	Dong	Fu	Nong	Da	Li	Jie	Yan	Chi	Fan	Sang	Li	Xie	Fu	Ting		Bang	Se	Mu	Xi	Lu	Beng	Qiang	Yi	Xun	Zui												Ji																		Fen																						Pin															Lian																			Ni														Be																																																											Laai																		Gang			Wei							Chu									Nong";

    case 690:
      return "									Jian					Qing																	Chen																	Qia					Jue												Ai			Shu																																																																																																						Chang				Lu			Jian							Jiao			Xun												Xiao					Te				Gong																																		Ou					Ze		Rao		Gui";

    case 691:
      return "Ji							Zhe				Shu																													Luo		Mi	Lian		Wei		Jiao																																	Pin									Yi	Yao	Fen	Qu		Hu	Yi	Yuan	Yi	Nao	Tong	Jiao	Tiao	Nang	Chi	Zhen	Hua	Ji	Yan	Wang		Qu	Xian	Xi	Zhuan	Xiao	Zhong	Lou	Ao	Chi	Kui	Shan	Jie	Sha	Xi	Zhong	Xuan	Ning	Jian							Zong						Ju																										Long	Gou	Lian	Chen	Chen	Dan	Gan	Cheng				Li		Bi							Can									Chang			Bo					Jue	Lai				Zan	Luo				Qing																			Xian";

    case 692:
      return "				Yue	Shan	Kuai	Na	Ba	Ling	Fan	Zhi	Ping	Tian	Yi	Zhou	Ni	Guan	Hong	Bu	Ke	Wei	Jiao	Bu	Kan	Lei																														Lou																																	Zhuan									Meng																						Yan																																																															Han																																															Ba	Zi	Fu	Guo	Cong	Qian		Za	Yang	Liu	Ji	Xu	Qiao	Jun		Mou	Shen	Xuan		Wan	Ji	Lu	Nie	He	Zong	Yu";

    case 693:
      return "Lian	Fen	Di	Lom	Rou	Suo	Bei	Bi	Shuo	Jing	Xiu	Kuan	San	Fan	Jue	Chan		Zhan			Xi		Nong																							Kai		Dou	Bian	Lan	Xiao		Lin	Zhi	Nie																																															Yun			Sam																											Hui		Long		Xue										Qin	Bi	Bing	Bai	Gou	Zheng																				Ku	Zhen	Zhen		Yi	Fu	Duo	Gen	Hun	Yun	Ze	Yue	Qian		Yuan	Cu	Fan													Yu	Bo	Beng	An	Se															Jian				Zhan	Yuan	Zhang	Co	Zuo	Bi	Shi	Yun	Bu	Su	Lang	Luo	Wei	Hu	Nuan	Wei	Huang	Hou	Dui	Lian		Jiang	Zhan	Xiang";

    case 694:
      return "																											Han	Wen	Jue	Tuo	Po	Zhi	Jiong		Han	Ai	Kun	Tao	Lu	Ti	Huang	Yuan	Yan	Xi	Shuang	Zhe	Ceng	Zhan	Xi												Kuo					Rau																																																																						Xu	Hong	Yang	Zhuan	Sha	Fen	Bing	Qiao	Yang	Bi	Fu	Lie	Hui	Shi	Ci	Ge		Pu	Zhe	Duo	Gui	Hua	Li			Zhou	Yan	Bian	Zi	Xia	Yong	Qiu	Bu		Yu	Sao		Lie																																													Jian	Zhi	Fou	Huan	Jue	Long	Zha	Fu	Ning	Yu	Ge	Jia	Wu		Pi	Yan	Ru	Yuan	Tu	Kuang	Bie	Fang	Qi	Zhuo	Diao	Fu	Ti	Jue	Chi	Hu	Ti		Hou	Duo	Kui	Li	Chu";

    case 695:
      return "Chen	Bi	Zhang	Yin	Zun	Huan					Wen							Feng	Tuo		Pi	Ku				Ying						Cu									Ba	Nie	Yao		Ze	Chu	Yan	Jie	Ya		Long	Nan																					Hun			Shu																	Ran										Bei	Shu	Hui	Chou	Gong	Lai	Kui	Ying	Lan							Dao																Xun																		Min			Zi	Zhu		Jue			Ling	Rong	Zhi	Chan		Bei	Zi	Lao	Lan	Men														Kuai												Ren	Hong	Liang	Chong	Liu										Ling				Ji									Zhi	Pan	Chan	Cong	Tan		Tuo	Keng	Sui					Li	Zhi						Qiu	Si	Fen	Yun	Shan	Li	Shi	Hong	Kai	Zhou	Da	Zu	Zu	Suo";

    case 696:
      return "Cu	He	Ling			Ge	Kui	Xun	Bi		Xuan	Lu	Bang			Mu	Han	Sou	Zhang										Ni																																																					Yin																											Wo										Dan																				Cin								Long		Gui				Dui	Dong																	Lian		Lao	Wei											Dan	Chong	Can															Lan	Ai																	Qian																Su";

    case 697:
      return "																																																								Mao					Gan																Yan																																						Li		Li		Dyut			Ye		Ya					Suo				Xiao				Lou			Jue																			Cim										Liang										Jue																																																											Buk	Xie																Du";

    case 698:
      return "						Xia																																																																															Hong	Mun				Gang	Cong									Ye	Huo	Nap			Chu		Ye				Hai				Ngai							Jin			Hong	Baan		Guo	Lai	Yan	Li	Jian	The							Zam	Sam				Me	Baan						Ou		Zan								Ning					Jiao			Zhi							Saa									Ti			Jin						E	Ngaap			E	Bop																														Dan		Ban										Jun			Lu									Pin	Ling";

    case 699:
      return "Doe			Waa				Bok									Sai		Saat				Joeng		Baa	Gun		Jun				Die					Ne	So			Ang											Hoi													Gaam																														Zhuan	Ou			Lun						Ba		Qiao				Ce	Xun			Yan										Lao							Shan		Chen																							Yin																																																						Nong																			Huo																	Yun";

    case 700:
      return "		Duo											Wei														Xing					Dong	Hua	Hui	Re					Mai								Xian									Gui																												Lan																																										Qia																								Zan																																	Feng											Ya																				Dam";

    case 701:
      return "																																																												Be																																																					Cat				Yang	Wai	Li	Keng													Caam		Die			Lan											Rong																													Keng																			Kun			Xu	Xian			Lan												Sanh																				Lai		Yin									Xin		Lou					Ying";

    case 702:
      return "																																									Kou																																																																					Yu						Wei			Sung					Dong	Shang				Qie	Qie				Hua				Qi		Gong							Men			Wit		Lao																		Yang	Chanh												Nan										Xi";

    case 703:
      return "																							Mo						Chou						Pie	Ze	Hai		Hua				Bi			Nang			Kang	Lay			Lu	Suo		Jaap						Kap		Na	Lian						Huo			Bo	Luo					Jian				Niu					Kang									Duk	Jiang		Qian		Fei							Dong				Niao	Bi														Yan		Xiao						Buk																																									Li																																					Shu";

    case 704:
      return "																																					Huo				Wei	Xian				Dui			Kai																																Trua																																		Ma		Ou					Ya			Sun			Run		Luo			Dan				Sheng																							Mo									Jia					Sha		Nong											Khay					Gui										Zhi														Er														Jian					Xian			Fei				Lin	Yan";

    case 705:
      return "																					Jib									Chua											Yin																																																									Xia			Gua						Pen																																																											Ji								Kou																Mao					Jian	Bin			Die														Wan			Tuan	Bei																							Men									Guo";

    case 706:
      return "	Shan																				Fei																		Se										Po													Hua				Fen					Sha				Wei																					Lan	Jeoi																											Ou						Chao						Xun	Da				Chou	Gong								Mei	Jian					Lo								Chan		Shan															Tang	Lan				Wei				Ran					Lian										Lai";

    case 707:
      return "																							He						Chu																	Yao									Shan																																		Zhan		Li						Dang			Xun																																		Jing											Lan																						Cong																																																					Ma			Ji							Fei					Wen			Guo									Fen";

    case 708:
      return "																																Yang																																						Gun	Chang						Cau		Ying			Kou	Ye	Zung	Gun		Jian		Mai								Cau						Mian																															Ye	Lan	Que		Cuoi			Yun	Keng						Geng	Su		Lan																																																																									Ji											Qiu						Ben				Jung			Shai				Tui";

    case 709:
      return "		Wai																																													Ou																			Long		Si						Jian																	Ku											Ou						Ling																							Zuan														Xian					Chou		Shi								Lou														Xian";

    case 710:
      return "			Saa																Xun	Mie	Qiu	Jian		Dan	Yue	Wa	Qu	Zhan	Zhen	Diao	Xian	Gai	Yin	Kuang		Lu	Quan	Pai	Qi	Zhi	Ting	Lian	Huan	Qian	Chen	Mi	Zhun	Ruan	Yao	Zha	Xu	Cau	Geng	Qiu	Ci	Chi		Tao	Xia	Sui	Zhi	Shuang			Yan	Yan	Qian		Zhu	Fan	Ran	Lin	Dan	Mo	Xiang			Lu															Bi																Wei																							Su																																																																																	Vai																																				Dang			Yu";

    case 711:
      return "																				Da																	Lan		Fa	Hui				Man			Liang									Huai						Xian	Guo		Yu		Lao							Si	Jie																					Zei															Pin					Ran																							Jian										Lan			Tui							Pin				Sen								Han																						Yi																		Hun																							Xi																Cong			Dong";

    case 712:
      return "			Bi		Dang			Gong								Wang																Zei																	Moi						Tuo																Niao						Diao	Zhou				Jia	Die	Shi	Shai											Luo																							Zan				Chan												Cha	Dong	Ci	Si	Tiao	Zhi		Du	Dan	Qi	Ying	Ming		Deng	Jren																					Zhou					Ying				Can												Tap	Wei																									Xu	Kou	Zhi	Hao	Jun	Zhu	Tou	Gan	Jian	Tuo	Zhu	Jian	Tao	Yao	Fei	Ya	Wei	Hui		Hui	Dang	Ming	Ren	Hui	Zhou	Pu	Hen			Zha	Cu	Han	Cu		Ting	Lang	Lian	Ze	Lao";

    case 713:
      return "Hao	Tao	Shan		Can	Ji	Gun	Yin		Hui	Shi	Cong	Zha	Huang	Xuan	Duo	Ge	Ge	He	Chi		Ta	Gun		Chi	Hu	Ying	Chan	Zha	Hui	Yi	Liao	Yan	Ao	Zun	Dui	Zeng	Zhuan	Yi		Zao	Ai	Ta	Hao	Tuan	Hui	Zan	Jian	Huan	Tui																			Zhe				Mao																																											Cang	Han	Yi	Bi	Zheng	Chuan		Yan	Ruan	Duan	Hou	Lan	Zhan						Tang	Tuan																										Naai			Li		Bei		Lun		Zou		Duo				Xie					Bing	Zhang						Guan			Laam		Qiang			Teng														Nian									Dian					Nong			Long		Lao					Guo						Ping";

    case 714:
      return "	Mao	Qi		Yang	Nian	Gong	Kai	Wan	Tian		Zang	Pi	Ge	You	Xu	Hui	Sang	Guang	Chao	Bei																																																										Huo																																															Xun	Lai															Mao																										Yu	Zhan	Nong																	Guang";

    case 715:
      return "							Zhe																																Han	Hua	Yi	Kou	Pi	Wei	Lun	Chang	Ren	Qiang	Jin	Pi	Qi		Chen		Shi	Shu	Shen	Chu	Lu	Jip	Zuo	Ning	Zhao	Si	Mu	Hong	Pi		Xiang	Duo	Guo	Cha	Ji	Du		Hua	Han	Hong	Yang		Zi		Tian	Chuo	Tao	Peng	Nei		Daan	Chun	Bo	Lei	San	Da	Cou	Cha	Zhao	Kui	Xian	Hou	Cong	Nou		Chui	Weng	Xia	Zhan	Hui	Qi		Pie	Yi		Suo	Xi	Jie	Baang	Hei	Cheng	Lin		Biao	Jiao	Sui	Bi		Ji	Hing	Bo		Zuan	Jiao																				Huo	Muon						Lin	Xia	Jian	Hong	Kuang	Ge	Chu			Huo	Qi	Sha			Kui		Que	E	Yin	Yao	Ban	An	Xian				Deng	Ma	Wu				Gai	Ji					Xia									Tui";

    case 716:
      return "																																	Luo		Jian	Zhou	Liang												Han		Die			Sui	Chan	Yu		Ye																									Kui	You	Mo	Di	Dan		Pan		Zhuan	Lei	Gen		Wei	Kuo		Wen	Chen		Hong	Qi				Yi	Ding	San	Po	Ao	Shou	Pi	Zhan		Yu		Wei		Xue	Xue				Kai	Xuan		Guo	Hu					Liao	Yu															Zan																	Si				Chuang	Nian		Jie	Ti	Gou	Shang		Ning	Yi	Man		Ci	En	Guo	Mang	Bao	Ti	Ye		Hu	Mam	Ye	Yao	Zhui	Pi		Sui	Jian			Da	Tao	Xi	Qiu	Tang			Chong	Ying	Deng	Yong	Mo											Fen																				Fan	Pei	Pi	Jiong	Gua	Wo		Sai	Kuang		Shen	Chi	Tu";

    case 717:
      return "Lang	An	Fei	Huo		Peng	Qi	Chi			Lin	Tie	Meng	Biao	Tuo	Jian	Huan																								Nao	Nang																																																																																							Jie	Ren	Du		Diao		Bang	Jie		Wu	Geng	Ju	Dai	Tuo	Jie	Wei	Zhao			Ting	Kao	Ti	Jip	Lao				Shan			Hu	La	Lian		Xing	Zha	Ti		You	Rou	Ji		Ni	Huang	Qu	Ji	Xi	Guo		Jing	Xiang		Pu	Guan					Guan	Ba																										Bu																										Jun													Yi	Xiao	Hong";

    case 718:
      return "Wen	Wa	Ge			Chu	Sheng		Chi	Qiong	Ren		Sha	Chou	Li	Lang	Chuang	Yue	Qi			Ying	Yan		Yan	Miao	Yue	Huang	Pian	An	Lu		Ge	Lan	Gao	Xian	Piao	Chong	Zhuo	Yan	Qi	Ao	Fan		Kou	Ya	Kui	Pi	He	Qu		Gaan		Zhan	Chang	Cou	Bian	Gan					Qi							Cai		Bo		Hun		Hun	Nie	Mo	Shan							Zhen	Nong	Lai	Teng											Zhu																							Ya	Na	Xie	Hang			Zha	Zhi	Nie	Ai	Kuo	Chan		Cuo	Yi	Ze	Yun	Zu	Ya	Jian	Ci	Bo			Yin	Chu	Jin	Cha	Jue						Long			Yao";

    case 720:
      return "																						Li";

    case 721:
      return "																											Jian																																																																																																																																																																					Ngoi																									Hon			Po					Dyut														Liu";

    case 722:
      return "								Mu	Ying																			Bei			Thin															Huan																																																										Zui																				Nan																																																												La";

    case 723:
      return "																																																																																																																																		Zong																										Dao																																																																										Ai																		Wei";

    case 724:
      return "																																																																																																																								Lung";

    case 725:
      return "																																																																						Suo																																																																																																																																																											Ke";

    case 726:
      return "																			Hu																																																																																																																																																			Guo";

    case 727:
      return "																																																																											Ling																																Khan																									Ai";

    case 728:
      return "																									Pu																																																																			Shen																																																																	Rap																																										Dian																																Yi";

    case 729:
      return "														Li																																		Yu																																																																																																																																																											Tang";

    case 730:
      return "																																																																																										Yi	Men																					Fa																						Zhua																																																										Kui																									Di";

    case 731:
      return "																																																																								Ya";

    case 732:
      return "														Dang				Sha																																																								Hong																																																																																																	Zhu";

    case 733:
      return "										Wu";

    case 734:
      return "																																																																																												Luo																																																																																																																								Lai";

    case 736:
      return "																																				Lao						Gun								Geng";

    case 737:
      return "																																																																														Nong																																																																	Lan																																																																					Aa																Ling";

    case 738:
      return "																																																																																																Qiu	Lu	Zhi	Zuo	Gua	Riet		Liang	Gua		Zou	Rui	Cui		Sui	Cai";

    case 739:
      return "																																																																																																																																																																																																																																																										Du";

    case 740:
      return "																										Fan														Ying";

    case 741:
      return "		Jie			Fu					Liang																																																																																															Soe																								Liang		Gin																																														Xie";

    case 742:
      return "																																																																										Yin	Du																																																																																																																																												Tang";

    case 743:
      return "																																																						Dao																																																														Gu	Er		Fen	Chun	Huan	Ge";

    case 744:
      return "																														Qiang																					Chen																					Ke																																																																																																																																																																										Gang	Hong	Chan	Zhui	Lu";

    case 745:
      return "																																											Men	Chu	Diu		Rui			Bi						E																																																																																																																																																																																												Chang	Wei";

    case 746:
      return "																																																				Feng	Liu																																						Bi	Hai	Ai	Yi																																																																			Mang	Hai	Zong	Cao	Dun																													Ning";

    case 747:
      return "																											Xu	Yi	Gui	Can	Huo	Lu	Hua	Weng	Xian	Zhen																																																													Jie	Yao		Mie	Gong	Chen		Yan		Shuang						Gang																							Mou																																																																																		Ke";

    case 760:
      return "Li	Wan	Yi		Ni	Wu	Tui	Bing	Za	Bei	Seng	Xiang	Jun	Suo	Mian	Tu	Huang	Ju		Din	Nei	Zai		Yung	Yuan	Bing	Dong	Kuang	Qing	Qian	Ren	Pi	Ke	Luo	Ge	Chan	Ji	Jung	Mian	Qin	Shao	Bao	Cong	Bei	Hui	Bei	Bo	Ji	Ji	Qing	Qing	Qing		Hui	Ji	Sou		Jiao	Chi	Jiu	Xian	Xi	Cheng	Zhou	Ngok	Mie	Tang	Qi	Xian	Shan	Shan	Hui	Chi	Zha	Yao	Tu	Tan	Tu	Hao	Pen	Qie	Zhuang	Cheng	Zhi	Tu	Xing	Ci	Bao	Di		Mai	Hu	Feng	Duo	Meng	She	Chi		Ji	Yu	Tui	Pin	Fu	Sao	Cha	Rao	Lan	Lan		Yuan	Zhi	Ning	Bao	Lao	Shou	Jiang	Dang	You	Yao	Tu	Cit	Xiu	Qian	Wu	Yan		Dian	Zi	Chan	Xun	Chao	Yi	Xun	Shui	Mao	Fen	Man		Yi	Bing	Bi	Shu	Lang	Shuo	Gong			Yu	Tou	Tao	Yi			Xing	Diao	Shan	Dong	Ren	Zhi	Kuang	Yuan	Huang	Jue	Hui	Dong	Dun	Ci	Huang	Shen	Huang	Lou	Zeng	Xian	Fen	Can	Meng	Cheng	Lan	Cheng	Jia	Ku	Bao	Ba	Juan		Wan	Pin	She	Sao	Ji	Sau	Jin	Yan	Yan	Dou	Mo	Jiang	Hui	Jiao	Hei	Min	Jing		Ji	Shu	Zeon	Wei	Shu	Wen	Chang	Mao	Mian	Zui	Pu	Na	Tan	Lang	Wang	Zong	Qi	Biao		Hua	Guai	Gai	Sang	Mei		Ao	Ben	Zi	He	Zha	Yao	Gai	She		Zhi	Yi	Ci		Xu	Kun	Sui	Wen	Sha	Qiao			Juk	Fan		Yan	Ben	Qian	Wu";

    case 761:
      return "Pai	Hai	Liu	Hao	Jin	Nie	Ben	Baan	Gang	Yan	Long	Zi	Dian	Sha	Yan	Chao			Fen	Yue	Jing	Ying	Shu	Qian	Zai	Zhuan	Tan		Duan		Cong		Cuan	Jue	Zha		Xi	Bei	Yan		Ta	Wang	Gong	Yue	Ping	Ping	Dai	Yu	Zhen	Suo	Qiong	Xing	Rui		Zai		Yi	Ping	Yu		Faa		Yan	Ji	Zhi					Zhen	Zhen	Zhen	Juan	Jie	Chen	Ye	Shi		Xing	Lu	Tian	Hui	Jiu	Zu	Chi	Liu	Fu	Shu	Jian	Gu	Ji	Wen		Tian	Tian	Ping	Ping		Zhuan	Zhu	Wei	Chao	Bei	Xi	Jiang	San	Ji		Beng	Yao	Zi	Zong	Sao	Luo	Xing		Mei		Chao		Yang	Ao	Zhe			Ping		Cong	Ken	Ren	Yu	Cui	Cong	Pi	Ying			Xuan		Yu	Xi	Ci	Beng	Qi	Yu	Zhi	Lao	Hua	Fong	Ya	Ku		Ruo	Chai	Rong	Jie	Wu	Mang	Di	Zhe	Ping	Ju	Jun	Cai		Suo			Ping	Jin	Cuo		Rui		Cheng	Lu	Chao	Lu	Kwai	Nue	Lu	Kui	Xi	Chi	Qian	Yuan	Ping	Yun	Sip	Zhu	Ci	Ji	Gui	Xiang	Ci	Zhun	Yi	Jian	Liu	Shui	Lu	Yan	Mao			Nin	Yuan	Cheng	Yu	Bian	Shi	Jian	Gun	Bi	Gan	Qi	Shu	Zhao	Ba	Jian	Pian		Ren	Shu			Qi	Ping	Zi		Chao	Bo	Xuan	Hua	Bing	Qiang	Zan		Kai	Peng	Shai		Wei	Qian	Xi	Yun	Pang	Ping	Lu	Chan	Bi		Kun	Yan	E	E";

    case 762:
      return "Ping	Xue	Ji	Ban	E	Yun	Bao	Tui	Gan	Qiong	Zhen	Ji	Jian	Jiu	Ji	Pi	Yu	Ma	Sha			Ma	Qian	Zhi	Mian	Zhi	Mi	Fen	Bi	Pian";

    case 768:
      return "																																																																																																							Song																	Dang						Fu													Xian			Xian	Yu								Di					Tui										Lu							Si																									Zan																																																	Chuang				Bi				Du";

    case 769:
      return "	Shen																													Tuan																																																						Lu																	Du	Dan																					Xia																										Wei					Lan																																						Gai														Dong							Jia	Hong		Ji								Garon	He		Xi															Tan										Shan";

    case 770:
      return "						Lan	Chang			Dian			Chen						Lan										Me																	Kwaak	Za							Mo											Yan			Za																				Wei	Gang	Xian									Yi		Jia				Que	Ye							Jian												Xi					Zhi			Zhan			Qiang									Xian										Kui				Man		Yan	Qian																																																				Lou																																		Dang	Zhuan				Yan	Bi";

    case 771:
      return "Ying		Zheng				Qian	Ze		Yun																Lan													Ya																	Wei																																																																																					Song		Long	Dong	Lu	Ye			Yao		Ze					Kuai			Nao		Yan		Wei									Yue														Yan								Cuan																		Wu		San							Lou			Lan																			Ma				Kuai						Dai";

    case 772:
      return "																																																														Kuang			Tuan			Lun																Zhi	Yan				Liu						Gong						Xian		Can			Sheng	Luo	Zhi									Di			Ye							Tang							Man												Chi				Miao																																														Cheng		Wu														Shan			Ep		Ye			Zhi			Za								Sun					Li					Keng						Ruan				Gui	Chan";

    case 773:
      return "							Di				Gui																													Tan										Qian				Yu				Duk							Xun				Qu			Jiao								Xie																													Kuai																											Yan																								Nan									Li																													Hui													Huang			Lun			Chou	Xie	Zhai	Yan					Chan	Hui				Jin		Shi				Qian									Shen				Su	Fen";

    case 774:
      return "Dai								Ju											Qing													Yan			Mian						Xiao										Lai			Su		Sou																			Wu			Han			Xiao				Lou																																																															Ning																		Lu				Ran							Ye																									Ma					Cong			Dong									Shan						Bi		Zhi	Zhi	Ai	Hui			Shan	Luan				Lu				Lian			Xian					Am	Ling		Ding";

    case 775:
      return "																Lan												Qin	Yang					He						Jian	Eun										Ying																		Ying						Yin		Hui										Jian							Siu	Xian					Xian																										Chui									Yi						Jie																							Jian														Bei					Zao				Fen																													Yan";

    case 776:
      return "																											Jian																Gang							Keng		Yao					Pai											Lu						Xiao	Hui			Lai	Wo					Chan										Ben				Ying							Qi							Che					Lu						Nao		Shu							Su																														Wu		Ying		Lou																																																																Wei			Ning			Ji			Xian							Tui						Ji	Luan";

    case 777:
      return "																			Tang		Li																			Ta			Du	Du																														Kan								Cong									Shui			Ying		Man		Xi	Keng					Xian		Gui			Meng												Tang																											Kwai								Ba										Li		Hui					Long			Ze				Ya			Lao							Yan	Tuo				Jian				Xian	To	Zhi					Qin						Jian				Zhu																								Yang											Gui			Nong";

    case 778:
      return "																						Ti						Kuang										Ji													Zi																		Long										Tiao				Cheng																				Xu							Tuan				Lu						Jiao	Dang	Yue	Zhua															Zhong					Lu																				Ying								Tuan		Zhang									Tuan																					Men											Lan																																						Zheng	Fou";

    case 779:
      return "Ji		O	Lie		Fu	Qu	Zhu	Xian	Tuo		Hong	Geng	Xie	Bi	Zhu	Qiao	Zheng	Ci	Gai	Beng		Cheng	Qiu	Fu	Chen	Yun	Zhen	Mian		Qin	Yu	Hua	Qie	Qi	Xi	Bi	Zong	Hu	Tian		Xiu	Shan	Zhi	Miao	Beng	Qian	Zong	Cong	Hui	Quan	Ni	Zai	Xuan	Qi	San	Sui	Zuan	Zun	Yu	La	Xie	Lian	Pu	You	Cong			Guan																Juan						Lou								Sha	Dao																						Long												Xiang		Hu																		Zhu				Xiao																					Sou																Lom									Ni			Man";

    case 780:
      return "						Tan					Shuang	Zhou			Dai		Lou															Xu		Tang		Qiu				Lun						Kui			Dui		Shi	Qi	Sha	Za	Fu		Liu	She				Ke		Gong							Jian	Yong	Meng	Ung		Na	Fen			Xu	Jian										Zhong		Xiang		Fen							Fu			Lu					Lu	Bei		Ci	Zhi												Lai			Tui	Teng																Lei				Ceoi									Wu	Zhan											Wu	Che		Qian	Zong	Lun		Gui	Zhan	Long	Ze	Xing		E	Yi	Guo	Da						Ji	Jian		Chen						Fei													Ying			Wei																								Long			Yi			Dui	Yan	Nong	Daat	Shi";

    case 781:
      return "		Sen																			Mie	Shao	Li	Jian	Jun	Lou	Dou	Qu	Luo	Qu				Li	Xue	Dai											Ying																											Jiao		Yang	Zhun	You	Chao	Fan	E	Chen	Xu	Yi		Yi	Yang		Die	Ling	Gou	Tao	He	Yong		Nao	Keng	Shan	He	E	Yi	Xiao	Zhi	Zhan	Bu		Dou	Bie	Chan	E	Shua	Xing	Chen	Qi	Zhuo	Chu	Ni	Zhui	Zhuo	Ta	Nie	Yuan	Xu	Huo	Tao	Xi	He	Yu	Yi	Cong	Xi	Zha	Hao	Han	Tuo	Chi	Tan	Yi		Nou	Xuan	Se	Yao		Long			Du																				Mi				Lou																																																		Te		Yi	Wan	Chi		Sui	Cong	Fei	Jin	Kui	Sheng	Yi	Biao	Zhuan	Zang	Xuan						Li	Qiao	Qiao		Du";

    case 782:
      return "							Shuang	Die		Gui				Chan		Xi				Lian						Dai	Chi			Tui																																		Duo																																																		Wei	Chun	Fan	Yi	Kuang	Yue	Tun		Fan	Ba	Zhan	Peng	Xian	Rong	Di	Qu	Pao	Zhui	Gong	Ju	Hong	Wan	Yin	Qian	Leng	Zhe	Lu	Guo	Pai	Peng	Kan	Yuan	Chuan	Fu	Zong	Duo	Zhen	Jian	Keng	Se	Er	Lao	Fan	Chong	Zhan	Ji	Nie	Kai	Luo	Lin	Min				Huo					Chen					Dang					Rao															Di																							Biang	Biang			Xu					Wei								Qiao					Bi";

    case 783:
      return "					Yi						Lao				Lan		Mi																																										Qing																										Ji	Ba	Hua	Di		Kuang	Qiao	Ou	Li	E		Zhi	Ri	Xian	Yin		Bing	Long	Pi	Zhai	Ka		Sheng	He	Gou	Fu	Zhu	Ban	Fu	Ji	Qin	Kua	Guang	Tong	Hui	Pi	Chi	Gui	Ren	Bing	Yong	Guo	Zhe	Bo	Hong		Zhuo	Mei	Han	Yu	Tun	Sha			Fu	Jian	Biao	Pi	Tao	Fei	Pian	Guan	Ta		Ye	Duo	Zhen	Chen	Yu	Wei	Jie	Duan	Sheng	Zong	Fu		Hong	Shi		Xia	Kui	Zuan	Ngou		Ye	Ya	Jian	Da	Ai	Lian	Tang	Cui	Zong	Lu	Lan	Si		Hui	Zan	Ding	Juan		Tian	Quan	Zhu	Nie	La	Gaam	Ao	Xu	Mie	Lei	Teon	Zuan	Zha	Jian	Lei	Luo																												Zhen		Guan	Xia	Xie	Wei	Peng				Zuan			Shai	Ya	Yu				Guang	Tang	Xi			Pi";

    case 784:
      return "																	Zhi																Fen																																																	Dui												Wan																			Yi		Duo	Bi		Qian	Du		Gui	Lou			Lan	Lan					Sa	Mei	Bi	Ge	Quan	Yun	Qiao	She	Du	Hu	Dui	Xie		Yun																Duo	Ku	Zhuo	Yao	Hui	E	Ping	Lei	E	Fu		Yan	Kui	Chui	Pi	Cui	Han	Kan	Sai	Gao	Jiang	Kui	Xin	Zhan	Bin		Piao	Qiao																									Biao	Xia	You	Tai	Lie	Liu	Li		Rui	Xiu	Yu	Xi	Biao																	Xi	Yu	Bo	Fan	Ying		Ban	Zhi	En	Tian		Fen	E	Bu	Tan";

    case 785:
      return "Fen	Tou		Jian	Hui		Chi	Shang	Meng	En	Zan																																																		Zhu	Zhe	Guang	Du	Bao	Zhi	Sa	Ju	Ba	Long		Zhen	Bi	Rong	Zhi	Er		Xu	Fu	Tao	Bo			Bo	Song	Lai	Xuan	E		Tui	She	Tuo	Yao	Pian	Xia	Rou	Han	Gui	Cheng	Tao	Pin		Huang	Xu		Xi	Dian	Yu	Yan		Xiao																		Qian	Qian		Kui	Fei	Lan	Man		Zuan				Shang	Chao												Chao	Kui	Chou										Dan																																								Ya		Tuo	Yuan	Bei	Pi	Hu	Na	Yu	Ban	Lun	Hang	Shen	Mo	Wei	Qu	Pi	Shan	Xia	Qiu	Xing	Gun	Bo	You	Geng	Ku	Ti	Shu	Jiao	Luo	Ru	Yi	Lai	Mang	Shao	Ye	Tiao	Fu	Suo	Na	Ji	Lu	Cuo	Ying	Zhi	Ji	Xian	Jiu	Ju	Zong	Su";

    case 786:
      return "Ju	Shan	Yu	Wei	Hou	Zong	Lou	Geng	Geng	Qian	Liu	Hao	Xiu	Ruo	Sang	Zhu	Zhuan	Hui	Si	Xun	Cen	Fan	Lai	Ru	Chang	Mie	E	Meng	Xian																																											Yi	Diao		Gan	Han	Yi	Yu	Fu	Tuan	Ju	Ban	Huan	Hu	Jue	Ge	Pi	Dan	Ju	Zhi	Tie	Zhi	Fu	Bi	Wu	Ze	Jing	Bian	Yao	Song	Gui	Jia	Lao	Yuan	Ya	Ti	Ai	Zhu	Jiao	Gui	Luo	Yang	Yu	Kun	Mou	Mai	Yang	Lai	Kan	Yi	Tu	Xi	Fu	Tuo	Ji	Ji	Jun	Jun	Lu	Qi	Ming	Li	Yi	Zhui	Tu	Ju	Yi		Kong	Jian	Ju	Duo	Zi	Fu	Jie	Chun	Yuan	Mo		Ti	Tu	Rou	Chuan	Zhen	Tian	Sun	Niao	Tang		Xia	Tu	Yao	Ji	Yan	Yong	Shang	Yi	Jue	Keoi	Tu	Ling	Yu	Shu	Yu	Luo	Ji	Yi	Di	Bu	Lei		Yue					Lu	Lu	Chuai	Huai									Shan	He	Kuang		Mo	Qu		Tou	Hua		Qu			Ge	Bing	Qu	Fu	Fu	Sha	Guo			Mo	Bu				Lou	Chao								Zhi	Kuang	Lian		Meng			Fen			Chan		Lu								Cu	Qu";

    case 787:
      return "Yang	Qu		Wa	Zhi	Mi	Meng	Bie	Ma	Bi	Chang					Hun							Nong	Ji	Zi	Zi																		Yan	Ze	Zou	Chu	Chi	Yao	Xie	Quan	Yun	Zhai	Zhan	Zou	Yi	Ji	Ou	Dian			Yi				Gong	Da		Ran	Gou	Jiao	Tong	Bie";

    case 3584:
      return "																																 	!	\"	#	$	%	&	'	(	)	*	+	,	-	.	/	0	1	2	3	4	5	6	7	8	9	:	;	<	=	>	?	@	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z	[	\\	]	^	_	`	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z	{	|	}	~";
  }

  return "";
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var blocks = {};
/**
 * Transliterates a Unicode string into ASCII.
 * 
 * @param {string} string
 * @return {string}
 */

function anyAscii(string) {
  var result = '';

  var _iterator = _createForOfIteratorHelper(string),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      var codePoint = c.codePointAt(0);

      if (codePoint <= 0x7f) {
        result += c;
        continue;
      }

      var blockNum = codePoint >>> 8;
      var lo = codePoint & 0xff;
      var b = blocks[blockNum];

      if (b === undefined) {
        blocks[blockNum] = b = block(blockNum).split("\t");
      }

      if (b.length > lo) {
        result += b[lo];
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }
var input = document.getElementById('input');
var output = document.getElementById('output');
input.addEventListener('input', function () {
  _newArrowCheck(this, _this);

  return output.value = anyAscii(input.value);
}.bind(this));
