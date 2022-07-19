export const validateForm = (form, customValidations) => {
	if (!customValidations) {
		return Object.keys(form).map((key) => {
			const tmp = { name: key, value: form[key], errors: [] };
			if (!form[key]) {
				tmp.errors.push("Completar este campo.");
			}
			return tmp;
		});
	}
};

export const formIsValid = (form) => {
	const errors = validateForm(form)
		.map((value) => value.errors.length === 0)
		.filter((isError) => isError === false);
	return errors.length === 0;
};
