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
              {filename: "Circle_Plate_1_v1.stl", y:5, color:"#ffffff", opacity: 0.6, rotationz: 1.570796}
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
    </style>

  <div  class="" style=" margin: auto; text-align: center; position: fixed; top: 1em; margin-right: 1em; display: flex"> 
    <h1 style="font-family: arialBlack; color: black; font-size: 2.8em; margin-left:5px;    margin-top: -14px;">IXNAY</h1>
    
  </div>

  <div  style=" " class="container" style=" margin-top: 0em; "> 

    <div  style=" " class="columns twelve"> 
      <br/>
      <div class="" style="text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;  padding: 1em;color: white; font-weight: 600; margin-bottom: 2em; padding-top: 5em;
      background-color: #7dbea980;
      border-radius: 15px;">
        <h1 style="font-size: 3em; font-weight: 800;">Manufacture for Autonomy</h1>
        <p style=" color: #363636;   font-size: 1.2em;">Blueprints and Catalogs so you can build your world.</p>
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

  <div class="container" style=" margin-top: 2em !important; "> 
    <div class="twelve columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important; margin-bottom: 1em !important;   background-color: #7dbea960;  border-radius: 10px ; padding: 1em"> 
      <h2 style="color: #fff !important; font-size: 56px; font-weight: 600;">An open product catalog for the web </h2>
    </div>
  </div>

  <div class="container" style="   border-radius: 15px;"> 
    <div class="columns twelve expand">
      <div class="" style="max-width: 70%; margin-top: 2em !important;   margin-bottom: 1em !important; padding: 10px; border-radius: 10px; min-width: 300px; display: flex">
        <div>
          <h2 style="color: #212121 !important; font-size: 56px; font-weight: 600;">Featured Prints</h2>
          <h2 style="color: black; font-size: 28px; font-weight: 600;  height: "> Hit <i class="fas fa-clone" style="   padding: 6px; border-radius: 50px; font-size: 24px; color: #000;  margin-left: 0em"></i> to clone to your own store </h2>        
        </div>
        <div>
          <i class="fas fa-long-arrow-alt-down" style="   padding: 6px; border-radius: 50px; font-size: 90px; color: #000;  margin-left: 10px"></i>
        </div>

      </div>
    </div>
  </div>
  <div class="container" style=" margin-top: 2em !important;      background-color: #7dbea9;
    border-radius: 15px;"> 
    <div class="columns three expand" id="stl_cont1" style="  
    background-color: #7dbea920;   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;     height: 40em; margin-bottom: 4em; margin-top: 3em; border-radius: 10px; margin-left: 0em;"> 
      <div class="columns three expand" style="width: 100%; z-index: 9;background-color: #fafafa; position: relative; margin-top: 33em; height: 12em; padding: 1em; border-radius: 0px 0px 10px 10px">
        <h2 style="color: black; font-size: 24px; font-weight: 600;  min-height: 2.5em;  border-bottom: 4px solid black !important;" id="prodName1">Aquaponics watering plate</h2>
        <div id="containerIcon1">
          <button class="expand" style="     padding-left: 0em;"  onClick=${e => this.cloneItemClicked1(e)}><i class="fas fa-clone" style="   ; padding: 6px; border-radius: 50px; font-size: 1.7em; color: #000;  margin-left: 0em"></i>
          </button>
          <h2 style="display: none; width: 0em" id="prodModel1"></h2>
        </div>

      </div>
    </div>
    <div class="columns three "  id="stl_cont2" style="box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;height: 40em;  background-color: #7dbea920; margin-bottom: 4em; margin-top: 3em; border-radius: 10px"> 
      <div class="columns three expand" style="width: 100%; z-index: 9;background-color: #fafafa; position: relative; margin-top: 33em; height: 12em; padding: 1em; border-radius: 0px 0px 10px 10px">
        <h2 style="color: black; font-size: 24px; font-weight: 600;  min-height: 2.5em;   border-bottom: 4px solid black !important;" id="prodName2">Corner Joint 10mm</h2>
        <div id="containerIcon2">
          <button class="expand" style="     padding-left: 0em;"  onClick=${e => this.cloneItemClicked2(e)}><i class="fas fa-clone" style="   ; padding: 6px; border-radius: 50px; font-size: 1.7em; color: #000;  margin-left: 0em"></i>
          </button>
          <h2 style="display: none; width: 0em" id="prodModel2"></h2>
        </div>
      </div>
    </div>
    <div class="columns six expand" style=" height: auto;padding: 1em; border-radius: 10px;  margin-top: 2em;"> 
      <h2 style="color: black; font-size: 24px; font-weight: 600;">A pathway to sustainable consumption</h2><br/>
      <h2 style="color: #212121 !important; font-size: 26px; font-weight: 600;"> <br/> For communities to provide for themselves they need designs for what they need, then the ability to produce it internally and cut dependency. <br/> From homes and farms to infrastructure. Provision is the goal of IXNAY.  </h2>
    </div>
  </div>

  //hotfix for cotainer bug
  <div class="container" style=" margin-top: 0.2em !important; "> 
    <div class="twelve columns" style=" margin-top: 0.2em !important; height: 2em "> 
    </div>
  </div>


  <div class="container" style=" margin-top: 2em !important; "> 
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;   background-color: #7dbea960;  border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-qrcode" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #000;  margin-left: 0em"></i>
      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">Share blueprints at a scan </h2>
    </div>
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;   background-color: #7dbea960;  border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-sign-out-alt" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #000;  margin-left: 0em"></i>

      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">No sign-ups, use a key to return</h2>
    </div>
    <div class="four columns" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin-top: 1em !important;   background-color: #7dbea960;  border-radius: 10px ; padding: 1em"> 
      <i class="fas fa-project-diagram" style="   ; padding: 6px; border-radius: 50px; font-size: 5em; color: #000;  margin-left: 0em"></i>

      <h2 style="color: #fff !important; font-size: 36px; font-weight: 600;">Open source, distributed and uncensored. Feel free to spin up your own node.</h2>
    </div>
  </div>

  <div class="container" style=" margin-top: 2em !important; "> 
    <div class="twelve columns" style=" margin-top: 6em !important; height: 10em "> 
      <p style="color: black">Contact Tony allinto@icloud.com for inquirys</p>
    </div>
  </div>

  <div class="container" style=" margin-top: 2em !important; "> 
    <div class="twelve columns" style=" margin-top: 2em !important; height: 10em "> 
    </div>
  </div>



  `;
  }
};



export default Home;

