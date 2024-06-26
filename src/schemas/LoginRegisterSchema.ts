import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .max(300)
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .max(300)
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const regSchema = Yup.object().shape({
  name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Not a valid name')
    .max(300, 'Name must be at most 300 characters long')
    .required('Name is required'),

  email: Yup.string()
    .max(300)
    .email('Invalid email')
    .required('Email is required'),

  userName: Yup.string()
    .max(300)
    .matches(/^\S*$/, 'Username cannot contain spaces')
    .required('Username is required'),

  password: Yup.string()
    .max(300)
    .min(8, 'Must be at least 8 characters')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required('Password is required'),

  confPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password required'),
});

const categoryForm = Yup.object().shape({
  label: Yup.string().max(300).required('Label is required')
})

export { loginSchema, regSchema, categoryForm };
