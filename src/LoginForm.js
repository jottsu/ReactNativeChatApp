import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class LoginForm extends Component {

  setUserData = async () => {
    try {
      let data = await AsyncStorage.getItem('users')
      let users = JSON.parse(data)
      this.setState({
        users: users
      })
    } catch (error) {
      alert(error)
    }
  }

  constructor (props) {
    super (props)
    this.state = {
      id: '',
      pass: '',
      users: []
    }
  }

  componentWillMount () {
    this.setUserData()
  }

  LoginCheck () {
    let user = ''
    this.state.users.forEach((v, i) => {
      if (v.id === this.state.id) user = v
    })

    if (user === '') {
      alert('ユーザーが存在しません')
      return
    }
    
    if (this.state.pass !== user.password) {
      alert('パスワードが間違っています')
      return
    }

    AsyncStorage.setItem('currentUser', JSON.stringify(user))
    Actions.tabbar({ type: 'reset' })
  }

  render () {
    return (
      <View style={styles.formContainer}>
        <TextInput value={this.state.id} style={styles.textInput} placeholder='ユーザーID'
          onChangeText={ (text) => this.setState({id: text}) }  />
        <TextInput value={this.state.pass} style={styles.textInput} placeholder='パスワード'
          onChangeText={(text) => this.setState({ pass: text })} secureTextEntry={true} />
        <Button title="ログイン" onPress={(e) => this.LoginCheck(e)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 30,
    marginTop: 200,
    padding: 20,
    paddingTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa'
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaa',
    backgroundColor: '#fff',
    marginBottom: 10
  }
})