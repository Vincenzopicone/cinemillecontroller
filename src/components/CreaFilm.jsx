import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CreaFilm = () => {
  const [titolo, setTitolo] = useState();
  const [descrizione, setDescrizione] = useState();
  const [regia, setRegia] = useState();
  const [genere, setGenere] = useState();
  const [durata, setDurata] = useState();
  const [invio, setInvio] = useState(false);

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

  useEffect(() => {
    postFilm();
  }, [invio]);

  return (
    <Container className="py-5 pageFilm">
      <Row>
        <Col xs={2} class="input-group mb-3">
          <input
            type="text"
            placeholder="Titolo"
            onChange={(e) => setTitolo(e.target.value)}
          ></input>
        </Col>
        <Col xs={2} class="input-group mb-3">
          <input
            type="text"
            placeholder="Descrizione"
            onChange={(e) => setDescrizione(e.target.value)}
          ></input>
        </Col>

        <Col xs={2} class="input-group mb-3">
          <input
            type="text"
            placeholder="Regia"
            onChange={(e) => setRegia(e.target.value)}
          ></input>
        </Col>

        <Col xs={2} class="input-group mb-3">
          <input
            type="text"
            placeholder="Genere"
            onChange={(e) => setGenere(e.target.value)}
          ></input>
        </Col>

        <Col xs={2} class="input-group mb-3">
          {" "}
          <input
            type="text"
            placeholder="Durata"
            onChange={(e) => setDurata(e.target.value)}
          ></input>
        </Col>
        <Col xs={2} class="input-group mb-3">
          <Button variant="success" onClick={() => caricaFilm()}>
            Inserisci
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreaFilm;
