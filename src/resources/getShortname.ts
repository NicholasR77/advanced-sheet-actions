import { GetShortname } from '../types/getShortname';

const getShortname = ({yaml, name }: GetShortname) => {
    // Splitting the approved yaml by new lines
    const splitStrings = yaml.split("\n")

    // Looping through the split strings and if we find the name, the shortname is 1 position before it
    for (let i = 0; i < splitStrings.length; i++) {
        const noDash = splitStrings[i].slice(2);

        if (noDash === name) {
            // Return the shortname minus the colon
            return splitStrings[i - 1].slice(0, -1);
        }
    }

    return '';
}

export { getShortname };