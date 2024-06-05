import dayjs from "dayjs";

export default () => {
    const state = {
        fields: {
            firstName: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^[a-zA-Zа-яА-ЯёЁ]{1,20}$/.test(value)) return ({ isValid: true, error: 'aaa' });
                    return ({ isValid: false, error: 'The first name must contain from 1 to 20 characters. Numbers and special characters are not allowed.' });
                },
                error: '',
            },
            lastName: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^[a-zA-Zа-яА-ЯёЁ]{1,20}$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'The last name must contain from 1 to 20 characters. Numbers and special characters are not allowed.' });
                },
                error: '',
            },
            email: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^.+@.+\..+$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'Invalid email' });
                },
                error: '',
            },
            password: {
                value: null,
                isValid: null,
                validator: (value) => {
                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one special character: @$!%*?&' });
                },
                error: '',
            },
            passwordConfirm: {
                value: null,
                isValid: null,
                validator: (value, state) => {
                    if (!state.fields.password.isValid) return ({ isValid: false, error: 'Enter valid password first' })
                    if (value === state.fields.password.value) return ({ isValid: true, error: '' });
                    return ({ isValid: false, error: 'Password confirm must equal password' });
                },
                error: '',
            },
            birthDay: {
                value: null,
                isValid: null,
                validator: (value) => {
                    const result = { isValid: false };
                    const birthDay = dayjs(value, 'DD.MM.YYY', true);
                    if (!birthDay.isValid()) result.error = 'Invalid date format';
                    else if (dayjs().diff(birthDay,'year') < 18) result.error = 'You must be 18 years old or older';
                    else result.isValid = true
                    return result;
                },
                error: '',
            },
        },
        status: 'filling', // valid, invalid
    };
    return state;
};
