import { Text, View, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import SQLiteDbHandler from "../data/SQLiteDbHandler";
// import styles from '../styles/indexStyles';
import { PaperProvider, Button } from "react-native-paper"; // Import Button from react-native-paper

const dbHandler = new SQLiteDbHandler();

export default function Event() {
  const { event } = useLocalSearchParams(); // Get the event parameter
  const eventDetails = JSON.parse(event); // Parse the event details
  const router = useRouter(); // Initialize the router

  return (
    <PaperProvider>
      <View contentContainerStyle={styles.container}>
        <Text style={styles.title}>{eventDetails.name}</Text>
        <Text>{eventDetails.date}</Text>

        <View style={styles.linkContainer}>
          {/* Replace Link with Paper's Button */}
          <Button
            mode="contained"
            onPress={() =>
              router.push({
                pathname: "/Qr",
                params: { event: JSON.stringify(eventDetails) },
              })
            }
            style={styles.linkButton}
            rippleColor="#ff000020"
          >
            Generate QR 📄
          </Button>

          <Button
            mode="contained"
            onPress={() =>
              router.push({
                pathname: "/Email",
                params: { event: JSON.stringify(eventDetails) },
              })
            }
            style={styles.linkButton}
            rippleColor="#ff000020"
          >
            Send Mail 📨
          </Button>

          <Button
            mode="contained"
            onPress={() =>
              router.push({
                pathname: "/Scanner",
                params: { event: JSON.stringify(eventDetails) },
              })
            }
            style={styles.linkButton}
            rippleColor="#ff000020"
          >
            Scan Entry 📷
          </Button>
        </View>

        {/* Participants List */}
        <Text style={styles.subtitle}>Participants:</Text>
        <FlatList
          data={eventDetails.participants} // Assuming participants is an array in eventDetails
          keyExtractor={(item) => item.rollNumber} // Unique key for each participant
          renderItem={({ item }) => (
            <View style={styles.participantItem}>
              <Text>
                {item.name} - {item.rollNumber}
              </Text>
            </View>
          )}
        />

        {/* Go Back Button */}
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.backButton}
          rippleColor="#ff000020"
        >
          Go Back
        </Button>
      </View>
    </PaperProvider>
  );
}

// function DebugMenu(){
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalData, setModalData] = useState([]);
//     const [modalTitle, setModalTitle] = useState("");
//     const showDataInModal = (title, data) => {
//         setModalTitle(title);
//         setModalData(data);
//         setModalVisible(true);
//     };

//     async function pickCSV(){
//         console.log('Importing csv');
//         const doc = await DocumentPicker.getDocumentAsync();
//         if(doc.canceled == false){
//             console.log(doc.assets);
//             let data = await FileSystem.readAsStringAsync(doc.assets[0].uri);
//             dbHandler.saveRegistrations(data).then(() => ToastAndroid.show('CSV Imported', ToastAndroid.SHORT));
//         }
//     }

//     return (
//         <View style={{position: 'absolute', bottom: 0, padding: 20, margin: 40, backgroundColor: "#ddd"}}>
//             <Text>Debugging options:</Text>
//             <Button
//             title='Import CSV'
//             onPress={pickCSV}
//             />
//             <Button
//             title='Get registrations'
//             onPress={async () => {const data = await dbHandler.getRegistrations(); showDataInModal("Registrations: "+data.length, data);}}
//             style={styles.link}
//             />
//             <Button
//             title='Get attendees'
//             onPress={async () => {const data = await dbHandler.getAttendees(); showDataInModal("Attendees: "+data.length, data);}}
//             />
//             <Button
//             title='Clear Table⚠️'
//             onPress={async () => {const res = await dbHandler.resetTable(); if(res.success) ToastAndroid.show('Database cleared', ToastAndroid.SHORT);}}
//             />

//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalTitle}>{modalTitle}</Text>
//                         <ScrollView>
//                             {modalData.map((row, index) => (
//                                 <Text key={index} style={styles.modalText}>{JSON.stringify(row)}</Text>
//                             ))}
//                         </ScrollView>
//                         <Button title="Close" onPress={() => setModalVisible(false)} />
//                     </View>
//                 </View>
//             </Modal>
//             <Text>Imported csv MUST have Name, Roll, Email columns</Text>
//         </View>
//     )
// }
