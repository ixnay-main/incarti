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
        var anchor = ('<a id="uploadBtn" style="color: #ffffff; font-size: 1.5em !important; margin-top: -0em" download href="' + loc + '" ><i class="far fa-save" style="margin-top: 0.6em;" ></i></a>');
        $("#containerIcon").append(anchor)
          var stl_viewer=new StlViewer
          (
          document.getElementById("stl_cont2"),
          {
      
              auto_rotate:true,
         

              
          models:
          [
          {filename: loc , color: "#ffffff"}
          ]
          }
          )




      };   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
    }


 
  }


  newProduct() {
    Model.JSmol.hq = true
		MolView.touch = false
		MolView.mobile = false
		MolView.layout = "layout-vsplit"
		Request.CIR.available = true;
		if(!Detector.canvas) {
			alert("MolView uses HTML Canvas for rendering, but it is not supported by your browser.")
		}


    console.log('new');
    $(".hideThis").hide()
    return html`

    <div class="header" style="position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 999;">
    <div class="" style="width: 100%; margin: auto; background-color: whitesmoke; ">
      <div class="logoHere" style="margin: auto; width: fit-content;">
        <img style="height: 3em; margin-left: 6em !important" src="../../src/js/views/transixnay.png" alt=""/>
      </div>
    </div>
  </div>

<div class="main-view" id="profile" style="margin-top: 5em">
  <div class="container">


    <div class="columns six" >
        <div class="content" style="background-color: whitesmoke; z-index: 1001; height: fit-content; border-radius: 10px 10px 0px 0px !important">

        
          <div style="background-color: grey; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 0px 0px 10px 10px;  padding: 1em;">
            <div class="" style="background-color: ;  z-index: 4; height: fit-content;">
              <p contenteditable placeholder="Item name" onInput=${e => this.newProductName = e.target.innerText} />
            </div>
            <div class="">
      
              <p class="" style="font-size: 1.2em; margin: 0em; font-weight: 500" contenteditable placeholder="ID" onInput=${e => this.newProductId = e.target.innerText} />
            </div>

            <div class="">
      
            <p class="" style="font-size: 1.2em; margin: 0em; font-weight: 500" contenteditable placeholder="Discription" onInput=${e => this.newProductDescription = e.target.innerText} />
          </div><br/><hr/>
          <div class="" style="display: flex">
            <input id="file" type="file" style="background-color: transparent; padding-left: 0em"/>
            <p style="    width: fit-content; margin-right: 1em; border-radius: 3px; padding-top: 14px;margin-left: 3em "  onClick=${e => this.donwloadThis(e)}><i style="color: #ffffff; font-size: 1.5em !important;
            margin-top: -0.6em;" class="fas fa-upload"></i>
            </p>
            <div id="containerIcon">  </div> 

          </div>
        </div><br/>
        <div class="content" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; background-color: whitesmoke; z-index: 1001; height: fit-content; border-radius: 10px  !important">
          <p class="" style="    margin-bottom: 0.2em;" id="clearThis" contenteditable placeholder="Parent component name" onInput=${e => this.newProductSubNameParent = e.target.innerText} />
          <p class="" style="    margin-bottom: 0em;" id="clearThis2" contenteditable placeholder="Parent component URL" onInput=${e => this.newProductSubAddyParent = e.target.innerText} />
          <div style="background-color: transparent; text-align:left; padding: 0px;  " onClick=${e => this.addSubClickedParent(e)}><i class="fas fa-plus"></i></div>
        </div><br/>

        <div class="content" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding: 1em; background-color: whitesmoke; z-index: 1001; height: fit-content; border-radius: 10px !important">
          <p class="" style="    margin-bottom: 0.2em;" id="clearThis3" contenteditable placeholder="Brother component name" onInput=${e => this.newProductSubNameBrother = e.target.innerText} />
          <p class="" style="    margin-bottom: 0em;" id="clearThis4" contenteditable placeholder="Brother component URL" onInput=${e => this.newProductSubAddyBrother = e.target.innerText} />
          <div style="background-color: transparent; text-align:left; padding: 0px;  " onClick=${e => this.addSubClickedBrother(e)}><i class="fas fa-plus"></i></div>
        </div><br/>

        <div class="content" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; background-color: whitesmoke; z-index: 1001; padding: 1em; height: fit-content; border-radius: 10px  !important">
          <p class="" style="    margin-bottom: 0.2em;" id="clearThis5" contenteditable placeholder="Child component name" onInput=${e => this.newProductSubNameChild = e.target.innerText} />
          <p class="" style="    margin-bottom: 0em;" id="clearThis6" contenteditable placeholder="Child component URL" onInput=${e => this.newProductSubAddyChild = e.target.innerText} />
          <div style="background-color: transparent; text-align:left; padding: 0px;  " onClick=${e => this.addSubClickedChild(e)}><i class="fas fa-plus"></i></div>
        </div><br/>

        <div class="content" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; background-color: whitesmoke; z-index: 1001; height: fit-content; border-radius: 10px 10px 0px 0px !important">
          <div style="background-color: transparent; margin: auto; text-align:center; width: 10em; border-radius: 3px; padding: 5px;  " onClick=${e => this.addItemClicked(e)}><i class="fas fa-plus"></i></div>
        </div>
      </div>
    </div>
    <div class="columns six" style="">
      <div id="stl_cont2" class="hideThis" style="width:auto; min-height: 40em ;  border-radius: 10px !important; margin:0 auto; overflow: hidden; z-index: 9; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; "></div>
      <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
        <div style="margin-top: 1em; border-radius: 10px; ">
          <p style="font-weight: 600; font-size: 1.3em; padding: 1em; margin: 0em">Parent Componentry</p>
          <div  style="background-color: grey !important; padding: 1em; border-radius: 0px 0px  3px 3px;" id="listParent">
            <a style="display: none">holder</a>
          </div>
        </div>
        <div style="margin-top: 1em; border-radius: 10px; ">
          <p style="font-weight: 600; padding: 1em; font-size: 1.3em; margin: 0em">Brother Componentry</p>
          <div style="background-color: grey !important; padding: 1em; border-radius: 0px 0px  3px 3px;" id="listBrother">
            <a style="display: none">holder</a>
          </div>
          </div>
        <div style="margin-top: 1em; border-radius: 10px; ">
          <p style="font-weight: 600; font-size: 1.3em; padding: 1em ;margin: 0em">Child Componentry</p>
          <div style="background-color: grey !important; padding: 1em; border-radius: 0px 0px  3px 3px;" id="listChild">
            <a style="display: none">holder</a>
          </div>
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
      {filename: document.getElementById("modelDataRaw").textContent,opacity: 0.8}
      ]
      }
      )
      console.log(document.getElementById("modelDataRaw").textContent)

      var qr;
      (function() {
              qr = new QRious({
              element: document.getElementById('qr-code'),
              size: 220,
              foreground: 'black',
              background: 'whitesmoke',
              
  
              value: window.location.href 
          });
      })();
    } , 1000)




    var parentStore = html`<i class="fas fa-chevron-left"></i>`
    const i = this.state.product;
    if (!i) return html``;
    return html`
    <style>

    </style>

    <div class="header" style="position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 999;">
      <div class="" style="width: 100%; margin: auto; background-color: whitesmoke; ">
        <div class="logoHere" style="margin: auto; width: fit-content;">
          <img style="height: 3em; margin-left: 6em !important" src="../../src/js/views/transixnay.png" alt=""/>
        </div>
      </div>
    </div>
  
<div class="container" style="padding: 1em; margin-top: 5em">
  <div class="columns six" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px">
    <div id="stl_cont2" style="width:auto; height: 30em ;margin:0 auto; overflow: hidden; z-index: 9"></div>
  </div>
  <div class="columns six" style="">
    <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px">
      <div class="main-view" id="profile">
        <div class="content" style="background-color: whitesmoke; z-index: 4;     position: sticky;  padding: 1em; border-radius: 10px; height: fit-content; ">
          <div class="productInfo">
            <a href="/store/${this.props.store}" id="getParentStore"><iris-text editable="false"  user=${this.props.store}/>${ parentStore }</a>
          </div><br/>
          ${this.state.product ? html`
            <div class="productInfo">
              <iris-text  tag="h3" user=${this.props.store} path="store/products/${this.props.product}/name"/>
            </div><br/>

            <div>
              <iris-text  style="font-size: 1.8em; font-weight: 400" tag="p" user=${this.props.store} path="store/products/${this.props.product}/id"/>
              <iris-text  style="font-size: 1.8em; font-weight: 400" tag="p" user=${this.props.store} path="store/products/${this.props.product}/discription"/>
            </div>
              ${this.isMyProfile ? html`
              <i class="fas fa-trash-alt" style="font-size: 2em; margin-left: 0em" onClick=${e => this.onClickDelete(e)}></i> 
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
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/><br/>
              
              <iris-text user=${this.props.store} editable="false" href="store/products/${this.props.product}/model" onClick=${() => {console.log("gimmme files")}}/>
          ` : ''}
        </div>
      </div>
    </div><br/>
    <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px">
      <div style="background-color: grey;  border-radius: 10px 10px 0px 0px; padding: 1em; padding-bottom: 0px;  color: white; font-weight: 600; font-size: 1.8em">
        <p style="margin: 3px">Parent components</p>
      </div>
      <div style=" border-radius:  0px 0px 10px 10px; padding: 1em; padding-bottom: 0px; font-weight: 400">
        <iris-text  style="font-size: 1.8em; font-weight: 400" tag="ul" user=${this.props.store} path="store/products/${this.props.product}/prodSubParent"/>
      </div>
    </div><br/>
    <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px">
      <div style="background-color: grey;  border-radius: 10px 10px 0px 0px; padding: 1em; padding-bottom: 0px;  color: white; font-weight: 600; font-size: 1.8em">
        <p style="margin: 3px">Brother components</p>
      </div>
      <div style=" border-radius:  0px 0px 10px 10px; padding: 1em; padding-bottom: 0px; font-weight: 400">
        <iris-text  style="font-size: 1.8em; font-weight: 400" tag="ul" user=${this.props.store} path="store/products/${this.props.product}/prodSubBrother"/>
      </div>
    </div>
    <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  border-radius: 10px">
      <div style="background-color: grey;  border-radius: 10px 10px 0px 0px; padding: 1em; padding-bottom: 0px;  color: white; font-weight: 600; font-size: 1.8em">
        <p style="margin: 3px">Child components</p>
      </div>
      <div style=" border-radius:  0px 0px 10px 10px; padding: 1em; padding-bottom: 0px; font-weight: 400">
        <iris-text  style="font-size: 1.8em; font-weight: 400" tag="ul" user=${this.props.store} path="store/products/${this.props.product}/prodSubChild"/>
      </div>
    </div><br/>
    <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;     width: fit-content;
    margin: auto;
    border-radius: 10px;
    padding: 0.2em;">
      <canvas id="qr-code" style="align-content: center  ;"></canvas>
    </div>

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
    const subParent = {

      subName: this.newProductSubNameParent,
      subAddy: this.newProductSubAddyParent,

    };

    console.log(subParent.subName);


    document.getElementById('clearThis').value = ' '
    document.getElementById('clearThis2').value = ' '

    //parent messy
    var parentNameRaw = subParent.subName
    var anchorRaw = ('<a style="color: black; font-size: 2em" target="blank" href="' + "//" + subParent.subAddy + '" >"' + parentNameRaw + '"</a>');
    $("#listParent").append(anchorRaw)
  }

  addSubClickedBrother() {
    const subBrother = {

      subName: this.newProductSubNameBrother,
      subAddy: this.newProductSubAddyBrother,

    };

    console.log(subBrother.subName);

    document.getElementById('clearThis3').value = ' '
    document.getElementById('clearThis4').value = ' '

    //brother messy
    var brotherNameRaw = subBrother.subName
    var anchorRaw = ('<a style="color: black; font-size: 2em" target="blank" href="' + "//" + subBrother.subAddy + '" >"' + brotherNameRaw + '"</a>');
    $("#listBrother").append(anchorRaw)
  }

  addSubClickedChild() {
    const subChild = {

      subName: this.newProductSubNameChild,
      subAddy: this.newProductSubAddyChild,

    };

    console.log(subChild.subName);

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

    //my genius is unmeasureable, someone pls clean before i have to look at this again eeeek
    var subParentData = " "
    try {   
      subParentData =  ((document.getElements("ul#listParent a").innerHTML))
    }catch(err) {
      subParentData = ' '
    }

    var subBrotherData = " "
    try {   
      subBrotherData =  ((document.getElements("ul#listBrother a").innerHTML))
    }catch(err) {
      subBrotherData = ' '
    }

    var subChildData = " "
    try {   
      subChildData =  ((document.getElements("ul#listChild a").innerHTML))
    }catch(err) {
      subChildData = ' '
    }

    //
    const subParent = {
      subListParent: subParentData
    };

    const subBrother = {
      subListBrother: subBrotherData    
    };

    const subChild = {
      subListChild: subChildData 
    };



    const product = {
      name: this.newProductName,
      id: this.newProductId,
      description: this.newProductDescription,

      model: getModel,
      modelRaw: modelRaw,

      //parents etc
      prodSubParent: subParent.subListParent,
      prodSubBrother: subBrother.subListBrother,
      prodSubChild: subChild.subListChild,
    };

    console.log(product.prodSub)
    console.log(product);
    State.public.user().get('store').get('products').get(this.newProductId || this.newProductName).put(product);
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
