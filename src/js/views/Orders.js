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

class Orders extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.state = {items:{} , orderglobal:{}, orderpiece:{}};
    this.items = {};
    this.orderglobal = {};
    this.orderpiece = {};

    this.id = 'profile';
    
  }

  addToCart(k, e) {
    e.stopPropagation();
    const count = (this.cart[k] || 0) + 1;
    State.local.get('cart').get(this.props.orders).get(k).put(count);
  }

  shouldRedirect() {
    if (!this.props.orders) {
      route('/orders/' + Session.getPubKey());
      return true;
    }
  }



  renderOut() {
    if (this.shouldRedirect()) {
      return '';
    }
    this.isMyProfile = Session.getPubKey() === this.props.orders;
    const chat = Session.channels[this.props.orders];



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

    function showHideOrder(divOrder) {
      var srcElement = document.getElementById(divOrder);
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

.orders-items {
  display: block;
  flex-wrap: wrap;
}

p.profile-about-content{
  display:none
}
    </style>

        <div id="divMsg" style="display:none; position: absolute; margin-top: 10em; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center;margin-top: -2em;padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/orders/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>




        <div class="container blurThis" style=" background-color: white; z-index: 1002; margin-top: 0px" >
        <div class="columns twelve" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">

            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid ">
              <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
            </button>

            ${this.isMyProfile ? html`
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: #c5c5c5;"><i class="fas fa-share" style="color: #c5c5c5;"></i> New Blueprint</a>
            </button>
            ` : ''}
          </div>
        
        </div>
      </div>


      <div class="container">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  style="margin-top: 56px">
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 3em " id="hideBlues"> 
              <div style="width:100%;  border-bottom: 2px solid grey; background-color: white; padding: 5px;">
                <h2 class="" style=""> INCOMING ORDERS</h2>
                <div style="display: flex; ">
              
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                </div>

              </div>
              <div style="margin-top: 2em">

                ${Object.keys(this.state.orderpiece).map(k => {
                  const i = this.state.orderpiece[k];
                  return html`
                  <div class="" style="width:100%;">
                    <div class="" style="width:100%">
                      <div class=""  style="display: flex; padding-top: 5px; padding-bottom: 5px; width:100%">
        
                        <div style="display: flex;width:100%">
                          <div style="display :flex; margin-right: 1.3em ">
                            <div class="smolbar2" id="timeBar" style=""></div>
                            <div class="smolbar2" style=""></div>
                            <div class="smolbar2" style=""></div>
                          </div>
                          <div class="container">
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400; padding-right: 1em" id="orderTime">a[${i.time}]</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400; padding-right: 1em" >[${i.productName}]</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400; padding-right: 1em" >${i.delivery}</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400; padding-right: 1em" >${i.itemNames}</p>
                          </div>

                          

                          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 2px" class="">              ${this.isMyProfile ? html`
                          
                            <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => {
                              showHideOrder('divOrder');
                              } 
                              
                              }><i class="fas fa-expand" style="font-size: 1.5em; color: #c5c5c5"></i>
                            </button>
                          ` : ''}</div>


                        </div>

                      </div>
                    </div>
                    
                  </div>
                  <div id="divOrder" style="display:none; position: absolute;  !Important; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center; margin-top: -2em;padding-top: 10em; z-index: 0 !important;
                  margin-top: -15em;
                  padding-top: 16em; padding: 1em;
                  padding-bottom: 10em;" onClick=${() => {
                    showHideDiv('divOrder');}}>
                    <div style="height: 14em; border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 ;     background-color: white; width: 100% !important;">
                      <h1 style="font-family: arialBlack">IXNAY</h1>
                      <a href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: black !Important;margin-top: 1em"><i class="far fa-user" style=" color: #000000"></i><iris-text style="margin-left: 1em; color: #000000" path="profile/name" user=${Session.getPubKey()} /></button></a>
                      <div class="container">
                        <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a style="color: #000 !important" class="columns three" contenteditable="true">[${i.time}]</a></h3>
                        <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a style="color: #000 !important" class="columns three" contenteditable="true">[${i.productName}]</a></h3>

                        
                        <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a style="color: #000 !important" class="columns three" contenteditable="true">${i.itemNames}</a></h3>
                        <h3 style="margin: 4px; width: 40%; font-size: 20px; font-weight: 600"><a style="color: #000 !important" class="columns three" contenteditable="true">[${i.delivery}]</a></h3>
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

  renderIn() {
    if (this.shouldRedirect()) {
      return '';
    }
    this.isMyProfile = Session.getPubKey() === this.props.orders;
    const chat = Session.channels[this.props.orders];



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

    function showHideOrder(divOrder) {
      var srcElement = document.getElementById(divOrder);
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

.orders-items {
  display: block;
  flex-wrap: wrap;
}

p.profile-about-content{
  display:none
}
    </style>

        <div id="divMsg" style="display:none; position: absolute; margin-top: 10em; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center;margin-top: -2em;padding-top: 10em; " onClick=${() => {
          showHideDiv('divMsg');}}>
          <div style="border-radius: 10px;padding: 0.2em; margin: auto;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 height: 20em;     background-color: white;
          width: 20em !important;">
            <h1 style="font-family: arialBlack">IXNAY</h1>
            <a spellcheck="false" href="/orders/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: white"></i><iris-text spellcheck="false" style="margin-left: 1em; color: white" path="profile/name" user=${Session.getPubKey()} /></button></a>

            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>    
        </div>




        <div class="container blurThis" style=" background-color: white; z-index: 1002; margin-top: 0px" >
        <div class="columns twelve" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">

            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid ">
              <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
            </button>

            ${this.isMyProfile ? html`
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;    margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: #c5c5c5;"><i class="fas fa-share" style="color: #c5c5c5;"></i> New Blueprint</a>
            </button>
            ` : ''}
          </div>
        
        </div>
      </div>


      <div class="container">

        <div class="columns twelve" style=" height:fit-content; ">
          <div class=""  style="margin-top: 56px">
            <div style=" height: fit-content; font-weight: 600; font-size: 1.7em; margin-bottom: 3em " id="hideBlues"> 
              <div style="width:100%;  border-bottom: 2px solid grey; background-color: white; padding: 5px;">
                <h2 class="" style=""> GLOBAL ORDERS</h2>
                <div style="display: flex; ">
              
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                  <p style="width: 20%; color: #000 !important; margin: 4px; font-size: 20px; font-weight: 600" class=""></p>
                </div>

              </div>
              <div style="margin-top: 2em">

                ${Object.keys(this.state.orderglobal).map(k => {
                  const i = this.state.orderglobal[k];
                  return html`
                  <div class="" style="width:100%;">
                    <div class="" style="width:100%">
                      <div class=""  style="display: flex; padding-top: 5px; padding-bottom: 5px; width:100%">
        
                        <div style="display: flex;width:100%">
                          <div style="display :flex; margin-right: 1.3em ">
                            <div class="smolbar2" id="timeBar" style=""></div>
                            <div class="smolbar2" style=""></div>
                            <div class="smolbar2" style=""></div>
                          </div>
                          <div class="container">
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" id="orderTime">[${i.time}]</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >[${i.productName}]</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >${i.delivery}</p>
                            <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >${i.itemNames}</p>
                          </div>
                          

                          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 2px" class="">              ${this.isMyProfile ? html`
                          
                            <button class="" style="padding: 3px 10px; margin-left: 0em; height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px ; background-color: #ffffff00"  onClick=${() => {
                              showHideOrder('divOrder');
                              } 
                              
                              }><i class="fas fa-expand" style="font-size: 1.5em; color: #c5c5c5"></i>
                            </button>
                          ` : ''}</div>


                        </div>

                      </div>
                    </div>
                    
                  </div>
                  <div id="divOrder" style="display:none; position: absolute;  !Important; width: 100%; z-index: 2004;     background-color: #ffffffe0;height: 100%; text-align: center; z-index: 0 !important;
                  margin-top: -15em;
                  padding-top: 16em;
                  padding-bottom: 10em;" onClick=${() => {
                    showHideDiv('divOrder');}}>
                    <div style="border-radius: 10px; padding: 0.2em; margin: auto; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; z-index: 1004 ; height: auto;     background-color: white;width: 90% !important; ">
                      <h1 style="font-family: arialBlack">IXNAY</h1>
                      <a href="/store/${Session.getPubKey()}"><button class="expand" style="padding: 3px 10px; margin-left: 1em; background-color: #61c3f3; min-width: 6em; color: white;margin-top: 1em"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></button></a>
                      <div class="container">
                        <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" id="orderTime">a[${i.time}]</p>
                        <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >[${i.productName}]</p>
                        <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >${i.delivery}</p>
                        <p class="columns three description" style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" >${i.itemNames}</p>
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

  render() {
    let page;
      const p = this.state.page;
      if (p === 'out') {
        page = this.renderOut();
      }  else if(p === 'in') {
        page = this.renderIn();
      } else {
        page = this.renderOut();

      }
    return html`
    <div class="main-view" id="profile">
      <div class="">
      
        <p>
          <a href="/store/${this.props.store}"><iris-text path="profile/name" user=${this.props.store}/></a>
        </p>
        <div style="display: flex">
          <div id="store-steps" style="border-radius: 10px; margin-top: 1em; margin-bottom: 1em">
            <div  class=${p === 'out' ? 'active' : ''} onClick=${() => this.setState({page:'out'})}>ORDER INCOMING</div>
          </div>
          <div id="store-steps" style="margin-top: 1em; margin-bottom: 1em">
            <div  class=${p === 'in' ? 'active' : ''} onClick=${() => this.setState({page:'in'})}>GLOBAL ORDERS</div>
          </div>
        </div>
        ${page}
      </div>
    </div>`;
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders !== this.props.orders) {
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
    const pub = this.props.orders;
    this.eventListeners.forEach(e => e.off());
    this.setState({time: " ", followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.orderpiece && pub) {
      State.public.user(pub).get('store').get('liveOrders').get(this.props.orderpiece).on(product => this.setState({product}));
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

    if (pub) {
      State.public.get('globalOrderList').map().on((x, jd) => {
        if (x) {
          const n = {};
          n[jd] = x;
          Object.assign(this.orderglobal, n);
          this.updateTotalPrice();
        } else {
          delete this.orderglobal[jd];
        }
        this.setState({orderglobal: this.orderglobal});
      });
    }
  }
}

export default Orders;
