export class WriteMachine extends HTMLElement {
  private words: string[] = ['hola', 'mundo'];
  private index: number = 0;
  private write: string = '';
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['data-texts'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'data-texts' && newValue) {
      this.words = newValue.split(','); // Convertir el string a array
    }
  }

  connectedCallback() {
    this.render(); // Renderizar inicialmente
    this.startWriteMachine(); // Iniciar la animación
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .write-machine {
          font-family: 'Courier New', monospace;
          font-size: 24px;
          color: #333;
          border-right: 2px solid #333;
          padding-right: 5px;
          animation: blink-caret 0.7s step-end infinite;
        }

        @keyframes blink-caret {
          50% {
            border-color: transparent;
          }
        }
      </style>
      <span class="write-machine">${this.write}</span>
    `;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async startWriteMachine() {
    // Escribir palabra
    for (let i = 0; i < this.words[this.index].length; i++) {
      this.write += this.words[this.index][i];
      this.render();
      await this.delay(400); // Pausa entre letras
    }

    // Pausa antes de borrar
    await this.delay(600);

    // Borrar palabra
    for (let i = this.words[this.index].length - 1; i >= 0; i--) {
      this.write = this.write.slice(0, i);
      this.render();
      await this.delay(400); // Pausa entre letras borradas
    }

    // Pausa antes de pasar a la siguiente palabra
    await this.delay(650);

    // Cambiar al siguiente índice de palabra
    this.index = (this.index + 1) % this.words.length;

    // Repetir animación
    this.startWriteMachine();
  }
}

// Definir el elemento personalizado
customElements.define('write-machine', WriteMachine);
