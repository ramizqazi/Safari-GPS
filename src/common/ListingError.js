// @flow

import * as React from 'react';
import MessageView from './MessageView';
import { translator } from '../languages';

/* flow types
====================================================================== */
type Props = {
  name: string,
  error: string | Object | null,
  retryBtnPress?: ?Function,
};

/* ====================================================================
<ListingError />
====================================================================== */
const ListingError = ({ name, error, retryBtnPress }: Props) => {
  const {
    NO_RECORD_FOUND,
    THERE_ARE_NO,
    ALL_ADDED,
    WILL_BE_DISPLAY_HERE,
    OFFLINE_ERROR_MESSAGE,
    OFFLINE_ERROR_DESC,
    OOPS_ERROR_MESSAGE,
    OOPS_ERROR_DESC,
  } = translator;
  if (!error) {
    return null;
  }
  if (error === NO_RECORD_FOUND) {
    return (
      <MessageView
        icon="sms-failed"
        message={`${name} ${THERE_ARE_NO}`}
      />
    );
  }

  if (error === 'Network Error') {
    return (
      <MessageView
        icon="wifi-tethering"
        message={OFFLINE_ERROR_MESSAGE}
        desc={OFFLINE_ERROR_DESC}
        retryBtn
        retryBtnName="TAP TO RETRY"
        retryBtnPress={retryBtnPress}
      />
    );
  }
  return (
    <MessageView
      icon="error-outline"
      message={OOPS_ERROR_MESSAGE}
      desc={OOPS_ERROR_DESC}
    />
  );
};

/* Default Props
====================================================================== */
ListingError.defaultProps = {
  retryBtnPress: null,
};

/* Exports
====================================================================== */
export default ListingError;
