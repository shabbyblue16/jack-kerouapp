import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

const API_URL = 'http://172.20.10.9:5000';
// const API_URL = 'http://localhost:5000';

const AuthScreen = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const onChange = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const onLogin = (token) => {
    axios({
      method: 'GET',
      url: `${API_URL}/auth`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      // .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onSubmit = () => {
    const body = {
      email,
      name,
      phone,
      password,
    };
    axios({
      method: 'POST',
      url: `${API_URL}/${isLogin ? 'login' : 'signup'}`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    })
      // .then((res) => {
      //   let data = res.json();
      //   if (res.status === 200) {
      //     authorized = true;
      //   }
      //   return data;
      // })
      .then((res) => {
        if (res.status !== 200) {
          setIsError(true);
          setMessage(res.data.message);
        } else {
          onLogin(res.data.token);
          setIsError(false);
          Actions.home(res.data);
          // setMessage(data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <ImageBackground source={require('../public/images/5570863.jpg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={setEmail}
            ></TextInput>
            {!isLogin && <TextInput
              style={styles.input}
              placeholder='Name'
              onChangeText={setName}
            ></TextInput>}
            {!isLogin && <TextInput
              style={styles.input}
              placeholder='Phone'
              onChangeText={setPhone}
            ></TextInput>}
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder='Password'
              onChangeText={setPassword}
            ></TextInput>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onChange}>
              <Text style={styles.buttonText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '80%',
    marginTop: '40%',
    borderRadius: 20,
    maxHeight: 380,
    paddingBottom: '30%',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: '5%',
    marginBottom: '30%',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: '5%',
  },
  inputs: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 10,
    fontSize: 16,
    minHeight: 40,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    height: 40,
    borderRadius: 50,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  message: {
    fontSize: 16,
    marginVertical: '5%',
  },
});

export default AuthScreen;
