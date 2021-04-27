import Helpers, { html } from '../Helpers.js';
import PublicMessages from '../PublicMessages.js';
import State from '../State.js';
import MessageForm from '../components/MessageForm.js';
import Identicon from '../components/Identicon.js';
import FollowButton from '../components/FollowButton.js';
import CopyButton from '../components/CopyButton.js';
import MessageFeed from '../components/MessageFeed.js';
import Session from '../Session.js';
import View from './View.js';
import {translate as t} from '../Translation.js';

const SUGGESTED_FOLLOW = 'hyECQHwSo7fgr2MVfPyakvayPeixxsaAWVtZ-vbaiSc.TXIp8MnCtrnW6n2MrYquWPcc-DTmZzMBmc2yaGv9gIU';

class Fulfill extends View {
  constructor() {
    super();
    this.eventListeners = {};
    this.following = new Set();
    this.state = {sortedMessages: []};
    this.messages = {};
    this.id = 'message-view';
    this.class = 'public-messages-view';

    this.cart = {};
    this.stateItems = {items:{}};
    this.orderedBy = new Set();

    this.items = {};
    this.id = 'profile';
  }

  getMessages(/*show2ndDegreeFollows*/) {
    //const followsList = show2ndDegreeFollows ? State.local.get('follows') : State.public.user().get('follow');
    const followsList = State.local.get('follows');
    followsList.map().once((follows, pub) => {
      if (follows) {
        if (this.following.has(pub)) return;
        if (Session.getPubKey() !== pub) {
          this.state.noFollows && State.local.get('noFollows').put(false);
        }
        this.following.add(pub);
        PublicMessages.getMessages(pub, (hash, time) => {
          if (Session.getPubKey() !== pub) {
            this.state.noMessages && State.local.get('noMessages').put(false);
          }
          const id = time + pub.slice(0,20);
          if (hash) {
            State.local.get('feed').get(id).put(hash);
          } else {
            State.local.get('feed').get(id).put(null);
          }
        });
      } else {
        this.following.delete(pub);
        this.eventListeners[pub] && this.eventListeners[pub].off();
      }
    });
  }

  componentDidMount() {
    /*
    State.local.get('show2ndDegreeFollows').on(show => {
      if (show === this.state.show2ndDegreeFollows) return;
      this.setState({show2ndDegreeFollows: show});
      //this.getMessages(show);
    }); */
    State.local.get('noFollows').on(noFollows => this.setState({noFollows}));
    State.local.get('noFollowers').on(noFollowers => this.setState({noFollowers}));
    State.local.get('noMessages').on(noMessages => this.setState({noMessages}));
    this.getMessages();
  }

  componentWillUnmount() {
    Object.values(this.eventListeners).forEach(e => e.off());
  }

  getNotification() {
    if (this.state.noFollows || this.state.noMessages) {
      return html`
        <div class="msg">
          <div class="msg-content">
            <p>${t('follow_someone_info')}</p>
            <div class="profile-link-container">
              <a href="/profile/${SUGGESTED_FOLLOW}" class="profile-link">
                <${Identicon} str=${SUGGESTED_FOLLOW} width=40 />
                <iris-text path="profile/name" user=${SUGGESTED_FOLLOW} placeholder="Suggested follow"/>
              </a>
              <${FollowButton} id=${SUGGESTED_FOLLOW} />
            </div>
            <p>${t('alternatively')} <a href="/profile/${Session.getPubKey()}">${t('give_your_profile_link_to_someone')}</a>.</p>
          </div>
        </div>
      `
    }
    if (this.state.noFollowers) {
      return html`
        <div class="msg">
          <div class="msg-content">
            <p>${t('no_followers_yet')}</p>
            <p><${CopyButton} text=${t('copy_link')} copyStr=${Helpers.getProfileLink(Session.getPubKey())}/></p>
            <p>Alternatively, get <a href="https://iris-sms-auth.herokuapp.com/?pub=${Session.getPubKey()}">SMS verified</a> so others can find you.</p>
            <small>${t('no_followers_yet_info')}</small>
          </div>
        </div>
      `;
    }
    return '';
  }

  renderView() {
    const pub = Session.getPubKey();


    
    const cartTotalItems = Object.keys(this.cart).filter(k => !!this.cart[k] && !!this.items[k]).reduce((sum, k) => sum + this.cart[k], 0);
    this.isMyProfile = Session.getPubKey() === this.props.store;

    const chat = Session.channels[this.props.store];
    const uuid = chat && chat.uuid;
    // var toSite = document.getElementById(".model").innerHTML
    let profilePhoto;
    if (this.isMyProfile) {
      profilePhoto = html`<${ProfilePhotoPicker} currentPhoto=${this.state.photo} placeholder=${this.props.store} callback=${src => this.onProfilePhotoSet(src)}/>`;
    } else {
      if (this.state.photo) {
        profilePhoto = html`<${SafeImg} class="profile-photo" src=${this.state.photo}/>`
      } else {
        profilePhoto = html`<${Identicon} str=${this.props.store} width=20/>`
      }
    }
    return html`
      <div class="centered-container">
        <${MessageForm} activeChat="public" class="hidden-xs" autofocus=${false}/>
        <!--<div class="feed-settings">
          <button onClick="${() => {
              State.local.get('show2ndDegreeFollows').put(!this.state.show2ndDegreeFollows);
            }}">
            ${this.state.show2ndDegreeFollows ? 'Hide' : 'Show'} messages from 2nd degree follows
          </button>
        </div>-->
        ${this.getNotification()}
        <${MessageFeed} node=${State.local.get('feed')} />

        ${Object.keys(this.stateItems.items).map(k => {
          const i = this.stateItems.items[k];
          return html`
              <div class="store-item-inner "  style="width: 100%; display: flex ;  ; border-left : none ">
                <div class="store-item "  style="width: 100%; display: contents; ">
                  <p class="names">${i.name}</p>
                  <p class="prices" contenteditable>${i.price}</p>
                  <a class="descriptions"  href="${i.description} "  >${i.description}</a>
                  <p  class="stock">${i.stock}</p>
                </div>
              </div>
          
            `
          })}
      </div>
    `;
  }
}

export default Fulfill;
