import React from 'react';
import { View, Text } from 'react-native';
import styles from './stylesheet';

const Dashboard = () => {
    return (
        <View style={styles.someContainer}>
            <Text style={styles.bigAssText}>Hello, World!</Text>
        </View>
    );
};

export default Dashboard;