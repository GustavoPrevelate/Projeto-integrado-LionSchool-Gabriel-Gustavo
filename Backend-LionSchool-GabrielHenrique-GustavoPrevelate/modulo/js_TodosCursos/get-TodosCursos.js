"use strict";

//Importação do json
const cursos = require("../jsons/cursos.js");

// Função que retorna todos os informações referente aos cursos da escola 
const getTodosCursosEscola = function() {
    return cursos.cursos;
}

// Exportando função
module.exports = {
    getTodosCursosEscola,
}
