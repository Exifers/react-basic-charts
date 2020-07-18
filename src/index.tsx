import React, {useState} from 'react';
import { usePopper } from 'react-popper';
import {useHover} from './useHover';

interface chartProps {
  displayValue: (value: number) => string,
  data: {[key: string]: [number, number, number]},
  colors: [string],
  scale: number
};

interface charBarProps {
  displayValue: (value: number) => string,
  value: number,
  color: string,
  scale: number
};

const ChartBar = (props: charBarProps) => {
  // @ts-ignore
  const [referenceElement, setReferenceElement] = useState(null);
  // @ts-ignore
  const [popperElement, setPopperElement] = useState(null);
  // @ts-ignore
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

  const { data, colors, scale, displayValue } = props;

  const computeScaleBarValues = () => {
    const max = Math.max(...Object.values(data).map(value => Math.max(...value)));
    const maxInPx = max * scale;
    let ret = [];
    let cur = 0;
    const deltaInPx = 57; // from css
    while (cur * scale < maxInPx) {
      ret.push(cur);
      cur += Math.round(deltaInPx / scale);
    }
    return ret;
  }

  return (
    <div className='chart'>
      <div className='chart__scale-bar'>
        {computeScaleBarValues().map((value, index) => (
          <span key={index} className='chart__scale-bar__value'>{value}</span>
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
  displayValue: (value: number) => `$ ${value}`,
  scale: 7,
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
  }
};
