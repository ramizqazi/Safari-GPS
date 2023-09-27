// @flow

import React from 'react';
import Dialog from '../../common/Dialog';
import Div from '../../common/Div';
import Text from '../../common/Text';

/* Flow types
============================================================================= */
type Props = {
  visible: boolean,
  onClose: Function,
};

/* =============================================================================
<MaintenanceStatusModal />
============================================================================= */
const MaintenanceStatusModal = ({ data, visible, onClose }): Props => (
  <Dialog visible={visible} title={data.header_text} onClose={onClose}>
    <Div center>
      <Text fontSize={12}>{data.info_text}</Text>
    </Div>
  </Dialog>
);

/* Export
============================================================================= */
export default MaintenanceStatusModal;
