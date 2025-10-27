import {useState, useRef, useCallback} from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefault?: boolean;
}

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefault = true
  } = options;

  const [touchStart, setTouchStart] = useState<{x: number; y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number; y: number} | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, [preventDefault]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (preventDefault) {
      e.preventDefault();
    }
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, [preventDefault]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (absDeltaX > threshold) {
        if (deltaX > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDeltaY > threshold) {
        if (deltaY > 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

export const usePullToRefresh = (options: PullToRefreshOptions) => {
  const {onRefresh, threshold = 80, resistance = 0.5} = options;
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const elementRef = useRef<HTMLElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (elementRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0 && elementRef.current?.scrollTop === 0) {
      e.preventDefault();
      const distance = Math.min(deltaY * resistance, threshold * 1.5);
      setPullDistance(distance);
    }
  }, [isPulling, resistance, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
    setIsPulling(false);
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

  const refreshProgress = Math.min(pullDistance / threshold, 1);

  return {
    ref: elementRef,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    isRefreshing,
    isPulling,
    pullDistance,
    refreshProgress,
    shouldShowRefreshIndicator: isPulling || isRefreshing
  };
};

export const useLongPress = (
  onLongPress: () => void,
  delay: number = 500
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (event.target) {
      target.current = event.target;
    }
    timeout.current = setTimeout(() => {
      onLongPress();
      setLongPressTriggered(true);
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    setLongPressTriggered(false);
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
    longPressTriggered
  };
};
