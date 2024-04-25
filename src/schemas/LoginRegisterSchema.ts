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

const questionForm = Yup.object().shape({
  question: Yup.string().max(5000).required(),
  option1: Yup.string().max(5000).required(),
  option2: Yup.string().max(5000).required(),
  option3: Yup.string().max(5000).required(),
  option4: Yup.string().max(5000).required(),
  explaination: Yup.string().max(5000).required(),
  correctOption: Yup.number().required().notOneOf([-1], 'Choose correct option.'),
  selectedSubject: Yup.string().max(5000).required(),
  selectedTopic: Yup.string().max(5000).required(),
  selectedSection: Yup.string().max(5000).required(),
  selectedExam: Yup.string().max(5000).required()
})

export { loginSchema, regSchema, categoryForm, questionForm };
