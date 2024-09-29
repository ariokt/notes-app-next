import { archiveUserNote, getNoteDetail, unarchiveUserNote } from "@/pages/api/hello";
import { MdKeyboardBackspace, MdOutlineUnarchive, MdOutlineArchive } from "react-icons/md";
import Link from "next/link";
import PropTypes from 'prop-types';
import { useState } from "react";
import CustomAlert from '@/components/CustomAlert';

function NoteDetail({ detailNote, Token }) {
  const [alertType, setAlertType] = useState('');
  const [archived, setArchived] = useState(detailNote.archived);

  const handleArchive = async (id) => {
    const response = await archiveUserNote(Token, id);
    if (response.status === 'success') {
      setAlertType('success-archive');
      setArchived(true);
    } else {
      setAlertType('error-archive');
    }
  }

  const handleUnarchive = async (id) => {
    const response = await unarchiveUserNote(Token, id);
    if (response.status === 'success') {
      setAlertType('success-unarchive');
      setArchived(false);
    } else {
      setAlertType('error-unarchive');
    }
  }
  
  return (
    <>
      <header className='flex items-center gap-2 mb-4'>
        <Link href="/" ><MdKeyboardBackspace size={32} /></Link>
        <h1 className='mb-0'>Detail Note {detailNote.id}</h1>
      </header>
      <main>
        <div className='flex items-center gap-2'>
          <h1 className='m-0 p-0'>{detailNote.title}</h1>
          {archived ? <MdOutlineUnarchive fontSize={28} onClick={() => handleUnarchive(detailNote.id)} /> : <MdOutlineArchive fontSize={28} onClick={() => handleArchive(detailNote.id)} />}
        </div>
        <p>{detailNote.body}</p>
        <p>Created at: {new Date(detailNote.createdAt).toLocaleString("id-ID")}</p>
      </main>
      {alertType && <CustomAlert alertType={alertType} setAlertType={setAlertType} />}
    </>
  );
}

NoteDetail.propTypes = {
  detailNote: PropTypes.shape({
    archived: PropTypes.bool,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    owner: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  Token: PropTypes.string.isRequired,
}

export async function getServerSideProps(context) {
  const id = `notes-${context.query.id}`;
  const Token = context.req.cookies['userToken'];
  
  if (!Token) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  const detailNote = await getNoteDetail(Token, id);
  return {
    props: {
      detailNote,
      Token,
    }
  }
}

export default NoteDetail;