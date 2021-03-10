import React from 'react';
// import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
// import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../../utils';
import './index.less';

class Product0 extends React.PureComponent {
  renderProduct = (item, i) => {
    const { image, product_name,  promotion } = item;
    ['image', 'product_name', 'promotion'].forEach((key) => delete item[key]);

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
                src={image.children}
                quality="original" />
           </div>
           <span className="productPair1_1_1_1"
             numberoflines="1"
             {...product_name}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             {product_name.children}
           </span>
            <div className="productPair1_1_3">
               <span className="productPair1_1_3_1"
                  numberoflines="1"
                   {...promotion}
                  data-edit="texty"
                  lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                  {promotion.children}
               </span>
           </div>
        <span
           {...item.price}
           data-edit="texty"
           lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
           ₫ {item.price.children}
         </span>
         <div className="productPair1_1_5" >
           <span
             {...item.origin_price}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             ₫ {item.origin_price.children}
           </span>
           <span
             {...item.discount}
             data-edit="texty"
             lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
             {item.discount.children}%
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
                  {item.rate.children}
                </span>
            </div>
            <span
              {...item.sold}
              data-edit="texty"
              lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
              | {item.sold.children} Đã bán
            </span>
         </div>
      </div>
     )
  }
  renderPair = (item, i) => {
    return (
      <div className="productPair0">
         <div className="productPair1" >
           {item[0]}
           {item[1]}
         </div>
       </div>
    )
  }
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { promotion } = dataSource;
    const products = dataSource.products.children.map(this.renderProduct);
    const pairs =  products.reduce(function(result, value, index, array) {
          if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
          return result;
        }, []);
    const children = pairs.map(this.renderPair);
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
        <div>
           {children}
           <div class="productPair0">
              <div className="indexMoreSection">
                  <img className="indexMoreImage"
                    src="https://ae01.alicdn.com/kf/HTB1vHmncEGF3KVjSZFm5jbqPXXaJ.gif"
                    quality="original"/>
              </div>
          </div>
        </div>
    </div>
    );
  }
}

export default Product0;
