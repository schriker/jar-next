import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Form/FormInput';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import FormSubmitButton from 'components/Form/FormSubmitButton';
import { newVideo } from 'helpers/api';
import { useRouter } from 'next/router';
import { setSource } from 'store/slices/appPlayer';

type AddVideoFormPropsType = {
  isOpen: boolean;
  close: () => void;
};

type Inputs = {
  id: string;
};

const AddVideoForm = ({ isOpen, close }: AddVideoFormPropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async ({ id }) => {
    try {
      setLoading(true);
      const video = await newVideo({ id: id, streamer: 'wonziu' });
      closeModal();
      setLoading(false);
      dispatch(setSource('YOUTUBE'));
      router.push(`wonziu/video/${video.id}`);
    } catch (error) {
      dispatch(setNotification('Błąd dodawania video.'));
      setLoading(false);
    }
  });

  const closeModal = () => {
    close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      {(tooltipContainer) => (
        <div>
          <form onSubmit={onSubmit}>
            <FormInput
              label="YouTube"
              title="Podaj id video."
              placeholder="Video"
              name="id"
              tooltipContainer={tooltipContainer.current}
              errors={errors.id}
              register={() =>
                register('id', {
                  required: true,
                })
              }
            />
            <div>
              <FormSubmitButton disabled={isLoading} />
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default AddVideoForm;
