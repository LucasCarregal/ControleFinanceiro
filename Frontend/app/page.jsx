"use client";
import Papa from "papaparse";
const XLSX = require("xlsx");

import { useState } from "react";
import { Alert } from "flowbite-react";

import Container from "./components/Container";
import Dropzone from "./components/Dropzone";
import Tabela from "./components/Tabela";
import Select from "./components/Select";

const keys = ["Data", "Nome", "Valor", "Categoria"];
const categoryOptions = [
  "TRANSPORTE",
  "SUPERMERCADO",
  "RESTAURANTES",
  "DROGARIA",
  "COMPRAS",
  "OUTROS",
];

export default function Home() {
  const [despesas, setDespesas] = useState([]);
  const [alert, setAlert] = useState("");

  const readFile = (files) => {
    if (verifyTypeOfFile(files[0]) === "csv") {
      parseCsvToJson(files[0], setDespesas);
      return;
    }
    if (
      verifyTypeOfFile(files[0]) === "xls" ||
      verifyTypeOfFile(files[0]) === "xlsx"
    ) {
      parseXlsxToJson(files[0], setDespesas);
      return;
    }
    setAlert(<Alert color="failure">Tipo de arquivo invalido</Alert>);
    setTimeout(() => {
      setAlert();
    }, 3000);
  };

  return (
    <>
      <Container>
        {alert}
        {despesas.length > 0 ? (
          <Tabela heads={Object.keys(despesas[0])} data={despesas} />
        ) : (
          <Dropzone handleChangeFile={readFile} />
        )}
      </Container>
    </>
  );
}

/***   FUNCTIONS   ***/
function verifyTypeOfFile(file) {
  return file.name.split(".").at(-1);
}

function parseCsvToJson(file, setDespesas) {
  Papa.parse(file, {
    complete: (results) => {
      let keys = results.data[0];
      results.data.shift();

      let data = [];

      results.data.forEach((element) => {
        let row = {};
        keys.forEach((key, index) => {
          row = {
            ...row,
            [key]: element[index],
          };
        });

        data.push(row);
      });
      console.log(data);

      data = data.map((e) => changeCategoryToSelect(e, categoryOptions));
      setDespesas(data);
    },
  });
}

function parseXlsxToJson(file, setDespesas) {
  let xlsx;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    // Seleciona a primeira planilha
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Converte a planilha em JSON
    xlsx = XLSX.utils.sheet_to_json(worksheet);
    console.log(xlsx);

    xlsx = xlsx.map((e) => changeCategoryToSelect(e, categoryOptions));
    setDespesas(xlsx);
  };

  reader.readAsArrayBuffer(file);
}

function changeCategoryToSelect(despesa, options) {
  let selecetedCategory = despesa.Categoria;
  despesa.Categoria = <Select options={options} selected={selecetedCategory} />;
  return despesa;
}
