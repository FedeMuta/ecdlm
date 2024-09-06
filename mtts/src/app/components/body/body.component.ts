import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent  {
  word = 'El Club de los Mutantes'.split('');

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const letters = document.querySelectorAll('.letter');

    letters.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const letterX = rect.left + rect.width / 2;
      const letterY = rect.top + rect.height / 2;

      const distanceX = event.clientX - letterX;
      const distanceY = event.clientY - letterY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const maxDistance = 150; 

      if (distance < maxDistance) {
        const repulsionForce = (maxDistance - distance) / maxDistance;

        const moveX = distanceX * repulsionForce * -1;
        const moveY = distanceY * repulsionForce * -1;

        (letter as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        (letter as HTMLElement).style.transform = 'translate(0, 0)';
      }
    });
  }
}