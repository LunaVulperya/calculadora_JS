class Calculator{
    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

// metodo de soma
    sum(n1, n2){
        return n1+n2;
    }
// metodo de subtração
    minus(n1, n2){
        return n1-n2;
    }
// metodo de multiplicação
    multiplication(n1, n2){
        return n1*n2;
    }
// metodo de divisão
    division(n1, n2){
        try{
            if(n2 === 0){
                throw new Error('Divisão por 0');
            }
            return n1/n2;
        } catch(error) {
            return `Erro: ${error.message}`;
        }
    }

}

// criando o objeto
const calc = new Calculator;



// start nos btns
let buttons = document.querySelectorAll(".btn");
console.log("teste");



let resultado = calc.sum(1,2);
console.log(resultado);
let resultado2 = calc.minus(1,2);
console.log(resultado2);
let resultado3 = calc.multiplication(1,2);
console.log(resultado3);
let resultado4 = calc.division(1,0);
console.log(resultado4);