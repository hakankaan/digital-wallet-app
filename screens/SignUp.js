import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';
import {getPixelSizeForLayoutSize} from 'react-native/Libraries/Utilities/PixelRatio';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [areas, setAreas] = React.useState();
  const [selectedArea, setSelectedArea] = React.useState();
  const [showCountryModa, setShowCountryModal] = React.useState(false);

  React.useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        let areaData = data.map(item => {
          return {
            code: item.alpha2Code,
            name: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaData);

        if (areas.length > 0) {
          let defaultData = areas.filter(area => area.code == 'US');
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log('Sign Up')}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLogo = () => {
    return (
      <View
        style={{
          //marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={{
            width: '60%',
          }}
        />
      </View>
    );
  };

  const renderForm = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        <View style={{marginTop: SIZES.padding * 3}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Full Name
          </Text>
          <TextInput
            style={{
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              marginVertical: SIZES.padding,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}></TextInput>
        </View>

        <View style={{marginTop: SIZES.padding * 3}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Phone Number
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                width: 100,
                height: 50,
                marginHorizontal: 5,
                flexDirection: 'row',
                ...FONTS.body2,
              }}
              onPress={() => alert('qweqwe')}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={icons.down}
                  resizeMode="contain"
                  style={{width: 10, height: 10, tintColor: COLORS.white}}
                />
              </View>
              <View
                style={{
                  marginLeft: 5,
                  justifyContent: 'center',
                }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                />
              </View>
              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text style={{color: COLORS.white}}>{selectedArea?.callingCode}</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={{
                height: 40,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                marginVertical: SIZES.padding,
                color: COLORS.white,
                flex: 1,
                ...FONTS.body3,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Password
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.white,
              color: COLORS.white,
              marginVertical: SIZES.padding,
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={{
          margin: SIZES.padding * 3,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: SIZES.radius / 1.5,
            backgroundColor: COLORS.black,
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.yellow]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;