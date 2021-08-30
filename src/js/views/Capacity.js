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

class Capacity extends View {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
    this.cart = {};
    this.state = {capacity:{}};
    this.capacity = {};

    this.id = 'capacity';
  }

  addToCart(k, e) {
    e.stopPropagation();
    const count = (this.cart[k] || 0) + 1;
    State.local.get('cart').get(this.props.store).get(k).put(count);
  }




  shouldRedirect() {
    if (!this.props.capacity) {
      route('/capacity/' + Session.getPubKey());
      return true;
    }
  }

  showHideDiv(ele) {
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
  

  renderView() {
    if (this.shouldRedirect()) {
      return '';
    }
    const cartTotalItems = Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.items[k]).reduce((sum, k) => sum + this.cart[k], 0);
    this.isMyProfile = Session.getPubKey() === this.props.capacity;
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


      var polyArray = []

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
        <div class="container blurThis" style=" position: fixed !important; background-color: ; z-index: 1002; margin-top: 0px; margin-top: 1.3em" >
          <div class="columns twelve subMenu" style="     padding: 0% 2.6%;   padding-bottom: 3px; margin-top: 1em;background-color: #fff;display: flex;">
            <div class="glow" style="" class="">
              <button class="firstCon menuItem" style="height: 2.7em">
                <a href="/store/${this.props.store}"><i class="far fa-user" style="" editable="false" path="profile/name" user=${this.props.store}/></a>
              </button>
              ${this.isMyProfile ? html`
              <button class="lastCon menuItem" style="margin-left: -9px; height: 2.7em" onClick=${() => route(`/capnew/new`)}>
                <a href="/capnew/new" class="" style=""><i class="fas fa-share" style=""></i> New Capacity</a>
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

                <button class="lastCon menuItem noshow" style=" margin-left: -9px;" class="noshow"  onClick=${() => { 
                  showHideDiv('menuMore');
                  } 
                  
                  }><i class="fas fa-expand" style="font-size: 1.5em; "></i>
                </button>
             
            </div>
          </div>
        </div>

            <div style="position: fixed;  display: none;     height: auto;
            box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
            border-radius: 10px;
            position: fixed;
            margin: 2em;
            z-index: 9001 !important;
            background-color: white;
            padding: 1em;
            height: 70%;
            width: 80%;
            top: 70px;
            " id="menuMore"  onClick=${() => {
              showHideDiv('divMsg');}}>
              <h2 onclick=${() => {route('/profile/');}}>Profile</h2>
              <h2 onclick=${() => {route('/explorer/');}}>Data</h2>
              <h2 onclick=${() => {route('/settings/');}} c>Settings</h2>

            </div>
  
        
      <div class="container" style="margin-top: 8em">
        <div class="columns eight expand" style=" height: auto; padding: 1em; margin-left: 0%;  border-radius: 10px ">
          <div class=""  style="">
            <div style="margin-top: 0em">
              ${Object.keys(this.state.capacity).map(k => {
                const i = this.state.capacity[k];
 
                var formatCont = ("[" + i.mapCont + "],")
              
    
                  var parsedArr = (formatCont);
                  polyArray.push(parsedArr)
         
                  var getContValues = document.getElementById("placeArray").innerHTML
                  getContValues.split(",")

                  var output = document.getElementById('output');


                  polyArray.forEach(element => {
                    var ele = document.createElement("div");
                    ele.setAttribute("class","placeConts");

                    var reformElement = element.replace("]]," , "]]")

                    ele.innerHTML= reformElement;
                    output.appendChild(ele);
                  } );
                  // console.log(getContValues)

                $("#placeArray").html(polyArray)
                return html`
                <div class="" style="border-radius: 5px ">
                  <div class="" style="height: fit-content; background-color: rgb(250, 251, 252); border-radius: 15px;    margin: 1em; padding: 1em">
                    <div class="" style=" padding-top: 5px; padding-bottom: 5px; ">
      
                      <div style="width:100%">
                        <p style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="description" id="areaName">[${i.area}]</p>
                        <p style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400; display: none" id="">${i.areaID}s</p>
                        
                        <h3 style="margin: 4px; font-size: 20px; font-weight: 600; font-family: arial"  class="branch twoD dent branchActive"><a style="" class="">${i.type}</a></h3>
                        <h3 style="margin: 4px; font-size: 20px; font-weight: 600; display: none" class=""><a style="" class="" >${i.mapCont}</a></h3>
                        <button onClick=${() => { 
                          var placeArea = i.area;
                          console.log(placeArea)
                          State.public.user().get('store').get('capacityAreas').get(placeArea).put(null);
                          route('/store/');
                        }}> Delete</button>
                        <p style="color: #000 !important; margin: 4px; font-size: 20px; font-weight: 400" class="description" id="range"></p>
                  
                        
                      </div>
                    </div>
                  </div>
                </div>
                `
              })}
              <div id="placeArray" style="display: none"></div>
              <div id="output" style="display: none"></div>
              <style>#map{height: 500px;z-index: 0}</style>
                        
                        <div id='map'>i</div>
                        <script>
                        
                            var center = [-33.8598342349068,151.1983512575446];
                
                            var map = L.map("map").setView(center, 1);
                            
                            
                            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                              maxZoom: 30,
                              id: 'suckma/ckpnlfjf80lb117mji70ezybv',
                              tileSize: 512,
                              zoomOffset: -1,
                              accessToken: 'pk.eyJ1Ijoic3Vja21hIiwiYSI6ImNrb2o4OTI2aTEzMTcydnBudGhoZzA0Mm8ifQ.gwJKwHzGdFtYQDnq4iqsoQ'
                            }).addTo(map);
                            

                            setTimeout(function(){
                              var divs = document.getElementsByClassName("placeConts");
                        
                              let identifier = 1;
                              Object.entries(divs).map((object) => { 
                                object.identifier = identifier++
                                var giveId =  object.identifier
                                // console.log(object[1].innerHTML) 

                                var getConts = (object[1].innerHTML)
                                // console.log(getConts)
                                var giveId = L.polygon(JSON.parse(getConts)).addTo(map);
                              })
                               
                            } , 3000)
                            
                  

                
                        </script>
            </div>
          </div>
        </div>
        <div class="columns four expand" style="height: auto; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; margin-left: 4%; border-radius: 10px  ">
          
          <div class="box  padding" style="background-color: rgb(250, 250, 250); height: auto; padding: 1em; ">
            <h1 style="font-size: 2.7em; color: rgb(10, 193, 142)">Capacity Card</h1>
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
                        <h3>Lease Available</h3>
                        <i class="fas fa-box-open"  style="font-size: 3em; color: #ffffff00"></i><h2></h2>
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
    if (prevProps.capacity !== this.props.capacity) {
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
    const pub = this.props.capacity;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: '', totalPrice: 0});
    this.isMyProfile = Session.getPubKey() === pub;
    this.cart = {};


    var getCapas = State.public.user(pub).get('capacityAreas')
    getCapas.map((v) => {
      console.log(v)
    })

    if (pub) {
      State.public.user(pub).get('store').get('capacityAreas').map().on((g, up) => {
        if (g) {
          const a = {};
          a[up] = g;
          Object.assign(this.capacity, a);
          this.updateTotalPrice();
        } else {
          delete this.capacity[up];
        }
        this.setState({capacity: this.capacity});
      });
    }
  }
}

export default Capacity;