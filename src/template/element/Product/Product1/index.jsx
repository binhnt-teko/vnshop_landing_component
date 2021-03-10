import React from 'react';
// import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
// import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../../utils';
import './index.less';

class Product1 extends React.PureComponent {
  renderProduct = (item, i) => {
    const { image, discount, discount_price,  origin_price } = item;
    ['image', 'discount', 'discount_price','origin_price'].forEach((key) => delete item[key]);

    return (
       <div className="productList4_1">
          <div
            {...item}
            >
             <div className="productList4_2_1">
                <div
                   {...image}
                    data-edit="image"
                  >
                  <img className="productList4_2_1_1"
                    src={image.children }
                    quality="original" />
                </div>

                <div className="productList4_2_1_2" >
                  <span
                    {...discount}
                      data-edit="texty"
                    lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                     {discount.children}
                   </span>
                  <span
                    className="productList4_2_1_2_2"
                    lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                    %
                  </span>
                </div>
             </div>
             <span
               {...discount_price}
               data-edit="texty"

               lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
               ₫ {discount_price.children}
             </span>
             <span
               {...origin_price}
               data-edit="texty"
               lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
               ₫ {origin_price.children}
             </span>
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
    const { title, hightlight, more } = promotion;
    const children = dataSource.products.children.map(this.renderProduct)

    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
      <div className="productList0" >
           <div className="productList1"
             data-spm="a2g0n.new_user_benefits"
             dataspm="a2g0n.new_user_benefits" >
              <span
                {...title}
                data-edit="texty"
                lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                {title.children }
              </span>
              <span
                {...hightlight }
                data-edit="texty"
                lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}">
                {hightlight.children }
              </span>
              <div className="productList4">
                  {children}
              </div>
              <div className="productList5">
                 <div className="productList5_1">
                   <span
                     {...more}
                     data-edit="texty"
                     lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}">
                     {more.children}
                   </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Product1;
