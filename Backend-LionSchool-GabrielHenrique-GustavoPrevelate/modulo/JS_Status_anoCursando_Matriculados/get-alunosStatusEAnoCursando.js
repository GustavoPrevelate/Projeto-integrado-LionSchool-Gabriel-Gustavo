"use strict";

//Importação do json
const alunosMatriculados = require("./get-alunosCursoEspecifico.js");

// Função para retornar alunos especificos de um curso com base nos status atuais e no ano de conclusão daqueles alunos
const getAlunosStatusAno = function (siglaCurso, statusAlunos, anoConcluindo) {

  // Alunos que estão matriculados em um curso especifico
  let alunos = alunosMatriculados.getAlunosCursoEspecifico(siglaCurso);

  // array
  let alunosFiltradosCursoEspecifico = [];

  alunos.forEach((alunoFiltrado) => {alunoFiltrado.curso.forEach((dadosCursoAluno) => {

      if (alunoFiltrado.status == statusAlunos && dadosCursoAluno.conclusao == anoConcluindo) {
        alunosFiltradosCursoEspecifico.push(alunoFiltrado);
      }
    });
  });

  return alunosFiltradosCursoEspecifico;

};

// Exportando função
module.exports = {
  getAlunosStatusAno,
};
