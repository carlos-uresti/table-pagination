import React from 'react';
import { useState, useEffect } from 'react';


//calc range by filling an array with the number of elements in data
const calculateRange = (data, rowsPerPage) =>{
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    
    for(let i = 1; i <= num; i++)
    {   
        range.push(i);
    }

    return range;
}


const sliceData = (data, page, rowsPerPage) =>{
    return data.slice((page-1) * rowsPerPage, page * rowsPerPage);
}

const useTable = (data, page, rowsPerPage) => {

    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);

    useEffect(() =>{
        const range = calculateRange(data, rowsPerPage);
        // ... used for copying from original const
        // also used for concatenation e.g,  [range1,...range2]
        setTableRange([...range]);//this is a good way of stacking items in a useState

        const slice = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);

    }, [data, setTableRange, page, setSlice]);

    return {slice, range: tableRange}
};

export default useTable; 