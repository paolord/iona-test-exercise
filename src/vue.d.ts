declare module 'vue' {
  import { CompatVue } from 'vue'
  const Vue: CompatVue
  export default Vue
  export * from 'vue'
  const { configureCompat, createApp } = Vue
  export { configureCompat, createApp }
}