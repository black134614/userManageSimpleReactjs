import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUserAction, editUserAction } from '../redux/Actions/QuanLyNguoiDungActions';

class TableDanhSachNguoiDung extends Component {


    renderUser = () => {
        return this.props.userList.map((item, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.userId}</td>
                <td>{item.name}</td>
                <td>{item.password}</td>
                <td style={{width: 10}}>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.customerType}</td>
                <td>
                    {this.props.userEdit.userId === item.userId ?
                        <button className='btn btn-sm btn-primary mr-1' disabled>Chỉnh sửa</button>
                        :
                        <button onClick={() => {
                            this.props.dispatch(editUserAction(item))
                        }}
                            className='btn btn-sm btn-primary mr-1'>Chỉnh sửa</button>}
                    <button onClick={() => {
                        this.props.dispatch(deleteUserAction(item.userId));
                    }}
                        className='btn btn-sm btn-danger'>Xóa</button>
                </td>
            </tr>
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h6 className='heading'>Danh sách người dùng</h6>
                    <div className='box'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tài khoản</th>
                                    <th>Họ tên</th>
                                    <th>Mật khẩu</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Loại người dùng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.renderUser()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userList: state.QuanLyNguoiDungReducer.userList,
    userEdit: state.QuanLyNguoiDungReducer.userEdit
})

export default connect(mapStateToProps)(TableDanhSachNguoiDung)