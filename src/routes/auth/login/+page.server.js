import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
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
		const errorsObj = {};
		const findedUser = users.find((user) => user.email === formData.email);
		if (!validateEmail(formData.email)) {
			errorsObj.email = 'Email is not valid!';
		}

		const isPasswordCompare = bcrypt.compareSync(formData.password, findedUser?.password);
		if (findedUser !== undefined && isPasswordCompare) {
			console.log('LogUser');
			logedUser = findedUser;
		} else {
			errorsObj.password = 'Password is not correct!';
		}

		if (Object.values(errorsObj).length) {
			return fail(400, errorsObj);
		}
		return logedUser;
	},
	register: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		const findedUser = users.find((user) => user.email === formData.email);
		if (findedUser !== undefined) {
			return fail(400, { message: 'User is now register!' });
		}
		const errorsObj = {};
		if (!validateEmail(formData.email)) {
			errorsObj.email = 'Email is not valid!';
		}

		if (!formData.password || formData.password.length < 6) {
			errorsObj.password = 'Password is more 6 character!';
		}

		if (Object.values(errorsObj).length) {
			return fail(400, errorsObj);
		}

		if (validateEmail(formData.email)) {
			const findedUser = users.find((user) => user.email === formData.email);
			console.log('findedUser', findedUser);
			if (findedUser === undefined && formData.password) {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(formData.password, salt);
				const newUser = {
					email: formData.email,
					password: hash
				};
				users.push(newUser);
				logedUser = newUser;
			}
		}
	}
};
