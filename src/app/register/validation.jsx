const validation = (values) => {
    let errors = {};
    let specialLetter = /^[a-zA-Z0-9]+$/;
    if (!values.username) {
        errors.username = 'This field is required';
    } else if (values.username.indexOf(' ') !== -1) {
        errors.username = 'Username must not have the empty space ';
    } else if (values.username.length < 6) {
        errors.username = 'Username must have min 6 letters';
    } else if (!specialLetter.test(values.username)) {
        errors.username = 'Username must not have the special letter';
    } else if (values.username.includes("'")) {
        errors.username = 'Username is invalid';
    }
    if (!values.email) {
        errors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid, please check again( ex: mrAbc@gmail.com,...)';
    } else if (values.email.indexOf(' ') !== -1) {
        errors.email = 'Email must not have the empty space ';
    } else if (values.email.includes("'")) {
        errors.email = 'Email is invalid';
    }
    if (!values.password) {
        errors.password = 'This field is required ';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be more than 6 characters';
    } else if (values.password.indexOf(' ') !== -1) {
        errors.password = 'Password must not have the empty space';
    } else if (values.password.includes("'")) {
        errors.password = 'Password is invalid';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm password is not correct, please check again !';
    }
    return errors;
};
export default validation;
