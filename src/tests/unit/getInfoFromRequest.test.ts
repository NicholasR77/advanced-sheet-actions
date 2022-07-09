import * as github from '@actions/github'
import { getInfoFromRequest } from '../../resources/getInfoFromRequest';

const ownerName = 'test-owner';
const repoName = 'test-repo';
const branchName = 'test-branch';
const branchString = 'string/string/test-branch'
const sheetsWithPath = ['sheet1/path1/', 'sheet2/path1/path2', 'sheet3/path1/path2/path3'];

describe('getInfoFromRequest', () => {
    beforeEach(() => {
        jest.spyOn(github.context, 'repo', 'get').mockReturnValue({ owner: ownerName, repo: repoName });
        github.context.ref = branchString;
    });

    test('returns the repo, branch, and changes files', () => {
        const fileList = 'sheet1/path1/,sheet2/path1/path2,sheet3/path1/path2/path3';
        const seperator = ',';

        const { repo, branch, files } = getInfoFromRequest(fileList, seperator)

        expect(repo).toEqual(repoName);
        expect(branch).toEqual(branchName);
        expect(files).toEqual(sheetsWithPath);
    });

    test('returns the repo, branch, and changes files with a different separator', () => {
        const fileList = 'sheet1/path1/|sheet2/path1/path2|sheet3/path1/path2/path3';
        const seperator = '|';

        const { repo, branch, files } = getInfoFromRequest(fileList, seperator)

        expect(repo).toEqual(repoName);
        expect(branch).toEqual(branchName);
        expect(files).toEqual(sheetsWithPath);
    });
})