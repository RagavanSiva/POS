import { Link } from "react-router-dom";
import "./product.css";
import { productData } from "../../dummyData";
import food from "../../images/food.jpg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import * as React from "react";

import { productActions } from "../../actions/product/product";
import { connect } from "react-redux";
import { categoryActions } from "../../actions/category/category";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();

    // reset login status
    // this.props.logout();

    this.state = {
      inputs: {
        name: "",
        price: "",
        date: new Date().toISOString().split("T")[0],
        category: {
          id: "",
        },
      },
      catgoryInputs: {
        name: "",
        id: "",
      },
      image: "",
      id: "",
      value: "2ss",
      value2: "10",
      submitted: false,
      preview: "",
      priceSlot: {
        price: "",
        date: "",
      },
      priceList: [],
      layoutName: "default",
      input: "",
      edit:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePriceSlot = this.handleChangePriceSlot.bind(this);
    this.addPriceSlot = this.addPriceSlot.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addNew = this.addNew.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    this.props.getCategory();
    this.props.getProduct();
  }

  handleChangeCategory(e) {
    const { category, product } = this.props;
    product.data=[];
    const { name, value } = e.target;
    const { catgoryInputs } = this.state;
    this.setState({
      catgoryInputs: {
        ...catgoryInputs,
        [name]: value,
      },
    });

    let data = {
      id: value,
      name: catgoryInputs.name,
    };

    this.props.getProduct(data);
  }
  handleSearch(e) {
    const { catgoryInputs } = this.state;

    this.props.getProduct(catgoryInputs);
  }
  // const uploadProfilePic = (e) => {
  //   console.log(e);
  // };

  // const handleUpload = () => {
  //   console.log(fileUpload.current.click(), "fileUpload");
  // };
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
  handleChangePriceSlot(e) {
    const { name, value } = e.target;
    const { priceSlot } = this.state;

    this.setState({
      priceSlot: {
        ...priceSlot,
        [name]: value,
      },
    });
  }
  handleChangeSelect(e) {
    const { value } = e.target;
    const { inputs } = this.state;

    this.setState({
      inputs: {
        ...inputs,
        category: {
          id: value,
        },
      },
    });
  }
  handleClick = (e) => {
    e.preventDefault();
    this.inputElement.click();
  };
  // handleChange(event, newValue) {
  //   // setValue(newValue);
  // }

  handleChange2(event, newValue) {
    this.setState({
      value2: newValue,
    });
  }
  addPriceSlot() {
    const { priceList, priceSlot } = this.state;
    let pro = priceList;

    if (priceSlot.price != "" && priceSlot.date != "") {
      pro.push(priceSlot);
      this.setState({
        priceList: pro,
      });
    } else {
    }
  }
  onFileSelected(event) {
    console.log(event);
    if (event.target.files.length > 0) {

      var mimeType = event.target.files[0].type;
      let img = event.target.files[0];
      if (mimeType.match(/image\/*/) == null) {
        console.log("image only support");
        return;
      }

      this.setState({
        image: img,
      });

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        const { result } = _event.target;
        this.setState({
          preview: result,
        });
      };

    }
  }
  editProduct(data) {
    const { inputs } = this.state;

    this.setState({
      inputs: {
        ...inputs,
        name: data.name,
        price: data.price,
        date: data.date,

        category: {
          id: data.category.id,
        },
      },
      id: data.productId,
      preview: data.imageUrl,
      image: null,
      priceSlot: {
        price: data.price,
        date: new Date().toISOString().split("T")[0],
      },
      edit:true
    });

    this.props.getAllPrice(data.productId);
  }
 async onSubmit(e) {
    e.preventDefault();
    const { product } = this.props;

    const { inputs, image, id, priceSlot } = this.state;
    this.setState({ submitted: true });
    inputs.price = priceSlot.price;
    var formData = new FormData();
    if (image) {
      formData.append("image", image);
    } else {
      // formData.append("image", null);
    }
    formData.append("product", JSON.stringify(inputs));

    if (!id) {
      if(inputs.name && inputs.price && inputs.date && inputs.category.id && image){
      await  this.props.saveProduct(formData);
      }
    } else {
      if(inputs.name && inputs.price && inputs.date && inputs.category.id){
        await this.props.updateProduct(id, formData);
      }
    }
    setTimeout(() => {
      this.handleSearch();
    }, 2000);

  }
  addNew() {
    const { inputs } = this.state;
    const { product } = this.props;
    product.price = [];

    this.setState({
      inputs: {
        ...inputs,
        name: "",
        price: "",
        date: new Date().toISOString().split("T")[0],

        category: {
          id: "",
        },
      },
      id: "",
      preview: "",
      image: "",
      priceSlot: {
        price: "",
        date: new Date().toISOString().split("T")[0],
      },
      edit:false
    });
  }

  onChange = (input) => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  onChangeInput = (event) => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };
  render() {
    const {
      value,
      value2,
      inputs,
      catgoryInputs,
      preview,
      priceSlot,
      priceList,image,submitted,edit
    } = this.state;



    const { category, product } = this.props;
    console.log(this.state);
    return (
      <div className="home">
        <div className="main-section">
          <div className="panel1">
            <button className="new" onClick={this.addNew}>
              Add New
            </button>
            <div className="tab-cat">
              {/* <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={this.handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="lab API tabs example"
                    >
                      {category.data.map((item, index) => {
                        return (
                          <Tab
                            label={item.categoryName}
                            value={item.id + "ss"}
                          />
                        );
                      })}
                    </TabList>
                  </Box>
                  <Box>
                    {category.data.map((item, index) => {
                      return (
                        <TabPanel value={item.id + "ss"}>
                          <div className="products">
                            {product.data.map((item, index) => {
                              return (
                                <div className="card">
                                  <img src={food} alt="" />
                                  <div className="title">{item.name}</div>
                                  <div className="price">{item.price}</div>
                                </div>
                              );
                            })}
                          </div>
                        </TabPanel>
                      );
                    })}
                  </Box>
                </TabContext>
              </Box> */}

              <div className="ll">
                <div className="filters">
                  <select
                    name="id"
                    id="id"
                    value={catgoryInputs.id}
                    onChange={this.handleChangeCategory}
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
                      value={catgoryInputs.name}
                      // onChange={this.onChangeInput}
                      onChange={this.handleChangeCategory}
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
                          <path
                            stroke-linecap="square"
                            d="M18.5 18.3l-5.4-5.4"
                          />
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
                        onClick={() => this.editProduct(item)}
                      >
                        <img src={item.imageUrl} alt="" />
                        <div className="title">{item.name}</div>
                        <div className="price">{item.price}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="panel2">
            <div className="upload-container">
              <div className="tab-price">
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value2}>
                    <Box sx={{ borderColor: "divider" }}>
                      <TabList
                        onChange={this.handleChange2}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Details" value="10" />
                        <Tab label="Price" value="20" />
                      </TabList>
                    </Box>
                    <form action="" onSubmit={this.onSubmit}>
                      <TabPanel value="10">
                        <div className="img-section">
                          <div className="overlay"></div>
                          <div className="button-sec">
                            <button
                              className="upload"
                              onClick={this.handleClick}
                            >
                              upload
                            </button>
                            <button className="remove">remove</button>
                            <input
                              type="file"
                              ref={(input) => (this.inputElement = input)}
                              hidden={true}
                              onChange={this.onFileSelected}
                            />
                          </div>
                          <div className="img-container">
                          {preview &&

                          <img src={preview} alt="" />}</div>


                        </div>
                        {submitted && !preview && !edit &&(
                            <div className="help-block">
                              Image is required
                            </div>
                          )}
                        <div className="name">
                          <label htmlFor="name">Product name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputs.name}
                            onChange={this.handleChange}
                          />
                           {submitted && !inputs.name && (
                            <div className="help-block">
                              Product name is required
                            </div>
                          )}
                        </div>
                        <div className="name">
                          <label htmlFor="name">Category</label>
                          <select
                            name="category"
                            id="category"
                            value={inputs.category.id}
                            onChange={this.handleChangeSelect}
                          >
                            <option selected value="">
                              Select category
                            </option>
                            {category.data.map((row) => (
                              <option value={row.id}>{row.categoryName}</option>
                            ))}
                          </select>
                          {submitted && !inputs.category.id && (
                            <div className="help-block">
                              Category is required
                            </div>
                          )}
                        </div>
                        <button className="save" type="submit">
                          SAVE
                        </button>
                      </TabPanel>
                      <TabPanel value="20">
                        <div className="price-add-card">
                          <div className="price">
                            <span htmlFor="price">Price</span>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={priceSlot.price}
                              onChange={this.handleChangePriceSlot}
                            />
                             {submitted && !priceSlot.price && (
                            <div className="help-block">
                              Price is required
                            </div>
                          )}
                          </div>
                          <div className="date">
                            {/* <label htmlFor="date">Date</label> */}
                            {/* <input
                            type="date"
                            name="date"
                            id="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={priceSlot.date}
                            onChange={this.handleChangePriceSlot}
                          /> */}
                          </div>
                          {/* <div className="icon-add" onClick={this.addPriceSlot}>
                          <i class="fa-solid fa-circle-plus"></i>
                        </div> */}
                        </div>

                        <div className="price-list">
                          <table>
                            <thead>
                              <tr className="price-slot">
                                <th>Price</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.price.map((item, i) => (
                                <tr className="price-slot">
                                  <td>{item.price}</td>
                                  <td>{item.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabPanel>
                    </form>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>

        {/* <FeaturedInfo /> */}
        {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
        {/* <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
          </div> */}
        {/* <Keyboard
                      keyboardRef={(r) => (this.keyboard = r)}
                      layoutName={this.state.layoutName}
                      onChange={this.onChange}
                      onKeyPress={this.onKeyPress}
                    /> */}
      </div>
    );
  }
}
function mapState(state) {
  const { category, product } = state;

  return { category, product };
}

const actionCreators = {
  saveProduct: productActions.saveProduct,
  updateProduct: productActions.updateProduct,
  getProduct: productActions.getAll,
  getAllPrice: productActions.getAllPrice,
  getCategory: categoryActions.getAll,
};

const connectedProduct = connect(mapState, actionCreators)(Product);
export { connectedProduct as Product };
