
const { createApp } = Vue;

createApp({
    data() {
        return {
            display: "0",
            valor: '',
            numeroAnterior: 0,
            numeroAtual: 0,
            operador: ''
        }
    },
    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case '*':
                case '/':
                case '-':
                case '+':
                    this.tratarOperador(botao);
                    break;
 
                case '.':
                    this.tratarDecimal();
                    break;
 
                case 'C':
                    this.limpar();
                    break;
 
                case '=':
                    this.tratarIgual();
                    break;
 
                default:
                    this.tratarNumero(botao);
            }
        },
        tratarOperador(botao) {
            if (botao === '*') {
                this.display = 'x';
            } else {
                this.display = botao;
            }
            this.operador = botao;
            this.numeroAnterior = parseFloat(this.valor);
            this.valor = '';
        },
        tratarDecimal() {
            if (!this.display.includes('.')) {
                this.display += '.';
                this.valor += '.';
            }
        },
        tratarIgual() {
            if (this.operador === '/') {
                this.valor = this.numeroAnterior / parseFloat(this.valor);
            } else if (this.operador === '*') {
                this.valor = this.numeroAnterior * parseFloat(this.valor);
            } else if (this.operador === '-') {
                this.valor = this.numeroAnterior - parseFloat(this.valor);
            } else if (this.operador === '+') {
                this.valor = this.numeroAnterior + parseFloat(this.valor);
            }
            this.display = this.valor.toString();
        },
        tratarNumero(botao) {
            if (this.display === '0' || this.operador !== '') {
                this.display = botao.toString();
            } else {
                this.display += botao.toString();
            }
            this.valor += botao.toString();
        },
        limpar() {
            this.display = '0';
            this.numeroAnterior = 0;
            this.numeroAtual = 0;
            this.operador = '';
            this.valor = '';
        }
    }
}).mount('#app');
