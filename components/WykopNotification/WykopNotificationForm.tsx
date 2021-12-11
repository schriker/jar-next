import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import FormSubmitButton from 'components/Form/FormSubmitButton';
import { sendWykopNotification } from 'helpers/api';

type WykopNotificationFormPropsType = {
  isOpen: boolean;
  close: () => void;
};

const WykopNotificationForm = ({
  isOpen,
  close,
}: WykopNotificationFormPropsType) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendWykopNotification('wonziu');
      closeModal();
      setLoading(false);
    } catch (error) {
      dispatch(setNotification('Błąd wysyłania powiadomienia na wykop.'));
      setLoading(false);
    }
  };

  const closeModal = () => {
    close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      {() => (
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <FormSubmitButton disabled={isLoading} />
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default WykopNotificationForm;
