"use client";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import image5 from "../../../public/img/simples.webp";
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
    <form name="form_main" className="grid ">
      <ul>
        <li>
          <figure className="-mt-1">
            <Image
              src={image5}
              alt="Cadastrar Ramal"
              className="w-screen rounded-tl-3xl -mt-2 h-[30vh] object-fill"
            />
          </figure>
        </li>
      </ul>
      <div className=" items-center text-center mt-12 h-[50vh]">
        <div className="text-center bg-gray-700 ">
          <ul className="grid grid-cols-2 ">
            <li className=" grid justify-center  ">
              <label className="text-white" htmlFor="date_ini ">
                Data Inicial:
              </label>
              <input
                onChange={countDays}
                className="border border-black rounded-lg"
                name="date_ini"
                id="date_ini"
                type="date"
                autoFocus
              />
            </li>
            <li className=" grid justify-center ">
              <label className="text-white" htmlFor="date_end">
                Data Final:
              </label>
              <input
                className="border  border-black  rounded-lg"
                onChange={countDays}
                name="date_end"
                id="date_end"
                type="date"
              />
            </li>
          </ul>
        </div>
        <div className="text-center pt-3 ">
          <ul>
            <li className="inline-block">
              <input
                onChange={countDays}
                type="radio"
                className="btn-check "
                name="options-outlined"
                id="incluirdia"
                defaultChecked
              />
              <label className="btn btn-outline-success" htmlFor="incluirdia">
                INCLUIR DATA INICIAL
              </label>
            </li>
            <li className="inline-block">
              <input
                onChange={countDays}
                type="radio"
                className="btn-check"
                name="options-outlined"
                id="danger-outlined"
              />
              <label
                className="btn btn-outline-danger"
                htmlFor="danger-outlined"
              >
                NÃO INCLUIR
              </label>
            </li>
          </ul>
        </div>
        <div className="text-center pt-3">
          <ul className="grid grid-cols-2">
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
        <div className="pt-5">
          <strong>
            <p id="formula">{formula}</p>
          </strong>
          <strong>
            <h2 className=" bg-green-700 text-white" id="res">
              Resultado: <br />
              {resultado}
            </h2>
          </strong>
        </div>
        <div className="text-center pt-5">
          <button
            id="btn"
            className="btn bg-blue-900 border-none text-white hover:text-black hover:bg-white btn-success"
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
