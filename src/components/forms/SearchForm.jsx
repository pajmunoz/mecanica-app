import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchClient = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup className='my-5' size="lg">
                <Form.Control
                    aria-label="Large"
                    aria-describedby="button-addon2"
                    value={searchTerm} onChange={handleChange}
                    placeholder="Escriba el nombre del cliente"
                />
                <Button type="submit" variant="outline-primary" id="button-addon2">
                    Buscar cliente
                </Button>
            </InputGroup>
        </form>
    );
};

export default SearchClient;