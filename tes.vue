<template>
    <span class="add-house">
      <Button type="primary" @click="showModal" size="default" slot="extra">增加</Button>
      <Modal
              v-model="visible"
              title="添加房源"
              width="850">
        <Row>
            <Col span="24" class="Mcon">
                <Col span="4">
                    <div class="Left">

                    </div>
            </Col>
            <Col span="20">
                    <div class="Right">
                        <div class="Right_top">
                            <Col span="8">
                            项目楼宇
                            <Select v-model="buildNum" style="width:130px;margin-right:30px">
                                <Option v-for="item in buildList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                            <Col span="8">
                            房间类型：
                            <Select v-model="houseType" style="width:130px;margin-right:30px">
                                <Option v-for="item in houseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                            <Col span="8">
                            空间类型编码：：
                            <Input v-model="typeCode" placeholder="Enter something..." style="width:130px"></Input>
                            </Col>
                        </div>
                        <div class="Right_bottom">
                            <Col span="8" style="margin-top: 5px">
                            所在楼层：
                            <Input v-model="floorNum" placeholder="Enter something..." style="width:130px"></Input>
                            </Col>
                            <Col span="8" style="margin-top: 5px">
                            房间数量：
                            <Input v-model="roomCount" placeholder="Enter something..." style="width:130px"></Input>
                            </Col>
                        </div>
                    </div>
            </Col>
            </Col>

            <div>
                <Divider dashed orientation="right"><Button @click="addRoom" type="primary" class="AButton">添加编辑</Button></Divider>
            </div>
            <div>
                <Divider orientation="left">添加编辑房源信息</Divider>
            </div>

            <div class="house-content">

                    <div
                            class="house-flex"
                            v-if="item.status"
                            :key="index"
                            v-for="(item, index) in roomList">

                    <div class="left">

                    </div>
                    <div class="right">
                        <div class="top">
                            <div class="item" v-if="item.type === 'office' ">
                            办公间：
                            <Input v-model="item.name" >
                            </Input>
                            </div>
                            <div class="item" v-if="item.type === 'meeting' ">
                            会议室：
                            <Input v-model="item.name" >
                            </Input>
                            </div>

                            <div class="item">
                                面积：
                                <Input v-model="item.areaSize" ></Input>
                            </div>
                            <div class="item">
                                工位：
                                <Input v-model="item" ></Input>
                            </div>
                            <div class="item">
                                设施：
                                <Input v-model="value" ></Input>
                            </div>
                            <Button class="item" @click="removeRoom(index)">X</Button>
                        </div>
                        <div class="bottom">
                            <div class="item">
                                状态：<Input v-model="value" ></Input>
                            </div>
                            <div class="item">
                                <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
                                <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Row>

    </Modal>
    </span>
</template>

<script>
  export default {
    name: 'AddHouse',
    data(){
      return{
        buildList: [
          {
            value: '1',
            label: '共享办公7号楼'
          },
          {
            value: '2',
            label: '雅宝路7号楼'
          },
          {
            value: '3',
            label: '东尚E园10号楼'
          },
          {
            value: '4',
            label: '东尚E园11号楼'
          }
        ],
        buildNum: '2',
        houseTypeList: [
          {
            value: 'office',
            label: '办公间'
          },
          {
            value: 'meeting',
            label: '会议室'
          },
          {
            value: 'share',
            label: '共享区'
          },
          {
            value: 'mobile',
            label: '移动工位'
          }
        ],
        houseType: 2,
        typeCode: 'O',
        floorNum: 2,
        roomCount: 3,
        value:'',
        count: [0, 1, 2],
        visible: false,
        roomList: [],
        index: 0,
      }
    },
    methods: {
      showModal(){
        this.visible = true
      },
      addRoom(){
        let floorNum = this.floorNum;
        let roomCount = this.roomCount;
        let houseType = this.houseType;

        for(let i=0; i<roomCount; i++){
          this.index++;
          this.roomList.push({
            value: '',
            index: this.index,
            status: 1,
            type: houseType,
            name: floorNum * 100 + this.index,
          })
        }
      },
      removeRoom(index){
        this.roomList[index].status = 0;
      },


      handleClose2 (event, name) {
        const index = this.count.indexOf(name);
        this.count.splice(index, 1);
      },
      handleAdd () {
        if (this.count.length) {
          this.count.push(this.count[this.count.length - 1] + 1);
        } else {
          this.count.push(0);
        }
      },
    },
  }
</script>

<style lang="less" scoped>
    .add-house{
        h3{
            font-size: 16px;
        }
    }

    .house-content{
        .house-flex{
            display: flex;
            justify-content: flex-start;
            padding: 15px 0;
            border-bottom: 1px dashed #c3c3c3;
            .left{
                flex: 2;
                background-color: #ffffff;
                border: solid 1px #c3c3c3;
            }
            .right{
                flex: 8;
                display: flex;
                flex-direction: column;
                .item{
                    .ivu-input-wrapper{
                        width: 60%;
                    }
                    border-right: 1px dashed #ccc;
                    margin-right: 10px;
                }
                .top{
                    display: flex;

                }
                .bottom{
                    margin-top: 10px;
                    display: flex;
                }
            }
        }
    }


</style>