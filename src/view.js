import onChange from 'on-change';

const clearForm = (form) => {
    const existFeedbacks = form.querySelectorAll('.invalid-feedback');
    if (existFeedbacks) existFeedbacks.forEach((feedback) => feedback.remove());
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => input.classList.remove('is-valid', 'is-invalid'));
  };

const renderForm = (form, state) => {
    switch (state.status) {
        case 'filling': {
            clearForm(form);
            form.elements.button.disabled = true;
            Object.keys(state.fields).forEach((fieldName) => {
                form.elements[fieldName].value = '';
            });
            break;
        }
        case 'valid': {
            form.elements.button.disabled = false;
            break;
        }
        case 'invalid': {
            form.elements.button.disabled = true;
            break;
        }
        default:
            break;
    }
};

const renderFormFields = (form, state) => {
    clearForm(form);
    Object.keys(state.fields).forEach((fieldName) => {
        if (state.fields[fieldName].value === null) return;
        if (state.fields[fieldName].isValid) form.elements[fieldName].classList.add('is-valid');
        else {
            form.elements[fieldName].classList.add('is-invalid');
            const invalidMessage = document.createElement('div');
            invalidMessage.textContent = state.fields[fieldName].error;
            invalidMessage.classList.add('invalid-feedback');
            invalidMessage.id = `${fieldName}Feedback`;
            form.elements[fieldName].after(invalidMessage);
        }
    });
};

export default (initState) => {
    const form = document.querySelector('form');

    const state = onChange(initState, (path, current, previous) => {
        console.log(`${path}: '${previous}' => '${JSON.stringify(current, null, 2)}'`);
        switch (path) {
            case 'status': {
                renderForm(form, state);
                break;
            }
            case path.match(/^fields/)?.input: {
                renderFormFields(form, state);
                break;
            }
            default:
                break;
        }
    }
    );
    return state;
};
