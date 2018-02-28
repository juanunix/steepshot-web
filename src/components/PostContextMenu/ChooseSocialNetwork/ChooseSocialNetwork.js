import * as React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  VKShareButton,
  RedditShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  RedditIcon
} from 'react-share';

const BUTTON_WIDTH = 120;
const WRAPPER_PADDING = 10;

class ChooseSocialNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.mobileOrientation = this.mobileOrientation.bind(this);
  }

  componentDidMount() {
    this.mobileOrientation();
    window.addEventListener('resize', this.mobileOrientation);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.mobileOrientation);
  }

  mobileOrientation() {
    let documentWidth = document.documentElement.clientWidth;
    let buttonsNumber = document.getElementsByClassName('soc-network-item_csn').length;
    let wrapperWidth = buttonsNumber * BUTTON_WIDTH + (buttonsNumber - 1) + WRAPPER_PADDING * 2;
    if (wrapperWidth > documentWidth) {
      this.shareButtons.style.flexDirection = 'column';
    } else {
      this.shareButtons.style.flexDirection = '';
    }
  }

  closeModal(e) {
    e.stopPropagation();
    this.props.closeModal();
  }

  render() {
    let shareAdress = `https://alpha.steepshot.io/post${this.props.url.replace(/\/\w+(\/@[\w-.]+)/, '$1')}`;
    let postTitle = this.props.item.title;
    let crossOffset = {top: 8, right: 5};
    return (
      <div className="wrapper_csn-mod">
        <div className="body_confirm-del-mod position--relative">
          <p className="title_csn-mod">Social networks we cooperate with</p>
          <div className="cross-wrapper_menu cross-wrapper_csn"
               onClick={this.closeModal.bind(this)}
               style={crossOffset}
          >
            <i className="cross_menu"/>
          </div>
          <div className="share-buttons_csn" ref={ref => {this.shareButtons = ref}}>
            <div className="soc-network-item_csn" ref={ref => {this.button = ref}}>
              <FacebookShareButton url={shareAdress}
                                   hashtag="#steepshot"
              >
                <FacebookIcon size={42} round={false}/>
                <p>Facebook</p>
              </FacebookShareButton>
            </div>
            <div className="soc-network-item_csn">
              <TwitterShareButton url={shareAdress}
                                  title={postTitle}
                                  hashtags={this.props.item.tags}
              >
                <TwitterIcon size={42} round={false} />
                <p>Twitter</p>
              </TwitterShareButton>
            </div>
            <div className="soc-network-item_csn">
              <PinterestShareButton url={shareAdress}
                               description={this.props.item.description}
                               media={this.props.item.media[0].url}
              >
                <PinterestIcon size={42} round={false}/>
                <p>Pinterest</p>
              </PinterestShareButton>
            </div>
            <div className="soc-network-item_csn">
              <VKShareButton url={shareAdress}
                             title={postTitle}
                             image={this.props.item.media[0].url}
              >
                <VKIcon size={42} round={false}/>
                <p>VK</p>
              </VKShareButton>
            </div>
            <div className="soc-network-item_csn">
              <LinkedinShareButton url={shareAdress}
                                   title={postTitle}
              >
                <LinkedinIcon size={42} round={false}/>
                <p>Linkedin</p>
              </LinkedinShareButton>
            </div>
            <div className="soc-network-item_csn">
              <RedditShareButton url={shareAdress}
                                 title={postTitle}
              >
                <RedditIcon size={42} round={false}/>
                <p>Reddit</p>
              </RedditShareButton>
            </div>
          </div>
        </div>
        <div className="footer_csn">
          <p className="text--center">Select social network you want share to</p>
        </div>
      </div>
    );
  }
}


export default ChooseSocialNetwork;