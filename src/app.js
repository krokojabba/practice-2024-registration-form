import _ from "lodash";
export default (state, initState) => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.fields = { ...initState.fields };
        state.status = 'filling';
    });

    form.addEventListener('focusout', (e) => {
        const fieldName = e.target.name;
        if (fieldName === 'button') return;
        const value = e.target.value;
        const { isValid, error } = state.fields[fieldName].validator(value, state);
        state.fields[fieldName] = {...state.fields[fieldName], value, error, isValid};
        const isValidForm = Object.keys(state.fields).every((fieldName) => state.fields[fieldName].isValid);
        if (isValidForm) state.status = 'valid';
    });
};