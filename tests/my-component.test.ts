import { WriteMachine } from '../src/components/WriteMachine';

describe('WriteMachine', () => {
  it('should render the first word correctly', async () => {
    const element = document.createElement('write-machine');
    element.setAttribute('data-texts', 'maikidev,testing');
    document.body.appendChild(element);

    // Aumentamos el tiempo para observar la animación completa
    await new Promise<void>(resolve => {
      const observer = new MutationObserver(() => {
        if (element.shadowRoot?.querySelector('.write-machine')) {
          resolve();
          observer.disconnect();
        }
      });
      observer.observe(element, { childList: true, subtree: true });
    });

    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const content = shadowRoot.querySelector('.write-machine')!.textContent;
      expect(content).toBe('maikidev');
    } else {
      throw new Error('shadowRoot is null');
    }
  }, 30000); // Aumentar el límite de tiempo del test a 30 segundos

  it('should delete the first word and write the second word correctly', async () => {
    const element = document.createElement('write-machine');
    element.setAttribute('data-texts', 'maikidev,testing');
    document.body.appendChild(element);

    // Aumentamos el tiempo de espera total de la animación completa
    const totalDelay = (500 * 'maikidev'.length + 800) + (500 * 'maikidev'.length + 800) + (500 * 'testing'.length);
    await new Promise(resolve => setTimeout(resolve, totalDelay));

    const shadowRoot = element.shadowRoot;
    if (shadowRoot) {
      const content = shadowRoot.querySelector('.write-machine')!.textContent;
      expect(content).toBe('testing');
    } else {
      throw new Error('shadowRoot is null');
    }
  }, 35000); // Aumentar el límite de tiempo del test a 35 segundos
});
