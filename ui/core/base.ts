import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration';
import { Container} from 'aurelia-dependency-injection';
import { Redirect, Router, NavigationInstruction, Next } from 'aurelia-router';
import * as $ from 'jquery';

export class Base {
    static inject() { return [HttpClient, AureliaConfiguration, Router]; }

    constructor(public http: HttpClient, public app_config: AureliaConfiguration, public router: Router) {}

    get(url, query_strings : any = []) : any {
        $.each(query_strings, function(index, query_string) {
			url = url + '/' + query_string;
        });
        
        return new Promise((resolve, reject) => {
            this.http.fetch(url, { headers: { 'Authorization': this.app_config.get('token') } })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            });
        });
    }

    post(url, body) : any {
      return new Promise((resolve, reject) => {
        this.http.fetch(url, {
          method: 'post',
          body: json(body),
          headers: new Headers({
            'Authorization': this.app_config.get('token')
          })
        })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        });
      });
    }
}

export class HttpRouteAuthorization {
  static inject() { return [AureliaConfiguration, HttpClient]; }

  constructor(private app_config, http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(app_config.get('api.endpoint'))
        .withDefaults({
          credentials: 'include',
          headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
          },
        })
        .withInterceptor({
          response(response) {
            let _response = response.clone();
            _response.json().then(function(data) {
                if(data.alert != undefined) {
                    alert(data.alert);
                }
            });
            return response;
          },
          responseError(response) {
            let _response = response.clone();
            _response.json().then(function(data) {
                alert('Error: Please contact your system administrator.' + data);
            });
            return response;
          }
        });
      });
      Container.instance.registerInstance(HttpClient, http);
  }

  run(navigation_instruction: NavigationInstruction, next: Next): Promise<any> {
    if(navigation_instruction.config.settings.auth != undefined) {
      if (navigation_instruction.config.settings.auth) {
        let is_logged_in = !(this.app_config.get('token') == '' || this.app_config.get('token') == null || this.app_config.get('token') == undefined);
        if (!is_logged_in) {
          return next.cancel(new Redirect(''));
        }
      }
    }
    return next();
  }
}