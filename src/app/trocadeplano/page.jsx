import Image from "next/image";
import image5 from "../../../public/img/troca_plano.webp";

export default function PlanoPage() {
  return (
    <>
      <main className="flex  w-full  ">
        <figure className="-mt-1">
          <Image
            src={image5}
            alt="Cadastrar Ramal"
            className="w-screen -mt-2 rounded-tl-3xl h-[30vh] object-fill"
          />
        </figure>
      </main>
    </>
  );
}
