import dayjs, { Dayjs } from "dayjs";
import "./reports.css";
import * as React from "react";

import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { productActions } from "../../actions/product/product";
import { connect } from "react-redux";
class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      todayBill: 0,
      total:0
    };
    this.props.getBillToday({
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
    });
  }
  componentDidMount() {
    setTimeout(()=>{
    const sum = this.props.product.bill_today.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
    console.log("bill today", this.props.product.bill_today);
    this.setState({ todayBill:  Math.round(sum)  });
  },500)

  const sdate = new Date().toISOString().split("T")[0];
  // const edate=endDate.toISOString().split("T")[0]

  this.props.getAll({ startDate: sdate, endDate: "" });
  setTimeout(()=>{
    const sum = this.props.product.data.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
    this.setState({ total: Math.round(sum)  });
  },500)

  }
 async changeDate(date) {
  this.props.product.data=[];
    const { startDate, endDate } = this.state;
    const sdate = date.toISOString().split("T")[0];
    // const edate=endDate.toISOString().split("T")[0]

   await this.props.getAll({ startDate: sdate, endDate: "" });
    setTimeout(()=>{
      const sum = this.props.product.data.reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);
      this.setState({ total: Math.round(sum)  });
    },500)
  }
  // const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  // const [startDate, setStartDate] = useState(new Date());
  render() {
    const { startDate, todayBill, endDate,total } = this.state;
    const { product } = this.props;
    return (
      <div className="container">
        <div className="page-title">Reports</div>
        <div className="report-container">
          <div className="calender-section">
            <div className="today-sale">
              <div className="title">Today sales</div>
              <div className="total">{todayBill} Rs</div>
            </div>
            <DatePicker

              selected={startDate}
              // selectsRange
              // onChange={(date) => this.changeDate(date)}
              // startDate={startDate}
              // endDate={endDate}
              onChange={(date)=>this.changeDate(date)}
              // selectsRange
              inline
            />
          </div>
          <div className="report-section">
            <div className="total-amount">
              <div className="title">Total</div>
              <div className="amount">{total} Rs</div>
            </div>
            <div className="table-section">
              <table>
                <tr>
                  <th>
                    Bill ID
                  </th>
                  <th>
                    Amount
                  </th>
                </tr>
                {product.data.map((item, i) => (
                  <tr>
                    <th>{item.billId}</th>
                    <th>{Number(item.amount).toFixed(2)}</th>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapState(state) {
  const { product } = state;

  return { product };
}

const actionCreators = {
  getAll: productActions.getAllBill,
  getBillToday: productActions.getBillToday,
};

const connectedProduct = connect(mapState, actionCreators)(Reports);
export { connectedProduct as Reports };
