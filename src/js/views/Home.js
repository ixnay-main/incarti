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

    canvas{
     

    margin-top: 2em;

    }
    </style>

    <div  style="position: sticky !important; top: 26em"> 
      <div class="" style="text-align: center; margin-bottom: 10em; margin-top: 15em; padding: 1em;color: black; font-weight: 600;">
        <h1 style="font-size: 3em; font-weight: 800;">Manufacture for Autonomy</h1>
        <p style="    font-size: 1.2em;">Blueprints and Catalogs so you can build your world.</p>
        <div style="display: flex; margin: auto; width: fit-content">
          <div class="expand" >
            <a  href="https://github.com/ixnay-main/ixnay"  target="blank" style="color: rgb(121, 121, 121) !important"> <h2 class="para" style=" font-weight: 800 ; margin-right: 1em ">Github</h2></a>
          </div>
          <div class="expand" >
            <a  onClick=${() => route(`/product/new`)}  target="blank" style="color: rgb(121, 121, 121) !important"> <h2 class="para" style=" font-weight: 800  ">Enter <i  class="fas fa-chevron-right" style="black;     font-size: 0.8em; margin-left: 0.2em;"></i></h2></a>
          </div>
        </div><br/><br/>
      </div>
    </div>
  `;
  }
};

export default Home;

