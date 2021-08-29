import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import StoreView from './Store.js';
import Helpers from '../Helpers.js';

class CapNew extends StoreView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {items:{}};
    this.items = {};

  }


  newProduct() {
    console.log('new');
    $(".hideThis").hide()
    var parentStore = html`<i class="fas fa-chevron-left"></i>`

    return html`
    <style>
    canvas#qr-code {
      width: 100%;
      max-width: 16em
  }
    </style>
    
  <div class="main-view" id="profile" style="    margin-top: 5em !IMPORTANT;">
    <div class="container " style=" position: sticky !important; top: 0em; padding-top: 1em;background-color: white; z-index: 10;" >
        <div class="columns twelve subMenu" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">
                <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ;  ">
                  <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
                </button>
          </div>
          <div class="flex-auto"></div>
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 0px" class="">
            <button id="containerIcon" class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ;  ">
            </button>
          </div>
        </div>
        <div class="columns twelve" style="margin-top: 1em; border-bottom: 5px solid black; padding-bottom: 10px">
        </div>
    </div>
    <div class="container" style="z-index: 0">
      <div class="columns six" style="padding-top: 1em;  padding-bottom: 10px; display: block">
        <h2 contenteditable placeholder="Blueprint Name" onInput=${e => this.newCapacityName = e.target.innerText} />
        <input style="width: 100%; background-color: #ffffff00" placeholder="Blueprint Description" onInput=${e => this.newCapacityType = e.target.value} />
        <div id="writeArray"></div>
        <br/><br/>
        <button onClick=${e => this.addCapacityClicked(e)} style="width: 100%">Add Capacity</button>
     
      </div>
      <div class="columns six" style="  ">
        <style>#mapid{height: 500px, z-index: 0}</style>
        <div id='mapid' ></div>
   
        <script>
          var center = [-33.8650, 151.2094];
            var map = L.map('mapid').setView(center, 13);
            
            
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: 'suckma/ckpnlfjf80lb117mji70ezybv',
              tileSize: 512,
              zoomOffset: -1,
              accessToken: 'pk.eyJ1Ijoic3Vja21hIiwiYSI6ImNrb2o4OTI2aTEzMTcydnBudGhoZzA0Mm8ifQ.gwJKwHzGdFtYQDnq4iqsoQ'
            }).addTo(map);
            
          // Initialise the FeatureGroup to store editable layers
          var editableLayers = new L.FeatureGroup();
          map.addLayer(editableLayers);
            
      
          var  drawPluginOptions = {
            position: 'topright',
            draw: {
              polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                  color: '#e1e100', // Color the shape will turn when intersects
                  message: console.log("naw")
                },
                shapeOptions: {
                  color: '#97009c'
                }
              },
              // disable toolbar item by setting it to false
              polyline: false,
              circle: false, // Turns off this drawing tool
              rectangle: false,
              marker: false,
              },
            edit: {
              featureGroup: editableLayers, //REQUIRED!!
              remove: false
            }
          };
          // Initialise the draw control and pass it the FeatureGroup of editable layers
          var drawControl = new L.Control.Draw(drawPluginOptions);
          map.addControl(drawControl);
          var editableLayers = new L.FeatureGroup();
          map.addLayer(editableLayers);
          var polyArray = []
          map.on('draw:created', function(e) {
            var type = e.layerType,
            layer = e.layer;
            var a = layer._latlngs[0]
              , chunk
            while (a.length > 0) {
              chunk = a.splice(0,1)
              var numItem = (chunk[0].lat) + "," + (chunk[0].lng)
              var formatItem = "[" + numItem + "]"
              console.log(formatItem)
              parsedArr = JSON.parse(formatItem);
              polyArray.push("[" + parsedArr + "]")
            }
            console.log(polyArray)
            document.getElementById("writeArray").innerText = polyArray
            if (type === 'marker') {
              layer.bindPopup('A popup!');
            }
            editableLayers.addLayer(layer);
          });
        </script>
      </div>
    </div>
  </div>
  `;
}

  onClickDelete() {
    if (confirm('Delete product? This cannot be undone.')) {
      State.public.user().get('store').get('products').get(this.props.product).put(null);
      route('/store/' + this.props.store);
    }
  }


  showProduct() {

    setTimeout(function(){


      var subInnerHTML = document.getElementById("getSubValues").innerText
      console.log(subInnerHTML)
      document.getElementById("displaySubs").outerHTML = subInnerHTML

      var stl_viewer=new StlViewer
      (
      document.getElementById("stl_cont2"),
      {
          auto_rotate:true, 
          
      models:
      [
      {filename: document.getElementById("modelDataRaw").textContent,opacity: 0.6, }
      ]
      }
      )

      var qr;
      (function() {
              qr = new QRious({
              element: document.getElementById('qr-code'),
              foreground: 'black',
              background: 'white',
              
  
              value: window.location.href 
          });
      })();
    } , 1000)

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


    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    var cartItemHolder = this.props.product + Session.getPubKey()
    var parentStore = html`<i class="fas fa-chevron-left"></i>`
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <style>
          canvas#qr-code {
              width: 100%;
              max-width: 16em;
          }
          #subList{
            display: flex !important;
            overflow-x:scroll;
           
          }
          .subItem{
            border-bottom:   
            padding: 1em;
            width: 100%;
            height: 9em;
            min-width: 8em;
            height: min-content;
            min-height: 3em
            font-weight: 500
          }
          #subList{
            display: none;
          }
          @media (max-width:625px) {
            .absoluteName{
              position: fixed;
              top: 32em;
            }
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
    <div class="main-view">
      <div class="container " style=" position: fixed !important; background-color: white; z-index: 1002; padding-top: 0em" >
        <div class="columns twelve subMenu" style="padding-bottom: 3px; padding-top: 10px; margin-left: 0px;  background-color: white; display: flex; padding-right: 2em; margin-right: 1em">
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; padding: 0px" class="">
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 5px  0px 0px 5px; background-color: #ffffff00 ; border: 1px #c5c5c5 solid ">
              <a href="/store/${Session.getPubKey()}"><i class="far fa-user" style=" color: #c5c5c5"></i><iris-text style="margin-left: 1em; color: #c5c5c5" path="profile/name" user=${Session.getPubKey()} /></a>
            </button>
            ${this.isMyProfile ? html`
            <button class="" style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px 5px 5px 0px; background-color: #22de22  " onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: black;"><i class="fas fa-share" style="color: black;"></i> New Blueprint</a>
            </button>
            ` : ''}
          </div>
          <div class="flex-auto"></div>
          <div class="glow" style=" color: #000 !important;  font-size: 20px; font-weight: 400; border: 1px solid #c5c5c5; border-radius: 3px; padding: 2px" class="">  
              ${cartTotalItems ? html`
            
                  <button style=" margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 1px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid; color: #c5c5c5 " onClick=${() => route('/checkout/' + this.props.store)}>Cart (${cartTotalItems})</button>
           
              ` : ''}
 
              <button  style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid " onClick=${e => this.cloneItemClicked(e)}>
                <i class="fas fa-clone" style="font-size: 1.5em; color: #c5c5c5 "></i>
              </button>
              <button style=" margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid; color: #c5c5c5 " class="add" onClick=${() => this.addToCart()}>
                Add to cart
                ${this.cart[cartItemHolder] ? ` (${this.cart[this.props.product]})` : ''}
              </button>
              <button  style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid " onClick=${() => {
                showHideDiv('divMsg');
                } 
                
                }><i class="fas fa-qrcode" style="font-size: 1.5em; color: #c5c5c5 "></i>
              </button>
              ${this.isMyProfile ? html`
              <button style="margin-right: 0px; padding: 3px 10px; margin-left: 0em;   height: 100%; margin-right: 0px; margin-bottom: 0px; border-radius: 0px; background-color: #ffffff00 ; border-right: 1px #c5c5c5 solid " onClick=${e => this.onClickDelete(e)}><i class="fas fa-trash" style="font-size: 1.5em; color: #c5c5c5 "></i></button>
            ` : ''}
            
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
          </div>
        </div>
      </div>
      <div class="container" style="z-index: 0">
        ${this.state.product ? html`
          <div class="columns eight" style="position: sticky; margin-top: 6em;">
   
              <div id="stl_cont2" style="width:auto; height: 30em ;margin:0 auto; overflow: hidden; z-index: 9; margin-top: 5em"></div>
          </div>
          <div class="columns four" style=" overflow: hidden !important; height: 100%; margin-top: 10em; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 6px">
            <div class="absoluteName box  padding"  style=" padding: 0m;">
              <p class="blue slim" style=" border: none; height: 5em; padding-top: 2em">
                <iris-text placeholder="Name" id="getProductName" style="font-size: 3em;" tag="" user=${this.props.store} path="store/products/${this.props.product}/productName"/>
              </p>
              <p class="blue slim" style="height: 2em;  border: none">
                <iris-text style="font-weight: 600; font-size: 20px" user=${this.props.store} path="store/products/${this.props.product}/description" placeholder="Description"/>
              </p>
              <p class="blue slim" style="height: 2em;  border: none">
                <iris-text style="font-weight: 600; font-size: 20px"  type="number"  placeholder="Price" user=${this.props.store} path="store/products/${this.props.product}/price"/>
              </p>
              <p>
                <iris-text style="display: none" id="getSubValues" placeholder="subs" user=${this.props.store} path="store/products/${this.props.product}/subs"/>
              </p>  
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>
            </div>
          </div>
          <div class="columns twelve" style="  height: 100%; margin-top: 1em">
                <hr/>
            <button class="" class="expand" style="padding: 3px 10px;">
              <p style="color: ; margin: 2px;">Siblings</p>
            </button>
            <div id="displaySubs">
            </div>
          </div>
        ` : ''}
      </div>
    </div>
`;
  
  }

  render() {
    return (this.props.store && this.props.product ? this.showProduct() : this.newProduct());
    
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.componentDidMount();
    }
  }



  addCapacityClicked() {
    var getAreaList = document.getElementById("writeArray").innerHTML
    const rndInt = Math.floor(Math.random() * 999999) + 1

    const capacity = {
      area: this.newCapacityName,
      type: this.newCapacityType,
      mapCont: getAreaList,
      areaID: rndInt
    };

    console.log(capacity);
    State.public.user().get('store').get('capacityAreas').get(rndInt).put(capacity);
    route(`/capacity/${Session.getPubKey()}`)


  }

  componentDidMount() {


    StoreView.prototype.componentDidMount.call(this);
    const pub = this.props.store;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.capa && pub) {
      State.public.user(pub).get('store').get('capacity').get(this.props.capa).on(capa => this.setState({capa}));
    }

    
  }
}

export default CapNew;
