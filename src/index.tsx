import React, {useState} from 'react';
import { usePopper } from 'react-popper';

interface chartProps {
  data: {string: [number, number, number]},
  colors: [string],
  scale: number
};

const computeScaleBarValues = () => {
  return [0,100,200,300]
}

export const Chart = (props: chartProps) => {

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{name: 'arrow', options: {element: arrowElement}}]
  })

  const { data, colors, scale } = props;


  return (
    <div className='chart'>
      <div className='chart__scale-bar'>
        {computeScaleBarValues().map(value => (
          <span className='chart__scale-bar__value'>{value}</span>
        ))}
      </div>
      {Object.entries(data).map(([key, values]) => (
        <div className='chart__entry'>
          <div
            key={key}
            className='chart__bar-group'
            style={{height:(Math.max(...values) * scale) + ' px'}}
          >
            {values.map((value, index) => (
              <>
                {/* @ts-ignore */}
                <div ref={setReferenceElement}
                  key={key}
                  className='chart__bar'
                  tabIndex={0}
                  style={{
                    height:value * scale + 'px',
                    backgroundColor: colors[index]
                  }}
                />
                {/* @ts-ignore */}
                <div ref={setPopperElement} style={style.popper} {...attributes.popper}>
                  Popper
                  {/* @ts-ignore */}
                  <div ref={setArrowElement} style={styles.arrow}/>
                </div>
              </>))}
          </div>
          <span className='key'>{key}</span>
        </div>
      ))}
    </div>
  );
};

Chart.defaultProps = {
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
      10
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
