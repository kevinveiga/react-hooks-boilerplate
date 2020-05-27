import React from 'react';

import { formatMoneyGet } from '../../util/formatData';

export const OptionParcelas = ({ cardObj, totalValue }) => {
    const items = [];
    let installmentValue = totalValue;
    let interest = 's/ juros';
    let newTotalValue = totalValue;

    for (let i = 1, l = cardObj.parcelas_quantidade; i < l + 1; i += 1) {
        if (i < cardObj.parcelas_sem_juros + 1) {
            installmentValue = totalValue / i;
        } else {
            interest = `c/ juros (${cardObj.parcelas_valor_juros * 100}% a.m.)`;
            installmentValue = (totalValue * cardObj.parcelas_valor_juros) / (1 - (1 + cardObj.parcelas_valor_juros) ** -i);
            newTotalValue = ((totalValue * cardObj.parcelas_valor_juros) / (1 - (1 + cardObj.parcelas_valor_juros) ** -i)) * i;
        }

        items.push({
            juros: interest,
            parcelas_quantidade: i,
            parcelas_valor: formatMoneyGet(installmentValue),
            valor_total: formatMoneyGet(newTotalValue)
        });
    }

    return items.map((item) => {
        return (
            <option key={item.parcelas_quantidade} value={JSON.stringify(item)}>
                {`${item.parcelas_quantidade}x de R$ ${item.parcelas_valor} ${item.juros} = R$ ${item.valor_total}`}
            </option>
        );
    });
};
