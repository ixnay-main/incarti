import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Pop extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {


    var polyArray = [["mcj9s0o5--1AedgaBqUjmeYCa_Rrr2oZ4AzEtUA505E.4iRFzVi-JROSmsniQb0kvlpcYoTncyaQL-khw6WKlVk" , "blue10"], ["mcj9s0o5--1AedgaBqUjmeYCa_Rrr2oZ4AzEtUA505E.4iRFzVi-JROSmsniQb0kvlpcYoTncyaQL-khw6WKlVk" , "blue14"]]

    polyArray.forEach((element) => {
      console.log(element[0])
      console.log(element[1])

      var getValuesForEach = State.public.user(element[0]).get('store').get('products').get(element[1])
        getValuesForEach.on((v) => {
          console.log(v)
          var ele = document.createElement("div");
          ele.setAttribute("class","showOff");

          ele.innerHTML= `
            <h1 style="font-size: 2em; color: black; margin: 3px">${v.productName}</h1>
            <div class="branchHolder">
              <p class="branch dent" style="width: fit-content">${v.producer}</p>
            </div>
            <div id="stl_cont">
            </div>
    
          `;
          
          document.querySelector("#hasChildren").appendChild(ele);
        })
        
      // } );

    setTimeout(function(){

      getValuesForEach.on((v) => {
        var stl_viewer=new StlViewer
            (

            document.getElementById("stl_cont"),
            {
        
                auto_rotate:true,
          

                
            models:
            [
            {filename: v.modelRaw , opacity:0.6}
            ]
            }
            )
          })
    }, 1000)
  })




    return html`
    <style>
      #stl_cont canvas{
        overflow: hidden !important;
        height: 100%
      }

      #stl_cont{
        margin-top: -5em;
        overflow: hidden;
        height: 100%;
        position: relative;
      }
    </style>
      <div class="container" style="margin-top: 4em">
        <div class="" style="width: 100%; overflow-x: scroll; display: -webkit-inline-box" id="hasChildren">
  

        

       
        </div>

      </div>
    `;
  }
};

export default Pop;
