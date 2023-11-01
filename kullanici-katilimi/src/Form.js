import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";

const emptyForm = {
  name: "",
  surname: "",
  email: "",
  password: "",
  checkbox: false,
};

function CreateForm(formData = emptyForm) {
  const [data, setData] = useState(formData);
  //   const [name, setName] = useState("");
  //   const [surname, setSurname] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [checkbox, setcheckbox] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form Data: ", data);
  };

  const { name, surname, email, password, checkbox } = data;

  return (
    <>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3">
          <Form.Label>İsim</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="İsminizi Girin"
            value={name}
            onChange={inputChangeHandler}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Soyisim</Form.Label>
          <Form.Control
            type="text"
            placeholder="Soy isminizi Girin"
            value={surname}
            onChange={inputChangeHandler}
            name="surname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="E-mail Adresinizi Girin"
            value={email}
            onChange={inputChangeHandler}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Şifrenizi Girin"
            value={password}
            onChange={inputChangeHandler}
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kullanım Şartları</Form.Label>
          <Form.Check
            id="checkbox"
            type="checkbox"
            checked={checkbox}
            onChange={inputChangeHandler}
            name="checkbox"
          />
        </Form.Group>

        <Button variant="secondry" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CreateForm;
