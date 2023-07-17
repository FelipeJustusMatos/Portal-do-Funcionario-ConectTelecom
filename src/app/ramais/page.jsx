import Image from "next/image";
import image from "../../../public/img/cadastrar_ramal.webp";

export default function RamaisPage() {
  return (
    <>
      <main className="flex w-full ">
        <figure className="-mt-1">
          <Image
            src={image}
            alt="Cadastrar Ramal"
            className="w-screen -mt-2 rounded-tl-3xl h-[40vh] object-cover"
          />
        </figure>
      </main>
    </>
  );
}
