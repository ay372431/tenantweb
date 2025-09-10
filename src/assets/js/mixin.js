/*
 * @Description: 混合模式之全局方法应用
 * @Author: gao shuai
 * @Date: 2020-02-25 15:46:39
 * @LastEditTime: 2020-09-01 17:49:33
 * @LastEditors: gao shuai
 */
export default {
  methods: {
    refreshtable() {
      if (this.$refs.moduleTable) {
        this.$refs.moduleTable.doLayout();
      }
    },
    getCerentTime(flag) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      if (flag) {
        return year + '-' + month + '-' + day + ' 00:00:00';
      } else {
        return year + '-' + month + '-' + day + ' 23:59:59';
      }
    },
    getCerentDate(flag) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      if (flag) {
        return year + '-' + month + '-' + day;
      } else {
        return year + '-' + month + '-' + day;
      }
    },
    getNewTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }
      return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
    },
    getYesterday(data) {
      if (data) {
        let date = new Date(data);
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59'];
      } else {
        let date = new Date();
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59'];
      }
    },
    getTomorrow(data) {
      if (data) {
        let date = new Date(data);
        let date1 = new Date();
        if (date1.getTime() - date.getTime() > 24 * 60 * 60 * 1000) {
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
          return [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59'];
        } else {
          let year = date1.getFullYear();
          let month = date1.getMonth() + 1;
          let day = date1.getDate();
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
          return [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59'];
        }
      } else {
        let date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        return [year + '-' + month + '-' + day + ' 00:00:00', year + '-' + month + '-' + day + ' 23:59:59'];
      }
    },
    timeCompair(time1, time2) {
      if (time1 && time2) {
        let date1 = new Date(time1);
        let date2 = new Date(time2);
        if (date2.getTime() - date1.getTime() < 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    intNumber(num) {
      return num.replace(/[^\d]/g, '');
    }
  },
  created() {
    this.$nextTick(() => {
      this.refreshtable();
    });
  },
  mounted() {}
};
