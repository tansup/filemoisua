import React, { useState, Component } from "react";

import { getAccounts } from "../../redux/actions/accountAction";
import "./UserManage.css";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { Select } from "antd";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAccounts();
  }
  calculateDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  getUniqueStatuses(accounts) {
    const statuses = accounts.map((account) => account.trangthai);
    return [...new Set(statuses)];
  }
  render() {
    const { accounts } = this.props;
    const options = [
      { value: "1", label: this.calculateDate(3) },
      { value: "2", label: this.calculateDate(7) },
      { value: "3", label: this.calculateDate(10) },
    ];

    return (
      <div className="usermanage">
        <h1 className="mainhead2">Tài khoản người dùng</h1>
        <table className="yourorderstable1">
          <thead>
            <tr>
              <th scope="col">Mã tài khoản</th>

              <th scope="col">Tên tài khoản</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Tác vụ</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr>
                <td data-label="manguoidung">{account.tendangnhap}</td>
                <td data-label="tennguoidung">{account.gmail}</td>
                <td data-label="trangthai">{account.trangthai}</td>
                <td data-label="tacvu">
                  <Select
                    showSearch
                    placeholder="Select a person"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={options}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accountReducer.accounts,
});

const mapDispatchToProps = {
  getAccounts,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
