(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Navigation = /*#__PURE__*/function () {
    function Navigation(options) {
      _classCallCheck(this, Navigation);
      this.maxHeight = undefined;
      this.nav = options.element;
      var self = this;
      if (this.nav.getAttribute('data-set-max-height')) {
        this.nav.style.maxHeight = '0';
        var observer = new MutationObserver(function () {
          self.update();
        });
        observer.observe(self.nav, {
          attributes: true,
          attributeFilter: ['class'],
          childList: true,
          characterData: false,
          subtree: true
        });
      }
      var dropdowns = this.nav.querySelectorAll('.has-list');
      if (dropdowns) {
        self.initDropdown(dropdowns);
      }
    }
    _createClass(Navigation, [{
      key: "initDropdown",
      value: function initDropdown(dropdowns) {
        var mediaQuery = window.matchMedia('(max-width: 767px)');
        dropdowns.forEach(function (dropdown) {
          dropdown.addEventListener('click', function (event) {
            var navItem = event.target.closest('li');
            if (!mediaQuery.matches) {
              var otherNavItems = _toConsumableArray(navItem.parentNode.children).filter(function (child) {
                return child !== navItem;
              });
              otherNavItems.forEach(function (item) {
                item.classList.remove('expanded');
              });
            }
            navItem.classList.toggle('expanded');
          });
          /* On mobile if we are on one of the sub pages parent should be expanded on page load */
          if (mediaQuery.matches) {
            if (dropdown.classList.contains('selected')) {
              dropdown.classList.add('expanded');
            }
          }
        });
        //Click outside dropdowns should close all expanded dropdowns
        document.addEventListener('click', function (event) {
          var expandedDropdowns = [];
          dropdowns.forEach(function (dropdown) {
            if (dropdown.classList.contains('expanded')) {
              expandedDropdowns.push(dropdown);
            }
          });
          if (expandedDropdowns.length > 0) {
            var clickIsOutsideNav = event.target.closest('nav') === null ? true : false;
            if (clickIsOutsideNav) {
              expandedDropdowns.forEach(function (dropdown) {
                dropdown.classList.remove('expanded');
              });
            }
          }
        });
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        var h;
        var maxHeight = this.nav.style.maxHeight;
        this.nav.style.maxHeight = 'none';
        h = this.nav.offsetHeight;
        this.nav.style.maxHeight = maxHeight;
        return h;
      }
    }, {
      key: "update",
      value: function update() {
        var self = this;
        if (this.nav.classList.contains('is-visible')) {
          //if (this.maxHeight === undefined) {
          this.maxHeight = this.getHeight();
          //}
          //wihtout setTimeout style change won't be animated
          setTimeout(function () {
            self.nav.style.maxHeight = self.maxHeight + 'px';
          }, 0);
        } else {
          this.nav.style.maxHeight = '0';
        }
      }
    }]);
    return Navigation;
  }();

  //Helper classes to HTML for styling of nojs version
  var html = document.querySelector('html');
  html.classList.remove('no-js');
  html.classList.add('js');
  //taken from http://youmightnotneedjquery.com/
  function ready(fn) {

    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  ready(function () {

    console.log('DOM is ready!');
    //initialize site navigation
    var navElement = document.querySelector('header > nav');
    if (navElement) {
      var navigation = new Navigation({
        element: document.querySelector('header > nav')
      });
      //hamburger button
      var hamburger = document.querySelector('button.hamburger');
      if (hamburger) {
        hamburger.addEventListener('click', function () {
          hamburger.classList.toggle('is-active');
          if (navigation.nav) {
            navigation.nav.classList.toggle('is-visible');
          }
        });
      }
    }
    /*
    const langs = document.querySelector('.langs');
    if (langs) {
        langs.addEventListener('click', (e) => {
            console.log(e.target);
            e.target.nextElementSibling.classList.toggle('hidden');
        });
    }
    */
  });

})();
