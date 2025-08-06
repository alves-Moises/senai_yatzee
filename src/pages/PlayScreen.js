import { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { dicesImg } from "../functions/dices"
import { TextInput } from "react-native"


const ip = "localhost"
const port = "3000"
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
            setScore(Score => Score + selectedDice)

            setRowCount(rowCount + 1)
        }
        setDiceList(newDiceList)
        
    }
    

    
    const row_dice = () => {

        const dice = parseInt(Math.random() * 6) + 1
        return dice
    } 

    const saveRecord = async() =>{
        const response = await axios.get(`http://${ip}:${port}/records`)
        console.log(response.data)

    } 
    return(
        <View style={styles.container}>
            <Text style={styles.title}>PLAY</Text>
            <View>
                {rowCount < 3 ? "" : (

                    <View style={styles.infoFields} >
                        <TextInput
                            style={styles.nameInput}
                            placeholder="name"
                            disabled={rowCount >= 3 ? false : true}
                        />
                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={saveRecord}    
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>

                    </View>

                )}
                <View style={[
                    styles.diceRow,
                    rowCount < 3 
                    ? { paddingTop: 40 }
                    :""
                ]}>
                        


                    {diceList.map(dice => 
                        <Image
                            style={styles.diceIMG}
                            source={{ uri: dicesImg[dice] }}
                        />
                    )}
                </View>
                <Text style={styles.score}>Score: {Score}</Text>
            </View>

            
            <TouchableOpacity
                style={[
                    {backgroundColor: rowCount >= 3 ? "#f00" : "#a4f"},
                    styles.rowButton
                ]}
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
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 10,
    },
    score: {
        backgroundColor: "#fd4",
        padding: 8,
        // width: 150,
        alignItems: "center",
        marginHorizontal: "auto",
        marginTop: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    nameInput: {
        borderWidth: 1,
        borderRadius: 8,
        width: 200,
        // marginHorizontal: "auto",
        marginBottom: 8,
        borderColor: "#fde"
    },
    saveButton:{
        backgroundColor: "#4b5", 
        alignContent: "center",
        verticalAlign: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        width: 100,
        alignItems: "center",
        height: 40

        
    },
    saveText:{
        marginVertical: "auto"
    },  
    diceIMG: {
        width: 80,
        height: 80,
        margin: 10,
        // backgroundColor: "#ff2"
    },
    
    diceRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 5,
        backgroundColor: "#d0a",
        flexWrap: "wrap",
        borderWidth: 1,
        borderColor: "#FDE",
        paddingVertical: 10
    },

    rowButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 150,
        alignItems: "center"
    },
    infoFields: {
        flexDirection: "row",
        padding: 15,
        gap: 8,
        justifyContent: "space-between"
    }
})