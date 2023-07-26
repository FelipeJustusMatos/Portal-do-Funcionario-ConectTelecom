"use client";
import { useState, useEffect } from "react";
import image from "../../../public/img/lista_ramais.webp";
import Image from "next/image";

const ListRamaisPage = () => {
  const [data, setData] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("ramal");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortedData, setSortedData] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ramais");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let sortedArray = null;
    if (data) {
      sortedArray = [...data];
      sortedArray.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue, "pt", { sensitivity: "base" });
        } else {
          return bValue.localeCompare(aValue, "pt", { sensitivity: "base" });
        }
      });
    }
    setSortedData(sortedArray);
  }, [data, sortOrder, sortBy]);

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setSortedData(null);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  let filteredData = sortedData;

  if (selectedLocation) {
    filteredData = filteredData?.filter(
      (item) => item.local === selectedLocation
    );
  }

  if (searchValue) {
    filteredData = filteredData?.filter((item) =>
      item.nome.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const locations = [...new Set(data?.map((item) => item.local))];

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex rounded-tl-3xl mx-auto min-w-screen">
      <div className="min-w-screen">
        <figure className="min-w-screen md:mt-0">
          <Image
            src={image}
            alt="Cadastrar Ramal"
            className="w-screen min-w-screen rounded-tl-3xl md:rounded-none xs:rounded-none   h-[30vh]  object-fill"
          />
        </figure>

        <div className="border border-black max-h-[70vh]   xs:max-w-screen overflow-y-scroll">
          <div className="table sm:grid justify-center items-center table-zebra">
            <div className="table-header-group sticky top-0 border-2 sm:pb-2 bg-gray-700 z-10">
              <div className="table-row sm:mb-2 sm:mt-2 sm:grid sm:grid-cols-3  text-gray-100">
                <div
                  className="table-cell dm:w-1/5 text-center"
                  scope="col"
                  onClick={() => handleSort("ramal")}
                >
                  Ramal{" "}
                  {sortBy === "ramal" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
                <div
                  className="table-cell dm:w-1/5 text-center"
                  scope="col"
                  onClick={() => handleSort("nome")}
                >
                  Nome{" "}
                  {sortBy === "nome" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
                <div className="table-cell dm:w-1/5 sm:hidden  items-center justify-start">
                  <select
                    id="locationSelect"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className="w-1/2 ml-20 text-center text-black"
                  >
                    <option value="">Selecione um Local</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="table-cell dm:w-1/5  text-center"
                  scope="col"
                  onClick={() => handleSort("local")}
                >
                  Local{" "}
                  {sortBy === "local" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>

                <div className="table-cell dm:w-1/5 sm:hidden text-black">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="ml-20 p-1 border border-black"
                    placeholder="Pesquisar por nome"
                  />
                </div>
              </div>
              <div className="ms:hidden w-full table-row  sm:grid sm:grid-cols-2 sm:justify-center sm:items-center">
                <div className="table-cell  sm:flex  sm:items-center sm:justify-center">
                  <select
                    id="locationSelect"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className=" ml-20 sm:w-4/5 sm:h-[23px] sm:ml-0 text-black"
                  >
                    <option value="">Selecione um Local</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                {/* pesquisa */}
                <div className="table-cell  sm:flex  sm:items-center sm:justify-center ">
                  <div className="flex justify-self-center items-center">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={handleSearchChange}
                      className="sm:w-4/5 sm:h-[25px]  p-1  border text-black border-black"
                      placeholder="Pesquisar por nome"
                    />
                  </div>
                </div>
              </div>
            </div>
            <tbody>
              {filteredData?.map((item) => (
                <tr className="w-full " key={item.ramal}>
                  <td className="w-1/5" colSpan="1">
                    {item.ramal}
                  </td>
                  <td colSpan="2">{item.nome}</td>
                  <td colSpan="4">{item.local}</td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRamaisPage;
