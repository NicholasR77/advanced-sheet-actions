import * as github from '@actions/github'

const getInfoFromRequest = (fileList: string, separator: string) => {
    // Find the current repo name from the context we're in
    const { repo } = github.context.repo;
    // Grab the current branch from the context we're in
    const branch = github.context.ref.split('/')[2];
    // Parse file list arg using the given seperator
    const files: string[] = fileList.split(separator);

    return { repo, branch, files };
}

export { getInfoFromRequest };