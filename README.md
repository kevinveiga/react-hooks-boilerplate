## PADRÕES

-   Nomes no singular: Todas as pastas;
-   Idioma inglês: Todos os nomes, exceto nomes próprios, como seções ou páginas;
-   lowerCamelCase: Nomes de variáveis, funções, métodos - Ex: functionName;
-   UpperCamelCase: Nomes de imports, classes, interfaces, pastas de componentes, arquivos de componentes - Ex: ClassName, Header.js;
-   spinal-case: Nomes no CSS, arquivos no geral, exceto pastas de componentes e arquivos de componentes - Ex: topo-imagem-1.jpg, Header.js;
-   snake_case: Nomes de pastas, exceto pastas de componentes - Ex: folder_name, ComponenteA;

## INSTALAÇÕES NECESSÁRIAS PARA O PROJETO

-   [GIT](https://git-scm.com/downloads)
-   [NodeJS 10 ou superior](https://nodejs.org/en/download/)

## CONFIGURAÇÃO:

-   Configurar arquivos .env\*

## FRONTEND

### IDE - INSTALAÇÃO DE PLUGINS:

-   EditorConfig (exemplo no VS Code: EditorConfig for VS Code)
-   ESLint (exemplo no VS Code: ESLint)
-   Prettier (exemplo no VS Code: Prettier - Code formatter)
-   Styled Components (exemplo no VS Code: vscode-styled-components (Julien Poissonnier))

### IDE - CONFIGURAÇÃO:

-   Configurar para formatar o código ao salvar o arquivo

### IDE - VS CODE CONFIGURAÇÃO:

```js
"[javascript]": {
 "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
"editor.formatOnSave": true,
"files.watcherExclude": {
 "**/.git/objects/**": true,
 "**/.git/subtree-cache/**": true,
 "**/node_modules/*/**": true
 },
"git.autofetch": true
```

### Executar apenas a primeira vez no terminal:

-   npm i -g npm (atualiza NPM)
-   npm i (instala pacotes de tarefas)
-   npm audit fix (corrigir pacotes)

### Ambiente de desenvolvimento, executar no terminal:

-   npm run dev

### Ambiente de produção, executar no terminal:

-   npm run prod

### Caso ocorra algum erro posteriormente, executar no terminal:

-   npm i

## React

-   Evitar a utilização de export default **(exceto para React Lazy and Suspense)**;

-   Organizar "import" na ordem correta, tanto na ordem de contexto como na ordem alfabética. Ex:

```jsx
// React import
import React from 'react';

// Library import
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Application import
import { Router } from './router';

// Service import
import { useSeoApi } from './service/seo';

// Store import
import { AuthProvider } from './store/auth/auth';

// Utility import
import { customValidate } from './util/customValidate';

// Component import
import { Modal } from './component/Modal/Modal';

// Component Styled import
import { Modal } from './component/Modal/ModalStyled';

// Style import
import { Normalize } from './style/normalize';
import { theme } from './style/theme';

// Image import
import imageName from './asset/image/imageName.jpg';
```

-   Ao definir um nome de variável para um State de Contexto, colocar no final do nome "Context". Ex:

```jsx
<PesquisaContext.Provider value={{ setStatePesquisaDataContext: memoPesquisa[1] }}>...</PesquisaContext.Provider>
```

-   Ao criar um arquivo de Styled Component referente a um componente, colocar no final do nome "Styled". Ex: HomeStyled.js;

-   Ao definir um nome para o Styled Component referente a um componente, colocar no final do nome "Styled". Ex:

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

-   Usar sempre a propriedade "key" nos elementos HTML em loops do React, usando como valor um id e não um índice. Ex:

```jsx
<li key={list.id}>{list.text}</li>
```

-   Para usar funções em eventos, utilizar da seguinte maneira:

```js
const handle = useCallback(
    (value) => (e) => {
        console.log('valor do parâmetro', value);
        console.log('elemento', e);
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

## React - Forms | Como usar:

-   Utilização da biblioteca [React Hook Form](https://github.com/bluebill1049/react-hook-form);
-   O tipo e controle dos campos é feito com o modo "control" e o componente Controller da biblioteca;

-   Na maioria dos casos, a declaração do useForm fica assim:

```js
const {
    control,
    errors,
    formState: { touched },
    handleSubmit,
    setError
} = useForm({
    mode: 'onChange'
});
```

-   Para passar valores iniciais nos campos, utilizar na declaração do useForm o "defaultValues". Ex:

```js
const {
    control,
    errors,
    formState: { touched },
    handleSubmit,
    setError
} = useForm({
    defaultValues: { ...data, data_nasc: formatDateGet(data.data_nasc) },
    mode: 'onChange'
});
```

-   Para campo sem validação, usar como no exemplo abaixo:

```jsx
<Controller
    control={control}
    name="query"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <Input
                autoComplete="off"
                maxLength="50"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                onKeyDown={keyPress(onSubmit)}
                placeholder="O que você procura?"
                ref={queryRef}
                value={value}
                {...props}
            />
        );
    }}
/>
```

-   Para campo com validação, usar como no exemplo abaixo:

```jsx
<Controller
    control={control}
    name="email"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <InputValidation
                error={errors.email}
                maxLength="50"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                pr={4}
                touched={touched}
                value={value}
                {...otherProps}
            />
        );
    }}
    rules={{ ...customValidate.email, ...customValidate.require }}
/>
```

-   Para usar um "label" como comportamento de "placeholder" no campo "input", basta passar a propriedade "label". Ex:

```jsx
<Controller
    control={control}
    name="email"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <InputValidation
                error={errors.email}
                label="E-mail"
                maxLength="50"
                name={name}
                onBlur={onBlur}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                pr={4}
                touched={touched}
                value={value}
                {...otherProps}
            />
        );
    }}
    rules={{ ...customValidate.email, ...customValidate.require }}
/>
```

-   Para máscara simple no campo, usar o componente "InputMask" (sem validação) ou "InputMaskValidation" (com validação), como no exemplo abaixo:

```jsx
<Controller
    control={control}
    name="telefone"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <InputMaskValidation
                error={errors.telefone}
                format="(##) #####-####"
                label="Celular"
                name={name}
                onBlur={onBlur}
                onValueChange={(values) => {
                    onChange(values.value);
                }}
                pr={4}
                touched={touched}
                value={value}
                {...otherProps}
            />
        );
    }}
    rules={{ ...customValidate.cellphone, ...customValidate.require }}
/>
```

-   Para máscara monetária no campo, usar o componente "InputMask" (sem validação) ou "InputMaskValidation" (com validação), como no exemplo abaixo:

```jsx
<Controller
    control={control}
    name="valor"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <InputMask
                decimalScale={2}
                decimalSeparator=","
                isNumericString={true}
                maxLength="15"
                onBlur={onBlur}
                onValueChange={(values) => {
                    onChange(values.value);
                }}
                pr={4}
                thousandSeparator="."
                value={value}
                {...otherProps}
            />
        );
    }}
/>
```

-   Campos do tipo checkbox ou radio, no "onChange" usar como no exemplo abaixo:

```jsx
<Controller
    control={control}
    name="receber_avisos_descontos_de_cursos"
    render={({ name, onBlur, onChange, value }) => {
        return (
            <InputCheckboxRadio
                checked={data.receber_avisos_descontos_de_cursos}
                color="colorGray2"
                id="receber_avisos_descontos_de_cursos"
                name={name}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.checked)}
                value={value}
            >
                <Span fontSize={{ d: '14px', sm: '16px' }} verticalAlign="middle">
                    Desejo receber avisos e descontos de cursos
                </Span>
            </InputCheckboxRadio>
        );
    }}
/>
```

## React - Referências:

### Boas práticas:

-   [10 coisas que não se deve fazer no React](https://medium.com/better-programming/10-things-not-to-do-when-building-react-applications-bc26d4f38644);

-   Nomeação de funções e propriedades: [https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364](https://medium.com/javascript-in-plain-english/handy-naming-conventions-for-event-handler-functions-props-in-react-fc1cbb791364)

### Configuração:

-   [Configuração básica](https://medium.freecodecamp.org/a-complete-react-boilerplate-tutorial-from-zero-to-hero-20023e086c4a);
-   [Configuração básica](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/);
-   [Configuração avançada](https://medium.com/@sethalexander/how-to-build-your-own-react-boilerplate-1a97d09337fd);

### Estrutura de pastas e arquivos:

-   [Estrutura básica](https://medium.com/@damusnet/how-to-structure-your-files-in-a-large-react-application-the-problem-2ed67f5fc145);

### Padrão de desenvolvimento no código:

-   [Airbnb](https://github.com/airbnb/javascript/tree/master/react#naming);

### Helmet:

-   [React Helmet](https://open.nytimes.com/the-future-of-meta-tag-management-for-modern-react-development-ec26a7dc9183);

### Hooks - Components:

-   [Hooks - Component](https://www.robinwieruch.de/react-function-component/);
-   [Hooks - Component CRUD](https://www.taniarascia.com/crud-app-in-react-with-hooks/);

### Hooks - Fetch Data:

-   [Hooks - Fetch Data](https://www.robinwieruch.de/react-hooks-fetch-data/);

### Hooks - Forms:

-   [React Hook Form](https://github.com/bluebill1049/react-hook-form);
-   [React Hook Form - Initial Form Value](https://codesandbox.io/s/l3mxpvmm9);
-   [React Hook Form - Validate](https://codesandbox.io/s/o766kp4z05);

### Hooks - State:

-   [Hooks - State](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/);
-   [Hooks - useReducer vs useState](https://www.robinwieruch.de/react-usereducer-vs-usestate/);

### Lazy and Suspense:

-   [React Lazy and Suspense](https://imasters.com.br/front-end/code-splitting-e-lazy-loading-no-react);
    Neste exempĺo é usado no React Router, mas no projeto não foi utilizado para não prejudicar no SEO, por tanto, utilize Lazy and Suspense somente em componentes que realmente podem ser carregados depois;

### Router:

-   [Router - Router SPA](https://www.taniarascia.com/using-react-router-spa/);

### Styled Component:

-   [Styled-Components](https://www.styled-components.com/);
-   [Styled-Components básico](https://blog.getty.io/desenvolvendo-apps-com-styled-components-85ec6880b194);
-   [Styled-Components avançado](https://blog.pagepro.co/2018/11/06/moving-best-scss-practices-to-styled-components-part-1/);
-   [Styled-Components avançado](https://www.robinwieruch.de/react-styled-components/);
-   [CSS to Style-Components](https://jsramblings.com/2017/10/29/migrating-to-styled-components-cheatsheet.html);

### Styled System:

-   [Styled-System](https://styled-system.com/);
-   [Styled-System - API](https://styled-system.com/api/);
-   [Styled-System - Reference table](https://styled-system.com/table);
-   [Styled-System - Best practices](https://medium.com/styled-components/build-better-component-libraries-with-styled-system-4951653d54ee);
-   [Styled-System - Responsive](https://styled-system.com/responsive-styles);
    Breakpoints: Utilizar como foi definido no arquivo theme.js - Ex: gridRow={{ d: 5, xs: 4, sm: 3, md: 1, lg: 1 / 2, xl: '1 / span 2' }} - Sendo que "d" é o valor default;

## Javascript

-   Ao utilizar métodos do ES6 sempre verificar se tem suporte para IE11+, de preferência para métodos do ES5;
-   Priorizar os seletores nativos como "document.getElementById" ou "document.querySelector";
-   Javascript modular;
-   Strings utilizar apóstrofo - Ex: 'texto';
-   Utilizar [JSDOC](https://msdn.microsoft.com/pt-br/library/Mt162307.aspx);

## Libs

-   HttpRequest: [Axios](https://github.com/axios/axios);

## Links externos em elementos `<a/>` com target="\_blank"

-   Utilizar rel="noopener noreferrer" [Link](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md);

## Svg

-   [Referência de uso](https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91);
-   Sempre otimizar código do Svg, juntando formas, removendo código desnecessário, entre outras otimizações;
-   Minificar código, utilizar site [https://jakearchibald.github.io/svgomg/](https://jakearchibald.github.io/svgomg/);
-   No site de otimização, usar o valor 2 na precisão;
-   Utilizar como componente React;

## Referências Webpack 4:

-   [Webpack 4](https://webpack.js.org/);
-   [Webpack 4 - Docs](https://github.com/webpack/docs/wiki/configuration);
-   [Webpack 4 - Post](https://medium.com/@bracontece/webpack-4-tutorial-tudo-o-que-voc%C3%AA-precisa-saber-de-0-conf-para-o-modo-de-produ%C3%A7%C3%A3o-dbea63af3a7b);

## Referências Workbox:

-   [Workbox](https://developers.google.com/web/tools/workbox/);
