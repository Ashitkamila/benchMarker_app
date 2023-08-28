import React from 'react';
// import FormFileUpload from '../utils/FormFileUpload/FormFileUpload';
import { makeStyles, FormControlLabel, Switch, InputAdornment, IconButton } from '@material-ui/core';
import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const styles = makeStyles({
  insidebutton: {
    fontFamily: "Lato",
    position: 'relative',
    fontWeight: 'bold',
    left: '180px',
    top: '-30px',
    fontSize: '12px',
    backgroundColor: 'green',
    letterSpacing: '0.4px',
    color: '#FFFFFF'
  },
  label: {
    fontFamily: "Lato",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.4px',
    color: '#797979',
  },
})
export function InputControl(params) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    name,
    labelName,
    type,
    className,
    options,
    placeholder,
    icon,
    value,
    val,
    onChange,
    checked,
    onBlurValidateEmail,
    onFileChange,
    required,
    multiple,
    disabled,
    error=null,
    accept,
    ...other
  } = params;
  console.log("ac",accept);
  const classes = styles();
  if (type === 'text') {
    return (
      <div class="form-group">
        <label for={name} className={classes.label} >
          {labelName}{required ? <span className="text-danger m-2">*</span> : null}
          {icon}
        </label>
        <input
          type={type}
          class="form-control"
          id={name}
          className={className}
          value={value}
          //value={val}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onClickCapture={onBlurValidateEmail}
        />
      </div>
    );
  }
  if (type === 'select') {
    return (
      <div class="form-group">
        <label for={name} className={classes.label}>{labelName}{required ? <span className="text-danger m-2">*</span> : null}</label>
        {/* <select class="form-control"
          onChange={onChange} id={name} placeholder={placeholder} required={required} value={value} disabled={disabled} multiple={multiple}>
          {options &&
            options.map((dropdown, index) => (
              <option
                id={dropdown.value}
                key={index}
                onChange={onChange}
                defaultValue={dropdown.value}
                selected={dropdown.value === value ? true : false}
              >
                {dropdown.label}
              </option>
           
            ))}
        </select> */}
        <Dropdown 
          class="form-control"
          id={name}
          options={options}
          onChange={onChange}
          value={value}
          val={value}
          placeholder={placeholder} 
          required={required}
          disabled={disabled}
          />
      </div>
    );
  }
  if (type === 'file') {
    return (
      <div>
        <label style={{width:"200px "}} for={name} class="custom-file-input" className={classes.label}>{labelName}{required ? <span className="text-danger mr-5   ">*</span> : null}</label>
        {/* <FormFileUpload
          name={name}
          type="file"
          value={value}
          height={38}
          onFileChange={onFileChange}
          required={required}
          icon={icon}
          multiple={multiple}
          disabled={disabled}
          accept={accept}
        /> */}
      </div>
    );
  }
  if (type == "switch") {
    return (
      <div class="form-group">
        <label for={name} class="custom-file-input" className={classes.label}>{labelName}{required ? <span className="text-danger m-2">*</span> : null}</label>
        <FormControlLabel
          control={<Switch
            checked={checked}
            onChange={onChange}
            name={name}
            color="primary"
          />}
          // label="Active Since"
          labelPlacement="top"
        />
      </div>
    )
  }
  if (type === 'text-area') {
    return (
      <div class="form-group">
        <label for={name} className={classes.label}> {labelName}{required ? <span className="text-danger m-2">*</span> : null}</label>
        <textarea
          class="form-control"
          id={name}
          className={className}
          rows="3"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
  if (type === 'number') {
    return (
      <div class="form-group">
        <label for={name} className={classes.label} >
          {labelName}{required ? <span className="text-danger m-2">*</span> : null}
          {icon}
        </label>
        <input
          type={type}
          class="form-control"
          id={name}
          className={className}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onClickCapture={onBlurValidateEmail}
          error
          
          // {...other}
          // {...(error && {error: true, helperText: error})}
        />
      </div>
    );
  }
  if (type === 'password') {
    return (
      <div class="form-group">
        <label for={name} className={classes.label} >
          {labelName}{required ? <span className="text-danger m-2">*</span> : null}
          {icon}
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          class="form-control"
          id={name}
          className={className}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onClickCapture={onBlurValidateEmail}
          error

          // endAdornment={

          //   <InputAdornment position="end">
          //       <IconButton
          //         aria-label="toggle password visibility"
          //        // onClick={handleClickShowPassword}
          //         //onMouseDown={handleMouseDownPassword}
          //         edge="end"
          //       >
          //         {showPassword ? <Visibility /> : <VisibilityOff />}
          //       </IconButton>
          //     </InputAdornment>
          // }
          
          // {...other}
          // {...(error && {error: true, helperText: error})}
        />
      </div>
    );
  }
}
