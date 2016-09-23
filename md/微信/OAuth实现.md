## 1. 在授权方注册应用信息
```
var appInfo = {
                  appid: 'zhufengpeixun',
                  name: '珠峰大前端网校',
                  description: '学习前端',
                  secret: '123456',
                  redirectUri: 'http://127.0.0.1:8080/callback?1=1'
                }
```

## 2. 获取Authorization Code
应用请求用户的授权时，要先跳转到此页面，由授权服务器判断此用户是否登陆，如果未登陆要求登陆，如果已登陆则显示授权界面询问用户是否授权此应用访问对应的资源，当用户点击确定授权的按钮后生成`authorization_code`并跳转回应用提供的URL.

### 请求地址
```
/authorize
```
### 请求方法

GET

### 请求参数

|参数|是否必须|含义|
|:-----|:-----|:-----|
|client_id|必须|申请QQ登录成功后,分配给应用的appid|
|redirectUri|必须|成功授权后的回调地址|

## 3. 通过Authorization Code获取Access Token

### 请求地址
```
/token
```
### 请求方法

GET

### 请求参数

|参数|是否必须|含义|
|:-----|:-----|:-----|
|code|必须|上一步返回的authorization code|
|client_id|必须|应用ID|
|client_secret|必须|应用秘钥|

返回说明：
如果成功返回，即可在返回包中获取到Access Token。 如:

|参数说明|描述|
|:-----|:-----|
|access_token|授权令牌，Access_Token|

## 4. 获取用户信息

### 请求地址
```
/userInfo
```
### 请求方法

GET

### 请求参数

|参数|是否必须|含义|
|:-----|:-----|:-----|
|access_token|必须|access_token|

返回说明：
如果成功返回，即可在返回包中获取到用户信息,如
```

```

