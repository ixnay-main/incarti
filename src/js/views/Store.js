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
    this.subscriptionValue = {};
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
    var subscriptionValue = html`<iris-text path="profile/subscription"  user=${this.props.store}/>`

    var selector = document.getElementById("#subscriptionValue")

    return html`
      <div class="content">
        <div class="profile-top">
          <div class="profile-header">
            <div class="profile-header-stuff">
              <h3 class="profile-name"><iris-text path="profile/name" placeholder="Name" user=${this.props.store}/></h3>
              <h3 class="profile-name" id="subscriptionValue">${subscriptionValue}</h3>
              <h3 id="rawSubscriptionValue"></h3>


              <div class="profile-actions">
                <div class="follow-count">
                  <a href="/follows/${this.props.store}">
                    <span>${this.state.followedUserCount}</span> ${t('following')}
                  </a>
                  <a href="/followers/${this.props.store}">
                    <span>${this.state.followerCount}</span> ${t('followers')}
                  </a>
                </div>
                ${this.followedUsers.has(Session.getPubKey()) ? html`
                  <p><small>${t('follows_you')}</small></p>
                `: ''}
                ${followable ? html`<${FollowButton} id=${this.props.store}/>` : ''}
                <button onClick=${() => route('/chat/' + this.props.store)}>${t('send_message')}</button>
                ${uuid ? '' : html`
                  <${CopyButton} text=${t('copy_link')} title=${this.state.name} copyStr=${'https://iris.to/' + window.location.hash}/>
                `}
              </div>
            </div>
          </div>
        </div>
        <div class="store-items" style="margin-top: -1em;">
          ${this.isMyProfile ? html`
            <div class="store-item" style="width: 100%; background-color: black; padding: 5px; margin-bottom: 2em" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="name" style="width: fit-content; margin: auto; color: white"><i class="fas fa-plus"></i></a>
            </div>
          ` : ''}
          ${Object.keys(this.state.items).map(k => {
            const i = this.state.items[k];
            return html`
              <div class="store-item" style="width: 100%; margin-top: em" onClick=${() => route(`/product/${k}/${this.props.store}`)}>
                <a href="/product/${k}/${this.props.store}" class="name">${i.name}</a>
                <p class="description" style="display: none">${i.description}</p>
                <p class="price" style="display: none">${i.price}</p>
              </div>
            `
          })}
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
