import { html } from '../Helpers.js';
import View from './View.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';
import State from '../State.js';



class Home extends View{
  constructor() {
    super();
    
  }



  addItemClicked() {

    const product = {
      name: this.newProductName,

    };

    
    console.log(product);
    State.public.user().get('store').get('products').get( this.newProductName).put(product);
    route(`/store/${Session.getPubKey()}`)

  }

  cloneItemClicked1() {
    const product = {
      name: document.getElementById("prodName1").textContent,
      modelRaw: document.getElementById("prodModel1").textContent
    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
    route(`/store/${Session.getPubKey()}`)
  }
  cloneItemClicked2() {
    const product = {
      name: document.getElementById("prodName2").textContent,
      modelRaw: document.getElementById("prodModel2").textContent
    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
    route(`/store/${Session.getPubKey()}`)
  }
  cloneItemClicked3() {
    const product = {
      name: document.getElementById("prodName3").textContent,
      modelRaw: document.getElementById("prodModel3").textContent
    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
    route(`/store/${Session.getPubKey()}`)
  }
  cloneItemClicked4() {
    const product = {
      name: document.getElementById("prodName4").textContent,
      modelRaw: document.getElementById("prodModel4").textContent
    };
    console.log(product);
    State.public.user().get('store').get('products').get(product.name).put(product);
    route(`/store/${Session.getPubKey()}`)
  }

  

  renderView() {



    $("#showBanner").show()

    setTimeout(function(){
  
      item1.once(v => {
        
        console.log(v.val)
        var anchor1 = ('<a id="uploadBtn" style="color: #fff;" download href="' + v.val + '" ><i class="fas fa-download" style="   padding: 6px; border-radius: 50px; font-size: 1.7em; color: #fff;"></i></a>');
        $("#containerIcon1").append(anchor1)
        $("#prodModel1").html(v.val)
      });



      var stl_viewer=new StlViewer
      (
      
        document.getElementById("stl_cont1"),
        {
          auto_rotate:true, 
          mouse_zoom: false,
 
        models:
          [
              {filename: "Circle_Plate_1_v1.stl", y:42, color:"#ffffff", opacity: 0.6, rotationz: 1.570796, rotationx: -0.370796, display: "wireframe"}
          ]
        }

      )



      item2.once(j => {
        
        console.log(j.val)
        var anchor2 = ('<a id="uploadBtn" style="color: #fff;" download href="' + j.val + '" ><i class="fas fa-download" style="   padding: 6px; border-radius: 50px; font-size: 1.7em; color: #fff;"></i></a>');
        $("#containerIcon2").append(anchor2)
        $("#prodModel2").html(j.val)
      });

      var stl_viewer2=new StlViewer
      (

      
        document.getElementById("stl_cont2"),
        {
          auto_rotate:true,  
          mouse_zoom: false,
        models:
          [
              {filename: "Module.stl", y:5, opacity: 0.6,color:"#ffffff", rotationz: 1.570796, display: "wireframe"}
          ]
        }

      )

      item3.once(j => {
        
        console.log(j.val)
        var anchor3 = ('<a id="uploadBtn" style="color: #fff;" download href="' + j.val + '" ><i class="fas fa-download" style="   padding: 6px; border-radius: 50px; font-size: 1.7em; color: #fff;"></i></a>');
        $("#containerIcon3").append(anchor3)
        $("#prodModel2").html(j.val)
      });

      var stl_viewer3=new StlViewer
      (

      
        document.getElementById("stl_cont3"),
        {
          auto_rotate:true,  
          mouse_zoom: false,
        models:
          [
              {filename: "download.stl", y:5, opacity: 0.6,color:"#ffffff", rotationz: 1.570796, display: "wireframe"}
          ]
        }

      )


    } , 1000)


    
    return html`
    <style>

    .application-list{
      margin-top: -4px
    }


    body{
      color: white
    }




      .main-view {
        overflow: hidden
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 0rem;
      font-weight: 300;
    }

    #parent_div {
      width: auto;
      height: auto;
    }
    #follow_div{
      position: absolute;
      width: 140px;
      height: 65px

      background: #88ee99;
    }


    canvas{
     

    margin-top: 2em;
    position: relative;
    margin-top: -40em;

    }

    *{
      filter: invert(0) !important;
    }

    .displayNone{
      display: none
    }
    </style>

    <div  class="" style="margin: auto; text-align: center; margin-right: 1em; position: sticky; z-index: 10;top: 2em; filter: invert(1);mix-blend-mode: difference;"> 
      <h1 style="font-family: arialBlack;  font-size: 2.8em; margin-left:5px;    margin-top: -14px; ">IXNAY</h1>
    </div>


    <div style="display :flex ;transform: rotate(20deg); position: absolute; top: -3em;">
      <div class="bar" style=""></div>
      <div class="bar" style=""></div>
      <div class="bar" style=""></div>

    </div>



  <div class="container">

    <div class="twelve columns" style="text-align: center; padding: 1em;font-weight: 600; margin-top: 10em;  background: #ffffff00;border-radius: 15px;  z-index:4; ">

      <div style=" color: black">
        <h1 style="font-size: 3em; font-weight: 800; ">Manufacture for Autonomy</h1>
        <p style="    font-size: 1.2em;">The Blueprints to build your world.</p>
      </div>

      <div style="display: flex; margin: auto; width: fit-content; color: black;">
        <div style="display: flex; margin: auto; background-color: #ffffff40; padding: 3px;border-radius: 15px; height: fit-content; padding-left:20px; padding-top: 5px; margin-right: 1em !important ">
          <div style="display :flex; margin-right: 1.3em ">
            <div class="smolbar" style=""></div>
            <div class="smolbar" style=""></div>
            <div class="smolbar" style=""></div>
          </div>
          <div class="expand" >
            <a  href="https://github.com/ixnay-main/ixnay"  target="blank" style=""><i style=" color: black;   font-size: 2.2em; margin-right: 0.3em; " class="fab fa-github"></i></a>
          </div>
        </div>

        <div class="expand" style=" height: fit-content;   padding: 5px 10px;border-radius: 15px ;margin-left: 3px; width: 5em">
          <a  onClick=${() => route(`/store`)}  target="blank" style=" color: #ffffff20 "> <h2 class="para" style=" font-weight: 800 ;color: black "><i  class="fas fa-chevron-right" style=" color: color: #ffffff20;font-size: 1.5em; margin-left: 0.2em;"></i></h2></a>
        </div>
      </div>
    </div>
  </div>

  <div class="container " style=" margin-top: 2em !important;    position: relative;"> 
    <div class="four columns" style="z-index: 1001;  margin-top: 1em !important;">

    </div>
    <div class="four columns" style="z-index: 1001;  margin-top: 1em !important;">

    </div>
    <div class="four columns" style="z-index: 1001;  margin-top: 1em !important;">

    </div>
  </div>

  `;
  }
};



export default Home;

