import {useState, useRef, useEffect} from 'react';

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef<HTMLElement>();

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
      return undefined;
    },
    [ref.current] // Recall only if ref changes
  );

  return [(node: HTMLElement) => { ref.current = node; }, value];
}
