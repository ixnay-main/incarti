import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import Store from './Store.js';

class Checkout extends Store {
  constructor() {
    super();
    this.followedUsers = new Set();
    this.followers = new Set();
    this.state.paymentMethod = 'bitcoin';
    this.state.delivery = {};
  }

  changeItemCount(k, v) {
    this.cart[k] = Math.max(this.cart[k] + v, 0);
    State.local.get('cart').get(this.props.store).get(k).put(this.cart[k]);
  }

  confirm() {
    const pub = this.props.store;
    Session.newChannel(pub);
    const cart = {};
    Object.keys(this.cart).forEach(k => {
      const v = this.cart[k];
      v && (cart[k] = v);
    });


    var randIntGo = '0' + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111))
    console.log(randIntGo)
    //time
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes();
    let dateTime = cDate + ' ' + cTime;
    //delete
    //put this order in a list of orders which are fetched on Orders.js
    const product = {
      getPub: pub,
      time: dateTime,
      itemNames: JSON.stringify(cart),
      productName: randIntGo,
      delivery: this.state.delivery.address,
    };

    console.log(product)

    Session.channels[pub].send({
      text: 'New order: ' + JSON.stringify(cart) + ', delivery: ' + JSON.stringify(this.state.delivery) + ', payment: ' + this.state.paymentMethod,
      order: true
    });

    State.public.user(pub).get('store').get('liveOrders').get(product.productName).put(product)

    State.public.get('globalOrderList').get(product.productName).put(product)


 

    State.local.get('cart').get(pub).map().once((v, k) => {
      !!v && State.local.get('cart').get(pub).get(k).put(null);
    });

    route('/orders/');


  }

  renderView() {
    return html`
  <div class="container">
    <div class="columns six">
      <div class="flex-table" style="margin-top: 4em">
        ${Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.state.items[k]).map(k => {
          const i = this.state.items[k];

          return html`
            <div class="flex-row">
              <div class="flex-cell">
                <a href=${'/product/' + k + '/' + this.props.store}>
                  <${SafeImg} src=${i.thumbnail}/>
                  ${i.name || 'item'}
                </a>
              </div>
              <div class="flex-cell no-flex price-cell">
                <p>
                  <span class="unit-price">${parseInt(i.price)} €</span>
                  <button onClick=${() => this.changeItemCount(k, -1)}>-</button>
                  <input type="text" value=${this.cart[k]} onInput=${() => this.changeItemCount(k, null)}/>
                  <button onClick=${() => this.changeItemCount(k, 1)}>+</button>
                </p>
                <span class="price">${parseInt(i.price) * this.cart[k]} €</span>
              </div>
            </div>
          `;
        })}
        <div class="flex-row">
          <div class="flex-cell"></div>
          <div class="flex-cell no-flex"><b>Total ${this.state.totalPrice} €</b></div>
        </div>


          <h3 class="side-padding-xs">Confirmation</h3>
            <div class="flex-table">
              ${Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.state.items[k]).map(k => {
                const i = this.state.items[k];
                return html`
                  <div class="flex-row">
                    <div class="flex-cell">
                      <${SafeImg} src=${i.thumbnail}/>
                      ${i.name || 'item'}
                    </div>
                    <div class="flex-cell no-flex price-cell">
                      <p>
                        ${this.cart[k]} x ${parseInt(i.price)} €
                      </p>
                      <span class="price">${parseInt(i.price) * this.cart[k]} €</span>
                    </div>
                  </div>
                `;
              })}
              <div class="flex-row">
                <div class="flex-cell"></div>
                <div class="flex-cell no-flex"><b>Total ${this.state.totalPrice} €</b></div>
              </div>
            </div>
            <p>
              Detail:<br/><br/>
              ${this.state.delivery.name}<hr/>
              ${this.state.delivery.address}<hr/>
              ${this.state.delivery.email}<hr/>
              ${this.state.paymentMethod}<hr/>

            </p>
           <button class="checkoutInput" style="background-color: #ffffff00; margin: auto" onClick=${() => this.confirm()}>Confirm</button>

            <div class="main-view" id="profile">
              <div class="content">
                ${this.state.carts && Object.keys(this.state.carts).map(user => {
                  const cartTotalItems = Object.keys(this.state.carts[user]).reduce((sum, k) => sum + this.state.carts[user][k], 0);
                  if (!cartTotalItems) { return; }
                  return html`
                    <p>
                      <a href="/checkout/${user}">
                        <iris-text path="profile/name" user=${user} editable="false"/> (${cartTotalItems})
                      </a>
                    </p>
                  `;
                })}
              </div>
            </div>
      </div>
    </div>
    <div class="columns six" >
      <div style="position: sticky; margin-top: 3em; ">

        <div class="side-padding-xs" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; border-radius:10px">
          <h3>Delivery</h3>
        
          <p>   Name     </p>
            <input class="checkoutInput" style="background-color: #ffffff00" type="text" placeholder="Name" value=${this.state.delivery.name} onInput=${e => State.local.get('delivery').get('name').put(e.target.value)}/>
        
            <p>   Delivery Address     </p>
            <input class="checkoutInput" style="background-color: #ffffff00" type="text" placeholder="Address" value=${this.state.delivery.address} onInput=${e => State.local.get('delivery').get('address').put(e.target.value)}/>
    
            <p>   Email (optional)    </p>
            <input class="checkoutInput" type="email" style="background-color: #ffffff00" placeholder="Email" value=${this.state.delivery.email} onInput=${e => State.local.get('delivery').get('email').put(e.target.value)}/>
            <br/>


          <div class="side-padding-xs">
            <h3>Payment</h3>
            <p>
              <label for="bitcoin" onClick=${e => this.paymentMethodChanged(e)}>
                <input class="funkyradio" type="radio" name="payment" id="bitcoin" value="bitcoin" checked=${this.state.paymentMethod === 'bitcoin'}/>
                Bitcoin
              </label>
            </p>
            <p>
              <label for="dogecoin" onClick=${e => this.paymentMethodChanged(e)}>
                <input class="funkyradio" type="radio" name="payment" id="dogecoin" value="dogecoin" checked=${this.state.paymentMethod === 'dogecoin'}/>
                Dogecoin
              </label>
            </p>
          </div>
        </div>
      </div>


    </div>
  </div>

  `;


  }

  paymentMethodChanged(e) {
    const val = e.target.firstChild && e.target.firstChild.value;
    val && State.local.get('paymentMethod').put(val);
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.store !== this.props.store) {
      this.componentDidMount();
    }
  }

  componentDidMount() {
    Store.prototype.componentDidMount.call(this);
    Object.values(this.eventListeners).forEach(e => e.off());
    this.eventListeners = [];
    const pub = this.props.store;
    console.log(pub)
    Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.state.items[k]).map(k => {
      console.log(k)      
      console.log("gopls")
      console.log(this.props.store)
    })
    this.carts = {};
    if (pub) {
      this.setState({page:'cart'})
      State.local.get('cart').get(pub).map().on((v, k) => {
        this.cart[k] = v;
        this.setState({cart: this.cart});
      });
      State.local.get('paymentMethod').on(paymentMethod => this.setState({paymentMethod}));
      State.local.get('delivery').open(delivery => this.setState({delivery}));
    } else {
      this.getAllCarts();
    }
  }
}

export default Checkout;
