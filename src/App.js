import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore from './store';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Selector from './components/Selector';
import MetricCardContainer from './components/MetricCardContainer';
import DashboardTest from './components/Dashboard';


const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      main: 'rgb(226,231,238)',
    },
  },
});

const App = (props) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <DashboardTest />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
