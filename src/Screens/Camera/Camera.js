import {TabRouter} from '@react-navigation/native';
import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Database from '../../Database/Database';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.ConectarBanco = this.ConectarBanco.bind(this);
    this.InserirFoto = this.InserirFoto.bind(this);

    this.state = {
      id: this.props.route.params.id,
    };
  }

  ConectarBanco = () => {
    const banco = new Database();
    banco.Conectar();
  };

  InserirFoto = imagem => {
    const banco = new Database();
    banco.InserirImagem(imagem);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      const foto = {
        idCasa: this.state.id,
        imagem: data.uri,
      };
      console.log(data.uri);
      console.log(this.state.id);
      this.InserirFoto(foto);
      this.props.navigation.goBack();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;
