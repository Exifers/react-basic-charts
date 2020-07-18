# react-basic-charts
A very basic charts library for React. For now it has only a basic bar chart.



## Usage
```bash
// npm
npm install react-basic-charts

// yarn
yarn add react-basic-charts
```

```tsx
import React from 'react';
import { Chart } from 'react-basic-charts';
import 'react-basic-charts/index.css';

const data = {
  Monday: [
    10,
    15,
    25
  ],
  Tuesday: [
    15,
    25,
    0
  ],
  Wednesday: [
    20,
    25,
    30
  ],
  Thirsday: [
    30,
    35,
    10
  ],
  Friday: [
    35,
    10,
    20
  ],
  Saturday: [
    30,
    25,
    30
  ],
  Sunday: [
    20,
    10,
    5
  ]
};

function MyComponent() {
  return (
    &ltChart
      scale={7}
      colors={['#A6E7DB', '#2D7A7A', '#76C7D2']}
      data={data}
      displayValue={(value: number) => '$ ' + value}
      /&gt
  )
}
```
