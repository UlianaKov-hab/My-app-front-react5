import * as React from 'react';
import { FieldHookConfig, useField } from 'formik';
import classNames from 'classnames';
interface OtherProps {
    label : string
  }

export const TextField = ( props : OtherProps & FieldHookConfig<string> ) => {
    const [field, meta] = useField(props);
    
    return (
      <div className="mb-3">
        <label htmlFor={field.name} className="form-label">
          {props.label}          
        </label>
        <input {...field} placeholder={props.placeholder} type={props.type}  className= { classNames("form-control",
                      {"is-invalid": meta.touched && meta.error},
                      {"is-valid": meta.touched && !meta.error}
                  )}
                  id={props.id}
                  name={props.name}
                  onChange={e => {                    
                    field.onChange(e);}}
                 />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </div>
    )
}


{/* <input type="text" 
                  className= { classNames("form-control",
                      {"is-invalid": touched.firstName && errors.firstName},
                      {"is-valid": touched.firstName && !errors.firstName}
                  )}
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  />
                  {touched.firstName && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>} */}