import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addUserAction, checkUserRegisterAction, updateUserAction } from '../redux/Actions/QuanLyNguoiDungActions';

class FormDangKy extends Component {
    state = {
        //disabled button if has any error in form
        disabled: false
    }

    renderCustomerType = () => {
        return this.props.customerType.map((userType, index) => {
            return <option value={userType.value} key={index}>{userType.label}</option>
        })
    }

    handleChangeValue = event => {
        let { name, value, type } = event.target;
        this.props.dispatch(checkUserRegisterAction(name, value, type));
    }

    hadleSubmit = event => {
        event.preventDefault();
        this.props.dispatch(addUserAction(this.props.formValues));
    }

    handleUpdate = event => {
        event.preventDefault();
        this.props.dispatch(updateUserAction(this.props.formValues));
    }

    render() {
        return (
            <div>
                <div>
                    <h5 className='heading'>Form đăng ký</h5>
                    <div className='box'>
                        <form className='row'>
                            <div className="form-group col-6">
                                <label>Tài khoản</label>
                                {this.props.userEdit.userId === -1
                                    ?
                                    <input onChange={this.handleChangeValue}
                                        name='userId' required
                                        value={this.props.formValues.userId} type="text"
                                        className={!this.props.formErrors.userId ? 'form-control' : 'form-control is-invalid'} />
                                    :
                                    <input onChange={this.handleChangeValue}
                                        name='userId' disabled
                                        value={this.props.formValues.userId} type="text"
                                        className='form-control' />}
                                <div className="invalid-feedback">
                                    {!this.props.formErrors.userId ? '' : this.props.formErrors.userId}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>Họ tên</label>
                                {
                                    this.props.userEdit.userId === -1
                                        ?
                                        <input onChange={this.handleChangeValue}
                                            name='name' required
                                            value={this.props.formValues.name} type="text"
                                            className={!this.props.formErrors.name ? 'form-control' : 'form-control is-invalid'} />
                                        :
                                        <input onChange={this.handleChangeValue}
                                            name='name' required
                                            value={this.props.formValues.name} type="text"
                                            className={!this.props.formErrors.name ? 'form-control' : 'form-control is-invalid'} />
                                }
                                <div className="invalid-feedback">
                                    {!this.props.formErrors.name ? '' : this.props.formErrors.name}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>Mật khẩu</label>
                                {
                                    this.props.userEdit.userId === -1
                                        ?
                                        <input onChange={this.handleChangeValue}
                                            name='password' required
                                            type="password" value={this.props.formValues.password}
                                            className={!this.props.formErrors.password ? 'form-control' : 'form-control is-invalid'} />
                                        :
                                        <input onChange={this.handleChangeValue}
                                            name='password' required
                                            type="password" value={this.props.formValues.password}
                                            className={!this.props.formErrors.password ? 'form-control' : 'form-control is-invalid'} />
                                }
                                <div className="invalid-feedback">
                                    {!this.props.formErrors.password ? '' : this.props.formErrors.password}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>Số điện thoại</label>
                                {
                                    this.props.userEdit.userId === -1
                                        ?
                                        <input onChange={this.handleChangeValue}
                                            name='phoneNumber' required
                                            type="text" value={this.props.formValues.phoneNumber}
                                            className={!this.props.formErrors.phoneNumber ? 'form-control' : 'form-control is-invalid'} />
                                        :
                                        <input onChange={this.handleChangeValue}
                                            name='phoneNumber' required
                                            type="text" value={this.props.formValues.phoneNumber}
                                            className={!this.props.formErrors.phoneNumber ? 'form-control' : 'form-control is-invalid'} />
                                }
                                <div className="invalid-feedback">
                                    {!this.props.formErrors.phoneNumber ? '' : this.props.formErrors.phoneNumber}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>Email</label>
                                {
                                    this.props.userEdit.userId === -1
                                        ?
                                        <input onChange={this.handleChangeValue}
                                            name='email' required
                                            type="email" value={this.props.formValues.email}
                                            className={!this.props.formErrors.email ? 'form-control' : 'form-control is-invalid'} />
                                        :
                                        <input onChange={this.handleChangeValue}
                                            name='email' required
                                            type="email" value={this.props.formValues.email}
                                            className={!this.props.formErrors.email ? 'form-control' : 'form-control is-invalid'} />
                                }
                                <div className="invalid-feedback">
                                    {!this.props.formErrors.email ? '' : this.props.formErrors.email}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>Mã loại người dùng</label>
                                {
                                    this.props.userEdit.userId === -1
                                        ?
                                        <select onChange={this.handleChangeValue}
                                            name='customerType'
                                            className="form-control form-control-sm"
                                            value={this.props.formValues.customerType} >
                                            {this.renderCustomerType()}
                                        </select>
                                        :
                                        <select onChange={this.handleChangeValue}
                                            name='customerType'
                                            className="form-control form-control-sm"
                                            value={this.props.userEdit.customerType} >
                                            {this.renderCustomerType()}
                                        </select>
                                }
                            </div>
                            <div className='col-12 text-left'>
                                {this.props.userEdit.userId !== -1 || this.state.disabled ?
                                    <button type='submit' className='btn btn-sm btn-success mr-2' disabled>Đăng ký</button>
                                    :
                                    <button type='submit'
                                        onClick={this.hadleSubmit}
                                        className='btn btn-sm btn-success mr-2'>Đăng ký</button>}
                                {this.props.userEdit.userId === -1 || this.state.disabled ?
                                    <button className='btn btn-sm btn-primary' disabled>Cập nhật</button>
                                    :
                                    <button onClick={this.handleUpdate}
                                        className='btn btn-sm btn-primary'>Cập nhật</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //check error
        if (prevProps.formErrors !== this.props.formErrors) {
            //check error and disabled button
            const errorObj = { ...this.props.formErrors };
            for (const prop in errorObj) {
                if (errorObj[prop] !== '')
                    return this.setState({
                        disabled: true
                    });
                else
                    this.setState({
                        disabled: false
                    })
            }
        }
    }
}


const mapStateToProps = state => {
    return {
        formValues: state.QuanLyNguoiDungReducer.formValues,
        formErrors: state.QuanLyNguoiDungReducer.formErrors,
        userEdit: state.QuanLyNguoiDungReducer.userEdit,
        customerType: state.QuanLyNguoiDungReducer.customerType
    }
}


export default connect(mapStateToProps)(FormDangKy)