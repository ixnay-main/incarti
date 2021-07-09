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

    setTimeout(function(){

      var container_div = document.getElementById('hideBlues');
      var count = container_div.getElementsByTagName('h3').length;
      document.getElementById("countNum").innerHTML = count
    } , 1000)


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
            background: '#ffffff00',
            

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


        <div class="container " style=" position: sticky !important; background-color: white; z-index: 1002; margin-top: 1em" >
          <div class="columns twelve" style="padding-bottom: 3px; margin-left: 0em;  background-color: white;">
              ${this.isMyProfile ? html`
              <button class="expand" style="padding: 3px 10px; margin-left: 0em;" onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="" style="color: black;"><i class="fas fa-share" style="color: black;"></i> New Blueprint</a>
              </button>
              ` : ''}

              <button class="expand" style="padding: 3px 10px; margin-left: 1em;"><i class="far fa-trash-alt"></i> Delete</button>
              ${cartTotalItems ? html`
              <button class="expand" style="padding: 3px 10px; margin-left: 1em;" onClick=${() => route('/checkout/' + this.props.store)}> <i class="far fa-trash-alt"></i> Orders (${cartTotalItems})</button>
              ` : ''}
              <button class="expand" style="padding: 3px 10px; margin-left: 1em;" onClick=${() => {showHideDiv('divMsg')} }><i class="fas fa-qrcode"></i></button>
              <button class="expand" style="padding: 3px 10px; margin-left: 1em;" onClick=${() => { 
                var inputc = document.body.appendChild(document.createElement("input"));
                inputc.value = window.location.href;
                inputc.focus();
                inputc.select();
                document.execCommand('copy');
                inputc.parentNode.removeChild(inputc);
                document.getElementById("likeBtn").style.color = "#3f80e6";

                } }><i class="fas fa-link" id="likeBtn" ></i>
              </button>

              <button class="expand" style="padding: 3px 10px; margin-left: 1em;" id='countNum'></button>
          </div>
        </div>


      <div class="container">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  style="margin-top: 56px">
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em;  " id="hideBlues"> 
              ${Object.keys(this.state.items).map(k => {
                const i = this.state.items[k];
                return html`
                <div class="">
                  <div class="" style="">
                    <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)} style="display: flex; padding-top: 5px; padding-bottom: 5px">
      
                      <div style="display: flex">
                        <p style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class="description">[${i.description}].</p>
                        <h3 style="margin: 4px; font-size: 20px; font-weight: 600"><a href="/product/${k}/${this.props.store}" style="color: #000 !important" class="">[${i.name}]</a></h3>
                      </div>

                      <p style="display: none" class="price">${i.price}</p>
                      <button style="display: none" class="add" onClick=${e => this.addToCart(k, e)}>
                        <p style="color: white" class="price">add</p>
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
