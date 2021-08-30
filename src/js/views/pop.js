import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Pop extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {


    setTimeout(function(){

    var polyArray = [2,3,4,5]
    polyArray.forEach(() => {
      var ele = document.createElement("div");
      ele.setAttribute("class","showOff");
      ele.innerHTML= `
      <h1 style="font-size: 2em; color: black; margin: 3px">Product Name</h1>
      <div class="branchHolder">
        <p class="branch dent" style="width: fit-content">d</p>
      </div>
      `;
      document.querySelector("#hasChildren").appendChild(ele);
    } );
  }, 2000)

    // var arrayLength = polyArray.length;

    // for (i = 0; i < arrayLength; i++) {
    //   $('<div class="showOff" />').html( `   <h1 style="font-size: 2.7em; color: black; margin: 3px">${element}</h1>
    //   <div class="branchHolder">
    //       <p class="branch dent" style="width: fit-content"><a href="/store/${this.props.store}"><i class="far fa-user" style=" color: black"></i><iris-text style="margin-left: 1em; color: #c5c5c5" editable="false" path="profile/name" user=${this.props.store}/></a></p>

    //   </div>`).appendTo('#hasChildren');
    // }


    return html`
      <div class="container" style="margin-top: 4em">
        <div class="" style="width: 100%; overflow-x: scroll; display: -webkit-inline-box" id="hasChildren">
  

        

        </div>
      </div>
    `;
  }
};

export default Pop;
