import React from 'react';
// import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
// import QueueAnim from 'rc-queue-anim';
/* replace-start-value = import { getChildrenToRender } from './utils'; */
import { getChildrenToRender } from '../../../utils';
import './index.less';

class Voucher0 extends React.PureComponent {

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { voucher } = dataSource;
    return (
      <div
        {...props}
        {...dataSource.wrapper}
      >
         <div className="voucher00">
             <div className="voucher1" >
                <span
                  lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}"
                  {...voucher.title}
                  data-edit="texty"
                  >
                  {voucher.title.children}
                </span>
                <span  className="voucher1_2"
                  lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                </span>
                <div  className="voucher1_3" >
                   <div  className="voucher1_3_1">
                      <span
                        lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}"
                        {...voucher.value}
                        data-edit="texty"
                         >
                        ₫ {voucher.value.children}
                      </span>
                      <span
                        {...voucher.condition}
                        data-edit="texty"
                        lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                        {voucher.condition.children}
                      </span>
                      <span
                        {...voucher.validate_date}
                        data-edit="texty"
                        lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                        {voucher.validate_date.children}
                      </span>
                      <div className="voucher1_3_1_4" >
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                         <div className="voucher1_3_1_4_1" ></div>
                      </div>
                      <div className="voucher1_3_1_5" >
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                         <div className="voucher1_3_1_5_1" ></div>
                      </div>
                   </div>
                   <div  className="voucher1_3_2" >
                      <div className="voucher1_3_2_1" >
                         <img className="voucher1_3_1_1_1"
                           src="https://ae01.alicdn.com/kf/H5fbf87e941884d3a95193dae6252e5111.gif"
                           quality="original" />
                          <span
                            {...voucher.c2a}
                            data-edit="texty"
                            lineheightoptimizer="function(e){return Math.ceil(9.24*Math.pow(10,-5)*Math.pow(e,2)+1.492*e+2.174)}" >
                            {voucher.c2a.children}
                          </span>
                      </div>
                      <div className="voucher1_3_2_2" >
                         <div className="voucher1_3_2_2_1" ></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                         <div className="voucher1_3_2_2_1"></div>
                      </div>
                      <div className="voucher1_3_2_3" >
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                         <div className="voucher1_3_2_3_1"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
      </div>
    );
  }
}
export default Voucher0;
