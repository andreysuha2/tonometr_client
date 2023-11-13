import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mdi, aliases } from 'vuetify/lib/iconsets/mdi.mjs';

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases, 
            sets: { mdi }
         }
    });
    app.vueApp.use(vuetify);
})