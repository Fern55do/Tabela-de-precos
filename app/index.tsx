import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';


interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Produto A', price: 10.0, quantity: 0 },
    { id: 2, name: 'Produto B', price: 20.0, quantity: 0 },
  ]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const addItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const addNewProduct = () => {
    if (!newProductName || !newProductPrice) {
      Alert.alert('Erro', 'Preencha o nome e o preço do produto!');
      return;
    }

    const price = parseFloat(newProductPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Erro', 'Insira um preço válido!');
      return;
    }

    const newProduct: Item = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: newProductName,
      price,
      quantity: 0,
    };

    setItems((prevItems) => [...prevItems, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
  };

  const deleteProduct = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
      <Text style={styles.header}>Gerenciar Produtos</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - R$ {item.price.toFixed(2)} (x{item.quantity})
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addItem(item.id)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProduct(item.id)}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>

      <View style={styles.addProductContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={newProductName}
          onChangeText={setNewProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          keyboardType="numeric"
          value={newProductPrice}
          onChangeText={setNewProductPrice}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#007BFF',
  },
  addProductContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default App;
