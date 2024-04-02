import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/forms/LoginForm';
import AdminPage from "./components/pages/AdminPage";
import MainPage from './components/pages/MainPage';
import BookForm from './components/forms/BookForm';
import EditClientForm from './components/forms/EditClientForm';
import CreateClientForm from './components/forms/CreateClientForm';
import ErrorPage from './components/pages/ErrorPage';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import ContactPage from './components/pages/ContactPage';

export default function MyRouter() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const storedUsername = localStorage.getItem('username');

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

        if (storedIsAuthenticated === 'true' && storedUsername) {
            setIsAuthenticated(true);
            setLoggedInUser(storedUsername);
        }
    }, [])

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

    };

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log('save')
    }



    return (
        <Router> {/* Asegúrate de envolver todo en un componente Router */}
            <Header isAuthenticated={isAuthenticated} />
            <Container>
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginForm handleLogin={handleLogin} loggedUser={handleLoggedUser} />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/admin" element={<AdminPage handleLogout={handleLogout} username={loggedInUser} />} />

                            <Route path="/book/:id" element={<BookForm />} />
                            <Route path="/edit/:id" element={<EditClientForm handleEdit={handleEdit} />} />
                            <Route path="/createClient" element={<CreateClientForm />} />

                        </>
                    ) : (
                        <Route path="/" element={<MainPage />} />

                    )}
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </Container>
        </Router>
    );
}
