import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
import Windicss from 'vite-plugin-windicss'
export default defineConfig({
  plugins: [vue(),Windicss()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://ceshi13.dishait.cn',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  }
})
