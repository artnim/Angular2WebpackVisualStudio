import { IgnoreTemplate } from './../../models/ignore-template';
import { Configuration } from './../../app.constants';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IgnoreTemplateService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'gitignore/templates';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<string[]> => {
        return this.http.get(this.actionUrl).map((response: Response) => <string[]>response.json());
    }

    public GetSingle = (name: string): Observable<IgnoreTemplate> => {
        let url = `${this.actionUrl}/${name}`;
        return this.http.get(url).map(res => <IgnoreTemplate>res.json());
    }
}