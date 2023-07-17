"use client";
import { useState, useEffect } from "react";
import image5 from "../../../public/img/lista_ramais.webp";
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
        const response = await fetch("http://localhost:3000/api/ramais");
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
    <div className="container min-h-[95vh] mx-auto">
      <ul>
        <li>
          <figure className="-mt-1">
            <Image
              src={image5}
              alt="Cadastrar Ramal"
              className="w-screen h-[40vh] object-cover"
            />
          </figure>
        </li>
      </ul>
      <div className="border border-solid rounded-md  max-h-[50vh] overflow-y-scroll">
        <table className="table">
          <thead className="sticky top-0 border-2 border-solid  bg-white z-10">
            <tr>
              <th
                scope="col"
                className="text-black"
                onClick={() => handleSort("ramal")}
              >
                Ramal{" "}
                {sortBy === "ramal" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                scope="col"
                className="text-black"
                onClick={() => handleSort("nome")}
              >
                Nome{" "}
                {sortBy === "nome" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                scope="col"
                className="text-black"
                onClick={() => handleSort("local")}
              >
                Local{" "}
                {sortBy === "local" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th>
                <select
                  id="locationSelect"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="w-full text-black"
                >
                  <option value="">Selecione um Local</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </th>
              <th className="text-black">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="ml-2 p-1 border border-black"
                  placeholder="Pesquisar por nome"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => (
              <tr key={item.ramal}>
                <td>{item.ramal}</td>
                <td>{item.nome}</td>
                <td>{item.local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRamaisPage;
