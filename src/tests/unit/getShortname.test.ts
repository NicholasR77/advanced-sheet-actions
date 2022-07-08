const fs = require('fs');

import { getShortname } from '../../resources/getShortname';

const approvedYaml = fs.readFileSync('./src/partials/approved.yaml', 'utf8');
const sheetName = 'Test Sheet'
const shortName = 'testsheet1';
const unknownSheetName = 'Test Sheet 3';

describe('getShortname', () => {
    test('returns the shortname of the sheet by parsing a yaml file', () => {
        const result = getShortname({ yaml: approvedYaml, name: sheetName });

        expect(result).toEqual(shortName);
    });

    test('returns an empty string if the shortname could not be found', () => {
        const result = getShortname({ yaml: approvedYaml, name: unknownSheetName });

        expect(result).toEqual('');
    });
})