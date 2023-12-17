import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { Link } from "expo-router";
import RegularExpressions from "../../constants/RegularExpressions";
import axios from "axios";
import Endpoints from '../api/Endpoints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  textInput: {
    width: "100%",
  },
});

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [rut, setRut] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [birthYearError, setBirthYearError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [validForm, setValidForm] = useState(false);

  const handleEmailChange = (text: string) => {
    if (!RegularExpressions.emailRegex.test(text)) {
      setEmailError(true);
    }
    else {
      setEmailError(false);
    }
    setEmail(text);
  };

  const handleNameChange = (text: string) => {
    if (!RegularExpressions.nameRegex.test(text)) {
      setNameError(true);
    }
    else {
      setNameError(false);
    }
    setName(text);
  };

  const handleBirthYearChange = (text: string) => {
    if (!RegularExpressions.birthYearRegex.test(text)) {
      setBirthYearError(true);
    }
    else {
      setBirthYearError(false);
    }

    const currentYear = new Date().getFullYear();

    const yearValue = parseInt(text, 10);
    if (isNaN(yearValue) || yearValue > currentYear || yearValue < 1900) {
      setBirthYearError(true);
    } else {
      setBirthYearError(false);
    }

    setBirthYear(text);
  };

  const handleRutChange = (text: string) => {
    if (!RegularExpressions.rutRegex.test(text)) {
      setRutError(true);
    }
    else {
      setRutError(false);
    }
    setRut(text);
  };

  const handleSubmit = () => {
    if (emailError || nameError || birthYearError || rutError) {
      return;
    }
    sendData(email, name, birthYear, rut);
  }

  const sendData = (email: string, fullName: string, birthYear: string, rut:string) => {
  
    const data = {
      email: email,
      rut: rut,
      birthYear: birthYear,
      fullName: fullName
    };

    axios.post(`${Endpoints.urlAuth}/register`, data).then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium">Registrarse</Text>
      <TextInput 
        style={styles.textInput} 
        label={"Correo electrónico"} 
        placeholder={"tu.correo@ucn.cl"}
        placeholderTextColor={"#999"}
        autoComplete={"email"}
        value={email}
        onChangeText={handleEmailChange}
        mode={"outlined"}
        error={emailError}
      />
      <TextInput 
        style={styles.textInput} 
        label={"Nombre completo"} 
        placeholder={"Tu Nombre Completo"}
        placeholderTextColor={"#999"}
        value={name}
        onChangeText={handleNameChange}
        mode={"outlined"}
        error={nameError}
      />
      <TextInput 
        style={styles.textInput} 
        label={"Año de nacimiento"}
        placeholder={"1900 - 2023"}
        placeholderTextColor={"#999"}
        value={birthYear}
        onChangeText={handleBirthYearChange}
        mode={"outlined"}
        keyboardType="numeric"
        error={birthYearError}
      />
      <TextInput 
        style={styles.textInput} 
        label={"RUT"} 
        placeholder={"00.000.000-0"}
        placeholderTextColor={"#999"}
        value={rut}
        onChangeText={handleRutChange}
        mode={"outlined"}
        error={rutError}
      />
      <HelperText type="error" visible={false}>
        Credenciales inválidas
      </HelperText>
      <Link href="/home/" asChild replace={true}>
        <Button style={styles.button} mode="contained" onPress={handleSubmit}>
          Registrar
        </Button>
      </Link>
    </SafeAreaView>
  );
};

export default RegisterScreen;
