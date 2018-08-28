// components/Dialog/dialog.js
Component({
  data: {
    isShow: true,
    index: 0,
    setNumber: 1,
    addNumDisabled: false,
    reduceNumDisabled: true,
    addGrey: false,
    reduceGrey: true,
    remarks: "",
    isShowError: true,
    isShowZeroTips: true,
    surplusNum: 0,
    confirmDisabled: true
  },
  methods: {
    hideDialog() {
      this.setData({
        isShow: true
      })
    },
    showDialog(idx, surplusNum) {
      this.setData({
        isShow: false,
        index: idx,
        surplusNum
      })
    },
    confirm() {
      let item = {
        index: this.data.index,
        setNumber: this.data.setNumber,
        remarks: this.data.remarks
      }
      if (this.data.confirmDisabled){
        this.hideDialog();
        this.triggerEvent("confirm", item);
        this.setData({
          setNumber: 1,
          remarks: "",
          isShowError: true
        });
      }      
    },
    close(){
      this.hideDialog();
      this.setData({
        setNumber: 1,
        remarks: "",
        isShowError: true,
        isShowZeroTips: true,
        addNumDisabled: false,
        addGrey: false,
        reduceNumDisabled: true,
        reduceGrey: true
      });
    },
    setNumber(e){
      let value = e.detail.value;
      let surplusNum = this.data.surplusNum;

      if (value >= 1 && value <= surplusNum){
        this.setData({
          addNumDisabled: false,
          addGrey: false,
          reduceNumDisabled: false,
          reduceGrey: false,
          isShowError: true,
          isShowZeroTips: true,
          confirmDisabled: true
        });
      } else if (value > surplusNum){
        this.setData({
          addNumDisabled: true,
          addGrey: true,
          reduceNumDisabled: false,
          reduceGrey: false,
          isShowZeroTips: true,
          isShowError: false,
          confirmDisabled: false
        });
      } else if (value < 1) {
        this.setData({
          isShowZeroTips: false,
          addNumDisabled: true,
          addGrey: true,
          reduceNumDisabled: true,
          reduceGrey: true,
          isShowError: true,
          confirmDisabled: false
        });
      }

      this.setData({
        setNumber: value
      });
    },
    addNum() {
      let setNumber = this.data.setNumber;
      let surplusNum = this.data.surplusNum;

      this.setData({
        setNumber: setNumber >= surplusNum ? surplusNum : parseInt(setNumber) + 1,
        addNumDisabled: setNumber >= (surplusNum - 1) ? true : false,
        reduceNumDisabled: setNumber >= 1 ? false : true,
        addGrey: setNumber >= (surplusNum - 1) ? true : false,
        reduceGrey: setNumber >= 1 ? false : true,
        isShowError: setNumber >= (surplusNum - 1) ? false : true,
        isShowZeroTips: setNumber >= 0 ? true : false,
        confirmDisabled: setNumber >= 0 ? true : false
      });
    },
    reduceNum() {
      let setNumber = this.data.setNumber;
      let surplusNum = this.data.surplusNum;

      this.setData({        
        setNumber: setNumber <= 1 ? 1 : parseInt(setNumber) - 1,
        addNumDisabled: setNumber <= surplusNum ? false : true,
        reduceNumDisabled: setNumber <= 2 ? true : false,
        reduceGrey: setNumber <= 2 ? true : false,
        addGrey: setNumber <= surplusNum ? false : true,
        isShowError: setNumber <= surplusNum ? true : false,
        confirmDisabled: (setNumber - 1) <= surplusNum ? true : false
      });
    },
    remarks(e) {
      this.setData({
        remarks: e.detail.value
      });
    }
  }
})