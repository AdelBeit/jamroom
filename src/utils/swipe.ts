interface Swipe {
  startX: undefined | number;
  startY: undefined | number;
  endX: undefined | number;
  endY: undefined | number;
  onTouchStart(e: React.TouchEvent): void;
  onTouchMove(e: React.TouchEvent): void;
  onTouchEnd(
    rightSwipe: () => void,
    leftSwipe: () => void,
    e: React.TouchEvent
  ): void;
}

export const swipe: Swipe = {
  startX: undefined,
  startY: undefined,
  endX: undefined,
  endY: undefined,
  onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 3) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      e.stopPropagation();
    }
  },
  onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 3) {
      this.endX = e.touches[0].pageX;
      this.endY = e.touches[0].pageY;
      e.stopPropagation();
    }
  },
  onTouchEnd(leftSwipe, rightSwipe, e) {
    if (
      this.startX &&
      this.endX &&
      this.startY &&
      this.endY &&
      Math.abs(this.startX - this.endX) > 50 &&
      Math.abs(this.startY - this.endY) < 50
    ) {
      e.stopPropagation();
      if (this.startX < this.endX) {
        // setText("3-finger swipe right");
        rightSwipe();
      } else {
        // setText("3-finger swipe left");
        leftSwipe();
      }
    }
    this.startX = this.startY = this.endX = this.endY = undefined;
  },
};
