import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Form/FormInput';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import FormSubmitButton from 'components/Form/FormSubmitButton';
import { Video } from 'types/video';
import { editVideo } from 'helpers/api';

type EditVideoFormPropsType = {
  isOpen: boolean;
  close: () => void;
  video: Video;
};

type Inputs = {
  title: string;
  thumbnail: string;
  duration: string;
  started: string;
  keywords: string;
};

const EditVideoForm = ({ isOpen, close, video }: EditVideoFormPropsType) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.duration,
      started: video.started,
      keywords: video.keywords,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await editVideo({
        streamer: 'wonziu',
        video: {
          ...video,
          ...data,
        },
      });
      closeModal();
      setLoading(false);
    } catch (error) {
      dispatch(setNotification('Błąd edytowania video.'));
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
              label="Tytuł"
              title="Podaj tytuł."
              placeholder="Tytuł"
              name="title"
              tooltipContainer={tooltipContainer.current}
              errors={errors.title}
              register={() =>
                register('title', {
                  required: true,
                })
              }
            />
            <FormInput
              label="Miniaturka"
              title="Podaj url."
              placeholder="Miniaturka"
              name="thumbnail"
              tooltipContainer={tooltipContainer.current}
              errors={errors.thumbnail}
              register={() =>
                register('thumbnail', {
                  required: true,
                })
              }
            />
            <FormInput
              label="Czas trwania"
              title="Podaj czas."
              placeholder="Czas trwania"
              name="duration"
              tooltipContainer={tooltipContainer.current}
              errors={errors.duration}
              register={() =>
                register('duration', {
                  required: true,
                })
              }
            />
            <FormInput
              label="Data"
              title="Podaj datę."
              placeholder="Data"
              name="started"
              tooltipContainer={tooltipContainer.current}
              errors={errors.started}
              register={() =>
                register('started', {
                  required: true,
                })
              }
            />
            <FormInput
              label="Słowa kluczowe"
              title="Podaj słowa kluczowe."
              placeholder="Słowa kluczowe"
              name="keywords"
              tooltipContainer={tooltipContainer.current}
              errors={errors.keywords}
              register={() => register('keywords')}
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

export default EditVideoForm;
