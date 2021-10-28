import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styles: []
})
export class SearchComponent {

    artistas: any[] = [];
    loading: boolean;

    constructor(private spotify: SpotifyService) {
        // Invocación método para refrescar token
        this.spotify.refreshToken().subscribe((data: any) => {
            // Refrescamos token            
            spotify.token = data.access_token;
            console.log(`token atribute: ${spotify.token}`)
            console.log(`token request: ${data.access_token}`);
        });
    }

    buscar(termino: string) {
        console.log(termino);

        this.loading = true;
        this.spotify.getArtistas(termino)
            .subscribe((data: any) => {
                console.log(data);
                this.artistas = data;
                this.loading = false;
            });
    }

}