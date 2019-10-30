import React, { Component, Fragment } from 'react';
import { Input, CheckBox, Text, Button, Icon } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import Geolocation from 'react-native-geolocation-service';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { View, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Overlay } from 'react-native-elements';
import Maps from '../maps';
import { locationPermission } from '../../helper/userPermissions';
import SearchDropDown from '../SearchDropdown/searchDropDown';
import styles from './houseDetailsStyles';
import RNGooglePlaces from 'react-native-google-places';
import Camera from '../camera';

class HouseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bedrooms: {
        1: false,
        2: false,
        3: false,
      },
      apartmentName: '',
      location: '',
      1: null,
      2: null,
      3: null,
      isMapVisible: false,
      isOverlayVisible: false,
      mapLocation: {
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        accessError: {},
      },
    };
  }

  onChange = (event, name) => {
    const { text } = event.nativeEvent;
    this.setState(prevState => ({
      ...prevState,
      [name]: text,
    }));
  };
  onLocationChange = async text => {
    this.searchPlaces(text);
    const result = await this.searchAPIDebounced(text);
    console.log(result);
  };
  onLocationSelect = item => {
    console.log('item', item);
  };
  searchPlaces(text) {
    RNGooglePlaces.getAutocompletePredictions(text, {
      type: 'cities',
      country: 'KE',
    })
      .then(result => result)
      .catch(error => console.log(error));
  }
  searchAPIDebounced = AwesomeDebouncePromise(this.searchPlaces, 500);
  renderInput = (name, onChange, inputContainerStyle, rightIcon, key) => {
    const { labelStyle } = styles;
    return (
      <Input
        label={name}
        inputContainerStyle={inputContainerStyle}
        labelStyle={labelStyle}
        onChange={onChange}
        rightIcon={rightIcon}
        key={key}
      />
    );
  };
  onChecked = title => {
    this.setState(prevState => {
      return {
        ...prevState,
        bedrooms: {
          ...prevState.bedrooms,
          [title]: !prevState.bedrooms[title],
        },
      };
    });
  };
  renderCheckBox = title => {
    return (
      <CheckBox
        checked={this.state.bedrooms[title]}
        title={title}
        onPress={() => this.onChecked(title)}
      />
    );
  };
  renderRoomInputSelected = () => {
    const { bedrooms } = this.state;
    const { bedroomInputContainer } = styles;
    return Object.keys(bedrooms).map((selected, index) => {
      if (bedrooms[selected]) {
        return this.renderInput(
          `Total ${selected} bedrooms`,
          e => this.onChange(e, selected),
          bedroomInputContainer,
          () => <Fragment />,
          index,
        );
      }
    });
  };

  renderMapIcon = style => (
    <TouchableOpacity onPress={this.renderMap} style={style}>
      <FontAwesomeIcon icon={faMapMarkedAlt} size={25} color="green" />
    </TouchableOpacity>
  );

  renderMap = async () => {
    await locationPermission();
    this.getLocation();
    this.setState(prevState => ({
      ...prevState,
      isMapVisible: !prevState.isMapVisible,
    }));
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: { latitude, longitude },
        } = position;
        this.setState(prevState => ({
          ...prevState,
          mapLocation: {
            ...prevState.mapLocation,
            region: { ...prevState.mapLocation.region, longitude, latitude },
          },
        }));
      },
      error =>
        this.setState(prevState => ({
          ...prevState,
          mapLocation: { ...prevState.mapLocation, accessError: error },
        })),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  };

  onMarkerPress = coordinate => {
    const { latitude, longitude } = coordinate;
    showMessage({
      message: 'You have successfully added your location',
      type: 'success',
    });
    this.setState(prevState => ({
      ...prevState,
      isMapVisible: false,
      mapLocation: {
        ...prevState.mapLocation,
        region: { ...prevState.mapLocation.region, latitude, longitude },
      },
    }));
  };
  nextPage = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Upload Video');
  };
  renderModal = () => {
    const { isOverlayVisible } = this.state;
    const { overlayStyle } = styles;
    return (
      <Overlay isVisible={isOverlayVisible} overlayStyle={overlayStyle}>
        <Camera closeModal={this.closeModal} />
      </Overlay>
    );
  };
  closeModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isOverlayVisible: false,
    }));
  };
  openCamera = () => {
    this.setState(prevState => ({
      ...prevState,
      isOverlayVisible: true,
    }));
  };

  render() {
    const {
      apartmentFormCont,
      checkBoxCont,
      bedroomLabel,
      inputContainerStyle,
      buttonContainerStyle,
      mapContainer,
      googleIconContainer,
      labelLocation,
      googleIcon,
      locationContainerStyle,
      labelStyle,
      uploadVideoButtonContainer,
      uploadVideoButton,
    } = styles;
    const {
      isMapVisible,
      mapLocation: { region },
    } = this.state;
    return (
      <View style={apartmentFormCont}>
        {this.renderInput(
          'Apartment Name',
          event => this.onChange(event, 'apartmentName'),
          inputContainerStyle,
        )}

        <View style={locationContainerStyle}>
          <Text style={labelStyle}>Location</Text>
          <SearchDropDown
            onItemSelect={this.onLocationSelect}
            onTextChange={this.onLocationChange}
          />
        </View>

        <View style={googleIconContainer}>
          <Text style={labelLocation}>
            Tap on the icon to add your exact location
          </Text>
          {this.renderMapIcon(googleIcon)}
        </View>
        {isMapVisible ? (
          <View style={mapContainer}>
            <Maps region={region} onMarkerPress={this.onMarkerPress} />
          </View>
        ) : (
          <Fragment />
        )}
        <Text style={bedroomLabel}>Bedroom</Text>
        <View style={checkBoxCont}>
          {this.renderCheckBox('1')}
          {this.renderCheckBox('2')}
          {this.renderCheckBox('3')}
        </View>
        {this.renderRoomInputSelected()}
        <Button
          title="Upload Video"
          containerStyle={uploadVideoButtonContainer}
          buttonStyle={uploadVideoButton}
          titleStyle={{ fontSize: 10 }}
          onPress={this.openCamera}
        />
        {this.renderModal()}
        <Button
          title="Next"
          containerStyle={buttonContainerStyle}
          onPress={this.nextPage}
        />
      </View>
    );
  }
}

export default HouseDetails;
