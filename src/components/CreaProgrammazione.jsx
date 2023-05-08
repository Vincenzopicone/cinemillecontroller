import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const CreaProgrammazione = () => {
  const [film, setFilm] = useState([]);
  const [sala, setSala] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filmSelezionato, setFilmSelezionato] = useState(null);
  const [salaSelezionata, setSalaSelezionata] = useState(null);
  const [dataSelezionata, setDataSelezionata] = useState(moment().clone().day(0).format("yyyy-MM-DD"));
  const [dataFine, setDataFine] = useState(moment().clone().day(0).add(6, "days").format("yyyy-MM-DD"));
  const [invio, setInvio] = useState(false);
  const [rimuovi, setRimuovi] = useState(false);
  const [id, setId] = useState();
  const [programmazione, setProgrammazione] = useState();
  const inizioSettimanaArray = [];
  const fineSettimanaArray = [];
  const inizioSettimanaArrayBack = [];
  const fineSettimanaArrayBack = [];

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
    const selected = parseInt(event);
    console.log("event", selected);
    let selezione = film.find((obj) => obj.id === selected);
    console.log("selezionefind", selezione);
    setFilmSelezionato(selezione);
    // console.log("film selezionato", filmSelezionato)
    // console.log("id film", selected)
    // setFilmSelezionatoID(selected)
    // getSelectedFilm(selected);
  };

  const handleSelectChangeSala = (event) => {
    const selected = parseInt(event);
    console.log("event", selected);
    let selezione = sala.find((obj) => obj.id === selected);
    console.log("selezionefind", selezione);
    setSalaSelezionata(selezione);
    // const selected = event
    // console.log("id sala", selected)
    // setSalaSelezionataID(selected)
    // getSelectedSala();
  };

  const handleSelectChangeData = (event) => {
    setDataSelezionata(event);
    console.log(event);
    setDataFine(
      moment(event).clone().day(0).add(6, "days").format("yyyy-MM-DD")
    );
    console.log(dataFine);
  };

  const caricaProgrammazione = () => {
    setInvio(!invio);
  };

  const eliminaProgrammazione = (id) => {
    setId(id);
    setRimuovi(!rimuovi); 
  };

  const optionWeek = () => {
    const giorni = 7;
    for (let i = 0; i < 10; i++) {
      let inizioSettimana = moment()
        .clone(0)
        .add(6 + i * giorni, "days")
        .format("yyyy-MM-DD");
      let fineSettimana = moment()
        .clone(0)
        .add(13 + i * giorni, "days")
        .format("yyyy-MM-DD");
      inizioSettimanaArray.push(inizioSettimana);
      fineSettimanaArray.push(fineSettimana);
    }
  };
  optionWeek();
  const optionWeekBack = () => {
    const giorni = 7;
    for (let i = 0; i < 10; i++) {
      let inizioSettimana = moment()
        .clone(0)
        .add(-8 - i * giorni, "days")
        .format("yyyy-MM-DD");
      let fineSettimana = moment()
        .clone(0)
        .add(-15 - i * giorni, "days")
        .format("yyyy-MM-DD");
      inizioSettimanaArrayBack.push(inizioSettimana);
      fineSettimanaArrayBack.push(fineSettimana);
    }
  };
  optionWeekBack();

  const getProgrammazione = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/programmazioni/data?start=${startDate}&end=${endDate}&sort=sala.numerosala,ASC`
      );
      if (response.ok) {
        const data = await response.json();
        setProgrammazione(data.content);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };


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
    try {
      const response = await fetch(
        "http://localhost:8080/programmazioni/inserisci",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            film: filmSelezionato,
            sala: salaSelezionata,
            datauscita: dataSelezionata,
            datafineprogrammazione: dataFine
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
      }
    } catch (error) {
      
    }
  };

  const deleteProgrammazione = async () => {
    try {
      const response = await fetch (
        `http://localhost:8080/programmazioni/elimina/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      if (response.ok) {        
      } else {

      }
    } catch (errore) {

    }
  }
  useEffect(() => {
    getProgrammazione();
  }, [startDate, invio, rimuovi]);


  useEffect(() => {
    getFilm();
    getSala();
  }, []);

  useEffect(() => {
    if(invio === true) {
    postProgrammazione();
    }
    setInvio(false)
  },[invio]);

  useEffect(()=> {
    if(rimuovi === true) {
    deleteProgrammazione()
    }
    setRimuovi(false)
  },[rimuovi])

  return (
    <Container>
      <Row className="d-flex justify-content-center py-3">
        <Col xs={6}>
          <Row className="d-flex justify-content-center mb-2">
            <Col xs={6}>
              <select
                className="form-select"
                aria-label={startDate}
                value={startDate}
                onChange={(e) => handleSelectChange(e.target.value)}
              >
                {inizioSettimanaArrayBack &&
                  inizioSettimanaArrayBack.reverse().map((giorno) => (
                    <option key={giorno.id} value={giorno}>
                      {" "}
                      dal {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
                
                <option
                  value={moment().clone().day(0).format("yyyy-MM-DD")}
                  selected
                >
                  Settimana in corso
                </option>
                
                {inizioSettimanaArray &&
                  inizioSettimanaArray.map((giorno) => (
                    <option key={giorno.id} value={giorno}>
                      {" "}
                      dal {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-2 py-2 border border-dark">
            <Col className="fw-bold p-1" xs={1}>
              SALA
            </Col>
            <Col className="text-start fw-bold p-1" xs={8}>
              TITOLO
            </Col>
            <Col xs={2}>
            </Col>
          </Row>
          {isLoading && <Spinner animation="border" variant="secondary" />}
          {isError && (
            <Alert variant="danger">Errore nel caricamento della pagina</Alert>
          )}
          {programmazione &&
            programmazione.map((film) => (
              <Row key={film.id} className="d-flex justify-content-center mb-1 py-2 border border-dark">
                <Col xs={1}>{film?.sala.numerosala}</Col>
                <Col className="text-start p-1" xs={8}>
                  {film?.film.titolo}
                </Col>
                <Col xs={2}>
                  <Button variant="danger" onClick={() => eliminaProgrammazione(film.id)}>Elimina</Button>
                </Col>
              </Row>
            ))}
        </Col>
        <Col xs={6} className="d-flex flex-column justify-content-center">
          <Row className="d-flex justify-content-center p-3">
            <Col xs={8} className="pb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => handleSelectChangeFilm(e.target.value)}
              >
                <option selected>Scegli il film</option>
                {film &&
                  film.map((film) => (
                    <option key={film.id} value={film.id}>
                      {film.titolo}
                    </option>
                  ))}
              </select>
            </Col>
            <Col xs={8} className="pb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => handleSelectChangeSala(e.target.value)}
              >
                <option selected>Scegli la sala</option>
                {sala &&
                  sala.map((sala, i) => (
                    <option key={sala.id} value={sala.id}>
                      SALA {sala.numerosala}
                      {sala.tiposala === "IMAX" && " - IMAX"}
                    </option>
                  ))}
              </select>
            </Col>
            <Col xs={8} className="pb-3 ">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => handleSelectChangeData(e.target.value)}
              >
                {inizioSettimanaArrayBack &&
                  inizioSettimanaArrayBack.map((giorno) => (
                    <option key={giorno.id} value={giorno}>
                      {" "}
                      dal {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
                <option  value={moment().clone().day(0).format("yyyy-MM-DD")} selected>Settimana in corso</option>
                {inizioSettimanaArray &&
                  inizioSettimanaArray.map((giorno, i) => (
                    <option key={giorno.id} value={giorno}>
                      {" "}
                      {giorno.slice(8, 10)}-{giorno.slice(5, 7)}-
                      {giorno.slice(0, 4)}
                    </option>
                  ))}
              </select>
            </Col>
            <Col xs={8}>
              <Button variant="success" onClick={() => caricaProgrammazione()}>
                Inserisci
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CreaProgrammazione;
