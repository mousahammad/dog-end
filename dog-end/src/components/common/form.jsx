import React from "react";
import Input from "./input";
import Joi from "joi";

class Form extends React.Component {
  validateInput({ name, value }) {
    const data = {
      [name]: value,
    };
    const schema = Joi.object({
      [name]: this.schema[name],
    });
    const { error } = schema.validate(data);
    return error ? error.details[0].message : null;
  }

  validateForm() {
    const { schema, form } = this;

    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setError({ errors });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  handleChange = ({ target }) => {
    const { form, errors } = this;
    this.setForm((form) => {
      return {
        ...form,
        [target.name]: target.value,
      };
    });
    this.setError((errors) => {
      return { ...errors, [target.name]: this.validateInput(target) };
    });
  };

  renderInput({ name, label, type = "text" }) {
    const { form, errors } = this;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        onChange={this.handleChange}
        value={form[name]}
        error={errors?.[name]}
      />
    );
  }
  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }
}
export default Form;
