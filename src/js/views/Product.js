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
    return html`

    <style>
    canvas#qr-code {
      width: 100%;
  }
    </style>
    
    <div class="main-view" id="profile" style="margin-top: 5em">
      <div class="container">

        <div class="columns four" >
          
          <div class="borderThis" style="height: fit-content; ">
            <div style="  padding: 1em;">
              <div class="" style=" z-index: 4; height: fit-content;">
                <p contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
              </div>
              <div class="">
        
                <p class="" style="font-size: 1.2em; margin: 0em; font-weight: 500" contenteditable placeholder="ID" onInput=${e => this.newProductId = e.target.innerText} />
              </div>

              
        
              <p class="" style="font-size: 1.2em; margin: 0em; font-weight: 500" contenteditable placeholder="Discription" onInput=${e => this.newProductDescription = e.target.innerText} />
            </div><br/><hr/>
            <div class="" style="display: flex">
              <input id="file" type="file" style="background-color: transparent; padding-left: 0em"/>
              <p style="    width: fit-content; margin-right: 1em; border-radius: 3px; padding-top: 14px;margin-left: 3em "  onClick=${e => this.donwloadThis(e)}><i style="color: #000; font-size: 1.5em !important;
              margin-top: -0.6em;" class="fas fa-upload"></i>
              </p>
              <div id="containerIcon">  </div> 

            </div>
          </div><br/>
          

          <div class="" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; background-color: white; z-index: 1001; height: fit-content; border-radius: 10px 10px 0px 0px !important">
            <div style="background-color: transparent; margin: auto; text-align:center; width: 10em; border-radius: 3px; padding: 5px;  " onClick=${e => this.addItemClicked(e)}><i class="fas fa-plus"></i></div>
          </div>
        </div>
        <div class="columns six" >
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
      price: this.newProductPrice,
      modelRaw: getModel,

    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
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




    var parentStore = html`<i class="fas fa-chevron-left"></i>`
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <style>

        canvas#qr-code {
          width: 100%;
      }

        iris-text p {
          margin: 0;
      }
    </style>

    <div class="header" style="position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 999;">
      <div class="" style="width: 100%; margin: auto; background-color: white; ">
        <div class="logoHere" style="margin: auto; width: fit-content;">
          <img style="height: 3em; margin-left: 6em !important" src="../../src/js/views/transixnay.png" alt=""/>
        </div>
      </div>
    </div>


  
<div class="container" style="padding: 1em; margin-top: 5em;  z-index: 5;">


    <div class="columns six" style="padding-top: 5em" >
      ${this.state.product ? html`
        <div class="productInfo" style="">
          <p  style="margin: auto; width:fit-content; " type="number" ><iris-text  style="font-size: 60px; margin: 0em; font-weight: 800;  width:fit-content;" tag="p" placeholder="Issue Price" user=${this.props.store} id="whatPrice" path="store/products/${this.props.product}/price"/></p>


          <div style=" margin: auto; width: fit-content">
            <a style="margin-right: 1.5em" href="/store/${this.props.store}" id="getParentStore"><iris-text editable="false"  user=${this.props.store}/>${ parentStore }</a>

            <button class="expand" style="border-radius: 10px;  border: 2px solid #e5e5e5; padding: 2px 7px">ETH Ξ</button>
          </div>

          <div style="" class="borderThis">
          
            <div style="display: flex">
              <p style="margin-bottom:2px; width: 50% ">Issue Name</p>
              <p style="margin-bottom:2px;  width: 50% ">Issue ID</p>
            </div>

            <div style="display: flex">
              <p style="margin: auto; margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50% "><iris-text style="font-size: 24px; font-weight: 600; "  tag="p" user=${this.props.store} path="store/products/${this.props.product}/name"/></p>
              <p style="margin: auto;  margin-left: 0em; margin-top: -10px;  margin-bottom: -10px; width: 50% "><iris-text  style="font-size: 24px; font-weight: 600;" tag="p" placeholder="Issue ID" user=${this.props.store} path="store/products/${this.props.product}/id"/></p>
            </div>


          </div><br/>
          <div style="display: block; border: 2px solid #e2e2e2; border-radius:5px; margin-top: 1em; padding: 10px; ">
            <p style="margin-bottom:2px">Paying</p>
            <a href="/store/${this.props.store}"><iris-text editable="false" path="profile/name" user=${this.props.store}/></a>
            <div class="flowbg" style="background: rgb(213,232,68); background: linear-gradient(90deg, rgba(213,232,68,1) 0%, rgba(245,78,55,1) 51%, rgba(255,0,243,1) 100%); width: 100%; height: 5px">
              <p style="display: none">o</p>
            </div>
          </div><br/>
          <div style="display: flex">
            <div style="width: 47%; 
                margin: auto;
                margin-right: 6%;
                border-radius: 10px;
                padding: 0.2em;">
                  <canvas id="qr-code" style="align-content: center  ;"></canvas>
            </div>      
            <div style=" width: 47%; display: block">
              <button class="expand pay-button" style="border-radius: 10px;  width: 100%; background-color: #bdbdfd" onClick=${() => { 
                    var inputc = document.body.appendChild(document.createElement("input"));
                    inputc.value = window.location.href;
                    inputc.focus();
                    inputc.select();
                    document.execCommand('copy');
                    inputc.parentNode.removeChild(inputc);
                    document.getElementById("likeBtn").style.color = "green";

                    } }>Copy Link</button>
              <button class="expand pay-button" style="border-radius: 10px;  width: 100%; background-color: #bdbdfd">Pay</button>
              ${this.isMyProfile ? html`
                <button class="expand" style="border-radius: 10px;  width: 100%; background-color: #bdbdfd" onClick=${e => this.onClickDelete(e)}>Delete</button>
              ` : ''}
              <button class="expand" style="border-radius: 10px; width: 100%; background-color: #bdbdfd" onClick=${e => this.cloneItemClicked(e)}>Clone</button>
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>
              <iris-text user=${this.props.store} editable="false" href="store/products/${this.props.product}/model" onClick=${() => {console.log("gimmme files")}}/>
            </div>
          </div>    
        </div>
      ` : ''}
    </div>
    <div class="columns six">
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

  addSubClickedParent() {
    $(".hide1").show();
    const subParent = {

      subName: this.newProductSubNameParent,
      subAddy: this.newProductSubAddyParent,

    };

    var checkParentName = subParent.subName
    
    if(checkParentName.length < 1){
      checkParentName = false
    } else {
      checkParentName = checkParentName
    }

    console.log(subParent.subName);


    document.getElementById('clearThis').innerText = ' '
    document.getElementById('clearThis2').innerText = ' '

    //parent messy
    var parentNameRaw = subParent.subName
    var anchorRaw = ('<a style="color: black; font-size: 2em" target="blank" href="' + "//" + subParent.subAddy + '" >"' + parentNameRaw + '"</a>');
    $("#listParent").append(anchorRaw)
  }

  addSubClickedBrother() {
    $(".hide2").show();

    const subBrother = {

      subName: this.newProductSubNameBrother,
      subAddy: this.newProductSubAddyBrother,

    };


    var checkBrotherName = subBrother.subName
    
    if(checkBrotherName.length < 1){
      checkBrotherName = false
    } else {
      checkBrotherName = checkBrotherName
    }

    console.log(subBrother.subName);

    document.getElementById('clearThis3').innerText = ' '
    document.getElementById('clearThis4').innerText = ' '

    //brother messy
    var brotherNameRaw = subBrother.subName
    var anchorRaw = ('<a style="color: black; font-size: 2em" target="blank" href="' + "//" + subBrother.subAddy + '" >"' + brotherNameRaw + '"</a>');
    $("#listBrother").append(anchorRaw)
  }

  addSubClickedChild() {
    $(".hide3").show();

    const subChild = {

      subName: this.newProductSubNameChild,
      subAddy: this.newProductSubAddyChild,

    };

    console.log(subChild.subName);
    console.log(subChild.subAddy);


    document.getElementById('clearThis5').value = ' '
    document.getElementById('clearThis6').value = ' '

    //child messy
    var childNameRaw = subChild.subName
    var anchorRaw = ('<a style="color: black; font-size: 2em" target="blank" href="' + "//" + subChild.subAddy + '" >"' + childNameRaw + '"</a>');
    $("#listChild").append(anchorRaw)
  }


  addItemClicked() {

    var getModel = document.getElementById("uploadBtn").outerHTML 
    var modelRaw = document.getElementById("uploadBtn").href 



    const product = {
      name: this.newProductName,
      id: this.newProductId,
      description: this.newProductDescription,

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
