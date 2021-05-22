import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Home extends View{
  constructor() {
    super();
    
  }

  renderView() {


    var checkExist = setTimeout(function(){
      var qr;
      (function() {
              qr = new QRious({
              element: document.getElementById('qr-code'),
              size: 180,
              foreground: '#000',
              background: 'transparent',
  
              value: window.location.href 
          });
      })();

      var rndInt = Math.floor(Math.random() * 2) + 1

      console.log(rndInt)
      if(rndInt == 1){
        var randFile = "DtM-v3.stl"
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
      {filename: randFile ,opacity: 0.8, y: 30, color: "#FFFFFF",rotationx: 4.712}
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


.dropbtn {
  background-color: #f5f5f5;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content a{
  background-color: #f5f5f5;
  padding: 0em;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f5f5f5;
  z-index: 1;
  left: 0em !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.dropdown-content a {
  color: black;
  text-decoration: none;
  display: block;
    padding: 0.2 1em;
    width: fit-content;
}

.show {display:block;}

      </style>
      <div class="centered-container" style="margin: auto; margin-top: -5em">
        <div style="margin: auto; overflow: hidden; position: fixed; width: 100%; margin-top: 0em; text-align: center; border-radius: 5px">
          <h1 style="font-family: arialBlack; color: red; font-size: 3em">IXNAY</h1>
          <h1>Manufacture for Autonomy</h1>
          <div class="main-view riseUpHere" id="" style="margin:auto; box-shadow: rgb(17 17 18) 0px 7px 29px 0px ;     padding: 0.3em;  border-radius: 7px; width: 20vw; background-color: black;     height: 40em; width: 20em; ">
            <div id="stl_cont2" class="riseUpHere" style="width:auto; height:60vh ;     margin-top: 22vh !important; margin:0 auto; overflow: hidden; position: fixed !important; top: 3em; z-index: 9"></div>

            <div class="content" style="position:sticky; color: white;  z-index: 13; border-right: 10px red solid; width: 100%; border-radius: 5px 5px 0px 0px;  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  margin-top: 60vh ; padding: 1em  ;background-color: rgb(245 245 245); ">
              <div style="display: flex">
                <a href="/store/${this.props.store}"><i  class="fas fa-chevron-left"></i> Store</a>
                <div id="container" style=" display: flex; margin-left: 2em;">

                <div class="dropdown">
                  <i class="fas fa-ellipsis-v" style="color: black; padding: 0em 1em" onClick=${() => {{
                  /* When the user clicks on the button,
                  toggle between hiding and showing the dropdown content */
                  function myFunction() {
                    document.getElementById("myDropdown").classList.toggle("show");
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

                    }}}></i>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="#" id="container-one"></a>
                  </div>
                </div>
                </div>
              </div> 

              <h3 style="color: black" >All Yours</h3><hr/>

              <div style=";padding: 0.5em;border-radius: 5px; height: auto; width: fit-content; margin: auto; padding-bottom: 10em">
              <canvas id="qr-code" style="align-content: center  ;"></canvas>

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

