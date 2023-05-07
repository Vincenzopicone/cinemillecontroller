import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CreaProgrammazione = () => {
  const [film, setFilm] = useState();
  const [sala, setSala] = useState();
  const inizioSettimanaArray = [];
  const fineSettimanaArray = [];

  const optionWeek = () => {
    const giorni = 7;
    for (let i = 0; i < 20; i++) {
      let inizioSettimana = moment().clone(0).add(7 + i * giorni, "days").format("yyyy-MM-DD")
      let fineSettimana = moment().clone(0).add(14 + i * giorni, "days").format("yyyy-MM-DD")
      inizioSettimanaArray.push(inizioSettimana)
      fineSettimanaArray.push(fineSettimana)
    }
  }
  optionWeek();
  
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
      <Row className="d-flex justify-content-center p-3">
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
        <select class="form-select" aria-label="Default select example">
            <option selected>Scegli la settimana</option>
           {inizioSettimanaArray && inizioSettimanaArray.map((giorno, i)=> <option value={giorno[i]}> {giorno.slice(8, 10)}-{giorno.slice(5,7)}-{giorno.slice(0,4)}</option>)}
          </select>
        </Col>
        <Col xs={2}>
          <Button variant="success">Inserisci</Button>

        </Col>
      </Row>
    </Container>
  );
};

export default CreaProgrammazione;
