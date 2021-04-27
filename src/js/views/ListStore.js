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


const heartEmpty = html`<svg style="fill: grey" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 20h-8c-4.415 0-8-3.585-8-8s3.585-8 8-8h8c4.415 0 8 3.585 8 8s-3.585 8-8 8zm0-15h-8c-3.863 0-7 3.137-7 7s3.137 7 7 7h8.045c3.843-.025 6.955-3.152 6.955-7s-3.112-6.975-6.955-7h-.045zm-8 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg>`;

const heartFull = html`<svg width="24" style="fill: green" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 20h-8c-4.415 0-8-3.585-8-8s3.585-8 8-8h8c4.415 0 8 3.585 8 8s-3.585 8-8 8zm0-15h-8c-3.863 0-7 3.137-7 7s3.137 7 7 7h8.045c3.843-.025 6.955-3.152 6.955-7s-3.112-6.975-6.955-7h-.045zm-8 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg>`;

class ListStore extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.liststate = {items:{}};
    this.orderedBy = new Set();

    this.listitems = {};
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

  showName(name) {
    console.log(name);
  }


  renderView() {
    if (this.shouldRedirect()) {
      return '';
    }

    
    const cartTotalItems = Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.liststate[k]).reduce((sum, k) => sum + this.cart[k], 0);
    this.isMyProfile = Session.getPubKey() === this.props.store;

    const chat = Session.channels[this.props.store];
    const uuid = chat && chat.uuid;
    // var toSite = document.getElementById(".model").innerHTML
    const followable = !(this.isMyProfile || this.props.store.length < 40);
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.liststate.photo} placeholder=${this.props.store} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.liststate.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.liststate.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${this.props.store} width=20/>`
      }
    }



    const linkSVG = html`<svg class="svg-icon" viewBox="0 0 20 20">
    <path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
  </svg>`;

  const msgSVG = html`<svg class="svg-icon" viewBox="0 0 20 20">
							<path d="M17.211,3.39H2.788c-0.22,0-0.4,0.18-0.4,0.4v9.614c0,0.221,0.181,0.402,0.4,0.402h3.206v2.402c0,0.363,0.429,0.533,0.683,0.285l2.72-2.688h7.814c0.221,0,0.401-0.182,0.401-0.402V3.79C17.612,3.569,17.432,3.39,17.211,3.39M16.811,13.004H9.232c-0.106,0-0.206,0.043-0.282,0.117L6.795,15.25v-1.846c0-0.219-0.18-0.4-0.401-0.4H3.189V4.19h13.622V13.004z"></path>
						</svg>`

      const      downSVG = html`<button style="padding: 2px 10px;"><svg class="svg-icon" viewBox="0 0 20 20">
      <path fill="none" d="M15.608,6.262h-2.338v0.935h2.338c0.516,0,0.934,0.418,0.934,0.935v8.879c0,0.517-0.418,0.935-0.934,0.935H4.392c-0.516,0-0.935-0.418-0.935-0.935V8.131c0-0.516,0.419-0.935,0.935-0.935h2.336V6.262H4.392c-1.032,0-1.869,0.837-1.869,1.869v8.879c0,1.031,0.837,1.869,1.869,1.869h11.216c1.031,0,1.869-0.838,1.869-1.869V8.131C17.478,7.099,16.64,6.262,15.608,6.262z M9.513,11.973c0.017,0.082,0.047,0.162,0.109,0.226c0.104,0.106,0.243,0.143,0.378,0.126c0.135,0.017,0.274-0.02,0.377-0.126c0.064-0.065,0.097-0.147,0.115-0.231l1.708-1.751c0.178-0.183,0.178-0.479,0-0.662c-0.178-0.182-0.467-0.182-0.645,0l-1.101,1.129V1.588c0-0.258-0.204-0.467-0.456-0.467c-0.252,0-0.456,0.209-0.456,0.467v9.094L8.443,9.553c-0.178-0.182-0.467-0.182-0.645,0c-0.178,0.184-0.178,0.479,0,0.662L9.513,11.973z"></path>
    </svg></button>`

    


    return html`
      <div class="row" style="position: fixed; width: 100%;">
        <div class="store-items twelve columns" style="box-shadow: none; display: flex;">  
          <div class="store-item" style="box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; margin: 1em; background-color: white;">
            <div class="profile-header" >
              <div class="profile-photo-container" style="display: flex; width: 100%;">
                <div class="profile-about hidden-xs"><h3 class="profile-name" style="width: 16em; padding-left: 1em"><iris-text path="profile/name" placeholder="Name" user=${this.props.store}/></h3></div>
              </div>
              <div class="profile-header-stuff">
                <div class="profile-about hidden-xs" style="display: flex">
                  <p class="product-info-normal" style="width: 30em; padding-left: 1em; animation: none; background-color: none; background-color: white !important; ">
                    <iris-text path="store/about" placeholder="Store description" attr="about" user=${this.props.store}/>        
                  </p>
                  ${uuid ? '' : html`
                    <${CopyButton} style="margin-top: 1em" text=${linkSVG} title=${this.liststate.name} copyStr=${'https://iris.to/' + window.location.hash}/>
                  `}
                  <button style="width: 40%;  padding: 0em; background-color: white !important; width: fit-content !important; border-radius: 0px; height: min-content; margin-top: 1em; padding-right: 1em;   border-right: 2px solid #f3f2f2;" onClick=${() => route('/chat/' + this.props.store)}>${msgSVG}</button>


                  <div class="follow-count" style="display: flex">
                    <a  class="product-info-wide" style="width: 14.3em; height: 2em; width: fit-content; background-color: white !important" href="/follows/${this.props.store}">
                      <span>${this.liststate.followedUserCount}</span> ${t('following')}
                    </a>
                    <a class="product-info-wide" style="width: fit-content; background-color: white !important; height: 2em" href="/followers/${this.props.store}">
                      <span>${this.liststate.followerCount}</span> ${t('followers')}
                    </a>
                    <div style="margin-top: 0.0em">
                      ${this.followedUsers.has(Session.getPubKey()) ? html`
                      <p><small>${t('follows_you')}</small></p>
                      `: ''}
                      ${followable ? html`<${FollowButton} id=${this.props.store}/>` : ''}
                    </div>
                  </div>
                </div>
              </div>
              <div class="profile-about visible-xs-flex">
                <p class="profile-about-content" placeholder=${this.isMyProfile ? t('about') : ''} contenteditable=${this.isMyProfile} onInput=${e => this.onAboutInput(e)}>${this.liststate.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       
      ${cartTotalItems ? html`
      <div class="cartBox">
        <p>
          <button onClick=${() => route('/checkout/' + this.props.store)}>Shopping cart (${cartTotalItems})</button>
        </p>
      </div>
      ` : ''}


      <div class="row" style="margin: 1em; margin-top: 12em">
        <div class="store-items one-half column" style="  margin-right: 0em; width: 47%;padding: 0.3em; ">         
          <div class="store-item">
            <div class="store-item-inner"  style="width: 100%; display: flex; border-left: none">
              <div class="store-item product-info-normal"  style="width: 100%; display: contents;">
              </div>
              ${this.isMyProfile ? html`
              <div class="store-item" style="" onClick=${() => route(`/product/new`)}>
                <div class="product-info-normal" style="border-left: none;">
                  <h2 style="margin: 0em"><a href="/product/new" class="name">Add product</a></h2>
                </div>
              </div>
            ` : ''}
            </div>
          </div>

          ${Object.keys(this.liststate.items).map(k => {
            const i = this.liststate.items[k];
            return html`
              <div class="store-item product-info-product" style="" onClick=${() =>{
                      
                      
                var names = i.name
                var descriptions = i.description
                var prices = i.price

                var model = i.model
                var stock = i.stock

                console.log(descriptions)

                if(model | stock == undefined ){
                  model = ""
                  stock = ""
                } else{

                }

                if(parseInt(stock)  > 0){
                  stock = "Available"
                } else {
                  stock = "Unavailable"

                }
                
                
                console.log(names + " " + descriptions + " " + prices + " " +  model + " " +  stock)

                $(".parallel-name").html(names)
                $(".parallel-description").html(descriptions)
                $(".parallel-price").html("$" + prices)
                $(".parallel-stock").html(stock)
                $(".parallel-model").html(model)
                
              }
                } >
                <div class="store-item-inner "  style="width: 100%; display: flex ;  ; border-left : none ">
                  <div class="store-item "  style="width: 100%; display: contents; ">

                    <p class="names">${i.name}</p>
                      
                      

          
                    
                  </div>
                  <div class="store-item" style="display: none;">
                    <p class="prices" contenteditable>${i.price}</p>
                    <a class="descriptions"  href="${i.description} "  >${i.description}</a>
                    <p  class="stock">${i.stock}</p>
                  </div>
                </div>
              </div>
              `
            })}
        </div>
      
        
          <div class="store-items one-half column" style=" width: %; position: fixed !important; margin-left: 46%; " >  
            <div class="store-item" style="overflow-wrap: anywhere;" >
              <div class="parallel">
                <div class="parallel-name product-info-normal" >
                </div>
                <div class="parallel-description product-info-normal">
                </div>
                <div class="parallel-inline-container product-info-normal" style="width: 100%">
                  <div class="parallel-inline-top" >
                    <div class="parallel-price-top">Price
                    </div>
                    <div  class="parallel-stock-top">Stock
                    </div>
                    <div class="parallel-model-top">
                      Model
                    </div>
                  </div>
                  <div class="parallel-inline-top product-info-normal" style="width: 100%">
                    <div class="parallel-price">
                    </div>
                    <div  class="parallel-stock ">
                    </div>
                    <div class="parallel-model">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="store-items" style=" width: 49%; position: fixed !important; margin-left: 46%; margin-top: 16em" > 
            <div class="store-item" style="overflow-wrap: anywhere; width: 100%;" onClick=${() => route(`/product/${k}/${this.props.store}`)}>
              <div class="parallel parallel-inline-container product-info-normal" style="width: 100%">
                
                <div class="parallel-inline-container">
                  <div class="parallel-inline-top">
                    <div class="parallel-price-top">DAO Purity
                    </div>
                    <div  class="parallel-stock-top">China 
                    </div>
                    <div class="parallel-model-top"> OS
                    </div>
                  </div>
                  <div class="parallel-inline-top">
                    <div class="parallel-price">
                    </div>
                    <div  class="parallel-stock ">
                    </div>
                    <div class="parallel-model">
                    </div>
                  </div>
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



  updateTotalPrice() {
    const totalPrice = Object.keys(this.cart).reduce((sum, currentKey) => {
      const item = this.liststate[currentKey];
      const price = item && parseInt(item.price) || 0;
      return sum + price * this.cart[currentKey];
    }, 0);
    this.setState({totalPrice});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hash !== this.props.hash) {
      Object.values(this.eventListeners).forEach(e => e.off());
      this.eventListeners = {};
      this.orderedBy = new Set();
      this.replies = new Set();
      this.subscribedReplies = new Set();
      this.linksDone = false;
      this.setState({replies:0, orders: 0, sortedReplies:[]});
      this.componentDidMount();
    }
    if (this.liststate.msg && !this.linksDone) {
      $(this.base).find('a').off().on('click', e => {
        const href = $(e.target).attr('href');
        if (href && href.indexOf('https://iris.to/') === 0) {
          e.preventDefault();
          window.location = href.replace('https://iris.to/', '');
        }
      });
      this.linksDone = true;
    }
  }

  orderBtnClicked(e) {
    e.preventDefault();
    var ordered = !this.liststate.ordered;
    State.public.user().get('orders').get(this.props.hash).put(ordered);
    console.log("click")
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

    State.local.get('follows').map().on((v, key, a, e) => {
      this.eventListeners[key] = e;
      State.public.user(key).get('orders').get(this.props.hash).on((ordered,a,b,e) => {
        this.eventListeners[key+'orders'] = e;
        ordered ? this.orderedBy.add(key) : this.orderedBy.delete(key);
        const s = {orders: this.orderedBy.size};
        if (key === Session.getPubKey()) s['ordered'] = ordered;
        this.setState(s);
      });
      State.public.user(key).get('replies').get(this.props.hash).map().on((hash,time,b,e) => {
        if (!hash || this.replies[hash]) return;
        this.replies[hash] = {hash, time};
        this.eventListeners[key+'replies'] = e;
        const sortedReplies = Object.values(this.replies).sort((a,b) => a.time > b.time ? 1 : -1);
        this.setState({replies: Object.keys(this.replies).length, sortedReplies });
      });
    });

    State.local.get('cart').get(this.props.store).map().on((v, k) => {
      this.cart[k] = v;
      this.setState({cart: this.cart})
      this.updateTotalPrice();
    });

    State.local.get('follows').map().on((v, key, a, e) => {
      this.eventListeners[key] = e;
      
      State.public.user(key).get('replies').get(this.props.hash).map().on((hash,time,b,e) => {
        if (!hash || this.replies[hash]) return;
        this.replies[hash] = {hash, time};
        this.eventListeners[key+'replies'] = e;
        const sortedReplies = Object.values(this.replies).sort((a,b) => a.time > b.time ? 1 : -1);
        this.setState({replies: Object.keys(this.replies).length, sortedReplies });
      });
    });

    if (pub) {
      State.public.user(pub).get('store').get('products').map().on((p, id) => {
        if (p) {
          const o = {};
          o[id] = p;
          Object.assign(this.liststate, o);
          this.updateTotalPrice();
        } else {
          delete this.liststate[id];
        }
        this.setState({items: this.liststate});
      });
    }
  }
}

export default ListStore;
