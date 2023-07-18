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
    <div className="container mx-auto">
      <ul>
        <li>
          <figure className="-mt-1">
            <Image
              src={image}
              alt="Cadastrar Ramal"
              className="w-screen rounded-tl-3xl -mt-2 h-[30vh] object-fill"
            />
          </figure>
        </li>
      </ul>
      <div className="border border-black max-h-[70vh] overflow-y-scroll">
        <table className="table table-zebra">
          <thead className="sticky top-0 border-2 bg-gray-700 z-10">
            <tr className=" text-gray-100">
              <th scope="col" onClick={() => handleSort("ramal")}>
                Ramal{" "}
                {sortBy === "ramal" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th scope="col" colSpan="2" onClick={() => handleSort("nome")}>
                Nome{" "}
                {sortBy === "nome" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th>
                <select
                  id="locationSelect"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="w-1/2 ml-20 text-black"
                >
                  <option value="">Selecione um Local</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </th>
              <th scope="col" colSpan="2" onClick={() => handleSort("local")}>
                Local{" "}
                {sortBy === "local" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>

              <th className="text-black">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="ml-20 p-1 border border-black"
                  placeholder="Pesquisar por nome"
                />
              </th>
            </tr>
          </thead>
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
        </table>
      </div>
    </div>
  );
};

export default ListRamaisPage;
