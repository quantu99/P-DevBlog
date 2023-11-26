const validation = (values) => {
    let errors = {};
    let specialLetter = /^[a-zA-Z0-9]+$/;
    if (!values.username) {
        errors.username = 'This field is required';
    } else if (values.username.indexOf(' ') !== -1) {
        errors.username = 'Username must not have the empty space ';
    } else if (!specialLetter.test(values.username)) {
        errors.username = 'Username must not have the special letter';
    }
    if (!values.password) {
        errors.password = 'This field is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be more than 6 characters';
    } else if (values.password.indexOf(' ') !== -1) {
        errors.password = 'Password must not have the empty space';
    } else if (values.password.includes("'")) {
        errors.password = 'Password is invalid';
    }
    return errors;
};
export default validation;
