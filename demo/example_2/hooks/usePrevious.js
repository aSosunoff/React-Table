import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  });

  return prevValueRef.current;
}
