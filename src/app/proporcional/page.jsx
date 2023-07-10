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
    <form name="form_main" className="grid">
      <div className="text-center">
        <ul>
          <li>
            <figure className="-mt-1">
              <Image
                src={image5}
                alt="Cadastrar Ramal"
                className="w-screen h-[50vh]"
              />
            </figure>
          </li>
        </ul>

        <ul>
          <li className="inline-block">
            <label htmlFor="date_ini">Data Inicial:</label>
            <input
              onChange={countDays}
              name="date_ini"
              id="date_ini"
              type="date"
              autoFocus
            />
          </li>
          <li className="inline-block">
            <label htmlFor="date_end">Data Final:</label>
            <input
              onChange={countDays}
              name="date_end"
              id="date_end"
              type="date"
            />
          </li>
        </ul>
      </div>

      <div className="text-center">
        <ul>
          <li className="inline-block">
            <input
              onChange={countDays}
              type="radio"
              className="btn-check"
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
            <label className="btn btn-outline-danger" htmlFor="danger-outlined">
              NÃO INCLUIR
            </label>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <ul>
          <li className="inline-block">
            <div className="input-group mb-3">
              <span className="input-group-text">VALOR - PLANO:</span>
              <input
                id="plano"
                onKeyUp={contarpelovalor}
                type="number"
                className="form-control"
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
                className="form-control"
                onKeyPress={(event) =>
                  event.charCode >= 48 && event.charCode <= 57
                }
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <strong>
          <p id="formula">{formula}</p>
        </strong>
        <strong>
          <h2 id="res">
            Resultado: <br />
            {resultado}
          </h2>
        </strong>
      </div>

      <div className="text-center">
        <button
          id="btn"
          className="btn btn-green btn-success"
          type="button"
          onClick={countDays}
        >
          CALCULAR
        </button>
      </div>
    </form>
  );
}
