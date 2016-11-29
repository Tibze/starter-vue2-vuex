export default {
  getData(vm) {
    return vm.$http.get(process.env.api+"data");
  }            
}
