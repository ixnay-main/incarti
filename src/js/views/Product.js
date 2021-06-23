import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import StoreView from './Store.js';
import Helpers from '../Helpers.js';


class Product extends StoreView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {items:{}};
    this.items = {};

  }

  addToCart() {
    const count = (this.cart[this.props.product] || 0) + 1;
    State.local.get('cart').get(this.props.store).get(this.props.product).put(count);
  }

  donwloadThis(){
    
    var files = document.getElementById('file').files;
    if (files.length > 0) {
      getBase64(files[0]);
    }

    function getBase64(file) {
      var reader = new FileReader();
      $(".hideThis").show()

      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);

        var loc = reader.result;
        console.log(loc)
        var anchor = ('<a id="uploadBtn" style="color: #000; font-size: 1.5em !important; margin-top: -0em" download href="' + loc + '" ><i class="far fa-save" style="margin-top: 0.6em;" ></i></a>');
        document.getElementById("containerIcon").outerHTML = anchor
          var stl_viewer=new StlViewer
          (
          document.getElementById("stl_cont2"),
          {
      
              auto_rotate:true,
         

              
          models:
          [
          {filename: loc , opacity: 0.6}
          ]
          }
          )




      };   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
    }


 
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

    <a href="https://incarti.vercel.app/src/#/">
      <div  class="" style="margin: auto; position: fixed;     top: -3px;background-color: white !Important; z-index: 1002;     width: 100%;
      border-bottom: 8px solid black;"> 
        <h1 style="font-family: arialBlack; color: black; font-size: 2.8em; margin: 0px;">IXNAY</h1>
      </div>
    </a>
    
    <div class="main-view" id="profile" style="margin-top: 5em">
      <div class="container">
        <div class="columns four" >
        <br/>
          <div class="" style=" z-index: 4; height: fit-content; ">
            <p contenteditable placeholder="Item name" style="font-size: 60px; margin: 0em; font-weight: 800;" onInput=${e => this.newProductName = e.target.innerText} />
          </div><br/>
          
          <div style="  width: fit-content">
            <a style="margin-right: 1.3em" href="/store/${this.props.store}" id="getParentStore"><iris-text editable="false"  user=${this.props.store}/>${ parentStore }</a>
            <button class="expand" style="border-radius: 10px;  border: 2px solid #e5e5e5; padding: 2px 7px">ETH Ξ</button>
          </div>
          <br/><br/>
          <div style="" class="">
            <div style="display: flex">
              <p style="margin-bottom:6px; width: 50% ">Issue Name</p>
              <p style="margin-bottom:6px;  width: 50% ">Issue ID</p>
            </div>

            <div style="display: flex">
              <p style="margin: auto;  margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50%; font-size: 24px; font-weight: 600; "contenteditable placeholder="Issue ID" onInput=${e => this.newProductWeight = e.target.innerText} />
              <p style="margin: auto;  margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50%; font-size: 24px; font-weight: 600; "contenteditable placeholder="Unit Weight" onInput=${e => this.newProductId = e.target.innerText} />
            </div>
          </div>     <br/><br/>
          
          <div class="" style="height: fit-content; ">
            <div class="" style="display: flex; border-radius: 0px">
              <input multiple id="file" type="file" style="border-radius: 0px; background-color: transparent; padding-left: 0em"/>
              <p style="    width: fit-content; margin-right: 1em; border-radius: 3px; padding-top: 14px;margin-left: 3em "  onClick=${e => this.donwloadThis(e)}><i style="color: #000; font-size: 1.5em !important;margin-top: -0.6em;" class="fas fa-upload"></i></p>
              <div id="containerIcon"></div> 
            </div>
            <p>Items must have a file. Upload a file, then click the  <i style="color: #000; font-size: 1.2em !important;margin-top: -0.6em;" class="fas fa-upload"></i> icon. Stl files will be rendered.<p/>
          </div>
          </div>
          <div class="" style="fit-content; border-radius: 10px !important">
            <div style="background-color: transparent; margin: auto; text-align:center; width: 10em; border-radius: 3px; padding: 5px;  " onClick=${e => this.addItemClicked(e)}><i class="fas fa-plus"></i></div>
          </div>
        </div>
        <div class="columns eight"  style="background-color: #7dbea920; border-radius: 10px">
          <div id="stl_cont2" class="" style="width:auto; min-height: 40em ;  border-radius: 10px !important; margin:0 auto; overflow: hidden; z-index: 9;  "><p style="display: none">o</p></div>        
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




  cloneItemClicked() {

    console.log(this.props.product)


    var randNum = Math.floor(Math.random() * 9999) + 1;
    var getModel = document.getElementById("modelDataRaw").textContent


    const product = {
      name: this.props.product + '.' + randNum,
      description: this.newProductDescription,
      id: this.newProductId,

      weight: this.newProductWeight,
      modelRaw: getModel,

    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
    route(`/store/${Session.getPubKey()}`)
  }

  showProduct() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);

    setTimeout(function(){
      var rawDataPls = document.getElementById("modelDataRaw").textContent
      var anchor = ('<a id="uploadBtn" style="color: #000; font-size: 1.5em !important; margin-top: -0em" download href="' + rawDataPls + '" ><i class="fas fa-download" style="font-size: 1.3em; margin-top: 12px; margin-left: 5px" ></i></a>');
      document.getElementById("containerIcon").outerHTML = anchor

      console.log("once")
      clearInterval();
    }, 3000)

    setTimeout(function(){

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
      console.log(document.getElementById("modelDataRaw").textContent)



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




    var parentStore = html`<i class="fas fa-chevron-left"></i>`
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <style>

        canvas#qr-code {
          width: 100%;
          max-width: 16em
      }

        iris-text p {
          margin: 0;
      }
    </style>

  <a href="https://incarti.vercel.app/src/#/">
    <div  class="" style="margin: auto; position: fixed;     top: -3px;background-color: white !Important; z-index: 1002;     width: 100%;
    border-bottom: 8px solid black;"> 
      <h1 style="font-family: arialBlack; color: black; font-size: 2.8em; margin: 0px;">IXNAY</h1>
    </div>
  </a>
<div class="container" style="padding: 1em; margin-top: 0em;  z-index: 5;padding-top: 1em">


    <div class="columns six" style="padding-top: 2em" >
      ${this.state.product ? html`
        <div class="productInfo" style="">
        <br/><br/>
          <p  style="width:fit-content; " type="" ><iris-text  style="font-size: 60px; margin: 0em; font-weight: 800;  width:fit-content;" tag="p" placeholder="Issue Name" user=${this.props.store} id="whatPrice" path="store/products/${this.props.product}/name"/></p>
          <br/>

          <div style="width: fit-content">
            <a href="/store/${this.props.store}" id="getParentStore"><iris-text editable="false"  user=${this.props.store}/>${ parentStore }

            <button class="expand" style=" margin-left: 1.4em; border-radius: 10px;  border: 2px solid #e5e5e5; padding: 2px 7px"><iris-text editable="false" path="profile/name" user=${this.props.store}/></button>
            </a>
          </div>
          <br/><br/>
          <div style="" class="">
          
            <div style="display: flex">
              <p style="margin-bottom:6px; width: 50% ">Issue Name</p>
              <p style="margin-bottom:6px;  width: 50% ">Issue ID</p>
            </div>

            <div style="display: flex">
              <p style="margin: auto; margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50% "><iris-text style="font-size: 24px; font-weight: 600; "  tag="p" placeholder="Weight" user=${this.props.store} path="store/products/${this.props.product}/weight"/></p>
              <p style="margin: auto;  margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50% "><iris-text  style="font-size: 24px; font-weight: 600;" tag="p" placeholder="Issue ID" user=${this.props.store} path="store/products/${this.props.product}/id"/></p>
            </div>


          </div><br/>
          <div style="" class="">
          
            <div style="display: flex">
              <p style="margin-bottom:6px;">Description</p>
            </div>

            <div style="display: flex">
              <p style="margin: auto; margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; "><iris-text style="font-size: 24px; font-weight: 600; "  tag="p" placeholder="Description" user=${this.props.store} path="store/products/${this.props.product}/description"/></p>
            </div>


          </div><br/><br/>

          <div style="">   
            <div style="display: flex" class="" id="addHere">
              <button class="expand pay-button" style="" onClick=${() => {showHideDiv('divMsg')} }><i class="fas fa-qrcode" style="font-size: 1.7em"></i></button>
              <button class="expand pay-button" style="" onClick=${() => { 
                var inputc = document.body.appendChild(document.createElement("input"));
                inputc.value = window.location.href;
                inputc.focus();
                inputc.select();
                document.execCommand('copy');
                inputc.parentNode.removeChild(inputc);
                document.getElementById("likeBtn").style.color = "green";

                } }><i class="fas fa-link" id="likeBtn" style="font-size: 1.7em"></i>


              </button>

              <button class="expand" style="" onClick=${e => this.cloneItemClicked(e)}><i class="fas fa-clone" style="font-size: 1.7em"></i></button>
              ${this.isMyProfile ? html`
                <button class="expand" style="" onClick=${e => this.onClickDelete(e)}><i class="fas fa-trash" style="font-size: 1.7em"></i></button>
              ` : ''}
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>
              <div id="containerIcon"></div>
            </div>
            <div id="divMsg" style="display:none">
              <div style="border-radius: 10px;padding: 0.2em;">
                <canvas id="qr-code" style="align-content: center  ;"></canvas>
              </div>    
            </div>
          </div>    
        </div>
      ` : ''}
    </div>
    <div class="columns six" style="background-color: #7dbea940; border-radius: 10px; margin-top: 5em !Important">
      <div id="stl_cont2" style="width:auto; height: 60em ;margin:0 auto; overflow: hidden; z-index: 9"></div>
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


  addItemClicked() {

    var getModel = document.getElementById("uploadBtn").outerHTML 
    var modelRaw = document.getElementById("uploadBtn").href 



    const product = {
      name: this.newProductName,
      id: this.newProductId,
      description: this.newProductDescription,
      weight: this.newProductWeight,


      model: getModel,
      modelRaw: modelRaw,

  
    };

    console.log(product);
    State.public.user().get('store').get('products').get(this.newProductName).put(product);
    route(`/store/${Session.getPubKey()}`)


  }

  componentDidMount() {


    const pub = this.props.store;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.product && pub) {
      State.public.user(pub).get('store').get('products').get(this.props.product).on(product => this.setState({product}));
    }

    
  }
}

export default Product;
