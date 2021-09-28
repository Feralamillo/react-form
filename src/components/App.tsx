import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import axios from 'axios';

interface FormValues {
  fullName: string;
  email: string;
  description: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form className='form flex'>
      <h1>{message}</h1>
      <div className='fields flex'>
        <label htmlFor='fullName'>Full Name</label>
        <Field type='text' name='fullName' placeholder='Full Name' />
        {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
      </div>

      <div className='fields flex'>
        <label htmlFor='email'>Email</label>
        <Field type='email' name='email' placeholder='Email Address' />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>

      <div className='fields flex'>
        <label htmlFor='description'>Description</label>
        <Field
          as='textarea'
          name='description'
          rows='5'
          placeholder='Description'
          className='text-area'
        />
        {touched.description && errors.description && (
          <div>{errors.description}</div>
        )}
      </div>

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </Form>
  );
};

interface MyFormProps {
  message: string;
}

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: '',
      description: '',
      fullName: '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/.+@.+\..{2,}/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.fullName) {
      errors.fullName = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    return errors;
  },

  handleSubmit: async (values, actions) => {
    let response = await axios.post(
      'https://europe-west1-sample-form-327317.cloudfunctions.net/form-email',
      values
    );
    if (response.status === 200) {
      alert('Form Submitted Successfully');
      actions.resetForm();
    } else {
      alert('Something went wrong. Please try again!');
    }
    actions.setSubmitting(false);
  },
})(InnerForm);

const App = () => (
  <div className='form-container'>
    <MyForm message='Contact Us' />
  </div>
);

export default App;
