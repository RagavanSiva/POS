import "./category.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { categoryActions } from "../../actions/category/category";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function createData(id, name) {
  return { id, name };
}
const rows = [
  createData(1, "Frozen yoghurt"),
  createData(2, "Ice cream sandwich"),
  createData(3, "Eclair"),
  createData(4, "Cupcake"),
  createData(5, "Gingerbread"),
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

class Category extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      inputs: {
        categoryName: "",
      },
      id:"",
      submitted: false,
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.addNew = this.addNew.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getCategory();
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
  handleUpdate(data) {


    const { inputs } = this.state;
    this.setState({
      inputs: {
        ...inputs,
        categoryName: data.categoryName,
      },
      id:data.id
    });
    this.handleOpen()

  }

 async handleSubmit(e) {

    e.preventDefault();

    this.setState({ submitted: true });
    const { inputs,id } = this.state;
    if (id== "" || id==null ) {
      console.log(".............", inputs);
    await  this.props.saveCategory(inputs)
    }else{
     await this.props.updateCategory(id,inputs)

    }
     this.handleClose()

    //  this.props.getCategory();
  }


  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  handleClose(event,reason) {
    if (reason !== 'backdropClick') {
      this.setState({ open: false });
    }
  }
  handleOpen() {
    this.setState({ open: true });
  }
  addNew(){
    const { inputs } = this.state;

    this.setState({
      inputs: {
        ...inputs,
        categoryName: "",
      },
      id:""
    });
    this.handleOpen()
  }
  render() {
    const {  inputs,submitted, open } = this.state;
    const { category } = this.props;
    console.log("category.......",category)
    return (
      <div className="category-container">
        <div className="title-cat">Category</div>
        <button className="new-cat" onClick={this.addNew}>
          Add New
        </button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.categoryName}</TableCell>
                  <TableCell align="right">
                    <a onClick={()=>this.handleUpdate(row)} className="edit-icon">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal

          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="cat_modal"


        >
          <Box sx={style}>
            {/* <form >
            <div className="name">
              <label htmlFor="name">Product name</label>
              <input type="text" id="name" />
            </div>

            <button className="save">
                      SAVE
                    </button>
          </form> */}

            <form onSubmit={this.handleSubmit}>
              <a onClick={this.handleClose} className="close-button"><i class="fa-solid fa-xmark"></i></a>
              <div className="name">
                <label htmlFor="name">Category name</label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={inputs.categoryName}
                  onChange={this.handleChange}
                />
                {submitted && !inputs.categoryName && (
                  <div className="help-block">Category name is required</div>
                )}
              </div>

              <button className="save" type="submit" disabled={submitted}>
                Submit
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}
function mapState(state) {
  const { category } = state;
  return { category };
}

const actionCreators = {
  saveCategory: categoryActions.saveCategory,
  updateCategory: categoryActions.updateCategory,
  getCategory: categoryActions.getAll,
};

const connectedCategory = connect(mapState, actionCreators)(Category);
export { connectedCategory as Category };
