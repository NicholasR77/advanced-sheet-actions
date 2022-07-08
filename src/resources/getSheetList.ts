// Returns an array of unique sheet names from a list of files
const getSheets = (files: string[]) => {
    const sheets: string[] = buildSheetList(files);
    return sheets;
};

// Parses the file list and turns into an array of sheets names
const buildSheetList = (files: string[]) => {
    const sheets: string[] = [];

    files.forEach(file => {
        const sheet = file.split('/').shift();

        if (sheet) sheets.push(sheet);
    });

    return [...new Set(sheets)];
}

export { getSheets };