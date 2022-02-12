import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'

export default function Menu() {
  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  return (
    <View style={styles.container} >
      <Text style={styles.title_text} >Options</Text>
      <View style={styles.line} />
      <View style={styles.option_container}>
        <Text style={styles.regular_text}>Hello World  </Text>
        <TouchableOpacity onPress={() => setCheck1(c => !c)}>
          <Ionicons style={styles.checkbox} name={check1 ? 'checkbox' : 'square-outline'} size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.option_container}>
        <Text style={styles.regular_text}>Option 233</Text>
        <TouchableOpacity onPress={() => setCheck2(c => !c)}>
          <Ionicons name={check2 ? 'checkbox' : 'square-outline'} size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.option_container}>
        <Text style={styles.regular_text}>Disable gravity</Text>
        <TouchableOpacity onPress={() => setCheck3(c => !c)}>
          <Ionicons  name={check3 ? 'checkbox' : 'square-outline'} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffff8',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  title_text: {
    color: 'black',
    fontFamily: 'Bomb',
    fontSize: 40
  },
  regular_text: {
    color: 'black',
    fontFamily: 'Bomb',
    fontSize: 30
  },
  line: {
    width: "100%",
    height: 5,
    backgroundColor: '#000'
  },
  option_container: {
    height: 80,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
});