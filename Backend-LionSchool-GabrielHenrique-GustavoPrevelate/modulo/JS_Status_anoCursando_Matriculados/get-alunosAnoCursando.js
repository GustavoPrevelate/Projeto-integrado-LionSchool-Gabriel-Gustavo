"use strict";

//Importação do json
const alunos = require("../jsons/alunos.js");

// Função que retorna os alunos pela sigla do curso e o ano de conclusão 
const getAlunosAnoCursando = function (siglaCurso, anoConcluindoCurso) {

  //array
  let alunosFiltrados = [];

  alunos.alunos.forEach((alunoFiltrado) => {alunoFiltrado.curso.forEach((dadosGeraisCurso) => {

      if (dadosGeraisCurso.sigla == siglaCurso && dadosGeraisCurso.conclusao == anoConcluindoCurso) {
        alunosFiltrados.push(alunoFiltrado);
      }
    });
  });

  return alunosFiltrados;

};

// Exportando função
module.exports = {
  getAlunosAnoCursando
};
