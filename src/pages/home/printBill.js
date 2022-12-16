import { textAlign } from "@mui/system";
import * as React from "react";

import logo from "../../images/logo.png";
import "./home.css";

export class PrintBill extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };

  }

  canvasEl;
  setRef = (ref) => (this.canvasEl = ref);
  componentDidMount() {
    // const ctx = this.canvasEl.getContext("2d");
    // if (ctx) {
    //   ctx.beginPath();
    //   ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    //   ctx.stroke();
    //   ctx.fillStyle = "rgb(200, 0, 0)";
    //   ctx.fillRect(85, 40, 20, 20);
    //   ctx.save();
    // }
  }

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });



  render() {
    const { text } = this.props;

    return (
        <div id="report">
             <style type="text/css" media="print">
          {
            "\
   @page { size: portrait; }\
"
          }
        </style>
        <img src={logo} alt="" className="logo-bill" />
       <div className="address">
          <span style={{fontSize:"12px",fontWeight:700}}> Creamy Creations & Creamy Cafe Pvt Ltd.</span> <br /> No.781, Hospital
          Road,
          Jaffna.
        </div>
        <div className="tp">Tp :- 0766587149 / 0212210866 <br/>
        www.creamycreation.lk
        </div>
        <br/>
          <div className="cash_receipt">
            <p>CASH RECEIPT</p>
          </div>
        <div className="bill-no-sec">
          <div className="">Bill No {text.bill_id}</div>
          <div className="">{new Date().toISOString().split("T")[0]}</div>
        </div>
        <div className="produts-list">
          <table>
            {text.billProduct.map((item) => (
              <tr>
                <td style={{width:"70%",wordBreak:"break-all"}}>{item.name}</td>
                <td>
                  {item.price}x{item.count}
                </td>
                <td style={{textAlign:"right"}}>{item.sub_total}</td>
              </tr>
            ))}
          </table>
        </div>

        <div className="summary">
          <table>
            <tr style={{lineHeight:"4px"}}>
              <td >Sub Total</td>
              <td style={{textAlign:"right"}}>{text.total}</td>
            </tr>
            <tr  style={{lineHeight:"4px"}}>
              <td>Discount</td>
              <td style={{textAlign:"right"}}>{text.bill.discount}</td>
            </tr>
            <tr  style={{lineHeight:"4px"}}>
              <td>Service charge</td>
              <td style={{textAlign:"right"}}>{text.bill.salesTax}</td>
            </tr>
            <tr  style={{lineHeight:"4px"}}>
              <td style={{ fontSize:"13px",fontWeight:"800"}}>Total amount</td>
              <td style={{ fontSize:"13px",fontWeight:"800",textAlign:"right"}}>{text.bill.net_amount}</td>
            </tr>
          </table>
        </div>

        <div className="thank">Thank you, come again</div>

        <div className="social-media">
          <div className="business">
            <span>Powered By</span><br/>
            <span style={{fontWeight:700}}>www.microwe.net</span><br/>
            <span>0775224424 / 0777637826</span>
          </div>
        </div>
      </div>


    //   <div className="relativeCSS">

    //     <div className="flash" />
    //     <table className="testClass">
    //       <thead>
    //         <tr>
    //           <th className="column1">Test Name</th>
    //           <th>Test</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>Canvass</td>
    //           <td>
    //             <canvas height="100" ref={this.setRef} width="200">
    //               Your browser does not support the HTML5 canvas tag.
    //             </canvas>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Dynamic Content From Prop</td>
    //           <td>{text ?? "Custom Text Here"}</td>
    //         </tr>
    //         <tr>
    //           <td>Fonts</td>
    //           <td>
    //             <div className="customFontText">Some Cool Font Text</div>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Image: Local Import</td>
    //           <td>
    //             <img alt="A test" src={image} width="200" />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Image: URL</td>
    //           <td>
    //             <img
    //               alt="Google logo"
    //               src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    //               width="200"
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Input</td>
    //           <td>
    //             <input />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Input: Checkbox</td>
    //           <td>
    //             <input
    //               checked={this.state.checked}
    //               onChange={this.handleCheckboxOnChange}
    //               type="checkbox"
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Input: Date</td>
    //           <td>
    //             <input type="date" />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Input: Radio</td>
    //           <td>
    //             Blue <input type="radio" id="blue" name="color" value="blue" />
    //             Red <input type="radio" id="red" name="color" value="red" />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Select</td>
    //           <td>
    //             <select name="cars" id="cars">
    //               <option value="volvo">Volvo</option>
    //               <option value="saab">Saab</option>
    //               <option value="mercedes">Mercedes</option>
    //               <option value="audi">Audi</option>
    //             </select>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>SVG</td>
    //           <td>
    //             <svg height="100" width="100">
    //               <circle
    //                 cx="50"
    //                 cy="50"
    //                 fill="yellow"
    //                 r="40"
    //                 stroke="green"
    //                 strokeWidth="4"
    //               />
    //             </svg>
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Video</td>
    //           <td>
    //             <video
    //               src="https://www.w3schools.com/html/mov_bbb.mp4"
    //               width="200"
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>Video: With Poster</td>
    //           <td>
    //             <video
    //               poster="https://images.freeimages.com/images/large-previews/9a9/tuscany-landscape-4-1500765.jpg"
    //               src="https://www.w3schools.com/html/mov_bbb.mp4"
    //               width="200"
    //             />
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>


    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <PrintBill ref={ref} text={props} />;
});
