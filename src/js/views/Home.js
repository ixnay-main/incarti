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
        var anchor1 = ('<a id="uploadBtn" style="color: #000;" download href="' + v.val + '" ><i class="fas fa-download" style="   padding: 6px; border-radius: 50px; font-size: 1.7em; color: #000;"></i></a>');
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
              {filename: "Circle_Plate_1_v1.stl", y:42, color:"#ffffff", opacity: 0.6, rotationz: 1.570796, rotationx: -0.370796}
          ]
        }

      )



      item2.once(j => {
        
        console.log(j.val)
        var anchor2 = ('<a id="uploadBtn" style="color: #000;" download href="' + j.val + '" ><i class="fas fa-download" style="   padding: 6px; border-radius: 50px; font-size: 1.7em; color: #000;"></i></a>');
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
              {filename: "corner_joint_10mm.stl", y:5, opacity: 0.6,color:"#ffffff", rotationz: 1.570796, display: ""}
          ]
        }

      )


    } , 1000)


    
    return html`
    <style>


    body{
      color: white
    }


      .main-view {
        margin-top: 0em !important;
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
    </style>

    <div  class="" style="margin: auto; text-align: center; margin-right: 1em; position: sticky; z-index: 10;
    top: 2em; filter: invert(1);
    mix-blend-mode: difference;"> 
      <h1 style="font-family: arialBlack;  font-size: 2.8em; margin-left:5px;    margin-top: -14px; ">IXNAY</h1>
    </div>

  <div  style=" " class="container" style=" margin-top: -2em; "> 

    <div  style=" " class="columns twelve"> 
      <br/>
      <div class="" style="text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;  padding: 1em;color: white; font-weight: 600; margin-bottom: 2em; padding-top: 5em;
      background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 100%);

      border-radius: 15px;">
        <h1 style="font-size: 3em; font-weight: 800;">Manufacture for Autonomy</h1>
        <p style=" color: #fff;   font-size: 1.2em;">Blueprints and Catalogs so you can build your world.</p>
        <div style="display: flex; margin: auto; width: fit-content">
          <div class="expand" >
            <a  href="https://github.com/ixnay-main/ixnay"  target="blank" style="color: white !important"><i style="    font-size: 2.2em; margin-right: 1em; margin-top: -5px" class="fab fa-github"></i></a>
          </div>
          <div class="expand" >
            <a  onClick=${() => route(`/product/new`)}  target="blank" style="color: white  !important"> <h2 class="para" style=" font-weight: 800  ">Enter <i  class="fas fa-chevron-right" style="     font-size: 0.8em; margin-left: 0.2em;"></i></h2></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container" style=" margin-top: -0em !important;      background-color: #7dbea9;
    border-radius: 15px;"> 
    <div class="columns one "  style=" "> 
      <p style="color: #ffffff00">d</p>
    </div>

    <div class="columns four expand" id="stl_cont1" style="  z-index: 1003 !important;  position: relative; top: 0em;  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;    height: 40em; margin-bottom: 4em; margin-top: 0em; border-radius: 10px; margin-left: 0em; "> 
      <div class="columns four " style="width: 100%; z-index: 9; background-color: #fafafa; position: relative; margin-top: 33em; height: 12em;position: relative;   padding: 1em; border-radius: 0px 0px 10px 10px">
        <div id="containerIcon1">
          <button class="" style="     padding-left: 0em;"  onClick=${e => this.cloneItemClicked1(e)}><i class="fas fa-clone colorChange" style="   ; padding: 6px; border-radius: 50px; font-size: 1.7em; margin-left: 0em"></i>
          </button>
          <h2 style="display: none; width: 0em" id="prodModel1"></h2>
        </div>

      </div>
    </div>



    <div class="twelve columns" style="position: relative; top: -50em; height: auto; margin-top: 0.2em !important;  "> 
      <h2 style="color: white; font-size: 44px; font-weight: 800;  min-height: 2.5em;  position: relative; top: 3em; padding-left: 1em;" id="prodName1">AQ.2021.06</h2>
      <img style="z-index: 3; height: auto;width: 100%; border-radius: 10px; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;" src="img/platecopy.png" />
    </div>
  </div>

  <div class="container" style="   border-radius: 15px;     position: relative;
  top: -43em;"> 
    <div class="columns twelve expand">
      <div class="" style="max-width: 70%; margin-top: 2em !important;   margin-bottom: 1em !important; padding: 10px; border-radius: 10px; min-width: 300px; display: flex">
        <div>
          <i class="fas fa-long-arrow-alt-up" style="   padding: 6px; border-radius: 50px; font-size: 90px; color: #000;  margin-left: 10px"></i>
        </div>
        <div>
          <h2 style="color: #212121 !important; font-size: 56px; font-weight: 600;">Featured Prints</h2>
          <h2 style="color: black; font-size: 28px; font-weight: 600;  height: "> Hit <i class="fas fa-clone" style="   padding: 6px; border-radius: 50px; font-size: 24px; color: #000;  margin-left: 0em"></i> to clone to your own store </h2>        
        </div>


      </div>
    </div>
  </div>

  

  <div class="container" style=" margin-top: 2em !important;    position: relative;
  top: -43em; "> 
    <div class="twelve columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important; margin-bottom: 1em !important; background: radial-gradient(circle, rgba(133,133,133,1) 0%, rgba(97,97,97,1) 100%);
    border-radius: 10px ; padding: 1em"> 
      <h2 style="color: #fff !important; font-size: 56px; font-weight: 600;">An open product catalog for the web </h2>
    </div>
  </div>

  
  

  //hotfix for cotainer bug
  <div class="container" style=" margin-top: 0.2em !important;     position: relative;
  top: -43em; "> 
    <div class="twelve columns" style=" margin-top: 0.2em !important; height: 2em "> 
    </div>
  </div>


  <div class="container" style=" margin-top: 2em !important;    position: relative;
  top: -43em; "> 
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;   background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 100%);
    border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-qrcode" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #fff;  margin-left: 0em"></i>
      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">Share blueprints at a scan </h2>
    </div>
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;  background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 100%);
    border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-sign-out-alt" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #fff;  margin-left: 0em"></i>

      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">No sign-ups, use a key to return</h2>
    </div>
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;  background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 100%);
    border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-project-diagram" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #fff;  margin-left: 0em"></i>

      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">Open source, distributed and uncensored. Feel free to spin up your own node.</h2>
    </div>
  </div>

  <div class="container" style=" margin-top: 2em !important;    position: relative;
  top: -43em; "> 
    <div class="twelve columns" style=" margin-top: 6em !important; height: 10em "> 
      <p style="color: black">Contact Tony allinto@icloud.com for inquirys</p>
    </div>
  </div>

  <div class="container" style=" margin-top: 2em !important;     position: relative;
  top: -43em;"> 
    <div class="twelve columns" style=" margin-top: 2em !important; height: 10em "> 
    </div>
  </div>



  `;
  }
};



export default Home;

