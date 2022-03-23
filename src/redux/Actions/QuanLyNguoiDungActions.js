import { add_user, check_userRegister, delete_user, edit_user, update_user } from "../Types/QuanLyNguoiDungTypes";




export const checkUserRegisterAction = (name, value, inputType) => ({
    type: check_userRegister,
    name,
    value,
    inputType
})

export const addUserAction = user => ({
    type: add_user,
    user
})

export const deleteUserAction = userId => ({
    type: delete_user,
    userId
})

export const editUserAction = user => ({
    type: edit_user,
    user
})

export const updateUserAction = user => ({
    type: update_user,
    user
})

