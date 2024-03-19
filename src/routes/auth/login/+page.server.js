const users = [
	{
		email: 'yan@gmail.com',
		password: '123456'
	},
	{
		email: 'hom@gmail.com',
		password: '124568'
	}
];
let logedUser = {};
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return { users, user: logedUser };
}

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

export const actions = {
	login: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		console.log('formData', formData);
		if (validateEmail(formData.email)) {
			const findedUser = users.find((user) => user.email === formData.email);
			console.log('findedUser', findedUser);
			if (findedUser !== undefined && formData.password === findedUser?.password) {
				logedUser = findedUser;
			}
		}
	},
	register: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		console.log('formData', formData);
		if (validateEmail(formData.email)) {
			const findedUser = users.find((user) => user.email === formData.email);
			console.log('findedUser', findedUser);
			if (findedUser !== undefined && formData.password === findedUser?.password) {
				logedUser = findedUser;
			}
		}
	}
};
