import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

interface Song {
  title: string;
  url: string;
}

interface Album {
  name: string;
  songs: Song[];
}

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})

export class ReproductorComponent implements OnInit, AfterViewInit {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 0.5;
  muted = false;
  currentSongIndex = 0;
  currentAlbum = {
    name: 'El Club de los Mutantes',
    songs: [
      { title: 'Escuchenlos', url: 'assets/music/Escuchenlos.mp3' },
      { title: 'Siguelo', url: 'assets/music/SIGUELO.mp3' },
      { title: 'Fe', url: 'assets/music/FE.mp3' },
      { title: 'Pasajero', url: 'assets/music/PASAJERO.mp3' },
      { title: 'El Dinero', url: 'assets/music/El dinero.mp3' },
    ],
  };

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadSong(); 
    const audio = this.audioElement.nativeElement;
    audio.volume = this.volume;

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration;
    });
  }

  loadSong() {
    const audio = this.audioElement.nativeElement;
    audio.src = this.currentAlbum.songs[this.currentSongIndex].url;
    if (this.isPlaying) {
      audio.play();
    }
  }

  nextSong() {
    if (this.currentSongIndex < this.currentAlbum.songs.length - 1) {
      this.currentSongIndex++;
      this.loadSong();
    } else {
      this.currentSongIndex = 0;
      this.loadSong();
    }
  }

  previousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.loadSong();
    } else {
      this.currentSongIndex = this.currentAlbum.songs.length - 1;
      this.loadSong();
    }
  }

  togglePlayPause() {
    const audio = this.audioElement.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  updateProgress() {
    this.currentTime = this.audioElement.nativeElement.currentTime;
    this.duration = this.audioElement.nativeElement.duration;

    // Reproducir la siguiente canción automáticamente cuando termine la actual
    if (this.currentTime === this.duration) {
      this.nextSong();
    }
  }

  seek(event: any) {
    const audio = this.audioElement.nativeElement;
    const seekTime = event.target.value;
    audio.currentTime = seekTime;
    this.currentTime = seekTime;
  }

  updateVolume() {
    const audio = this.audioElement.nativeElement;
    audio.volume = this.volume;
  
    // Selecciona el control de rango de volumen
    const volumeRange = document.getElementById('volume') as HTMLInputElement;
    
    // Actualiza la variable CSS para el valor de la barra de progreso
    volumeRange.style.setProperty('--value', this.volume.toString());
  }

  mute() {
    const audio = this.audioElement.nativeElement;
    audio.muted = !audio.muted;  // Alterna el estado de mute
    this.muted = audio.muted;
  
    const volumeRange = document.getElementById('volume') as HTMLInputElement;
  
    if (this.muted) {
      volumeRange.value = '0';  // Desliza el volumen a 0 visualmente
      volumeRange.style.setProperty('--value', '0');  // Actualiza la propiedad CSS para la barra
    } else {
      volumeRange.value = this.volume.toString();  // Restaura el valor del volumen visualmente
      volumeRange.style.setProperty('--value', this.volume.toString());  // Actualiza la barra de volumen
    }
  }
    
}