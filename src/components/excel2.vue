<template>
  <div class="hello">
      <h1>{{ msg }}</h1>
      <input id="upload" type="file" @change="importfxx()"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      <!-- <h1 @click="aa()">hello 请导出文件</h1> -->
      <!-- <input type="button" value="导出" @click="exportExcel" /> -->
      <div class="box">

            <table style="border:1px solid red">
              <tr >
                  <!-- <td v-for="(v,num) in table[table.length-1]" :key="num">{{ num+1 }}</td> -->
              </tr>
              <tr v-for="(val,index) in table" :key="index">
                  <td>{{ index+1 }}</td><td v-for="(item,i) in val" :key="i">{{item.value}}</td>
              </tr>
            </table>

      </div>
      <!-- <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='1000px' frameborder='1'>
			</iframe> -->


  </div>
</template>

<script>
// 调用实例
// 调用封装好的完整的 http 请求函数
import { AZ } from "../vendor/proces.js";
  // import XLSX from 'xlsx';
  // const workbook = XLSX.readFile('someExcel.xlsx', opts);
  
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'hello 请导入表格',
        excel: null,
        file: null,
        table:null
      }
    },
    methods: {
        aa(){
          console.log(event)
        },
        importfxx() {
          // console.log(obj)
          let _this = this;
          // let inputDOM = this.$refs.inputer;
          // 通过DOM取文件数据
          this.file = event.currentTarget.files[0];
          // console.log(this.file)
          // console.log(event)
        　　var rABS = false; //是否将文件读取为二进制字符串
        　　var f = this.file;
        　　var reader = new FileReader();
          FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for(var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    var XLSX = require('xlsx');
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                    }
                    console.log(wb)
                    // outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    // console.log(wb.SheetNames[0])   //表名
                    console.log('文件中所有的表（是个对象）')
                    console.log(wb.Sheets) //文件中所有的表（是个对象）
                    console.log('文件中的第一张表的数据')
                    console.log(wb.Sheets[wb.SheetNames[0]])  //文件中的第一张表的数据

                 
                    console.log('最终处理完成的值')

                    let az = AZ() //AZ返回的是一个数组里面包含了 excel 表格的所有列 A-z AA-ZZ...
                    console.log(az)


      　　　　　　　}
                  reader.readAsArrayBuffer(f);
              }
              if(rABS) {
                  reader.readAsArrayBuffer(f);
              } else {
                  reader.readAsBinaryString(f);
              }
        }
       
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color: orange;
  font-weight: normal;
  }
table,table tr th, table tr td { border:1px solid #0094ff; }
td {
  text-align: center;
  padding: 5px 10px;
}
table {
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
}
.box {
  max-width: 60%;
  display: flex;
  align-items: center;
  justify-items: center;
  /* border: 1px solid orange; */
  margin: 0 auto;
}
</style>
