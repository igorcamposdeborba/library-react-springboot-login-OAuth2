import React from 'react'
import RoutesApp from './routes';
import { AuthProvider } from './contexts/auth';
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
   return (
    <div className="app">
        <AuthProvider>
            <RoutesApp/>
        </AuthProvider>
    </div>
  )
}

export default App