import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Divider, Box } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getMails } from '../../../redux/slices/mail';
//
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
import MailItem from './MailItem';
import MailToolbar from './MailToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------

MailList.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function MailList({ onOpenSidebar, mail3Block }) {
  const params = useParams();

  const dispatch = useDispatch();

  const { mails } = useSelector((state) => state.mail);

  const [selectedMails, setSelectedMails] = useState([]);

  const [dense, setDense] = useState(false);

  const isEmpty = mails.allIds.length < 1;

  useEffect(() => {
    dispatch(getMails(params));
  }, [dispatch, params]);

  const handleSelectAllMails = () => {
    setSelectedMails(mails.allIds.map((mailId) => mailId));
  };

  const handleToggleDense = () => {
    setDense((prev) => !prev);
  };

  const handleDeselectAllMails = () => {
    setSelectedMails([]);
  };

  const handleSelectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }
      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => prevSelectedMails.filter((id) => id !== mailId));
  };
  console.log(mails);

  return (
    <RootStyle>
      {/* <MailToolbar
        mails={mails.allIds.length}
        selectedMails={selectedMails.length}
        onSelectAll={handleSelectAllMails}
        onOpenSidebar={onOpenSidebar}
        onDeselectAll={handleDeselectAllMails}
        onToggleDense={handleToggleDense}
      /> */}

      <Divider />

      {!isEmpty ? (
        <Scrollbar>
          <Box sx={{ minWidth: { md: 800 } }}>
            {mail3Block.map((mailInfo) => (
              <MailItem
                isCheck={mailInfo.isCheck}
                content={mailInfo.content}
                username={mailInfo.username}
                createdAt={mailInfo.createdAt}
                keys={mailInfo._id + 'asd'}
                key={mailInfo._id}
                isDense={dense}
                // mail={mails.byId[mailInfo._id]}
                isSelected={selectedMails.includes(mailInfo._id)}
                onSelect={() => handleSelectOneMail(mailInfo._id)}
                onDeselect={() => handleDeselectOneMail(mailInfo._id)}
              />
            ))}
          </Box>
        </Scrollbar>
      ) : (
        <EmptyContent
          title="There is no conversation"
          img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_mail.svg"
          sx={{ flexGrow: 1, height: 'auto' }}
        />
      )}
    </RootStyle>
  );
}
