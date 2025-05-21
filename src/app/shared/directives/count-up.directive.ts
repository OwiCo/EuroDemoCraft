import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCountUp]',
    standalone: false,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() endVal = 0;
  private observer!: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.animateCount();
        this.hasAnimated = true;
        this.observer.disconnect();
      }
    });

    this.observer.observe(this.el.nativeElement);
  }

  private animateCount(): void {
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * this.endVal);
      this.el.nativeElement.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
