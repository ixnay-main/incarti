import { Component } from '../lib/preact.js';
import Helpers, { html } from '../Helpers.js';
import PublicMessage from './PublicMessage.js';
import ScrollWindow from '../lib/ScrollWindow.js';
import State from '../State.js';
import { translate as t } from '../Translation.js';

const size = 10;

class MessageFeed extends Component {
  constructor() {
    super();
    this.state = {sortedMessages:[], mappedMessages: new Map()};
  }

  componentDidMount() {
    //this.initIntersectionObserver();
    this.setUpScroller();
    let first = true;
    State.local.get('scrollUp').on(() => {
      !first && this.topClicked();
      first = false;
    });
  }

  setUpScroller() {
    this.scroller = new ScrollWindow(this.props.node, {size, onChange: (sortedMessages, mappedMessages) => this.setState({sortedMessages: sortedMessages.reverse(), mappedMessages})});
  }

  componentDidUpdate(prevProps) {
    if (this.props.node._.id !== prevProps.node._.id) {
      this.scroller && this.scroller.unsubscribe();
      this.setState({sortedMessages: [], mappedMessages: new Map()});
      this.setUpScroller();
    }
  }

  componentWillUnmount() {
    this.scroller && this.scroller.unsubscribe();
  }

  topClicked() {
    this.scroller.top();
    const container = $(this.base).find('.feed-container');
    container.css({'padding-top': 0, 'padding-bottom': 0});
    Helpers.animateScrollTop('.main-view');
    this.setState({});
  }

  bottomClicked() {
    this.scroller.bottom();
    const container = $(this.base).find('.feed-container');
    container.css({'padding-top': 0, 'padding-bottom': 0});
    this.setState({});
  }

  renderMessages() {
    if (this.props.keyIsMsgHash) {

      return html`
        ${this.state.sortedMessages
          .map(hash => typeof hash === 'string' ? html`<${PublicMessage} hash=${hash} key=${hash} showName=${true} />` : '')
        }
      `;
    } else {
      return html`
        ${this.state.sortedMessages
          .map(hash => typeof hash === 'string' ? html`<${PublicMessage} hash=${hash} key=${hash} showName=${true} />` : '')
        }
      `;
    }
  }

  render() {
    const showButtons = this.scroller && this.scroller.elements.size >= size;
    let messages;
    if (this.props.keyIsMsgHash) {
      messages = Array.from(this.state.mappedMessages.keys()).sort().reverse();
    } else {
      messages = this.state.sortedMessages;
    }
    //console.log(1,messages);
    return html`
      <div class="feed-container">
        ${showButtons && this.scroller && this.scroller.opts.stickTo !== 'top' ? html`
          <p>
            <button onClick=${() => this.scroller.up()}>${t('feed_up')}</button>
            <button onClick=${() => this.topClicked()}>${t('feed_top')}</button>
          </p>
        `: ''}
        ${messages.map(hash => typeof hash === 'string' ? html`<${PublicMessage} hash=${hash} key=${hash} showName=${true} />` : '')
        }
        ${showButtons && this.scroller && this.scroller.opts.stickTo !== 'bottom' ? html`
          <p>
            <button onClick=${() => this.scroller.down()}>${t('feed_down')}</button>
            <button onClick=${() => this.bottomClicked()}>${t('feed_bottom')}</button>
          </p>
        `: ''}
      </div>
    `;
  }
  /*
  adjustPaddings(isScrollDown) {
    const container = document.getElementById("container");
    const currentPaddingTop = getNumFromStyle(container.style.paddingTop);
    const currentPaddingBottom = getNumFromStyle(container.style.paddingBottom);
    const remPaddingsVal = 198 * (size / 2); // TODO: calculate actual element heights
    if (isScrollDown) {
      container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
      container.style.paddingBottom = currentPaddingBottom === 0 ? "0px" : currentPaddingBottom - remPaddingsVal + "px";
    } else {
      container.style.paddingBottom = currentPaddingBottom + remPaddingsVal + "px";
      if (currentPaddingTop === 0) {
        $(window).scrollTop($('#post0').offset().top + remPaddingsVal);
      } else {
        container.style.paddingTop = currentPaddingTop - remPaddingsVal + "px";
      }
    }
  }

  topSentCallback(entry) {
    const container = document.getElementById("container");

    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // conditional check for Scrolling up
    if (
      currentY > topSentinelPreviousY &&
      isIntersecting &&
      currentRatio >= topSentinelPreviousRatio &&
      scroller.center !== previousUpIndex && // stop if no new results were received
      scroller.opts.stickTo !== 'top'
    ) {
      previousUpIndex = scroller.center;
      adjustPaddings(false);
      scroller.up(size / 2);
    }
    topSentinelPreviousY = currentY;
    topSentinelPreviousRatio = currentRatio;
  }

  botSentCallback(entry) {
    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // conditional check for Scrolling down
    if (
      currentY < bottomSentinelPreviousY &&
      currentRatio > bottomSentinelPreviousRatio &&
      isIntersecting &&
      scroller.center !== previousDownIndex &&  // stop if no new results were received
      scroller.opts.stickTo !== 'bottom'
    ) {
      previousDownIndex = scroller.center;
      adjustPaddings(true);
      scroller.down(size / 2);
    }
    bottomSentinelPreviousY = currentY;
    bottomSentinelPreviousRatio = currentRatio;
  }

  initIntersectionObserver() {
    const options = {
      //rootMargin: '190px',
    }

    const callback = entries => {
      entries.forEach(entry => {
        if (entry.target.id === 'post0') {
          topSentCallback(entry);
        } else if (entry.target.id === `post${size - 1}`) {
          botSentCallback(entry);
        }
      });
    }

    var observer = new IntersectionObserver(callback, options); // TODO: It's possible to quickly scroll past the sentinels without them firing. Top and bottom sentinels should extend to page top & bottom?
    observer.observe(document.querySelector("#post0"));
    observer.observe(document.querySelector(`#post${size - 1}`));
  } */
}

export default MessageFeed;
