declare module 'vue' {
  import { CompatVue } from 'vue'
  const Vue: CompatVue
  export default Vue
  export * from 'vue'
  const { configureCompat, createApp, onBeforeMount, reactive, withDefaults, defineProps } = Vue
  export { configureCompat, createApp, onBeforeMount, reactive, withDefaults, defineProps }
}