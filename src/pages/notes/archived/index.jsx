import { deleteUserNote, getArchivedNotes, unarchiveUserNote } from "@/pages/api/hello";
import Link from "next/link";
import { MdKeyboardBackspace } from "react-icons/md";
import PropTypes from 'prop-types';
import NotesList from "@/components/NotesList";
import { useCallback, useContext, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { GlobalContext } from "@/hooks/context";

function Archived({ archivedNotes, Token }) {
  const [displayedNotes, setDisplayedNotes] = useState(archivedNotes);
  const { alertType, setAlertType } = useContext(GlobalContext);

  const handleDelete = useCallback(async (id) => {
    const response = await deleteUserNote(Token, id);
    if (response.status === 'success') {
      setDisplayedNotes((prevDisplayed) => prevDisplayed.filter((note) => note.id !== id));
      setAlertType('success-delete');
    } else {
      setAlertType('error-delete');
    }
  }, [Token, setDisplayedNotes, setAlertType]);

  const handleUnarchive = useCallback(async (id) => {
    const response = await unarchiveUserNote(Token, id);
    if (response.status === 'success') {
      setDisplayedNotes((prevDisplayed) => prevDisplayed.filter((note) => note.id !== id));
      setAlertType('success-unarchive');
    } else {
      setAlertType('error-unarchive');
    }
  }, [Token, setDisplayedNotes, setAlertType]);

  return (
    <>
      <header className='flex items-center gap-2 mb-4'>
        <Link href="/" ><MdKeyboardBackspace size={32} /></Link>
        <h1 className='mb-0'>Archived Notes</h1>
      </header>
      <main>
        {
          displayedNotes.length  > 0 ? 
          <NotesList displayedNotes={displayedNotes} handleDelete={handleDelete} handleUnarchive={handleUnarchive} />
          :
          <div>No Urchived Data Available</div>
        }
      </main>
      {alertType && <CustomAlert alertType={alertType} setAlertType={setAlertType} />}
    </>
  );
}

Archived.propTypes = {
  archivedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
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

  const archivedNotes = await getArchivedNotes(Token);
  return {
    props: {
      archivedNotes,
      Token,
    }
  }
}

export default Archived;