// csvSlice.js (already shared)
import { createSlice } from "@reduxjs/toolkit";

function convertDataToCSV(data) {
    const csvRows = [];
    for (const item of data) {
        const values = Object.values(item);
        const row = values.map(value => `"${value}"`).join(",");
        csvRows.push(row);
    }
    return csvRows.join("\n");
}

 const csvExportSlice = createSlice({
    name: 'csvFile',
    initialState: [],
    reducers: {
        fileToCsv: (state, action) => {
            const csvData = convertDataToCSV(action.payload);
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'expenses.csv';
            a.click();
            URL.revokeObjectURL(url);
        }
    }
});

export const csvActions = csvExportSlice.actions;
export default csvExportSlice.reducer;
