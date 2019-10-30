import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './searchDropDownStyles';

const items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
];
class SearchDropDown extends Component {
  onSelect = () => {
    console.log('begin');
    const { onItemSelect } = this.props;
    onItemSelect();
  };
  render() {
    const { containerStyle, itemsContainerStyle, itemStyle } = styles;
    const { onItemSelect, onTextChange } = this.props
    return (
      <Fragment>
        <SearchableDropdown
          textInputStyle={containerStyle}
          items={items}
          itemsContainerStyle={itemsContainerStyle}
          onItemSelect={onItemSelect}
          itemStyle={itemStyle}
          onTextChange={onTextChange}
        />
      </Fragment>
    );
  }
}

export default SearchDropDown;
