"use client";
import React from "react";

const DateSubtraction = () => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const calculateDaysPassed = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDiff = endDateObj.getTime() - startDateObj.getTime();
    const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysPassed;
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
          <label className="">Valor do Plano</label>
          <input id="plano" type="number" className="text-center" />
        </li>
      </ul>
    </div>
  );
};

export default DateSubtraction;
