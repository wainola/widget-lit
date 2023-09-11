# widget-lit

```
yarn install
yarn build:all

cd ./examples/vue-widget-example
yarn dev
```

Alternative to use it as a dependency in another project

```
yarn add @wainola/lit-widget
```

If you are using `vite vue template` copy/paste the following to the config:

```typescript
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
});
```

```typescript
import '@wainola/lit-widget'
```
```html
<widget-test widgetApp="My Demo" primaryColor="white" secondaryColor="violet" borderRadius="5px" fontWeight="bold"></widget-test>
```
