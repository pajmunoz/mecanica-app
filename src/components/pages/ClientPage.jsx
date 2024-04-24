import { useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function ClientPage({ handleLogout, username, userId }) {
    const clientId = username[0];
    const clientName = username[1];
    const clientLastName = username[2];
    const clientCarBrand = username[3];
    const clientCarModel = username[4];
    const clientCarYear = username[5];
    const clientCarPlate = username[6];
    const clientCarOilDate = username[7];




    const handleLogOutClick = () => {
        setTimeout(() => {
            handleLogout()
            //console.log('logout')
        }, 1000)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    return (
        <>
            <Row className='mt-5'>
                <Col>
                    <h3>
                        Bienvenido
                        <small className="text-body-secondary"> {clientName} {clientLastName}</small>
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to='/'>
                        <Button variant="secondary" onClick={handleLogOutClick}>Cerrar Sesion</Button>
                    </Link>
                </Col>
            </Row>
            <hr />
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Nombre
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="name" placeholder="Juan" value={clientName}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Apellido
                </InputGroup.Text>
                <Form.Control
                    aria-label="Apellido"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="lastname" placeholder="Perez" value={clientLastName}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Año
                </InputGroup.Text>
                <Form.Control
                    aria-label="Año"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="number" name="year" placeholder="1991" value={clientCarYear}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Modelo
                </InputGroup.Text>
                <Form.Control
                    aria-label="Modelo"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="model" placeholder="Forza" value={clientCarModel}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Marca
                </InputGroup.Text>
                <Form.Control
                    aria-label="Marca"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="brand" placeholder="Suzuki" value={clientCarBrand}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Placa
                </InputGroup.Text>
                <Form.Control
                    aria-label="Placa"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="plate" placeholder="OFS-224" value={clientCarPlate}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Fecha cambio de aceite
                </InputGroup.Text>
                <Form.Control
                    aria-label="Aceite"
                    aria-describedby="inputGroup-sizing-default"
                    disabled type="text" name="oil_date" value={formatDate(clientCarOilDate)}
                />
            </InputGroup>

        </>
    )
}
