import * as core from '@actions/core';
import * as github from '@actions/github'
import { decode } from 'js-base64';

import { GetContents } from '../types/getContents';

const getContent = async ({repo, path, ref, token}: GetContents) => {
    try {
        const octokit = github.getOctokit(token);
    
        const { data } = await octokit.rest.repos.getContent({
            owner: 'roll20',
            repo,
            path,
            ref
        });

        // If there is a content property, base64 decode and return it
        if ('content' in data) {
            return decode(data.content);
        } else if (Array.isArray(data)) {
            return;
        }
    } catch (error: any) {
        core.setFailed(`The following error occurred while trying to fetch content: ${error.message}. Make sure the content exists in the corresponding sheet.`);
    }
}

export { getContent };