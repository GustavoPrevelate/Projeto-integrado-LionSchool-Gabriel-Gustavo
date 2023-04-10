"use strict";

//As funções criadas abaixo retornam cards, com cada card tendo seu proprio nome e icone para indicar um curso especifico
//Que ao receber o click, o card redireciona o cliente para class.html que vai ser a pagina que vai conter vários cards
//Sendo cada card um aluno(Observação: os cards dos cursos só retornam os alunos que estão naquele curso especifico)
const todosCursosEscola = async function () {

  // Link da API que retorna todos os cursos da escola LionSchool
  const dadosCursos = "http://localhost:8080/v1/lion-school/cursos";

  const response = await fetch(dadosCursos);
  const data = await response.json();

  return {
    name: data.cursos.map((course) => course.nome),
    acronym: data.cursos.map((course) => course.sigla),
    icon: data.cursos.map((course) => course.icone),
  };
};

const preenchimentoDadosCursos = async function () {

  const dadosCursos = await todosCursosEscola();

  const containersCursos = document.querySelector(".container_cursos_alunos");

  let cardCursos;
  let textoCursosCard;
  let iconesCursos;
  

  for (let i = 0; i < dadosCursos.acronym.length; i++) {

    // Trazendo elemento que vai criar o card
    cardCursos = document.createElement("a");
    cardCursos.setAttribute("href", "./alunos.html");
    cardCursos.classList.add("card_cursos");
    cardCursos.dataset.index = i;

    // Trazendo elemento que vai retornar o texto do card
    textoCursosCard = document.createElement("span");
    textoCursosCard.classList.add("card_texto_curso");
    textoCursosCard.textContent = dadosCursos.acronym[i];

    cardCursos.classList.add("card_cursos");

    // Trazendo elemento que vai retornar os icones dos cards que vão compor os cursos
    iconesCursos = document.createElement("img");
    iconesCursos.classList.add("icones_curso");
    iconesCursos.setAttribute("src", dadosCursos.icon[i]);

    // retornando os cards, icones e os textos
    cardCursos.append(iconesCursos, textoCursosCard);
    containersCursos.append(cardCursos);
  }


  const getIndiceCardsCursos = function (event) {

    const getTituloCurso = function () {

      localStorage.setItem("acronym", dadosCursos.acronym[event.currentTarget.dataset.index]);

      localStorage.setItem("nome_curso", dadosCursos.name[event.currentTarget.dataset.index]);
    };

    getTituloCurso();
  };

  const cardsCursosEscola = document.querySelectorAll(".card_cursos");
  cardsCursosEscola.forEach((cardcursoEscola) => {cardcursoEscola.addEventListener("click", getIndiceCardsCursos);
  });
};

preenchimentoDadosCursos();
