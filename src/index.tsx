import React, {useState} from 'react';
import { usePopper } from 'react-popper';
import {useHover} from './useHover';

interface chartProps {
  displayValue: (value: number) => string,
  data: {[key: string]: [number, number, number]},
  colors: [string],
  scale: number,
  height: number
};

interface charBarProps {
  displayValue: (value: number) => string,
  value: number,
  color: string,
  scale: number
};


const SCALE_BAR_TARGET_MARKERS_NUM = 5;
const KEY_HEIGHT = 17; // from css
const LABEL_HEIGHT = 29; // from css

/* Possible values of steps for the scalebar. We always take the one that gives the closest
 * amount of markers to SCALE_BAR_TARGET_MARKERS_NUM. If that's not bug enough we take a
 * power of ten, e.g 100, 1000, 10000, etc.
 */
  const nonPowerOfTenScaleBarSteps: number[] = [
    1,
    2,
    5,
    10,
    20,
    100
  ];

  /**
   * Returns the element of list that is the closest of the value.
   */
  const closest = (value: number, list: number[]) => {
    const deltas = list.map(v => value - v);
    return value - Math.min(...deltas);
  }

  const nearestPowerOfTen = (value: number) => {
    return Math.pow(10,Math.round(Math.log10(value)));
  }

  const ChartBar = (props: charBarProps) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: 'top'
    });

    const [hoverRef, isHovered] = useHover();

    const { value, scale, color, displayValue } = props;

    return (
      <>
        {/* @ts-ignore */}
        <div ref={node => {setReferenceElement(node); hoverRef(node)}}
          className='chart__bar'
          style={{
            height:value * scale + 'px',
            backgroundColor: color
          }}
        />
        {/* @ts-ignore */}
        <span ref={setPopperElement}
          className={`chart__bar__tooltip ${isHovered && 'chart__bar__tooltip--visible'}`}
          style={{...styles.popper, color}} {...attributes.popper}>
          {displayValue(value)}
        </span>
      </>
    );
  }

  export const Chart = (props: chartProps) => {

    const { data, colors, displayValue, height } = props;

    const max = Math.max(...Object.values(data).map(value => Math.max(...value)));
    const scale = height / max;

    const computeScaleBarValues = () => {
      const preciseStep = max / (SCALE_BAR_TARGET_MARKERS_NUM - 1);
      let closestStep = closest(preciseStep, nonPowerOfTenScaleBarSteps);
    if (closestStep === Math.max(...nonPowerOfTenScaleBarSteps)) {
      // maybe it needs a step even bigger, we take a power of ten
      closestStep = nearestPowerOfTen(preciseStep);
    }
    let ret = [];
    let cur = 0;
    while (cur < max) {
      ret.push(cur);
      cur += closestStep;
    }
    const last = ret[ret.length - 1];
    if ((max - last) * scale > KEY_HEIGHT) {
      ret.push(max); // always show the maximum value if there's room for it
    }
    return ret;
  }

  return (
    <div className='chart'>
      <div className='chart__scale-bar'>
        {computeScaleBarValues().map((value, index) => (
          <span
            key={index} className='chart__scale-bar__value'
            style={{bottom:value * scale + LABEL_HEIGHT - KEY_HEIGHT / 2}}>{value}
          </span>
        ))}
      </div>
      {Object.entries(data).map(([key, values]) => (
        <div key={key}className='chart__entry'>
          <div
            key={key}
            className='chart__bar-group'
            style={{height:(Math.max(...values) * scale) + ' px'}}
          >
            {values.map((value, index) => (
              <ChartBar key={index}
                value={value}
                color={colors[index]}
                scale={scale}
                displayValue={displayValue}/>
            ))}
          </div>
          <span className='key'>{key}</span>
        </div>
      ))}
    </div>
  );
};

Chart.defaultProps = {
  height: 500,
  displayValue: (value: number) => `$ ${value}`,
  colors: ['#A6E7DB', '#2D7A7A', '#76C7D2'],
  data: {
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
      80
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
      10,
      5,
      5
    ]
  }
};
