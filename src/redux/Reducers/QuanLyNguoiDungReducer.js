import { add_user, check_userRegister, delete_user, edit_user, update_user } from "../Types/QuanLyNguoiDungTypes"

const initialState = {
    formValues: {
        userId: '',
        name: '',
        password: '',
        email: '',
        phoneNumber: '',
        customerType: 'khachHang'
    },
    formErrors: {
        userId: '',
        name: '',
        password: '',
        email: '',
        phoneNumber: ''
    },
    userList: [
        {
            userId: 'minhluan', name: 'Võ Minh Luân', password: '123456', email: 'luanvo1ad@gmail.com', phoneNumber: '0352578811', customerType: 'khachHang'
        },
        {
            userId: 'haimy', name: 'Nguyễn Hải My', password: '123456', email: 'haimy1ad@gmail.com', phoneNumber: '093515515', customerType: 'khachVip'
        }
    ],
    userEdit: {
        userId: -1
    },
    customerType: [
        {
            value: 'khachHang', label: 'Khách Hàng'
        },
        {
            value: 'khachVip', label: 'Khách Vip'
        },
        {
            value: 'khachSieuVip', label: 'Khách siêu vip'
        }
    ]
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case check_userRegister: {
            const { name, value, inputType } = action;
            let newUserValue = { ...state.formValues, [name]: value };
            let newError = { ...state.formErrors };

            if (value.trim() === '') {
                newError[name] = quickVietNamese(name) + ' cần được nhập!';
            }
            else {
                newError[name] = '';
            }

            if (inputType === 'email') {
                const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (!regexEmail.test(value)) {
                    newError[name] = quickVietNamese(name) + ' cần được nhập đúng định dạng!';
                } else {
                    newError[name] = '';
                }
            }
            if (inputType === 'password') {
                if (value.length < 6) {
                    newError[name] = quickVietNamese(name) + ' phải có từ 6 kí tự trở lên.'
                } else {
                    newError[name] = '';
                }
            }
            state.formValues = newUserValue;
            state.formErrors = newError;
            return { ...state };
        }
        case add_user: {
            const userInfo = { ...action.user };
            let newError = { ...state.formErrors };

            //check Validation in form
            for (const prop in userInfo) {
                if (!userInfo[prop].trim() > 0) {
                    newError[prop] = quickVietNamese(prop) + ' cần được nhập!';
                    state.formErrors = newError;
                    return { ...state };
                }
            }

            //pass validation in form => check userId => create user => message to display
            let userListUpdate = [...state.userList];
            let index = userListUpdate.findIndex(user => user.userId === userInfo.userId)
            if (index !== -1) {
                alert('Tài khoản bị trùng, vui lòng chọn tài khoản khác!');
                return { ...state };
            }

            //add user
            userListUpdate.push(userInfo);
            state.userList = userListUpdate;
            state.formValues = {
                userId: '',
                name: '',
                password: '',
                email: '',
                phoneNumber: '',
                customerType: 'khachHang'
            };
            alert('Thêm tài khoản thành công!');
            return { ...state };
        }

        case delete_user: {
            //if delete user editing
            if (state.userEdit.userId === action.userId) {
                state.userEdit = {
                    userId: -1, name: '', password: '', email: '', phoneNumber: '', customerType: 'khachhang'
                }
            }
            return { ...state, userList: state.userList.filter(user => user.userId !== action.userId) };
        }

        case edit_user: {
            return { ...state, userEdit: action.user, formValues: action.user }
        }

        case update_user: {

            //find index of user editing => take it to new value => reset state
            let userListUpdate = [...state.userList];
            let index = userListUpdate.findIndex(user => user.userId === action.user.userId);
            //if user edit in f12 :/
            if (index !== -1) {
                userListUpdate[index] = action.user;
            }
            //update & reset
            state.userList = userListUpdate;
            state.userEdit = {
                userId: -1
            };
            state.formValues = {
                userId: '',
                name: '',
                password: '',
                email: '',
                phoneNumber: '',
                customerType: 'khachHang'
            };
            return { ...state };
        }

        default:
            return { ...state }
    }
}
//support function
const quickVietNamese = (key) => {
    switch (key) {
        case 'userId': {
            return 'Tài khoản';
        }
        case 'name': {
            return 'Tên người dùng';
        }
        case 'password': {
            return 'Mật khẩu';
        }
        case 'phoneNumber': {
            return 'Số điện thoại';
        }
        case 'email': {
            return 'Email';
        }
        default:
            break;
    }
}

