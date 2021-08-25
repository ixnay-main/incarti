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

        <div id="divMsg" style="display:none; position: absolute; margin-top: 7em; width: 100%; z-index: 2004; 
        height: 100%; text-align: center;
        margin-top: -8em;
        padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;   
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: black" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>


        <div class="container blurThis" style=" position: fixed !important; background-color: ; z-index: 1002; margin-top: 0px; margin-top: 2em" >
          <div class="columns twelve subMenu" style="    padding-bottom: 3px; margin-top: 1em;
          padding-top: 10px;
          margin-left: 0px;
         
          display: flex;
          padding-right: 2em;
          padding-left: 7px;
          margin-right: 1em;">
            <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; padding: 0px" class="">

              <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 5px  0px 0px 5px; background-color: #ffffff00 ; border: 1px #464646 solid ">
                <a href="/store/${this.props.store}"><i class="far fa-user" style=" color: black"></i><iris-text style="margin-left: 1em; color: #c5c5c5" editable="false" path="profile/name" user=${this.props.store}/></a>

              </button>



              ${this.isMyProfile ? html`
              <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px 5px 5px 0px; background-color: #464646  " onClick=${() => route(`/product/new`)}>
                <a href="/product/new" class="" style="color: white;"><i class="fas fa-share" style="color: white;"></i> New Blueprint</a>
              </button>
              ` : ''}
            </div>
              <div class="flex-auto"></div>

              <div class="glow" style=" " class="">              
      
                ${cartTotalItems ? html`
                <button class="firstCon menuItem" style="height: 2.7em" onClick=${() => route('/checkout/' + this.props.store)}>Pending Orders (${cartTotalItems})</button>
                ` : ''}


                <button  style="    margin-left: -9px;" class="midCon menuItem" onClick=${() => {
                  showHideDiv('divMsg');
                  } 
                  
                  }><i class="fas fa-qrcode" style="font-size: 1.5em; "></i>
                </button>
              
                <button class="lastCon menuItem" style=" margin-left: -9px;"  onClick=${() => { 
                  var inputc = document.body.appendChild(document.createElement("input"));
                  inputc.value = window.location.href;
                  inputc.focus();
                  inputc.select();
                  document.execCommand('copy');
                  inputc.parentNode.removeChild(inputc);
                  document.getElementById("likeBtn").style.color = "#3f80e6";

                  } }><i class="fas fa-link " id="likeBtn" style="font-size: 1.5em; color: inherit "></i>
                </button>
             
            </div>
          </div>
        </div>


      <div class="container" style="margin-top: 8em">
        <div class="columns eight expand" style=" height: auto; padding: 1em; margin-left: 0%;  border-radius: 10px ">
          <div class=""  style="">
            <div style="margin-top: 0em">
              ${Object.keys(this.state.items).map(k => {
                const i = this.state.items[k];
                return html`
                <div class="menuItem slim" style="width:100%;  border-radius: 5px ">
                  <div class="" style="width:100%">

                    <div class="" onClick=${() => route(`/product/${k}/${this.props.store}`)} style="display: flex; padding-top: 5px; padding-bottom: 5px; ">
      
                      <div style="display: flex;width:100%">

                        <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="description" id="range">[${i.description}]</p>
                        <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600" class=""><a href="/product/${k}/${this.props.store}" style="" class="">${i.productName}</a></h3>
                        <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="">${i.price}</p>

                        <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400;  border-radius: 3px; padding: 2px; float: right" class="">            
                          <button  style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ;  " onClick=${e => this.addToCart(k, e)}><i class="fas fa-plus" style="font-size: 1.5em"></i>${this.cart[k] ? ` (${this.cart[k]})` : ''}</button>
                        
                          <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => {
                            showHideOrder('divOrder');
                            } 
                            
                            }><i class="fas fa-expand" style="font-size: 1.5em; "></i>
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
        <div class="columns four expand" style=" height: auto; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; margin-left: 4%; border-radius: 10px  ">
          
          <div class="box  padding" style="background-color: rgb(250, 250, 250); height: auto; padding: 1em; ">
            <h1 style="font-size: 2.7em; color: rgb(10, 193, 142)">Producer Card</h1>

            <div class="branchHolder">
                <p class="branch dent"><a href="/store/${this.props.store}"><i class="far fa-user" style=" color: black"></i><iris-text style="margin-left: 1em; color: #c5c5c5" editable="false" path="profile/name" user=${this.props.store}/></a></p>
                <p class="branch oneD dent">AQ_20</p> 
                <p class="branch twoD dent branchActive">AQ_20_01</p>
            </div>
                <br/>
            <div class="breadcrumb" style="padding: 1em; ">
                <div class="breadItem">
                  <p class="blue slim" style="border: none; height:1.5em; margin-left: 2em; width: fit-content " ><iris-text id="" editable="false"  path="profile/clique" placeholder="Cell" user=${Session.getPubKey()}/></p>

                </div>
            
                <div class="breadcrumb">/</div>
                <div class="breadItem selected">
                  <p class="blue slim" style="border: none; height:1.5em; margin-left: 3px; width: fit-content " ><iris-text id="" editable="false"  path="profile/name" placeholder="Cell" user=${Session.getPubKey()}/></p>
                </div>
            </div>
            <br/>
            <div class="" style="padding: 1em; ">
                <button class="blue slim ">Order</button>
                <button class="blue slim ">Order</button>
                <button class="blue slim ">Order</button><br/>
                <details style="margin-top: 1em"><summary>Cell</summary>
                  <p class="blue slim" style="border: none; height:1.5em; margin-left: 2em; width: fit-content " ><iris-text id=""  path="profile/clique" placeholder="Cell" user=${Session.getPubKey()}/></p>
                  <a class="blue slim" style="border: none; height:1.5em; margin-left: 2em; width: fit-content " ><iris-text id=""  path="profile/cliqueURL" placeholder="Cell URL" user=${Session.getPubKey()}/></p>

                </details>
                <details style="margin-top: 1em"><summary>Location</summary>
                  <p style="border: none; height:1.5em; margin-left: 2em; width: fit-content " ><iris-text  class="blue slim" style="margin-left: 1em; color: #c5c5c5; border: none" placeholder="Palo Alto, Newell Rd" id="addressRequest" editable="true" path="profile/location" user=${this.props.store}/></p>
                </details>

            </div><br/>
            <button class="blue slim" style="margin: 1em; ">Order</button>
            <div style="padding: 1em">                <h1>Output Info</h1> <hr/>
                </div>
                <div class="" style="padding: 1em; display: flex; overflow-x: scroll">
                    
                    <div class="  col">
                        <h3>Volume</h3>
                        <i class="fas fa-box-open"  style="font-size: 3em"></i><h2>1m^3</h2>
                    </div>
                    <div class=" col ">
                        <h3>Max Qty. Available</h3>
                        <i class="fas fa-box-open"  style="font-size: 3em; color: #ffffff00"></i><h2>4</h2>
                    </div>
                    <div class=" col">
                        <h3>Lead time Avg.</h3>
                        <i class="fas fa-box-open"  style="font-size: 3em; color: #ffffff00"></i><h2>2 Days</h2>
                        <br/><button class="blue slim">See past details</button>

                    </div>
                    <div class=" col">
                        <h3>Reviews</h3>
                        <i class="far fa-star"  style="font-size: 1em; color: #000000; margin: 0px;"></i>
                        <i class="far fa-star"  style="font-size: 1em; color: #000000; margin: 0px;"></i>
                        <i class="far fa-star"  style="font-size: 1em; color: #000000; margin: 0px;"></i>
                        <i class="far fa-star"  style="font-size: 1em; color: #000000; margin: 0px;"></i>
                        <i class="far fa-star"  style="font-size: 1em; color: #000000; margin: 0px;"></i>

                        <br/><br/>
                        <br/><button class="blue slim">More</button>


                    </div>

              </div><br/>
              <h3  style="margin-left: 1em ">Location Co-ord.</h3>

              <p class="blue slim" style=" height:1.5em; margin-left: 2em; width: fit-content " ><iris-text id="getCoOrds"  path="profile/location" placeholder="51.5, -0.09" user=${Session.getPubKey()}/></p>
              <br/><br/>
              <style>#mapid{height: 500px, z-index: 0}</style>
              <div id='mapid' ></div>
              <script>

                  var mymap = L.map('mapid').setView([ 51.5, -0.09], 13);
                  
                  
                  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'suckma/ckpnlfjf80lb117mji70ezybv',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1Ijoic3Vja21hIiwiYSI6ImNrb2o4OTI2aTEzMTcydnBudGhoZzA0Mm8ifQ.gwJKwHzGdFtYQDnq4iqsoQ'
                  }).addTo(mymap);

   
                  

                  var popup = L.popup()
                  .setLatLng([ 51.5, -0.09 ])
                  .setContent("Manufacture Location")
                  .openOn(mymap);
                  
                  
                  
                  var popup2 = L.popup();
                  
                  //polygon
                  
              
                  
                 
                  
                  
              </script>
          </div>
        </div>

        <div class="columns twelve" style=" height:fit-content; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; border-radius: 10px; margin-top: 3em ">
          
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
