import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Ícone de seta
import freelancerImage from "../assets/freelancer.png";

export default function About() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-12 max-w-7xl mx-auto gap-10">
      
      <div className="w-full lg:w-1/2 text-center lg:text-left p-2">
        <h1 className="text-4xl font-bold mb-4 text-sky-700">Quem somos</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          O <span className="font-semibold">Connect Freela</span> é uma plataforma feita para quem vive do próprio talento.
          Aqui, você pode cadastrar os serviços que oferece como freelancer, como design, programação, escrita e muito mais.
          Além disso, você também pode explorar serviços de outros profissionais e encontrar as pessoas certas para seus projetos.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Nossa missão é conectar talentos a oportunidades de forma simples, rápida e eficiente.
          Seja para vender ou contratar, o Connect Freela é o lugar certo para quem valoriza o trabalho independente.
        </p>

        <div className="mt-6 flex justify-center lg:justify-start">
          <Link
            to="/service"
            className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
          >
            Ver serviços disponíveis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={freelancerImage}
          alt="Homem freelancer trabalhando"
          className="w-full max-w-md rounded-2xl drop-shadow-xl"
        />
      </div>
    </section>
  );
}
