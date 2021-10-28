import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent {

    nuevasCanciones: any[] = [];
    loading: boolean;

    error: boolean;
    mensajeError: string;

    constructor(private spotify: SpotifyService) {

        this.loading = true;
        this.error = false;

        // Invocación método para refrescar token
        this.spotify.refreshToken().subscribe((data: any) => {
            // Refrescamos token            
            spotify.token = data.access_token;
            console.log(`token atribute: ${spotify.token}`)
            console.log(`token request: ${data.access_token}`);
        });

        this.spotify.getNewReleases()
            .subscribe((data: any) => {
                this.nuevasCanciones = data;
                this.loading = false;
            }, (errorServicio) => {
                this.loading = false;
                this.error = true;
                console.log(errorServicio);
                this.mensajeError = errorServicio.error.error.message;

            });
        /*this.spotify.refreshToken().subscribe((data: any) => {
            console.log(data);
        })*/
    }



}