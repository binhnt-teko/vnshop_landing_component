import React from 'react';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import { mobileTitle } from 'rc-editor-list/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import webData from '../template/element/template.config';

import {
  getEditDomData,
  setDataIdToDataSource,
} from '../template/utils';

import { mergeEditDataToDefault, mdId, getChildRect } from '../share/utils';
import { mapStateToProps } from '../shared/utils';
import * as actions from '../shared/redux/actions';
import * as ls from '../shared/localStorage';

import BottomBar from './BottomBar';
import Point from '../share/Point';

const stateSort = { default: 0, hover: 1, focus: 2, active: 3 };
let isMobile;

enquireScreen((b) => {
  isMobile = b;
});

class Layout extends React.Component {

  static getDerivedStateFromProps(props, { prevProps, $self }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      if (!$self.isEdit) {
        nextState.templateData = props.templateData;
      }
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.scrollScreen = false;
    this.isEdit = window.frameElement && window.frameElement.tagName === 'IFRAME';
    if (!this.isEdit) {
      const { dispatch } = props;
      console.log("binhnt.layout.constructor: not edit => get UserData to display templates. ");
      dispatch(actions.getUserData());
    } else {
      console.log("binhnt.layout.constructor: is edited => Create a style object and append to to body and listener message => messageHandle ");

      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'body::-webkit-scrollbar{display:none;}';
      document.body.appendChild(style);

      //binhnt: Listen messsage from other window 
      window.addEventListener('message', this.messageHandle);
    }
    this.styleTag = this.createStyle();

    console.log("binhnt.layout.constructor: set  templateData = ", props.templateData);

    this.state = {
      templateData: props.templateData,
      isMobile,
      $self: this,// eslint-disable-line
    };
  }

  componentDidUpdate(prevProps) {
    console.log("binhnt.layout.componentDidUpdate: componentDidUpdate  start");

    if (this.isEdit) {
      // Can't get the bullet frame.
      console.log("binhnt.layout.componentDidUpdate: set Timer to update data ");
      setTimeout(this.setData);
    }

    scrollScreen.unMount();
    if (this.scrollScreen) {
      const { templateData } = this.state;
      const { data: { template } } = templateData || { data: { template: [] } };

      console.log("binhnt.layout.componentDidUpdate: template = ", template);

      scrollScreen.init({ location: template.map((c) => !c.match(/Nav/ig) && c).filter((c) => c) });
    }

    if (!this.isEdit && this.props !== prevProps) {
      this.setScrollToWindow();
    }
  }

  componentDidMount() {
    console.log("binhnt.layout.componentDidMount: start ");

    enquireScreen((b) => {
      this.setState({ isMobile: b });
    });
  }

  getSnapshotBeforeUpdate() {
    this.scrollTop = window.scrollY;
    return null;
  }

  //binhnt: this function send back data to parent by period 
  setData = () => {
    //binhnt: Giet list of editData
    const editData = getEditDomData(this.dom.children);
    // console.log("Binhnt.layout.setData: ", editData);

    // Add edits such as bullet boxes, and drop-down menus for navigation
    const bodyChild = Array.prototype.slice.call(document.body.childNodes)
      .filter((item) => item.tagName && item.tagName.toLocaleLowerCase() === 'div' && item.getAttribute('id') !== 'react-content');

    const currentPopArray = bodyChild.map((item) => getChildRect(item)).filter((c) => c).flat(Infinity);
    //binhnt: Add popover 
    editData.currentPopover = currentPopArray;
    // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
    // window.parent.postMessage(editData, '*');

    //binhnt: If parent exit function receiveDomData => Update data 
    if (window.parent.receiveDomData) {
      window.parent.receiveDomData(editData, window, mdId);
    }
  }

  //BINHNT: handle message from editor 
  messageHandle = (e) => {
    // FIXME: need much better assert condition
    // console.log('Preview page reception:', e.data);
    if (e.data.type && e.data.type.indexOf('webpack') === -1 && e.data.uid) {
      /* Object.keys(localStorage).forEach((key) => {
        localStorage.removeItem(key);
      }); */
      // console.log('Preview page received successfully:', e.data);
      ls.saveTemplate({
        id: e.data.uid,
        attributes: e.data.data,
      });
      this.setState({
        templateData: e.data,
      }, this.setScrollToWindow);
    }
  }

  setScrollToWindow = () => {
    // After dragging the template, scroll back to position;；
    if (this.scrollTop) {
      window.scrollTo(0, this.scrollTop);
    }
  }

  createStyle = (id = '') => {
    const style = document.createElement('style');
    document.body.appendChild(style);
    style.id = id;
    return style;
  }

  setStyleData = (style) => {
    const getCssToString = (css, className) => Object.keys(css).sort((a, b) => (
      stateSort[a] - stateSort[b]
    )).map((key) => {
      switch (key) {
        case 'default':
          return css[key].trim() && `${className} {${css[key]}}`;
        default:
          return css[key].trim() && `${className}:${key} {${css[key]}}`;
      }
    }).filter((c) => c);
    let cssStyle = '';
    let cssMobileCss = '';

    style.forEach((item) => {
      if ('cssString' in item) {
        const styleTag = document.getElementById(item.id) || this.createStyle(item.id);
        styleTag.innerHTML = item.cssString;
      } else {
        const cssName = item.className;
        const css = getCssToString(item.css, cssName);
        const mobileCss = getCssToString(item.mobileCss, cssName);
        if (css.length) {
          cssStyle += css.join();
        }
        if (mobileCss.length) {
          cssMobileCss += mobileCss.join();
        }
      }
    });
    // Version compatible, both css render are brought;
    this.styleTag.innerHTML = `${cssStyle || ''}${cssMobileCss
      ? `${mobileTitle}${cssMobileCss}}` : ''}`;
  }

  getDataToChildren = () => {
    console.log("Binhnt: layout.getDataToChildren:  start")

    const { templateData } = this.state;
    const { data, funcData } = templateData;
    console.log("Binhnt: layout.getDataToChildren:  funcData = ", funcData)
    console.log("Binhnt: layout.getDataToChildren:  data = ", data)


    const func = { ...funcData };

    //Binhnt: Data includes template, style, other, config
    const template = data.template

    console.log("Binhnt: layout.getDataToChildren:  template = ", template)

    this.setStyleData(data.style);
    const otherData = data.other;
    const configData = data.config || {};

    //binhnt: For each component => Create element base on component of template 
    const children = template.map((key) => {
      const keys = key.split('_');
      const componentName = keys[0];
      console.log("Binhnt.layout.getDataToChildren: Try to get component: ", componentName);

      //binhnt: Get component from list component 
      const componentData = webData[componentName];
      console.log("Binhnt.layout.getDataToChildren: componentData = ", componentData);

      const d = configData[key] || {};

      console.log("Binhnt.layout.getDataToChildren: getDataSource of component");
      //binhnt: merge data and create Id for each component 
      const dataSource = this.isEdit ? setDataIdToDataSource(mergeEditDataToDefault(d, componentData, true), key)
        : mergeEditDataToDefault(d, componentData, true);

      return React.createElement(componentData.component, {
        key,
        id: key,
        dataSource,
        func: func[key],
        isMobile: this.state.isMobile,
      });
    });

    //Update other data to children
    this.scrollScreen = false;
    Object.keys(otherData).forEach((key) => {
      switch (key) {
        case 'point': {
          children.push((
            <Point
              key="point"
              data={template}
              {...otherData[key]}
            />
          ));
          break;
        }
        case 'full':
          if (!this.isEdit) {
            this.scrollScreen = true;
          }
          break;
        default:
          break;
      }
    });
    return children;
  }

  getTemplatesToChildren = () => {
    const { templateData } = this.state;
    console.log("Binhnt: layout.getTemplatesToChildren:  templateData = ", templateData)
    const { type } = templateData;
    switch (type) {
      case 'default':
        return (
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {' '}
            Loading data...
            {' '}
          </div>
        );
      case 'error':
        return (
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {' '}
            Data loading error...
          </div>
        );
      default:
        return this.getDataToChildren();
    }
  };

  //binhnt: main component render  
  render() {
    console.log("Binhnt: layout.render:  start")
    const children = this.getTemplatesToChildren();
    return [
      (
        <div
          id="templates-wrapper"
          className="templates-wrapper"
          ref={(c) => { this.dom = c; }}
          key="templates"
        >
          {children}
        </div>
      ),
      !this.isEdit && <BottomBar key="bar" />,
    ];
  }
}

export default connect(mapStateToProps)(polyfill(Layout));
