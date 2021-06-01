"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Helpers = _interopRequireWildcard(require("../Helpers.js"));

var _State = _interopRequireDefault(require("../State.js"));

var _Session = _interopRequireDefault(require("../Session.js"));

var _preactRouterEs = require("../lib/preact-router.es.js");

var _Store = _interopRequireDefault(require("./Store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n                <i class=\"fas fa-trash-alt\" style=\"font-size: 2em; margin-left: 8em\" onClick=", "></i> \n                "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            <div class=\"productInfo\">\n              <iris-text tag=\"h3\" user=", " path=\"store/products/", "/name\"/>\n            </div>\n\n            <div >\n              <div class=\"productInfo\">\n                <p >Price</p>\n                <iris-text class=\"makeBlack\" id=\"price\" style=\"color: black !important; text-decoration: none\" placeholder=\"Price\" user=", " path=\"store/products/", "/price\"/>\n              </div>\n              <div class=\"productInfo\" style=\"margin-left: 8em\">\n              <p onClick=", ">find marginal cost</p>\n              <p id=\"marginalCostBox\"></p>\n\n              </div>\n              <div class=\"productInfo\" style=\"margin-left: 8em\">\n                <p >Location</p>\n                  <iris-text user=", " path=\"store/products/", "/location\"/><br/>\n              </div>\n              <div class=\"productInfo\" style=\"margin-left: 8em\">\n              <p >Subcomponentry</p>\n                <iris-text user=", " path=\"store/products/", "/subName\"/><br/>\n            </div>\n            </div>\n            <br/><hr/><br/>\n            <div style=\"display: flex\">\n              <div class=\"productInfo\" >\n                <p >Quantity Desired</p>\n                <iris-text user=", " id=\"quantity\" path=\"store/products/", "/desQuantity\"/><br/>\n              </div>\n              <div class=\"productInfo\" style=\"width: fit-content; float: right; display: flex;  padding: 0em; border-radius: 5px\">\n                ", "\n\n                <i class=\"fas fa-clone\" style=\"font-size: 2em; margin-left: 2em\" onClick=", "></i>\n \n                <i class=\"fas fa-link\" id=\"linkBtn\" style=\"font-size: 2em; margin-left: 2em\" onClick=", "></i>\n   \n              </div>\n            </div><br/><hr/><br/>\n            <div style=\"display: flex\" style=\"padding-bottom: 5em\">\n              <div class=\"productInfo\"  >\n              <p>Sub Componentry</p>\n              <iris-text  user=", " path=\"store/products/", "/subComp\"/><br/>\n\n              </div>\n            </div>\n\n            <iris-text style=\"display: none\" id=\"modelDataRaw\" user=", " path=\"store/products/", "/modelRaw\"/><br/>\n            \n            <iris-text user=", " editable=\"false\" href=\"store/products/", "/model\" onClick=", "/>\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    <style>\n\n    </style>\n\n    <div class=\"header\" style=\"position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 999;\">\n      <div class=\"\" style=\"width: 100%; margin: auto; background-color: whitesmoke; \">\n        <div class=\"\" style=\"margin: auto; width: fit-content;\">\n          <img style=\"height: 3em; margin-left: 6em !important\" src=\"../../src/js/views/transixnay.png\" alt=\"\"/>\n        </div>\n      </div>\n    </div>\n  \n<div class=\"container\" style=\"padding: 1em; margin-top: 5em\">\n  <div class=\"columns six\" style=\"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px\">\n    <div id=\"stl_cont2\" style=\"width:auto; height:20em ;margin:0 auto; overflow: hidden; z-index: 9\"></div>\n  </div>\n  <div class=\"columns six\" style=\"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 10px\">\n    <div class=\"main-view\" id=\"profile\">\n      <div class=\"content\" style=\"background-color: whitesmoke; z-index: 4;     position: sticky;  padding: 1em; border-radius: 10px; height: fit-content; \">\n        <div class=\"productInfo\">\n          <a href=\"/store/", "\" id=\"getParentStore\"><iris-text editable=\"false\"  user=", "/>", "</a>\n        </div>\n        ", "\n      </div>\n    </div>\n  </div>\n</div>\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<i class=\"fas fa-chevron-left\"></i>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n    <div class=\"header\" style=\"position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 999;\">\n    <div class=\"\" style=\"width: 100%; margin: auto; background-color: whitesmoke; \">\n      <div class=\"\" style=\"margin: auto; width: fit-content;\">\n        <img style=\"height: 3em; margin-left: 6em !important\" src=\"../../src/js/views/transixnay.png\" alt=\"\"/>\n      </div>\n    </div>\n  </div>\n\n<div class=\"main-view\" id=\"profile\" style=\"margin-top: 5em\">\n  <div class=\"container\">\n    <div class=\"columns six\">\n      <div id=\"container\">   \n        <div id=\"stl_cont2\" style=\"width:auto; height:20em ;margin:0 auto; overflow: hidden; z-index: 9\"></div>\n      </div>\n    </div>\n\n    <div class=\"columns six\" style=\"box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\">\n      <div class=\"content\" style=\"background-color: whitesmoke; z-index: 1001; border-radius: 10px; height: fit-content; \">\n        <div class=\"productInfo\" style=\"background-color: whitesmoke;  padding: 1em; z-index: 4; height: fit-content;\">\n          <p contenteditable placeholder=\"Item name\" onInput=", " />\n        </div>\n        \n        <div style=\"background-color: grey;  padding: 1em;\">\n          <div class=\"productInfo\" style=\"margin-left: 8em\">\n            <p>ID</p>\n            <p class=\"addPadding\" contenteditable placeholder=\"Item ID\" onInput=", " />\n          </div>\n          <div class=\"productInfo\" style=\"margin-left: 8em\">\n            <button style=\"background: var(--color-dark) !important; color: white; padding: 0.0em;\" onClick=", ">Upload\n            </button>\n            <label for=\"file\">Choose File</label>\n            <input id=\"file\" type=\"file\" style=\"display: none;\"/>\n          </div>\n        </div>\n        <br/><br/>\n        <div >\n          \n          <div style=\"display: flex\">\n            <div class=\"productInfo\" >\n              <p >Quantity Desired</p>\n              <p contenteditable placeholder=\"Desired Qunaity\" onInput=", " />\n            </div>\n            <div class=\"productInfo\" style=\"margin-left: 8em\">\n              <button onClick=", ">Add item</button>\n            </div>\n          </div>\n          \n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Product =
/*#__PURE__*/
function (_StoreView) {
  _inherits(Product, _StoreView);

  function Product() {
    var _this;

    _classCallCheck(this, Product);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Product).call(this));
    _this.eventListeners = [];
    _this.followedUsers = new Set();
    _this.followers = new Set();
    _this.state = {
      items: {}
    };
    _this.items = {};
    return _this;
  }

  _createClass(Product, [{
    key: "addToCart",
    value: function addToCart() {
      var count = (this.cart[this.props.product] || 0) + 1;

      _State["default"].local.get('cart').get(this.props.store).get(this.props.product).put(count);
    }
  }, {
    key: "donwloadThis",
    value: function donwloadThis() {
      var files = document.getElementById('file').files;

      if (files.length > 0) {
        getBase64(files[0]);
      }

      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          console.log(reader.result);
          var loc = reader.result;
          console.log(loc);
          var container = $('linkContainer');
          var anchor = '<a id="uploadBtn" download href="' + loc + '" >File</a>';
          $("#container").append(anchor);
          var stl_viewer = new StlViewer(document.getElementById("stl_cont2"), {
            auto_rotate: true,
            models: [{
              filename: loc,
              rotationx: -1.570796,
              color: ""
            }]
          });
        };

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }
  }, {
    key: "newProduct",
    value: function newProduct() {
      var _this2 = this;

      console.log('new');
      return (0, _Helpers.html)(_templateObject(), function (e) {
        return _this2.newProductName = e.target.innerText;
      }, function (e) {
        return _this2.newProductId = e.target.innerText;
      }, function (e) {
        return _this2.donwloadThis(e);
      }, function (e) {
        return _this2.newProductDesQuantity = e.target.innerText;
      }, function (e) {
        return _this2.addItemClicked(e);
      });
    }
  }, {
    key: "createMarginalCost",
    value: function createMarginalCost() {
      var previousPrice = 90;
      var previousQuantity = 48;
      var thisQuantity = document.getElementById("quantity").innerText;
      var thisPrice = document.getElementById("price").innerText;
      console.log(thisQuantity);
      console.log(thisPrice);
      var marginalCost = (thisPrice - previousPrice) / (thisQuantity - previousQuantity);
      console.log(marginalCost);
      $('marginalCostBox').html(marginalCost);
      document.getElementById("marginalCostBox").innerHTML = marginalCost;
    }
  }, {
    key: "onClickDelete",
    value: function onClickDelete() {
      if (confirm('Delete product? This cannot be undone.')) {
        _State["default"]["public"].user().get('store').get('products').get(this.props.product).put(null);

        (0, _preactRouterEs.route)('/store/' + this.props.store);
      }
    }
  }, {
    key: "cloneItemClicked",
    value: function cloneItemClicked() {
      console.log(this.props.product);
      var randNum = Math.floor(Math.random() * 9999) + 1;
      var getModel = document.getElementById("modelDataRaw").textContent;
      var product = {
        name: this.props.product + '.' + randNum,
        description: this.newProductDescription,
        price: this.newProductPrice,
        modelRaw: getModel
      };
      console.log(product);

      _State["default"]["public"].user().get('store').get('products').get(product.name).put(product);

      (0, _preactRouterEs.route)("/store/".concat(_Session["default"].getPubKey()));
    }
  }, {
    key: "showProduct",
    value: function showProduct() {
      var _this3 = this;

      var cartTotalItems = Object.values(this.cart).reduce(function (sum, current) {
        return sum + current;
      }, 0);
      setTimeout(function () {
        var stl_viewer = new StlViewer(document.getElementById("stl_cont2"), {
          auto_rotate: true,
          models: [{
            filename: document.getElementById("modelDataRaw").textContent,
            opacity: 0.8
          }]
        });
        console.log(document.getElementById("modelDataRaw").textContent);
      }, 1000);
      var parentStore = (0, _Helpers.html)(_templateObject2());
      var i = this.state.product;
      if (!i) return (0, _Helpers.html)(_templateObject3());
      return (0, _Helpers.html)(_templateObject4(), this.props.store, this.props.store, parentStore, this.state.product ? (0, _Helpers.html)(_templateObject5(), this.props.store, this.props.product, this.props.store, this.props.product, function (e) {
        return _this3.createMarginalCost(e);
      }, this.props.store, this.props.product, this.props.store, this.props.product, this.props.store, this.props.product, this.isMyProfile ? (0, _Helpers.html)(_templateObject6(), function (e) {
        return _this3.onClickDelete(e);
      }) : '', function (e) {
        return _this3.cloneItemClicked(e);
      }, function () {
        var inputc = document.body.appendChild(document.createElement("input"));
        inputc.value = window.location.href;
        inputc.focus();
        inputc.select();
        document.execCommand('copy');
        inputc.parentNode.removeChild(inputc);
        document.getElementById("likeBtn").style.color = "green";
      }, this.props.store, this.props.product, this.props.store, this.props.product, this.props.store, this.props.product, function () {
        console.log("gimmme files");
      }) : '');
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.store && this.props.product ? this.showProduct() : this.newProduct();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.eventListeners.forEach(function (e) {
        return e.off();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.product !== this.props.product) {
        this.componentDidMount();
      }
    }
  }, {
    key: "addSubClicked",
    value: function addSubClicked() {
      var sub = {
        subName: this.newProductSubName,
        subAddy: this.newProductSubAddy
      };
      console.log(sub.subName);

      _State["default"]["public"].user().get('store').get('products').get(this.newProductId || this.newProductName).get(this.newProductSubName).put(sub);
    }
  }, {
    key: "addItemClicked",
    value: function addItemClicked() {
      var getModel = document.getElementById("uploadBtn").outerHTML;
      var modelRaw = document.getElementById("uploadBtn").href;
      var product = {
        name: this.newProductName,
        id: this.newProductId,
        description: this.newProductDescription,
        price: this.newProductPrice,
        location: this.newProductLocation,
        desQuantity: this.newProductDesQuantity,
        subComp: this.newProductSubComp,
        model: getModel,
        modelRaw: modelRaw
      };
      console.log(product);

      _State["default"]["public"].user().get('store').get('products').get(this.newProductId || this.newProductName).put(product);

      (0, _preactRouterEs.route)("/store/".concat(_Session["default"].getPubKey()));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      var pub = this.props.store;
      this.eventListeners.forEach(function (e) {
        return e.off();
      });
      this.setState({
        followedUserCount: 0,
        followerCount: 0,
        name: '',
        photo: '',
        about: ''
      });
      this.isMyProfile = _Session["default"].getPubKey() === pub;

      if (this.props.product && pub) {
        _State["default"]["public"].user(pub).get('store').get('products').get(this.props.product).on(function (product) {
          return _this4.setState({
            product: product
          });
        });
      }
    }
  }]);

  return Product;
}(_Store["default"]);

var _default = Product;
exports["default"] = _default;