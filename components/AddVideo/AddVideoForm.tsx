import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Form/FormInput';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import FormSubmitButton from 'components/Form/FormSubmitButton';
import checkVideoURL from 'helpers/checkVideoURL';
import { fetchTwitchVideos, fetchYouTubeVideo } from 'helpers/api';
import { useRouter } from 'next/router';
import { setSource } from 'store/slices/appPlayer';

type AddVideoFormPropsType = {
  isOpen: boolean;
  close: () => void;
};

type Inputs = {
  url: string;
};

const AddVideoForm = ({ isOpen, close }: AddVideoFormPropsType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = handleSubmit(async ({ url }) => {
    try {
      let video = null;
      setLoading(true);
      const videoType = checkVideoURL(url);
      if (videoType.id && videoType.name) {
        if (videoType.name === 'twitch') {
          const response = await fetchTwitchVideos({ id: videoType.id });
          video = response.videos[0];
        } else {
          const response = await fetchYouTubeVideo(videoType.id);
          video = response;
        }
        if (videoType.name === 'youtube') {
          dispatch(setSource('YOUTUBE'));
        }
        closeModal();
        setLoading(false);
        router.push(
          {
            pathname: '/video',
            query: {
              video: JSON.stringify(video),
            },
          },
          '/'
        );
      } else {
        throw new Error('Błąd URL :(');
      }
    } catch (error) {
      dispatch(
        setNotification('Upewnij się, że podałeś adres do zapisu streamu.')
      );
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
              label="Twitch lub YouTube"
              title="Podaj adres video Twitch lub YouTube."
              placeholder="Adres video"
              name="url"
              tooltipContainer={tooltipContainer.current}
              errors={errors.url}
              register={() =>
                register({
                  required: true,
                  pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
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
