import { pagarmeEncryptionKey } from '../config';

import { formatStringMoneyToIntSet } from '../util/formatData';

/**
 * @description Retorna uma Promise com a transação de boleto do Pagarme.
 * @param {object} billetObj Dados do boleto.
 * @param {object} cartObj Dados do carrinho.
 */
export const createBilletTransactionPromise = (billetObj, cartObj) => {
    // return Object.keys(billetObj).length && Object.keys(cartObj).length
    //     ? pagarme.client
    //           .connect({ encryption_key: pagarmeEncryptionKey })
    //           .then((client) => {
    //               // TODO: pegar dados reais do usuário
    //               return client.transactions.create({
    //                   amount: formatStringMoneyToIntSet(cartObj.forma_pagamento.valor_total),
    //                   customer: {
    //                       address: {
    //                           neighborhood: 'Jardim Paulistano',
    //                           street: 'Avenida Brigadeiro Faria Lima',
    //                           street_number: '1811',
    //                           zipcode: '01451001'
    //                       },
    //                       document_number: billetObj.cpf,
    //                       email: 'aardvark.silva@pagar.me',
    //                       name: 'Aardvark Silva',
    //                       phone: {
    //                           ddi: '55',
    //                           ddd: '11',
    //                           number: '99999999'
    //                       }
    //                   },
    //                   metadata: { itens: cartObj.itens },
    //                   payment_method: 'boleto',
    //                   postback_url: process.env.PAGARME_POSTBACK_URL
    //               });
    //           })
    //           .catch((error) => {
    //               Promise.reject(new Error(`Pagarme erro: ${error}`));
    //           })
    //     : Promise.reject(new Error('Dados do boleto não informados.'));
};

/**
 * @description Retorna uma Promise com a transação de cartão do Pagarme.
 * @param {object} cardObj Dados do cartão.
 * @param {object} cartObj Dados do carrinho.
 */
export const createCardTransactionPromise = (cardObj, cartObj) => {
    // return Object.keys(cardObj).length && Object.keys(cartObj).length
    //     ? getCardHashPromise(cardObj)
    //           .then((response) => {
    //               return pagarme.client
    //                   .connect({ encryption_key: pagarmeEncryptionKey })
    //                   .then((client) => {
    //                       // TODO: pegar dados reais do usuário
    //                       return client.transactions.create({
    //                           amount: formatStringMoneyToIntSet(cartObj.forma_pagamento.valor_total),
    //                           card_hash: response,
    //                           customer: {
    //                               address: {
    //                                   neighborhood: 'Jardim Paulistano',
    //                                   street: 'Avenida Brigadeiro Faria Lima',
    //                                   street_number: '1811',
    //                                   zipcode: '01451001'
    //                               },
    //                               document_number: cardObj.cpf,
    //                               email: 'aardvark.silva@pagar.me',
    //                               name: 'Aardvark Silva',
    //                               phone: {
    //                                   ddi: '55',
    //                                   ddd: '11',
    //                                   number: '99999999'
    //                               }
    //                           },
    //                           metadata: { itens: cartObj.itens },
    //                           payment_method: 'credit_card',
    //                           postback_url: process.env.PAGARME_POSTBACK_URL
    //                       });
    //                   })
    //                   .catch((error) => {
    //                       return error.response;
    //                   });
    //           })
    //           .catch((error) => {
    //               return error.response;
    //           })
    //     : Promise.reject(new Error('Dados do cartão não informados.'));
};

/**
 * @description Retorna uma Promise com o hash de cartão do Pagarme.
 * @param {object} cardObj Dados do cartão.
 */
const getCardHashPromise = (cardObj) => {
    // return Object.keys(cardObj).length
    //     ? pagarme.client
    //           .connect({ encryption_key: pagarmeEncryptionKey })
    //           .then((client) => {
    //               return client.security.encrypt({
    //                   card_cvv: cardObj.cartao_cvv,
    //                   card_expiration_date: cardObj.cartao_data,
    //                   card_holder_name: cardObj.cartao_nome,
    //                   card_number: cardObj.cartao_numero
    //               });
    //           })
    //           .then((cardHash) => {
    //               return cardHash;
    //           })
    //           .catch((error) => {
    //               Promise.reject(new Error(`Pagarme cardHash erro: ${error}`));
    //           })
    //     : Promise.reject(new Error('Dados do cartão não informados.'));
};
