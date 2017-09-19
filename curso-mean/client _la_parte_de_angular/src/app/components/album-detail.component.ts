import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {ArtistService} from '../services/artist-service';
import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [UserService, AlbumService]
})

export class AlbumDetailComponent implements OnInit{
    public album: Album[];
    public token;
    public identity;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('album-detail.component.ts cargando');

        //llamar al método del api para sacar un album en base a su id
        this.getAlbum();

        //comprobar que funciona el add artist
        //this._artistService.addArtist();
    }

    getAlbum(){
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response =>{
                    if(!response.album){
                        this._router.navigate(['/']);
                    }else{
                        this.album = response.album;
/*
                        //sacar los albums del artista
                        this._albumService.getAlbums(this.token, response.artist.id).subscribe(
                            response =>{
                                this.albums = response.albums;

                                if(!response.albums){
                                    this.alertMessage = 'Este artista no tiene albums';
                                }else{
                                    this.albums = response.albums;
                                }
                            },error =>{
                                var errorMessage = <any>error;
                                
                                if(errorMessage != null){
                                    //convertimos en obj json
                                    var body = JSON.parse(error._body);
                        
                                    //this.alertMessage = body.message;
                                    console.log(error);
                                }
                            }
                        );*/
                    }
                },
                error =>{
                    var errorMessage = <any>error;
                    
                    if(errorMessage != null){
                        //convertimos en obj json
                        var body = JSON.parse(error._body);
            
                        //this.alertMessage = body.message;
                        console.log(error);
                    }
                }
            );
        });
    }
}