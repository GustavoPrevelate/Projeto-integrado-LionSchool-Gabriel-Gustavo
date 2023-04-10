"use strict";

//Importação do json
const alunos = require("../jsons/alunos.js");

// Função que retorna todos os alunos que estão matriculados em um curso especifico
const getAlunosCursoEspecifico = function (cursoEspecificoAlunos) {

  // array
  let alunosCursoEspecifico = [];

  alunos.alunos.forEach((alunoFiltrado) => { alunoFiltrado.curso.forEach((cursoEspecifico) => {
      if (cursoEspecifico.sigla == cursoEspecificoAlunos && cursoEspecifico != []) {
        alunosCursoEspecifico.push(alunoFiltrado);
      }
    });
  });

  return alunosCursoEspecifico;

};

// Exportando função
module.exports = {
  getAlunosCursoEspecifico,
};
