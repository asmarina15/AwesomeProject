import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'

// const Createdata = () => {
//     const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
//     const [kelas, setKelas] = useState('');
//     const [gender, setGender] = useState('');
//     const [email, setEmail] = useState('');

//     const submit = () => {
//         const data = {
//             first_name: first_name,
//             last_name: last_name,
//             email: email,
//             kelas: kelas,
//             gender: gender,
//         };
//         fetch('http://10.0.2.2:3000/mahasiswa', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//             .then((response) => response.json())
//             .then((json) => {
//                 console.log(json);
//                 alert('Data tersimpan');
//                 setFirstName('');
//                 setLastName('');
//                 setEmail('');
//                 setKelas('');
//                 setGender('');
//             })
//     }

const [selectedUser, setSelectedUser] = useState({});

 const selectItem = (item) => {
   setSelectedUser(item);
   setName(item.name);
   setNim(item.nim);
   setKelas(item.kelas);
   setJeniskelamin(item.jeniskelamin);
   setColor(item.color);
   setIcon(item.icon);
 }

 const submit = () => {
  const data = {
    name: name,
    nim: nim,
    kelas: kelas,
    jeniskelamin: jeniskelamin,
    color: color,
    icon: icon,
  };

  fetch(`http://10.0.2.2:3000/mahasiswa/${selectedUser.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      alert('Data tersimpan');
      setName('');
      setNim('');
      setKelas('');
      setJeniskelamin('');
      setColor('');
      setIcon('');
      refreshPage();
      FlatList.refresh();
    })
}


    return (
      <SafeAreaView>
      <View>
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.cardtitle}>Loading...</Text>
          </View>
        ) : (
          <View>
            <ScrollView>
            <View>
              <Text style={styles.title}>Edit Data Mahasiswa</Text>
              <View style={styles.form}>
                <TextInput placeholder="Nama" value={name} onChangeText={(value) => setName(value)} />
                <TextInput placeholder="NIM" value={nim} onChangeText={(value) => setNim(value)} />
                <TextInput placeholder="Kelas" value={kelas} onChangeText={(value) => setKelas(value)} />
                <TextInput placeholder="Jenis Kelamin" value={jeniskelamin} onChangeText={(value) => setJeniskelamin(value)} />
                <TextInput placeholder="Warna (HEX)" value={color} onChangeText={(value) => setColor(value)} />
                <TextInput placeholder="Icon (Fontawesome 5)" value={icon} onChangeText={(value) => setIcon(value)} />
                <Button title="Edit" style={styles.button} onPress={submit} />
              </View>
            </View>
            <View style={styles.devider}></View>
            <FlatList
             style={{ marginBottom: 10 }}
             data={dataUser}
             onRefresh={() => { refreshPage() }}
             refreshing={refresh}
             keyExtractor={({ id }, index) => id}
             renderItem={({ item }) => (
               <View>
                 <TouchableOpacity onPress={() => selectItem(item)}>
                   <View style={styles.card}>
                     <View style={styles.avatar}>
                       <FontAwesome5 name={item.icon} size={50} color={item.color} />
                     </View>
                     <View>
                       <Text style={styles.cardtitle}>{item.name}</Text>
                       <Text>{item.nim}</Text>
                       <Text>{item.kelas}</Text>
                       <Text>{item.jeniskelamin}</Text>
                     </View>
                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                       <FontAwesome5 name={'edit'} size={20} />
                     </View>
                   </View>
                 </TouchableOpacity>
               </View>
             )}
           />
           </ScrollView>
         </View>
       )}
     </View>
   </SafeAreaView>
    )

export default Createdata

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 10,
        marginBottom: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    }
})