import { GlobalContext } from '@/hooks/context';
import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';

function CustomAlert() {
  const { alertType, setAlertType } = useContext(GlobalContext);
  const theType = alertType.split('-')[0];
  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center' }}
      open={alertType !== ''}
      autoHideDuration={3000}
      onClose={() => setAlertType('')}
    >
      <Alert 
        onClose={() => setAlertType('')}
        severity={theType}
        sx={{ width: '100%' }}
      >
        {alertType === 'success-delete' && 'Note berhasil dihapus.'}
        {alertType === 'success-register' && 'Register berhasil.'}
        {alertType === 'error-register' && 'Register gagal.'}
        {alertType === 'error-password' && 'Periksa kembali password Anda!'}
        {alertType === 'success-login' && 'Login berhasil.'}
        {alertType === 'success-logout' && 'Logout berhasil.'}
        {alertType === 'error-login' && 'Login gagal, periksa kembali email dan password Anda!'}
        {alertType === 'error-delete' && 'Koneksi bermasalah, gagal menghapus Note!'}
        {alertType === 'success-archive' && 'Archive berhasil.'}
        {alertType === 'error-archive' && 'Archive gagal!'}
        {alertType === 'success-unarchive' && 'Unarchive berhasil.'}
        {alertType === 'error-unarchive' && 'Unarchive gagal!'}

        {alertType === 'success-create-note' && 'Note berhasil dibuat.'}
        {alertType === 'error-create-note' && 'Note GAGAL dibuat!'}
        {alertType === 'error-create-note-title' && 'Title tidak boleh kosong!'}
        {alertType === 'error-create-note-body' && 'Body tidak boleh kosong!'}
      </Alert>
    </Snackbar>
);
}

export default CustomAlert;