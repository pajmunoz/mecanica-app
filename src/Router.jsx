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
import LoginClient from './components/forms/LoginClient';
import ClientPage from './components/pages/ClientPage';

export default function MyRouter() {
    const [userId, setUserId] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientCarBrand, setClientCarBrand] = useState('');
    const [clientCarModel, setClientCarModel] = useState('');
    const [clientCarYear, setClientCarYear] = useState('');
    const [clientCarPlate, setClientCarPlate] = useState('');
    const [clientCarOilDate, setClientCarOilDate] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const storedUsername = localStorage.getItem('username');
    const storedUserID = localStorage.getItem('id');

    const storedLastName = localStorage.getItem('clientLastName');
    const storedCarBrand = localStorage.getItem('clientCarBrand');
    const storedCarModel = localStorage.getItem('clientCarModel');
    const storedCarYear = localStorage.getItem('clientCarYear');
    const storedCarPlate = localStorage.getItem('clientCarPlate');
    const storedCarOilDate = localStorage.getItem('clientCarOilDate');


    useEffect(() => {
        console.log()
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

        if (storedIsAuthenticated === 'true' && storedUsername && storedUserID) {
            setIsAuthenticated(true);
            setLoggedInUser(storedUsername);
            setUserId(storedUserID)
            setClientLastName(storedLastName);
            setClientCarBrand(storedCarBrand);
            setClientCarModel(storedCarModel);
            setClientCarYear(storedCarYear);
            setClientCarPlate(storedCarPlate);
            setClientCarOilDate(storedCarOilDate);
        }
    }, [])

    const handleLogin = () => {
        // Lógica para autenticar al usuario
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

    };
    const handleLoggedUser = (username, id) => {
        setLoggedInUser(username);
        setUserId(id)

        localStorage.setItem('username', username);
        localStorage.setItem('id', id);

    };
    const handleLoggedClient = (clientId, clientName, clientLastName, clientCarBrand, clientCarModel, clientCarYear, clientCarPlate, clientCarOilDate) => {
        setLoggedInUser(clientName);
        setUserId(clientId)
        setClientLastName(clientLastName);
        setClientCarBrand(clientCarBrand);
        setClientCarModel(clientCarModel);
        setClientCarYear(clientCarYear);
        setClientCarPlate(clientCarPlate);
        setClientCarOilDate(clientCarOilDate);

        localStorage.setItem('username', clientName);
        localStorage.setItem('id', clientId);
        localStorage.setItem('clientLastName', clientLastName);
        localStorage.setItem('clientCarBrand', clientCarBrand);
        localStorage.setItem('clientCarModel', clientCarModel);
        localStorage.setItem('clientCarYear', clientCarYear);
        localStorage.setItem('clientCarPlate', clientCarPlate);
        localStorage.setItem('clientCarOilDate', clientCarOilDate);

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
                    <Route path="/client-login" element={<LoginClient handleLogin={handleLogin} loggedUser={handleLoggedClient} />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/admin" element={<AdminPage handleLogout={handleLogout} username={loggedInUser} userId={userId} />} />
                            <Route path="/client-page" element={<ClientPage handleLogout={handleLogout} username={[userId, loggedInUser, clientLastName, clientCarBrand, clientCarModel, clientCarYear, clientCarPlate, clientCarOilDate]} />} />
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
