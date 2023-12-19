import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

function CustomAlert({ alertType, setAlertType }) {
  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center' }}
      open={alertType !== ''}
      autoHideDuration={3000}
      onClose={() => setAlertType('')}
    >
      <Alert 
        onClose={() => setAlertType('')}
        severity={
          alertType.split('-')[0] === 'success' ? 'success' : 'error'
        }
        sx={{ width: '100%' }}
      >
        {alertType === 'success-delete' && 'Note berhasil dihapus.'}
        {alertType === 'error-delete' && 'Koneksi bermasalah, gagal menghapus Note!'}
        {alertType === 'success-archive' && 'Archive berhasil.'}
        {alertType === 'error-archive' && 'Archive gagal!'}
        {alertType === 'success-unarchive' && 'Unarchive berhasil.'}
        {alertType === 'error-unarchive' && 'Unarchive gagal!'}
      </Alert>
    </Snackbar>
);
}

CustomAlert.propTypes = {
  alertType: PropTypes.string.isRequired,
  setAlertType: PropTypes.func.isRequired,
}

export default CustomAlert;