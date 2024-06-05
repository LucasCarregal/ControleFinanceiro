"use client";
import Papa from "papaparse";
const XLSX = require("xlsx");

import { useState } from "react";
import { Alert, Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

import Container from "./components/Container";
import Dropzone from "./components/Dropzone";
import Tabela from "./components/Tabela";
import Select from "./components/Select";

const heads = ["Data", "Nome", "Valor", "Categoria"];
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
          <>
            <Button outline pill className="self-start" onClick={setDespesas}>
              <HiOutlineArrowLeft className="h-6 w-6" />
            </Button>
            <Tabela heads={Object.keys(despesas[0])} data={despesas} />
          </>
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

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    xlsx = XLSX.utils.sheet_to_json(worksheet);

    xlsx = xlsx.map((row) => {
      row = changeCategoryToSelect(row, categoryOptions);
      row.Data = convertExcelDate(row.Data);
      return row;
    });

    setDespesas(xlsx);
  };

  reader.readAsArrayBuffer(file);
}

function changeCategoryToSelect(despesa, options) {
  let selectedCategory = options.includes(despesa.Categoria)
    ? despesa.Categoria
    : "OUTROS";
  despesa.Categoria = <Select options={options} selected={selectedCategory} />;
  return despesa;
}

function convertExcelDate(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return utcDate.toLocaleDateString();
}
