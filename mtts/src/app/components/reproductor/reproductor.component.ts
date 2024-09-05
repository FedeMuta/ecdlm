import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Song {
  title: string;
  url: string;
}

interface Album {
  name: string;
  cover: string;
  songs: Song[];
}

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})

export class ReproductorComponent implements OnInit {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  currentSongIndex = 0;
  currentAlbum!: Album;

  albums: Album[] = [
    {
      name: 'El Club de los Mutantes',
      cover: 'assets/music/ECdlM/Folder.jpg',
      songs: [
        { title: 'Flotando', url: 'assets/music/ECdlM/01 Flotando.mp3' },
        { title: 'El Dinero', url: 'assets/music/ECdlM/02 El dinero.mp3' },
        { title: 'Welcome', url: 'assets/music/ECdlM/03 Welcome.mp3' },
        { title : 'Escuchenlos', url: 'assets/music/ECdlM/04 Escuchenlos.mp3' },
        { title: 'Calles rotas', url: 'assets/music/ECdlM/05 Calles rotas.mp3' },
        { title: 'Un dia', url: 'assets/music/ECdlM/06 Un dia.mp3' },
        { title: 'Shine me', url: 'assets/music/ECdlM/07 Shine me.mp3' },
        { title: 'Nunca', url: 'assets/music/ECdlM/08 Nunca.mp3' },
        { title: 'Suena estereo', url: 'assets/music/ECdlM/09 Suena estereo.mp3' },
        { title: 'Ze pequeño', url: 'assets/music/ECdlM/10 Ze pequeño.mp3' },
        { title: 'Mucha lucha', url: 'assets/music/ECdlM/11 Mucha lucha.mp3' },
        { title: 'Jam', url: 'assets/music/ECdlM/12 Jam.mp3' },

      ],
    },
    {
      name: 'Esencia',
      cover: 'assets/music/Esencia/tapa.jpg',
      songs: [
        { title: 'Song 1', url: 'assets/music/Esencia/CERISINA.mp3' },
        { title: 'Song 2', url: 'assets/music/Esencia/CERISINA.mp3' },
      ],
    },
  ];

  ngOnInit() {
    this.currentAlbum = this.albums[0];
    this.selectAlbum(this.albums[0]); // Seleccionar el primer álbum por defecto
    this.audioElement.nativeElement.volume = this.volume;
  }

  selectAlbum(album: Album) {
    this.currentAlbum = album;
    this.currentSongIndex = 0;
    this.loadSong();
  }

  loadSong() {
    this.audioElement.nativeElement.src =
    this.currentAlbum.songs[this.currentSongIndex].url;
    this.togglePlayPause();
    this.audioElement.nativeElement.play();
    this.isPlaying = true;    
  }

  nextSong() {
    if (this.currentSongIndex < this.currentAlbum.songs.length - 1) {
      this.currentSongIndex++;
      this.loadSong();
    } else {
      this.audioElement.nativeElement.pause();
      this.isPlaying = false;
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

  seek(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const offsetX = event.offsetX;
    const newTime = (offsetX / progressBar.offsetWidth) * this.duration;
    this.audioElement.nativeElement.currentTime = newTime;
  }

  updateVolume() {
    this.audioElement.nativeElement.volume = this.volume;
  }
}