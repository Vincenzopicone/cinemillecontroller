import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";

const Programmazione = () => {
  const [programmazione, setProgrammazione] = useState();

  const [startDate, setStartDate] = useState(
    moment().clone().day(0).format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().clone().day(0).add(6, "days").format("yyyy-MM-DD")
  );
  const handleSelectChange = (event) => {
    setStartDate(event);
    setEndDate(moment(event).clone().day(0).add(6, "days").format("yyyy-MM-DD"))
  };

  const inizioSettimanaArray = [];
  const fineSettimanaArray = [];

  const optionWeek = () => {
    const giorni = 7;
    for (let i = 0; i < 20; i++) {
      let inizioSettimana = moment()
        .clone(0)
        .add(7 + i * giorni, "days")
        .format("yyyy-MM-DD");
      let fineSettimana = moment()
        .clone(0)
        .add(14 + i * giorni, "days")
        .format("yyyy-MM-DD");
      inizioSettimanaArray.push(inizioSettimana);
      fineSettimanaArray.push(fineSettimana);
    }
  };
  optionWeek();

  const getProgrammazione = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/programmazioni/data?start=${startDate}&end=${endDate}&sort=sala.numerosala,ASC`
      );
      if (response.ok) {
        const data = await response.json();
        setProgrammazione(data.content);
        console.log(data.content);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    getProgrammazione();
  }, [startDate]);

  return (
    <Container className="p-3">
      <Row className="d-flex justify-content-center">
        <Col xs={3}>
          <select class="form-select" aria-label="Default select example" value={""} onChange={(e) =>handleSelectChange(e.target.value)}>
            <option selected>Settimana in corso</option>
            {inizioSettimanaArray &&
              inizioSettimanaArray.map((giorno) => (
                <option key={giorno.id} value={giorno}> dal 
                  {" "}
                  {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                  {giorno.slice(0, 4)}
                </option>
              ))}
          </select>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-2">
        <Col className="fw-bold p-1" xs={3}>SALA</Col>
        <Col className="text-start fw-bold p-1" xs={5}>TITOLO</Col>
      </Row>
      {programmazione &&
        programmazione.map((film, i) => (
          <Row key={film.id} className="d-flex justify-content-center">
            <Col xs={3}>{film?.sala.numerosala}</Col>
            <Col className="text-start p-1" xs={5}>
              {film?.film.titolo}
            </Col>
          </Row>
        ))}
    </Container>
  );
};
export default Programmazione;
