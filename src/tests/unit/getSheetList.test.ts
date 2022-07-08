import { getSheets } from '../../resources/getSheetList';

const sheetsWithPath = ['sheet1/path1/', 'sheet2/path1/path2', 'sheet3/path1/path2/path3'];
const sheetsWithoutPath = ['sheet1', 'sheet2', 'sheet3'];
const sheetsWithPathAndDuplicates = ['sheet1/path1/', 'sheet1/path1/', 'sheet2/path1/path2', 'sheet3/path1/path2/path3'];

describe('getSheets', () => {
    test('returns a list of parsed sheets', () => {
        const sheets = getSheets(sheetsWithPath);

        expect(sheets).toEqual(sheetsWithoutPath);
    });

    test('returns only unique values', () => {
        const sheets = getSheets(sheetsWithPathAndDuplicates);

        expect(sheets).toEqual(sheetsWithoutPath);
    });
});