import { Alert, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from './redux/slices/alertSlice';
import { empty, getCart } from './redux/slices/cartSlice';
import AppRouter from './routers/client/AppRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f14d54'
    }
  }
});

const App = () => {

  const { auth: { loggedIn }, alert } = useSelector(state => ({ auth: state.auth, alert: state.alert }));
  const dispatch = useDispatch();

  useEffect(() => {
    loggedIn ? dispatch(getCart()) : dispatch(empty());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => { dispatch(close()); }}>
        {
          alert.open ? (
            <Alert
              onClose={() => { dispatch(close()); }}
              severity={alert.severity}
              sx={{ width: '100%' }} >
              {alert.message}
            </Alert>
          ) : null
        }
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
