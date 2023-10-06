import React, { useState } from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from '@silevis/reactgrid';
import "@silevis/reactgrid/styles.css";

interface IEntry {
    name: string;
    surname: string;
}

const getColumns = (): Column[] => [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 }
];

const headerRow: Row = {
    rowId: 0,
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" }
    ]
};

export interface IShowTableProps {
}

export default function ShowTable(props: IShowTableProps) {

    const [entry, setEntry] = useState<IEntry[]>([]);
    const [columns, setColumns] = useState<Column[]>(getColumns())

    const getRows = (entry: IEntry[]): Row[] => [
        headerRow,
        ...entry.map<Row>((entry: IEntry, idx: number) => ({
            rowId: idx,
            cells: [
                { type: "text", text: entry.name },
                { type: "text", text: entry.surname }
            ]
        }))
    ];

    // const applyChangesToEntry = (
    //     changes: CellChange<TextCell>[],
    //     prevEntry: IEntry[]
    // ): IEntry[] => {
    //     changes.forEach((change) => {
    //         const entryIndex = change.rowId;
    //         const fieldName = change.columnId;
    //         prevEntry[entryIndex][fieldName] = change.newCell.text;
    //     });
    //     return [...prevEntry];
    // };


    // const handleChanges = (changes: CellChange<TextCell>[]) => {
    //     setEntry((prevEntry) => applyChangesToEntry(changes, prevEntry));
    // };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <ReactGrid
                columns={columns}
                rows={[]}
                // onCellsChanged={handleChanges}
            />
        </div>
    );

}
