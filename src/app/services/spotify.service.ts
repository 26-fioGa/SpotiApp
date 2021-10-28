import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    public token: string = '';

    constructor(private http: HttpClient) {
        console.log('Spotify Service Listo');
    }

    refreshToken() {
        const url = "https://accounts.spotify.com/api/token";

        const headers = new HttpHeaders({
            'Accept': '*/*',
            'Authorization': 'basic ODJkZGE1NjUwODQ2NDY0N2I1ZWE3NzM1OTdlMzNlYjE6OTc5MDE1NzVmNTQ0NDlhMWFhMzdmMTExMWYyMWIxNjg=',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post(url, 'grant_type=client_credentials', { headers });
    }

    getQuery(query: string) {

        // Invocación método para refrescar token
        this.refreshToken().subscribe((data: any) => {
            // Refrescamos token            
            this.token = data.access_token;
            console.log(`token atribute: ${this.token}`)
            console.log(`token request: ${data.access_token}`);
        });

        const url = `https://api.spotify.com/v1/${ query }`;

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
        });

        return this.http.get(url, { headers });
    }


    getNewReleases() {

        return this.getQuery('browse/new-releases?limit=20')
            .pipe(map(data => data['albums'].items));

    }

    getArtistas(termino: string) {

        return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
            .pipe(map(data => data['artists'].items));

    }

    getArtista(id: string) {

        return this.getQuery(`artists/${ id }`);
        // .pipe( map( data => data['artists'].items));

    }

    getTopTracks(id: string) {

        return this.getQuery(`artists/${ id }/top-tracks?country=us`)
            .pipe(map(data => data['tracks']));

    }

}