

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import styles from './styles';

interface GaugeChartProps {
  percentage: number;
  color: string;
  size: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ percentage, color, size }) => {
  const radius = (size - 12) / 2; // 12 is the stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={6}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

export default GaugeChart;

