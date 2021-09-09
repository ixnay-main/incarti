import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import {translate as t} from '../Translation.js';
import { route } from '../lib/preact-router.es.js';
import MeshView from './Mesh.js';

class Point extends MeshView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {subs:{}};
    this.subs = {};
  }

  addToCart() {
    const count = (this.cart[this.props.point] || 0) + 1;
    State.local.get('cart').get(this.props.mesh).get(this.props.point).put(count);
  }

  typeMethodChanged(e) {
    const val = e.target.firstChild && e.target.firstChild.value;
    val && State.local.get('type').put(val);
  }


  newPoint() {
    console.log('new');
    return html`
      <div class="main-view" id="profile">
        <div class="content">
          <a href="/mesh/${Session.getPubKey()}"><iris-text path="profile/name" user=${Session.getPubKey()} /></a>
          <h3>Add item</h3>
          
          <h2 contenteditable placeholder="Item name" onInput=${e => this.newPointName = e.target.innerText} />
          <textarea placeholder="Item description" onInput=${e => this.newPointDescription = e.target.value} style="resize: vertical"/>
          <input type="number" placeholder="Price" onInput=${e => this.newPointPrice = parseInt(e.target.value)}/>
          <hr/>
          <h3>AHEREEE</h3>

          <p>
            <label for="Manufacture" onClick=${e => this.typeMethodChanged(e)}>
              <input class="funkyradio" type="radio" name="type" id="Manufacture" value="Manufacture" checked=${this.state.type === 'Blueprint'}/>
              Manufacture
            </label>
          </p>
          <p>
            <label for="Agriculture" onClick=${e => this.typeMethodChanged(e)}>
              <input class="funkyradio" type="radio" name="type" id="Agriculture" value="Agriculture" checked=${this.state.type === 'Transformer'}/>
              Agriculture
            </label>
          </p>
          <button onClick=${e => this.addItemClicked(e)}>Add item</button>
        </div>
      </div>
    `;
  }

  onClickDelete() {
    if (confirm('Delete point? This cannot be undone.')) {
      State.public.user().get('mesh').get('points').get(this.props.point).put(null);
      route('/mesh/' + this.props.mesh);
    }
  }

  showPoint() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.point;

    if (!i) return html``;
    return html`
    <div class="main-view" id="profile">
      <div class="content">
        <div class="container">
          <div class="shout">
              <h1>Point</h1>
              <h2>hear ye hear ye</h2>

          </div>
          <div class="columns twelve">
            <div class="card" style="padding: 0em; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; ">
             
                ${this.state.point ? html`
                <div style="padding: 1em">
                  <div style="head" style="display: flex">
                    <button class="buttonS -regular center"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></button>
                    <button class="buttonS -regular center"><a href="/mesh/${this.props.mesh}"> <iris-text placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/type"/></a></button>

                   


                    ${cartTotalItems ? html`
          
                        <button class="buttonS -regular center" onClick=${() => route('/checkout/' + this.props.mesh)}>Shopping cart (${cartTotalItems})</button>
       
                    ` : ''}
                  </div>
                  <h3 style="    font-size: 4em;margin: 20px;"><iris-text  user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/></h3>
                  <p class="description">
                    <iris-text user=${this.props.mesh} path="mesh/points/${this.props.point}/description"/>
                  </p>
                  <p class="price">
                    <iris-text placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/>

                  </p>
                  <iris-text tag="h3" user=${this.props.mesh} path="mesh/points/${this.props.point}/pointID"/>
                  <iris-img class="buttonS -regular center" style="  padding: 0px;" user=${this.props.mesh} path="mesh/points/${this.props.point}/photo"/>

                </div>
                <div style="display: flex; width: 100%">

                  <button class="add sitLeftGreen" onClick=${() => this.addToCart()}>
                    ${t('add_to_cart')}
                    ${this.cart[this.props.point] ? ` (${this.cart[this.props.point]})` : ''}
                  </button>
                  ${this.isMyProfile ? html`
                    <button class="siteRightRed" onClick=${e => this.onClickDelete(e)}>Delete item</button>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </div>
       
     


          <div class="columns twelve" style="margin-top: 6em !important">
            <div class="shout" >
              <h1 > Sub Point</h1>
              <h2>hear ye hear ye</h2>
            </div>
            <div class="card" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;">
              <input placeholder="Sub point ID" id="pointID" onInput=${e => this.newSubID = e.target.value}/>
              <button onClick=${() => {
         

                var globals = Gun()

                var makeID  = this.newSubID
                var masterPoint = this.props.point



                var compositeSub = {
                  makeID: this.newSubID
                }

                var getFromGlobal = globals.get(masterPoint).get(this.newSubID)
                getFromGlobal.map().on(v => {console.log(v)})



                // globals.get(masterPoint).get("subs").set(compositeSub)        
                // var getPls = globals.get(masterPoint).get("subs")
        
                // getPls.map().on(v => {console.log(v)})
       
                console.log("done")
              }}>Add item</button>
            
              
            </div>
            <div class="" style="display : flex; margin-top: 3em">
              ${Object.keys(this.state.subs).map(k => {
                const i = this.state.subs[k];
                return html`
                <div class="card" style="border-radius: 5px; color: white ; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;">
                  <div class="" style="height: fit-content;  border-radius: 15px;    margin: 1em; padding: 1em">
                    <div class="" style=" padding-top: 5px; padding-bottom: 5px; ">
      
                      <div style="width:100%">
                        <p style=" margin: 4px; font-size: 4em; font-weight: 400" class="description" id="areaName">${i.makeID}</p>

                        <button onClick=${() => { 
                          var globals = Gun();
                          var masterPoint = this.props.point

                          var getName = i.makeID;
                          console.log(getName)
                          globals.get(masterPoint).get("subs").get(getName).put(null);
                          route('/mesh/');
                        }}> Delete</button>
                  
                        
                      </div>
                    </div>
                  </div>
                </div>
              
                `
              })}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  render() {
    return (this.props.mesh && this.props.point ? this.showPoint() : this.newPoint());
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.point !== this.props.point) {
      this.componentDidMount();
    }
  }

  addItemClicked() {
    var randInt = '0' + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111))


    this.newPointID = randInt

    var globals = Gun()

    const point = {
      pointID: this.newPointID,
      name: this.newPointName,
      description: this.newPointDescription,
      price: this.newPointPrice,
      type: this.state.type ,
    };
    console.log(point)
    State.public.user().get('mesh').get('points').get(this.newPointID).put(point);
    globals.get(this.newPointID).put(point)
      

    route(`/mesh/${Session.getPubKey()}`)
  }

  componentDidMount() {
    var globals = Gun();
    var masterPoint = this.props.point

    State.local.get('type').on(type => this.setState({type}));



    MeshView.prototype.componentDidMount.call(this);
    const pub = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.point && pub) {
      State.public.user(pub).get('mesh').get('points').get(this.props.point).on(point => this.setState({point}));
    }

    if (pub) {
      var getPls = globals.get(masterPoint).get("subs")

      getPls.map().on((g, up) => {
        if (g) {
          const a = {};
          a[up] = g;
          Object.assign(this.subs, a);
          this.updateTotalPrice();
        } else {
          delete this.subs[up];
        }
        this.setState({subs: this.subs});
      });
    }
  }
}

export default Point;
