import React from "react";
import { Form } from "react-bootstrap";
import { useGetOrganizationCategoriesQuery } from "../../../../redux/slices/awardCategories";
const OrganizationNominationCategories = ({
  touched,
  handleChange,
  handleBlur,
  errors,
}) => {
  const { data = [], error, isLoading } = useGetOrganizationCategoriesQuery();
  if (error) {
    return <h3 className="text-danger">Error fetching categories</h3>;
  }
  if (!isLoading) {
    console.log("Organization categories", data);
    return (
      <Form.Group className="mb-3">
        <Form.Label>Category you would like to nominate in</Form.Label>
        <Form.Select
          size="lg"
          name="category"
          isInvalid={Boolean(touched.category && errors.category)}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          <option value="">--Select a category--</option>
          {data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Form.Select>
        {!!touched.category && (
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
  return <h3>Fetching categories</h3>;
};
export default OrganizationNominationCategories;
