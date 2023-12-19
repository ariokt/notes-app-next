import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

function NotesList({ displayedNotes, handleDelete, handleArchive, handleUnarchive }) {

  return (
    <div className='mt-4 flex flex-col gap-4'>
      {displayedNotes.map((note) => {
        return (
          <NoteItem key={note.id} {...note} handleDelete={handleDelete} handleArchive={handleArchive} handleUnarchive={handleUnarchive} />
        )
      })}
    </div>
  );
}

NotesList.propTypes = {
  displayedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleArchive: PropTypes.func,
  handleUnarchive: PropTypes.func,
}

export default NotesList;