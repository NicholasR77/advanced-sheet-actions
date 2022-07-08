import * as core from '@actions/core';
import * as github from '@actions/github'

import { TriggerUploadWorkflow } from '../types/triggerUploadWorkflow';

const triggerUploadWorkflow = async ({ repo, foldername, shortname, token}: TriggerUploadWorkflow) => {
    try {
        const octokit = github.getOctokit(token);

        await octokit.rest.actions.createWorkflowDispatch({
            owner: 'roll20',
            repo,
            workflow_id: 'webpack.yml',
            ref: 'tavern',
            inputs: {
                shortname,
                foldername,
            }
        });
    } catch(error: any) {
        core.setFailed(`The following error occurred while trying to create the workflow dispatch: ${error.message}.`);
    }
}

export { triggerUploadWorkflow };