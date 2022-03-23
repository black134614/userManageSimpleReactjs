import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDanhSachNguoiDung from './TableDanhSachNguoiDung'
import '../Components/BaiTap.css'

export default class BaiTapQuanLyNguoiDung extends Component {
    render() {
        return (
            <div>
                <div className='container'>
                    <FormDangKy />
                    <TableDanhSachNguoiDung />
                </div>
            </div>
        )
    }
}
