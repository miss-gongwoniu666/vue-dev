/**
 * Created by wb-wj270693 on 2017/12/22.
 */
/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */

const Zepto = (function () {
  let undefined; let key; let $; let classList; const emptyArray = []; const slice = emptyArray.slice; const filter = emptyArray.filter;


  const document = window.document;


  const elementDisplay = {}; const classCache = {};


  const cssNumber = {
    'column-count': 1, columns: 1, 'font-weight': 1, 'line-height': 1, opacity: 1, 'z-index': 1, zoom: 1
  };


  const fragmentRE = /^\s*<(\w+|!)[^>]*>/;


  const singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;


  const tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;


  const rootNodeRE = /^(?:body|html)$/i;


  const capitalRE = /([A-Z])/g;


  // special attributes that should be get/set via method calls

  const methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'];


  const adjacencyOperators = ['after', 'prepend', 'before', 'append'];


  const table = document.createElement('table');


  const tableRow = document.createElement('tr');


  const containers = {
    tr: document.createElement('tbody'),
    tbody: table,
    thead: table,
    tfoot: table,
    td: tableRow,
    th: tableRow,
    '*': document.createElement('div')
  };


  const readyRE = /complete|loaded|interactive/;


  const simpleSelectorRE = /^[\w-]*$/;


  const class2type = {};


  const toString = class2type.toString;


  const zepto = {};


  let camelize; let uniq;


  const tempParent = document.createElement('div');


  const propMap = {
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    for: 'htmlFor',
    class: 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable'
  };


  const isArray = Array.isArray
            || function (object) { return object instanceof Array; };

  zepto.matches = function (element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    const matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector
            || element.oMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    let match; let parent = element.parentNode; const
      temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  };

  function type(obj) {
    return obj == null ? String(obj)
      : class2type[toString.call(obj)] || 'object';
  }

  function isFunction(value) { return type(value) == 'function'; }
  function isWindow(obj) { return obj != null && obj == obj.window; }
  function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE; }
  function isObject(obj) { return type(obj) == 'object'; }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }
  function likeArray(obj) { return typeof obj.length === 'number'; }

  function compact(array) { return filter.call(array, item => item != null); }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array; }
  camelize = function (str) { return str.replace(/-+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : '')); };
  function dasherize(str) {
    return str.replace(/::/g, '/')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/_/g, '-')
      .toLowerCase();
  }
  uniq = function (array) { return filter.call(array, (item, idx) => array.indexOf(item) == idx); };

  function classRE(name) {
    return name in classCache
      ? classCache[name] : (classCache[name] = new RegExp(`(^|\\s)${name}(\\s|$)`));
  }

  function maybeAddPx(name, value) {
    return (typeof value === 'number' && !cssNumber[dasherize(name)]) ? `${value}px` : value;
  }

  function defaultDisplay(nodeName) {
    let element; let
      display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, '').getPropertyValue('display');
      element.parentNode.removeChild(element);
      display == 'none' && (display = 'block');
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
  }

  function children(element) {
    return 'children' in element
      ? slice.call(element.children)
      : $.map(element.childNodes, (node) => { if (node.nodeType == 1) return node; });
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function (html, name, properties) {
    let dom; let nodes; let
      container;

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, '<$1></$2>');
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
      if (!(name in containers)) name = '*';

      container = containers[name];
      container.innerHTML = `${html}`;
      dom = $.each(slice.call(container.childNodes), function () {
        container.removeChild(this);
      });
    }

    if (isPlainObject(properties)) {
      nodes = $(dom);
      $.each(properties, (key, value) => {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);
        else nodes.attr(key, value);
      });
    }

    return dom;
  };

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function (dom, selector) {
    dom = dom || [];
    dom.__proto__ = $.fn;
    dom.selector = selector || '';
    return dom;
  };

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function (object) {
    return object instanceof zepto.Z;
  };

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function (selector, context) {
    let dom;
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z();
    // Optimize for string selectors
    if (typeof selector === 'string') {
      selector = selector.trim();
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector);
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector);
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector);
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector;
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector);
      // Wrap DOM nodes.
      else if (isObject(selector)) dom = [selector], selector = null;
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector);
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector);
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector);
  };

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function (selector, context) {
    return zepto.init(selector, context);
  };

  function extend(target, source, deep) {
    for (key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
        if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) target[key] = source[key];
    }
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function (target) {
    let deep; const
      args = slice.call(arguments, 1);
    if (typeof target === 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach((arg) => { extend(target, arg, deep); });
    return target;
  };

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function (element, selector) {
    let found;


    const maybeID = selector[0] == '#';


    const maybeClass = !maybeID && selector[0] == '.';


    const nameOnly = maybeID || maybeClass ? selector.slice(1) : selector;
    // Ensure that a 1 char tag name still gets checked

    const isSimple = simpleSelectorRE.test(nameOnly);
    return (isDocument(element) && isSimple && maybeID)
      ? ((found = element.getElementById(nameOnly)) ? [found] : [])
      : (element.nodeType !== 1 && element.nodeType !== 9) ? []
        : slice.call(
          isSimple && !maybeID
            ? maybeClass ? element.getElementsByClassName(nameOnly) // If it's simple, it could be a class
              : element.getElementsByTagName(selector) // Or a tag
            : element.querySelectorAll(selector) // Or it's not simple, and we need to query all
        );
  };

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector);
  }

  $.contains = document.documentElement.contains
    ? function (parent, node) {
      return parent !== node && parent.contains(node);
    }
    : function (parent, node) {
      while (node && (node = node.parentNode)) if (node === parent) return true;
      return false;
    };

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value) {
    const klass = node.className;


    const svg = klass && klass.baseVal !== undefined;

    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? (klass.baseVal = value) : (node.className = value);
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    let num;
    try {
      return value
        ? value == 'true'
                || (value == 'false' ? false
                  : value == 'null' ? null
                    : !/^0/.test(value) && !isNaN(num = Number(value)) ? num
                      : /^[\[\{]/.test(value) ? $.parseJSON(value)
                        : value)
        : value;
    } catch (e) {
      return value;
    }
  }

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  $.isEmptyObject = function (obj) {
    let name;
    for (name in obj) return false;
    return true;
  };

  $.inArray = function (elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
  };

  $.camelCase = camelize;
  $.trim = function (str) {
    return str == null ? '' : String.prototype.trim.call(str);
  };

  // plugin compatibility
  $.uuid = 0;
  $.support = { };
  $.expr = { };

  $.map = function (elements, callback) {
    let value; const values = []; let i; let
      key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) values.push(value);
      }
    } else {
      for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) values.push(value);
      }
    }
    return flatten(values);
  };

  $.each = function (elements, callback) {
    let i; let
      key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === false) return elements;
    } else {
      for (key in elements) if (callback.call(elements[key], key, elements[key]) === false) return elements;
    }

    return elements;
  };

  $.grep = function (elements, callback) {
    return filter.call(elements, callback);
  };

  if (window.JSON) $.parseJSON = JSON.parse;

  // Populate the class2type map
  $.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), (i, name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
  });

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map(fn) {
      return $($.map(this, (el, i) => fn.call(el, i, el)));
    },
    slice() {
      return $(slice.apply(this, arguments));
    },

    ready(callback) {
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($);
      else document.addEventListener('DOMContentLoaded', () => { callback($); }, false);
      return this;
    },
    get(idx) {
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
    },
    toArray() { return this.get(); },
    size() {
      return this.length;
    },
    remove() {
      return this.each(function () {
        if (this.parentNode != null) this.parentNode.removeChild(this);
      });
    },
    each(callback) {
      emptyArray.every.call(this, (el, idx) => callback.call(el, idx, el) !== false);
      return this;
    },
    filter(selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return $(filter.call(this, element => zepto.matches(element, selector)));
    },
    add(selector, context) {
      return $(uniq(this.concat($(selector, context))));
    },
    is(selector) {
      return this.length > 0 && zepto.matches(this[0], selector);
    },
    not(selector) {
      const nodes = [];
      if (isFunction(selector) && selector.call !== undefined) {
        this.each(function (idx) {
          if (!selector.call(this, idx)) nodes.push(this);
        });
      } else {
        const excludes = typeof selector === 'string' ? this.filter(selector)
          : (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector);
        this.forEach((el) => {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      }
      return $(nodes);
    },
    has(selector) {
      return this.filter(function () {
        return isObject(selector)
          ? $.contains(this, selector)
          : $(this).find(selector).size();
      });
    },
    eq(idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
    },
    first() {
      const el = this[0];
      return el && !isObject(el) ? el : $(el);
    },
    last() {
      const el = this[this.length - 1];
      return el && !isObject(el) ? el : $(el);
    },
    find(selector) {
      let result; const
        $this = this;
      if (!selector) result = [];
      else if (typeof selector === 'object') {
        result = $(selector).filter(function () {
          const node = this;
          return emptyArray.some.call($this, parent => $.contains(parent, node));
        });
      } else if (this.length == 1) result = $(zepto.qsa(this[0], selector));
      else result = this.map(function () { return zepto.qsa(this, selector); });
      return result;
    },
    closest(selector, context) {
      let node = this[0]; let
        collection = false;
      if (typeof selector === 'object') collection = $(selector);
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
      return $(node);
    },
    parents(selector) {
      const ancestors = []; let
        nodes = this;
      while (nodes.length > 0) {
        nodes = $.map(nodes, (node) => {
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }
      return filtered(ancestors, selector);
    },
    parent(selector) {
      return filtered(uniq(this.pluck('parentNode')), selector);
    },
    children(selector) {
      return filtered(this.map(function () { return children(this); }), selector);
    },
    contents() {
      return this.map(function () { return slice.call(this.childNodes); });
    },
    siblings(selector) {
      return filtered(this.map((i, el) => filter.call(children(el.parentNode), child => child !== el)), selector);
    },
    empty() {
      return this.each(function () { this.innerHTML = ''; });
    },
    // `pluck` is borrowed from Prototype.js
    pluck(property) {
      return $.map(this, el => el[property]);
    },
    show() {
      return this.each(function () {
        this.style.display == 'none' && (this.style.display = '');
        if (getComputedStyle(this, '').getPropertyValue('display') == 'none') this.style.display = defaultDisplay(this.nodeName);
      });
    },
    replaceWith(newContent) {
      return this.before(newContent).remove();
    },
    wrap(structure) {
      const func = isFunction(structure);
      if (this[0] && !func) var dom = $(structure).get(0);


      const clone = dom.parentNode || this.length > 1;

      return this.each(function (index) {
        $(this).wrapAll(
          func ? structure.call(this, index)
            : clone ? dom.cloneNode(true) : dom
        );
      });
    },
    wrapAll(structure) {
      if (this[0]) {
        $(this[0]).before(structure = $(structure));
        let children;
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first();
        $(structure).append(this);
      }
      return this;
    },
    wrapInner(structure) {
      const func = isFunction(structure);
      return this.each(function (index) {
        const self = $(this); const contents = self.contents();


        const dom = func ? structure.call(this, index) : structure;
        contents.length ? contents.wrapAll(dom) : self.append(dom);
      });
    },
    unwrap() {
      this.parent().each(function () {
        $(this).replaceWith($(this).children());
      });
      return this;
    },
    clone() {
      return this.map(function () { return this.cloneNode(true); });
    },
    hide() {
      return this.css('display', 'none');
    },
    toggle(setting) {
      return this.each(function () {
        const el = $(this);
        (setting === undefined ? el.css('display') == 'none' : setting) ? el.show() : el.hide();
      });
    },
    prev(selector) { return $(this.pluck('previousElementSibling')).filter(selector || '*'); },
    next(selector) { return $(this.pluck('nextElementSibling')).filter(selector || '*'); },
    html(html) {
      return 0 in arguments
        ? this.each(function (idx) {
          const originHtml = this.innerHTML;
          $(this).empty().append(funcArg(this, html, idx, originHtml));
        })
        : (0 in this ? this[0].innerHTML : null);
    },
    text(text) {
      return 0 in arguments
        ? this.each(function (idx) {
          const newText = funcArg(this, text, idx, this.textContent);
          this.textContent = newText == null ? '' : `${newText}`;
        })
        : (0 in this ? this[0].textContent : null);
    },
    attr(name, value) {
      let result;
      return (typeof name === 'string' && !(1 in arguments))
        ? (!this.length || this[0].nodeType !== 1 ? undefined
          : (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        )
        : this.each(function (idx) {
          if (this.nodeType !== 1) return;
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key]);
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
        });
    },
    removeAttr(name) {
      return this.each(function () { this.nodeType === 1 && setAttribute(this, name); });
    },
    prop(name, value) {
      name = propMap[name] || name;
      return (1 in arguments)
        ? this.each(function (idx) {
          this[name] = funcArg(this, value, idx, this[name]);
        })
        : (this[0] && this[0][name]);
    },
    data(name, value) {
      const attrName = `data-${name.replace(capitalRE, '-$1').toLowerCase()}`;

      const data = (1 in arguments)
        ? this.attr(attrName, value)
        : this.attr(attrName);

      return data !== null ? deserializeValue(data) : undefined;
    },
    val(value) {
      return 0 in arguments
        ? this.each(function (idx) {
          this.value = funcArg(this, value, idx, this.value);
        })
        : (this[0] && (this[0].multiple
          ? $(this[0]).find('option').filter(function () { return this.selected; }).pluck('value')
          : this[0].value)
        );
    },
    offset(coordinates) {
      if (coordinates) {
        return this.each(function (index) {
          const $this = $(this);


          const coords = funcArg(this, coordinates, index, $this.offset());


          const parentOffset = $this.offsetParent().offset();


          const props = {
            top: coords.top - parentOffset.top,
            left: coords.left - parentOffset.left
          };

          if ($this.css('position') == 'static') props.position = 'relative';
          $this.css(props);
        });
      }
      if (!this.length) return null;
      const obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      };
    },
    css(property, value) {
      if (arguments.length < 2) {
        const element = this[0]; const
          computedStyle = getComputedStyle(element, '');
        if (!element) return;
        if (typeof property === 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);
        if (isArray(property)) {
          const props = {};
          $.each(isArray(property) ? property : [property], (_, prop) => {
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop));
          });
          return props;
        }
      }

      let css = '';
      if (type(property) == 'string') {
        if (!value && value !== 0) this.each(function () { this.style.removeProperty(dasherize(property)); });
        else css = `${dasherize(property)}:${maybeAddPx(property, value)}`;
      } else {
        for (key in property) {
          if (!property[key] && property[key] !== 0) this.each(function () { this.style.removeProperty(dasherize(key)); });
          else css += `${dasherize(key)}:${maybeAddPx(key, property[key])};`;
        }
      }

      return this.each(function () { this.style.cssText += `;${css}`; });
    },
    index(element) {
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
    },
    hasClass(name) {
      if (!name) return false;
      return emptyArray.some.call(this, function (el) {
        return this.test(className(el));
      }, classRE(name));
    },
    addClass(name) {
      if (!name) return this;
      return this.each(function (idx) {
        classList = [];
        const cls = className(this); const
          newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function (klass) {
          if (!$(this).hasClass(klass)) classList.push(klass);
        }, this);
        classList.length && className(this, cls + (cls ? ' ' : '') + classList.join(' '));
      });
    },
    removeClass(name) {
      return this.each(function (idx) {
        if (name === undefined) return className(this, '');
        classList = className(this);
        funcArg(this, name, idx, classList).split(/\s+/g).forEach((klass) => {
          classList = classList.replace(classRE(klass), ' ');
        });
        className(this, classList.trim());
      });
    },
    toggleClass(name, when) {
      if (!name) return this;
      return this.each(function (idx) {
        const $this = $(this); const
          names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach((klass) => {
          (when === undefined ? !$this.hasClass(klass) : when)
            ? $this.addClass(klass) : $this.removeClass(klass);
        });
      });
    },
    scrollTop(value) {
      if (!this.length) return;
      const hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(hasScrollTop
        ? function () { this.scrollTop = value; }
        : function () { this.scrollTo(this.scrollX, value); });
    },
    scrollLeft(value) {
      if (!this.length) return;
      const hasScrollLeft = 'scrollLeft' in this[0];
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
      return this.each(hasScrollLeft
        ? function () { this.scrollLeft = value; }
        : function () { this.scrollTo(value, this.scrollY); });
    },
    position() {
      if (!this.length) return;

      const elem = this[0];

      // Get *real* offsetParent

      const offsetParent = this.offsetParent();

      // Get correct offsets

      const offset = this.offset();


      const parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top -= parseFloat($(elem).css('margin-top')) || 0;
      offset.left -= parseFloat($(elem).css('margin-left')) || 0;

      // Add offsetParent borders
      parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
      parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

      // Subtract the two offsets
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },
    offsetParent() {
      return this.map(function () {
        let parent = this.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css('position') == 'static') parent = parent.offsetParent;
        return parent;
      });
    }
  };

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach((dimension) => {
    const dimensionProperty = dimension.replace(/./, m => m[0].toUpperCase());

    $.fn[dimension] = function (value) {
      let offset; let
        el = this[0];
      if (value === undefined) {
        return isWindow(el) ? el[`inner${dimensionProperty}`]
          : isDocument(el) ? el.documentElement[`scroll${dimensionProperty}`]
            : (offset = this.offset()) && offset[dimension];
      }
      return this.each(function (idx) {
        el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      });
    };
  });

  function traverseNode(node, fun) {
    fun(node);
    for (let i = 0, len = node.childNodes.length; i < len; i++) traverseNode(node.childNodes[i], fun);
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach((operator, operatorIndex) => {
    const inside = operatorIndex % 2; //= > prepend, append

    $.fn[operator] = function () {
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      let argType; const nodes = $.map(arguments, (arg) => {
        argType = type(arg);
        return argType == 'object' || argType == 'array' || arg == null
          ? arg : zepto.fragment(arg);
      });


      let parent; const
        copyByClone = this.length > 1;
      if (nodes.length < 1) return this;

      return this.each((_, target) => {
        parent = inside ? target : target.parentNode;

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling
          : operatorIndex == 1 ? target.firstChild
            : operatorIndex == 2 ? target
              : null;

        const parentInDocument = $.contains(document.documentElement, parent);

        nodes.forEach((node) => {
          if (copyByClone) node = node.cloneNode(true);
          else if (!parent) return $(node).remove();

          parent.insertBefore(node, target);
          if (parentInDocument) {
            traverseNode(node, (el) => {
              if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT'
                            && (!el.type || el.type === 'text/javascript') && !el.src) window.eval.call(window, el.innerHTML);
            });
          }
        });
      });
    };

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? `${operator}To` : `insert${operatorIndex ? 'Before' : 'After'}`] = function (html) {
      $(html)[operator](this);
      return this;
    };
  });

  zepto.Z.prototype = $.fn;

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;

  return $;
}());

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);
(function ($) {
  let _zid = 1; let undefined;


  const slice = Array.prototype.slice;


  const isFunction = $.isFunction;


  const isString = function (obj) { return typeof obj === 'string'; };


  const handlers = {};


  const specialEvents = {};


  const focusinSupported = 'onfocusin' in window;


  const focus = { focus: 'focusin', blur: 'focusout' };


  const hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

  function zid(element) {
    return element._zid || (element._zid = _zid++);
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event);
    if (event.ns) var matcher = matcherFor(event.ns);
    return (handlers[zid(element)] || []).filter(handler => handler
                && (!event.e || handler.e == event.e)
                && (!event.ns || matcher.test(handler.ns))
                && (!fn || zid(handler.fn) === zid(fn))
                && (!selector || handler.sel == selector));
  }
  function parse(event) {
    const parts = (`${event}`).split('.');
    return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
  }
  function matcherFor(ns) {
    return new RegExp(`(?:^| )${ns.replace(' ', ' .* ?')}(?: |$)`);
  }

  function eventCapture(handler, captureSetting) {
    return handler.del
            && (!focusinSupported && (handler.e in focus))
            || !!captureSetting;
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type;
  }

  function add(element, events, fn, data, selector, delegator, capture) {
    const id = zid(element); const
      set = (handlers[id] || (handlers[id] = []));
    events.split(/\s/).forEach((event) => {
      if (event == 'ready') return $(document).ready(fn);
      const handler = parse(event);
      handler.fn = fn;
      handler.sel = selector;
      // emulate mouseenter, mouseleave
      if (handler.e in hover) {
        fn = function (e) {
          const related = e.relatedTarget;
          if (!related || (related !== this && !$.contains(this, related))) return handler.fn.apply(this, arguments);
        };
      }
      handler.del = delegator;
      const callback = delegator || fn;
      handler.proxy = function (e) {
        e = compatible(e);
        if (e.isImmediatePropagationStopped()) return;
        e.data = data;
        const result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
        if (result === false) e.preventDefault(), e.stopPropagation();
        return result;
      };
      handler.i = set.length;
      set.push(handler);
      if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
    });
  }
  function remove(element, events, fn, selector, capture) {
    const id = zid(element);
    (events || '').split(/\s/).forEach((event) => {
      findHandlers(element, event, fn, selector).forEach((handler) => {
        delete handlers[id][handler.i];
        if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
      });
    });
  }

  $.event = { add, remove };

  $.proxy = function (fn, context) {
    const args = (2 in arguments) && slice.call(arguments, 2);
    if (isFunction(fn)) {
      const proxyFn = function () { return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments); };
      proxyFn._zid = zid(fn);
      return proxyFn;
    } if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn);
        return $.proxy.apply(null, args);
      }
      return $.proxy(fn[context], fn);
    }
    throw new TypeError('expected function');
  };

  $.fn.bind = function (event, data, callback) {
    return this.on(event, data, callback);
  };
  $.fn.unbind = function (event, callback) {
    return this.off(event, callback);
  };
  $.fn.one = function (event, selector, data, callback) {
    return this.on(event, selector, data, callback, 1);
  };

  const returnTrue = function () { return true; };


  const returnFalse = function () { return false; };


  const ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/;


  const eventMethods = {
    preventDefault: 'isDefaultPrevented',
    stopImmediatePropagation: 'isImmediatePropagationStopped',
    stopPropagation: 'isPropagationStopped'
  };

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event);

      $.each(eventMethods, (name, predicate) => {
        const sourceMethod = source[name];
        event[name] = function () {
          this[predicate] = returnTrue;
          return sourceMethod && sourceMethod.apply(source, arguments);
        };
        event[predicate] = returnFalse;
      });

      if (source.defaultPrevented !== undefined ? source.defaultPrevented
        : 'returnValue' in source ? source.returnValue === false
          : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
    }
    return event;
  }

  function createProxy(event) {
    let key; const
      proxy = { originalEvent: event };
    for (key in event) if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];

    return compatible(proxy, event);
  }

  $.fn.delegate = function (selector, event, callback) {
    return this.on(event, selector, callback);
  };
  $.fn.undelegate = function (selector, event, callback) {
    return this.off(event, selector, callback);
  };

  $.fn.live = function (event, callback) {
    $(document.body).delegate(this.selector, event, callback);
    return this;
  };
  $.fn.die = function (event, callback) {
    $(document.body).undelegate(this.selector, event, callback);
    return this;
  };

  $.fn.on = function (event, selector, data, callback, one) {
    let autoRemove; let delegator; const
      $this = this;
    if (event && !isString(event)) {
      $.each(event, (type, fn) => {
        $this.on(type, selector, data, fn, one);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
    if (isFunction(data) || data === false) callback = data, data = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each((_, element) => {
      if (one) {
        autoRemove = function (e) {
          remove(element, e.type, callback);
          return callback.apply(this, arguments);
        };
      }

      if (selector) {
        delegator = function (e) {
          let evt; const
            match = $(e.target).closest(selector, element).get(0);
          if (match && match !== element) {
            evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
          }
        };
      }

      add(element, event, callback, data, selector, delegator || autoRemove);
    });
  };
  $.fn.off = function (event, selector, callback) {
    const $this = this;
    if (event && !isString(event)) {
      $.each(event, (type, fn) => {
        $this.off(type, selector, fn);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each(function () {
      remove(this, event, callback, selector);
    });
  };

  $.fn.trigger = function (event, args) {
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event);
    event._args = args;
    return this.each(function () {
      // items in the collection might not be DOM elements
      if ('dispatchEvent' in this) this.dispatchEvent(event);
      else $(this).triggerHandler(event, args);
    });
  };

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function (event, args) {
    let e; let
      result;
    this.each((i, element) => {
      e = createProxy(isString(event) ? $.Event(event) : event);
      e._args = args;
      e.target = element;
      $.each(findHandlers(element, event.type || event), (i, handler) => {
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) return false;
      });
    });
    return result;
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '
    + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '
    + 'change select keydown keypress keyup error').split(' ').forEach((event) => {
    $.fn[event] = function (callback) {
      return callback
        ? this.bind(event, callback)
        : this.trigger(event);
    };
  });
  ['focus', 'blur'].forEach((name) => {
    $.fn[name] = function (callback) {
      if (callback) this.bind(name, callback);
      else {
        this.each(function () {
          try { this[name](); } catch (e) {}
        });
      }
      return this;
    };
  });

  $.Event = function (type, props) {
    if (!isString(type)) props = type, type = props.type;
    const event = document.createEvent(specialEvents[type] || 'Events'); let
      bubbles = true;
    if (props) for (const name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]);
    event.initEvent(type, bubbles, true);
    return compatible(event);
  };
}(Zepto));
(function ($) {
  let jsonpID = 0;


  const document = window.document;


  let key;


  let name;


  const rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;


  const scriptTypeRE = /^(?:text|application)\/javascript/i;


  const xmlTypeRE = /^(?:text|application)\/xml/i;


  const jsonType = 'application/json';


  const htmlType = 'text/html';


  const blankRE = /^\s*$/;

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    const event = $.Event(eventName);
    $(context).trigger(event, data);
    return !event.isDefaultPrevented();
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data);
  }

  // Number of active Ajax requests
  $.active = 0;

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop');
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    const context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false
            || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    const context = settings.context; const
      status = 'success';
    settings.success.call(context, data, status, xhr);
    if (deferred) deferred.resolveWith(context, [data, status, xhr]);
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings);
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    const context = settings.context;
    settings.error.call(context, xhr, type, error);
    if (deferred) deferred.rejectWith(context, [xhr, type, error]);
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
    ajaxComplete(type, xhr, settings);
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    const context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
    ajaxStop(settings);
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function (options, deferred) {
    if (!('type' in options)) return $.ajax(options);

    const _callbackName = options.jsonpCallback;


    const callbackName = ($.isFunction(_callbackName)
      ? _callbackName() : _callbackName) || (`jsonp${++jsonpID}`);


    const script = document.createElement('script');


    let originalCallback = window[callbackName];


    let responseData;


    const abort = function (errorType) {
      $(script).triggerHandler('error', errorType || 'abort');
    };


    const xhr = { abort }; let
      abortTimeout;

    if (deferred) deferred.promise(xhr);

    $(script).on('load error', (e, errorType) => {
      clearTimeout(abortTimeout);
      $(script).off().remove();

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred);
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred);
      }

      window[callbackName] = originalCallback;
      if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

      originalCallback = responseData = undefined;
    });

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort');
      return xhr;
    }

    window[callbackName] = function () {
      responseData = arguments;
    };

    script.src = options.url.replace(/\?(.+)=\?/, `?$1=${callbackName}`);
    document.head.appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(() => {
        abort('timeout');
      }, options.timeout);
    }

    return xhr;
  };

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr() {
      return new window.XMLHttpRequest();
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json: jsonType,
      xml: 'application/xml, text/xml',
      html: htmlType,
      text: 'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  };

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0];
    return mime && (mime == htmlType ? 'html'
      : mime == jsonType ? 'json'
        : scriptTypeRE.test(mime) ? 'script'
          : xmlTypeRE.test(mime) && 'xml') || 'text';
  }

  function appendQuery(url, query) {
    if (query == '') return url;
    return (`${url}&${query}`).replace(/[&?]{1,2}/, '?');
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != 'string') options.data = $.param(options.data, options.traditional);
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
  }

  $.ajax = function (options) {
    const settings = $.extend({}, options || {});


    const deferred = $.Deferred && $.Deferred();
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];

    ajaxStart(settings);

    if (!settings.crossDomain) {
      settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)
            && RegExp.$2 != window.location.host;
    }

    if (!settings.url) settings.url = window.location.toString();
    serializeData(settings);

    let dataType = settings.dataType; const
      hasPlaceholder = /\?.+=\?/.test(settings.url);
    if (hasPlaceholder) dataType = 'jsonp';

    if (settings.cache === false || (
      (!options || options.cache !== true)
                && (dataType == 'script' || dataType == 'jsonp')
    )) settings.url = appendQuery(settings.url, `_=${Date.now()}`);

    if (dataType == 'jsonp') {
      if (!hasPlaceholder) {
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (`${settings.jsonp}=?`) : settings.jsonp === false ? '' : 'callback=?');
      }
      return $.ajaxJSONP(settings, deferred);
    }

    let mime = settings.accepts[dataType];


    const headers = { };


    const setHeader = function (name, value) { headers[name.toLowerCase()] = [name, value]; };


    const protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;


    const xhr = settings.xhr();


    const nativeSetHeader = xhr.setRequestHeader;


    let abortTimeout;

    if (deferred) deferred.promise(xhr);

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
    setHeader('Accept', mime || '*/*');
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET')) setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
    xhr.setRequestHeader = setHeader;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout);
        let result; let
          error = false;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          result = xhr.responseText;

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script') (1, eval)(result);
            else if (dataType == 'xml') result = xhr.responseXML;
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
          } catch (e) { error = e; }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);
          else ajaxSuccess(result, xhr, settings, deferred);
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
        }
      }
    };

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort();
      ajaxError(null, 'abort', xhr, settings, deferred);
      return xhr;
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];

    const async = 'async' in settings ? settings.async : true;
    xhr.open(settings.type, settings.url, async, settings.username, settings.password);

    for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

    if (settings.timeout > 0) {
      abortTimeout = setTimeout(() => {
        xhr.onreadystatechange = empty;
        xhr.abort();
        ajaxError(null, 'timeout', xhr, settings, deferred);
      }, settings.timeout);
    }

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null);
    return xhr;
  };

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined;
    if (!$.isFunction(success)) dataType = success, success = undefined;
    return {
      url,
      data,
      success,
      dataType
    };
  }

  $.get = function (/* url, data, success, dataType */) {
    return $.ajax(parseArguments(...arguments));
  };

  $.post = function (/* url, data, success, dataType */) {
    const options = parseArguments(...arguments);
    options.type = 'POST';
    return $.ajax(options);
  };

  $.getJSON = function (/* url, data, success */) {
    const options = parseArguments(...arguments);
    options.dataType = 'json';
    return $.ajax(options);
  };

  $.fn.load = function (url, data, success) {
    if (!this.length) return this;
    const self = this; const parts = url.split(/\s/); let selector;


    const options = parseArguments(url, data, success);


    const callback = options.success;
    if (parts.length > 1) options.url = parts[0], selector = parts[1];
    options.success = function (response) {
      self.html(selector
        ? $('<div>').html(response.replace(rscript, '')).find(selector)
        : response);
      callback && callback.apply(self, arguments);
    };
    $.ajax(options);
    return this;
  };

  const escape = encodeURIComponent;

  function serialize(params, obj, traditional, scope) {
    let type; const array = $.isArray(obj); const
      hash = $.isPlainObject(obj);
    $.each(obj, (key, value) => {
      type = $.type(value);
      if (scope) {
        key = traditional ? scope
          : `${scope}[${hash || type == 'object' || type == 'array' ? key : ''}]`;
      }
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value);
      // recurse into nested objects
      else if (type == 'array' || (!traditional && type == 'object')) serialize(params, value, traditional, key);
      else params.add(key, value);
    });
  }

  $.param = function (obj, traditional) {
    const params = [];
    params.add = function (k, v) { this.push(`${escape(k)}=${escape(v)}`); };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  };
}(Zepto));
(function ($) {
  $.fn.serializeArray = function () {
    const result = []; let
      el;
    $([].slice.call(this.get(0).elements)).each(function () {
      el = $(this);
      const type = el.attr('type');
      if (this.nodeName.toLowerCase() != 'fieldset'
                && !this.disabled && type != 'submit' && type != 'reset' && type != 'button'
                && ((type != 'radio' && type != 'checkbox') || this.checked)) {
        result.push({
          name: el.attr('name'),
          value: el.val()
        });
      }
    });
    return result;
  };

  $.fn.serialize = function () {
    const result = [];
    this.serializeArray().forEach((elm) => {
      result.push(`${encodeURIComponent(elm.name)}=${encodeURIComponent(elm.value)}`);
    });
    return result.join('&');
  };

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback);
    else if (this.length) {
      const event = $.Event('submit');
      this.eq(0).trigger(event);
      if (!event.isDefaultPrevented()) this.get(0).submit();
    }
    return this;
  };
}(Zepto));
(function ($) {
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z(dom, selector) {
        dom = dom || [];
        $.extend(dom, $.fn);
        dom.selector = selector || '';
        dom.__Z = true;
        return dom;
      },
      // this is a kludge but works
      isZ(object) {
        return $.type(object) === 'array' && '__Z' in object;
      }
    });
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined);
  } catch (e) {
    const nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function (element) {
      try {
        return nativeGetComputedStyle(element);
      } catch (e) {
        return null;
      }
    };
  }
}(Zepto));
module.exports = Zepto;
