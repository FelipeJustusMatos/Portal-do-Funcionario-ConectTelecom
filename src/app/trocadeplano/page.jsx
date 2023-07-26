"use client";
import { useState } from "react";
import Image from "next/image";
import image5 from "../../../public/img/troca_plano.webp";

export default function CalculadoraProporcional() {
  const [dateIni, setDateIni] = useState("");
  const [dateMid, setDateMid] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [planoAntigo, setPlanoAntigo] = useState("");
  const [planoNovo, setPlanoNovo] = useState("");
  const [resultado, setResultado] = useState(0);

  const contarPlano = () => {
    const diffAntigo = new Date(dateMid) - new Date(dateIni);
    const diffNovo = new Date(dateEnd) - new Date(dateMid);

    if (diffAntigo === 0) {
      const dateIgualPlanoNovoValue = Number(planoNovo).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );
      setResultado(dateIgualPlanoNovoValue);
    } else if (diffAntigo === 0) {
      const dateIgualPlanoAntigoValue = Number(planoAntigo).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );
      setResultado(dateIgualPlanoAntigoValue);
    } else if (new Date(dateIni) > new Date(dateMid)) {
      setResultado("R$ 0,00");
    } else if (new Date(dateEnd) < new Date(dateIni)) {
      setResultado("R$ 0,00");
    } else if (new Date(dateEnd) < new Date(dateMid)) {
      setResultado("R$ 0,00");
    } else {
      const incluirdia = document.getElementById("incluirdia").checked;

      let daysAntigo;
      let daysNovo;

      if (incluirdia) {
        daysAntigo = Math.floor(diffAntigo / (1000 * 60 * 60 * 24) - 1);
        daysNovo = Math.floor(diffNovo / (1000 * 60 * 60 * 24) + 1);
      } else {
        daysAntigo = Math.floor(diffAntigo / (1000 * 60 * 60 * 24));
        daysNovo = Math.floor(diffNovo / (1000 * 60 * 60 * 24));
      }

      const resultadoAntigo = (planoAntigo / 30) * daysAntigo;
      const resultadoNovo = (planoNovo / 30) * daysNovo + resultadoAntigo;
      const reaisNovo = resultadoNovo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      if (isNaN(resultadoNovo)) {
        setResultado("R$ 0,00");
      } else {
        setResultado(reaisNovo);
      }
    }
  };

  const handleDateIniChange = (event) => {
    setDateIni(event.target.value);
    contarPlano();
  };

  const handleDateMidChange = (event) => {
    setDateMid(event.target.value);
    contarPlano();
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
    contarPlano();
  };

  const handlePlanoAntigoChange = (event) => {
    setPlanoAntigo(event.target.value);
    contarPlano();
  };

  const handlePlanoNovoChange = (event) => {
    setPlanoNovo(event.target.value);
    contarPlano();
  };

  return (
    <div className="flex rounded-tl-3xl mx-auto min-w-screen">
      <div className="min-w-screen">
        <figure className="min-w-screen md:mt-0">
          <Image
            src={image5}
            alt="Cadastrar Ramal"
            className="w-screen min-w-screen rounded-tl-3xl md:rounded-none xs:rounded-none   h-[30vh]  object-fill"
          />
        </figure>

        <div className="mx-auto max-w-md">
          <form className="mt-8 space-y-6">
            <div className="text-center justify-center items-center self-center  ">
              <ul className="flex mt-10 sm:mt-5 justify-center sm:flex-col sm:col-span-1 ">
                <li className=" grid mr-3 sm:mr-0 sm:justify-center sm:mb-3">
                  <label htmlFor="date_ini" className="font-medium">
                    ÚLTIMO VENCIMENTO:
                  </label>
                  <input
                    onChange={handleDateIniChange}
                    value={dateIni}
                    id="date_ini"
                    name="date_ini"
                    type="date"
                    className="border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    autoFocus
                  />
                </li>
                <li className=" grid mr-3 sm:mr-0 sm:justify-center sm:mb-3">
                  <label htmlFor="date_mid" className="font-medium">
                    DATA DA SOLICITAÇÃO:
                  </label>
                  <input
                    onChange={handleDateMidChange}
                    value={dateMid}
                    id="date_mid"
                    name="date_mid"
                    type="date"
                    className="border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </li>
                <li className=" grid mr-3 sm:mr-0 sm:justify-center">
                  <label htmlFor="date_end" className="font-medium">
                    PRÓXIMO VENCIMENTO:
                  </label>
                  <input
                    onChange={handleDateEndChange}
                    value={dateEnd}
                    id="date_end"
                    name="date_end"
                    type="date"
                    className="border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h5 className="text-center font-medium">
                SOLICITOU EM QUAL TURNO?
              </h5>
              <div className="flex justify-center mt-2 space-x-2">
                <label
                  htmlFor="incluirdia"
                  className="btn text-white bg-green-800
                  hover:border-green-800 hover:text-black hover:bg-blue-300 btn-outline-success"
                >
                  <input
                    onChange={contarPlano}
                    type="radio"
                    className=" btn-check"
                    name="options-outlined"
                    id="incluirdia"
                    autoComplete="off"
                    checked
                  />
                  MANHÃ
                </label>

                <label
                  htmlFor="danger-outlined"
                  className="btn bg-blue-700 hover:bg-green-700 text-white btn-outline-danger"
                >
                  <input
                    onChange={contarPlano}
                    type="radio"
                    className="btn-check"
                    name="options-outlined"
                    id="danger-outlined"
                    autoComplete="off"
                  />
                  TARDE / NOITE
                </label>
              </div>
            </div>

            <div className="text-center justify-center items-center self-center  ">
              <ul className="sm:flex sm:flex-col sm:col-span-1 sm:justify-center ">
                <li className="justify-center items-center">
                  <label htmlFor="plano_antigo" className="font-medium">
                    VALOR DO PLANO ANTIGO:
                  </label>
                  <input
                    onChange={handlePlanoAntigoChange}
                    value={planoAntigo}
                    id="plano_antigo"
                    name="plano_antigo"
                    type="number"
                    className="border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Ex: 60"
                    step="any"
                  />
                </li>
                <li>
                  <label htmlFor="plano_novo" className="font-medium">
                    VALOR DO PLANO NOVO:
                  </label>
                  <input
                    onChange={handlePlanoNovoChange}
                    value={planoNovo}
                    id="plano_novo"
                    name="plano_novo"
                    type="number"
                    className="border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Ex: 80"
                    step="any"
                  />
                </li>
              </ul>
            </div>

            <div>
              <strong>
                <p id="formulas" />
              </strong>
              <div className="alert alert-success ">
                <h4 className="alert-heading">FÓRMULA:</h4>
                <hr />
                <br />
                <p id="formula"></p>
                <div id="aviso" />
              </div>

              <strong className="flex justify-center">
                <h2 className="text-green-700 text-3xl sm:text-xl" id="res">
                  Resultado: <br className="sm:hidden" />
                  {resultado}
                </h2>
              </strong>
            </div>

            <div className="flex justify-center space-x-4  ">
              <button
                className="btn btn-green btn-success"
                type="button"
                onClick={contarPlano}
              >
                CALCULAR
              </button>
              <button className="btn btn-outline-secondary " type="reset">
                LIMPAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
