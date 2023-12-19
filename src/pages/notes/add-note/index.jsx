import { MdKeyboardBackspace } from "react-icons/md";
import PropTypes from 'prop-types';
import Link from "next/link";
import useInput from "@/hooks/useInput";
import { addUserNote } from "@/pages/api/hello";
import { useRouter } from "next/router";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";


function AddNote({ Token }) {
  const router = useRouter();
  const [title, handleChangeTitle] = useInput('');
  const [body, handleChangeBody] = useInput('');

  const [errorSubmit, setErrorSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {Token, title, body};
    if (!errorMessage()) {
      const response = await addUserNote(userData);
      if (response.status === 'success') {
        router.push('/');
      } else {
        setErrorSubmit(true);
      }
    } else {
      setErrorSubmit(true);
    }
    setIsLoading(false);
  }

  const errorMessage = () => {
    if (title.length === 0) {
      return 'Mohon untuk isi title!';
    }
    if (body.length === 0) {
      return 'Mohon untuk isi body!'
    }
  }

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
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center' }}
        open={errorSubmit}
        autoHideDuration={3000}
        onClose={() => setErrorSubmit(false)}
      >
        <Alert onClose={() => setErrorSubmit(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage() || 'Koneksi bermasalah, mohon ulangi!'}
        </Alert>
      </Snackbar>
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
