// Most of this code is from the scratch-vm, this just helps make the ids be in sync with scratch.
const soup_ = '!#%()*+,-./:;=?@[]^_`{|}~' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * This function is straight from the scratch-vm project.
 * It's just to keep the uid's in sync with it.
 */
export default function uid(): string {
	const length = 20;
    const soupLength = soup_.length;
    const id: string[] = [];
    for (let i = 0; i < length; i++) {
        id[i] = soup_.charAt(Math.random() * soupLength);
    }
    return id.join('');
}
