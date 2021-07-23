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
    this.state = {items:{} , orderpiece:{}};
    this.items = {};
    this.orderpiece = {};
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
      var getTimeBar = document.getElementById("range").innerHTML
      console.log(getTimeBar)
      if(getTimeBar == "[PK]"){
        $("#timeBar").css("background-color", "red")
        console.log("less ggoo")
      } else{

      }
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

button#countNum {
  color: white;
  font-size: 1.5em;
}
    </style>

        <div id="divMsg" style="display:none; position: absolute; margin-top: 7em; width: 100%; z-index: 2004;     background-color: #ffffffe0;
        height: 100%; text-align: center;
        margin-top: -8em;
        padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>


        <div class="container blurThis" style=" position: fixed !important; background-color: ; z-index: 1002; margin-top: 0px" >
          <div class="columns twelve subMenu" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em; margin-right: 1em">
            <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; padding: 0px" class="">

              <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 5px  0px 0px 5px; background-color: #ffffff00 ; border: 1px #000 solid ">
                <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: black"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
              </button>

              ${this.isMyProfile ? html`
              <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px 5px 5px 0px; background-color: black  " onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="" style="color: white;"><i class="fas fa-share" style="color: white;"></i> New Blueprint</a>
              </button>
              ` : ''}
            </div>
              <div class="flex-auto"></div>

              <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #000; border-radius: 3px; padding: 2px" class="">              ${this.isMyProfile ? html`

      
                ${cartTotalItems ? html`
                <button style=" margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #000 solid; color: #c5c5c5 " onClick=${() => route('/checkout/' + this.props.store)}>Cart (${cartTotalItems})</button>
                ` : ''}


                <button  style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #000 solid " onClick=${() => {
                  showHideDiv('divMsg');
                  } 
                  
                  }><i class="fas fa-qrcode" style="font-size: 1.5em; color: #c5c5c5 "></i>
                </button>
              
                <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => { 
                  var inputc = document.body.appendChild(document.createElement("input"));
                  inputc.value = window.location.href;
                  inputc.focus();
                  inputc.select();
                  document.execCommand('copy');
                  inputc.parentNode.removeChild(inputc);
                  document.getElementById("likeBtn").style.color = "#3f80e6";

                  } }><i class="fas fa-link" id="likeBtn" style="font-size: 1.5em; color: #c5c5c5"></i>
                </button>
              ` : ''}
            </div>
          </div>
        </div>


      <div class="container">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  style="margin-top: 10em">
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 3em " id="hideBlues"> 
              <div style="width:100%; position: fixed; top: 3.1em; border-bottom: 5px solid black; background-color: ; padding: 5px; background-color: white; margin-left: -1px;">
                <h2 class="" style="">CATALOG</h2>
                <div style="display: flex; ">
            
                </div>

              </div><br/>
      


              <div style="margin-top: 0em">
                ${Object.keys(this.state.items).map(k => {
                  const i = this.state.items[k];
                  return html`
                  <div class="" style="width:100%;">
                    <div class="" style="width:100%">
       
                      <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)} style="display: flex; padding-top: 5px; padding-bottom: 5px; ">
        
                        <div style="display: flex;width:100%">
                          <div style="display :flex; margin-right: 1.3em ">
                            <div class="smolbar2" id="timeBar" style=""></div>
                            <div class="smolbar2" style=""></div>
                            <div class="smolbar2" style=""></div>
                          </div>
                          <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="description" id="range">[${i.description}]</p>
                          <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a href="/product/${k}/${this.props.store}" style="color: #000 !important" class="">[${i.productName}]</a></h3>
                          <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="">${i.price}</p>

                          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #000; border-radius: 3px; padding: 2px" class="">            
                            <button  style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #000 solid; color: #c5c5c5  " onClick=${e => this.addToCart(k, e)}><i class="fas fa-plus" style="font-size: 1.5em; color: #c5c5c5"></i>${this.cart[k] ? ` (${this.cart[k]})` : ''}</button>
                          
                            <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => {
                              showHideOrder('divOrder');
                              } 
                              
                              }><i class="fas fa-expand" style="font-size: 1.5em; color: #c5c5c5"></i>
                            </button>
                          </div>

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
    if (pub) {
      State.public.user(pub).get('store').get('liveOrders').map().on((x, jd) => {
        if (x) {
          const n = {};
          n[jd] = x;
          Object.assign(this.orderpiece, n);
          this.updateTotalPrice();
        } else {
          delete this.orderpiece[jd];
        }
        this.setState({orderpiece: this.orderpiece});
      });
    }
  }
}

export default Store;
