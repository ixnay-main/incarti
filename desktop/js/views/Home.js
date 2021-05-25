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
      var qr;
      (function() {
              qr = new QRious({
              element: document.getElementById('qr-code'),
              size: 130,
              foreground: '#fff',
              background: 'transparent',
  
              value: window.location.href 
          });
      })();

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
          mouse_zoom: false,
          models:
      [
      {filename: randFile ,opacity: 0.8, y: 0, rotationy: 1.5707963268,rotationx: -1.2707963268, color: "#FFFFFF",rotationx: 4.712}
      ]
      }
      )
      console.log("run")



      var loc = document.getElementById("modelDataRaw").textContent
      var anchor = ('<a download id="uploadBtn" href="' + loc + '" ><i class="fas fa-save" style="font-size: 1.2em;  color: red;"></i></a>');
      $("#container-one").html(anchor)

    }      
    
    , 300)

  

    return html`
      <style>
.nav header, {
  display: none !important
}

.application-list{
  display: none !important

}
.nav .header-content{
  display: none !important
}

::-webkit-scrollbar {
  width: 0px;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 0px;
}



.dropdown {
  position: relative;
  display: inline-block;
  width: 2em !important;

}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: ;
  z-index: 103;
  left: 0px;
  padding: 5px;

}

.dropdown-content a {
  color: white;
  text-decoration: none;
  display: block;
    width: fit-content;
    background-color: #f5f5f50f;
    padding: 0em;
    margin: 0em;
    padding: 4px;
}

.blur{
  filter: blur(15px) !important;
  -webkit-filter: blur(15px) !important;
  -moz-filter: blur(15px) !important;
  -o-filter: blur(15px) !important;
  -ms-filter: blur(15px) !important;
}
#overlay    {
  display: none;

}

.mouseOn:hover{
  cursor: pointer;
}

.show {display:block;}

      </style>
      <div class="centered-container" style="margin: auto; margin-top: -5em">
        <div style="margin: auto; overflow: hidden; position: fixed; width: 100%; margin-top: 0em; text-align: center; border-radius: 5px">
          <h1 style="font-family: arialBlack; color: red; font-size: 3em">IXNAY</h1>
          <h1>Manufacture for Autonomy</h1>
          <div class="main-view boxIt riseUpHere " id="main_container bodyBulk" style=" ">
            <div id="stl_cont2" class="riseUpHere" style="width:19em; height:60vh ; backround-color: transparent;    margin-top: 22vh !important; margin:0 auto; overflow: hidden; position: fixed !important; top: 3em; z-index: 9"></div>

            <div class="content" style="position:sticky; color: white;  z-index: 13; border-right: 10px red solid; width: 100%; border-radius: 5px 5px 0px 0px;  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  margin-top: 60vh ; padding: 1em  ; ">
              <div style="display: flex">

                <a href="/store/${Session.getPubKey()}" style="color: white"><i  class="fas fa-chevron-left" style="color: white"></i> Store</a>
                <div id="container" style=" display: flex; margin-left: 2em;">

                <div class="dropdown " style="margin-left: 9vw; display: none">
                  <i class="fas fa-ellipsis-v" style="color: white; padding: 0em 1em" onClick=${() => {{
                  /* When the user clicks on the button,
                  toggle between hiding and showing the dropdown content */
                  function myFunction() {
                    document.getElementById("myDropdown").classList.toggle("show");
                    document.getElementById("bodyBulk").style.opacity = 0.8;

                  }

                  // Close the dropdown menu if the user clicks outside of it
                  window.onclick = function(event) {
                    if (!event.target.matches('.dropbtn')) {
                      var dropdowns = document.getElementsByClassName("dropdown-content");
                      var i;
                      for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                          openDropdown.classList.remove('show');
                        }
                      }
                    }
                  }

                  var containerElement = document.getElementById('main_container');
                  var overlayEle = document.getElementById('overlay');
              
                  containerElement.setAttribute('class', 'blur');


                  }}}></i>
                  <div id="myDropdown" class="dropdown-content">
                    <a><i class="fas fa-save" style="font-size: 1.2em;  color: red;"></i></a>
                    <a><i class="fas fa-save" style="font-size: 1.2em;  color: red;"></i></a>
                  </div>
                </div>
                </div>
              </div> 
              <br/>
              <div  style=" border: 2px solid white !important; margin: 0em; padding: 0em; border-radius: 5px; height: 2.8em" >
              <h2 contenteditable placeholder=" Gimme a name" style="color: red; margin: 5px" onInput=${e => this.newProductName = e.target.innerText} />
              </div><br/>

              <div style=";padding: 0.5em;border-radius: 5px; height: auto; width: 100% ; margin: auto; background-color: white; margin-bottom: 10em">
                <i onClick=${e => this.addItemClicked(e)} class="fas fa-plus mouseOn" style="padding: ; color: black; font-size: 1.5em"></i>
              </div><br/>

              <div style=";padding: 0.5em;border-radius: 5px; height: auto; width: fit-content; margin: auto; padding-bottom: 10em; display: none">

                <div style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 10px">
                  <canvas id="qr-code" style="align-content: center  ; border-radius: 12px"></canvas>
                </div>
              </div>
              <iris-text style="display: none" id="modelDataRaw" user=${this.props.store} path="store/products/${this.props.product}/modelRaw"/>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

export default Home;

