"use client";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import image5 from "../../../public/img/proppc.webp";
import Image from "next/image";

export default function ProporcionalPage() {
  const [resultado, setResultado] = useState("R$ 0,00");
  const [formula, setFormula] = useState("");

  const countDays = () => {
    const dateIni = new Date(document.form_main.date_ini.value);
    const dateEnd = new Date(document.form_main.date_end.value);

    const diff = dateEnd.getTime() - dateIni.getTime();
    const incluirDia = document.getElementById("incluirdia").checked;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (!incluirDia) {
      days -= 1;
    }

    const plano = document.getElementById("plano").value;
    const valorPlano = Number(plano);
    const resultado = (valorPlano / 30) * days;
    const reais = resultado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setResultado(reais);

    const valorFormula = valorPlano.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setFormula(
      `FÓRMULA: \nVALOR DO PLANO ${valorFormula} ÷ 30 x ${days} DIAS PASSADOS`
    );
  };

  const contarpelosdias = () => {
    const plano = document.getElementById("plano").value;
    const valorPlano = Number(plano);
    const days = Number(document.getElementById("days").value);
    const resultado = (valorPlano / 30) * days;
    const reais = resultado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setResultado(reais);
    setFormula(
      `FÓRMULA: \nVALOR DO PLANO R$ ${valorPlano} ÷ 30 x ${days} DIAS PASSADOS`
    );
  };

  const contarpelovalor = () => {
    const plano = document.getElementById("plano").value;
    const valorPlano = Number(plano);
    const days = Number(document.getElementById("days").value);
    const resultado = (valorPlano / 30) * days;
    const reais = resultado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setResultado(reais);
    setFormula(
      `FÓRMULA: \nVALOR DO PLANO R$ ${valorPlano} ÷ 30 x ${days} DIAS PASSADOS`
    );
  };

  return (
    <form name="form_main" className="grid bg-light rounded-tl-3xl">
      <div className=" items-center text-center  h-[50vh]">
        <figure className="-mt-1 ">
          <img
            src="https://conect.oficialcomdesconto.com/wp-content/uploads/2022/09/proppc.webp"
            alt="Cadastrar Ramal"
            className="w-screen rounded-tl-3xl -mt-2 h-[30vh] object-cover"
          />
        </figure>
        <div className="text-center justify-center items-center self-center  ">
          <ul className="flex mt-10 justify-center ">
            <li className=" grid mr-3  ">
              <label className="" htmlFor="date_ini ">
                Data Inicial:
              </label>
              <input
                onChange={countDays}
                className="border border-black rounded-md"
                name="date_ini"
                id="date_ini"
                type="date"
                autoFocus
              />
            </li>
            <li className=" grid ml-3 ">
              <label className="" htmlFor="date_end">
                Data Final:
              </label>
              <input
                className="border border-black rounded-md"
                onChange={countDays}
                name="date_end"
                id="date_end"
                type="date"
              />
            </li>
          </ul>
        </div>
        <div className="text-center mt-5 flex justify-center m-3 bg-pt-3 ">
          <ul className="flex gap-5 mr-4 grid-cols-2 ">
            <li className=" grid  mr-16 ">
              <label
                className="btn btn-outline-success text-white bg-green-800
                hover:border-green-800 hover:text-black hover:bg-blue-300"
                htmlFor="incluirdia"
              >
                INCLUIR DATA INICIAL
              </label>
            </li>
            <li className=" grid -ml-16">
              <label
                className="btn border border-red-500 text-red-500 btn-outline-danger
                hover:bg-red-500 hover:text-black"
                htmlFor="danger-outlined"
              >
                NÃO INCLUIR
              </label>
            </li>
          </ul>
        </div>
        <div className="text-center mt-5 pt-3">
          <ul className="flex justify-center gap-5 grid-cols-2">
            <li className="inline-block">
              <div className="input-group mb-3">
                <span className="input-group-text">VALOR - PLANO:</span>
                <input
                  id="plano"
                  onKeyUp={contarpelovalor}
                  type="number"
                  className="form-control border border-black"
                  placeholder="Ex: 60"
                  step="any"
                />
              </div>
            </li>
            <li className="inline-block">
              <div className="input-group mb-3">
                <span className="input-group-text">DIAS PASSADOS:</span>
                <input
                  id="days"
                  onKeyUp={contarpelosdias}
                  type="number"
                  className="form-control border border-black"
                  onKeyPress={(event) =>
                    event.charCode >= 48 && event.charCode <= 57
                  }
                />
              </div>
            </li>
          </ul>
        </div>
        <div className=" mt-10">
          <strong>
            <p id="formula">{formula}</p>
          </strong>
          <strong>
            <h2 className="text-green-700 text-3xl" id="res">
              Resultado: <br />
              {resultado}
            </h2>
          </strong>
        </div>
        <div className="text-center pt-5">
          <button
            id="btn"
            className="btn bg-blue-900 border-none text-white hover:bg-green-800 hover:text-black btn-success"
            type="button"
            onClick={countDays}
          >
            CALCULAR
          </button>
        </div>
      </div>
    </form>
  );
}
