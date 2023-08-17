"use client";
import { useState } from "react";
import image5 from "../../../public/img/proppc.webp";
import image4 from "../../../public/img/propmobile.webp";
import Image from "next/image";

const DateSubtraction = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [plano, setPlano] = useState(0);
  const [includeDay, setIncludeDay] = useState(true);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handlePlanoChange = (e) => {
    setPlano(parseFloat(e.target.value));
  };

  const toggleIncludeDay = () => {
    setIncludeDay(!includeDay);
  };

  const calculateDaysPassed = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDiff = endDateObj.getTime() - startDateObj.getTime();
    const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysPassed;
  };

  const calculateResult = () => {
    const days = includeDay ? calculateDaysPassed() + 1 : calculateDaysPassed();
    const result = (plano / 30) * days;
    return isNaN(result) ? "0.00" : result.toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <div className="min-w-screen">
        <figure className="sm:hidden">
          <Image
            src={image5}
            alt="Cadastrar Ramal"
            className="w-screen rounded-tl-3xl md:rounded-none h-[30vh] object-cover"
          />
        </figure>
        <figure className="-mt-1 ms:hidden">
          <Image
            src={image4}
            alt="Cadastrar Ramal"
            className="w-screen rounded-none -mt-2 h-[20vh]"
          />
        </figure>
        <div className="text-center justify-center items-center self-center  ">
          <ul className="flex mt-10 sm:mt-5 justify-center sm:flex-col sm:col-span-1 ">
            <li className=" grid mr-3 sm:mr-0 sm:justify-center">
              <label className=" w-full">Data Inicial:</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border border-black rounded-md sm:w-[33vh]"
              />
            </li>
            <li className=" grid ml-3 sm:ml-0 sm:justify-center ">
              <label>Data Final:</label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border border-black rounded-md sm:w-[33vh]"
              />
            </li>
          </ul>
        </div>
        <div className="text-center mt-5 flex justify-center m-3 bg-pt-3 ">
          <ul className="flex gap-5 mr-4 grid-cols-2 ">
            <li>
              <button
                className={`btn ${
                  includeDay
                    ? "btn-outline-success bg-slate-100 text-red-500 border-red-500  hover:border-red-500 hover:text-black hover:bg-blue-300"
                    : "btn-outline-danger bg-green-800 text-white hover:border-green-800 hover:text-black "
                }`}
                onClick={toggleIncludeDay}
              >
                {includeDay ? "Não Incluir Dia Inicial" : "Incluir Dia Inicial"}
              </button>
            </li>
          </ul>
        </div>
        <div className="text-center mt-5 pt-3">
          <ul className="flex justify-center items-center gap-5 grid-cols-2 sm:flex-col sm:col-span-1 ">
            <li className="inline-block">
              <div className="input-group mb-3 sm:mb-0 justify-center ">
                <span className="input-group-text ">
                  <p className="w-full ">VALOR - PLANO:</p>
                </span>
                <input
                  id="plano"
                  type="number"
                  onChange={handlePlanoChange}
                  className="form-control border border-black"
                  placeholder="Ex: 60"
                />
              </div>
            </li>
            <li className="inline-block">
              <div className="input-group mb-3 sm:mb-0">
                <span className="input-group-text">Dias Passados:</span>
                <input
                  type="number"
                  className="form-control border border-black text-center"
                  value={calculateDaysPassed()}
                  readOnly
                />
              </div>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className=" mt-5 text-center">
              <p className="w-full text-2xl font-bold text-green-900">
                Resultado
              </p>
              <input
                type="text"
                className="text-center font-bold text-2xl text-green-800"
                value={formatCurrency(calculateResult())}
                readOnly
              />
            </li>
            <li className="mt-5 text-center">
              <p>
                Fórmula: ({plano} / 30) * {calculateDaysPassed()} ={" "}
                {formatCurrency(calculateResult())}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DateSubtraction;
