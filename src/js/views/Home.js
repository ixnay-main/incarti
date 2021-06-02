import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';
import Session from '../Session.js';
import { route } from '../lib/preact-router.es.js';



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

  

  renderView() {


    var checkExist = setTimeout(function(){

      var rndInt = Math.floor(Math.random() * 1) + 1

      console.log(rndInt)
      if(rndInt == 1){
        var randFile = "frys.stl"
      } else if(rndInt == 2){
        var randFile = "two.stl"
      }
      var stl_viewer = new StlViewer
      (
      document.getElementById("stl_cont2"),
      {
          auto_rotate:true, 
          mouse_zoom: true,
          models:
      [
      {filename: randFile ,opacity: 0.8, y: 0, rotationy: 1.5707963268,rotationx: -1.2707963268, color: "#FFFFFF",rotationx: 4.712}
      ]
      }
      )
      console.log("run")



      var loc = document.getElementById("modelDataRaw").textContent
      var anchor = ('<a download id="uploadBtn" href="' + loc + '" ><i class="fas fa-save" style="font-size: 1.2em;  color: black;"></i></a>');
      $("#container-one").html(anchor)

    }      
    
    , 300)
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
    </style>

    <div class="header" style="position: fixed; left: 0; top: -3px; padding-top: 3px; width: 100%; z-index: 105; background-color: #ffffff00">
        <div class="" style="width: 100%; margin: auto; background-color: #ffffff00">
            <div class="logoHere" style="margin: auto; width: fit-content; background-color: #ffffff00">
              <img style="height: 3em;  margin-left: 6em !important" src="../../src/js/views/transixnay.png" alt=""/>
            </div>
        </div>
    </div>

    <div  style="position: sticky !important; top: 20em"> 
      <div class="" style="text-align: center; margin-bottom: 10em; margin-top: 15em; color: black; font-weight: 600;">
          <h1 style="font-size: 3em; font-weight: 800">Manufacture for Autonomy</h1>
          <p style="    font-size: 1.2em;">Blueprints and Catalogs so you can make the world go round.</p>
          <div class="expand" >
            <a  onClick=${() => route(`/store/${Session.getPubKey()}`)}  target="blank" style="color: rgb(121, 121, 121) !important"> <h2 class="para" style=" font-weight: 800  ">Enter <i  class="fas fa-chevron-right" style="black;     font-size: 0.8em; margin-left: 0.2em;"></i></h2></a>
          </div>
      </div>
    </div>

          <div class="container" style="padding: 1em; background-color: #f5f5f5e8; margin-top: 3em; margin-bottom: 3em; position: sticky !important; margin-top: 20em" >
          
            <div class="columns six">
              <div class="" style="border-radius: 10px; background-color :rgb(255, 255, 255); height:fit-content;">
                <div class="expand" style="padding: 1em; height: 15">
                    <div class="disappear" style="width: fit-content; margin: auto;">
                      <i style="font-size: 8em; color: #f6cbb0 !important" class="fas fa-eye-slash"></i>                    
                    </div>
                </div>
                <div class="" style=" border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 20px;">
                    <p class="para" style="    font-weight: 600;  margin-bottom: 2px">Set up to be lost</p>
                    <p class="para">Throwaway your catalog then start fresh  with cloned blueprints. </p>
                </div>
              </div><br/>

              <div class="" style=" box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;border-radius: 10px; background-color :rgb(255, 255, 255); height: fit-content;">
                <div class="expand" id="parent" style="padding: 1em; height: 15em;">
                  <div class="" style="width: fit-content; margin: auto;">
                    <i style="font-size: 8em;color: #f6cbb0 !important;" class="fas fa-clone"></i>
                  </div>
                  <div class="" id="hover-content">
                      <div class="disappear" style="position: relative; top: -5em; left: -2em; width: fit-content; margin: auto;"><i style="font-size: 8em; color: #f6cbb0 !important;" class="fas fa-clone"></i>
                      </div>
                      <div class="disappear" style="position: relative; top: -13em; left: 5em; width: fit-content; margin: auto;"><i style="font-size: 8em; color: #f6cbb0 !important;" class="fas fa-clone"></i>
                      </div>
                  </div>
                </div>
                <div class="" style=" border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 20px;">
                  <p class="para" style="font-weight: 600;  margin-bottom: 2px">Digital rules for Physical goods</p>
                  <p class="para">Throwaway your catalog then start fresh  with cloned blueprints. </p>
                </div>
              </div>
            </div>

            <div class="columns six">

              <div class="" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 10px; background-color :rgb(255, 255, 255); height: fit-content;">
                  <div class="expand" style="padding: 1em; height: 22em">
                      <img src="../../src/js/views/octobitch.gif" alt="" style="width: 95%;"/>
                  </div>
                  <div class="" style=" border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 20px;">
                      <p class="para" style="    font-weight: 600; margin-bottom: 2px"> Libre - From code to delivery</p>
                      <p class="para"> IXNAY delivers its data on its own pages, but also on yours. Spin yourself up as a peer and all blueprints will sync. </p>
                  </div>
              </div> <br/>

              <div class="" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 10px; background-color :rgb(255, 255, 255); height: fit-content;">
                <div class="expand" style="padding: 1em;  font: inherit; background-color: rgb(236, 236, 236); border-radius: 10px 10px 0px 0px;">
                  <a style="width: 100%; margin: 3px;" target="blank" href="//google.com">Hello</a><hr/>
                  <a style="margin: 3px;" target="blank" href="//google.com">Hello</a>
                </div>
                <div class="" style=" border-radius: 0px 0px 10px 10px; background-color :rgb(121, 121, 121); height: fit-content; text-align: left; padding: 20px;">
                  <p class="para" style="    font-weight: 600;  margin-bottom: 2px"> How to access the network</p>
                  <p class="para">IXNAY delivers the network over multiple urls. Click on any of the links above, all data syncs.</p><br/>
                </div>
              </div><br/>
              
            </div>
          </div>
    
  `;
  }
};

export default Home;

