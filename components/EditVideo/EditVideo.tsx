import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import EditVideoForm from './EditVideoForm';
import styles from 'components/EditVideo/EditVideo.module.css';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import ControllButton from 'components/ControllButton/ControllButton';
import { Video } from 'types/video';

type EditVideoPropsType = {
  video: Video;
};

const EditVideo = ({ video }: EditVideoPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className={styles.wrapper}>
      <EditVideoForm
        video={video}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
      <ControllButton
        tooltipContainer={ref.current}
        onClick={() => setIsOpen(true)}
        tooltip="Edytuj"
        red={isOpen}
      >
        <div>
          <FontAwesomeIcon icon={faWrench} />
        </div>
      </ControllButton>
    </div>
  );
};

export default EditVideo;
