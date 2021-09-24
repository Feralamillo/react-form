import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import axios from 'axios'

// Shape of form values
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
    <Form className="form flex">
      <h1>{message}</h1>
      <div className="fields flex">
        <label htmlFor="fullName">Full Name</label>
        <Field type="text" name="fullName" placeholder="Full Name" />
        {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
      </div>

      <div className="fields flex">
        <label htmlFor="email">Email</label>
        <Field type="email" name="email" placeholder="Email Address" />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>

      <div className="fields flex">
        <label htmlFor="description">Description</label>
        <Field
          as="textarea"
          name="description"
          rows="5"
          placeholder="Description"
          style={{
            padding: "0.5rem",
            border: "1px solid rgba(128, 128, 128, 0.308)",
            borderRadius: "5px",
          }}
        />
        {touched.description && errors.description && (
          <div>{errors.description}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: "",
      description: "",
      fullName: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/.+@.+\..{2,}/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.fullName) {
      errors.fullName = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    return errors;
  },

  handleSubmit: async(values, actions) => {
    let response = await axios.post("https://europe-west2-metal-map-326706.cloudfunctions.net/nodeMailer-1", values)
    if(response.status === 200){
        alert("Form Submitted Successfully")
        actions.resetForm()
    }
    else{
        alert("Something went wrong. Please try again!")
    }
    actions.setSubmitting(false);
  },
})(InnerForm);

// Use <MyForm /> wherevs
const Basic = () => (
  <div className="form-container">
    <MyForm message="Contact Us" />
  </div>
);

export default Basic;