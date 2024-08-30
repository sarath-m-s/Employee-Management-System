export function jsonToCSV(json) {
    const keys = Object.keys(json[0]);
    const csvRows = [];

    // Add the header row
    csvRows.push(keys.join(","));

    // Add the data rows
    for (const row of json) {
        const values = keys.map((key) => {
            const escaped = ("" + row[key]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
}



