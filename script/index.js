class Calculator{
    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = false;
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

    //Começar aqui
    clearValues(){
        this.upperValue.textContent = 0;
        this.resultValue.textContent = 0;
        this.reset = false;
    }

    resolve(expression){
        //Substitui 'x' por '*' e quebra a expressão em tokens (números e operadores)
        //números decimais e operadores (+, -, *, /).
        const tokens = expression.replace(/X/g, '*').match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        //alert('teste');
        if (!tokens) {  // Verifica se há algo para calcular
            return 'Erro';
        }
        let stack = [];

        alert(tokens);

        //Primeiro passo: aplicar multiplicação (*) e divisão (/)
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
    
            if (token === '*' || token === '/') {
                alert('entrou');
                const n1 = parseFloat(stack.pop());      // remove o último número da pilha
                const n2 = parseFloat(tokens[++i]);      // pega o próximo número
                alert(n1);
                alert(n2);
                let result = token === '*' ? this.multiplication(n1, n2) : this.division(n1, n2);
                if (typeof result === 'string') return result; // tratamento de erro (divisão por zero)
                stack.push(result); // insere o resultado de volta na pilha
            } else {
                stack.push(token); // empilha números e operadores '+' ou '-'
            }
        }

        //alert(result);

        // Segundo passo: aplicar + e -
        let result = parseFloat(stack[0]);
        for (let i = 1; i < stack.length; i += 2) {
            const operator = stack[i];
            const num = parseFloat(stack[i + 1]);
            if (operator === '+') result = this.sum(result, num);
            if (operator === '-') result = this.minus(result, num);
        }
        //alert(typeof n1);
        return result;
    }

    btnPress = (event) => {
        const input = event.target.textContent;
        let currentExpression = this.upperValue.textContent;

        //limpa
        if (input === 'AC'){
            this.clearValues(); //Limpa o Visor da calculadora
            return;
        }

        if (input === '='){
            const result = this.resolve(currentExpression);//Resolve a conta
            this.resultValue.textContent = result; //Mostra o resultado
            this.upperValue.textContent = currentExpression; //Mantem a expressão
            this.reset = true;//ativa flag para reiniciar em 0
            return;
        }

        //Finalizar:
        if (this.reset && /^\d+$/.test(input)) {
            currentExpression = '0';
            this.reset = false;
        }

        if (currentExpression === '0' && /^\d+$/.test(input)) {
            currentExpression = input;
        } else {
            currentExpression += input;
        }

        this.upperValue.textContent = currentExpression;
    }
}

// criando o objeto
const calc = new Calculator;



// start nos btns
let buttons = document.querySelectorAll(".btn");
//console.log("teste");

//linha de teste
//document.querySelector('#upper-number').textContent = '5 x 6 =';

/*
// calculos
let resultado = calc.sum(1,2);
console.log(resultado);
let resultado2 = calc.minus(1,2);
console.log(resultado2);
let resultado3 = calc.multiplication(1,2);
console.log(resultado3);
let resultado4 = calc.division(1,0);
console.log(resultado4);
*/

for(let i=0;buttons.length > i; i++){
    buttons[i].addEventListener('click', calc.btnPress);
}