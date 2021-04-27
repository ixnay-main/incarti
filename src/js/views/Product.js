import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import StoreView from './Store.js';

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
    <div style="display: flex" style="    justify-content: center !important;width: 100%;min-height: 100vh;background: whitesmoke;font-family: var(--font-face);font-size: 16px;align-items: center;">
      
          <div class="button-container">
            <center><h2>Add a product to your Catalog.</h2></center><br/>
            <a href="/store/${Session.getPubKey()}" style="display: none"><iris-text path="profile/name" user=${Session.getPubKey()} /></a>
            <div class="button -regular center">
              <p class="addPadding" contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
            </div>
          </div>
          <div class="button-container">
            <div class="button -regular center">
              <p class="addPadding"  contenteditable placeholder="Description" onInput=${e => this.newProductDescription = e.target.innerText}/><p style="color: var(--color-ocean); padding: 0em 1em">|</p>
              <p class="addPadding" contenteditable type="number" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.innerText)}/>
            </div>

            <div class="button -regular center">
              <p class="addPadding" contenteditable placeholder="Item ID" onInput=${e => this.newProductId = e.target.innerText} /><p style="color: var(--color-ocean); padding: 0em 1em">|</p>
              <p class="addPadding" contenteditable type="number" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.innerText)}/>

            </div>
            <div class="button -dark center">
              <button style="background: var(--color-dark) !important; color: white; padding: 0.4em;" onClick=${e => this.addItemClicked(e)}>Add item</button>
            </div>
            
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
    const i = this.state.product;
    if (!i) return html``;
    return html`


      
      
        
        ${this.state.product ? html`


        

      <div style="display: flex" style="    justify-content: center !important;width: 100%;min-height: 100vh;background: whitesmoke;font-family: var(--font-face);font-size: 16px;align-items: center;">

        <div style="display: flex">
          <h2>Maintained by our Lord and Saviour</h2>
          <h2 style="padding-left: 1em; padding-right: 0.3em">🎉 </h2><h2><a href="/store/${this.props.store}"><iris-text editable="false" path="profile/name" user=${this.props.store}/></a></h2><h2 style="padding-left: 0.3em;"> 🎉</h2>
        </div>
        <br/><br/>

        <div class="button-container">
          <div class="button -regular center">
            <iris-text class="addPadding" tag="p" user=${this.props.store} path="store/products/${this.props.product}/name"/>
          </div>
        </div>
        <div class="button-container">
          <div class="button -regular center">
            <iris-text class="addPadding" tag="p" user=${this.props.store} path="store/products/${this.props.product}/description"/>
          </div>
          <div class="button -regular center">
            <iris-text class="addPadding"  tag="p" user=${this.props.store} path="store/products/${this.props.product}/price"/>
          </div>
        </div>
        ${this.isMyProfile ? html` 
        <div class="button-container">
          <div class="button -dark center">
            <p><button style="background: var(--color-dark) !important; color: white; padding: 0.4em;" onClick=${e => this.onClickDelete(e)}>Delete item</button></p>
          </div>
        </div>
        ` : ''}    
      </div>

          
        
        ` : ''}
      `;
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
