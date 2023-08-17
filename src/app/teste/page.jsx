"use client";
import React, { useState } from "react";

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
    return result.toFixed(2);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="">
      <ul className="w-full">
        <li>
          <label>Data Inicial:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </li>
        <li>
          <label>Data Final:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </li>
        <li className="border rounded-r-lg">
          <label className="mr-2">Resultado</label>
          <input
            type="number"
            className="text-center"
            value={calculateDaysPassed()}
            readOnly
          />
        </li>
        <li className="border rounded-r-lg">
          <label>Valor do Plano</label>
          <input
            id="plano"
            type="number"
            className="text-center"
            onChange={handlePlanoChange}
          />
        </li>
        <li>
          <button onClick={toggleIncludeDay}>
            {includeDay ? "Não Incluir Dia" : "Incluir Dia"}
          </button>
        </li>
        <li className="border rounded-r-lg">
          <label>Valor Calculado</label>
          <input
            type="text"
            className="text-center"
            value={formatCurrency(calculateResult())}
            readOnly
          />
        </li>
        <li>
          <p>
            Fórmula: ({plano} / 30) * {calculateDaysPassed()} ={" "}
            {formatCurrency(calculateResult())}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DateSubtraction;
