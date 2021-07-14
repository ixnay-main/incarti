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
          srcElement.style.display = 'none';

        }
        else {
          srcElement.style.display = 'block';

        }
        return false;
      }
    }

    setTimeout(function(){

      var container_div = document.getElementById('hideBlues');
      var count = container_div.getElementsByTagName('h3').length;
      document.getElementById("countNum").innerHTML = count
    } , 1000)



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

        <div id="divMsg" style="display:none; position: absolute; margin-top: 10em; width: 100%; z-index: 2004;     background-color: #ffffffe0;
        height: 100%; text-align: center;
        margin-top: -2em;
        padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>


        <div class="container blurThis" style=" position: fixed !important; background-color: white; z-index: 1002; margin-top: 0px" >
          <div class="columns twelve" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em">
              <a href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white"><i class="far fa-user" style=" color: white"></i><iris-text style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

              ${this.isMyProfile ? html`
              <button class="expand" style="padding: 3px 10px; margin-left: 0em; background-color:#fd96c5" onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="" style="color: white;"><i class="fas fa-share" style="color: white;"></i> New Blueprint</a>
              </button>
              ` : ''}

              <div class="flex-auto"></div>

              ${this.isMyProfile ? html`
              <button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #ffffff00" onClick=${e => this.onClickDelete(e)}><i class="far fa-trash-alt" style="font-size: 1.5em"></i></button>
            ` : ''}
              ${cartTotalItems ? html`
              <button class="expand" style="padding: 3px 10px; margin-left: 1em;  background-color: #ffffff00" onClick=${() => route('/checkout/' + this.props.store)}> <i class="far fa-trash-alt"></i> Orders (${cartTotalItems})</button>
              ` : ''}
              <button class="expand" style="padding: 3px 10px; margin-left: 1em;  background-color: #ffffff00"  onClick=${() => {
                showHideDiv('divMsg');
                } 
                
                }><i class="fas fa-qrcode" style="font-size: 1.7em"></i>
              </button>
              <button class="expand linkBtn" style="padding: 3px 10px; margin-left: 1em;  background-color: #ffffff00; font-size: 1.5em" onClick=${() => { 
                var inputc = document.body.appendChild(document.createElement("input"));
                inputc.value = window.location.href;
                inputc.focus();
                inputc.select();
                document.execCommand('copy');
                inputc.parentNode.removeChild(inputc);
                document.getElementById("likeBtn").style.color = "#3f80e6";

                } }><i class="fas fa-link" id="likeBtn" ></i>
              </button>

              <button class="expand" style="padding: 3px 10px; margin-left: 1em;  background-color: #ffffff00" id='countNum'></button>
          </div>
        </div>


      <div class="container">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  style="margin-top: 56px">
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 3em " id="hideBlues"> 
              <div style="display: flex; width:100%; position: fixed; top: 3.1em; border-bottom: 2px solid grey; background-color: white; padding: 5px;">
                <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class="">Collection</p>
                <p style="width: 40%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class="">Name</p>

                <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class="">Price</p>
                <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class="">Cart</p>
              </div>

              <div style="margin-top: 5em">
                ${Object.keys(this.state.items).map(k => {
                  const i = this.state.items[k];
                  return html`
                  <div class="" style="width:100%;">
                    <div class="" style="width:100%">
                      <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)} style="display: flex; padding-top: 5px; padding-bottom: 5px; width:100%">
        
                        <div style="display: flex;width:100%">
                          <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="description">[${i.description}]</p>
                          <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a href="/product/${k}/${this.props.store}" style="color: #000 !important" class="">[${i.name}]</a></h3>
                          <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="">${i.price}</p>

                          <button style="width: 20%; padding: 3px 10px; margin-left: 1em; background-color: #f5f5f5;     max-width: 7em; " class="expand" onClick=${e => this.addToCart(k, e)}>
                            <p style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="price"><i class="fas fa-plus"></i>                          ${this.cart[k] ? ` (${this.cart[k]})` : ''}
                            </p>
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>
                  `
                })}
              </div>
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
