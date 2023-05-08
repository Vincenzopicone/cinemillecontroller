import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CreaFilm = () => {
  const [film, setFilm] = useState([]);
  const [titolo, setTitolo] = useState();
  const [descrizione, setDescrizione] = useState();
  const [regia, setRegia] = useState();
  const [genere, setGenere] = useState();
  const [durata, setDurata] = useState();
  const [invio, setInvio] = useState(false);
  const [rimuovi, setRimuovi] = useState(false);
  const [id, setId] = useState();
  const eliminaFilm = (id) => {
    setId(id);
    setRimuovi(!rimuovi); 
  };

  const caricaFilm = () => {
    setInvio(!invio);
  };

  const postFilm = async () => {
    try {
      const response = await fetch("http://localhost:8080/film/inserisci", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titolo: titolo,
          descrizione: descrizione,
          regia: regia,
          genere: genere,
          durata: durata,
        }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
      }
    } catch (error) {
      alert(error);
    }
  };
  const deleteFilm = async () => {
    try {
      const response = await fetch (
        `http://localhost:8080/film/elimina/${id}`,
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

  useEffect(() => {
    getFilm();
  }, [invio, rimuovi]);
  useEffect(() => {
    if (invio === true) {
      postFilm();
    }
    setInvio(false);
  }, [invio]);
  useEffect(()=> {
    if(rimuovi === true) {
    deleteFilm()
    }
    setRimuovi(false)
  },[rimuovi])

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={4} className="py-5">
          <Row>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Titolo"
                onChange={(e) => setTitolo(e.target.value)}
              ></input>
              <label for="floatingInput">Titolo</label>
            </div>
          </Row>
          <Row>
            <div className="form-floating mb-3">
              <textarea
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Descrizione"
                onChange={(e) => setDescrizione(e.target.value)}
              ></textarea>
              <label for="floatingInput">Descrizione</label>
            </div>
          </Row>
          <Row>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Regista"
                onChange={(e) => setRegia(e.target.value)}
              ></input>
              <label for="floatingInput">Regia</label>
            </div>
          </Row>
          <Row>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Genere"
                onChange={(e) => setGenere(e.target.value)}
              ></input>
              <label for="floatingInput">Genere</label>
            </div>
          </Row>
          <Row>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Durata in minuti (es: 125)"
                onChange={(e) => setDurata(e.target.value)}
              ></input>
              <label for="floatingInput">Durata</label>
            </div>
          </Row>
          <Row xs={4} className="d-flex justify-content-center">
            <Button variant="success" onClick={() => caricaFilm()}>
              Inserisci
            </Button>
          </Row>
        </Col>
        <Col xs={6} className="py-5">
        <Row className="d-flex justify-content-center mb-2 py-1 border border-dark">
            <Col className="fw-bold p-1" xs={1}>
              ID
            </Col>
            <Col className="text-start fw-bold p-1" xs={8}>
              TITOLO
            </Col>
            <Col xs={2}>
            </Col>
          </Row>
          {film &&
            film.map((film) => (
              <Row key={film.id} className="d-flex justify-content-center mb-1 py-1 border border-dark">
                <Col className="fw-bold p-1" xs={1}>
              {film?.id}
            </Col>
                <Col className="text-start p-1" xs={8}>
                  {film?.titolo}
                </Col>
                <Col xs={2}>
                  <Button variant="danger" onClick={() => eliminaFilm(film.id)}>Elimina</Button>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CreaFilm;

