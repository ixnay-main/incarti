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

    function showHideDiv(ele) {
      var srcElement = document.getElementById(ele);
      if (srcElement != null) {
        if (srcElement.style.display == "block") {
          document.getElementById("rotate").style.transform = "rotate(0deg)"
          srcElement.style.display = 'none';
        }
        else {
          srcElement.style.display = 'block';
          document.getElementById("rotate").style.transform = "rotate(90deg)"
        }
        return false;
      }
    }

    function showHideDiv2(ele) {
      var srcElement = document.getElementById(ele);
      if (srcElement != null) {
        if (srcElement.style.display == "block") {
          document.getElementById("rotate2").style.transform = "rotate(0deg)"


          srcElement.style.display = 'none';
        }
        else {
          srcElement.style.display = 'block';
          document.getElementById("rotate2").style.transform = "rotate(90deg)"
        }
        return false;
      }
    }

    var qr;
    (function() {
            qr = new QRious({
            element: document.getElementById('qr-code'),
          
            foreground: 'black',
            background: '#f9f9f9',
            

            value: window.location.href 
        });
      })();

    

    return html`

    <style>
    .copy-button {
       min-width: 0px; 
  }

  canvas#qr-code {
    width: 100%;
    max-width: 16em;
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


  <div  class="" style="margin: auto; text-align: center; position: fixed; top: 1em; "> 
    <h1 style="font-family: arialBlack; color: black; font-size: 2.8em; margin-left:5px;    margin-top: -14px;">IXNAY</h1>
  </div>


      <div class="container">
        <div class="columns four" style="display:block; background-color: #f9f9f9; border-radius: 15px  ;  ">
          <div class="" style="position: sticky !important; top: 2em; background-color:#f9f9f9;  z-index: 4; padding:1em; border-radius:  15px  ;">


            <div class="" style="background-color: #rgb(243 243 243); padding: 2px; border-radius:4px;  margin-bottom: 2em;    position: sticky; top: 1em;  z-index: 4">
              <h2 style="color: black; margin: 2px; height:1.5em"><iris-text path="profile/name" placeholder="Name" user=${this.props.store}/></h2>
            </div>
              <p style=" height:1.5em "><iris-text path="profile/location" placeholder="Location" user=${this.props.store}/></p>
              <p style=" height:1.5em "><iris-text path="profile/clique" placeholder="Clique" user=${this.props.store}/></p>

            <p style="height: 2em; margin: 0em; font-weight: 400 "  class="">
              <iris-text style="min-height: 3em; color: black !important"  path="store/about" placeholder="Store description" attr="" user=${this.props.store}/>
            </p>
            <div style="display: flex; width: fit-content; float: left" class="">
              ${this.isMyProfile ? html`
              <div class="" style="" onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="name">Add item</a>
              </div>
              ` : ''}
            </div>
            <div style="display: flex; width: 100%" class="">


              <div style="display: flex; width: fit-content; float: right" class="">
                <button class="expand pay-button" style="" onClick=${() => {showHideDiv('divMsg')} }><i class="fas fa-qrcode" style="font-size: 1.7em"></i></button>
                <button class="expand pay-button" style="" onClick=${() => { 
                  var inputc = document.body.appendChild(document.createElement("input"));
                  inputc.value = window.location.href;
                  inputc.focus();
                  inputc.select();
                  document.execCommand('copy');
                  inputc.parentNode.removeChild(inputc);
                  document.getElementById("likeBtn").style.color = "#3f80e6";

                  } }><i class="fas fa-link" id="likeBtn" style="font-size: 1.7em"></i>
                </button>
              </div>
            </div>
          </div> 
  
          <div class="profile-about visible-xs-flex">
            <p  class="profile-about-content" placeholder=${this.isMyProfile ? t('about') : ''} contenteditable=${this.isMyProfile} onInput=${e => this.onAboutInput(e)}>${this.state.about}</p>
          </div>

          <br/>
          <div id="divMsg" style="display:none">
            <div style="border-radius: 10px;padding: 0.2em;">
              <canvas id="qr-code" style="align-content: center  ;"></canvas>
            </div>    
          </div>
        </div>
        <div class="columns eight" style=" height:fit-content; ">
          <div class="" >
            <div class="expand" onClick=${() => {
               {showHideDiv('hideBlues')} 
              }} style="background-color: rgb(243, 243, 243); color: black; display: flex; padding: 2px; border-radius:4px;  margin-bottom: 2em;    position: sticky;   z-index: 4">
              <i id="rotate" class="fas fa-chevron-right" style="font-size: 1.7em; color: black; margin-left: 0.5em; margin-top: 3px; margin-right: 0.3em; transform: rotate(90deg)"></i><h2 style="color: black; margin: 2px; ">BLUEPRINTS</h2>
            </div>
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em;  " id="hideBlues"> 
              ${Object.keys(this.state.items).map(k => {
                const i = this.state.items[k];
                return html`
                <div class="">
                  <div class="" style="border-bottom: 2px solid rgb(236 236 236);">
                    <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)}>
                      <${SafeImg} src=${i.photo}/>
                      <a href="/product/${k}/${this.props.store}" style="color: #416dea !important" class="">${i.name}</a>
                      <p style="display: none" class="description">${i.description}</p>
                      <p style="display: none" class="price">${i.price}</p>
                      <button style="display: none" class="add" onClick=${e => this.addToCart(k, e)}>
                        Add to cart
                        ${this.cart[k] ? ` (${this.cart[k]})` : ''}
                      </button>
                    </div>
                  </div>
                </div>
                <br/>
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
