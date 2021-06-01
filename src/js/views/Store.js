import { html } from '../Helpers.js';
import {translate as t} from '../Translation.js';
import State from '../State.js';
import Session from '../Session.js';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import CopyButton from '../components/CopyButton.js';
import FollowButton from '../components/FollowButton.js';
import Identicon from '../components/Identicon.js';
import View from './View.js';

class Store extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.state = {items:{}};
    this.items = {};
    this.id = 'profile';
    
  }

  addToCart(k, e) {
    e.stopPropagation();
    const count = (this.cart[k] || 0) + 1;
    State.local.get('cart').get(this.props.store).get(k).put(count);
  }

  shouldRedirect() {
    if (!this.props.store) {
      route('/store/' + Session.getPubKey());
      return true;
    }
  }

  renderView() {
    if (this.shouldRedirect()) {
      return '';
    }
    const cartTotalItems = Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.items[k]).reduce((sum, k) => sum + this.cart[k], 0);
    this.isMyProfile = Session.getPubKey() === this.props.store;
    const chat = Session.channels[this.props.store];
    const uuid = chat && chat.uuid;
    const followable = !(this.isMyProfile || this.props.store.length < 40);
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.state.photo} placeholder=${this.props.store} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.state.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.state.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${this.props.store} width=250/>`
      }
    }
    return html`

    <style>
    .copy-button {
       min-width: 0px; 
  }

  .profile-actions button, .feed-container > p button {
    margin-right: 5px;
    margin-bottom: 0em;
    padding: 0em;
}

pre, blockquote, dl, figure, table, p, ul, ol, form {
   margin-bottom: 0rem;
}

.profile-header-stuff {
  flex: none !Important;
  width: 100%
}

.profile-header {
  display: flex;
  flex-direction: row;
  justify-items: center;
  margin-bottom: 0px;
}

.store-items {
  display: block;
  flex-wrap: wrap;
}

p.profile-about-content{
  display:none
}
    </style>

      <div class="header" style="position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 105;">
        <div class="" style="width: 100%; margin: auto; background-color: whitesmoke;">
          <div class="" style="margin: auto; width: fit-content;">
            <img style="height: 3em ; margin-left: 6em !important" src="../../src/js/views/transixnay.png" alt=""/>
          </div>
        </div>
      </div>
     
      <div class="container">
        <div class="columns six" style="border-radius: 10px; background-color :rgb(255, 255, 255); height:fit-content; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; height: fit-content">
          <div class="" style="padding: 1em;">
            <div class="" style="padding: 0.1em;">
              <p style=" height: 2em; font-size: 2em; margin: 0em;  color: black !important;" class=""><iris-text path="profile/name" placeholder="Name" user=${this.props.store}/></p>
            </div>
            <p style="height: 3em; margin: 0em; font-weight: 600 "  class="">
              <iris-text style="min-height: 3em; color: black !important"  path="store/about" placeholder="Store description" attr="" user=${this.props.store}/>
            </p>
          </div> 
          <div style="border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 1em;"> 
            <div class="profile-actions">                  
              <div style=""> 
                  ${uuid ? '' : html`
                  <${CopyButton} style="padding: 0em" text=${html`<i style="font-size: 2em" class="fas fa-copy"></i>`} title=${this.state.name} copyStr=${'https://iris.to/' + window.location.hash}/>
                `}
              </div>
            </div>
          </div>     
          <div class="profile-about visible-xs-flex">
            <p  class="profile-about-content" placeholder=${this.isMyProfile ? t('about') : ''} contenteditable=${this.isMyProfile} onInput=${e => this.onAboutInput(e)}>${this.state.about}</p>
          </div>
        </div>
        <div class="columns six" style=" border-radius: 10px; background-color :rgb(255, 255, 255); height:fit-content; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; height: fit-content ">
          <div class="store-items" >
            ${this.isMyProfile ? html`
              <div class="" style="padding: 1em" onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="name">Add item</a>
              </div>
            ` : ''}
            <div style="border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 1em; color: white !important; font-weight: 600; font-size: 1.7em; margin: 0em"> 
              ${Object.keys(this.state.items).map(k => {
                const i = this.state.items[k];
                return html`
                <div class="">
                  <div class="" style="border-bottom: 2px solid #898989;">
                    <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)}>
                      <${SafeImg} src=${i.photo}/>
                      <a href="/product/${k}/${this.props.store}" style="color: white !important" class="">${i.name}</a>
                      <p style="display: none" class="description">${i.description}</p>
                      <p style="display: none" class="price">${i.price}</p>
                      <button style="display: none" class="add" onClick=${e => this.addToCart(k, e)}>
                        Add to cart
                        ${this.cart[k] ? ` (${this.cart[k]})` : ''}
                      </button>
                    </div>
                  </div>
                </div>
                `
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.store !== this.props.store) {
      this.componentDidMount();
    }
  }

  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.items[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidMount() {
    if (this.shouldRedirect()) {
      return;
    }
    const pub = this.props.store;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: '', totalPrice: 0});
    this.isMyProfile = Session.getPubKey() === pub;
    this.cart = {};

    State.local.get('cart').get(this.props.store).map().on((v, k) => {
      this.cart[k] = v;
      this.setState({cart: this.cart})
      this.updateTotalPrice();
    });

    if (pub) {
      State.public.user(pub).get('store').get('products').map().on((p, id) => {
        if (p) {
          const o = {};
          o[id] = p;
          Object.assign(this.items, o);
          this.updateTotalPrice();
        } else {
          delete this.items[id];
        }
        this.setState({items: this.items});
      });
    }
  }
}

export default Store;
