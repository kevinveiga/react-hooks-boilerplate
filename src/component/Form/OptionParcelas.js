import React from 'react';

import { formatMoneyGet } from '../../util/formatData';

export const OptionParcelas = ({ cardObj, totalValue }) => {
    const items = [];
    let info = 's/ juros';
    let installmentValue = totalValue;
    let newTotalValue = totalValue;

    for (let i = 1, l = cardObj.parcelas_quantidade; i < l + 1; i += 1) {
        if (i < cardObj.parcelas_sem_juros + 1) {
            console.log('valor sem juros: ', totalValue / i);

            installmentValue = totalValue / i;
        } else {
            info = `c/ juros (${cardObj.parcelas_valor_juros * 100}% a.m.)`;
            installmentValue = (totalValue * cardObj.parcelas_valor_juros) / (1 - (1 + cardObj.parcelas_valor_juros) ** -i);
            newTotalValue = ((totalValue * cardObj.parcelas_valor_juros) / (1 - (1 + cardObj.parcelas_valor_juros) ** -i)) * i;
        }

        items.push({ informacao: info, parcela: i, valorParcela: installmentValue, valorTotal: newTotalValue });
    }

    return items.map((item) => {
        return (
            <option key={item.parcela} value={item.parcela}>
                {`${item.parcela}x de R$ ${formatMoneyGet(item.valorParcela)} ${item.informacao} = R$ ${formatMoneyGet(item.valorTotal)}`}
            </option>
        );
    });
};
