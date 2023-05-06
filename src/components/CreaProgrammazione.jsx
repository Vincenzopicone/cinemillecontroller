import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CreaProgrammazione = () => {
  const [film, setFilm] = useState();
  const [sala, setSala] = useState();

  const getFilm = async () => {
    try {
      const response = await fetch("http://localhost:8080/film");
      if (response.ok) {
        const data = await response.json();
        setFilm(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSala = async () => {
    try {
      const response = await fetch("http://localhost:8080/sale");
      if (response.ok) {
        const data = await response.json();
        setSala(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilm();
    getSala();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <select class="form-select" aria-label="Default select example">
            <option selected>Scegli il film</option>
            {film && film.map((film, i) => <option value={film[i]}>{film.titolo}</option>)}
          </select>
        </Col>
        <Col xs={3}>
        <select class="form-select" aria-label="Default select example">
            <option selected>Scegli il film</option>
            {sala && sala.map((sala, i) => <option value={sala[i]}>SALA {sala.numerosala}{sala.tiposala === "IMAX" && " - IMAX"}</option>)}
          </select>
        </Col>
        <Col xs={3}>
          <Button variant="dark">Inserisci</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreaProgrammazione;
