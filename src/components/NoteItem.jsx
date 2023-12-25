import { showFormattedDate } from "@/helper";
import Link from "next/link";
import { MdDeleteForever, MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import PropTypes from 'prop-types';

function NoteItem({ id, title, createdAt, body, handleDelete, archived, handleArchive, handleUnarchive }) {
  return (
    <div className="flex flex-col border-2 rounded-xl p-4 border-dashed border-black">
     <div className='flex justify-between'>
        <Link href={`/notes/${id.split('-')[1]}`} className='fs-5'>{title}</Link>
        <div className='flex'>
            <MdDeleteForever fontSize={28} className='cursor-pointer' onClick={() => handleDelete(id)} />
            {archived ? <MdOutlineUnarchive fontSize={28} className='cursor-pointer' onClick={() => handleUnarchive(id)} /> : <MdOutlineArchive fontSize={28} className='cursor-pointer' onClick={() => handleArchive(id)} />}
        </div>
     </div>
     <div>{body}</div>
     <div>{'Created at: ' + showFormattedDate(createdAt)}</div>
   </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  handleArchive: PropTypes.func,
  handleUnarchive: PropTypes.func,
}

export default NoteItem;