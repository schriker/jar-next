import { FieldError } from 'react-hook-form';
import Tooltip from '@material-ui/core/Tooltip';
import styles from 'components/Form/FormInput.module.css';

type FormInputPropsType = {
  register: () => void;
  errors: FieldError | undefined;
  tooltipContainer: HTMLDivElement | null;
  name: string;
  label: string;
  placeholder: string;
  title: string;
  type?: string;
  value?: string;
};

const FormInput = ({
  register,
  errors,
  tooltipContainer,
  name,
  label,
  placeholder,
  title,
  value,
  type = 'text',
}: FormInputPropsType) => {
  return (
    <div className={styles.row}>
      <label htmlFor={name}>{label}</label>
      <Tooltip
        PopperProps={{ container: tooltipContainer }}
        title={title}
        open={!!errors}
        placement="left"
        arrow
      >
        <input
          // ref={register()}
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          {...register()}
        />
      </Tooltip>
    </div>
  );
};

export default FormInput;
