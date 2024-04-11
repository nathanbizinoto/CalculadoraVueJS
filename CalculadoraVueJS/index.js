const { createApp } = Vue;

createApp({
    data() {
        return {
            display: "0",
            valor: '',
            numeroAnterior: 0,
            numeroAtual: 0,
            operador: null
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
            if (this.valor !== '') {
                this.numeroAnterior = parseFloat(this.valor);
                this.valor = '';
                this.numeroAtual = 0; // Reset para nova entrada
            }
            this.operador = botao;
            this.display = (botao === '*') ? 'x' : botao;
        },
        tratarDecimal() {
            if (!this.valor.includes('.')) {
                this.valor += '.';
                this.display = this.valor;
            }
        },
        tratarIgual() {
            this.numeroAtual = parseFloat(this.valor);
            if (this.operador !== null) {
                switch (this.operador) {
                    case '+':
                        this.valor = this.numeroAnterior + this.numeroAtual;
                        break;
                    case '-':
                        this.valor = this.numeroAnterior - this.numeroAtual;
                        break;
                    case '*':
                        this.valor = this.numeroAnterior * this.numeroAtual;
                        break;
                    case '/':
                        if (this.numeroAtual !== 0) {
                            this.valor = this.numeroAnterior / this.numeroAtual;
                        } else {
                            this.valor = 'Erro - Divisão por zero';
                        }
                        break;
                }
                this.display = this.valor.toString();
                this.operador = null; // Reseta o operador
            }
        },
        tratarNumero(botao) {
            if (this.operador !== null) {
                this.valor = '';
                this.operador = null;
            }
            if (this.display === '0' || this.valor === '') {
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
            this.operador = null;
            this.valor = '';
        }
    }
}).mount('#app');
