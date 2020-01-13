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

#### Referências para Lazy and Suspense:

-   [React Lazy and Suspense](https://imasters.com.br/front-end/code-splitting-e-lazy-loading-no-react);
    Neste exempĺo é usado no React Router, mas no projeto não foi utilizado para não prejudicar no SEO, por tanto, utilize Lazy and Suspense somente em componentes que realmente podem ser carregados depois;

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

-   Nomeação de funções e propriedades: [https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364](https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364)

-   Evitar a utilização de export default **(exceto para React Lazy and Suspense)**;

-   Ao definir um nome de variável para um State de Contexto, colocar no final do nome "Context". Ex:

```jsx
<PesquisaContext.Provider value={setStatePesquisaDataContext}>...</PesquisaContext.Provider>
```

-   Ao criar um arquivo de Styled Component fora da pasta "style", colocar no final do nome "Styled". Ex: HomeStyled.js;

-   Ao definir um nome de variável Styled Component dentro de um arquivo fora da pasta "style", colocar no final do nome "Styled". Ex:

```js
export const VideoContainerStyled = styled.section`...`;
```

-   No return do JSX, caso não existam os dados, passar null. Ex:

```jsx
return stateBanner.data && stateBanner.data.sidebar_habilitada == '1' ? (
    <BannerStyled change={stateChangeBannerScroll} fadeOut={stateFadeOutBannerScroll} {...otherProps}>
        {parse(`${stateBanner.data.sidebar}`)}
    </BannerStyled>
) : null;
```

-   Usar sempre a propriedade "key" nos elementos HTML em loops do React. Ex:

```jsx
<li key={list.id}>{list.text}</li>
```

-   Para usar funções em eventos, utilizar da seguinte maneira:

```js
const handle = useCallback(
    (value) => (e) => {
        setStateCurrent(value);
        setState(e.target.value);
    },
    []
);
```

```jsx
<div onClick={handle(true)}>...</div>
```

-   Ao utilizar Styled System, cuidar para não usar a mesma propriedade no Style Components. Ex:

```jsx
<Box width="100%">...</Box>
```

ERRADO

```js
export const Box = styled.div`
    ${layout}
    width: 500px;
`;
```

    o correto é verificar se a propriedade é "undefined", e nesse caso, usar o valor default. Ex:

CERTO

```js
export const Box = styled.div`
    ${layout}
    ${({ width }) => width === undefined && 'width: 500px'};
`;
```

-   [10 coisas que não se deve fazer no React](https://medium.com/better-programming/10-things-not-to-do-when-building-react-applications-bc26d4f38644);

#### Forms - Como usar:

-   Utilização da biblioteca [React Hook Form](https://github.com/bluebill1049/react-hook-form);
-   Não passar o "register" por "ref" nos campos "input", e sim por "useEffect". Ex:

```js
useEffect(() => {
    register({ name: 'email' }, { ...customValidate.email });
    register({ name: 'senha' }, { ...customValidate.password, ...customValidate.require });
}, [register]);
```

-   Para usar "placeholder" nos campos "input", basta passar a propriedade "placeholder". Ex:

```jsx
<InputValidation error={errors.email} maxLength="50" name="email" onChange={handleValidation()} placeholder="E-mail" touched={formState.touched} {...otherProps} />
```

-   Para usar um "label" como comportamento de "placeholder" nos campos "input", basta passar a propriedade "label". Ex:

```jsx
<InputValidation error={errors.email} label="E-mail" maxLength="50" name="email" onChange={handleValidation()} touched={formState.touched} {...props} />
```

-   Para usar máscara nos campo, utilizar o componente "InputMaskValidation", com a propriedade "mask". Ex:

```jsx
<InputValidation error={errors.telefone} mask={customMaskRegex.phone} name="telefone" onChange={handleValidation()} placeholder="Telefone" touched={formState.touched} {...props} />
```

-   Para passar valores iniciais nos campos, utilizar a função "useSetFormValue", que recebe como parâmetros, um objeto e o id do formulário, também utilizar a propriedade defaultValues na função "useForm". Ex:

```js
useSetFormValue(data, formId);

const { errors, formState, handleSubmit, register, setError, triggerValidation } = useForm({
    defaultValues: data,
    mode: 'onChange'
});
```

## Geral

#### Javascript

-   Ao utilizar métodos do ES6 sempre verificar se tem suporte para IE11+, de preferência para métodos do ES5;
-   Priorizar os seletores nativos como "document.getElementById" ou "document.querySelector";
-   Javascript modular;
-   Strings utilizar apóstrofo - Ex: 'texto';
-   Utilizar [JSDOC](https://msdn.microsoft.com/pt-br/library/Mt162307.aspx);

#### Libs

-   HttpRequest: [Axios](https://github.com/axios/axios);

#### Links externos com target="\_blank" em tags <a/>

-   Utilizar rel="noopener" [Link](https://desenvolvimentoparaweb.com/miscelanea/relnoopener-performance-seguranca/);

#### Principais Metodologias

-   [ES6](http://es6-features.org/)

#### Sass

-   Utilizar as variáveis sempre que possível;
-   Media queries dentro do próprio elemento seguindo os padrões especificados no projeto;
-   [Metodologia tipo modular](https://medium.com/@marcmintel/how-to-use-the-module-pattern-in-your-scss-sass-stylesheets-89fe38a6e1f3);

#### Svg

-   [Referência de uso](https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91);
-   Sempre otimizar código do Svg, juntando formas, removendo código desnecessário, entre outras otimizações;
-   Minificar código, utilizar site [https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/);
-   No site de otimização, usar o valor 2 na precisão;
-   Utilizar como componente React;

#### Referências de CSS auxiliar

-   [Bootstrap Display](https://getbootstrap.com/docs/4.3/utilities/display/);
-   [Bootstrap Grid](https://getbootstrap.com/docs/4.3/layout/grid/);
-   [Bootstrap Spacing](https://getbootstrap.com/docs/4.3/utilities/spacing/);
-   [Bootstrap Text](https://getbootstrap.com/docs/4.3/utilities/text/);

#### Referências de Webpack 4

-   [Webpack 4](https://webpack.js.org/);
-   [Webpack 4 - Docs](https://github.com/webpack/docs/wiki/configuration);
-   [Webpack 4 - Post](https://medium.com/@bracontece/webpack-4-tutorial-tudo-o-que-voc%C3%AA-precisa-saber-de-0-conf-para-o-modo-de-produ%C3%A7%C3%A3o-dbea63af3a7b);
