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

    cloneItemClicked() {
    const product = {
      name: this.newProductName,
      description: this.newProductDescription,
      price: this.newProductPrice
    };
    console.log(this.props.product)
    State.public.user().get('store').get('products').put(product);
    route('/store/' + this.props.store);
  }

  donwloadThis(){
    
    var files = document.getElementById('file').files;
    if (files.length > 0) {
      getBase64(files[0]);
    }

    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);

        var loc = reader.result;
        console.log(loc)
        var container = $('linkContainer');
        var anchor = ('<a id="uploadBtn" download href="' + loc + '" >File</a>');
        $("#container").append(anchor)
          var stl_viewer=new StlViewer
          (
          document.getElementById("stl_cont2"),
          {
      
              auto_rotate:true,
         

              
          models:
          [
          {filename: loc , rotationx:-1.570796, color: ""}
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

    return html`
    <div class="main-view" id="profile" style="">
    <div id="container">   
      <div id="stl_cont2" style="width:auto; height:40vh ;margin:0 auto; overflow: hidden; position: fixed !important; top: 2em; z-index: 9; margin: auto"></div>
    </div>
    <div class="content" style="background-color: whitesmoke; z-index: 1001;     position: sticky; margin-top: 20em; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; border-radius: 10px; height: fit-content; ">
        <div class="productInfo">
          <a href="/store/${Session.getPubKey()}"><iris-text path="profile/name" user=${Session.getPubKey()} /></a>
          <p contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
        </div>
        <br/><br/>
        <div style="display: flex">
          <div class="productInfo">
            <p >Price</p>
            <p contenteditable type="number" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.innerText)}/>
          </div>

          <div class="productInfo" style="margin-left: 8em">
            <p >Location</p>
            <p contenteditable placeholder="Item Location" onInput=${e => this.newProductLocation = e.target.innerText} />
          </div>
          <div class="productInfo" style="margin-left: 8em">
            <p>Subcomponentry</p>
            <p contenteditable placeholder="subs Name" onInput=${e => this.newProductSubName = e.target.innerText} />
          </div>
          <div class="productInfo" style="margin-left: 8em">
            <p>ID</p>
            <p class="addPadding" contenteditable placeholder="Item ID" onInput=${e => this.newProductId = e.target.innerText} />
          </div>
          <div class="productInfo" style="margin-left: 8em">
            <button style="background: var(--color-dark) !important; color: white; padding: 0.0em;" onClick=${e => this.donwloadThis(e)}>Upload
            </button>
            <label for="file">Choose File</label>
            <input id="file" type="file" style="display: none;"/>
          </div>
        </div>
        <br/><br/>
        <div style="display: flex">
          
          <div style="display: flex">
            <div class="productInfo" >
              <p >Quantity Desired</p>
              <p contenteditable placeholder="Desired Qunaity" onInput=${e => this.newProductDesQuantity = e.target.innerText} />
            </div>
            <div class="productInfo" style="margin-left: 8em">
              <button onClick=${e => this.addItemClicked(e)}>Add item</button>
            </div>
          </div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
      </div>
    </div>
    `;
  }

  

  createMarginalCost(){
    var previousPrice = 90
    var previousQuantity = 48

    var thisQuantity = document.getElementById("quantity").innerText
    var thisPrice = document.getElementById("price").innerText

    console.log(thisQuantity)
    console.log(thisPrice)

    var marginalCost = ( thisPrice - previousPrice )   / ( thisQuantity - previousQuantity) 

    console.log( marginalCost )

    $('marginalCostBox').html(marginalCost) 
    document.getElementById("marginalCostBox").innerHTML = marginalCost
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

    const clonedproduct = {
      name: this.props.product + '.' + randNum,
      description: this.newProductDescription,
      price: this.newProductPrice
    };
    console.log(clonedproduct);
    State.public.user().get('store').get('products').get( clonedproduct.name ).put(clonedproduct);
    route(`/store/${Session.getPubKey()}`)
  }

  showProduct() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);

    setTimeout(function(){

      var stl_viewer=new StlViewer
      (
      document.getElementById("stl_cont2"),
      {
          auto_rotate:true, 
      models:
      [
      {filename: document.getElementById("modelDataRaw").textContent,opacity: 0.8}
      ]
      }
      )
      console.log(document.getElementById("modelDataRaw").textContent)

    } , 1000)

    var parentStore = html`<i class="fas fa-chevron-left"></i>`
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <style>

    </style>
    <div class="main-view" id="profile">
      <div id="stl_cont2" style="width:auto; height:20em ;margin:0 auto; overflow: hidden; position: fixed !important; top: 3em; z-index: 9"></div>
      <div class="content" style="background-color: whitesmoke; z-index: 1001;     position: sticky; margin-top: 20em; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; border-radius: 10px; height: fit-content; ">
        <div class="productInfo">
          <a href="/store/${this.props.store}" id="getParentStore"><iris-text editable="false"  user=${this.props.store}/>${ parentStore }</a>
        </div>
        ${this.state.product ? html`
            <div class="productInfo">
              <iris-text tag="h3" user=${this.props.store} path="store/products/${this.props.product}/name"/>
            </div>

            <div style="display: flex">
              <div class="productInfo">
                <p >Price</p>
                <iris-text class="makeBlack" id="price" style="color: black !important; text-decoration: none" placeholder="Price" user=${this.props.store} path="store/products/${this.props.product}/price"/>
              </div>
              <div class="productInfo" style="margin-left: 8em">
              <p onClick=${e => this.createMarginalCost(e)}>find marginal cost</p>
              <p id="marginalCostBox"></p>

              </div>
              <div class="productInfo" style="margin-left: 8em">
                <p >Location</p>
                  <iris-text user=${this.props.store} path="store/products/${this.props.product}/location"/><br/>
              </div>
              <div class="productInfo" style="margin-left: 8em">
              <p >Subcomponentry</p>
                <iris-text user=${this.props.store} path="store/products/${this.props.product}/subName"/><br/>
            </div>
            </div>
            <br/><hr/><br/>
            <div style="display: flex">
              <div class="productInfo" >
                <p >Quantity Desired</p>
                <iris-text user=${this.props.store} id="quantity" path="store/products/${this.props.product}/desQuantity"/><br/>
              </div>
              <div class="productInfo" style="width: fit-content; float: right; display: flex;  padding: 0em; border-radius: 5px">
                ${this.isMyProfile ? html`
                <i class="fas fa-trash-alt" style="font-size: 2em; margin-left: 8em" onClick=${e => this.onClickDelete(e)}></i> 
                ` : ''}

                <i class="fas fa-clone" style="font-size: 2em; margin-left: 2em" onClick=${e => this.cloneItemClicked(e)}></i>
 
                <i class="fas fa-link" id="linkBtn" style="font-size: 2em; margin-left: 2em" onClick=${() => { 
                  var inputc = document.body.appendChild(document.createElement("input"));
                  inputc.value = window.location.href;
                  inputc.focus();
                  inputc.select();
                  document.execCommand('copy');
                  inputc.parentNode.removeChild(inputc);
                  document.getElementById("likeBtn").style.color = "green";

                  } }></i>
   
              </div>
            </div><br/><hr/><br/>
            <div style="display: flex" style="padding-bottom: 5em">
              <div class="productInfo"  >
              <p>Sub Componentry</p>
              <iris-text  user=${this.props.store} path="store/products/${this.props.product}/subComp"/><br/>

              </div>
            </div>

            <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>
            
            <iris-text user=${this.props.store} editable="false" href="store/products/${this.props.product}/model" onClick=${() => {console.log("gimmme files")}}/>
        ` : ''}
      </div>
    </div>`;
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

      subName: this.newProductSubName,
      subAddy: this.newProductSubAddy,
    };
    console.log(sub.subName);
    State.public.user().get('store').get('products').get(this.newProductId || this.newProductName).get(this.newProductSubName).put(sub);
  }


  addItemClicked() {
    var getModel = document.getElementById("uploadBtn").outerHTML
    var modelRaw = document.getElementById("uploadBtn").href

    const product = {
      name: this.newProductName,
      description: this.newProductDescription,
      price: this.newProductPrice,
      location: this.newProductLocation,
      desQuantity: this.newProductDesQuantity,
      subComp: this.newProductSubComp,

      model: getModel,
      modelRaw: modelRaw
    };
    console.log(product);
    State.public.user().get('store').get('products').get(this.newProductId || this.newProductName).put(product);
    route(`/store/${Session.getPubKey()}`)
    Gun.get('blueprints').get('products').get(this.newProductId).put(product);


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
