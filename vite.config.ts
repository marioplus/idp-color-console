import {defineConfig} from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                name: 'idp-color-console',
                namespace: 'marioplus/idp',
                author: 'marioplus',
                version: '1.0.0',
                match: ['idp.dtyunxi.cn'],
                description: 'idp颜色控制台'
            },
        }),
    ],
})
