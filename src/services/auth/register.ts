import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import {useAppSelector} from '../../store/store';
import React from 'react';
import {UserRegisterResponse} from '../../models/userRegisterResponse';
import {storeDataJSON} from '../storage/asyncStorage';

export const register = async (
  email: string,
  password: string,
  name: string,
) => {
  console.log('email', email);
  console.log('password', password);
  console.log('name', name);
  if (email.length < 1 || password.length < 1 || name.length < 1) {
    return 'Please fill all the fields';
  } else {
    try {
      const response = await axios.post(`${baseUrl}/user`, {
        name: name,
        email: email,
        password: password,
      });
      return 'success';
    } catch (error) {
      console.error('Register ERROR:', error);
      //show error message
      throw error;
    }
  }
};
