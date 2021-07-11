import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class Orders extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {

    var getOrders =  State.public.user().get('orders')

    console.log("nuuuu")
    getOrders.map().on((data) => {
        console.log(data)
        $("#writeDoc").html(data)
    })

    return html`
      <div class="">
        
      <br/>
        <p><small>Version 1.7.1</small></p>
        <div id="writeDoc"></div>



      
      </div>
    `;
  }
};

export default Orders;
