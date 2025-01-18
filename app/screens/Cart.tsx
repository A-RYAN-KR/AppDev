import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/CartScreenStyle';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const CartScreen: React.FC = () => {
  const [cartItems] = React.useState<FoodItem[]>([
    {
        id: '1',
        name: 'Chicken Sandwich',
        description: 'A sandwich with crispy chicken, lettuce, tomato, and mayonnaise.',
        price: 5.00,
        image: 'https://www.mybakingaddiction.com/wp-content/uploads/2022/08/plated-blueberry-cheesecake-hero.jpg',
        quantity: 1,
      },
      {
        id: '2',
        name: 'Spider Sandwich',
        description: 'A playful sandwich with unique crispy fillings and fresh veggies.',
        price: 5.00,
        image: 'https://thefirstyearblog.com/wp-content/uploads/2020/12/chocolate-mousse-square.png',
        quantity: 1,
      },
      {
        id: '3',
        name: 'Cheese Sandwich',
        description: 'A classic sandwich with rich melted cheese and buttered bread.',
        price: 5.00,
        image: 'https://driscolls.imgix.net/-/media/assets/recipes/mixed-berry-parfait-with-steel-cut-granola.ashx',
        quantity: 1,
      },
      {
        id: '4',
        name: 'Pork Sandwich',
        description: 'A sandwich with tender pork slices, lettuce, and barbecue sauce.',
        price: 5.00,
        image: 'https://thefirstyearblog.com/wp-content/uploads/2020/12/chocolate-mousse-square.png',
        quantity: 1,
      },
      {
        id: '5',
        name: 'Vegetarian Sandwich',
        description: 'A sandwich loaded with fresh vegetables, avocado, and hummus.',
        price: 4.50,
        image: 'https://driscolls.imgix.net/-/media/assets/recipes/mixed-berry-parfait-with-steel-cut-granola.ashx',
        quantity: 1,
      },
  ]);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    // Implement order confirmation logic
    console.log('Order confirmed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>CART</Text>
      </View>

      <Text style={styles.subheaderText}>
       Your Order
      </Text>

      <ScrollView style={styles.itemList}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantity}>{item.quantity}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Price :</Text>
          <Text>${totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Discount :</Text>
          <Text>$0.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleConfirmOrder}
      >
        <Text style={styles.confirmButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;