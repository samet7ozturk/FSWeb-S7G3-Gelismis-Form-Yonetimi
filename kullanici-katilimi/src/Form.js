import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
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
  const [formValid, setFormValid] = useState(true);
  const [formErrors, setFormErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    checkbox: "",
  });

  const [kullanicilar, setKullanicilar] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      setKullanicilar(response.data.data);
    } catch (error) {
      console.error("Veri alınırken bir hata oluştu: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Use Effect");
  }, [data]);

  //   const [name, setName] = useState("");
  //   const [surname, setSurname] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [checkbox, setcheckbox] = useState("");

  const dataFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("İsim alanı boş bırakılamaz!")
      .min(3, "İsim 3 karakterden az olamaz!")
      .max(25, "İsim 25 karakterden çok olamaz!"),
    surname: Yup.string()
      .required("Soyisim alanı boş bırakılamaz!")
      .min(3, "İsim 3 karakterden az olamaz!")
      .max(25, "İsim 25 karakterden çok olamaz!"),
    email: Yup.string()
      .required("E-mail alanı boş bırakılamaz!")
      .email("Lütfen geçerli bir e-mail adresi giriniz."),
    password: Yup.string()
      .required("Şifre alanı boş bırakılamaz!")
      .min(4, "Şifre 4 karakterden az olamaz!")
      .max(8, "Şifre 8 karakterden çok olamaz!"),
    checkbox: Yup.boolean(),
  });

  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });

    checkValidationFor(name, type === "checkbox" ? checked : value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form Data: ", data);

    for (let key in data) {
      console.log("checkValidationFor(key, data[key]) > ", key, data[key]);
      checkValidationFor(key, data[key]);
    }

    if (!formValid) {
      console.log("FORM SUBMIT EDİLDİ! ", e);

      const endpoint = "https://reqres.in/api/users";

      axios
        .post(endpoint)
        .then((res) => {
          console.log("ürün başarıyla kaydedildi!", res);
        })
        .catch((err) => {
          console.error("Ürün kaydedilirken bir hata ile karşılaşıldı: ", err);
        });
    }
  };

  const checkValidationFor = (field, value) => {
    Yup.reach(dataFormSchema, field)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [field]: "" });
      })
      .catch((err) => {
        console.log("HATA! ", field, err.errors[0]);

        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [field]: err.errors[0],
        }));
      });
  };

  const { name, surname, email, password, checkbox } = data;

  useEffect(() => {
    dataFormSchema.isValid(data).then((valid) => setFormValid(valid));
  }, [data]);

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
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Soyisim</Form.Label>
          <Form.Control
            id="surname"
            type="text"
            placeholder="Soy isminizi Girin"
            value={surname}
            onChange={inputChangeHandler}
            name="surname"
            isInvalid={!!formErrors.surname}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.surname}
          </Form.Control.Feedback>
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
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
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
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
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

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <h>Kullanıcılar</h>
        {kullanicilar.map((user, ind) => (
          <pre key={ind}>{JSON.stringify(user, null, 2)}</pre>
        ))}
      </div>
    </>
  );
}

export default CreateForm;
