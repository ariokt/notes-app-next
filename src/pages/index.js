import { Inter } from 'next/font/google';
import { archiveUserNote, deleteUserNote, getActiveNotes } from './api/hello';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdOutlineArchive, MdLogout, MdOutlineGTranslate } from "react-icons/md";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NotesList from '@/components/NotesList';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';

const inter = Inter({ subsets: ['latin'] })

function Home({ activeNotes, Token }) {
  const router = useRouter();
  const [displayedNotes, setDisplayedNotes] = useState(activeNotes);

  const [alertType, setAlertType] = useState('');
  
  const handleLogout = () => {
    Cookies.remove('userToken');
    router.push('/login');
  }

  const handleDelete = async (id) => {
    const response = await deleteUserNote(Token, id);
    if (response.status === 'success') {
      setDisplayedNotes((prevDisplayed) => prevDisplayed.filter((note) => note.id !== id));
      setAlertType('success-delete');
    } else {
      setAlertType('error-delete');
    }
  }

  const handleArchive = async (id) => {
    const response = await archiveUserNote(Token, id);
    if (response.status === 'success') {
      setDisplayedNotes((prevDisplayed) => prevDisplayed.filter((note) => note.id !== id));
      setAlertType('success-archive');
    } else {
      setAlertType('error-archive');
    }
  }

  return (
    <>
      <header className='flex items-center p-4 justify-between'>
        <div className='flex flex-col md:flex-row md:gap-2'>
          <h1 className='text-2xl'>Dicoding Notes App</h1>
          <div className='flex gap-2 justify-center items-center'>
            <MdOutlineGTranslate style={{fontSize:"32px"}} />
            <IoMdMoon style={{fontSize:"32px"}} />
          </div>
        </div>
        <div className='flex gap-2'>
          <Link href="/notes/add-note" className='flex items-center p-2 border border-dashed border-black bg-white'>
            <IoIosAddCircleOutline />
            <div>Add</div>
          </Link>
          <Link  href="/notes/archived" className='flex items-center p-2 border border-dashed border-black bg-white'>
            <MdOutlineArchive />
            <div>Archived</div>
          </Link>
          <button className='flex items-center p-2 border border-dashed border-black bg-white' onClick={handleLogout} >
            <MdLogout />
            <div>Logout</div>
          </button>
        </div>
      </header>
      <main>
        <NotesList displayedNotes={displayedNotes} handleDelete={handleDelete} handleArchive={handleArchive} />
      </main>
      {alertType && <CustomAlert alertType={alertType} setAlertType={setAlertType} />}
    </>
  )
}

Home.propTypes = {
  activeNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  Token: PropTypes.string.isRequired,
}

export async function getServerSideProps(context) {
  const Token = context.req.cookies['userToken'];

  if (!Token) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  const activeNotes = await getActiveNotes(Token);
  return {
    props: {
      activeNotes,
      Token,
    }
  }
}

export default Home;
