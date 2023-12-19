import useInput from "@/hooks/useInput";
import useToggle from "@/hooks/useToggle";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import PropTypes from 'prop-types';

function FormRegister({ register }) {
  const [name, handleChangeName] = useInput('');
  const [email, handleChangeEmail] = useInput('');
  const [password, handleChangePassword] = useInput('');
  const [confirmPassword, handleChangeConfirmPassword] = useInput('');

  const [showPassword, handleTogglePassword] = useToggle(false);
  const [showConfirmPassword, handleToggleConfirmPassword] = useToggle(false);

  const handleClickRegister = (e) => {
    e.preventDefault();
    const obj = {name, email, password, confirmPassword}
    register(obj);
  }

  return (
    <form autoComplete="off" className='flex flex-col gap-3 mb-8'>
      <input type="text" placeholder='Name' autoComplete="off" className='rounded-lg p-2 border border-gray-400 bg-white text-sm' value={name} onChange={handleChangeName} required />
      <input type="text" placeholder='Email' autoComplete="off" className='rounded-lg p-2 border border-gray-400 bg-white text-sm' value={email} onChange={handleChangeEmail} required />
      <div className="w-full relative flex">
        <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder='Password' className='rounded-lg p-2 w-full border border-gray-400 bg-white text-sm' value={password} onChange={handleChangePassword} required />
        <div className='absolute right-2 cursor-pointer h-full flex flex-col justify-center'>
          {showPassword ? <IoIosEye style={{fontSize:"20px"}} onClick={handleTogglePassword} /> : <IoIosEyeOff style={{fontSize:"20px"}} onClick={handleTogglePassword} />}
        </div>
      </div>
      <div className="w-full relative flex">
        <input type={showConfirmPassword ? 'text' : 'password'} autoComplete="off" placeholder='Konfirmasi Password' className='rounded-lg p-2 w-full border border-gray-400 bg-white text-sm' value={confirmPassword} onChange={handleChangeConfirmPassword} required />
        <div className='absolute right-2 cursor-pointer h-full flex flex-col justify-center'>
          {showConfirmPassword ? <IoIosEye style={{fontSize:"20px"}} onClick={handleToggleConfirmPassword} /> : <IoIosEyeOff style={{fontSize:"20px"}} onClick={handleToggleConfirmPassword} />}
        </div>
      </div>
      <button className='rounded-lg p-2 bg-black text-white' onClick={handleClickRegister}>Register</button>
    </form>
  );
}

FormRegister.propTypes = {
  register: PropTypes.func.isRequired,
}

export default FormRegister;