import * as React from 'react';
import Menu from './Menu/Menu';
import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';
import ChooseSocialNetwork from './ChooseSocialNetwork/ChooseSocialNetwork';
import ConfirmFlagModal from './ConfirmFlagModal/ConfirmFlagModal';
import Constants from '../../common/constants';
import {connect} from 'react-redux';
import {toggleFlag} from '../../actions/flag';
import {copyToClipboard} from '../../actions/clipboard';
import {closeModal, openModal, closeAllModals} from '../../actions/modal';
import {deletePost} from '../../actions/post';
import {getHistory} from '../../main';
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
import './postContextMenu.css';



class PostContextMenu extends React.Component {

  constructor(props) {
    super(props);
    let buttonsOptions = this.setButtonsOptions.call(this);
    this.state = {
      showModal: false,
      fullScreen: false,
      BUTTONS_OPTIONS: buttonsOptions,
    };
    this.openFunc = this.openFunc.bind(this);
  }

  hidePost() {

  }

  deletePost() {
    let modalOption = {
      body: (<ConfirmDeleteModal closeModal={() => {this.props.closeModal("ConfirmDeleteModal")}}
                                 closeAllModals={() => {this.props.closeAllModals()}}
                                 modalsCallback={this.modalsCallback.bind(this)}
             />)
    };
    this.props.closeModal("MenuModal");
    this.props.openModal("ConfirmDeleteModal", modalOption);
  }

  modalsCallback(param) {
    if (param) {
      this.props.deletePost(this.props.index);
    } else {
      this.openFunc();
    }
  }

  editPost() {
    this.props.history.push('/editPost' + this.props.item.url);
    this.props.closeModal("MenuModal");
  }

  share() {
    let modalOption = {
      body: (<ChooseSocialNetwork closeModal={() => {this.props.closeModal("ChooseSocialNetwork")}}
                                  url={this.props.index}
                                  item={this.props.item}
      />)
    };
    this.props.closeModal("MenuModal");
    this.props.openModal("ChooseSocialNetwork", modalOption);
  }

  copyLink() {
    let url = document.location.origin + '/post' + this.props.item.url;
    this.props.copyToClipboard(url);
    this.props.closeModal("MenuModal");
  }

  embed() {

  }

  toggleFlag() {
    if (!this.props.isUserAuth) {
      jqApp.pushMessage.open(Constants.VOTE_ACTION_WHEN_NOT_AUTH);
      return;
    }
    if (!this.props.item.flag) {
      let modalOption = {
        body: (<ConfirmFlagModal closeModal={() => {this.props.closeModal("ConfirmFlagModal")}}
                                 flagCallback={this.flagCallback.bind(this)}
        />)
      };
      this.props.openModal("ConfirmFlagModal", modalOption);
    } else {
      this.props.toggleFlag(this.props.index);
    }
    this.props.closeModal("MenuModal");
  }

  flagCallback(param) {
    if(param) {
      this.props.toggleFlag(this.props.index);
      this.props.closeModal("ConfirmFlagModal");
    } else {
      this.openFunc();
    }
  }

  openFunc() {
    let modalOption = {
      body: (<Menu buttonOption={this.state.BUTTONS_OPTIONS}
                   closeModal={() => {this.props.closeModal("MenuModal")}}
             />)
    };
    this.props.openModal("MenuModal", modalOption);
  }

  render() {
    return (
      <div className="container_pos-con-men" style={this.props.style}>
        <div className="container_post-men-but" onClick={this.openFunc} style={this.props.style}>
          <div className="shape_post-men-but" alt="Open post menu" title="Open post menu"/>
        </div>
      </div>
    );
  }

  setButtonsOptions() {
    let BUTTONS_OPTIONS = [
      {
        img: '/static/images/postContextMenu/shareTrue.svg',
        revertImg: '/static/images/postContextMenu/shareFalse.svg',
        alt: 'Share',
        callback: this.share.bind(this),
        hasDelimiter: true,
      }, {
        img: '/static/images/postContextMenu/copyTrue.svg',
        revertImg: '/static/images/postContextMenu/copyFalse.svg',
        alt: 'Copy link',
        callback: this.copyLink.bind(this),
        hasDelimiter: false,
      },
      // TODO uncomment when will be implemented embed
      /*{
        img: '/static/images/postContextMenu/embedTrue.svg',
        revertImg: '/static/images/postContextMenu/embedFalse.svg',
        alt: 'Embed',
        callback: this.embed.bind(this),
        hasDelimiter: false,
      },*/
    ];

    let tmp;
    let author = this.props.index.match(/@[\w-.]+/)[0];
    if (author == `@${this.props.username}`) {
      tmp = [];
      if (new Date(this.props.item['cashout_time']) > new Date()) {
        tmp.push({
            img: '/static/images/postContextMenu/editTrue.svg',
            revertImg: '/static/images/postContextMenu/editFalse.svg',
            alt: 'Edit',
            callback: this.editPost.bind(this),
            hasDelimiter: true,
          });
        tmp.push({
            img: '/static/images/postContextMenu/deleteTrue.svg',
            revertImg: '/static/images/postContextMenu/deleteFalse.svg',
            alt: 'Delete',
            callback: this.deletePost.bind(this),
            hasDelimiter: true,
          });
      }
    } else {
      tmp = [
        {
          img: '/static/images/flagTrue.svg',
          revertImg: '/static/images/flagFalse.svg',
          alt: this.props.item.flag ? 'Unflag this' : 'Flag this' ,
          callback: this.toggleFlag.bind(this),
          hasDelimiter: true,
        }, /* TODO uncomment when will be implemented hide
        {
          img: '/static/images/postContextMenu/hideTrue.svg',
          revertImg: '/static/images/postContextMenu/hideFalse.svg',
          alt: 'Hide',
          callback: this.hidePost.bind(this),
          hasDelimiter: true,
        }*/];
    }
    return tmp.concat(BUTTONS_OPTIONS);
  }

}


const mapStateToProps = (state) => {
  return {
    username: state.auth.user,
    isUserAuth: !!state.auth.user && !!state.auth.postingKey,
    history: getHistory()
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFlag: (postIndex) => {
      dispatch(toggleFlag(postIndex));
    },
    copyToClipboard: (text) => {
      dispatch(copyToClipboard(text));
    },
    openModal: (index, options) => {
      dispatch(openModal(index, options));
    },
    closeModal: (index) => {
      dispatch(closeModal(index));
    },
    deletePost: (index) => {
      dispatch(deletePost(index));
    },
    closeAllModals: () => {
      dispatch(closeAllModals());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContextMenu);
