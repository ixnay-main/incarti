import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import StoreView from './Store.js';
import View from './View.js';


class Product extends StoreView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
  }

  addToCart() {
    const count = (this.cart[this.props.product] || 0) + 1;
    State.local.get('cart').get(this.props.store).get(this.props.product).put(count);
  }

  newProduct() {

    console.log('new');
    return html`
      <div>
          <a href="/" onClick=${e => this.onLogoClick(e)} tabindex="0" class="visible-xs-flex logo" style="color: black; font-size: 1.5em">
          <h1  style="font-family: arialBlack; color: #e20c0c; margin: 0em; margin-left: 15px; margin-top: 3px">IXNAY</h1>
          </a>

      </div>
      <div class="main-view" id="profile" style="position: fixed; bottom: 55px; height: fit-content;">
        <div class="content" style="width: auto; border-radius: 5px 5px 0px 0px; padding: 1em; margin: 1em; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
          <a href="/store/${Session.getPubKey()}"><iris-text path="profile/name" user=${Session.getPubKey()} /></a>
          <h3>Add item</h3>
          <h2 contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
          <textarea placeholder="Item description" onInput=${e => this.newProductDescription = e.target.value} style="resize: vertical"/>
          <input type="number" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.value)}/>
          <hr/>
          <p>
            Item ID:
          </p>
          <p>
            <input placeholder="Item ID" onInput=${e => this.newProductId = e.target.value} />
          </p>

        </div>
        <button style="    width: 90%; margin-left: 2em; margin-right: 2em; }" onClick=${e => this.addItemClicked(e)}><i class="fas fa-plus"></i></button>
      </div>
    `;
  }

  onClickDelete() {
    
    if (confirm('Delete product? This cannot be undone.')) {
      State.public.user().get('store').get('products').get(this.props.product).put(null);
      route('/store/' + this.props.store);
    }
  }

  showProduct() {
    var qr;
    (function() {
            qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 180,
            foreground: 'black',

            value: window.location.href 
        });
    })();
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <div class="main-view" id="profile">
      <div class="content">
        <a href="/store/${this.props.store}"><iris-text editable="false" path="profile/name" user=${this.props.store}/></a>
        ${cartTotalItems ? html`
          <p>
            <button onClick=${() => route('/checkout/' + this.props.store)}>Shopping cart (${cartTotalItems})</button>
          </p>
        ` : ''}
        ${this.state.product ? html`
          <iris-text tag="h3" user=${this.props.store} path="store/products/${this.props.product}/name"/>
          <iris-img btn-class="btn btn-primary" user=${this.props.store} path="store/products/${this.props.product}/photo"/>
          <p class="description">
            <iris-text user=${this.props.store} path="store/products/${this.props.product}/description"/>
          </p>
          <p class="price">
            <iris-text placeholder="Price" user=${this.props.store} path="store/products/${this.props.product}/price"/>
          </p>
          <canvas id="qr-code" style="align-content: center  ;"></canvas>

          <button class="add" onClick=${() => this.addToCart()}>
            Add to cart
            ${this.cart[this.props.product] ? ` (${this.cart[this.props.product]})` : ''}
          </button>
          ${this.isMyProfile ? html`
            <p><button onClick=${e => this.onClickDelete(e)}>Delete item</button></p>
          ` : ''}
        ` : ''}
      </div>
    </div>`;
  }

  render() {
    return (this.props.store && this.props.product ? this.showProduct() : this.newProduct());
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.componentDidMount();
    }
  }

  addItemClicked() {
    const product = {
      name: this.newProductName,
      description: this.newProductDescription,
      price: this.newProductPrice
    };
    console.log(product);
    State.public.user().get('store').get('products').get(this.newProductId || this.newProductName).put(product);
    route(`/store/${Session.getPubKey()}`)
  }

  componentDidMount() {
    StoreView.prototype.componentDidMount.call(this);
    const pub = this.props.store;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.product && pub) {
      State.public.user(pub).get('store').get('products').get(this.props.product).on(product => this.setState({product}));
    }
  }
}

export default Product;
