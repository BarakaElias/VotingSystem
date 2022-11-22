import React from "react";
// import { Helmet } from "react-helmet-async";

import { Form, Row, Col, Table } from "react-bootstrap";
import { FieldArray, Field, ErrorMessage } from "formik";
// import { Navigate } from "react-router";
import { Check, Loader, X } from "react-feather";

const formControl = (props) => {
  let inputControl = null;
  let ind = -1;
  // console.log("h", props.initValue);

  // console.log(props.controlName);
  switch (props.type) {
    case "text":
      inputControl = (
        <Form.Group key={props.placeHolder} className="mb-3">
          <Form.Label key={props.placeHolder + "label"}>
            {props.label}
          </Form.Label>
          <Form.Control
            // onChange={(event) => props.setValToState(event, props.ident)}
            type="text"
            onBlur={props.onControlBlur}
            onChange={props.handleChange}
            name={props.controlName}
            value={props.initValue}
            key={props.placeHolder + "control"}
            placeholder={props.placeHolder}
          />
        </Form.Group>
      );
      break;
    case "select":
      inputControl = (
        <Form.Group key={props.placeHolder} className="mb-3">
          <Form.Label key={props.placeHolder + "label"}>
            {props.label}
          </Form.Label>
          <Form.Select
            key={props.placeholder + "select"}
            // onChange={(event) => props.setValToState(event, props.ident)}
            onChange={props.handleChange}
            name={props.controlName}
            value={props.initValue}
            placeholder={props.placeHolder}
          >
            <option></option>
            {props.options.map((option) =>
              props.initValue === option ? (
                <option key={option} value={option} selected>
                  {option}
                </option>
              ) : (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </Form.Select>
        </Form.Group>
      );
      break;
    case "textarea":
      inputControl = (
        <Form.Group key={props.placeHolder} className="mb-3">
          <Form.Label key={props.placeHolder + "label"}>
            {props.label}
          </Form.Label>
          <Form.Control
            onChange={props.handleChange}
            name={props.controlName}
            value={props.initValue}
            key={props.placeHolder + "control"}
            as="textarea"
            placeholder={props.placeHolder}
          />
        </Form.Group>
      );
      break;
    case "checkbox":
      inputControl = props.initValue ? (
        <Form.Group key={props.label} className="m-5 w-25">
          <Form.Label key={props.label + "label"}>
            Is the Sender ID Active?
          </Form.Label>
          <Form.Check
            type="checkbox"
            onChange={props.handleChange}
            name={props.controlName}
            value={props.initValue}
            checked
            variant={"lg"}
            key={props.label + "control"}
            label="Active"
          />
        </Form.Group>
      ) : (
        <Form.Group key={props.label} className="m-5 w-25">
          <Form.Label key={props.label + "label"}>
            Is the Sender ID Active?
          </Form.Label>
          <Form.Check
            type="checkbox"
            onChange={props.handleChange}
            name={props.controlName}
            variant={"lg"}
            value={props.initValue}
            key={props.label + "control"}
            label="Active"
          />
        </Form.Group>
      );
      break;

    default:
      break;
  }

  return inputControl;
};

export default formControl;
