import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

import { Menu } from 'antd';
import { polyfill } from 'react-lifecycles-compat';
import { getChildrenToRender } from '../../../utils';

import { Tabs, Row, Col } from 'antd';
import { Icon } from '@ant-design/compatible';

const TabPane = Tabs.TabPane;

import './index.less';

const { Item, SubMenu } = Menu;

class Header4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.func ? props.func.currentPage : 1,
    };
  }
  static getDerivedStateFromProps(props, { prevProps, current: prevCurrent }) {
    const { func } = props;
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      const childLen = props.dataSource.category.children.length;
      if (func) {
        const current = func.currentPage > childLen ? childLen : func.currentPage;
        nextState.current = current;
      } else if (prevCurrent > childLen) {
        nextState.current = childLen;
      }
    }
    return nextState;
  }
  renderProducts = (items) => items.map(($item, i) => {
    const { ...item } = $item;
    console.log("binhnt.Nav4.renderProducts: item =  ",$item);

    const { image, product_name,  promotion } = item;
    ['image', 'product_name', 'promotion'].forEach((key) => delete item[key]);

    const imageSrc = image.children;
    const promotionText = promotion.children;
    const product_name_text = product_name.children;
    const priceText = item.price.children;
    const origin_price_text = item.origin_price.children;
    const discountText = item.discount.children;
    const rateText = item.rate.children;
    const soldText = item.sold.children;

    return (
      <div className="productPair1_1"
         data-id={"item_"+i}
         {...item}
         >
           <div
             {...image}
             data-edit="image"
              >
             <img className="productPair1_1_1"
                src={imageSrc}
                quality="original" />
           </div>
           <span className="productPair1_1_1_1"
             numberoflines="1"
             {...product_name}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             {product_name_text}
           </span>
            <div className="productPair1_1_3">
               <span className="productPair1_1_3_1"
                  numberoflines="1"
                   {...promotion}
                  data-edit="texty"
                  lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                  {promotionText}
               </span>
           </div>
        <span
           {...item.price}
           data-edit="texty"
           lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
           ₫ {priceText}
         </span>
         <div className="productPair1_1_5" >
           <span
             {...item.origin_price}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             ₫ {origin_price_text}
           </span>
           <span
             {...item.discount}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             {discountText}%
           </span>
         </div>
         <div  className="productPair1_1_6" >
            <div className="productPair1_1_6_1">
              <img className="productPair1_1_6_1_1"
                src="https://ae01.alicdn.com/kf/HTB1n.s8cv1G3KVjSZFk761K4XXat.png"
                quality="original" />
                <span
                  {...item.rate}
                  data-edit="texty"
                  lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                  {rateText}
                </span>
            </div>
            <span
              {...item.sold}
              data-edit="texty"
              lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
              | {soldText} Đã bán
            </span>
         </div>
      </div>
     )
  })
  renderPair = (items) => items.map((item, i) => {
    return (
      <div className="productPair0">
         <div className="productPair1" >
           {item[0]}
           {item[1]}
         </div>
       </div>
    )
  })
  getTabChildren = (item, i) => {
    console.log("Binhnt.getTabChildren: nav4: item = ", item);
    var children = "";
    if (item.products != undefined && item.products.children != undefined) {
      console.log("Binhnt.getTabChildren: nav4: products = ", item.products);
      var productList = this.renderProducts(item.products.children);
      var pairs =  productList.reduce(function(result, value, index, array) {
            if (index % 2 === 0)
              result.push(array.slice(index, index + 2));
            return result;
          }, []);
      children = this.renderPair(pairs);
    }

    let { tabText } = item;

    return (
      <TabPane
        key={i + 1}
        tab={(
          <div
            key={ "tab" + (i + 1)}
            {...tabText}
            data-edit="texty"
          >
            <span
              >
              {
                React.createElement('span', { dangerouslySetInnerHTML: { __html: tabText.children } })
              }
            </span>
          </div>
        )}
      >
        <div>
          { this.state.current === i + 1 && children }
        </div>
      </TabPane>
    );
  };

  onChange = (key) => {
    this.setState({ current: parseFloat(key) });
  }
  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { title } = dataSource;
    const tabsChildren = dataSource.category.children.map(this.getTabChildren);

    return (
      <div
        {...dataSource.wrapper}
        data-comp={[`tabs-switch={ "current": ${
          this.state.current}, "total": ${dataSource.category.children.length
        } ,"childRoute": ["category"] }`]}
      >
        <div className="categoryStyle00">
          <div className="categoryStyle0" >
             <div
               className="categoryStyle0"
                >
               <span
                 {...title}
                 data-edit="texty"
                 className="categoryStyle0_1"
                 lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                  {title.children}
               </span>
             </div>
             <Tabs
               key="tabs"
               className="categoryStyle1"
               onChange={this.onChange}
               activeKey={`${this.state.current}`}
               {...dataSource.category}
             >
               {tabsChildren}
             </Tabs>
          </div>

        </div>
    </div>
    );
  }
}

export default polyfill(Header4);
