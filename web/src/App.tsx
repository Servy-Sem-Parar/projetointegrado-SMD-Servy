import React from 'react';
import Router from './routes/routes';
import "./App.css"
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Router/>
    </Layout>
  );
}

export default App;
