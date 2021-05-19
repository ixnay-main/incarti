import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import StoreView from './Store.js';

class Product extends StoreView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();
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
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);

        var loc = reader.result;
        console.log(loc)
        var container = $('linkContainer');
        var anchor = ('<a download id="uploadBtn" href="' + loc + '" >File</a>');
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
      <div id="container">   
        <div id="stl_cont2" style="width:auto; height:20em ;margin:0 auto; overflow: hidden; position: fixed !important; top: 3em; z-index: 9"></div>
      </div>
      <div class="main-view" id="profile">
        <div class="content">
          <a href="/store/${Session.getPubKey()}"><iris-text path="profile/name" user=${Session.getPubKey()} /></a>
          <h3>Add item</h3>
          <h2 contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
          <textarea placeholder="Item description" onInput=${e => this.newProductDescription = e.target.value} style="resize: vertical"/>
          <input type="number" placeholder="Price" onInput=${e => this.newProductPrice = parseInt(e.target.value)}/>
          <hr/>
          <p>
            Item ID:
          </p>
          <p>
            <input placeholder="Item ID" onInput=${e => this.newProductId = e.target.value} />
          </p>
          <label for="file">Choose File</label>
          <input id="file" type="file" style="display: none;"/>
          <button style="background: var(--color-dark) !important; color: black; padding: 0.0em;" onClick=${e => this.donwloadThis(e)}>Upload</button>

          <button onClick=${e => this.addItemClicked(e)}>Add item</button>
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
    
    var checkExist = setTimeout(function(){

      var stl_viewer=new StlViewer
      (
      document.getElementById("stl_cont2"),
      {
          auto_rotate:true, 
        
      models:
      [
      {filename: document.getElementById("modelDataRaw").textContent,opacity: 0.8, y: 30}
      ]
      }
      )
      console.log(document.getElementById("modelDataRaw").textContent)

      var loc = document.getElementById("modelDataRaw").textContent
      var anchor = ('<a download id="uploadBtn" href="' + loc + '" ><i class="fas fa-save" style="font-size: 1.5em"></i></a>');
      $("#container-one").html(anchor)
      clearInterval(checkExist);

    }      
    
    , 300)

    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.product;
    var qr;
    (function() {
            qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 180,
            foreground: 'black',

            value: window.location.href 
        });
    })();
    if (!i) return html``;
    return html`
    
      <a href="/" onClick=${e => this.onLogoClick(e)} tabindex="0" class="visible-xs-flex logo" style="color: black; font-size: 1.5em">
        <h1  style="font-family: arialBlack; color: #e20c0c; margin: 0em; margin-left: 15px; margin-top: 3px">IXNAY</h1>

      </a>
    <div class="main-view" id="profile" style=" height: 30em; width: 100%; padding: 1em">
    <div id="stl_cont2" style="width:auto; height:60vh ;     margin-top: -10vh !important; margin:0 auto; overflow: hidden; position: fixed !important; top: 3em; z-index: 9"></div>

    <div class="content" style="position:sticky;  z-index: 13; width: 100%; border-radius: 5px 5px 0px 0px; padding: 1em; margin: 1em; background-color: white; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  margin-top: 40em ;">
        <div style="display: flex">
          <a href="/store/${this.props.store}"><i class="fas fa-chevron-left"></i> Store</a>
          <div id="container" style=" display: flex; margin-left: 2em; background-color: white">
            <div id="container-one"></div>
            ${this.isMyProfile ? html`
              <i  onClick=${e => this.onClickDelete(e)} style="font-size: 1.5em; margin-left: 2em" class="fas fa-dumpster-fire"></i>
            ` : ''}
          </div>
        </div> <hr/>

        ${this.state.product ? html`
          <iris-text tag="h3" user=${this.props.store} path="store/products/${this.props.product}/name"/>
          <p class="description">
            <iris-text user=${this.props.store} path="store/products/${this.props.product}/description"/>
          </p>
          <p class="price">
            <iris-text placeholder="Price" user=${this.props.store} path="store/products/${this.props.product}/price"/>
          </p>
          <div style="    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;padding: 0.5em;border-radius: 5px; width: fit-content; margin: auto;">
            <canvas id="qr-code" style="align-content: center  ;"></canvas>
          </div>
          <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/>
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

  addItemClicked() {
    var getModel = document.getElementById("uploadBtn").outerHTML
    var modelRaw = document.getElementById("uploadBtn").href

    const product = {
      name: this.newProductName,
      description: this.newProductDescription,
      price: this.newProductPrice,

      model: getModel,
      modelRaw: modelRaw
    };

    
    console.log(product);
    State.public.user().get('store').get('products').get(this.newProductId || this.newProductName).put(product);
    route(`/store/${Session.getPubKey()}`)
  }

  componentDidMount() {
    StoreView.prototype.componentDidMount.call(this);
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
