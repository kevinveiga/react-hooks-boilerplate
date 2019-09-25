import React from 'react';

import { Input } from './Form';

import { Cell, Grid } from '../../style/grid';

export const PesquisaForm = ({ ...props }) => {
    // ACTION
    const keyPress = (e) => {
        if (e.keyCode == 13) {
            window.location.pathname = `/pesquisa/${e.target.value}`;
        }
    };

    return (
        <Grid display="grid" gridAutoColumns="1fr" gridAutoRows="auto" px={2}>
            <Cell width="100%">
                <Input
                    id="pesquisa-field-id"
                    maxLength="50"
                    name="pesquisa"
                    placeholder="Pesquisa"
                    onKeyDown={(e) => {
                        keyPress(e);
                    }}
                    {...props}
                />
            </Cell>
        </Grid>
    );
};
