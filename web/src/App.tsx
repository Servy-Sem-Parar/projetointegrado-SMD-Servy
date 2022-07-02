import React from 'react';
import Router from './routes/routes';
import "./App.css"
import Layout from './components/Layout/Layout';
import moment from 'moment';
import 'moment/locale/pt-br';

function App() {
  moment.locale("pt-br")
  return (
    <Layout>
      <Router/>
    </Layout>
  );
}

export default App;
