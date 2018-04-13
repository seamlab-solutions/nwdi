import { PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';
import * as $ from 'jquery';

export class App {
    configureRouter(config: RouterConfiguration): void {
        config.title = 'Information System';

        var assigned_routes = [
            {
                name:   'home',
                module: PLATFORM.moduleName('website/home'),
                nav: true,
                title: 'Home',
                layout: 'website'
            },
            {
                name:   'about-us',
                module: PLATFORM.moduleName('website/about-us'),
                title: 'About Us',
                layout: 'website'
            },
            {
                name:   'service',
                module: PLATFORM.moduleName('website/service'),
                title: 'Services',
                layout: 'website'
            },
            {
                name:   'package',
                module: PLATFORM.moduleName('website/package'),
                title: 'Packages',
                layout: 'website'
            },
            {
                name:   'clinic',
                module: PLATFORM.moduleName('website/clinic'),
                title: 'Clinics',
                layout: 'website'
            },
            {
                name:   'career',
                module: PLATFORM.moduleName('website/career'),
                title: 'Careers',
                layout: 'website'
            },
            {
                name:   'news',
                module: PLATFORM.moduleName('website/news'),
                title: 'News and Events',
                layout: 'website'
            },
            {
                name:   'contact-us',
                module: PLATFORM.moduleName('website/contact-us'),
                title: 'Contact Us',
                layout: 'website'
            },
            {
                name:   'online-result',
                module: PLATFORM.moduleName('website/online-result'),
                title: 'Online Result',
                layout: 'website'
            }
        ];

        let routes: any = [];

        $.each(assigned_routes, function(index, item) {
            let route = {
                name: 		item.name,
                route: 		item.name,
                title:      item.title == undefined ? '' : item.title,
                moduleId:   item.module,
                nav: 		item.nav == undefined ? true : item.nav,
                settings:   { auth: false },
                layoutView: PLATFORM.moduleName('core/layout/' + (item.layout == undefined ? 'default' : item.layout) + '.html'),
                layoutViewModel: PLATFORM.moduleName('core/layout/' + (item.layout == undefined ? 'default' : item.layout))
            };

            if(item.layout == 'website') {
                route.layoutView =  PLATFORM.moduleName('core/layout/website.html')
                route.layoutViewModel = PLATFORM.moduleName('core/layout/website')
            } else {
                route.layoutView =  PLATFORM.moduleName('core/layout/default.html')
                route.layoutViewModel = PLATFORM.moduleName('core/layout/default')
            }

            routes.push(route);
        });

        config.map(routes);
        config.mapUnknownRoutes({ route: 'home', redirect: '#/home' });
    }
}