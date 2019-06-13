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
      <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='1000px' frameborder='1'>
			</iframe>


  </div>
</template>

<script>
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
                    // outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    // console.log(wb.SheetNames[0])   //表名
                    console.log('文件中所有的表（是个对象）')
                    console.log(wb.Sheets) //文件中所有的表（是个对象）
                    console.log('文件中的第一张表的数据')
                    console.log(wb.Sheets[wb.SheetNames[0]])  //文件中的第一张表的数据

                    //遍历 wb.Sheets[wb.SheetNames[0]] 所有的key  返回的是一个数组
                    let key = Object .keys(wb.Sheets[wb.SheetNames[0]]);
                    console.log(key)
                    let keyall =[]; //用来存储纯净的 key 值
                    for(let i=0;i<key.length;i++){
                        if(/^[A-Z0-9]+$/.test(key[i])){ //正则匹配所有的key值包含字母A-Z 0-9
                            keyall.push(key[i])
                        }                       
                    }
                    console.log('keyall excel表格的所有数据的位置（key）如A1，A2...')
                    console.log(keyall)


                    let table = []; //用来存储key的位置，数组嵌套数组，table[0]表示第一行的所有key，table[0][0] 表示第一行的一个key
                    let patt1 = /\d+/g; //匹配字符串里的所有数字
                    for (let i = 0; i < keyall.length; i++) {   //把保存纯净的 所有 key 保存在table数组分类
                        // keyall[i].match(patt1)[0] 正则匹配得到所有数字的结果 例如A1 匹配到的结果是1 ，代表就是第一行。相当于下标，也就是表格第几行
                        let index = parseInt( keyall[i].match(patt1)[0] );

                        if(!table[index-1]){    //给table 嵌套数组，做个判断，若已经存在就跳过创建，直接添加
                            table[index-1]=[];
                        }
                        table[index-1].push(keyall[i]) 

                    }
                    
                    console.log('table整合数据')
                    console.log(table)

                    // 最终数据处理保存
                    let keyobj = {};
                    let oktable =[];
                    for (let i = 0; i < table.length; i++) {
                        if(table[i]){
                            for (let j = 0; j < table[i].length; j++) {
    
                                  let key = table[i][j];
                                  // console.log('进入了')
                                  // let v = 'v'
                                  console.log(key,'个数有 ：    ',wb.Sheets[wb.SheetNames[0]][key].v);
                                  keyobj = {key,value:wb.Sheets[wb.SheetNames[0]][key].v}
                                  if(!oktable[i]){
                                      oktable[i]=[];
                                  }
                                  oktable[i].push(keyobj);

                            
                            }
                        }

                      
                    }
                    console.log('最终处理完成的值')
                    console.log(oktable)
                    _this.table = oktable;
                    // console.log(wb.Sheets[wb.SheetNames[0]].table[0][0].v)
                    // for (var i = 0; i < 26; i++) {
                    //         console.log(String.fromCharCode((65 + i)));
                    // }



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
