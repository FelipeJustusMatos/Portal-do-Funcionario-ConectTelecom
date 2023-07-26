"use client";
import Image from "next/image";
import image from "../../public/img/CARROS.webp";
import image2 from "../../public/img/cadastrar_ramal.webp";
import image3 from "../../public/img/API-SUPORTE.png";
import image4 from "../../public/img/lista_ramais.webp";
import image5 from "../../public/img/simples.webp";
import image6 from "../../public/img/troca_plano.webp";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="flex w-full  min-h-screen bg-light">
        <div className="w-full flex flex-col mt-5 justify-center items-center lg:overflow-y-scroll">
          <div className="grid grid-cols-3 gap-10 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 ">
            {/* card 1 */}
            <div className="card card-compact  bg-base-100 w-72 shadow-xl lg:w-60  ">
              <figure>
                <Image
                  src={image5}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Proporcional Simples</h2>
                <p className="">Calcule o valor proporcional entre duas ⠀⠀</p>
                <div className="card-actions justify-center">
                  <button
                    type="button"
                    onClick={() => router.push("/proporcional")}
                    className="btn w-full bg-blue-700 hover:bg-green-700 text-white "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            {/* card 2 */}
            <div className="card card-compact bg-base-100 w-72 shadow-xl lg:w-60 ">
              <figure>
                <Image
                  src={image6}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Troca de Plano</h2>
                <p>
                  Calcule o valor proporcional da troca de plano preenchendo as
                  3 datas
                </p>
                <div className="card-actions justify-center">
                  <button
                    type="button"
                    onClick={() => router.push("/trocadeplano")}
                    className="btn w-full bg-blue-700 text-white hover:bg-green-700 "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div className="card card-compact bg-base-100 w-72 shadow-xl lg:w-60 ">
              <figure>
                <Image
                  src={image4}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Lista de Ramais</h2>
                <p>Ache o ramal rapidamente por nome ou local</p>
                <div className="card-actions justify-center">
                  <button
                    type="button"
                    onClick={() => router.push("/listramais")}
                    className="btn w-full bg-blue-700 hover:bg-green-700 text-white "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            {/* col 1 row 2 */}
            <div className="card card-compact bg-base-100 w-72 shadow-xl lg:w-60 ">
              <figure>
                <Image
                  src={image2}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Cadastrar Ramal</h2>
                <p>
                  Cadastre ou atualize o seu ramal rapidamente, lembrando que o
                  prazo para atualização é no máximo 24h
                </p>
                <div className="card-actions justify-center">
                  <button
                    type="button"
                    onClick={() => router.push("/ramais")}
                    className="btn w-full bg-blue-700 hover:bg-green-700 text-white "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            {/* col 2 row 2 */}
            <div className="card card-compact bg-base-100 w-72 shadow-xl lg:w-60 ">
              <figure>
                <Image
                  src={image}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Gestão de Carros</h2>
                <p>
                  Gerenciamento dos carros, acesso limitado para usuários
                  autenticados
                </p>
                <div className="card-actions justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleButtonClick("https://conect-veiculos.netlify.app/")
                    }
                    className="btn w-full bg-blue-700 hover:bg-green-700 text-white "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
            {/* col 3 row 2 */}
            <div className="card card-compact bg-base-100 w-72 shadow-xl lg:w-60 ">
              <figure>
                <Image
                  src={image3}
                  alt="Cadastrar Ramal"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">API Suporte</h2>
                <p>
                  Ver sinal da ONU pelo MAC do roteador / Achar OLT em que ONU
                  esta⠀
                </p>
                <div className="card-actions justify-center ">
                  <button
                    type="button"
                    onClick={() => handleButtonClick("http://10.0.9.20/")}
                    className="btn w-full bg-blue-700 hover:bg-green-700 text-white "
                  >
                    Acessar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
