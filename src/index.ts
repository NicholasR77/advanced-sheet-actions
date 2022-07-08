import * as core from '@actions/core';

import { getInfoFromRequest } from './resources/getInfoFromRequest';
import { getSheets } from './resources/getSheetList';
import { getContent } from './resources/getContent';
import { getShortname } from './resources/getShortname';
import { triggerUploadWorkflow } from './resources/triggerUploadWorkflow';

const run = async () => {
    try {
        // Getting the GitHub token from the action itself
        const token = core.getInput('pal-repo-token');

        // Getting the repo, branch and files from current changes in the action
        const { repo, branch, files } = getInfoFromRequest(core.getInput('file-list'), core.getInput('separator'));

        // Parse the files to get the sheet names
        const sheets = getSheets(files);

        // Grab the approved.yaml file from repo
        const approvedYaml = await getContent({ repo, path: 'approved.yaml', ref: branch, token });
        if (!approvedYaml) throw new Error('Approved.yaml not found.');

        for (const sheet of sheets) {
            // Get the sheet's sheet.json file
            const sheetJson = await getContent({ repo, path: `${sheet}/sheet.json`, ref: branch, token });
            if (!sheetJson) throw new Error('Sheet.json not found.');

            const parsedSheetJson = JSON.parse(sheetJson);

            // If the sheet is an advanced sheet, continue the workflow
            if (parsedSheetJson?.advanced) {
                // Parse the shortname from the approved.yaml file
                const shortname = getShortname({yaml: approvedYaml, name: sheet});
                if (!shortname) throw new Error('Shortname not found. Check approved.yaml.');

                // Trigger a seperate action that runs webpack and uploads to gcs
                await triggerUploadWorkflow({ repo, foldername: sheet, shortname, token });
            }
        }
        
    } catch (error: any) {
        core.setFailed(error);
    }
}

run();