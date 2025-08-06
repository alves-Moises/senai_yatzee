import { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { dicesImg } from "../functions/dices"

export const PlayScreen = ({navigation}) => {
    const [rowCount, setRowCount] = useState(0)  // count of plays
    const [Score, setScore] = useState(0)  // sum of dices
    const [diceList, setDiceList] = useState([]) // list of dices
    

    // Play
    const row_dices = () => {
        const newDiceList = []
        for(let i = 0; i < 6; i++){
            const selectedDice = row_dice()
            newDiceList.push(selectedDice)            
            setScore(Score + selectedDice)


            setRowCount(rowCount + 1)
        }
        setDiceList(newDiceList)
        console.log("dice list: ")
        console.log(diceList)
    }
    

    
    const row_dice = () => {
        const dice = parseInt(Math.random() * 6) + 1
        console.log("sorted Dice: ", dice)
        return dice
    } 
    return(
        <View style={styles.container}>
            <Text style={styles.title}>PLAY</Text>

            <FlatList
                data={diceList}
                keyExtractor={({_, index}) => index.toString()}
                renderItem={({dice}) => (
                    <Image
                        source={{ uri: dicesImg[dice] }}

                    />
                )}      
            />
             
            <Text style={styles.score}>Score: {Score}</Text>
            <TouchableOpacity
                style={[{backgroundColor: rowCount >= 3 ? "#f00" : "#a4f"}, styles.rowButton]}
                disabled={rowCount >= 3 ? true : false}
                onPress={() => row_dices()}
                
            >
                <Text>R0W!{" ( "}{3-rowCount }{" )"}</Text>
            </TouchableOpacity>
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
    listDices: {
        backgroundColor: "#fff"
    },
    title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10
    },
    score: {
        backgroundColor: "#aF5",
        padding: 8,
    },
    diceIMG: {
        width: 50,
        height: 50,
        margin: 10,
        backgroundColor: "#ff2"
    },diceRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 5
    },

    rowButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
})