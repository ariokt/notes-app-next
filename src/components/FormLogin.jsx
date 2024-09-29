import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import PropTypes from 'prop-types';
import useInput from "@/hooks/useInput";
import useToggle from "@/hooks/useToggle";
import { memo, useCallback } from "react";

function FormLogin({ login }) {
  const [email, handleChangeEmail] = useInput('');
  const [password, handleChangePassword] = useInput('');

  const [showPassword, handleTogglePassword] = useToggle(false);

  const handleClickMasuk = useCallback((e) => {
    e.preventDefault();
    login({email, password});
  }, [email, password, login]);

  return (
    <form className='flex flex-col gap-3 mb-8'>
      <input type="text" autoComplete="off" placeholder='Email' className='rounded-lg p-2 border border-gray-400 bg-white text-sm' value={email} onChange={handleChangeEmail} required />
      <div className='w-full relative flex'>
        <input type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder='Password' className='rounded-lg p-2 w-full border border-gray-400 bg-white text-sm' value={password} onChange={handleChangePassword} required />
        <div className='absolute h-full right-2 flex flex-col justify-center'>
          {showPassword ? <IoIosEye style={{fontSize:"20px"}} onClick={handleTogglePassword} /> : <IoIosEyeOff style={{fontSize:"20px"}} onClick={handleTogglePassword} />}
        </div>
      </div>
      <button className='rounded-lg p-2 bg-black text-white' onClick={handleClickMasuk} >Masuk</button>
    </form>
  )
}

FormLogin.propTypes = {
  login: PropTypes.func.isRequired,
}

export default memo(FormLogin);