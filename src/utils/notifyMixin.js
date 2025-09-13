export default {
  methods: {
    notifySuccess(msg){ 
      this.$bvToast.toast(msg, {
        title:'Sukses', 
        variant:'success', 
        autoHideDelay:2000
      }); 
    },
    
    notifyError(msg){ 
      this.$bvToast.toast(msg, {
        title:'Error', 
        variant:'danger', 
        autoHideDelay:3000
      }); 
    }
  }
}
