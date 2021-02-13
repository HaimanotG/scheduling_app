const isEmpty = value => (value == null) ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)

const isEmail = value => {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regEx.test(value);
}

export default (schema, value) => {
    const errors = [];
    for (const s in schema) {
        if (schema[s].required && isEmpty(value[s])) {
            errors.push(`${s} should not be empty`);
        }
        
        if (value[s]) {
            if (schema[s].email && !isEmail(value[s])) {
                errors.push(`${value[s]} is not a valid email`);
            }

            if (schema[s].string) {
                var numbers = /^[0-9]+$/;
                if (value[s].match(numbers)) {
                    errors.push(`${s} should be string!`);
                }
            }
            if (schema[s].number && typeof value[s] !== "number") {
                errors.push(`${s} should be number!`);
            }

            if (schema[s].boolean && typeof value[s] !== "boolean") {
                errors.push(`${s} should be boolean!`);
            }

            if (schema[s].min_length && value[s].length < schema[s].min_length) {
                errors.push(`${s} should be greater than ${schema[s].min_length}!`)
            }

            if (schema[s].max_length && value[s].length < schema[s].max_length) {
                errors.push(`${value[s]} should not be above ${schema[s].max_length}!`)
            }
        }
    }

    return errors;
}

// export default (schemas, value) => {
//     const errors = [];

//     for (const schema in schemas) {
//         if (value[schema]) {
//             if (value[schema].required && value[schema].length === 0) {
//                 errors[schema] === `${value[schema]} should not be empty!`;
//             }

//             if (value[schema].max_length && value[schema].length > max_length) {
//                 errors[schema] === `${value[schema]} should not be above ${max_length}!`;
//             }

//             if (value[schema].min_length && value[schema].length > min_length) {
//                 errors[schema] === `${value[schema]} should not be above ${min_length}!`;
//             }
//         }
//     }
// }