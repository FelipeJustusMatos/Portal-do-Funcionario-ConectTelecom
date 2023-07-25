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
    <div className="flex mx-auto md:min-w-screen">
      <div className="md:min-w-screen">
        <figure className="-mt-1  md:mt-0">
          <Image
            src={image}
            alt="Cadastrar Ramal"
            className="w-screen  rounded-t-3xl md:rounded-none xs:rounded-none -mt-2 md:mt-0 h-[30vh]  object-fill"
          />
        </figure>

        <div className="border border-black max-h-[70vh]  xs:max-w-sm overflow-y-scroll">
          <div className="table sm:grid justify-center items-center table-zebra">
            <div className="table-header-group sticky top-0 border-2 sm:pb-2 bg-gray-700 z-10">
              <div className="table-row sm:grid sm:grid-cols-3  text-gray-100">
                <div
                  className="table-cell text-center"
                  scope="col"
                  onClick={() => handleSort("ramal")}
                >
                  Ramal{" "}
                  {sortBy === "ramal" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
                <div
                  className="table-cell text-center"
                  scope="col"
                  colSpan="2"
                  onClick={() => handleSort("nome")}
                >
                  Nome{" "}
                  {sortBy === "nome" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>
                <div className="table-cell sm:hidden  items-center justify-start">
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
                  className="table-cell text-center"
                  scope="col"
                  colSpan="2"
                  onClick={() => handleSort("local")}
                >
                  Local{" "}
                  {sortBy === "local" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </div>

                <div className="table-cell sm:hidden text-black">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="ml-20 p-1 border border-black"
                    placeholder="Pesquisar por nome"
                  />
                </div>
              </div>{" "}
              {/* mobile */}
              <div className="ms:hidden w-full table-row sm:grid sm:grid-cols-2 sm:justify-center sm:items-center">
                <div className="table-cell sm:flex  sm:items-center sm:justify-center">
                  <select
                    id="locationSelect"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className="w-1/2 ml-20 sm:w-4/5 sm:h-[23px] sm:ml-0 text-black"
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
                <div className="table-cell sm:flex  sm:items-center sm:justify-center ">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className=" w-1/2 sm:w-4/5 sm:h-[25px] ml-0 p-1  border text-black border-black"
                    placeholder="Pesquisar por nome"
                  />
                </div>
              </div>
            </div>
            <tbody>
              {filteredData?.map((item) => (
                <tr className="w-full " key={item.ramal}>
                  <td className="w-1/5" colSpan="1">
                    {item.ramal}
                  </td>
                  <td colSpan="3">{item.nome}</td>
                  <td colSpan="3">{item.local}</td>
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
