# Painel de Avaliação — Simulação Scrum Competitiva
## Integrantes

- Lara Leticia Jung Appel
- Carina Muller
- Marya Reis

## Tecnologias

- React
- Vite
- JavaScript (JSX)
- CSS
- ESLint
- SheetJS para importação de listas de alunos em Excel

## Instalação

### Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- npm

### Passo a passo

1. Clone ou baixe o repositório.
2. Entre na pasta do projeto:

```bash
cd Trabalho_dwII/painel-avaliacao
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador o endereço informado pelo Vite, normalmente `http://localhost:5173`.

### Outros comandos

Verificar o código com ESLint:

```bash
npm run lint
```

Gerar a versão de produção:

```bash
npm run build
```

Visualizar a versão de produção localmente:

```bash
npm run preview
```


## Observações

- O `localStorage` é específico do navegador e do dispositivo em que o painel está sendo utilizado.
- O arquivo JSON é a forma recomendada para transportar uma simulação completa para outro navegador ou computador.
- A importação de Excel utiliza a biblioteca SheetJS carregada pelo `index.html`; por isso, a importação `.xlsx/.xls` depende de conexão com a internet para carregar essa biblioteca.
- A hospedagem do sistema ainda será configurada e não faz parte das instruções de instalação local deste README.
