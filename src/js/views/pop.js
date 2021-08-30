import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Pop extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {






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
