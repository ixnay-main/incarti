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

  downloadThis(){
    
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
        var container = $('linkContainer');
        var anchor = ('<a id="uploadBtn" style="color: #000; font-size: 1.5em !important; margin-top: -0em" download href="' + loc + '" ><i class="far fa-save" style="margin-top: 0.6em;" ></i></a>');
        $("#containerIcon").append(anchor)
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
    
<div class="main-view" id="profile" style="">
    <div class="container " style=" position: sticky !important; top: 1em;" >
        <div class="columns twelve" style="margin-top: 1em; border-bottom: 2px solid rgb(236, 236, 236); padding-bottom: 10px">

                <button class="expand" style="padding: 3px 10px; margin-left: 1em;">
                </button>
        </div>
    </div>

    <div class="container" >
        <div class="columns five" style="margin-top: 1em;  padding-bottom: 10px; display: block">
            <h2 style="margin: 0em" contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
            <input style="width: 100%; background-color: #ffffff00" placeholder="Item description" onInput=${e => this.newProductDescription = e.target.value} />
            <input type="number" style="width: 100%;background-color: #ffffff00" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.value)}/>
        
                <input style="background-color: #ffffff00; width: 100%;" placeholder="Item ID" onInput=${e => this.newProductId = e.target.value} />
        
            <div class="" style="height: fit-content; ">
                <div class="" style="display: flex; border-radius: 0px">
                <input id="file" type="file" style="border-radius: 0px; background-color: transparent; padding-left: 0em"/>
                <p style="    width: fit-content; margin-right: 1em; border-radius: 3px; padding-top: 14px;margin-left: 3em "  onClick=${e => this.downloadThis(e)}><i style="color: #000; font-size: 1.5em !important;margin-top: -0.6em;" class="fas fa-upload"></i></p>
                <div id="containerIcon"></div> 
                </div>
                <p>Items must have a file. Stl files will be rendered.<p/>
            </div>
            <button onClick=${e => this.addItemClicked(e)}>Add item</button>

            
            <input style="width: 100%; background-color: #ffffff00" id="clearThis1" placeholder="sub name" onInput=${e => this.newSubName = e.target.value} />
            <input style="width: 100%;background-color: #ffffff00" id="clearThis2" placeholder="sub addy" onInput=${e => this.newSubAddy = e.target.value}/>
            <button onClick=${e => this.addSubClicked(e)}>Add Sub</button>

            
            </div>
            <div class="columns seven" style="  ">
            <div id="stl_cont2" style="width:auto; height: 30em ;margin:0 auto; overflow: hidden; z-index: 9; margin-top: 0em"></div>
            <div id="subList"></div>
            </div>

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


      <div class="container " style=" position: fixed !important; background-color: white; z-index: 1002; margin-top: 2em" >
        <div class="columns twelve" style="padding-bottom: 3px; margin-left: -1em;  background-color: white;">
            ${this.isMyProfile ? html`
            <button class="expand" style="padding: 3px 10px; margin-left: 1em;" onClick=${() => route(`/product/new`)}>
              <a href="/product/new" class="" style="color: black;"><i class="fas fa-share" style="color: black;"></i> New Blueprint</a>
            </button>
            ` : ''}

            <button class="expand" style="padding: 3px 10px; margin-left: 1em;"><i class="far fa-trash-alt"></i> Delete</button>
            ${cartTotalItems ? html`
            <button class="expand" style="padding: 3px 10px; margin-left: 1em;" onClick=${() => route('/checkout/' + this.props.store)}>Shopping cart (${cartTotalItems})</button>
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

            <button class="expand" style="padding: 3px 10px; margin-left: 1em;"  class="add" onClick=${() => this.addToCart()}>
              Add to cart
              ${this.cart[this.props.product] ? ` (${this.cart[this.props.product]})` : ''}
            </button>

            <button id='countNum'></button>
        </div>
      </div>
    <div class="container">
        ${this.state.product ? html`
          <div class="columns five" style="position: sticky; top: 3em;">

              <div class="absoluteName"  style=" padding: 0m;  margin-top: 1em; margin-bottom: 1em">

                <iris-text style="font-size: 3em" tag="h3" user=${this.props.store} path="store/products/${this.props.product}/name"/>
                <p class="description">
                  <iris-text user=${this.props.store} path="store/products/${this.props.product}/description" placeholder="Description"/>
                </p>
                <p class="price">
                  <iris-text  type="number"  placeholder="Price" user=${this.props.store} path="store/products/${this.props.product}/price"/>
                </p>
                <p class="subs">
                  <iris-text style="display: none" id="getSubValues" placeholder="subs" user=${this.props.store} path="store/products/${this.props.product}/subs"/>
                </p>  
              </div>

  
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>

              <div id="divMsg" style="display:none">
                <div style="border-radius: 10px;padding: 0.2em;">
                  <canvas id="qr-code" style="align-content: center  ;"></canvas>
                </div>    
              </div>
          </div>
          <div class="columns seven" style=" overflow: hidden !important; height: 100%; margin-top: 1em">
          <div id="stl_cont2" style="width:auto; height: 30em ;margin:0 auto; overflow: hidden; z-index: 9; margin-top: 0em"></div>

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

  addSubClicked() {
    const sub = {
      subName: this.newSubName,
      subAddy: this.newSubAddy,
    };
    var subNameValue = sub.subName
    var subAddyValue = sub.subAddy
    console.log(subNameValue)
    console.log(subAddyValue)


    document.getElementById("clearThis1").value = " "
    document.getElementById("clearThis2").value = " "


    var subDiv = `<div class="subItem"><a target="blank" href="//${subAddyValue}">${subNameValue}</a></div>`
    $("#subList").append(subDiv)

  }

  addItemClicked() {

    var getSubs = document.getElementById("subList").outerHTML;
    console.log(getSubs)

    var getModel = document.getElementById("uploadBtn").outerHTML 
    var modelRaw = document.getElementById("uploadBtn").href 



    const product = {
      name: this.newProductName,
      id: this.newProductId,
      description: this.newProductDescription,
      weight: this.newProductWeight,

      subs: getSubs,

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
