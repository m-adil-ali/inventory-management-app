'use client'
import { useState, useEffect, createContext } from 'react';
import { firestore } from '@/firebase'; // Adjust the path based on your project structure
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch items from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'inventory'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);



  const addItem = async () => {
    if (newItem.trim() === '') return;
    await addDoc(collection(firestore, 'inventory'), {
      name: newItem,
      quantity: quantity
    });
    setNewItem('');
    setQuantity(1);
  };

  // Function to delete an item
  const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'inventory', id));
  };

  return (
    <Box
      width="100vw" 
      height="100vh" 
      display={"flex"} 
      justifyContent={'center'} 
      alignItems={'center'}
    >
      <Box border={'1px solid #333'} padding={2}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={"flex"}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        
        {/* Input for adding new items */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <TextField
            label="Item Name"
            variant="outlined"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={addItem}>
            Add Item
          </Button>
        </Box>

        <Stack width='800px' height='300px' spacing={2} overflow={'auto'}>
          {items.map(({ id, name, quantity }) => (
            <Box
              key={id}
              width="100%"
              height="60px"
              display={"flex"}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              padding={2}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)} (Quantity: {quantity})
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => deleteItem(id)}>
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// 'use client'
// import Image from 'next/image'
// import {useState, useEffect} from 'react'
// import {firestore} from '@/firebase'
// import { Box, Stack, Typography } from "@mui/material";

// const items = [
//   'potato',
//   'tomatoes',
//   'ginger',
//   'cheese',
//   'halwa',
//   'nan',
//   'onga',
//   'chawal',
//   'cheesza'
// ];

// export default function Home() {
//   return (
//     <Box
//       width="100vw" 
//       height="100vh" 
//       display={"flex"} 
//       justifyContent={'center'} 
//       alignItems={'center'}
//     >
//       <Box border={'1px solid #333'}>
//         <Box
//           width="800px"
//           height="100px"
//           bgcolor={'#ADD8E6'}
//           display={"flex"}
//           justifyContent={'center'}
//           alignItems={'center'}
//         >
//           <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
//             Pantry Items
//           </Typography>
//         </Box>
//         <Stack width='800px' height='300px' spacing={2} overflow={'auto'}>
//           {items.map((i, index) => (
//             <Box
//               key={index}
//               width="100%"
//               height="300px"
//               display={"flex"}
//               justifyContent={'space-around'}
//               alignItems={'center'}
//               bgcolor={'#f0f0f0'}
//             >
//               <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
//                 {
//                   // Capitalize the first letter of item
//                   i.charAt(0).toUpperCase() + i.slice(1)
//                 }
//               </Typography>
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }


