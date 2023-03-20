import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import {patchData} from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import axios from 'axios';
import valid from '../utils/valid'



const ForgotPassword = ({ resetToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const initialState = { email: '' }
  const [userData, setUserData] = useState(initialState)
  //const [userData, setUserData] = useState(initialState)
  const { email } = userData

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const router = useRouter()
 
  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleSubmit1 = async e => {
    e.preventDefault()
    //const errMsg = valid( email)
    //if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await patchData('user/forgotPass', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
  }
 
  const handleSubmit = () => {
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    patchData('user/forgotPass', {password}, auth.token)
    .then(res => {
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    })
}
// const forgotPass1  = (email) => {
//   confirmAlert({
//     title: 'Confirm update',
//     message: 'Are you sure you want to cancel this order?',
//     buttons: [
//       {
//         label: 'uypdate',
//         onClick: async () => {
//           // Thực hiện hành động xóa
//           try {
//             const updateResponse = await fetch(`/api/user/${email}`, {
//               method: 'PUT',
//               headers: { 'Content-Type': 'application/json' },
//             });

//             if (updateResponse.ok) {
//               // Nếu xóa thành công, cập nhật lại danh sách orders
//               location.reload();
//             } else {
//               throw new Error('Xóa đơn hàng thất bại');
//             }
//           } catch (error) {
//             console.error(error);
//             alert('Xóa đơn hàng thất bại');
//           }
//         },
//       },
//       {
//         label: 'Cancel',
//         onClick: () => {},
//       },
//     ],
//   });
// };


  return (
    <div>
      <form onSubmit={handleSubmit1}>
      <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email"  value={email} onChange={handleChangeInput} />
        <button type="submit">Send mail</button>
      </form>
    </div>
  );
}



export default ForgotPassword;
