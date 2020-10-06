import { FieldError } from 'react-hook-form';
import Tooltip from '@material-ui/core/Tooltip';
import styles from 'components/Form/FormInput.module.css';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

type FormInputPropsType = {
  register: () => RefReturn;
  errors: FieldError | undefined;
  tooltipContainer: HTMLDivElement | null;
  name: string;
  label: string;
  placeholder: string;
  title: string;
  type?: string;
};

const FormInput = ({
  register,
  errors,
  tooltipContainer,
  name,
  label,
  placeholder,
  title,
  type = "text"
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
          ref={register()}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
        />
      </Tooltip>
    </div>
  );
};

export default FormInput;