import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import { changeChannel, setChannelModal, selectCurrentChannelId } from '../store/slice/appSlice.js';
import Loading from './Spinner.jsx';
import Channel from './Channel.jsx';

const ChannelSidebar = () => {
  const { t } = useTranslation();
  const { data: channels, isLoading } = useGetChannelsQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const dispatch = useDispatch();

  const handleShowModal = (modalName) => {
    dispatch(setChannelModal({ modalName }));
  };

  useEffect(() => {
    if (channels && currentChannelId === 1) {
      const { id, name } = channels[0];
      dispatch(changeChannel({ id, name }));
    }
  }, [channels, currentChannelId, dispatch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelSidebar.title')}</b>
        {isLoading && <Loading />}
        <button
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShowModal('adding')}
          type="button"
        >
          <PlusSquare
            color="royalblue"
            size={20}
          />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channel-box"
      >
        {channels?.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelSidebar;
