import React from 'react';
import Layout from '../tabeladepreco/app/layout'; 
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';


interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([
    { id: 1, name: 'Produto A', price: 10.0, quantity: 0 },
    { id: 2, name: 'Produto B', price: 20.0, quantity: 0 },
    { id: 3, name: 'Produto C', price: 15.5, quantity: 0 },
  ]);

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

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <Layout>
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
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
