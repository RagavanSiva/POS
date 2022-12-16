import "./home.css";
import { productData } from "../../dummyData";
import * as React from "react";

import food from "../../images/food.jpg";
import { categoryActions } from "../../actions/category/category";
import { connect } from "react-redux";
import { Component } from "react";
import { productActions } from "../../actions/product/product";
import logo from "../../images/logo.png";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { PrintBill } from "./printBill";
class Home extends React.PureComponent {
  componentRef = null;
  constructor(props) {
    super(props);
    console.log("props", props);
    this.reff = React.createRef();

    // reset login status
    // this.props.logout();

    this.state = {
      inputs: {
        name: "",
        id: "",
      },
      bill: {
        discount:  this.props.product.summary_details.discount,
        salesTax: this.props.product.summary_details.salesTax,
        net_amount: this.props.product.summary_details.net_amount,
      },
      submitted: false,
      open: false,
      billProduct: this.props.product.productList,
      total: this.props.product.summary_details.total,
      serPer: this.props.product.summary_details.serPer,
      bill_id: this.props.product.bill.billId,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this);
    this.handleChangeServicePercentage =
      this.handleChangeServicePercentage.bind(this);
    this.handleChangeSalesTax = this.handleChangeSalesTax.bind(this);
    this.save = this.save.bind(this);
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
  }
  componentDidMount() {
    this.props.getCategory();
    this.props.getProducts();
  }
  handleChange(e) {
    const { name, value } = e.target;
    const { inputs } = this.state;
    this.setState({
      inputs: {
        ...inputs,
        [name]: value,
      },
    });
  }
  handleChangeSelected(e) {
    const { name, value } = e.target;
    const { inputs } = this.state;
    this.setState({
      inputs: {
        ...inputs,
        [name]: value,
      },
    });
    let data = {
      id: value,
      name: inputs.name,
    };
    this.props.getProducts(data);
  }
  handleSearch(e) {
    const { inputs } = this.state;
    if (inputs.id || inputs.name) {
      console.log(".............", inputs);
      this.props.getProducts(inputs);
    }
  }
  deleteProductToBill(item) {
    const { billProduct } = this.state;

    let pro = billProduct.filter((data) => data.productId != item.productId);
    this.setState({
      billProduct: pro,
    });
    const sum = pro.reduce((accumulator, object) => {
      let sub;
      if (!object.sub_total) {
        sub = 0;
      } else {
        sub = object.sub_total;
      }
      return parseInt(accumulator) + parseInt(sub);
    }, 0);
    this.setState({
      total: Number(parseInt(sum)).toFixed(2),
    });
    setTimeout(() => {
      this.calcNetTotal();
    }, 0);
  }
  addProductToBill(item) {
    console.log("add", this.props);

    const { billProduct } = this.state;
    let pro = billProduct;
    let find = billProduct.filter((data) => data.productId == item.productId);
    if (find.length == 0) {
      item.count = 1;
      item.sub_total = 0;
      item.sub_total = Number(parseInt(item.price)).toFixed(2);
      pro.push(item);
      this.setState({
        billProduct: pro,
      });
    } else {
    }
    const sum = billProduct.reduce((accumulator, object) => {
      let sub;
      if (!object.sub_total) {
        sub = 0;
      } else {
        sub = object.sub_total;
      }
      return parseInt(accumulator) + parseInt(sub);
    }, 0);
    this.setState({
      total: Number(parseInt(sum)).toFixed(2),
    });
    setTimeout(() => {
      this.calcNetTotal();
    }, 0);
    // console.log(".............", billProduct);
  }
  handleIncrease(index) {
    const { billProduct } = this.state;
    let pro = billProduct;
    const newState = billProduct.map((obj, i) => {
      // 👇️ if id equals 2, update country property
      if (i === index) {
        return {
          ...obj,
          count: obj.count + 1,
          sub_total: obj.price * (obj.count + 1),
        };
      }

      // 👇️ otherwise return object as is
      return obj;
    });
    this.setState({
      billProduct: newState,
    });
    // setData(newState);
    const sum = newState.reduce((accumulator, object) => {
      let sub;
      if (!object.sub_total) {
        sub = 0;
      } else {
        sub = object.sub_total;
      }
      return parseInt(accumulator) + parseInt(sub);
    }, 0);
    this.setState({
      total: sum,
    });

    setTimeout(() => {
      this.calcNetTotal();
    }, 0);
  }
  handleDecrease(index) {
    const { billProduct } = this.state;
    let pro = billProduct;
    const newState = billProduct.map((obj, i) => {
      // 👇️ if id equals 2, update country property
      if (i === index) {
        return {
          ...obj,
          count: obj.count - 1,
          sub_total: obj.price * (obj.count - 1),
        };
      }

      // 👇️ otherwise return object as is
      return obj;
    });
    this.setState({
      billProduct: newState,
    });
    const sum = newState.reduce((accumulator, object) => {
      let sub;
      if (!object.sub_total) {
        sub = 0;
      } else {
        sub = object.sub_total;
      }
      return parseInt(accumulator) + parseInt(sub);
    }, 0);
    this.setState({
      total: sum,
    });
    setTimeout(() => {
      this.calcNetTotal();
    }, 0);
  }
  handleChangeDiscount(e) {
    const { name, value } = e.target;
    const { bill, total } = this.state;
    let ct = parseInt(total) - value;
    let cn = ct + bill.salesTax;
    this.setState({
      bill: { ...bill, net_amount: cn, discount: value },
    });
  }
  handleChangeServicePercentage(e) {
    const { name, value } = e.target;
    const { bill, total } = this.state;
    let ctotal_tax = (parseInt(total) / 100) * value;
    let cn = parseInt(total) - parseInt(bill.discount) + parseInt(ctotal_tax);
    this.setState({
      bill: { ...bill, net_amount: cn, salesTax: ctotal_tax },
      serPer: value,
    });
  }
  calcNetTotal() {
    const { bill, total, serPer } = this.state;
    let ct = parseInt(total) - parseInt(bill.discount);

    let cn = ct + parseInt(bill.salesTax);
    if (serPer == "") {
      this.setState({
        bill: { ...bill, net_amount: cn },
      });
    } else {
      let ctotal_tax = (parseInt(total) / 100) * parseInt(serPer);
      let cn = parseInt(ct) + ctotal_tax;
      this.setState({
        bill: {
          ...bill,
          net_amount: Number(cn).toFixed(2),
          salesTax: Number(ctotal_tax).toFixed(2),
        },
      });
    }
  }
  handleChangeSalesTax(e) {
    const { name, value } = e.target;
    const { bill, total } = this.state;
    let ct = parseInt(total) - parseInt(bill.discount);

    let cn = parseInt(ct) + parseInt(value);

    this.setState({
      bill: { ...bill, net_amount: cn, salesTax: value },
      serPer: "",
    });
  }
  componentWillUnmount() {
    this.props.product.productList = this.state.billProduct;
    this.props.product.summary_details = {
discount:this.state.bill.discount,
salesTax:this.state.bill.salesTax,
net_amount:this.state.bill.net_amount,
total:this.state.total,
serPer:this.state.serPer,
    };

  }
 async save() {
    let list = [];
    const { bill, billProduct } = this.state;
    billProduct.forEach((element) => {
      list.push({ productId: element.productId, quantity: element.count });
    });
    console.log(".................", list);

    let data = {
      date: new Date().toISOString().split("T")[0],
      amount: bill.net_amount,
      salesTax: bill.salesTax,
      discount: bill.discount,
      products: list,
    };

   await this.props.saveBill(data)
  this.setState({ bill_id: this.props.product.bill.billId })


    this.reff.current.click();

  }
  changeSubTotal(e, index) {
    const { value } = e.target;

    const { billProduct } = this.state;
    let pro = billProduct;
    const newState = billProduct.map((obj, i) => {
      // 👇️ if id equals 2, update country property
      if (i === index) {
        return {
          ...obj,

          sub_total: parseInt(value),
        };
      }

      // 👇️ otherwise return object as is
      return obj;
    });
    this.setState({
      billProduct: newState,
    });
    const sum = newState.reduce((accumulator, object) => {
      console.log("llll", accumulator, object);
      let sub;
      if (!object.sub_total) {
        sub = 0;
      } else {
        sub = object.sub_total;
      }
      return parseInt(accumulator) + parseInt(sub);
    }, 0);

    this.setState({
      total: parseInt(sum),
    });
    setTimeout(() => {
      this.calcNetTotal();
    }, 0);
  }

  handleAfterPrint = () => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  };

  handleBeforePrint = () => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  };

  handleOnBeforeGetContent = () => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    this.setState({ text: "Loading new text...", isLoading: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState(
          { text: "New, Updated Text!", isLoading: false },
          resolve
        );
      }, 2000);
    });
  };

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  render() {
    const { category, product, productList } = this.props;
    const { inputs, billProduct, total, bill, serPer,bill_id } = this.state;
    console.log("productList", productList);

    return (
      <div className="home">
        <div className="main-section">
          <div className="panel1">
            <div className="filters">
              <select
                name="id"
                id="id"
                value={inputs.id}
                onChange={this.handleChangeSelected}
              >
                <option value="">All</option>
                {category.data.map((row) => (
                  <option value={row.id}>{row.categoryName}</option>
                ))}
              </select>

              <div className="search">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={this.handleChange}
                />
                <a onClick={this.handleSearch}>
                  <svg
                    class="svg-icon search-icon"
                    aria-labelledby="title desc"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19.9 19.7"
                  >
                    <g class="search-path" fill="none" stroke="white">
                      <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                      <circle cx="8" cy="8" r="7" />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
            <div className="products">
              {product.data.map((item, index) => {
                return (
                  <div
                    key={item.productId}
                    className="card"
                    onClick={() => this.addProductToBill(item)}
                  >
                    <img src={item.imageUrl} alt="" />
                    <div className="title">{item.name}</div>
                    <div className="price">{item.price} Rs</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel2">
            <div className="price-cards-container">
              {billProduct.map((item, index) => {
                return (
                  <div className="price-cards" key={item.productId}>
                    <div className="flex">
                      <div className="thumpnail">
                        <img src={item.imageUrl} alt="" />
                      </div>
                      <div className="pro-details">
                        <div className="title">{item.name}</div>
                        <div className="price">{item.price}</div>
                      </div>
                    </div>
                    <div className="inc-dec-set">
                      <a className="inc-dec">
                        <div
                          className="icon-add"
                          onClick={() => this.handleIncrease(index)}
                        >
                          <i class="fa-solid fa-circle-plus"></i>
                        </div>
                      </a>
                      <div className="count">{item.count}</div>
                      <a className="inc-dec">
                        <div
                          className="icon-add"
                          onClick={() => this.handleDecrease(index)}
                        >
                          <i class="fa-solid fa-circle-minus"></i>
                        </div>{" "}
                      </a>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="sub-total"
                      value={item.sub_total}
                      onChange={(e) => this.changeSubTotal(e, index)}
                    />
                    <div className="trash">
                      <a onClick={() => this.deleteProductToBill(item)}>
                        <i class="fa-solid fa-xmark"></i>{" "}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="title-bar">
              <div className="d-flex j-c-b align-center t-sec">
                <div>Total</div>
                <div> {total} Rs</div>
              </div>
              <div className="d-flex j-c-b align-center">
                <div className="d-flex j-c-b  align-center">Discount</div>
                <div className="d-flex j-c-b  align-center">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="input2"
                    value={bill.discount}
                    min={0}
                    onChange={this.handleChangeDiscount}
                  />
                </div>
              </div>
              <div className="d-flex j-c-b align-center">
                <div>Service charge</div>
                <div className="d-flex j-c-b align-center">
                  <input
                    type="number"
                    name="servicePercentage"
                    id="servicePercentage"
                    className="input1"
                    value={serPer}
                    min={0}
                    onChange={this.handleChangeServicePercentage}
                  />

                  <input
                    type="number"
                    name="salesTax"
                    id="salesTax"
                    className="input2"
                    value={bill.salesTax}
                    min={0}
                    onChange={this.handleChangeSalesTax}
                  />
                </div>
              </div>
              <div className="d-flex j-c-b align-center net-total">
                <div>Net Total</div>
                <div>{bill.net_amount} Rs</div>

              </div>
              <button className="save-bill" onClick={this.save}>
                SAVE
              </button>
            </div>
          </div>
        </div>

        {/* <FeaturedInfo /> */}
        {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
        {/* <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
        <div>
          <ReactToPrint
            content={this.reactToPrintContent}
            documentTitle="AwesomeFileName"
            onAfterPrint={this.handleAfterPrint}
            onBeforeGetContent={this.handleOnBeforeGetContent}
            onBeforePrint={this.handleBeforePrint}
            removeAfterPrint
            trigger={() => <a ref={this.reff}></a>}
          />

          {this.state.isLoading && (
            <p className="indicator">onBeforeGetContent: Loading...</p>
          )}
          <div className="d-none1">
            <PrintBill ref={this.setComponentRef} text={this.state}></PrintBill>
          </div>
        </div>
        {/* <div id="report">
          <img src={logo} alt="" className="logo-bill" />
          <div className="bill-no-sec">
            <div className="">Bill No {}</div>
            <div className="">{new Date().toISOString().split("T")[0]}</div>
          </div>
          <div className="produts-list">
            <table>
              {billProduct.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>
                    {item.price}x{item.count}
                  </td>
                  <td>{item.sub_total}</td>
                </tr>
              ))}
            </table>
          </div>

          <div className="summary">
            <table>
              <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{bill.discount}</td>
              </tr>
              <tr>
                <td>Service charge</td>
                <td>{bill.salesTax}</td>
              </tr>
              <tr>
                <td>Last amount</td>
                <td>{bill.net_amount} Rs</td>
              </tr>
            </table>
          </div>

          <div className="thank">Thank you, come again</div>
          <div className="address">
            Creamy Creations & Creamy Cafe Pvt Ltd. <br /> No.781, Hospital
            Road,
            Jaffna.
          </div>
          <div className="tp">Tp :- 0766587149 / 0212210866</div>
          <div className="social-media">
            <div className="d-flex">
              <i class="fa-brands fa-facebook"></i>
              <span>facebook.com</span>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
function mapState(state) {
  const { category, product } = state;
  const { productList } = product;

  return { category, product, productList };
}

const actionCreators = {
  getCategory: categoryActions.getAll,
  getProducts: productActions.getAll,
   saveBill: productActions.saveBill,


};

const connectedCategory = connect(mapState, actionCreators)(Home);
export { connectedCategory as Home };
