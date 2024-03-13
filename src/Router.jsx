import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginForm from './components/forms/LoginForm';
import AdminPage from "./components/pages/AdminPage";
import MainPage from './components/pages/MainPage';
import BookForm from './components/forms/BookForm';
import EditClientForm from './components/forms/EditClientForm';
import CreateClientForm from './components/forms/CreateClientForm';

export default function MyRouter() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const storedUsername = localStorage.getItem('username');
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

        if (storedIsAuthenticated === 'true' && storedUsername) {
            setIsAuthenticated(true);
            setLoggedInUser(storedUsername);
        }
        let timeoutId;
        /* 
                const handleActivity = () => {
                    clearTimeout(timeoutId); // Reinicia el temporizador cada vez que hay actividad
                    timeoutId = setTimeout(() => {
                        // Lógica para cerrar la sesión después de 2 minutos de inactividad
                        setIsAuthenticated(false);
                        window.location = '/';
                        localStorage.clear()
                    }, .5 * 60 * 1000); // 2 minutos en milisegundos
                };
        
                handleActivity(); // Llama a la función para iniciar el temporizador al principio
        
                // Configura event listeners para detectar actividad
                window.addEventListener('mousemove', handleActivity);
                window.addEventListener('keydown', handleActivity);
        
                // Limpia los event listeners al desmontar el componente
                return () => {
                    window.removeEventListener('mousemove', handleActivity);
                    window.removeEventListener('keydown', handleActivity);
                    clearTimeout(timeoutId);
                };*/
    }, []);

    const handleLogin = () => {
        // Lógica para autenticar al usuario
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

    };
    const handleLoggedUser = (username) => {
        setLoggedInUser(username);
        localStorage.setItem('username', username);

    };
    const handleLogout = () => {
        // Lógica para cerrar la sesión del usuario
        setIsAuthenticated(false);
        localStorage.clear()
        window.location = '/';
    };

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log('save')
    }
    

    
    return (
        <Router> {/* Asegúrate de envolver todo en un componente Router */}
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginForm handleLogin={handleLogin} loggedUser={handleLoggedUser} />} />
                {isAuthenticated ? (
                    <>
                        <Route path="/admin" element={<AdminPage handleLogout={handleLogout} username={loggedInUser} />} />

                        <Route path="/book/:id" element={<BookForm />} />
                        <Route path="/edit/:id" element={<EditClientForm handleEdit={handleEdit}  />} />
                        <Route path="/createClient" element={<CreateClientForm />} />
                    </>
                ) : (
                    <Route path="/" element={<MainPage />} />
                )}
            </Routes>
        </Router>
    );
}
