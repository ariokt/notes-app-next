import { MdOutlineGTranslate } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import useInput from "@/hooks/useInput";
import Link from "next/link";
import useToggle from "@/hooks/useToggle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { registerUser } from "../api/hello";
import FormRegister from "@/components/FormRegister";

function Register() {
  const router = useRouter();
  const Token = Cookies.get('userToken');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (Token) {
      router.push('/');
    } else {
      setLoaded(true);
    }
  }, [router, Token]);

  const handleRegister = async (obj) => {
    const {name, email, password, confirmPassword} = obj;
    if ( password === confirmPassword) {
      const dataRegister = {name, email, password};
      const response = await registerUser(dataRegister);
      if (response.status === 'success') {
        window.alert('Registrasi berhasil!');
        router.push('/login');
      } else {
        window.alert(response.message);
      }
    } else {
      window.alert('Periksa kembali password!');
    }
  }

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div className='h-screen' id='register'>
      <div className='mx-auto w-fit h-full flex flex-col justify-center'>
        <div className="md:rounded-lg p-8 md:shadow-lg md:drop-shadow bg-white md:w-[480px]">
          <div className='flex flex-col md:flex-row md:gap-2 mb-4'>
            <h2 className='text-2xl'>Daftar di Dicoding Notes.</h2>
            <div className='flex gap-2 content-center items-center'>
              <MdOutlineGTranslate style={{fontSize:"32px"}} />
              <IoMdMoon style={{fontSize:"32px"}} />
            </div>
          </div>
          <FormRegister register={handleRegister} />
          <p>Sudah Daftar? <Link href={'/login'} className='text-sky-400' >Masuk</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register