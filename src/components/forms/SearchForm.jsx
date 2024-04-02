import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchClient = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(e.target.value);
        handleSearch(value);
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
                    placeholder="buscar cliente, marca, modelo o patente"
                />
                <Button type="submit" variant="outline-primary" id="button-addon2">
                    Buscar cliente
                </Button>
            </InputGroup>
        </form>
    );
};

export default SearchClient;