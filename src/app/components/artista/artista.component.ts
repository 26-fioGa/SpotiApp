import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-artista",
  templateUrl: "./artista.component.html",
  styles: [],
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];

  loadingArtist: boolean;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loadingArtist = true;

    // Invocación método para refrescar token
    this.spotify.refreshToken().subscribe((data: any) => {
      // Refrescamos token
      spotify.token = data.access_token;
      console.log(`token atribute: ${spotify.token}`);
      console.log(`token request: ${data.access_token}`);
    });

    this.router.params.subscribe((params) => {
      this.getArtista(params["id"]);
      this.getTopTracks(params["id"]);
    });
  }

  getArtista(id: string) {
    this.loadingArtist = true;

    this.spotify.getArtista(id).subscribe((artista) => {
      console.log(artista);
      this.artista = artista;

      this.loadingArtist = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }
}
