import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputGroup = ({icon, name, placeholder, value, error, info, type, onChange}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<FontAwesomeIcon icon={icon} />
				</span>
			</div>
			<input 
			className={classnames("form-control form-control-lg", {
				'is-invalid': error
			})} 
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && (<div className="invalid-feedback">{error}</div>)}
		</div>
	)
};

InputGroup.propTypes = {
	icon: PropTypes.object,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
	type: 'text'
}

export default InputGroup;