import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Product } from "./pages/product/Product";
import { Reports } from "./pages/reports/Reports";
import { Category } from "./pages/category/category";
import Sidebar from "./components/sidebar/Sidebar";
import { Component } from "react";
import { connect } from "react-redux";
import { alertActions } from "./actions/alert/alert.actions";
import { history } from "./_helpers/history";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,

    };
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { alert } = this.props;
    const { open } = this.state;
    if (alert.message) {
      this.state.open = true;
    }

    return (
      <Router>
        {/* <Topbar /> */}
        <Sidebar />
        <div className="container">
         {alert.message &&
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={this.handleClose}
          >
            <Alert
              onClose={this.handleClose}
              severity={alert.type}
              sx={{ width: "100%" }}
            >

              <div className={`alert ${alert.type}`}>{alert.message}</div>
            </Alert>
          </Snackbar>
        }
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
