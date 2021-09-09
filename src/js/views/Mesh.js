import { html } from '../Helpers.js';
import {translate as t} from '../Translation.js';
import State from '../State.js';
import Session from '../Session.js';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker.js';
import { route } from '../lib/preact-router.es.js';
import SafeImg from '../components/SafeImg.js';
import Filters from '../components/Filters.js';
import CopyButton from '../components/CopyButton.js';
import FollowButton from '../components/FollowButton.js';
import Identicon from '../components/Identicon.js';
import View from './View.js';

class Mesh extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.carts = {};
    this.state = {items:{}, filtered:{}};
    this.items = {};
    this.filtered = {};
    this.id = 'profile';
    this.class = 'public-messages-view';
  }

  addToCart(k, user, e) {
    e.stopPropagation();
    const count = (this.cart[k + user] || 0) + 1;
    State.local.get('cart').get(user).get(k).put(count);
  }

  renderUserMesh(user) {
    const chat = Session.channels[user];
    const uuid = chat && chat.uuid;
    const followable = !(this.isMyProfile || user.length < 40);
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.state.photo} placeholder=${user} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.state.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.state.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${user} width=250/>`
      }
    }
    return html`
      <div class="content">
        

        <h3>Mesh</h3>
        ${this.renderItems()}
      </div>
    `;
  }

  runCheck(){
    const keys = Object.keys(this.state.items);
    
    keys.map(k => {
          
      const i = this.state.items[k];
      if( i.type == $("#getType").val()){
        console.log(i.name)
      $("#placeResults").append(`
        <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;">
          <p class="pointName">${i.name}</p>
          <p class="type">${i.type}</p>
          <p class="type">${i.from}</p>
        </div>
      `)} else {
        return false
      }
    })
  }

  getNotification() {
    const SUGGESTED_FOLLOW = 'hyECQHwSo7fgr2MVfPyakvayPeixxsaAWVtZ-vbaiSc.TXIp8MnCtrnW6n2MrYquWPcc-DTmZzMBmc2yaGv9gIU';
    if (this.state.noFollows) {
      return html`
          <div class="centered-container">
            <div class="msg">
                <div class="msg-content">
                    <p>${t('follow_someone_info')}</p>
                    <div class="profile-link-container">
                        <a href="/profile/${SUGGESTED_FOLLOW}" class="profile-link">
                            <${Identicon} str=${SUGGESTED_FOLLOW} width=40/>
                            <iris-text path="profile/name" user=${SUGGESTED_FOLLOW} placeholder="Suggested follow"/>
                        </a>
                        <${FollowButton} id=${SUGGESTED_FOLLOW}/>
                    </div>
                    <p>${t('alternatively')} <a
                            href="/profile/${Session.getPubKey()}">${t('give_your_profile_link_to_someone')}</a>.</p>
                </div>
            </div>
          </div>
      `
    }
    return '';
  }

  renderItems() {
    const cartTotalItems = Object.keys(this.cart).reduce((sum, k) => sum + this.cart[k], 0);
    const keys = Object.keys(this.state.items);
    return html`
    <div class="container">
      <div class="columns twelve banner" style="     padding: 2px;   padding-bottom: 3px; margin-top: 1em; display: flex; background-color: #ffffff00;">
        <div class="glow">
          <button class=" menuItem black" style="">
            <a href="/store/${this.props.store}"><i class="far fa-user" style="" editable="false" path="profile/name" user=${this.props.store}/></a>
          </button>
          <button class="menuItem black" onClick=${() => route(`/point/new`)}>
            <a href="/point/new" class="name">Add Point</a>
          </button>
    
        </div>
        <div class="flex-auto"></div>
        <div class="glow">
          ${cartTotalItems ? html`
          <button class="firstCon menuItem" style="height: 2.7em" onClick=${() => route('/checkout/' + this.props.store)}>Pending Orders (${cartTotalItems})</button>
          ` : ''}
          <button  style="" class=" menuItem black" onClick=${() => {
            showHideDiv('divMsg');
            } 
            
            }><i class="fas fa-qrcode" style="font-size: 1.5em; "></i>
          </button>
          <button class=" menuItem black" style=""  onClick=${() => { 
            var inputc = document.body.appendChild(document.createElement("input"));
            inputc.value = window.location.href;
            inputc.focus();
            inputc.select();
            document.execCommand('copy');
            inputc.parentNode.removeChild(inputc);
            document.getElementById("likeBtn").style.color = "#3f80e6";
            } }><i class="fas fa-link " id="likeBtn" style="font-size: 1.5em; color: inherit "></i>
          </button>

          <button class=" menuItem black noshow" style=" " class="noshow"  onClick=${() => { 
            showHideDiv('menuMore');
            } 
            
            }><i class="fas fa-expand" style="font-size: 1.5em; "></i>
          </button>
        </div>
      </div>
      <div class="columns twelve banner" style="     padding: 2px;   padding-bottom: 3px; margin-top: 1em; display: flex; background-color: #ffffff00;">

        <div class="shout">
            <h1><iris-text id="" editable="false"  path="profile/name" placeholder="Cell" user=${Session.getPubKey()}/></h1>
            <h2><iris-text id="" editable="true"  path="profile/cell" placeholder="What would you say about yourself?" user=${Session.getPubKey()}/></h2>
        </div>
      </div>

      <div class="columns twelve " style="     padding: 2px;   padding-bottom: 3px; margin-top: 1em; display: flex; background-color: #ffffff00; overflow-x: scroll">

        <div style="display: flex">
          ${!keys.length ? html`<p>Browse and clone another Mesh's point to get started</p>`:''}
          ${keys.map(k => {
            const i = this.state.items[k];
            return html`
              <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;" onClick=${() => route(`/point/${k}/${i.from}`)}>
                <a class="pointName" href="/point/${k}/${i.from}">${i.name}</a>
                ${this.props.mesh ? '':html`
                  <div class=""><iris-text path="profile/name" editable="true" placeholder="Name" user=${i.from}/></div>
                `}
                <p class="description">${i.description}</p>
                <p class="price">${i.price}</p>
                <p class="type">${i.type}</p>

                <button class="add" onClick=${e => this.addToCart(k, i.from, e)}>
                ${t('add_to_cart')}
                  ${this.cart[k] ? ` (${this.cart[k]})` : ''}
                </button>
                <div class="branchHolder">
                  ${this.props.mesh ? '':html`
                    <div class="branch  dent"><iris-text path="profile/name" editable="false" placeholder="Name" user=${i.from}/></div>
                  `}
                  <div class="branch oneD dent">${i.type}</div>
                  <a class="branch twoD dent" href="/mesh/${k}">${i.name}</a>
                  <div class="branch threeD dent">${i.pointID}</div>
                </div>
              </div>
            `
          })}
        </div>
      </div>
      <div class="columns twelve " style="     padding: 2px;   padding-bottom: 3px; margin-top: 1em; background-color: #ffffff00; overflow-x: scroll">
          <div class="shout">
            <h1>Filter pointss</h1>
            <h2>Find what your looking for</h2>
            <input id="getType"/>
            <button onClick=${() => {     $("#placeResults").html(" ");
             this.runCheck()}}></button>
          </div>


        <div id="placeResults" style="display: flex; "></div>
      </div>

    </div>
    `;
  }

  renderView() {
    if (this.props.mesh) {
      return this.renderUserMesh(this.props.mesh);
    }
    return html`
      ${this.renderItems()}
    `;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.items[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mesh !== this.props.mesh) {
      this.componentDidMount();
    }
  }

  getCartFromUser(user) {
    State.local.get('cart').get(user).map().on((v, k, a, e) => {
      if (k === '#') { return; } // blah
      this.eventListeners['cart' + user] = e;
      this.cart[k + user] = v;
      this.carts[user] = this.carts[user] || {};
      this.carts[user][k] = v;
      this.setState({cart: this.cart, carts: this.carts});
      this.updateTotalPrice();
    });
  }

  onPoint(p, id, a, e, from) {
    this.eventListeners['points' + from] = e;
    if (p) {
      const o = {};
      p.from = from;
      o[id] = p;
      Object.assign(this.items, o);
      this.updateTotalPrice();
    } else {
      delete this.items[id];
    }
    this.setState({items: this.items});
  }

  getPointsFromUser(user) {
    State.public.user(user).get('mesh').get('points').map().on((...args) => {
      return this.onPoint(...args, user);
    });
  }

  getAllCarts() {
    const carts = {};
    State.local.get('cart').map((o, user) => {
      if (!user) {
        delete carts[user];
        return;
      }
      if (carts[user]) { return; }
      carts[user] = true;
      this.getCartFromUser(user);
    });
  }

  getAllPoints(group) {
    State.group(group).map('mesh/points', (...args) => {
      this.onPoint(...args);
    });
  }

  componentDidMount() {
    const user = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.cart = {};
    this.items = {};
    this.isMyProfile = Session.getPubKey() === user;
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: '', totalPrice: 0, items: {}, cart: {}});

    State.local.get('noFollows').on(noFollows => this.setState({noFollows}));

    State.local.get('groups').get('follows').map().on((isFollowing, user, a, e) => {
      if (isFollowing && this.state.noFollows && Session.getPubKey() !== user) {
        State.local.get('noFollows').put(false);
        e.off();
      }
    });

    if (user) {
      this.getCartFromUser(user);
      this.getPointsFromUser(user);
    } else {
      let prevGroup;
      State.local.get('filters').get('group').on((group,k,x,e) => {
        if (group !== prevGroup) {
          this.items = {};
          this.setState({items:{}});
          prevGroup = group;
          this.eventListeners.push(e);
          this.getAllPoints(group);
        }
      });
      this.getAllCarts();
    }
  }
}

export default Mesh;
