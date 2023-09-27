// @flow

import * as React from 'react';
import { FlatList } from 'react-native';

/* flow type
============================================================================= */
type ReactNodeWithoutStrings = React.ChildrenArray<
  void | null | boolean | React.Element<any>
>;
type Props = {
  data: Array<Object>,
  refreshing: boolean,
  horizontal: boolean,
  ListEmptyComponent: ReactNodeWithoutStrings,
  ListFooterComponent?: ?ReactNodeWithoutStrings,
  keyExtractor: string,
  renderItem: () => ReactNodeWithoutStrings,
  onFetchMore: () => void,
  onRefresh: () => void,
  padding?: number,
  style?: Object,
};

/* =============================================================================
<List />
============================================================================= */
const List = ({
  data,
  renderItem,
  ListEmptyComponent,
  ListFooterComponent,
  keyExtractor,
  refreshing,
  onFetchMore,
  onRefresh,
  horizontal,
  padding,
  style,
}: Props) => {
  const _renderItem = ({ item }) => renderItem(item);
  const _keyExtractor = item => item[keyExtractor];
  return (
    <FlatList
      data={data}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      refreshing={!!refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.5}
      onEndReached={onFetchMore}
      horizontal={horizontal}
      contentContainerStyle={[
        {
          padding,
          flexGrow: 1,
        },
        style,
      ]}
    />
  );
};

/* Default props
============================================================================= */
List.defaultProps = {
  padding: 0,
  style: {},
  ListFooterComponent: null,
};

/* Export
============================================================================= */
export default List;
