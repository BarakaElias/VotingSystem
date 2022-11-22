import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import FormControl from "./formControl";

import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import { Formik, FieldArray } from "formik";

const ModalForm = (props) => {
  console.log("To see props", props);

  const user = useSelector((state: RootStateOrAny) => state.user.value);
  let formEl = { ...props.content };
  const formElementsArray = [];
  // const formElObject = {};
  for (let key in formEl) {
    if (key !== "title" && key !== "submitButton" && key !== "submitFunction") {
      formElementsArray.push({
        key: key,
        config: formEl[key],
      });
    }
  }

  const [modalForm, setModalFormState] = useState({ modForm: props.content });
  const inputChangedHandler = (event, inputIdent) => {
    const updatedForm = { ...modalForm.modForm };
    updatedForm[inputIdent].value = event.target.value;
    setModalFormState({ modForm: updatedForm });
  };

  const [matrixState, setMatrixState] = useState({ country: "Tanzania" });

  const formDataToParams = () => {
    const params = {
      api_id: user.api_id,
      api_password: user.api_password,
    };
    for (let data in { ...modalForm.modForm }) {
      if (data !== "submitButton" && data !== "title") {
        const val = modalForm.modForm[data].value;
        params[data] = val;
      }
    }
    props.submitFormFunc(params);
  };

  let mno_list = [];
  // console.log("From Modal Form", props.content);

  // console.log(props.initialValues);

  return (
    <Modal key="haha" show={true} size="xl" centered>
      <Modal.Header>
        <h2>{formEl["title"].value}</h2>
      </Modal.Header>
      <Formik
        initialValues={{ ...props.initialValues }}
        enableReinitialize={true}
        // validationSchema={props.validationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          //function to call
          props.submitFormFunc(values);
          console.log(values);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="m-3">
              {formElementsArray.map((formElement) => (
                <React.Fragment>
                  <FormControl
                    initValue={values[formElement.key]}
                    onControlBlur={handleBlur}
                    controlName={formElement.key}
                    handleChange={handleChange}
                    registered_nets={values.registered_networks}
                    ident={formElement.key}
                    type={formElement.config.type}
                    label={formElement.config.label}
                    placeHolder={formElement.config.placeHolder}
                    required={formElement.config.required}
                    options={formElement.config.options}
                    setValToState={inputChangedHandler}
                  />
                </React.Fragment>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={props.closeModalFunc}>
                Cancel
              </Button>{" "}
              <Button
                type="submit"
                // onClick={formDataToParams}
              >
                {formEl["submitButton"].placeHolder}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalForm;
