import { MdKeyboardBackspace } from "react-icons/md";
import PropTypes from 'prop-types';
import Link from "next/link";
import useInput from "@/hooks/useInput";
import { addUserNote } from "@/pages/api/hello";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { GlobalContext } from "@/hooks/context";


function AddNote({ Token }) {
  const router = useRouter();
  const [title, handleChangeTitle] = useInput('');
  const [body, handleChangeBody] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAlertType } = useContext(GlobalContext);

  const handleAddNote = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {Token, title, body};
    if (title.length !== 0 && body.length !== 0) {
      const response = await addUserNote(userData);
      if (response.status === 'success') {
        setAlertType('success-create-note');
        router.push('/');
      } else {
        setAlertType('error-create-note');
      }
    } else {
      if (title.length === 0) {
        setAlertType('error-create-note-title');
      } else if (body.length === 0) {
        setAlertType('error-create-note-body');
      }
    }
    setIsLoading(false);
  }, [Token, title, body, setAlertType, router]);

  return (
    <>
      <header className='flex items-center gap-2 mb-4'>
        <Link href="/" ><MdKeyboardBackspace size={32} /></Link>
        <h1 className='mb-0'>Add Note</h1>
      </header>
      <main className='border-2 p-4 border-black border-dashed rounded-lg'>
        <form className='flex flex-col gap-3' onSubmit={handleAddNote} >
          <input type="text" placeholder="Title" className="border border-slate-600 py-2 px-4 w-full md:w-3/4 mx-auto" onChange={handleChangeTitle} />
          <textarea placeholder="Body" className="border border-slate-600 py-2 px-4 w-full md:w-3/4 mx-auto min-h-[320px]" onChange={handleChangeBody} />
          {isLoading ?
            <button className="w-full md:w-3/4 mx-auto bg-slate-700 py-2 px-4 rounded-xl text-white"><CircularProgress size={20} sx={{color:'white'}} />Loading...</button>
            :
            <button type="submit" className="w-full md:w-3/4 mx-auto bg-slate-700 py-2 px-4 rounded-xl text-white">Add</button>
          }
        </form>
      </main>
    </>
  );
}

AddNote.propTypes = {
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

  return {
    props: {
      Token,
    }
  }
}

export default AddNote;
