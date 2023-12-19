import { MdOutlineGTranslate } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import useInput from "@/hooks/useInput";
import Link from "next/link";
import useToggle from "@/hooks/useToggle";
import Image from "next/image";
import ImageEraspace from '../../../public/illustration/astronot.png';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { loginUser } from "../api/hello";
import FormLogin from "@/components/FormLogin";

function Login() {
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

  const handleLogin = async (obj) => {
    const {email, password} = obj;
    const dataUser = {email, password};
    const response = await loginUser(dataUser);
    if (response.status === 'fail') {
      window.alert(response.message);
    }
    if (response.status === 'success') {
      Cookies.set('userToken', response.data.accessToken);
      router.push('/');
    }
  }

  if (!loaded) {
    return <div></div>;
  }

  return (
    <div className='h-screen' id='login'>
      <div className='mx-auto w-fit h-full flex flex-col justify-center relative'>
        <div className="md:rounded-lg p-8 md:shadow-lg md:drop-shadow bg-white md:w-[480px]">
          <div className='flex flex-col md:flex-row md:gap-2 mb-4'>
            <h2 className='text-2xl'>Selamat datang di Dicoding Notes.</h2>
            <div className='flex gap-2 content-center items-center'>
              <MdOutlineGTranslate style={{fontSize:"32px"}} />
              <IoMdMoon style={{fontSize:"32px"}} />
            </div>
          </div>
          <FormLogin login={handleLogin}  />
          <p>Belum punya akun? <Link href={'/register'} className='text-sky-400' >Daftar</Link></p>
        </div>
        <Image alt="Erajaya Eraspace" src={ImageEraspace} className="absolute right-0 translate-x-[11.3rem]" width={200} />
      </div>
    </div>
  )
}

export default Login