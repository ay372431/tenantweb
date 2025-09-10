<!--
 * @Description: 微信验证
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-28 16:35:02
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_listcontainer">
        <p class="tip_red">微信验证</p>
      </div>
      <div class="mgl15 mgr15 pdb15">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="公众号设置" name="first">
            <p>
              支持：GOM、GEE、新BLUE、GOB引擎，<font color="#008000"
                >安装请观看视频教程。</font
              >
            </p>
            <p class="mgt5">
              介绍：<font color="#0000FF"
                >玩家扫码绑定公众号，可有效积累玩家资源、防止游戏账号被盗。推荐使用自己的公众号</font
              >
            </p>
            <el-divider></el-divider>
            <el-form ref="form" :model="form" label-width="160px">
              <el-form-item label="功能状态：">
                <span v-if="isEnabledWxValid">已开通</span>
                <span v-else>未开通</span>
              </el-form-item>
              <el-form-item label="公众号：">
                <el-radio-group v-model="form.isOwnAccount">
                  <el-radio :label="false" :disabled="!isPlatOpenWxValid"
                    >平台公众号<font color="#FF0000" v-if="!isPlatOpenWxValid"
                      >(未开通)</font
                    >
                  </el-radio>
                  <el-radio :label="true">自己公众号</el-radio>
                </el-radio-group>
              </el-form-item>
               <div  v-if="form.isPlatOpenWxValid && !form.isOwnAccount" class="tc pdt20 pdb25">
        <img style="width:200px;height:200px;" :src="wxQrStr" alt="">      
        <p class="mgt5"><span>请保存微信二维码，并配置到游戏中</span></p>
      </div>
              <div v-if="form.isOwnAccount && isEnabledWxValid">
                <el-form-item label="查看消息关键字：">
                  <el-row :gutter="10">
                    <el-col :span="4">
                      <el-input
                        size="small"
                        v-model="form.messageKeyword"
                      ></el-input>
                    </el-col>
                    <el-col :span="16"
                      >非认证号,请玩家输入<font color="#ff0000">1</font
                      >,获取验证码</el-col
                    >
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号类型：">
                  <el-radio-group v-model="form.weChatAccountType">
                    <el-radio :label="0">订阅号 </el-radio>
                    <el-radio :label="1">服务号</el-radio>
                    <el-radio :label="2">认证服务号</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="公众号Appid：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.appId"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号Secret：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.appSecret"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="配置URL：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.configUrl"
                        disabled
                      ></el-input>
                    </el-col>
                    <el-col :span="12">
                      <font color="#ff0000">
                        点保存后生成URL，请复制到公众号开发=>基本配置=>服务器地址(URL)</font
                      >
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="通讯token：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.communicationToken"
                      ></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        size="small"
                        type="primary"
                        style="margin-left: 10px"
                        @click="token"
                        >生成token</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="消息加解密密钥：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.messageEncryptKey"
                      ></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button
                        size="small"
                        type="primary"
                        style="margin-left: 10px"
                        @click="random"
                        >随机生成</el-button
                      >
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="消息加解密方式：">
                  <el-radio-group v-model="form.wxEncryptionType">
                    <el-radio :label="0">明文模式 </el-radio>
                    <el-radio :label="1">兼容模式</el-radio>
                    <el-radio :label="2">安全模式（推荐）</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="被关注回复：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.beConcernedReply"
                        placeholder="如:欢迎关注XX公众号"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="验证码模板ID：">
                  <el-row>
                    <el-col :span="10">
                      <el-input
                        size="small"
                        v-model="form.templateId"
                        placeholder="验证码模板ID"
                      ></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <el-form-item label="">
                <el-button type="danger" size="small" @click="saveConfig"
                  >确认保存</el-button
                >
              </el-form-item>
              <el-form-item label="脚本下载：">
                <a
                  href="http://manageserver.87z.cc:5002/api/Upload/ShowFileNew?name=GOM"
                  target="_blank"
                  >GOM/GEE脚本</a
                ><br />
                <a
                  href=" http://manageserver.87z.cc:5002/api/Upload/ShowFileNew?name=新Blue"
                  target="_blank"
                  >新BLUE/GOB脚本</a
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="自定义回复" name="second">
            <el-form ref="replay" :model="replay" label-width="160px">
              <el-form-item label="">
                多个关键字请用半角逗号<font color="#ff0000">,</font>分隔
              </el-form-item>
              <el-form-item label="关键字1：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.key"
                      size="small"
                      type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容1：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.reply"
                      size="small"
                      type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="关键字2：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.key1"
                      size="small"
                      type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容2：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.reply1"
                      size="small"
                      type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="关键字3：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.key2"
                      size="small"
                      type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容3：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      v-model="replay.reply2"
                      size="small"
                      type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- <el-form-item label="其它回复：">
                <el-row>
                  <el-col :span="10">
                    <el-input
                      size="small"
                      v-model="replay.weChatAccountId"
                      type="textarea"
                      placeholder="如：你好，有什么问题请联系QQ：456789"
                    >
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item> -->
              <el-form-item label="">
                <el-button type="danger" size="small" @click="saveReplay"
                  >确认保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="查看/生成验证码" name="third">
            <div>
              功能介绍：本页面提供查看未过期的验证码，GM可以使用玩家对应验证码登陆游戏
              <el-button
                type="primary"
                size="small"
                style="margin-left: 10px"
                @click="refresh"
                >刷新</el-button
              >
            </div>
            <el-divider></el-divider>
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              border
              :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
              class="mgt15"
            >
              <el-table-column
                property="partitionName"
                label="分区名称"
                align="center"
              >
               
              </el-table-column>
              <el-table-column
                property="roleName"
                label="角色名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                property="validateCode"
                label="验证码"
                align="center"
              >
              </el-table-column>
              <el-table-column
                property="validateCodeType"
                label="验证类型"
                align="center"
              >
              </el-table-column>
              <el-table-column
                property="remainingTime"
                label="剩余有效时间（秒）"
                align="center"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="自定义菜单" name="zdycd">
            <div style="padding: 10px 8px 16px 8px;">
              <p>
              介绍：支持配置公众号二级菜单，功能仅支持「跳转链接」、「回复文字」、「获取验证码」三种类型
            </p>
            <p class="mgt5">
              提示：保存后覆盖微信当前菜单（空菜单保存表示删除所有菜单），操作前请先同步公众号菜单。因微信自身缓存，保存菜单数据后，需等待几分钟，公众号菜单才会变化
            </p>
            </div>
            <el-button type="warning" size="small">同步公众号菜单</el-button>
            <el-form :model="menuForm" label-width="70px">
              <!-- 一级菜单表单渲染 -->
              <div
                v-for="(menu, idx) in menuForm.menus"
                :key="menu.id"
                class="menu-form"
                style="border:1px solid #eee;padding:12px 16px;margin-bottom:10px;position:relative;"
              >
                <el-divider content-position="left">
                  一级菜单{{ idx + 1 }}
                </el-divider>
                <el-button
                  size="mini"
                  type="danger"
                  style="position:absolute;right:8px;top:8px;"
                  @click="removeMenu(idx)"
                >删除</el-button>
                <el-row :gutter="10" align="middle">
                  <el-col :span="8">
                    <el-form-item label="菜单名称" label-width="70px" style="margin-bottom:0;">
                      <el-input v-model="menu.name" maxlength="16" size="small" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="菜单类型" label-width="70px" style="margin-bottom:0;">
                      <el-select v-model="menu.type" size="small" style="width:140px">
                        <el-option label="点击回复文字" value="reply"></el-option>
                        <el-option label="点击跳转链接" value="url"></el-option>
                        <el-option label="点击回复验证码" value="code"></el-option>
                        <el-option label="父级菜单" value="parent"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 菜单类型为reply时显示 -->
                <el-row v-if="menu.type==='reply'" style="margin-top:8px;">
                  <el-col :span="24">
                    <el-form-item label="回复内容" label-width="70px">
                      <el-input
                        type="textarea"
                        :rows="3"
                        v-model="menu.reply"
                        maxlength="600"
                        show-word-limit
                        placeholder="请输入回复内容，最多600字符"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 菜单类型为url时显示 -->
                <el-row v-if="menu.type==='url'" style="margin-top:8px;">
                  <el-col :span="12">
                    <el-form-item label="URL" label-width="70px">
                      <el-input v-model="menu.url" placeholder="请输入URL"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="RUL" label-width="70px">
                      <el-input v-model="menu.rul" placeholder="请输入RUL"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 父级菜单时可添加二级菜单 -->
                <div v-if="menu.type==='parent'" style="margin-top:8px;">
                  <div
                    v-for="(sub, subIdx) in menu.children"
                    :key="sub.id"
                    class="sub-menu-form"
                    style="border:1px dashed #ccc;padding:10px 12px;margin-bottom:8px;position:relative;"
                  >
                    <el-divider content-position="left">
                      二级菜单{{ subIdx + 1 }}
                    </el-divider>
                    <el-button
                      size="mini"
                      type="danger"
                      style="position:absolute;right:8px;top:8px;"
                      @click="removeSubMenu(idx, subIdx)"
                    >删除</el-button>
                    <el-row :gutter="10" align="middle">
                      <el-col :span="8">
                        <el-form-item label="菜单名称" label-width="70px" style="margin-bottom:0;">
                          <el-input v-model="sub.name" maxlength="16" size="small" placeholder="请输入菜单名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="菜单类型" label-width="70px" style="margin-bottom:0;">
                          <el-select v-model="sub.type" size="small" style="width:140px">
                            <el-option label="点击回复文字" value="reply"></el-option>
                            <el-option label="点击跳转链接" value="url"></el-option>
                            <el-option label="点击回复验证码" value="code"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="sub.type==='reply'" style="margin-top:8px;">
                      <el-col :span="24">
                        <el-form-item label="回复内容" label-width="70px">
                          <el-input
                            type="textarea"
                            :rows="3"
                            v-model="sub.reply"
                            maxlength="600"
                            show-word-limit
                            placeholder="请输入回复内容，最多600字符"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="sub.type==='url'" style="margin-top:8px;">
                      <el-col :span="12">
                        <el-form-item label="URL" label-width="70px">
                          <el-input v-model="sub.url" placeholder="请输入URL"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="RUL" label-width="70px">
                          <el-input v-model="sub.rul" placeholder="请输入RUL"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-plus"
                    @click="addSubMenu(idx)"
                    style="margin-top:4px;"
                  >添加二级菜单</el-button>
                </div>
              </div>
            </el-form>
            <el-button
              type="warning"
              size="small"
              icon="el-icon-plus"
              @click="addMenu"
              style="margin-top:8px;"
            >添加一级菜单</el-button>
          </el-tab-pane>
          <el-tab-pane label="绑定记录" name="bdjl">
            <div class="bind-records-container">
              <el-form :inline="true" :model="bindQuery" class="bind-query-form" size="small">
                <el-form-item label="游戏名称">
                  <el-input v-model="bindQuery.gameName" placeholder="请输入游戏名称" clearable style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                  <el-input v-model="bindQuery.roleName" placeholder="请输入角色名称" clearable style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="机器码">
                  <el-input v-model="bindQuery.machineCode" placeholder="请输入机器码" clearable style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getBindList">查询</el-button>
                  <el-button @click="resetBindQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <el-table
                :data="bindTableData"
                border
                style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
                v-loading="bindLoading"
                empty-text="无数据"
              >
                <el-table-column prop="id" label="ID" align="center" width="60"/>
                <el-table-column prop="openid" label="openid" align="center" min-width="120"/>
                <el-table-column prop="gameName" label="游戏名称" align="center" min-width="100"/>
                <el-table-column prop="roleName" label="角色名称" align="center" min-width="100"/>
                <el-table-column prop="machineCode" label="机器码" align="center" min-width="120"/>
                <el-table-column prop="bindTime" label="绑定时间" align="center" min-width="140"/>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="scope">
                    <!-- 可根据需求添加操作按钮 -->
                  </template>
                </el-table-column>
              </el-table>
              <div class="bind-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination
                  background
                  layout="total, prev, pager, next, sizes, jumper"
                  :total="bindTotal"
                  :page-size="bindPageSize"
                  :current-page="bindPage"
                  :page-sizes="[10, 20, 50, 100]"
                  @size-change="bindPageSizeChange"
                  @current-change="bindPageChange"
                  style="display:inline-block;"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="czrz">
            <div class="log-records-container">
              <el-form :inline="true" :model="logQuery" class="log-query-form" size="small">
                <el-form-item label="openid">
                  <el-input v-model="logQuery.openid" placeholder="请输入openid" clearable style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="getLogList">查询</el-button>
                  <el-button @click="resetLogQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <el-table
                :data="logTableData"
                border
                style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }"
                v-loading="logLoading"
                empty-text="无数据"
              >
                <el-table-column prop="id" label="ID" align="center" width="60"/>
                <el-table-column prop="openid" label="openid" align="center" min-width="120"/>
                <el-table-column prop="type" label="类型" align="center" min-width="80"/>
                <el-table-column prop="content" label="内容" align="center" min-width="180"/>
                <el-table-column prop="time" label="时间" align="center" min-width="140"/>
                <el-table-column label="详情" align="center" width="80">
                  <template slot-scope="scope">
                    <!-- 可根据需求添加详情按钮 -->
                  </template>
                </el-table-column>
              </el-table>
              <div class="log-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination
                  background
                  layout="total, prev, pager, next, sizes, jumper"
                  :total="logTotal"
                  :page-size="logPageSize"
                  :current-page="logPage"
                  :page-sizes="[10, 20, 50, 100]"
                  @size-change="logPageSizeChange"
                  @current-change="logPageChange"
                  style="display:inline-block;"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="黑名单" name="hmd">
            <div class="blacklist-container">
              <el-alert
                type="warning"
                :closable="false"
                show-icon
                class="blacklist-tip"
                style="margin-bottom: 12px;"
              >
                <template #title>
                  <div>
                    <div>
                      功能介绍：黑名单用户无法进行微信验证，即无法进入游戏，建议添加违规游戏行为或通过游戏外挂的玩家
                    </div>
                    <div style="margin-top:2px;">
                      添加方法：进入引擎的在线玩家列表，双击玩家查看T变量，复制玩家微信ID在下方添加（如：oB4nYjnoHhuWrPVi2pYLuPjnCaU0）
                    </div>
                  </div>
                </template>
              </el-alert>
              <el-form :inline="true" :model="blackQuery" class="black-query-form" size="small">
                <el-form-item label="openid">
                  <el-input v-model="blackQuery.openid" placeholder="请输入openid" clearable style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="getBlackList">查询</el-button>
                  <el-button @click="resetBlackQuery">重置</el-button>
                  <el-button
                    type="primary"
                    :disabled="!blackQuery.openid"
                    @click="addToBlacklist"
                  >加入黑名单</el-button>
                </el-form-item>
              </el-form>
              <el-table
                :data="blackTableData"
                border
                style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }"
                v-loading="blackLoading"
                empty-text="无数据"
              >
                <el-table-column prop="id" label="ID" align="center" width="60"/>
                <el-table-column prop="openid" label="openid" align="center" min-width="120"/>
                <el-table-column prop="addTime" label="添加时间" align="center" min-width="140"/>
                <el-table-column prop="remark" label="备注" align="center" min-width="120"/>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="scope">
                    <!-- 可根据需求添加移除按钮 -->
                  </template>
                </el-table-column>
              </el-table>
              <div class="black-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination
                  background
                  layout="total, prev, pager, next, sizes, jumper"
                  :total="blackTotal"
                  :page-size="blackPageSize"
                  :current-page="blackPage"
                  :page-sizes="[10, 20, 50, 100]"
                  @size-change="blackPageSizeChange"
                  @current-change="blackPageChange"
                  style="display:inline-block;"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二维码模版" name="ewmmb">
            <div class="qrcode-template-container">
              <div class="qrcode-header" style="border: 1px solid #ccc;padding: 15px;">
                <div class="qrcode-title">补丁下载</div>
                <el-divider></el-divider>
                <div class="qrcode-tags">
                  热血传奇
                  <el-tag style="margin-left:8px;cursor: pointer;font-size: 14px;"><i class="el-icon-paperclip"></i>Gom</el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><i class="el-icon-paperclip"></i>Gee</el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><i class="el-icon-paperclip"></i>BLUE2</el-tag>
                </div>
              </div>
              <el-button type="danger" size="small" style="margin: 12px 0;" @click="openQrcodeDialog(false)">新增</el-button>
              <el-table
                :data="qrcodeTableData"
                border
                style="width: 100%;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }"
                v-loading="qrcodeLoading"
                empty-text="无数据"
              >
                <el-table-column prop="title" label="标题" align="center" min-width="100"/>
                <el-table-column prop="wiiNo" label="WII编号" align="center" min-width="80"/>
                <el-table-column prop="imgRoomNo" label="图片房号" align="center" min-width="80"/>
                <el-table-column prop="size" label="尺寸" align="center" min-width="60"/>
                <el-table-column prop="posX" label="坐标X" align="center" min-width="60"/>
                <el-table-column prop="posY" label="坐标Y" align="center" min-width="60"/>
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="140"/>
                <el-table-column label="操作" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openQrcodeDialog(true, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" style="color:#f56c6c;" @click="deleteQrcodeTemplate(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="qrcode-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination
                  background
                  layout="total, prev, pager, next, sizes, jumper"
                  :total="qrcodeTotal"
                  :page-size="qrcodePageSize"
                  :current-page="qrcodePage"
                  :page-sizes="[10, 20, 50, 100]"
                  @size-change="qrcodePageSizeChange"
                  @current-change="qrcodePageChange"
                  style="display:inline-block;"
                />
              </div>
            </div>
            <!-- 新增/编辑二维码模版弹窗 -->
            <el-dialog
              :title="qrcodeDialog.isEdit ? '编辑' : '新增' + '/编辑'"
              :visible.sync="qrcodeDialog.visible"
              width="480px"
              :close-on-click-modal="false"
              @close="closeQrcodeDialog"
            >
              <el-alert
                type="warning"
                :closable="false"
                show-icon
                style="margin-bottom: 18px;"
              >
                BLUEM2使用pic脚本自动显示二维码，无需设置WIL补丁编号和图片序号，设置为0即可。
              </el-alert>
              <el-form
                ref="qrcodeForm"
                :model="qrcodeDialog.form"
                :rules="qrcodeDialog.rules"
                label-width="80px"
                size="small"
                style="padding-right:12px;"
              >
                <el-form-item style="margin-top: 16px;" label="标题" prop="title" required>
                  <el-input v-model="qrcodeDialog.form.title" placeholder="请输入标题" maxlength="30"/>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="Wii编号" prop="wiiNo" required>
                  <el-input v-model="qrcodeDialog.form.wiiNo" placeholder="请输入WII编号" maxlength="20"/>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="图片序号" prop="imgRoomNo" required>
                  <el-input v-model="qrcodeDialog.form.imgRoomNo" placeholder="请输入图片序号" maxlength="20"/>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="尺寸" prop="size" required>
                  <el-select v-model="qrcodeDialog.form.size" placeholder="请选择尺寸" style="width:100%;">
                    <el-option v-for="n in [3,4,5,6]" :key="n" :label="n" :value="n"/>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="坐标X" prop="posX" required>
                  <el-input v-model="qrcodeDialog.form.posX" placeholder="请输入坐标X" maxlength="10"/>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="坐标Y" prop="posY" required>
                  <el-input v-model="qrcodeDialog.form.posY" placeholder="请输入坐标Y" maxlength="10"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closeQrcodeDialog">取消</el-button>
                <el-button type="danger" :loading="qrcodeDialog.loading" @click="saveQrcodeTemplate">确定</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import mgr from "../../assets/js/securityapi";
import api from "../../assets/js/apiRequestHandler";
export default {
  data() {
    return {
      activeName: "first",
      isEnabledWxValid: false,
      isPlatOpenWxValid: false,
      wxQrStr: '',
      form: {
        id: 0,
        applicationUserId: 0,
        isOwnAccount: false,
        messageKeyword: "",
        appId: "",
        appSecret: "",
        configUrl: "",
        communicationToken: "",
        wxEncryptionType: 2,
        beConcernedReply: "",
        weChatAccountType: 0,
        templateId: "",
      },
      replay: {
        id: 0,
        key: "",
        key1: "",
        key2: "",
        reply: "",
        reply1: "",
        reply2: "",
        weChatAccountId: 0,
      },

      value: false,
      tableData: [],
      menuForm: {
        menus: []
      },
      menuIdSeed: 1,

      // 绑定记录相关
      bindQuery: {
        gameName: '',
        roleName: '',
        machineCode: ''
      },
      bindTableData: [],
      bindTotal: 0,
      bindPage: 1,
      bindPageSize: 10,
      bindLoading: false,

      // 操作日志相关
      logQuery: {
        openid: ''
      },
      logTableData: [],
      logTotal: 0,
      logPage: 1,
      logPageSize: 10,
      logLoading: false,

      // 黑名单相关
      blackQuery: {
        openid: ''
      },
      blackTableData: [],
      blackTotal: 0,
      blackPage: 1,
      blackPageSize: 10,
      blackLoading: false,

      // 二维码模版相关
      qrcodeTableData: [],
      qrcodeTotal: 0,
      qrcodePage: 1,
      qrcodePageSize: 10,
      qrcodeLoading: false,

      // 二维码模版弹窗
      qrcodeDialog: {
        visible: false,
        isEdit: false,
        loading: false,
        form: {
          id: null,
          title: '',
          wiiNo: '',
          imgRoomNo: '',
          size: 3,
          posX: '',
          posY: ''
        },
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          wiiNo: [{ required: true, message: '请输入WII编号', trigger: 'blur' }],
          imgRoomNo: [{ required: true, message: '请输入图片序号', trigger: 'blur' }],
          size: [{ required: true, message: '请选择尺寸', trigger: 'change' }],
          posX: [{ required: true, message: '请输入坐标X', trigger: 'blur' }],
          posY: [{ required: true, message: '请输入坐标Y', trigger: 'blur' }]
        }
      },
    };
  },
  created() {
    this.getDetail();
    this.getReplay();
    this.getLists();
  },
  methods: {
    refresh() {
      this.getLists();
    },
    async getLists() {
      let header = await mgr();
      api
        .get("/api/WxValid/GetWxValidCodes", {
          headers: {
            Authorization: "Bearer " + header,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getReplay() {
      let header = await mgr();
      api
        .get("/api/WxValid/GetWxCustomReplies", {
          headers: {
            Authorization: "Bearer " + header,
          },
        })
        .then((res) => {
          if(res.data===undefined || res.data === '' || res.data === null)
          return;
          //console.log(res.data);
          this.replay = res.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getDetail() {
      let header = await mgr();
      api
        .get("/api/WxValid/GetWxValidInfo", {
          headers: {
            Authorization: "Bearer " + header,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.form = res.data;
          this.isEnabledWxValid = res.data.isEnabledWxValid;
          this.isPlatOpenWxValid = res.data.isPlatOpenWxValid;
          this.wxQrStr = res.data.wxQrStr;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async saveReplay() {
      let header = await mgr();
      api
        .post("/api/WxValid/AddOrUpdateWxCustomReplies", this.replay, {
          headers: {
            Authorization: "Bearer " + header,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$messageSuccess("操作成功");
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async saveConfig() {
      let header = await mgr();
      this.form.applicationUserId = this.$store.state.id;
      api
        .post("/api/WxValid/AddOrUpdateWxValid", this.form, {
          headers: {
            Authorization: "Bearer " + header,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$messageSuccess("操作成功");
          this.form.configUrl = res.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    token() {
      this.form.communicationToken = this.randam(32);
    },
    random() {
      this.form.messageEncryptKey = this.randam(43);
    },
    randam(size) {
      var arr = [];
      for (let i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i));
      }
      for (let i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i));
      }
      for (let i = 0; i <= 9; i++) {
        arr.push(i);
      }
      var str = "";
      for (let x = 1; x <= size; x++) {
        var index = Math.floor(Math.random() * arr.length);
        str += arr[index];
      }
      return str;
    },
    addMenu() {
      this.menuForm.menus.push({
        id: this.menuIdSeed++,
        name: '',
        type: '',
        reply: '',
        url: '',
        rul: '',
        children: []
      });
    },
    removeMenu(idx) {
      this.menuForm.menus.splice(idx, 1);
    },
    addSubMenu(parentIdx) {
      const parent = this.menuForm.menus[parentIdx];
      if (!parent.children) parent.children = [];
      parent.children.push({
        id: this.menuIdSeed++,
        name: '',
        type: '',
        reply: '',
        url: '',
        rul: ''
      });
    },
    removeSubMenu(parentIdx, subIdx) {
      this.menuForm.menus[parentIdx].children.splice(subIdx, 1);
    },
    // 绑定记录相关
    async getBindList() {
      this.bindLoading = true;
      let header = await mgr();
      api
        .get("/api/WxValid/GetBindRecords", {
          headers: {
            Authorization: "Bearer " + header,
          },
          params: {
            gameName: this.bindQuery.gameName,
            roleName: this.bindQuery.roleName,
            machineCode: this.bindQuery.machineCode,
            page: this.bindPage,
            pageSize: this.bindPageSize
          }
        })
        .then((res) => {
          this.bindTableData = res.data.items || [];
          this.bindTotal = res.data.total || 0;
          this.bindLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.bindLoading = false;
        });
    },
    resetBindQuery() {
      this.bindQuery = {
        gameName: '',
        roleName: '',
        machineCode: ''
      };
      this.bindPage = 1;
      this.getBindList();
    },
    bindPageChange(page) {
      this.bindPage = page;
      this.getBindList();
    },
    bindPageSizeChange(size) {
      this.bindPageSize = size;
      this.bindPage = 1;
      this.getBindList();
    },
    // 操作日志相关
    async getLogList() {
      this.logLoading = true;
      let header = await mgr();
      api
        .get("/api/WxValid/GetWxLogs", {
          headers: {
            Authorization: "Bearer " + header,
          },
          params: {
            openid: this.logQuery.openid,
            page: this.logPage,
            pageSize: this.logPageSize
          }
        })
        .then((res) => {
          this.logTableData = res.data.items || [];
          this.logTotal = res.data.total || 0;
          this.logLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.logLoading = false;
        });
    },
    resetLogQuery() {
      this.logQuery = { openid: '' };
      this.logPage = 1;
      this.getLogList();
    },
    logPageChange(page) {
      this.logPage = page;
      this.getLogList();
    },
    logPageSizeChange(size) {
      this.logPageSize = size;
      this.logPage = 1;
      this.getLogList();
    },
    // 黑名单相关
    async getBlackList() {
      this.blackLoading = true;
      let header = await mgr();
      api
        .get("/api/WxValid/GetBlacklist", {
          headers: {
            Authorization: "Bearer " + header,
          },
          params: {
            openid: this.blackQuery.openid,
            page: this.blackPage,
            pageSize: this.blackPageSize
          }
        })
        .then((res) => {
          this.blackTableData = res.data.items || [];
          this.blackTotal = res.data.total || 0;
          this.blackLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.blackLoading = false;
        });
    },
    resetBlackQuery() {
      this.blackQuery = { openid: '' };
      this.blackPage = 1;
      this.getBlackList();
    },
    blackPageChange(page) {
      this.blackPage = page;
      this.getBlackList();
    },
    blackPageSizeChange(size) {
      this.blackPageSize = size;
      this.blackPage = 1;
      this.getBlackList();
    },
    async addToBlacklist() {
      if (!this.blackQuery.openid) return;
      let header = await mgr();
      api
        .post("/api/WxValid/AddToBlacklist", { openid: this.blackQuery.openid }, {
          headers: {
            Authorization: "Bearer " + header,
          }
        })
        .then(() => {
          this.$messageSuccess("添加成功");
          this.getBlackList();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 二维码模版相关
    async getQrcodeList() {
      this.qrcodeLoading = true;
      let header = await mgr();
      api
        .get("/api/WxValid/GetQrcodeTemplates", {
          headers: {
            Authorization: "Bearer " + header,
          },
          params: {
            page: this.qrcodePage,
            pageSize: this.qrcodePageSize
          }
        })
        .then((res) => {
          this.qrcodeTableData = res.data.items || [];
          this.qrcodeTotal = res.data.total || 0;
          this.qrcodeLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.qrcodeLoading = false;
        });
    },
    qrcodePageChange(page) {
      this.qrcodePage = page;
      this.getQrcodeList();
    },
    qrcodePageSizeChange(size) {
      this.qrcodePageSize = size;
      this.qrcodePage = 1;
      this.getQrcodeList();
    },
    openQrcodeDialog(isEdit, row) {
      this.qrcodeDialog.visible = true;
      this.qrcodeDialog.isEdit = !!isEdit;
      if (isEdit && row) {
        this.qrcodeDialog.form = { ...row };
      } else {
        this.qrcodeDialog.form = {
          id: null,
          title: '',
          wiiNo: '',
          imgRoomNo: '',
          size: 3,
          posX: '',
          posY: ''
        };
      }
      this.$nextTick(() => {
        if (this.$refs.qrcodeForm) this.$refs.qrcodeForm.clearValidate();
      });
    },
    closeQrcodeDialog() {
      this.qrcodeDialog.visible = false;
      this.qrcodeDialog.loading = false;
    },
    saveQrcodeTemplate() {
      this.$refs.qrcodeForm.validate(async (valid) => {
        if (!valid) return;
        this.qrcodeDialog.loading = true;
        let header = await mgr();
        const apiUrl = this.qrcodeDialog.isEdit
          ? "/api/WxValid/UpdateQrcodeTemplate"
          : "/api/WxValid/AddQrcodeTemplate";
        api
          .post(apiUrl, this.qrcodeDialog.form, {
            headers: { Authorization: "Bearer " + header }
          })
          .then(() => {
            this.$messageSuccess("保存成功");
            this.qrcodeDialog.visible = false;
            this.getQrcodeList();
          })
          .catch((err) => {
            this.$messageError(err.message);
          })
          .finally(() => {
            this.qrcodeDialog.loading = false;
          });
      });
    },
    addQrcodeTemplate() {
      this.openQrcodeDialog(false);
    },
    editQrcodeTemplate(row) {
      this.openQrcodeDialog(true, row);
    },
    deleteQrcodeTemplate(row) {
      // 删除二维码模版
      this.$confirm('确定要删除该二维码模版吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // 实际删除逻辑
        this.$message.success("删除成功");
        this.getQrcodeList();
      }).catch(() => {});
    },
  },

  watch: {
    activeName(val) {
      if (val === 'bdjl') {
        this.getBindList();
      }
      if (val === 'czrz') {
        this.getLogList();
      }
      if (val === 'hmd') {
        this.getBlackList();
      }
      if (val === 'ewmmb') {
        this.getQrcodeList();
      }
    }
  },

  destroyed() {},
};
</script>

<style lang="scss" scoped>
.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}

.gs_listcontainer {
  padding-top: 0;
  padding-bottom: 15px;
  margin-left: 20px;

  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
    box-sizing: border-box;

    .mgl20 {
      float: right;
    }

    dt {
      background-color: #d9edf7;
      padding-right: 10px;
    }

    dd {
      padding-top: 5px;
    }
  }
}

.mg2 {
  float: right;
  margin-top: -20px;
}

.opeartbox {
  border: 1px solid #00bcd4;
  width: 97%;
}

.line_tip {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}

.right {
  float: right;
  margin-right: 4%;
}

.el-form-item {
  margin-bottom: 10px;
}

.editserverBox {
  padding-left: 20px;

  .list {
    margin-bottom: 10px;

    .tit {
      float: left;
      width: 90px;
      height: 32px;
      line-height: 32px;
    }

    .content {
      float: left;
      width: 250px;
    }
  }

  .serveList {
    li {
      position: relative;
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 10px;
      overflow: hidden;

      .tit {
        background: #3c8dbc;
        color: #fff;
        height: 22px;
        line-height: 22px;
      }

      .numberbox {
        height: 25px;
        line-height: 25px;
        color: green;
        font-size: 13px;
      }

      &:hover {
        .mask {
          top: 0;
        }
      }

      .mask {
        position: absolute;
        transition: top 0.3s;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
}

.passwordBox {
  padding-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;

  .tit {
    display: block;
    width: 100px;
    height: 32px;
    line-height: 32px;
  }
}

.bindwei {
  width: 95%;
  border: 1px solid #d9edf7;

  .tit {
    width: 100px;
    background: #d9edf7;
    padding-right: 10px;
    font-size: 14px;
    text-align: right;
    color: #333;
  }

  .el-tag {
    margin: 5px 10px 5px 0;
  }
}

.weixinbox {
  margin-left: 20px;

  .clearfix1:after {
    content: "";
    display: table;
    clear: both;
    border-spacing: 0;
  }

  table {
    width: 95%;
    margin-top: -10px;
    border-collapse: separate;
    border-spacing: 0 10px;

    tr {
      td {
        border: 1px solid #d9edf7;

        ul {
          margin: 0 100px 0 70px;

          li {
            float: left;
            margin-right: 60px;

            .tit {
              float: left;
              height: 40px;
              line-height: 40px;
              font-size: 13px;
              width: 90px;
              text-align: right;
              color: #313131;
            }

            .contbox {
              float: left;
              margin-top: 7px;
              margin-left: 20px;
            }
          }
        }
      }

      .tit_td {
        width: 98px;
        background: #d9edf7;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
        color: #333;
      }
    }
  }
}

.authority {
  position: absolute;
  font-size: 14px;
  right: 10px;
  top: 12px;
  color: #63aafa;
  cursor: pointer;
}

.bind-records-container {
  background: #fff;
  padding: 10px 0 0 0;
}
.bind-query-form {
  margin-bottom: 8px;
}
.bind-pagination {
  margin-top: 8px;
}

.log-records-container {
  background: #fff;
  padding: 10px 0 0 0;
}
.log-query-form {
  margin-bottom: 8px;
}
.log-pagination {
  margin-top: 8px;
}

.blacklist-container {
  background: #fff;
  padding: 10px 0 0 0;

  .blacklist-tip {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1.7;
  }

  .black-query-form {
    margin-bottom: 8px;
  }

  .black-pagination {
    margin-top: 8px;
  }
}

.qrcode-template-container {
  background: #fff;
  padding: 10px 0 0 0;
}
.qrcode-header {
  padding: 8px 0 0 8px;
}
.qrcode-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}
.qrcode-tags {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}
.qrcode-pagination {
  margin-top: 8px;
}
</style>
