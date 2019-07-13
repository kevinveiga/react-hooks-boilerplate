## PADRÕES

-   Nomes no singular: Todas as pastas;
-   Idioma inglês: Todos os nomes, exceto nomes próprios, como seções ou páginas;
-   lowerCamelCase: Nomes de variáveis, funções, métodos - Ex: functionName;
-   UpperCamelCase: Nomes de imports, classes, interfaces, pastas de componentes, arquivos de componentes - Ex: ClassName, Header.js;
-   spinal-case: Nomes no CSS, arquivos no geral, exceto pastas de componentes e arquivos de componentes - Ex: topo-imagem-1.jpg, Header.js;
-   snake_case: Nomes de pastas, exceto pastas de componentes - Ex: folder_name, ComponenteA;

## INSTALAÇÕES NECESSÁRIAS PARA O PROJETO

-   [GIT](https://git-scm.com/downloads)
-   [NodeJS](https://nodejs.org/en/download/)

## MODO DE USAR O TERMINAL

-   Na pasta do projeto clicar com o direito do mouse e clicar em "Git Bash Here"

## FRONTEND

#### Executar apenas a primeira vez no terminal:

-   npm i -g npm (atualiza NPM)
-   npm i -g node-sass (atualiza node-sass globalmente)
-   npm i (instala pacotes de tarefas)
-   npm audit fix (corrigir pacotes)

#### Ambiente de desenvolvimento, executar no terminal:

-   npm run dev

#### Ambiente de produção, executar no terminal:

-   npm run prod

#### Caso ocorra algum erro posteriormente, executar no terminal:

-   npm i

## React

#### Referencias para configuração:

-   [Configuração básica](https://medium.freecodecamp.org/a-complete-react-boilerplate-tutorial-from-zero-to-hero-20023e086c4a);
-   [Configuração básica](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/);
-   [Configuração avançada](https://medium.com/@sethalexander/how-to-build-your-own-react-boilerplate-1a97d09337fd);

#### Referencias para estrutura de pastas e arquivos:

-   [Estrutura básica](https://medium.com/@damusnet/how-to-structure-your-files-in-a-large-react-application-the-problem-2ed67f5fc145);

#### Referências para padrão no desenvolvimento:

-   [Airbnb](https://github.com/airbnb/javascript/tree/master/react#naming);

#### Referências para Hooks - Components:

-   [Hooks - Component](https://www.robinwieruch.de/react-function-component/);
-   [Hooks - Component CRUD](https://www.taniarascia.com/crud-app-in-react-with-hooks/);

#### Referências para Hooks - Fetch Data:

-   [Hooks - Fetch Data](https://www.robinwieruch.de/react-hooks-fetch-data/);

#### Referências para Hooks - Forms:

-   [React Hook Form](https://github.com/bluebill1049/react-hook-form);
-   [React Hook Form - Initial Form Value](https://codesandbox.io/s/l3mxpvmm9);
-   [React Hook Form - Validate](https://codesandbox.io/s/o766kp4z05);

#### Referências para Hooks - State:

-   [Hooks - State](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/);
-   [Hooks - useReducer vs useState](https://www.robinwieruch.de/react-usereducer-vs-usestate/);

#### Referências para Router:

-   [Router - Router SPA](https://www.taniarascia.com/using-react-router-spa/);

#### Referências para Helmet:

-   [React Helmet](https://open.nytimes.com/the-future-of-meta-tag-management-for-modern-react-development-ec26a7dc9183);

#### Referências para Styled Component:

-   [Styled-Components](https://www.styled-components.com/);
-   [Styled-Components básico](https://blog.getty.io/desenvolvendo-apps-com-styled-components-85ec6880b194);
-   [Styled-Components avançado](https://blog.pagepro.co/2018/11/06/moving-best-scss-practices-to-styled-components-part-1/);
-   [Styled-Components avançado](https://www.robinwieruch.de/react-styled-components/);
-   [CSS to Style-Components](https://jsramblings.com/2017/10/29/migrating-to-styled-components-cheatsheet.html);

#### Referências para Styled System:

-   [Styled-System](https://styled-system.com/);
-   [Styled-System - API](https://styled-system.com/api/);
-   [Styled-System - Reference table](https://styled-system.com/table);
-   [Styled-System - Best practices](https://medium.com/styled-components/build-better-component-libraries-with-styled-system-4951653d54ee);
-   [Styled-System - Responsive](https://styled-system.com/responsive-styles);
    Breakpoints: Utilizar como foi definido no arquivo theme.js - Ex: gridRow={{ d: 5, xs: 4, sm: 3, md: 1, lg: 1 / 2, xl: '1 / span 2' }} - Sendo que "d" é o valor default;

#### Referências para Workbox:

-   [Workbox](https://developers.google.com/web/tools/workbox/);

#### Boas práticas:

-   Evitar a utilização de export default;
-   Usar sempre a propriedade "key" nos elementos HTML em loops do React. Ex:

```html
<li key="{list.id}">{list.text}</li>
```

-   [10 coisas que não se deve fazer no React](https://medium.com/better-programming/10-things-not-to-do-when-building-react-applications-bc26d4f38644);

## Referências de Webpack 4

-   [Webpack 4](https://webpack.js.org/);
-   [Webpack 4 - Docs](https://github.com/webpack/docs/wiki/configuration);
-   [Webpack 4 - Post](https://medium.com/@bracontece/webpack-4-tutorial-tudo-o-que-voc%C3%AA-precisa-saber-de-0-conf-para-o-modo-de-produ%C3%A7%C3%A3o-dbea63af3a7b);

## Javascript

-   Ao utilizar métodos do ES6 sempre verificar se tem suporte para IE9+, de preferência para métodos do ES5;
-   Priorizar os seletores nativos como "document.getElementById" ou "document.querySelector";
-   Javascript modular;
-   Strings utilizar apóstrofo - Ex: 'texto';
-   Utilizar [JSDOC](https://msdn.microsoft.com/pt-br/library/Mt162307.aspx);

## Libs

-   HttpRequest: [Axios](https://github.com/axios/axios);

## Links externos com target="\_blank" em tags <a/>

-   Utilizar rel="noopener" [Link](https://desenvolvimentoparaweb.com/miscelanea/relnoopener-performance-seguranca/);

## Svg

-   [Referência de uso](https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91);
-   Sempre otimizar código do Svg, juntando formas, removendo código desnecessário, entre outras otimizações;
-   Minificar código, utilizar site [https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/);
-   Utilizar como componente React;

## Principais Metodologias

-   [ES6](http://es6-features.org/)
