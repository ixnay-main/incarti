import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import ListStore from './ListStore.js';

class Place extends ListStore {
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

    <div style="display: flex" style="    justify-content: center !important;width: 100%;min-height: 100vh;background: whitesmoke;font-family: var(--font-face);font-size: 16px;align-items: center;">
            
    <div class="button-container">
      <div class="button -regular center">
        <p class="addPadding" contenteditable placeholder="List name" onInput=${e => this.newListName = e.target.innerText} />
      </div>
    </div>
    <div class="button-container">
      <div class="button -regular center"><p class="addPadding" contenteditable placeholder="Quantity" onInput=${e => this.newListStock = e.target.value} style="resize: vertical"/><p>|</p>
      <p class="addPadding"  contenteditable placeholder="ID" onInput=${e => this.newListModel = e.target.value} style="resize: vertical"/></div>
      <div class="button -regular center"><p  class="addPadding" ><input type="number" style="background-color: transparent;  padding: 0em" placeholder="Price" onInput=${e => this.newListPrice = parseInt(e.target.value)}/></p><p>|</p>
      <p  class="addPadding" contenteditable placeholder="List ID" onInput=${e => this.newProductId = e.target.value} style="resize: vertical"/></div>
      <div class="button -dark center" style=" padding: 0px !important;"><button id="additem" class="addPadding" style="backgournd-color: none; padding: 6px !important;" onClick=${e => this.addItemClicked(e)}>Add item</button></div>
  </div>
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

          <p class="stock">
            <iris-text user=${this.props.store} path="store/products/${this.props.product}/stock"/>
          </p>

          <p class="model">
            <iris-text user=${this.props.store} path="store/products/${this.props.product}/model"/>
          </p>
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
    return (this.props.store && this.props.product  ? this.showProduct() : this.newProduct() );
   
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
      price: this.newProductPrice,
      stock: this.newProductStock,
      model: this.newProductModel,


    };

    console.log(this.newProductPrice)
    console.log(this.newProductDescription)

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

export default Place;
