import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import { Tabs, Row, Col } from 'antd';
import { Icon } from '@ant-design/compatible';

import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../../utils';

import './index.less';

class Banner5 extends React.PureComponent {
  static getDerivedStateFromProps(props, { prevProps, current: prevCurrent }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      const childLen = props.dataSource.block.children.length;
      if (func) {
        const current = func.currentPage > childLen ? childLen : func.currentPage;
        nextState.current = current;
      } else if (prevCurrent > childLen) {
        nextState.current = childLen;
      }
    }
    return nextState;
  }

  constructor(props) {
    super(props);
    this.state = {
      /* replace-start-value = current: 1 */
      current: props.func ? props.func.currentPage : 1,
      /* replace-end-value */
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
     e.preventDefault();
     console.log('The link was clicked.',e.target);

     if (e.target.parentNode != undefined ) {
       var key = e.target.parentNode.dataset.tab
       console.log('Set current = ' + key);

       this.setState({ current: parseFloat(key) });
     } else {
       console.log('e.target.parentNode = underfined ');
     }
   }

  getBlockChildren = (item, i) => {
    const { tag, content } = item;
    const { text, img } = content;
    const textChildren = text.children;
    const { icon } = tag;
    const iconChildren = icon.children;
    const tagText = tag.text;
    return (
      <div
        key={i + 1}
      >
          {
            this.state.current === i + 1 && (
            <Row
              key="content"
              className={content.className}
              gutter={content.gutter}
              {...content}
              data-edit="Row"
            >
              <Col
                className={text.className}
                xs={text.xs}
                md={text.md}
                /* replace-start */
                {...text}
                data-edit={['Col', 'text']}
              /* replace-end */
              >
                {
                  /* replace-start-value = textChildren */
                  React.createElement('span', { dangerouslySetInnerHTML: { __html: textChildren } })
                  /* replace-end-value */
                }
              </Col>
              <Col
                className={img.className}
                xs={img.xs}
                md={img.md}
                /* replace-start */
                {...img}
                data-edit={['Col', 'image']}
              /* replace-end */
              >
                <img src={img.children} width="100%" alt="img" />
              </Col>
            </Row>
          )}
      </div>
    );
  }

  getTabChildren = (item, i) => {
    const { title, image } = item;
    return (
      <div
        {...item}
        data-tab={i+1}
        onClick={this.handleClick}
        >
         <div className="bannerStyle8" ></div>
         <span
           {...title}
            data-edit="texty"
            className={this.state.current === i + 1 ? "bannerStyle13" : "bannerStyle9" }
            lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
            {title.children}
          </span>
           <img
             className="bannerStyle10"
             src={image.children}
             quality="original" />
      </div>
    );
  }
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const tabs = dataSource.tabs.children.map(this.getTabChildren);
    const tabsChildren = dataSource.block.children.map(this.getBlockChildren);
    const { banner } =  dataSource;
    const { image, title } = banner;

    return (
      <div
        {...currentProps}
        {...dataSource.wrapper}

        data-comp={[`tabs-switch={ "current": ${
          this.state.current}, "total": ${dataSource.block.children.length
        } ,"childRoute": ["block"] }`]}
      >
          <div className="bannerStyle0">
              <div
                  {...banner}
                  data-edit="image"
                  >
                 <img
                   className={dataSource.banner.image.className}
                   src={dataSource.banner.children}
                   quality="original"
                   data-sy="mnbvc" />
                   <div className="bannerStyle3" >
                      <span
                        {...title}
                        data-edit="texty"
                        lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}"
                        >
                        { title.children}
                      </span>
                      <div
                        className="bannerStyle5"
                        id="header"
                         >
                         {tabs}
                      </div>
                   </div>
              </div>
          </div>
    </div>
    );
  }
}
export default polyfill(Banner5);
