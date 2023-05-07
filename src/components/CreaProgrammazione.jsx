import { getValue } from "@testing-library/user-event/dist/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CreaProgrammazione = () => {
  const [film, setFilm] = useState();
  const [sala, setSala] = useState();
  const [filmSelezionato, setFilmSelezionato] = useState({});
  const [salaSelezionata, setSalaSelezionata] = useState({});
  const [dataSelezionata, setDataSelezionata] = useState("");
  const [dataFine, setDataFine] = useState();
  const [invio, setInvio] = useState(false);
  const [programmazione, setProgrammazione] = useState();
  const inizioSettimanaArray = [];
  const fineSettimanaArray = [];
  

  const [startDate, setStartDate] = useState(
    moment().clone().day(0).format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().clone().day(0).add(6, "days").format("yyyy-MM-DD")
  );
  const handleSelectChange = (event) => {
    setStartDate(event);
    setEndDate(
      moment(event).clone().day(0).add(6, "days").format("yyyy-MM-DD")
    );
  };
  const handleSelectChangeFilm = (event) => {
    setFilmSelezionato(event)
  }
  const handleSelectChangeSala = (event) => {
    setSalaSelezionata(event)
  }
  const handleSelectChangeData = (event) => {
    setDataSelezionata(event)
    setDataFine(moment(event).clone().day(0).add(6, "days").format("yyyy-MM-DD"))
  }

  const caricaProgrammazione = () => {
    setInvio(!invio)
  }

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

  const postProgrammazione = async () => {
    try{
      const response = await fetch("http://localhost:8080/programmazioni/inserisci", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: ({
          "film": filmSelezionato,
          "sala": salaSelezionata,
          "datauscita": dataSelezionata,
          "datafineprogrammazione": dataFine
        }),
      });

      if (response.ok) {
        const data = await response.json();
    } else {

    }

  }catch (error) {

  }
}

  useEffect(() => {
    getFilm();
    getSala();
  }, []);

  useEffect(() => {
    getProgrammazione();
  }, [startDate]);

  useEffect(() => {
    postProgrammazione();
  },[invio])

  return (
    <Container className="py-3 px-0">
      <Row>
      <Col xs={6}>
          <Row className="d-flex justify-content-center">
            <Col xs={6}>
              <select
                class="form-select"
                aria-label={startDate}
                value={startDate}
                onChange={(e) => handleSelectChange(e.target.value)}
              >
                <option value={moment().clone().day(0).format("yyyy-MM-DD")} selected>Settimana in corso</option>
                {inizioSettimanaArray &&
                  inizioSettimanaArray.map((giorno) => (
                    <option value={giorno}>
                      {" "}
                      dal {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mt-2">
            <Col className="fw-bold p-1" xs={1}>
              SALA
            </Col>
            <Col className="text-start fw-bold p-1" xs={8}>
              TITOLO
            </Col>
          </Row>
          {programmazione &&
            programmazione.map((film, i) => (
              <Row className="d-flex justify-content-center">
                <Col xs={1}>{film?.sala.numerosala}</Col>
                <Col className="text-start p-1" xs={8}>
                  {film?.film.titolo}
                </Col>
              </Row>
            ))}
        </Col>
        <Col xs={6}>
          <Row className="d-flex justify-content-center p-3">
            <Col xs={8} className="pb-3">
              <select class="form-select" aria-label="Default select example" onChange={() => console.log(film)}>
                <option selected>Scegli il film</option>
                {film &&
                  film.map((film) => (
                    <option value={film}>{film.titolo}</option>
                  ))}
              </select>
            </Col>
            <Col xs={8} className="pb-3">
              <select class="form-select" aria-label="Default select example" onChange={(e) => handleSelectChangeSala(e.target.value)}>
                <option selected>Scegli la sala</option>
                {sala &&
                  sala.map((sala, i) => (
                    <option value={sala[i]}>
                      SALA {sala.numerosala}
                      {sala.tiposala === "IMAX" && " - IMAX"}
                    </option>
                  ))}
              </select>
            </Col>
            <Col xs={8} className="pb-3">
              <select class="form-select" aria-label="Default select example" onChange={(e) => handleSelectChangeData(e.target.value)}>
                <option  selected>Scegli la settimana</option>
                {inizioSettimanaArray &&
                  inizioSettimanaArray.map((giorno, i) => (
                    <option value={giorno[i]}>
                      {" "}
                      {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
              </select>
            </Col>
            <Col xs={8}>
              <Button variant="success" onClick={() => caricaProgrammazione()}>Inserisci</Button>
              
            </Col>
            <Col xs={8}>
              <h6>Carica programmazione con excel</h6>
              <Button variant="primary">Inserisci</Button>
            </Col>
          </Row>
        </Col>

      </Row>
    </Container>
  );
};

export default CreaProgrammazione;

