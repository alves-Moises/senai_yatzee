import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";

const ip = "192.168.1.20"
const port = "3000"
export const  HomeScreen = ({ navigation }) => {
    [lastPlays, setLPlays] = useState([])
    useEffect(() =>{
      loadLastScores(), []
    })

    const loadLastScores = async () => {
      try {
        const scoreData = await axios.get(`http://${ip}:${port}/last_plays`)
        setLPlays(scoreData.data)
      } catch (error) {
        console.log("error: ", error)
      }
    }

    return(
        <View style={styles.container}>
          <Text style={styles.title}>YAtzee!</Text>


          <TouchableOpacity 
            style={[ styles.button, styles.playButton ]}
            onPress={() => navigation.navigate('Play')}
          >
            <Text style={styles.TextPlay}>
              Play
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={[ styles.button, styles.ScoresButton ]}
              onPress={() => navigation.navigate('Records')}
            >
              <Text 
                style={styles.TextRecords}
              >Records</Text>
          </TouchableOpacity>

          <View style={styles.scoreSection}>
            <Text>Last Plays</Text>
            <View>
              <FlatList
                data={lastPlays}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                  <Text>{item['name']} - {item['score']}</Text>
                )}
              />

            </View>
          </View>

        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10
  },
  button: {
  padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    alignContent: "center",
    alignItems: "center"
  },
  playButton:{
    backgroundColor: "#423",
  }, 
  ScoresButton: {
    backgroundColor: "#423",
  },
  
  TextPlay: {
    color: "#fde"
  }, 
  
  TextRecords: {
    color: "#afb"
  },
  scoreSection:{ 


    backgroundColor: "#fff",
    height: 150,
    width: "100%",
    marginTop: "auto",
    marginBottom: 0,
    alignItems: "center",

    padding: 0,
    paddingTop: 10
  }
  
});
